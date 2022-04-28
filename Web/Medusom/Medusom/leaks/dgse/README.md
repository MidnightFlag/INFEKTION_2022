# DGSE(Deepin Gnome-Shell Extensions)

DGSE, written by Linux Deepin team, can also be used in other distros' GNOME Shell environment.

### DGSE List: 

* noa11y extension
* User themes extension
* Monitor Status extension
* hidedash extension
* Dock extension
* sytem-monitor extension
* windowNavigator extension
* nocliktab extension
* hideusername extension
* Show Desktop Button extension
* Removable Drive Menu extension
* Windows Alt Tab extension
* WindowsOverlay Icons extension
* Shutdown Menu extension
* Workspace Navigator extension
* gnome-shell-classic-systray extension

### ScreenShots

![alt Linux Deepin desktop screenshot](http://i.imgur.com/qaIVQ.jpg)
![alt gnome tweak tool](http://i.imgur.com/YEc85.png)
![alt app categories](http://i.imgur.com/S3Uz5.jpg)
![alt workspace display area left placed](http://i.imgur.com/YnIfm.jpg)

### Extensions' features discription

#### noa11y extension
Don't display a11y icon in systray (this is borrowed from gnome official team)
(screenshot should go here)
#### User themes extension
Enable uesr theme (this is borrowed from gnome official team)
#### Monitor Status extension
Display an icon in systray to enable quick adjust the monitor status
(screenshot should go here)
#### hidedash extension
Don't show dash (the original favourite bar in overview panel)
#### Dock extension
Deepin dock, it's placed at the top panel of Deepin Gnome Shell 
(screenshot should go here)
#### sytem-monitor extension
Shows system monitor (on mem/cpu/net/disk/temp/etc.) in the systray (this is borrowed from paradoxxxzero)
####windowNavigator extension
(description)
#### nocliktab extension
No need to click on the tab in overview panel, mouse over alone is enough for navigation
#### hideusername extension
Hide login user name, just show the user login status
#### Show Desktop Button extension
Put a show-desktop button on the top panel (will be removed soon)
#### Removable Drive Menu extension
Put an icon in systray which allows you to quick umount mounted drives
(screenshot should go here)
#### Windows Alt Tab extension
Enhanced alternative alt-tab, allows you to switch apps/workspace efficiently
(more detailed description should go here)
(screenshot should go here)
#### WindowsOverlay Icons extension
Displays an application icon on each window preview in overview panel
(screenshot should go here)
#### Shutdown Menu extension
Alternative shutdown menu (this is borrowed from mgse)
#### Workspace Navigator extension
(description should go here)
#### gnome-shell-classic-systray extension
(description should go here)

### Install:
It's quite easy to install dgse, just type ./install.sh in the source directory. All extensions will be installed in the user's home directory ($HOME/.local/share/gnome-shell/extensions/). Note that, we have to copy two gschema xml file into /usr, so sudo privilege is required during installation. If an extension is already installed before you run install.sh, it will be updated automatically. At last, don't forget to reload GNOME Shell (press "Alt-F2", then "r", then "Return")to load the installed extensions.

It is recommended to install deepin-gs-theme as well:

	git clone git://github.com/manateelazycat/deepin-gs-theme
	cp -r deepin-gs-theme/ ~/.themes/Deepin

After the theme dir is copied, you can enabled it in gnome-tweak-tool.

Enjoy it!

### BUGS

If any bug occurs, please report to http://www.linuxdeepin.com/forum/

