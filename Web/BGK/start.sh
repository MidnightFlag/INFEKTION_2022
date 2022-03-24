#!/bin/bash
cron -f & su - enituop -c 'export FLASK_APP=/home/enituop/web ; flask run --host="0.0.0.0" --port=8181'