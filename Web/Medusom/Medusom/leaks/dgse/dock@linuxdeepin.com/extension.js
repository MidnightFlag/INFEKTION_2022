/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */

const Clutter = imports.gi.Clutter;
const Pango = imports.gi.Pango;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;
const Shell = imports.gi.Shell;
const Lang = imports.lang;
const Signals = imports.signals;
const St = imports.gi.St;
const Mainloop = imports.mainloop;
const Params = imports.misc.params;

const AppFavorites = imports.ui.appFavorites;
const DND = imports.ui.dnd;
const Main = imports.ui.main;
const Overview = imports.ui.overview;
const Extension = imports.ui.extensionSystem.extensions['dock@linuxdeepin.com'];
const PopupMenu = Extension.popupMenu;
const Search = imports.ui.search;
const Tweener = imports.ui.tweener;
const Workspace = imports.ui.workspace;
const AppDisplay = imports.ui.appDisplay;
const AltTab = imports.ui.altTab;

const Gettext = imports.gettext;

const THUMBNAIL_DEFAULT_WIDTH = 250;
const THUMBNAIL_DISAPPEAR_TIMEOUT = 100; // milliseconds
const TOOLTIP_DISAPPEAR_TIMEOUT = 100; // milliseconds

//hide
let dockIconSize;
let panelMinHeight;
let panelNaturalHeight;
let panelMinWidth;
let leftBoxWidth;
let leftOffset;
let dockFrameWidth;
let dockFrameHeight;
let dockFramePaddingX;
let dockFramePaddingY;
let dockIconPaddingY;
let appMenu;
let dock;
let dockThumbnailMenu = null;
let appNameTooltip = null;
let dockTitleSize = 15;
let closeButtonSize = 24;
let _;

let panelConnectId;
let panel;

let dateMenu, label, box;

function ShowDesktopIcon() {
    this._init();
}

ShowDesktopIcon.prototype = {
    _init: function() {
        this.actor = new St.Button({ style_class: 'dock-app',
                                     button_mask: St.ButtonMask.ONE | St.ButtonMask.TWO,
                                     reactive: true,
                                     can_focus: true,
                                     x_fill: false,
                                     y_fill: false,
                                     track_hover: true});
        this.actor.set_size(dockFrameWidth, dockFrameHeight);
        this._icon = new St.Icon({icon_name: "desktop", icon_size: dockIconSize, icon_type: St.IconType.FULLCOLOR});
        this.actor.add_actor(this._icon);
        this.actor.connect('notify::hover', Lang.bind(this, this._hoverChanged));

        this.actor.connect("clicked", Lang.bind(this, this._toggleShowDesktop));

        this._tracker = Shell.WindowTracker.get_default();

        this._desktopShown = false;

        this._alreadyMinimizedWindows = [];
        this.hasTooltipMenu = false;
    },

    enableTooltipMenu: function() {
        this.hasTooltipMenu = true;
    },

    disableTooltipMenu: function() {
        this.hasTooltipMenu = false;
    },

    _hoverChanged: function(actor) {
        this.popupTooltipMenu();

        return false;
    },

    popupTooltipMenu: function() {
        if (!this.hasTooltipMenu) {
            if (appNameTooltip) {
                appNameTooltip.close();
            }

            appNameTooltip = new ShowDesktopTooltip(this);
        }
    },

    _toggleShowDesktop: function() {
        let metaWorkspace = global.screen.get_active_workspace();
        let workspaceWindows = metaWorkspace.list_windows();

        // If workspaceWindows length less than 2, haven't window on current workspace.
        if (workspaceWindows.length >= 2) {
            let windows = workspaceWindows.splice(0, workspaceWindows.length - 1); // remove desktop window

            // Test all windows.
            let allWindowsMinimized = true;
            for (let j = 0; j < windows.length; j++) {
                if (!windows[j].minimized) {
                    allWindowsMinimized = false;
                    break;
                }
            }

            if (allWindowsMinimized || this._desktopShown) {
                for ( let i = 0; i < windows.length; ++i ) {
                    if (this._tracker.is_window_interesting(windows[i])){
                        let shouldrestore = true;
                        for (let j = 0; j < this._alreadyMinimizedWindows.length; j++) {
                            if (windows[i] == this._alreadyMinimizedWindows[j]) {
                                shouldrestore = false;
                                break;
                            }
                        }
                        if (shouldrestore) {
                            windows[i].unminimize();
                        }
                    }
                }
                this._alreadyMinimizedWindows.length = []; //Apparently this is better than this._alreadyMinimizedWindows = [];

                this._desktopShown = false;
            } else {
                for ( let i = 0; i < windows.length; ++i ) {
                    if (this._tracker.is_window_interesting(windows[i])){
                        if (!windows[i].minimized) {
                            windows[i].minimize();
                        } else {
                            this._alreadyMinimizedWindows.push(windows[i]);
                        }
                    }
                }

                this._desktopShown = true;
            }
        }
    }
};

function Dock() {
    this._init.apply(this, arguments);
}

Dock.prototype = {
    _init : function() {
        this._menus = [];
        this._menuDisplays = [];

        this._favorites = [];

        // Load Settings
        this._spacing = 4;
        this._nicons = 0;

        this._grid = new Shell.GenericContainer();

        this._grid.connect('get-preferred-width', Lang.bind(this, this._getPreferredWidth));
        this._grid.connect('get-preferred-height', Lang.bind(this, this._getPreferredHeight));
        this._grid.connect('allocate', Lang.bind(this, this._allocate));

        this._workId = Main.initializeDeferredWork(this._grid, Lang.bind(this, this._redisplay));

        this._tracker = Shell.WindowTracker.get_default();
        this._appSystem = Shell.AppSystem.get_default();

        this._installedChangedId = this._appSystem.connect('installed-changed', Lang.bind(this, this._queueRedisplay));
        this._appFavoritesChangedId = AppFavorites.getAppFavorites().connect('changed', Lang.bind(this, this._queueRedisplay));
        this._appStateChangedId = this._appSystem.connect('app-state-changed', Lang.bind(this, this._queueRedisplay));

        this._showDock();
    },

    _showDock: function() {
        let monitor = Main.layoutManager.primaryMonitor;
        let x = monitor.x + leftBoxWidth + leftOffset;
        let y = 0;
        let width = this._nicons * (dockFrameWidth + dockFramePaddingX) + dockFramePaddingX;
        let height = dockFrameHeight + dockFramePaddingY * 2;

        this._grid.set_position(x, y);
        this._grid.set_size(width, height);
    },

    destroy: function() {
        if (this._installedChangedId) {
            this._appSystem.disconnect(this._installedChangedId);
            this._installedChangedId = 0;
        }

        if (this._appFavoritesChangedId) {
            AppFavorites.getAppFavorites().disconnect(this._appFavoritesChangedId);
            this._appFavoritesChangedId = 0;
        }

        if (this._appStateChangedId) {
            this._appSystem.disconnect(this._appStateChangedId);
            this._appStateChangedId = 0;
        }

        if (this._overviewShowingId) {
            Main.overview.disconnect(this._overviewShowingId);
            this._overviewShowingId = 0;
        }

        if (this._overviewHiddenId) {
            Main.overview.disconnect(this._overviewHiddenId);
            this._overviewHiddenId = 0;
        }

        this._grid.destroy();

        // Break reference cycles
        this._appSystem = null;
        this._tracker = null;
    },

    _appIdListToHash: function(apps) {
        let ids = {};
        for (let i = 0; i < apps.length; i++)
            ids[apps[i].get_id()] = apps[i];
        return ids;
    },

    _queueRedisplay: function () {
        Main.queueDeferredWork(this._workId);
    },

    _redisplay: function () {
        this.removeAll();


        let favorites = AppFavorites.getAppFavorites().getFavoriteMap();

        let running = this._appSystem.get_running();
        let runningIds = this._appIdListToHash(running);

        let showDesktopIcon = new ShowDesktopIcon();
        this.addItem(showDesktopIcon.actor);

        let icons = 0;
        let nFavorites = 0;
        for (let id in favorites) {
            let app = favorites[id];
            let display = new DockIcon(app,this);
            this.addItem(display.actor);
            nFavorites++;
            icons++;
        }

        for (let i = 0; i < running.length; i++) {
            let app = running[i];
            if (app.get_id() in favorites)
                continue;
            let display = new DockIcon(app,this);
            icons++;
            this.addItem(display.actor);
        }
        this._nicons=icons;

        this._showDock();
    },

    _getPreferredWidth: function (grid, forHeight, alloc) {
        let nRows = this._grid.get_children().length;
        let dockbarWidth = nRows * (dockFrameWidth + dockFramePaddingX) + dockFramePaddingX;
        alloc.min_size = dockbarWidth;
        alloc.natural_size = dockbarWidth;
    },

    _getPreferredHeight: function (grid, forWidth, alloc) {
        let dockbarHeight = dockFrameHeight + 2 * dockFramePaddingY;
        alloc.min_size = dockbarHeight;
        alloc.natural_size = dockbarHeight;
    },

    _allocate: function (grid, box, flags) {
        let children = this._grid.get_children();

        let x = box.x1 + dockFramePaddingX;
        let y = box.y1 + dockFramePaddingY;

        for (let i = 0; i < children.length; i++) {
            let childBox = new Clutter.ActorBox();
            childBox.x1 = x;
            childBox.y1 = y;
            childBox.x2 = childBox.x1 + dockFrameWidth;
            childBox.y2 = childBox.y1 + dockFrameHeight;
            children[i].allocate(childBox, flags);
            x += dockFrameWidth + dockFramePaddingX;
        }
    },

    removeAll: function () {
        this._grid.get_children().forEach(Lang.bind(this, function (child) {
                                                        child.destroy();
                                                    }));
    },

    addItem: function(actor) {
        this._grid.add_actor(actor);
    }
};
Signals.addSignalMethods(Dock.prototype);

function DockIcon() {
    this._init.apply(this, arguments);
}

DockIcon.prototype = {
    _init : function(app, dock) {
        this.app = app;
        this.actor = new St.Button({ style_class: 'dock-app',
                                     button_mask: St.ButtonMask.ONE | St.ButtonMask.TWO,
                                     reactive: true,
                                     can_focus: true,
                                     x_fill: false,
                                     y_fill: false,
                                     track_hover: true});
        this.actor._delegate = this;
        this.actor.set_size(dockFrameWidth, dockFrameHeight);

        this._icon = this.app.create_icon_texture(dockIconSize);
        this.actor.set_child(this._icon);

        this.actor.connect('clicked', Lang.bind(this, this._onClicked));

        this._menu = null;
        this._menuManager = new PopupMenu.PopupMenuManager(this);

        let tracker = Shell.WindowTracker.get_default();
        tracker.connect('notify::focus-app', Lang.bind(this, this._onStateChanged));

        this.actor.connect('button-press-event', Lang.bind(this, this._onButtonPress));
        this.actor.connect('destroy', Lang.bind(this, this._onDestroy));
        this.actor.connect('notify::hover', Lang.bind(this, this._hoverChanged));

        this._menuTimeoutId = 0;
        this._stateChangedId = this.app.connect('notify::state',
                                                Lang.bind(this, this._onStateChanged));
        this._onStateChanged();
        this._dock=dock;

        this.hasHoverMenu = false;
        this.hasTooltipMenu = false;
		this.popupRightMenu = false;
    },

    enableHoverMenu: function() {
        this.hasHoverMenu = true;
    },

    disableHoverMenu: function() {
        this.hasHoverMenu = false;
    },

    enableTooltipMenu: function() {
        this.hasTooltipMenu = true;
    },

    disableTooltipMenu: function() {
        this.hasTooltipMenu = false;
    },

    _onDestroy: function() {
        if (this._stateChangedId > 0)
            this.app.disconnect(this._stateChangedId);
        this._stateChangedId = 0;
        this._removeMenuTimeout();
    },

    _removeMenuTimeout: function() {
        if (this._menuTimeoutId > 0) {
            Mainloop.source_remove(this._menuTimeoutId);
            this._menuTimeoutId = 0;
        }
    },

    _hoverChanged: function(actor) {
		this.popupThumbnailMenu();

        return false;
    },

    popupThumbnailMenu: function() {
        // If application's windows more than one.
        if (this.app.get_windows().length >= 1) {
            // If hover menu haven't popup.
            if (!this.hasHoverMenu) {
                if (dockThumbnailMenu) {
                    dockThumbnailMenu.close();
                }

                dockThumbnailMenu = new AppThumbnailHoverMenu(this);
            }
        // Show application name if application haven't windows.
        } else {
            if (!this.hasTooltipMenu) {
                if (appNameTooltip) {
                    appNameTooltip.close();
                }

                appNameTooltip = new AppNameTooltip(this);
            }
        }
    },

    _onStateChanged: function() {
        let tracker = Shell.WindowTracker.get_default();
        let focusedApp = tracker.focus_app;
        if (this.app.state != Shell.AppState.STOPPED) {
            this.actor.add_style_class_name('running');
            if (this.app == focusedApp) {
                this.actor.add_style_class_name('focused');
            } else {
                this.actor.remove_style_class_name('focused');
            }
        } else {
            this.actor.remove_style_class_name('focused');
            this.actor.remove_style_class_name('running');
        }
    },

    _onButtonPress: function(actor, event) {
        let button = event.get_button();
        if (button == 1) {
            this._removeMenuTimeout();
            this._menuTimeoutId = Mainloop.timeout_add(
                AppDisplay.MENU_POPUP_TIMEOUT,
                Lang.bind(this, function() {
                              this.popupMenu();
                          }));
        } else if (button == 3) {
            this.popupMenu();
        }
    },

    _onClicked: function(actor, button) {
        this._removeMenuTimeout();

        if (button == 1) {
            this._onActivate(Clutter.get_current_event());
        } else if (button == 2) {
            // Last workspace is always empty
            let launchWorkspace = global.screen.get_workspace_by_index(global.screen.n_workspaces - 1);
            launchWorkspace.activate(global.get_current_time());
            this.emit('launching');
            this.app.open_new_window(-1);
        }
		
        return false;
    },

    getId: function() {
        return this.app.get_id();
    },

    popupMenu: function() {
        this._removeMenuTimeout();
        this.actor.fake_release();

        if (!this._menu) {
            this._menu = new DockIconMenu(this);
            this._menu.connect('activate-window', Lang.bind(this, function (menu, window) {
                                                                this.activateWindow(window);
                                                            }));
            this._menu.connect('open-state-changed', Lang.bind(this, function (menu, isPoppedUp) {
                                                                   if (!isPoppedUp){
                                                                       this._onMenuPoppedDown();
                                                                   }
                                                               }));

            this._menuManager.addMenu(this._menu, true);
        }

        this._menu.popup();

        return false;
    },

    activateWindow: function(metaWindow) {
        if (metaWindow) {
            this._didActivateWindow = true;
            Main.activateWindow(metaWindow);
        }
    },

    setSelected: function (isSelected) {
        this._selected = isSelected;
        if (this._selected)
            this.actor.add_style_class_name('selected');
        else
            this.actor.remove_style_class_name('selected');
    },

    _onMenuPoppedDown: function() {
        this.actor.sync_hover();
    },

    _getRunning: function() {
        return this.app.state != Shell.AppState.STOPPED;
    },

    _onActivate: function (event) {
        this.emit('launching');
        let modifiers = Shell.get_event_state(event);

        if (modifiers & Clutter.ModifierType.CONTROL_MASK
            && this.app.state == Shell.AppState.RUNNING) {
            let current_workspace = global.screen.get_active_workspace().index();
            this.app.open_new_window(current_workspace);
        } else {
            let tracker = Shell.WindowTracker.get_default();
            let focusedApp = tracker.focus_app;

            if (this.app == focusedApp) {
                let windows = this.app.get_windows();
                let current_workspace = global.screen.get_active_workspace();
                for (let i = 0; i < windows.length; i++) {
                    let w = windows[i];
                    if (w.get_workspace() == current_workspace)
                        w.minimize();
                }
            } else {
                this.app.activate(-1);
            }
        }
        Main.overview.hide();
    },

    shellWorkspaceLaunch : function() {
        this.app.open_new_window();
    }
};
Signals.addSignalMethods(DockIcon.prototype);

function DockThumbnail() {
    this._init.apply(this, arguments);
}

DockThumbnail.prototype = {
    _init : function(app, window, width, height, menuItem, menu) {
        this.app = app;
        this.window = window;
        this.menu = menu;
        this.menuItem = menuItem;

        this.highlighted = false;

        this.actor = new St.Button({style_class: 'dock-thumbnail-icon',
                                    reactive: true,
                                    can_focus: true});

        this.actorBox = new St.BoxLayout({vertical: true,
                                          reactive: true,
                                          can_focus: true});
        this.actorBox.connect('enter-event', Lang.bind(this, this.select));
        this.actorBox.connect('leave-event', Lang.bind(this, this.unselect));
        this.actor.connect(
            'clicked',
            Lang.bind(this, function() {
                          Main.activateWindow(this.window);
                          this.menu.close();
                      }));
        this.actor.set_child(this.actorBox);

        // Add window title.
        this.hbox = new St.BoxLayout();
        this.actorBox.add(this.hbox, {x_fill: true});

        let title = window.get_title();
        let labelText;
        if (!title) {
            title = this.app.get_name();
        }
        this.label = new St.Label(
            {style_class: 'dock-thumbnail-icon-font',
             text: title });
        let bin = new St.Bin({x_align: St.Align.MIDDLE});
        bin.add_actor(this.label);
        this.hbox.add(bin, {expand: true});
        this.hbox.set_width(width);

        // Add window close button.
        this.closeButton = new St.Button({ style_class: 'window-close' });
        this.closeBin = new St.Bin({x_fill: true, x_align: St.Align.END, y_align: St.Align.START});
        this.closeBin.child = this.closeButton;
        this.closeBin.set_size(closeButtonSize, closeButtonSize);
        this.hbox.add(this.closeBin);
        this.closeButton.hide(); // hide close button default
        this.closeButton.connect(
            'clicked',
            Lang.bind(this, function() {
                          this.menuItem.closeWindow(this.window);
                          this.menuItem.refresh(this.window);
                      }));

        // Add window thumbnail.
        this.icon = null;
        this._iconBin = new St.Bin({ x_fill: true, y_fill: true });
        this.iconWidth = width;
        this.iconHeight = height;
        this.set_size(this.iconWidth, this.iconHeight);
        this.actorBox.add(this._iconBin, { x_fill: true, y_fill: true } );
    },

    select: function() {
        if (!this.highlighted) {
            this.actor.add_style_pseudo_class('hover');
            this.closeButton.show();
            this.highlighted = true;
        }
    },

    unselect: function() {
        if (this.highlighted) {
            this.actor.remove_style_pseudo_class('hover');
            this.closeButton.hide();
            this.highlighted = false;
        }
    },

    set_size: function(iconWidth, iconHeight) {
        let clone = null;

        let mutterWindow = this.window.get_compositor_private();
        let windowTexture = mutterWindow.get_texture ();
        let [width, height] = windowTexture.get_size();
        let scale = Math.min(1.0, iconWidth / width, iconHeight / height);

        clone = new Clutter.Group({clip_to_allocation: true});
        clone.set_size(this.iconWidth, this.iconHeight);

        let windowClone = new Clutter.Clone (
            { source: windowTexture,
              reactive: true,
              x: (this.iconWidth - (width * scale)) / 2,
              y: (this.iconHeight - (height * scale)) / 2,
              width: width * scale,
              height: height * scale
            });
        clone.add_actor(windowClone);

        this.icon = this.app.create_icon_texture(iconWidth);
        this._iconBin.set_size(iconWidth, iconHeight);

        this._iconBin.child = clone;
    }
};
Signals.addSignalMethods(DockThumbnail.prototype);

function DockIconMenu() {
    this._init.apply(this, arguments);
}

DockIconMenu.prototype = {
    __proto__: AppDisplay.AppIconMenu.prototype,

    _init: function(source) {
        PopupMenu.PopupMenu.prototype._init.call(this, source.actor, 0.5, St.Side.TOP, 0);

        this._source = source;

        this.connect('activate', Lang.bind(this, this._onActivate));

        this.actor.add_style_class_name('dock-menu');

        // Chain our visibility and lifecycle to that of the source
        source.actor.connect('notify::mapped', Lang.bind(this, function () {
                                                             if (!source.actor.mapped)
                                                                 this.close();
                                                         }));
        source.actor.connect('destroy', Lang.bind(this, function () { this.actor.destroy(); }));

        Main.layoutManager.addChrome(this.actor);
    },

    _redisplay: function() {
        this.removeAll();

        let windows = this._source.app.get_windows();

        let isFavorite = AppFavorites.getAppFavorites().isFavorite(this._source.app.get_id());

        this._newWindowMenuItem = windows.length > 0 ? this._appendMenuItem(_("New Window")) : null;

        this._quitAppMenuItem = windows.length >0 ? this._appendMenuItem(_("Quit Application")) : null;

        if (windows.length > 0)
            this._appendSeparator();
        this._toggleFavoriteMenuItem = this._appendMenuItem(isFavorite ?
                                                            _("Remove from Favorites")
                                                            : _("Add to Favorites"));

        this._highlightedItem = null;
    },

    _onActivate: function (actor, child) {
        if (child._window) {
            let metaWindow = child._window;
            this.emit('activate-window', metaWindow);
        } else if (child == this._newWindowMenuItem) {
            let current_workspace = global.screen.get_active_workspace().index();
            this._source.app.open_new_window(current_workspace);
            this.emit('activate-window', null);
        } else if (child == this._quitAppMenuItem) {
            this._source.app.request_quit();
        } else if (child == this._toggleFavoriteMenuItem) {
            let favs = AppFavorites.getAppFavorites();
            let isFavorite = favs.isFavorite(this._source.app.get_id());
            if (isFavorite)
                favs.removeFavorite(this._source.app.get_id());
            else
                favs.addFavorite(this._source.app.get_id());
        }
        this.close();
    }
};

function HoverMenu() {
    this._init.apply(this, arguments);
}

HoverMenu.prototype = {
    __proto__: PopupMenu.PopupMenu.prototype,

    _init: function(actor, params) {
        PopupMenu.PopupMenu.prototype._init.call(this, actor, 0.5, St.Side.TOP);

        params = Params.parse(params, { reactive: true });

        this._parentActor = actor;

        this.actor.hide();

        if (params.reactive) {
            Main.layoutManager.addChrome(this.actor);
        } else {
            Main.uiGroup.add_actor(this.actor);
        }
    }
};

function AppNameTooltip () {
    this._init.apply(this, arguments);
}

AppNameTooltip.prototype = {
    __proto__: HoverMenu.prototype,

    _init: function(dockIcon) {

        HoverMenu.prototype._init.call(this, dockIcon.actor, { reactive: true });

        this.dockIcon = dockIcon;

        this.appNameTooltipItem = new AppNameTooltipItem(dockIcon);
        this.addMenuItem(this.appNameTooltipItem);

        this.closeFlag = false;

        this.dockIcon.actor.reactive = true;
        this.dockIcon.actor.connect('enter-event', Lang.bind(this, this.openMenu));
        this.dockIcon.actor.connect('leave-event', Lang.bind(this, this.requestCloseMenu));
		this.actor.style_class = 'dock-tooltip-window';

        this.openMenu();
    },

    open: function(animate) {
        PopupMenu.PopupMenu.prototype.open.call(this, animate);
    },

    close: function(animate) {
        this.dockIcon.disableTooltipMenu();
        PopupMenu.PopupMenu.prototype.close.call(this, animate);
    },

    openMenu: function() {
        if (!this.isOpen) {
            this.dockIcon.enableTooltipMenu();
            this.open(true);
        }
    },

    closeMenu: function() {
        this.close(true);
    },

    requestCloseMenu: function() {
        this.closeFlag = true;

        Mainloop.timeout_add(
            TOOLTIP_DISAPPEAR_TIMEOUT,
            Lang.bind(this, function() {
                          if (this.closeFlag) {
                              this.closeMenu();
                          }

                          return false;         // don't repeat in Mainloop.timeout
                      })
        );
    }
};

function AppNameTooltipItem() {
    this._init.apply(this, arguments);
}

AppNameTooltipItem.prototype = {
    __proto__: PopupMenu.PopupBaseMenuItem.prototype,

    _init: function (dockIcon, params) {
        params = Params.parse(params, { hover: false });
        PopupMenu.PopupBaseMenuItem.prototype._init.call(this, params);

		let appName = dockIcon.app.get_name().trim();
		global.log([appName, appName.length]);
        this.text = new St.Label({ style_class: 'dock-appname-tooltip', 
								   text: appName });
        this.addActor(this.text);

        this.actor.add_style_class_name('dock-appname-tooltip-item');
    }
};

function AppThumbnailHoverMenu() {
    this._init.apply(this, arguments);
}

AppThumbnailHoverMenu.prototype = {
    __proto__: HoverMenu.prototype,

    _init: function(dockIcon) {
        HoverMenu.prototype._init.call(this, dockIcon.actor, { reactive: true });

        this.dockIcon = dockIcon;

        this.appSwitcherItem = new PopupMenuAppSwitcherItem(this, dockIcon);
        this.addMenuItem(this.appSwitcherItem);

        this.closeFlag = false;

        this.dockIcon.actor.reactive = true;
        this.dockIcon.actor.connect('enter-event', Lang.bind(this, this.openMenu));
        this.dockIcon.actor.connect('leave-event', Lang.bind(this, this.requestCloseMenu));

        this.actor.connect('enter-event', Lang.bind(this, this.stayOnMenu));
        this.actor.connect('leave-event', Lang.bind(this, this.requestCloseMenu));
		this.actor.style_class = 'dock-thumbnail-window';

        this.openMenu();
    },

    open: function(animate) {
        this.appSwitcherItem.refresh(null);
        PopupMenu.PopupMenu.prototype.open.call(this, animate);
    },

    close: function(animate) {
        this.dockIcon.disableHoverMenu();
        PopupMenu.PopupMenu.prototype.close.call(this, animate);
    },

    openMenu: function() {
        if (!this.isOpen) {
            this.dockIcon.enableHoverMenu();
            this.open(true);
        }
    },

    closeMenu: function() {
        this.close(true);
    },

    stayOnMenu: function() {
        this.closeFlag = false;
    },

    requestCloseMenu: function() {
        this.closeFlag = true;

        Mainloop.timeout_add(
            THUMBNAIL_DISAPPEAR_TIMEOUT,
            Lang.bind(this, function() {
                          if (this.closeFlag) {
                              this.closeMenu();
                          }

                          return false;         // don't repeat in Mainloop.timeout
                      })
        );
    }
};

// display a list of app thumbnails and allow
// bringing any app to focus by clicking on its thumbnail
function PopupMenuAppSwitcherItem() {
    this._init.apply(this, arguments);
}

PopupMenuAppSwitcherItem.prototype = {
    __proto__: PopupMenu.PopupBaseMenuItem.prototype,

    _init: function (menu, dockIcon, params) {
        params = Params.parse(params, { hover: false });
        PopupMenu.PopupBaseMenuItem.prototype._init.call(this, params);


        let primary = Main.layoutManager.primaryMonitor;
        this.monitorWidth = primary.width;
        this.monitorHeight = primary.height;
        this.thumbnailWindowWidth = this.monitorWidth * 9 / 10;
        this.thumbnailWindowHeight = this.monitorHeight * 9 / 10;
        this.thumbnailWindowPaddingX = 10;
        this.thumbnailWindowPaddingUp = 10;
        this.thumbnailWindowPaddingBottom = 20;
        this.thumbnailBorder = 1;
        this.thumbnailPaddingX = 10;
        this.thumbnailPaddingY = 10;
        this.thumbnailFontSize = Math.max(closeButtonSize, dockTitleSize);
        // this.thumbnailWidth = this.thumbnailWindowWidth / 5;
        this.thumbnailWidth = THUMBNAIL_DEFAULT_WIDTH;
        this.thumbnailHeight = this.thumbnailWidth * (this.monitorHeight / this.monitorWidth);

        // Those attributes need calculate dynamically.
        this.thumbnailColumns = 0;
        this.thumbnailRows = 0;
        this.requestWidth = 0;
        this.requestHeight = 0;
        this.sizeAdjustFlag = false;

        this.menu = menu;
        this.dockIcon = dockIcon;
        this.app = dockIcon.app;

        this.appContainer = new St.Table();

        this.addActor(this.appContainer);
    },

    closeWindow: function(window) {
        window.delete(global.get_current_time());
    },

    refresh: function(deleteWindow) {
        this.appContainer.get_children().forEach(
            Lang.bind(this, function (child) {
                          child.destroy();
                      }));

        let windows = this.app.get_windows().filter(function (win) {return win != deleteWindow;});
        if (windows.length == 0) {
            if (dockThumbnailMenu) {
                dockThumbnailMenu.close();
            }
            dockThumbnailMenu = null;
        } else {
            let maxWidth = 0;
            let thumbnailNum = windows.length;

            if (this.sizeAdjustFlag) {
                for (let j = 0; j < windows.length; j++) {
                    let [winWidth, winHeight] = windows[j].get_compositor_private().get_texture().get_size();
                    if (winWidth > maxWidth) {
                        maxWidth = winWidth;
                    }
                }

                this.requestWidth = this.thumbnailWidth / this.monitorWidth * maxWidth;
                this.requestHeight = this.thumbnailHeight;
            } else {
                this.requestWidth = this.thumbnailWidth;
                this.requestHeight = this.thumbnailHeight;
            }

            this.thumbnailColumns = Math.floor((this.thumbnailWindowWidth - this.thumbnailWindowPaddingX * 2) / (this.requestWidth + (this.thumbnailPaddingX + this.thumbnailBorder) * 2));
            this.thumbnailRows = Math.floor((this.thumbnailWindowHeight - this.thumbnailWindowPaddingUp - this.thumbnailWindowPaddingBottom) / (this.requestWidth + (this.thumbnailPaddingY + this.thumbnailBorder) * 2));

            let childBox = new Clutter.ActorBox();
            let rows = Math.floor(thumbnailNum / this.thumbnailColumns) + (thumbnailNum % this.thumbnailColumns ? 1 : 0);
            let windowWidth = 0;
            if (thumbnailNum > this.thumbnailColumns) {
                windowWidth = this.thumbnailColumns * this.requestWidth + this.thumbnailColumns * (this.thumbnailPaddingX + this.thumbnailBorder) * 2 + this.thumbnailWindowPaddingX * 2;
            } else {
                windowWidth = thumbnailNum * this.requestWidth + thumbnailNum * (this.thumbnailPaddingX + this.thumbnailBorder) * 2 + this.thumbnailWindowPaddingX * 2;
            }
            let windowHeight = rows * this.requestHeight + rows * (this.thumbnailPaddingY + this.thumbnailBorder) * 2 + rows * this.thumbnailFontSize + this.thumbnailWindowPaddingUp + this.thumbnailWindowPaddingBottom;
            let [iconX, iconY] = this.dockIcon.actor.get_transformed_position();
            let windowOffsetX = iconX + windowWidth / 2;
            let windowOffsetY = iconY;
            this.menu.box.set_position(windowOffsetX, windowOffsetY);
            this.menu.box.set_size(windowWidth, windowHeight);

            for (let i = 0; i < windows.length; i++) {
                let index = i;
                let iconRow = Math.floor(index / this.thumbnailColumns);
                let iconColumn = index % this.thumbnailColumns;
                let windowThumbnail = new DockThumbnail(
                    this.app,
                    windows[i],
                    this.requestWidth,
                    this.requestHeight,
                    this,
                    this.menu);
                this.appContainer.add(windowThumbnail.actor,
                                      {row: iconRow,
                                       col: iconColumn
                                      });
            }
        }
    }
};

function allocate(actor, box, flags) {
    let allocWidth = box.x2 - box.x1;
    let allocHeight = box.y2 - box.y1;

    let [leftMinWidth, leftNaturalWidth] = panel._leftBox.get_preferred_width(-1);
    let [centerMinWidth, centerNaturalWidth] = panel._centerBox.get_preferred_width(-1);
    let [rightMinWidth, rightNaturalWidth] = panel._rightBox.get_preferred_width(-1);

    let sideWidth = allocWidth - rightNaturalWidth - centerNaturalWidth;

    let childBox = new Clutter.ActorBox();

    childBox.y1 = 0;
    childBox.y2 = allocHeight;
    if (panel.actor.get_direction() == St.TextDirection.RTL) {
        childBox.x1 = allocWidth - Math.min(Math.floor(sideWidth), leftNaturalWidth);
        childBox.x2 = allocWidth;
    } else {
        childBox.x1 = 0;
        childBox.x2 = Math.min(Math.floor(sideWidth), leftNaturalWidth);
    }
    panel._leftBox.allocate(childBox, flags);

    childBox.y1 = 0;
    childBox.y2 = allocHeight;
    if (panel.actor.get_direction() == St.TextDirection.RTL) {
        childBox.x1 = rightNaturalWidth;
        childBox.x2 = childBox.x1 + centerNaturalWidth;
    } else {
        childBox.x1 = allocWidth - centerNaturalWidth - rightNaturalWidth;
        childBox.x2 = childBox.x1 + centerNaturalWidth;
    }
    panel._centerBox.allocate(childBox, flags);

    childBox.y1 = 0;
    childBox.y2 = allocHeight;
    if (panel.actor.get_direction() == St.TextDirection.RTL) {
        childBox.x1 = 0;
        childBox.x2 = rightNaturalWidth;
    } else {
        childBox.x1 = allocWidth - rightNaturalWidth;
        childBox.x2 = allocWidth;
    }
    panel._rightBox.allocate(childBox, flags);

    let [cornerMinWidth, cornerWidth] = panel._leftCorner.actor.get_preferred_width(-1);
    let [cornerMinHeight, cornerHeight] = panel._leftCorner.actor.get_preferred_width(-1);
    childBox.x1 = 0;
    childBox.x2 = cornerWidth;
    childBox.y1 = allocHeight;
    childBox.y2 = allocHeight + cornerHeight;
    panel._leftCorner.actor.allocate(childBox, flags);

    let [cornerMinWidth, cornerWidth] = panel._rightCorner.actor.get_preferred_width(-1);
    let [cornerMinHeight, cornerHeight] = panel._rightCorner.actor.get_preferred_width(-1);
    childBox.x1 = allocWidth - cornerWidth;
    childBox.x2 = allocWidth;
    childBox.y1 = allocHeight;
    childBox.y2 = allocHeight + cornerHeight;
    panel._rightCorner.actor.allocate(childBox, flags);
}

function MyBox(label) {
    this._init(label);
}

MyBox.prototype = {
    _init: function(label) {
        this.actor = new Shell.GenericContainer();
        this._label = label;
        this.actor.add_actor(label);
        this._width = 0;

        this.actor.connect('get-preferred-width', Lang.bind(this, this._getPreferredWidth));
        this.actor.connect('get-preferred-height', Lang.bind(this, this._getPreferredHeight));
        this.actor.connect('allocate', Lang.bind(this, this._allocate));
    },

    _getPreferredWidth: function(actor, forHeight, alloc) {
        let [minWidth, natWidth] = this._label.get_preferred_width(forHeight);

        alloc.min_size = minWidth;

        let delta = Math.abs(this._width - natWidth);
        if ( this._width == 0 || delta*100/this._width > 10 ) {
            alloc.natural_size = this._width = natWidth+4;
        }
        else if ( natWidth > this._width ) {
            alloc.natural_size = this._width = natWidth;
        }
        else {
            alloc.natural_size = this._width;
        }
    },

    _getPreferredHeight: function(actor, forWidth, alloc) {
        let [minHeight, natHeight] = this._label.get_preferred_height(forWidth);
        alloc.min_size = minHeight;
        alloc.natural_size = natHeight;
    },

    _allocate: function(actor, box, flags) {
        let availWidth = box.x2 - box.x1;
        let availHeight = box.y2 - box.y1;

        let [minChildWidth, minChildHeight, natChildWidth, natChildHeight] =
            this._label.get_preferred_size();

        let childWidth = Math.min(natChildWidth, availWidth);
        let childHeight = Math.min(natChildHeight, availHeight);

        let childBox = new Clutter.ActorBox();
        childBox.x1 = 0;
        childBox.y1 = 0;
        childBox.x2 = childBox.x1 + childWidth;
        childBox.y2 = childBox.y1 + childHeight;
        this._label.allocate(childBox, flags);
    }
};

function ShowDesktopTooltip () {
    this._init.apply(this, arguments);
}

ShowDesktopTooltip.prototype = {
    __proto__: HoverMenu.prototype,

    _init: function(dockIcon) {

        HoverMenu.prototype._init.call(this, dockIcon.actor, { reactive: true });

        this.dockIcon = dockIcon;

        this.appNameTooltipItem = new ShowDesktopTooltipItem();
        this.addMenuItem(this.appNameTooltipItem);

        this.closeFlag = false;

        this.dockIcon.actor.reactive = true;
        this.dockIcon.actor.connect('enter-event', Lang.bind(this, this.openMenu));
        this.dockIcon.actor.connect('leave-event', Lang.bind(this, this.requestCloseMenu));
		this.actor.style_class = 'dock-tooltip-window';

        this.openMenu();
    },

    open: function(animate) {
        PopupMenu.PopupMenu.prototype.open.call(this, animate);
    },

    close: function(animate) {
        this.dockIcon.disableTooltipMenu();
        PopupMenu.PopupMenu.prototype.close.call(this, animate);
    },

    openMenu: function() {
        if (!this.isOpen) {
            this.dockIcon.enableTooltipMenu();
            this.open(true);
        }
    },

    closeMenu: function() {
        this.close(true);
    },

    requestCloseMenu: function() {
        this.closeFlag = true;

        Mainloop.timeout_add(
            TOOLTIP_DISAPPEAR_TIMEOUT,
            Lang.bind(this, function() {
                          if (this.closeFlag) {
                              this.closeMenu();
                          }

                          return false;         // don't repeat in Mainloop.timeout
                      })
        );
    }
};

function ShowDesktopTooltipItem() {
    this._init.apply(this, arguments);
}

ShowDesktopTooltipItem.prototype = {
    __proto__: PopupMenu.PopupBaseMenuItem.prototype,

    _init: function (params) {
        params = Params.parse(params, { hover: false });
        PopupMenu.PopupBaseMenuItem.prototype._init.call(this, params);

        this.text = new St.Label({ style_class: 'dock-appname-tooltip', text: _("Show Desktop") });
        this.addActor(this.text);

        this.actor.add_style_class_name('dock-appname-tooltip-item');
    }
};

function init(extensionMeta) {
    let localePath = extensionMeta.path + '/locale';
    Gettext.bindtextdomain('dock', localePath);
    _ = Gettext.domain('dock').gettext;

    // Init move clock.
    dateMenu = Main.panel._dateMenu;
    label = dateMenu._clock;

    // Init extend left box.
    panel = Main.panel;

    // Init dock.
    appMenu = Main.panel._appMenu;
    dockFramePaddingX = 2;
    dockFramePaddingY = 0;
    dockIconPaddingY = 2;
    [panelMinHeight, panelNaturalHeight] = Main.panel.actor.get_preferred_height(-1);
    leftBoxWidth = Main.panel._leftBox.get_width();
    dockFrameHeight = Math.floor(panelNaturalHeight - 2 * dockFramePaddingY); // panel border is 1, so adjust 1
    dockFrameWidth = Math.floor(dockFrameHeight * 1.6);
    leftOffset = -16;           // _leftBox looks have padding at right, so i add this offset
    dockIconSize = dockFrameHeight - 2 * dockIconPaddingY;
}


function enable() {
    // Move clock.
    Main.panel._centerBox.remove_actor(dateMenu.actor);

    dateMenu.actor.remove_actor(label);
    box = new MyBox(label);
    dateMenu.actor.add_actor(box.actor);

    let children = Main.panel._rightBox.get_children();
    Main.panel._rightBox.insert_actor(dateMenu.actor, children.length-1);

    // Extend left box.
    panelConnectId = panel.actor.connect('allocate', allocate);

    // Remove application menu.
    Main.panel._leftBox.remove_actor(appMenu.actor);

    // Add dock.
    dock = new Dock();
    Main.panel._leftBox.add(dock._grid, {x_fill: true, y_fill: true});
}

function disable() {
    // Restore clock position.
    Main.panel._rightBox.remove_actor(dateMenu.actor);
    box.actor.remove_actor(label);
    box.actor.destroy();
    box = null;
    dateMenu.actor.add_actor(label);
    Main.panel._centerBox.add_actor(dateMenu.actor);

    // Restore left box.
    panel.actor.disconnect(panelConnectId);

    // Remove dock.
    dock.destroy();
    dock = null;

    // Restore application menu.
    Main.panel._leftBox.insert_actor(appMenu.actor, 1);
}
