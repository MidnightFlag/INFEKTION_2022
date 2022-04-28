#!/bin/bash

set -e

chown -R 33:33 /var/www/html/
chmod 777 -R /var/www/html
cd /var/www/html/
composer install
service apache2 restart

cd /
screen -d -m -S chat bash -c 'cd / && python3 chat.py'

exec tail -f /dev/null