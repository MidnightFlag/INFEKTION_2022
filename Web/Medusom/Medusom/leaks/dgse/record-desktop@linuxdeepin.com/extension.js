
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Shell = imports.gi.Shell;
const Meta = imports.gi.Meta;
const Gio = imports.gi.Gio;

let text, button, recorder, recorderSettings;

function toggleRecord() {
    if (recorder.is_recording()) {
        recorder.pause();
        Meta.enable_unredirect_for_screen(global.screen);
    } else {
        // read the parameters from GSettings always in case they have changed
        recorder.set_framerate(recorderSettings.get_int('framerate'));
        recorder.set_filename('shell-%d%u-%c.' + recorderSettings.get_string('file-extension'));
        let pipeline = recorderSettings.get_string('pipeline');

        if (!pipeline.match(/^\s*$/))
            recorder.set_pipeline(pipeline);
        else
            recorder.set_pipeline(null);

        Meta.disable_unredirect_for_screen(global.screen);
        recorder.record();
    }
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'system-run',
                          icon_type: St.IconType.SYMBOLIC,
                          style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', toggleRecord);

    recorderSettings = new Gio.Settings({ schema: 'org.gnome.shell.recorder' });
    if (Main.recorder == null) {
        Main.recorder = new Shell.Recorder({ stage: global.stage });
    }
    recorder = Main.recorder;
}

function enable() {
    Main.panel._rightBox.insert_actor(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_actor(button);
}
