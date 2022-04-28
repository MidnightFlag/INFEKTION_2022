const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;

let usermenu = null;

function init(extensionMeta) {
	// Get user menu.
    usermenu = Main.panel._statusArea['userMenu'];
}

function enable() {
	usermenu._name.hide();
}

function disable() {
	usermenu._name.show();
}
