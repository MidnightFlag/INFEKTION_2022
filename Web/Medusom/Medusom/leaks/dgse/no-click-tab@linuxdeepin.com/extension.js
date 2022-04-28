const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Mainloop = imports.mainloop;

const HOVER_TIMEOUT = 100;

let tabs = null;
let tabHoverStatus = {};
let tabHoverTimeoutIds = {};
let tabSignalIds = [];

function onTabLeave(index, tab) {
	if (tabHoverStatus[index]) {
		// Disable tab hover status if cursor out of tab area.
		tabHoverStatus[index] = false;
		
		// And try to remove timeout handler.
		if (tabHoverTimeoutIds[index]) {
			Mainloop.source_remove(tabHoverTimeoutIds[index]);
		}
	}
}

function onTabEnter(index, tab) {
	// Enable tab hover status.
	tabHoverStatus[index] = true;
		
	// And add timeout handler.
	// Timeout handler will run if cursor still in tab area then.
	tabHoverTimeoutIds[index] = Mainloop.timeout_add(HOVER_TIMEOUT, function() {onTabHoverTimeout(index, tab);});
}

function onTabHoverTimeout(index, tab) {
	// Just show tab view when cursor still at tab when timeout.
	if (tabHoverStatus[index]) {
		tab._activate();
	}
	
	return false;
}

function init() {
}

function enable() {
	tabs = Main.overview._viewSelector._tabs;
	
	for (let i = 0; i < tabs.length; i++) {
		let tab = tabs[i];
		let entryId = tab.title.connect('enter-event', function() {onTabEnter(i, tab);});
		let leaveId = tab.title.connect('leave-event', function() {onTabLeave(i, tab);});
		tabSignalIds.push([entryId, leaveId]);
	}
}

function disable() {
	// Disconnect handler.
	for (let i = 0; i < tabs.length; i++) {
		if (tabSignalIds[i][0]) {
			tabs[i].title.disconnect(tabSignalIds[i][0]);
		}
		if (tabSignalIds[i][1]) {
			tabs[i].title.disconnect(tabSignalIds[i][1]);
		}
	}
	
	// Reset.
	tabs = null;
	tabHoverStatus = {};
	tabHoverTimeoutIds = {};
	tabSignalIds = [];
}
