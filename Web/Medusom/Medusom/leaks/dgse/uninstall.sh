#!/bin/bash

## remove all extensions except for user-theme and system-monitor, 
## which need special post procedure
for ext in */metadata.json; do
    ext_path=$(dirname $ext)
    ext_id=$(basename $ext_path)
    tools/disable-extension $ext_id
    tools/remove-extension $ext_id;
done


## install user-theme
sudo rm -f /usr/share/glib-2.0/schemas/user-theme/org.gnome.shell.extensions.user-theme.gschema.xml
tools/disable-extension user-theme@gnome-shell-extensions.gnome.org
tools/remove-extension user-theme@gnome-shell-extensions.gnome.org

## install system-monitor
sudo rm -f /usr/share/glib-2.0/schemas/system-monitor/org.gnome.shell.extensions.system-monitor.gschema.xml
sudo rm -f /usr/bin/system-monitor/system-monitor-applet-config
sudo rm -f /usr/share/applications/system-monitor/system-monitor-applet-config.desktop
for dir in system-monitor/po/*/; do
    lang=$(basename $dir)
    sudo rm -f /usr/share/locale/$lang/LC_MESSAGES/system-monitor-applet.mo
done
tools/disable-extension system-monitor@linuxdeepin.com
tools/remove-extension system-monitor@linuxdeepin.com

#sudo glib-compile-schemas /usr/share/glib-2.0/schemas/

echo
tools/list-extensions
