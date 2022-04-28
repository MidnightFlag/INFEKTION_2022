#!/bin/bash

## install all extensions except for user-theme and system-monitor, 
## which need special post procedure
for ext in */metadata.json; do
    ext_path=$(dirname $ext)
    tools/install-extension $ext_path;
    tools/enable-extension $(basename $ext_path)
done


## install user-theme
sudo cp user-theme/org.gnome.shell.extensions.user-theme.gschema.xml \
    /usr/share/glib-2.0/schemas/
tools/install-extension user-theme/user-theme@gnome-shell-extensions.gnome.org
tools/enable-extension user-theme@gnome-shell-extensions.gnome.org

## install system-monitor
sudo cp system-monitor/org.gnome.shell.extensions.system-monitor.gschema.xml \
    /usr/share/glib-2.0/schemas/
sudo cp system-monitor/system-monitor-applet-config /usr/bin/
sudo cp system-monitor/system-monitor-applet-config.desktop /usr/share/applications/
for dir in system-monitor/po/*/; do
    lang=$(basename $dir)
    sudo mkdir -p /usr/share/locale/$lang/LC_MESSAGES/
    sudo msgfmt $dir/system-monitor-applet.po -o /usr/share/locale/$lang/LC_MESSAGES/system-monitor-applet.mo
done
tools/install-extension system-monitor/system-monitor@linuxdeepin.com
tools/enable-extension system-monitor@linuxdeepin.com

sudo glib-compile-schemas /usr/share/glib-2.0/schemas/

echo
tools/list-extensions
