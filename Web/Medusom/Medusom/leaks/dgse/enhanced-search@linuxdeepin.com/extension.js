/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */
/* Asynchronous Gnote Search Provider for Gnome Shell
 *
 * Copyright (c) 2011 Casey Harkins <charkins@pobox.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

const Util = imports.misc.util;
const Main = imports.ui.main;
const DBus = imports.dbus;
const Lang = imports.lang;
const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Mainloop = imports.mainloop;
const Search = imports.ui.search;

const Gettext = imports.gettext;

let searchEngines;
let searchProvidersBox = null;
let searchEngineProvider = null;
let currentPath = null;
let _;

function SearchEngineProvider() {
    this._init();
}

SearchEngineProvider.prototype = {
    __proto__: Search.SearchProvider.prototype,

    _init: function(name) {
        Search.SearchProvider.prototype._init.call(this, _("Search Engine"));
    },

    /* get the title and icon for a search result */
    getResultMeta: function(id) {
        let title = id.title;

        return { 'id': id,
                 'name': title,
                 'createIcon': function(size) {
                     let iconFile = Gio.file_new_for_path(currentPath + "/" + id.icon);
                     let fileIcon = new Gio.FileIcon({file: iconFile});
                     return new St.Icon({icon_size: size,
                                         gicon: fileIcon
                                        });
                 }

               };
    },


    /* display a note with search terms highlighted */
    activateResult: function(id, params) {
        Util.trySpawnCommandLine("xdg-open " + id.uri + id.search);
    },

    listSearchEngine: function(terms) {
        let searchString = encodeURIComponent(terms.join(' '));

        for (let i = 0; i < searchEngines.length; i++) {
            searchEngines[i].search = searchString;
        }

        return searchEngines;
    },

    /* start asynchronous search for terms */
    getInitialResultSet: function(terms) {
        return this.listSearchEngine(terms);
    },

    getSubsearchResultSet: function(previousResults, terms) {
        return this.listSearchEngine(terms);
    }
};

function init(extensionMeta) {
    let localePath = extensionMeta.path + '/locale';
    Gettext.bindtextdomain('enhanced-search', localePath);
    _ = Gettext.domain('enhanced-search').gettext;

    let google = {'uri': "http://www.google.com.hk/search?ie=UTF-8&q=",
                  'title': _("Google"),
                  'icon': "google.png"
                 };
    let baidu = {'uri': "http://www.baidu.com/s?tn=sndo_1_dg&tr=mk3SLVN4HKm&word=",
                 'title': _("Baidu"),
                 'icon': "baidu.png"
                };
	let taobao = {'uri': "http://s.taobao.com/search?q=",
                 'title': _("Taobao"),
                 'icon': "taobao.png"
                };
    let yahoo = {'uri': "http://cn.search.yahoo.com/search?ie=UTF-8&p=",
                 'title': _("Yahoo!"),
                 'icon': "yahoo.png"
                };
    let bing = {'uri': "http://cn.bing.com/search?q=",
                'title': _("Bing"),
                'icon': "bing.png"
               };
    let flickr = {'uri': "http://www.flickr.com/search/?f=hp&q=",
                  'title': _("Flickr"),
                  'icon': "flickr.png"
                 };
    let wikipedia = {'uri': "http://zh.wikipedia.org/wiki/",
                     'title': _("Wikipedia"),
                     'icon': "wikipedia.png"
                    };
    let twitter = {'uri': "https://twitter.com/search?q=",
                   'title': _("Twitter"),
                   'icon': "twitter.png"
                  };
    let youtube = {'uri': "http://www.youtube.com/results?search_query=",
                   'title': _("YouTube"),
                   'icon': "youtube.png"
                  };
	searchEngines = eval(_("[google, bing, yahoo, flickr, wikipedia, twitter, youtube]"));

    searchProvidersBox = Main.overview._viewSelector._searchTab._searchResults._searchProvidersBox;
    currentPath = extensionMeta.path;
}

function enable() {
    if(searchEngineProvider==null) {
        searchEngineProvider = new SearchEngineProvider();
        Main.overview.addSearchProvider(searchEngineProvider);
    }

    searchProvidersBox.hide_all();
}

function disable() {
    if(searchEngineProvider != null) {
        Main.overview.removeSearchProvider(searchEngineProvider);
        searchEngineProvider = null;
    }

    searchProvidersBox.show_all();
}
