const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;

let dash = null;
let viewSelector = null;
let viewSelectorBar = null;
let viewSelectorX = null;
let viewSelectorY = null;
let viewSelectorWidth = null;
let viewSelectorHeight = null;

let adjustSignalId = null;

function adjustCoordinate() {
	// Adjust view selector coordinates.
	viewSelector.set_position(0, viewSelectorY);
	viewSelector.set_size(viewSelectorWidth + viewSelectorX, viewSelectorHeight);
}

function init(extensionMeta) {
	// Get dash and actors.
	dash = Main.overview._dash._box;
	
	viewSelector = Main.overview._viewSelector.actor;
	viewSelectorBar = Main.overview._viewSelector._tabBar;
	
	// Get view selector size and coordinates.
	[viewSelectorX, viewSelectorY] = viewSelector.get_position();
	[viewSelectorWidth, viewSelectorHeight] = viewSelector.get_size();
}

function enable() {
	// Hide dash.
	dash.hide_all();
	
	// Add adjust callback when _tabBar allocate.
	adjustSignalId = viewSelectorBar.connect('allocate', Lang.bind(viewSelector, adjustCoordinate));
}

function disable() {
	// Show dash.
	dash.show_all();
	
	// Disconnect adjust callback.
	viewSelectorBar.disconnect(adjustSignalId);
	
	// Reset view selector coordinates.
	viewSelector.set_position(viewSelectorX, viewSelectorY);
	viewSelector.set_size(viewSelectorWidth, viewSelectorHeight);
}
