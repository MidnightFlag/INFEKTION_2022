#!/bin/bash

echo '127.0.0.1	backup.russy23.ru russy23.ru' >> /etc/hosts
service apache2 start
a2ensite russy23.ru
a2ensite backup.russy23.ru
service apache2 reload

bash
