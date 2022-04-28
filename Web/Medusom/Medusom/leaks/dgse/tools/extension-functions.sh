#!/bin/bash

refresh_extensions_status() {
    ENABLED_EXTENSION_IDS=( $(gsettings get org.gnome.shell enabled-extensions | grep -oE "[^']+@[^']+") )
    INSTALLED_EXTENSION_DIRS=( $(ls -d {$HOME/.local,/usr/local,/usr}/share/gnome-shell/extensions/*@* 2>/dev/null) )
}

get_extension_meta() {
    ext_dir=$1
    meta=$2
    ## $1 could be id or ext dir
    [[ -e $ext_dir ]] || ext_dir=$(get_extension_install_dir $ext_dir)
    [[ -e $ext_dir ]] || return 1
    grep -oE "\"$meta\""'.*:.*".*"' $ext_dir/metadata.json 2>/dev/null | awk -F\" '{print $4}'
}

get_extension_name() {
    ext_dir=$1
    #grep -oE '"name".*:.*".*"' $ext_dir/metadata.json | awk -F\" '{print $4}'
    get_extension_meta $ext_dir "name"
}

get_extension_install_dir() {
    ext_id=$1
    for p in $HOME/.local /usr/local /usr; do
	if [ -e $p/share/gnome-shell/extensions/$ext_id ]; then
	    echo $p/share/gnome-shell/extensions/$ext_id
	    break
	fi
    done
}

is_enabled() {
    ext_id=$1
    [[ "$2" == "no-refresh" ]] || refresh_extensions_status
    for e in ${ENABLED_EXTENSION_IDS[@]}; do
	[[ $ext_id == $e ]] && return 0
    done
    return 1
}

is_installed () {
    ext_id=$1
    for p in $HOME/.local /usr/local /usr; do
	[[ -e $p/share/gnome-shell/extensions/$ext_id ]] && return 0
    done
    return 1
#    [[ "$2" == "no-refresh" ]] || refresh_extensions_status
#    for e in ${INSTALLED_EXTENSION_DIRS[@]}; do
#	[[ $ext_id == ${e##*/} ]] && return 0
#    done
#    return 1
}

enable_extension() {
    [[ -z "$1" ]] && return 0
    ext_id=$1
    refresh_extensions_status
    if ! is_enabled "$ext_id" "no-refresh"; then
	new_enabled_extension_ids=""
	for id in ${ENABLED_EXTENSION_IDS[@]}; do
	    [[ $id != $ext_id ]] && new_enabled_extension_ids="${new_enabled_extension_ids}, '${id}'"
	done
	new_enabled_extension_ids="${new_enabled_extension_ids##,}, '$ext_id'"
	new_enabled_extension_ids="[ ${new_enabled_extension_ids##,} ]"
	gsettings set org.gnome.shell enabled-extensions "${new_enabled_extension_ids}"
    fi
}

enable_extensions() {
    for ext_id in $@; do enable_extension $ext_id; done
}

disable_extension() {
    [[ -z "$1" ]] && return 0
    ext_id=$1
    refresh_extensions_status
    if is_enabled "$ext_id" "no-refresh"; then
	new_enabled_extension_ids=""
	for id in ${ENABLED_EXTENSION_IDS[@]}; do
	    [[ $id != $ext_id ]] && new_enabled_extension_ids="${new_enabled_extension_ids}, '${id}'"
	done
	new_enabled_extension_ids="[ ${new_enabled_extension_ids##,} ]"
	gsettings set org.gnome.shell enabled-extensions "$new_enabled_extension_ids"
    fi
}

disable_extensions() {
    for ext_id in $@; do disable_extension $ext_id; done
}

list_extensions() {
    refresh_extensions_status
    (printf "%s|%s|%s|%s\n" "Extension Name" "Extension ID" "Status" "Install Prefix"
    ## list all installed extensions
    for ext_dir in ${INSTALLED_EXTENSION_DIRS[@]}; do
	if [ -e $ext_dir/metadata.json ]; then
	    ext_name="$(get_extension_name $ext_dir)"
	    ext_id=$(basename $ext_dir)
	    is_enabled $ext_id "no-refresh" && ext_status="Enabled" || ext_status="Disabled"
	    printf "%s|%s|%s|%s\n" "$ext_name" "$ext_id" "$ext_status" "${ext_dir%%share/*}"
	fi
    done
    ## list enabled but not installed extensions
    for ext_id in ${ENABLED_EXTENSION_IDS[@]}; do
	is_installed $ext_id || printf "%s|%s|%s|%s\n" "NaN" "$ext_id" "Enabled" "NaN"
    done) | column -s\| -t
}

_show_extension_details() {
    ext_dir=$1
    ## $1 could be id or ext dir
    [[ -e $ext_dir ]] || ext_dir=$(get_extension_install_dir $ext_dir)
    [[ -e $ext_dir ]] || return 1
    if [ -e $ext_dir/metadata.json ]; then
	ext_name="$(get_extension_name $ext_dir)"
	ext_id="$(basename $ext_dir)"
	is_enabled $ext_id "no-refresh" && ext_status="Enabled" || ext_status="Disabled"
	printf "name:|%s\n" "$(get_extension_meta $ext_id name)"
	printf "uuid:|%s\n" "$ext_id"
	printf "url:|%s\n" "$(get_extension_meta $ext_id url)"
	printf "description:|%s\n" "$(get_extension_meta $ext_id description)"
	printf "status:|%s\n" $ext_status
	printf "path:|%s\n" $ext_dir
	printf "%s|%s\n" 
    fi
}

show_extension_details() {
    if [ $# -eq 0 ]; then
	(printf "%s|%s\n" "Key" "Value"
	refresh_extensions_status
	for ext_dir in ${INSTALLED_EXTENSION_DIRS[@]}; do
	    _show_extension_details $ext_dir
	done) | column -s\| -t
    else
	(printf "%s|%s\n" "Key" "Value"
	refresh_extensions_status
	while [ $# -gt 0 ]; do
	    _show_extension_details $1
	    shift
	done) | column -s\| -t
    fi
}

install_extension() {
    ext_dir=$1

    ## make sure it is a valid gnome-shell extension
    if [ ! -e ${ext_dir}/metadata.json ]; then
	echo "Not a valid extension dir: $ext_dir"
	return 1
    fi

    ## and the given path is not in the EXTENSION PATH
    EXT_PATH="share/gnome-shell/extensions"
    if [[ $ext_dir = ${HOME}/.local/${EXT_PATH}/* ]] \
	|| [[ $ext_dir = /usr/local/${EXT_PATH}/* ]] \
	|| [[ $ext_dir = /usr/${EXT_PATH}/* ]]; then
	echo "Given dir is in the extension path: $ext_dir"
	return 1
    fi

    ## check if the extension is installed
    ext_id=$(basename $ext_dir)
    installed=false
    for p in $HOME/.local /usr/local /usr; do
	if [ -e $p/share/gnome-shell/extensions/$ext_id ]; then
	    installed=true
	    install_base=$p/share/gnome-shell/extensions
	    break
	fi
    done
    
    ## install or update extension
    if [[ $installed == false ]]; then
	## extension is not installed, just install it
	EXT_PATH=${HOME}/.local/share/gnome-shell/extensions
	mkdir -p ${EXT_PATH}/
	cp -r ${ext_dir} ${EXT_PATH}/
	echo "Extension installed: $(get_extension_name $ext_dir) (${EXT_PATH}/$(basename ${ext_dir}))"
    else
	## extension is installed, update it if possible
	if [ -w ${install_base} ]; then
	    rm -rf ${install_base}/${ext_id}
	    cp -r ${ext_dir} ${install_base}
	    echo "Extension updated: $(get_extension_name $ext_dir) ($install_base/$(basename ${ext_dir}))"
	else
	    echo "Permission denied to update ${install_base}/${ext_id}"
	fi
    fi
}

install_extensions() {
    for ext_id in $@; do install_extension $ext_id; done
}

uninstall_extension() {
    ext_id=$1
    if is_installed $ext_id; then
	install_dir=$(get_extension_install_dir $ext_id)
	if [ -w "$install_dir" ]; then
	    ext_name=$(get_extension_name $ext_dir)
	    rm -rf $install_dir
	    echo "Extension removed: $ext_name ($install_dir)"
	else
	    echo "Permission denied to remove $install_dir"
	fi
    else
	echo "Extension not found: $ext_id"
    fi
}

uninstall_extensions() {
    for ext_id in $@; do uninstall_extension $ext_id; done
}

case $0 in
    *list-extensions)
	list_extensions ;;
    *show-extension-details)
	show_extension_details $@ ;;
    *get-extension-meta)
	get_extension_meta $@ ;;
    *install-extension)
	install_extensions $@ ;;
    *uninstall-extension|*remove-extension)
	uninstall_extensions $@ ;;
    *enable-extension)
	enable_extensions $@ ;;
    *disable-extension)
	disable_extensions $@ ;;
    ## other wise, this script is most probabbly sourced other than invoked,
    ## in this case, do nothing
esac
