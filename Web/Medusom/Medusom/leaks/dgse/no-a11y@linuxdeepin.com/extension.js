const Main = imports.ui.main;
const Panel = imports.ui.panel;

let indicator;
let idx = null;

function init(extensionMeta) {
    indicator = new Panel.STANDARD_STATUS_AREA_SHELL_IMPLEMENTATION["a11y"];
}

function enable() {
    // Remove A11Y menu     
    for (let i = 0; i < Main.panel._rightBox.get_children().length; i++) {
        if (Main.panel._statusArea['a11y'] == Main.panel._rightBox.get_children()[i]._delegate) {
            Main.panel._rightBox.get_children()[i].destroy();
            break;
        }
    }
    // addToStatusArea would throw an error on disable if we don't set this to null
    Main.panel._statusArea['a11y'] = null;    
    
    //idx = Panel.STANDARD_STATUS_AREA_ORDER.indexOf("a11y");
	//Main.panel._rightBox.get_children()[idx].destroy();
	// addToStatusArea would throw an error on disable if we don't set this to null 
	//Main.panel._statusArea['a11y'] = null;    
}

function disable() {
   Main.panel.addToStatusArea("a11y", indicator, idx);
}
