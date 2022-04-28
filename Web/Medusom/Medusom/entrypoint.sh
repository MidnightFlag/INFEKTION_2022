#!/bin/bash

set -e

cp /botChat.py.original /botChat.py
chmod 500 /botChat.py.original
cp /etc/apache2/conf-enabled/enviro.conf.original /etc/apache2/conf-enabled/enviro.conf
export ID_TEAM="$(openssl rand -hex 10)"; echo "export ID_TEAM="${ID_TEAM}";" >> /etc/bash.bashrc; sed -i "s/IDTEAMREPLACE/$ID_TEAM/g" /etc/apache2/conf-enabled/enviro.conf; sed -i "s/ID_TEAM/$ID_TEAM/g" /botChat.py
export NOLFI_VAR="$(openssl rand -hex 10)"; echo "export NOLFI_VAR="${NOLFI_VAR}";" >> /etc/bash.bashrc; sed -i "s/NOLFIVARREPLACE/$NOLFI_VAR/g" /etc/apache2/conf-enabled/enviro.conf; cp -r /tmp/lfivar /tmp/${NOLFI_VAR}
chmod 777 -R /tmp/

service apache2 restart

cd /

playwright install firefox

export PASS=bienjouechef123456;
su -l www-data -s /usr/bin/expect -c "spawn screen -S bot; send \"su -\n\";expect Password:;send \"${PASS}\n\";send \"cd /; python3 botChat.py\n\";interact"

exec tail -f /dev/null
