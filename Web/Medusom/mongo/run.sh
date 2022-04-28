#!/bin/bash
set -e

#cmd="$mongodb_cmd --httpinterface --rest --master --smallfiles"
#cmd="$mongodb_cmd --httpinterface --rest --smallfiles"
cmd="mongod --smallfiles --logpath=/dev/null --port 27017 --auth --nojournal --bind_ip 0.0.0.0"

if [ "$OPLOG_SIZE" != "" ]; then
    cmd="$cmd --oplogSize $OPLOG_SIZE"
fi

if [ "$REPLSET" != "" ]; then
    cmd="$cmd --replSet $REPLSET"
fi

$cmd &

if [ ! -f /data/db/.mongodb_password_set ]; then
    /set_mongodb_password.sh
fi

exec tail -f /dev/null