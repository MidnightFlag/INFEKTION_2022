const AltTab = imports.ui.altTab;
const Clutter = imports.gi.Clutter;
const Gdk = imports.gi.Gdk;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const Main = imports.ui.main;
const Meta = imports.gi.Meta;
const Mainloop = imports.mainloop;
const ModalDialog = imports.ui.modalDialog;
const Shell = imports.gi.Shell;
const St = imports.gi.St;
const Tweener = imports.ui.tweener;
const WindowManager = imports.ui.windowManager;

const POPUP_FADE_OUT_TIME = 0.1; // seconds
const ENABLE_HOVER_TIMEOUT = 500; // milliseconds

const SELECT_KEEP = 0;
const SELECT_NEXT = 1;
const SELECT_PREV = 2;

const Gettext = imports.gettext;
let _;

function primaryModifier(mask) {
    if (mask == 0)
        return 0;

    let primary = 1;
    while (mask > 1) {
        mask >>= 1;
        primary <<= 1;
    }
    return primary;
}

function SwitchThumbnailIcon(app, window, activeWorkspace, width, height) {
    this._init(app, window, activeWorkspace, width, height);
}

SwitchThumbnailIcon.prototype = {
    _init : function(app, window, activeWorkspace, width, height) {
        this.app = app;
        this.window = window;
        this.isWorkspace = !(window.get_workspace() == activeWorkspace);

        this.highlighted = false;

        this.actor = new St.Button({style_class: 'thumbnail-icon',
                                    reactive: true,
                                    can_focus: true});

        this.actorBox = new St.BoxLayout({vertical: true,
                                          can_focus: true});
        this.actor.set_child(this.actorBox);

        this.icon = null;
        this._iconBin = new St.Bin({ x_fill: true, y_fill: true });
        this.iconWidth = width;
        this.iconHeight = height;
        this.set_size(this.iconWidth, this.iconHeight);

        this.actorBox.add(this._iconBin, { x_fill: true, y_fill: true } );

        let title = window.get_title();
        if (this.isWorkspace) {
            this.label = new St.Label(
                {style_class: 'thumbnail-icon-font',
                 text: _("Workspace ") + (window.get_workspace().index() + 1)});
            let bin = new St.Bin({ x_align: St.Align.MIDDLE });
            bin.add_actor(this.label);
            this.actorBox.add(bin);
        } else if (title) {
            this.label = new St.Label(
                {style_class: 'thumbnail-icon-font',
                 text: title });
            let bin = new St.Bin({ x_align: St.Align.MIDDLE});
            bin.add_actor(this.label);
            this.actorBox.add(bin);
        } else {
            this.label = new St.Label(
                {style_class: 'thumbnail-icon-font',
                 text: this.app.get_name() });
            let bin = new St.Bin({ x_align: St.Align.MIDDLE });
            bin.add_actor(this.label);
            this.actorBox.add(bin);
        }
    },

    select: function() {
        if (!this.highlighted) {
            if (this.isWorkspace) {
                this.actor.add_style_pseudo_class('workspaceSelected');
            } else {
                this.actor.add_style_pseudo_class('windowSelected');
            }
            this.highlighted = true;
        }
    },

    unselect: function() {
        if (this.highlighted) {
            if (this.isWorkspace) {
                this.actor.remove_style_pseudo_class('workspaceSelected');
            } else {
                this.actor.remove_style_pseudo_class('windowSelected');
            }
            this.highlighted = false;
        }
    },

    get_workspace_clone: function(workspaceIndex) {
        // Get monitor size and scale value.
        let monitor = Main.layoutManager.primaryMonitor;
        let scaleX = this.iconWidth / monitor.width;
        let scaleY = this.iconHeight / monitor.height;

        // Create actor group.
        let clone = new Clutter.Group({clip_to_allocation: true});
        clone.set_size(monitor.width, monitor.height);

        // Add background.
        let background = Meta.BackgroundActor.new_for_screen(global.screen);
        background.set_scale(scaleX, scaleY);
        clone.add_actor(background);

        // Add panel.
        let [panelWidth, panelHeight] = Main.panel.actor.get_size();
        let panel = new Clutter.Clone(
            {source: Main.panel.actor,
             reactive: true,
             x: 0,
             y: 0,
             width: panelWidth * scaleX,
             height: panelHeight * scaleY
            }
        );
        clone.add_actor(panel);

        // Scale workspace windows.
        let apps = Shell.AppSystem.get_default().get_running();
        let workspaceWindows = [];
        for (let i = 0; i < apps.length; i++) {
            let windows = apps[i].get_windows();
            for (let j = 0; j < windows.length; j++) {
                if (windows[j].get_workspace().index() == workspaceIndex) {
                    workspaceWindows.push(windows[j]);
                }
            }
        }

        // Sort workspace windows.
        workspaceWindows.sort(Lang.bind(this, this._sortWindow));

        // Add workspace windows.
        for (let ii = 0; ii < workspaceWindows.length; ii++) {
            let windowTexture = workspaceWindows[ii].get_compositor_private().get_texture();
            let rect = workspaceWindows[ii].get_outer_rect();
            let windowClone = new Clutter.Clone(
                {source: windowTexture,
                 reactive: true,
                 x: rect.x * scaleX,
                 y: rect.y * scaleY,
                 width: rect.width * scaleX,
                 height: rect.height * scaleY
                });

            clone.add_actor(windowClone);
        }

        return clone;
    },

    _sortWindow : function(window1, window2) {
        let t1 = window1.get_user_time();
        let t2 = window2.get_user_time();
        if (t2 < t1) {
            return 1;
        } else {
            return -1;
        }
    },

    set_size: function(iconWidth, iconHeight) {
        let clone = null;

        if (this.isWorkspace) {
            // Show workspace thumbnail this.isWorkspace.
            clone = this.get_workspace_clone(this.window.get_workspace().index());
        } else {
            // Otherwise show application thumbnail.
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

            let appIconSize = 32;
            let appIconBoxSize = 42;
            let appIcon = this.app.create_icon_texture(appIconSize);
            let appIconBox = new St.Bin( { style_class: 'thumbnail-app-icon-box'});
            appIconBox.set_position(this.iconWidth - appIconBoxSize, this.iconHeight - appIconBoxSize);
            appIconBox.add_actor(appIcon);
            clone.add_actor(appIconBox);
        }

        this.icon = this.app.create_icon_texture(iconWidth);
        this._iconBin.set_size(iconWidth, iconHeight);

        this._iconBin.child = clone;
    }
};

function SwitchPopupWindow() {
    this._init();
}

SwitchPopupWindow.prototype = {
    _init: function() {
        let primary = Main.layoutManager.primaryMonitor;
        this.monitorWidth = primary.width;
        this.monitorHeight = primary.height;
        this.windowWidth = this.monitorWidth * 2 / 3;
        this.thumbnailBorder = 1;
        this.thumbnailPaddingX = 10;
        this.thumbnailPaddingY = 10;
        this.thumbnailFontSize = 15;
        this.windowPaddingX = 10;
        this.windowPaddingUp = 10;
        this.windowPaddingBottom = 20;
        this.thumbnailColumns = 4;
        this.thumbnailRows = 4;
        this.thumbnailWidth = (this.windowWidth - (this.thumbnailColumns * (this.thumbnailPaddingX + this.thumbnailBorder) * 2) - this.windowPaddingX * 2) / this.thumbnailColumns;
        this.thumbnailHeight = this.thumbnailWidth * (this.monitorHeight / this.monitorWidth);

        [this.windows, this.workspaces] = this.getAppsList();
        this.thumbnailNum = this.windows.length + this.workspaces.length;

        this.actor = new Shell.GenericContainer({ name: 'altTabPopup',
                                                  reactive: true,
                                                  visible: false,
                                                  can_focus: true
                                                });

        this.actor.connect('get-preferred-width', Lang.bind(this, this.getPreferredWidth));
        this.actor.connect('get-preferred-height', Lang.bind(this, this.getPreferredHeight));
        this.actor.connect('allocate', Lang.bind(this, this.allocate));
        this.actor.connect('destroy', Lang.bind(this, this.destroy));

        this.table = new St.Table({style_class: 'thumbnail-window'});
        this.actor.add_actor(this.table);

        for (let i = 0; i < this.windows.length; i++) {
            let index = i;
            let iconRow = Math.floor(index / this.thumbnailColumns);
            let iconColumn = index % this.thumbnailColumns;
            this.table.add(this.windows[i].actor,
                           {row: iconRow,
                            col: iconColumn
                           });

            // Handle hover event.
            this.windows[i].actor.connect(
                'notify::hover',
                Lang.bind(this, function() {
                              this.selectThumbnail(SELECT_KEEP, index, true);
                          }));
            this.windows[i].actor.connect(
                'clicked',
                Lang.bind(this, function() {
                              this.currentThumbnailIndex = index;
                              this.finish();
                          }));
        }

        for (let j = 0; j < this.workspaces.length; j++) {
            let index = this.windows.length + j;
            let iconRow = Math.floor(index / this.thumbnailColumns);
            let iconColumn = index % this.thumbnailColumns;
            this.table.add(this.workspaces[j].actor, {row: iconRow, col: iconColumn});

            // Handle hover event.
            this.workspaces[j].actor.connect(
                'notify::hover',
                Lang.bind(this, function() {
                              this.selectThumbnail(SELECT_KEEP, index, true);
                          }));
            this.workspaces[j].actor.connect(
                'clicked',
                Lang.bind(this, function() {
                              this.currentThumbnailIndex = index;
                              this.finish();
                          }));
        }

        this.haveModal = false;
        this.modifierMask = 0;
        this.currentThumbnailIndex = 0;

        this.enableHoverFlag = false;
        this.hoverTimeoutId = Mainloop.timeout_add(ENABLE_HOVER_TIMEOUT, Lang.bind(this, this.enableHover));

        Main.uiGroup.add_actor(this.actor);
    },

    enableHover: function() {
        this.enableHoverFlag = true;

        return false;
    },

    getAppsList: function() {
        let activeWorkspace = global.screen.get_active_workspace();
        let workspaceIcons = [];
        let otherWorkspaces = {};
        let workspaceIndex = null;
        let appSys = Shell.AppSystem.get_default();
        let apps = appSys.get_running ();

        for (let i = 0; i < apps.length; i++) {
            let windows = apps[i].get_windows();
            for(let j = 0; j < windows.length; j++) {
                let appIcon = new SwitchThumbnailIcon(
                    apps[i],
                    windows[j],
                    activeWorkspace,
                    this.thumbnailWidth,
                    this.thumbnailHeight);

                if (this._isWindowOnWorkspace(windows[j], activeWorkspace)) {
                    // Add application in current workspace to list.
                    workspaceIcons.push(appIcon);
                } else {
                    // Add other worspace.
                    workspaceIndex = windows[j].get_workspace().index();
                    if (otherWorkspaces[workspaceIndex]) {
                        let oldTime = otherWorkspaces[workspaceIndex].window.get_user_time();
                        let newTime = appIcon.window.get_user_time();
                        if (newTime > oldTime) {
                            // Update topest application in workspace dict.
                            otherWorkspaces[workspaceIndex] = appIcon;
                        }
                    } else {
                        // Fill workspace this is first application.
                        otherWorkspaces[workspaceIndex] = appIcon;
                    }
                }
            }
        }


        workspaceIcons.sort(Lang.bind(this, this._sortAppIcon));

        let workspaces = [];

        // Sort workspace by index.
        let keys = [];
        for (k in otherWorkspaces) {
            keys.push(k);
        }
        keys.sort();

        for (let jj = 0; jj < keys.length; jj++) {
            workspaces.push(otherWorkspaces[keys[jj]]);
        }

        return [workspaceIcons, workspaces];
    },

    _isWindowOnWorkspace: function(w, workspace) {
        if (w.get_workspace() == workspace)
            return true;
        return false;
    },

    _sortAppIcon : function(appIcon1, appIcon2) {
        let t1 = appIcon1.window.get_user_time();
        let t2 = appIcon2.window.get_user_time();
        if (t2 > t1) return 1;
        else return -1;
    },

    getPreferredWidth: function (actor, forHeight, alloc) {
        alloc.min_size = global.screen_width;
        alloc.natural_size = global.screen_width;
    },

    getPreferredHeight: function (actor, forWidth, alloc) {
        alloc.min_size = global.screen_height;
        alloc.natural_size = global.screen_height;
    },

    allocate: function(actor, box, flags) {
        let childBox = new Clutter.ActorBox();
        let rows = Math.floor(this.thumbnailNum / this.thumbnailColumns) + (this.thumbnailNum % this.thumbnailColumns ? 1 : 0);
        let windowWidth = 0;
        if (this.thumbnailNum > this.thumbnailColumns) {
            windowWidth = this.thumbnailColumns * this.thumbnailWidth + this.thumbnailColumns * (this.thumbnailPaddingX + this.thumbnailBorder) * 2 + this.windowPaddingX * 2;
        } else {
            windowWidth = this.thumbnailNum * this.thumbnailWidth + this.thumbnailNum * (this.thumbnailPaddingX + this.thumbnailBorder) * 2 + this.windowPaddingX * 2;
        }
        let windowHeight = rows * this.thumbnailHeight + rows * (this.thumbnailPaddingY + this.thumbnailBorder) * 2 + rows * this.thumbnailFontSize + this.windowPaddingUp + this.windowPaddingBottom;
        let windowOffsetX = (this.monitorWidth - windowWidth) / 2;
        let windowOffsetY = (this.monitorHeight - windowHeight) / 2;
        childBox.x1 = windowOffsetX;
        childBox.y1 = windowOffsetY;
        childBox.x2 = windowOffsetX + windowWidth;
        childBox.y2 = windowOffsetY + windowHeight;
        this.table.allocate(childBox, flags);
    },

    show: function(backward, binding, mask) {
        if (this.windows.length == 0 && this.workspaces.length == 0) {
            return false;
        }

        if (!Main.pushModal(this.actor)) {
            return false;
        }

        this.haveModal = true;
        this.modifierMask = primaryModifier(mask);

        this.actor.connect('key-press-event', Lang.bind(this, this.keyPressEvent));
        this.actor.connect('key-release-event', Lang.bind(this, this.keyReleaseEvent));

        this.actor.show();

        this.selectThumbnail(SELECT_NEXT, this.currentThumbnailIndex, false);

        return true;
    },

    finish: function() {
        let currentThumbnail = this.getThumbnailByIndex(this.currentThumbnailIndex);
        if (currentThumbnail) {
            Main.activateWindow(currentThumbnail.window);
        }

        this.destroy();
    },

    destroy: function() {
        this.popModal();
        if (this.actor.visible) {
            Tweener.addTween(this.actor,
                             { opacity: 0,
                               time: POPUP_FADE_OUT_TIME,
                               transition: 'easeOutQuad',
                               onComplete: Lang.bind(this,
                                                     function() {
                                                         this.actor.destroy();
                                                     })
                             });
        } else
            this.actor.destroy();
    },

    popModal: function() {
        if (this.haveModal) {
            Main.popModal(this.actor);
            this.haveModal = false;
        }
    },

    keyPressEvent: function(actor, event) {
        let keysym = event.get_key_symbol();
        let event_state = Shell.get_event_state(event);
        let backwards = event_state & Clutter.ModifierType.SHIFT_MASK;
        let action = global.display.get_keybinding_action(event.get_key_code(), event_state);

        if (keysym == Clutter.Escape) {
            this.destroy();
        } else if (action == Meta.KeyBindingAction.SWITCH_GROUP) {
            this.selectThumbnail(SELECT_NEXT, this.currentThumbnailIndex, false);
        } else if (action == Meta.KeyBindingAction.SWITCH_GROUP_BACKWARD) {
            this.selectThumbnail(SELECT_PREV, this.currentThumbnailIndex, false);
        } else if (action == Meta.KeyBindingAction.SWITCH_WINDOWS) {
            this.selectThumbnail(SELECT_NEXT, this.currentThumbnailIndex, false);
        } else if (action == Meta.KeyBindingAction.SWITCH_WINDOWS_BACKWARD) {
            this.selectThumbnail(SELECT_PREV, this.currentThumbnailIndex, false);
        } else if (keysym == Clutter.Left) {
            this.selectThumbnail(SELECT_PREV, this.currentThumbnailIndex, false);
        } else if (keysym == Clutter.Right) {
            this.selectThumbnail(SELECT_NEXT, this.currentThumbnailIndex, false);
        } else if (keysym == Clutter.Up) {
            let prevRowIndex = this.getPrevRowIndex();
            this.selectThumbnail(SELECT_KEEP, prevRowIndex, false);
        } else if (keysym == Clutter.Down) {
            let nextRowIndex = this.getNextRowIndex();
            this.selectThumbnail(SELECT_KEEP, nextRowIndex, false);
        } else if (keysym == Clutter.Home) {
            this.selectThumbnail(SELECT_KEEP, 0, false);
        } else if (keysym == Clutter.End) {
            this.selectThumbnail(SELECT_KEEP, this.thumbnailNum - 1, false);
        } else {
			let numKey = keysym - Clutter.KEY_0;
			if (numKey > 0 && numKey < 10) {
				for (let i = 0; i < this.workspaces.length; i++) {
					if (numKey == this.workspaces[i].window.get_workspace().index() + 1) {
						this.selectThumbnail(SELECT_KEEP, this.windows.length + i, false);
					}
				}
			}
		}

        this.actor.show();

        return true;
    },

    getNextRowIndex: function() {
        let nextIndex = this.currentThumbnailIndex + this.thumbnailColumns;

        if (nextIndex <= this.thumbnailNum - 1) {
            return nextIndex;
        } else {
            let nextRow = Math.floor(nextIndex / this.thumbnailColumns);
            let maxRow = Math.floor((this.thumbnailNum - 1) / this.thumbnailColumns);

            if (nextRow == maxRow) {
                return this.thumbnailNum - 1;
            } else {
                return nextIndex - ((maxRow + 1) * this.thumbnailColumns);
            }
        }
    },

    getPrevRowIndex: function() {
        let prevIndex = this.currentThumbnailIndex - this.thumbnailColumns;
        if (prevIndex >= 0) {
            return prevIndex;
        } else {
            let maxRow = Math.floor((this.thumbnailNum - 1) / this.thumbnailColumns);
            prevIndex += (maxRow + 1) * this.thumbnailColumns;
            if (prevIndex > this.thumbnailNum - 1) {
                return this.thumbnailNum - 1;
            } else {
                return prevIndex;
            }
        }
    },

    selectThumbnail: function(selectType, index, mouseHover) {
        if (!mouseHover || this.enableHoverFlag) {
            // Init.
            let thumbnailNum = this.windows.length + this.workspaces.length;

            // Unselect current thumbnail.
            let currentThumbnail = this.getThumbnailByIndex(this.currentThumbnailIndex);
            if (currentThumbnail) {
                currentThumbnail.unselect();
            }

            // Select target thumbnail.
            let targetIndex = 0;
            if (selectType == SELECT_KEEP) {
                targetIndex = index;
            } else if (selectType == SELECT_NEXT) {
                if (index >= 0 && index < thumbnailNum - 1) {
                    targetIndex = index + 1;
                } else {
                    targetIndex = 0;
                }
            } else if (selectType == SELECT_PREV) {
                if (index == 0) {
                    targetIndex = thumbnailNum - 1;
                } else if (index > 0 && index < thumbnailNum) {
                    targetIndex = index - 1;
                } else {
                    targetIndex = 0;
                }
            }

            let targetThumbnail = this.getThumbnailByIndex(targetIndex);
            if (targetThumbnail) {
                targetThumbnail.select();
                this.currentThumbnailIndex = targetIndex;
            }
        }
    },

    getThumbnailByIndex: function(index) {
        let thumbnailNum = this.windows.length + this.workspaces.length;

        if (index >= 0 && index < thumbnailNum) {
            if (index < this.windows.length) {
                return this.windows[index];
            } else {
                return this.workspaces[index - this.windows.length];
            }
        } else {
            return null;
        }
    },

    keyReleaseEvent: function(actor, event) {
        let [x, y, mods] = global.get_pointer();
        let state = mods & this.modifierMask;

        if (state == 0)
            this.finish();

        return true;
    }

};

function init(extensionMeta) {
    let localePath = extensionMeta.path + '/locale';
    Gettext.bindtextdomain('alt-tab', localePath);
    _ = Gettext.domain('alt-tab').gettext;
}

function doAltTab(shellwm, binding, mask, window, backwards) {
    let switchPopupWindow = new SwitchPopupWindow();

    if (!switchPopupWindow.show(backwards, binding, mask)) {
        switchPopupWindow.destroy();
        global.log("popup window failed");
    }
}

function enable() {
    Main.wm.setKeybindingHandler('switch_windows', doAltTab);
    Main.wm.setKeybindingHandler('switch_group', doAltTab);
    Main.wm.setKeybindingHandler('switch_windows_backward', doAltTab);
    Main.wm.setKeybindingHandler('switch_group_backward', doAltTab);
}

function disable() {
    Main.wm.setKeybindingHandler('switch_windows', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
    Main.wm.setKeybindingHandler('switch_group', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
    Main.wm.setKeybindingHandler('switch_windows_backward', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
    Main.wm.setKeybindingHandler('switch_group_backward', Lang.bind(Main.wm, Main.wm._startAppSwitcher));
}
