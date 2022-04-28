#!/bin/bash

# Admin User
MONGODB_ADMIN_USER=${MONGODB_ADMIN_USER:-"admin"}
MONGODB_ADMIN_PASS=${MONGODB_ADMIN_PASS:-"uybR37VWgQyGZ3nRWKGXtdtVJKic82dm"}

# Application Database User
MONGODB_APPLICATION_DATABASE=${MONGODB_APPLICATION_DATABASE:-"admin"}
MONGODB_APPLICATION_DATABASE_2=${MONGODB_APPLICATION_DATABASE_2:-"orga"}
MONGODB_APPLICATION_DATABASE_3=${MONGODB_APPLICATION_DATABASE_3:-""}
MONGODB_APPLICATION_DATABASE_4=${MONGODB_APPLICATION_DATABASE_4:-""}
MONGODB_APPLICATION_USER=${MONGODB_APPLICATION_USER:-"orga"}
MONGODB_APPLICATION_PASS=${MONGODB_APPLICATION_PASS:-"uybR37VWgQyGZ3nRWKGXtdtVJKic82dm"}

# Wait for MongoDB to boot
RET=1
while [[ RET -ne 0 ]]; do
    echo "=> Waiting for confirmation of MongoDB service startup..."
    sleep 5
    mongo admin --eval "help" >/dev/null 2>&1
    RET=$?
done

if [ ! -z "$REPLSET" ]; then
   echo "=> Creating replicaset ${REPLSET} in MongoDB"
  mongo << EOF
  var hostname = hostname();
  var cfg = {
      "_id": '$REPLSET',
      "members": [
          {
              "_id": 0,
              "host": hostname + ':27017',
              "priority": 2
          }
      ]
  };
  rs.initiate(cfg, { force: true });
EOF

sleep 3
fi

# Create the admin user
echo "=> Creating admin user with a password in MongoDB"
mongo admin --eval "db.createUser({user: '$MONGODB_ADMIN_USER', pwd: '$MONGODB_ADMIN_PASS', roles:[{role:'root',db:'admin'}]});" --port 27017

sleep 3

# If we've defined the MONGODB_APPLICATION_DATABASE environment variable and it's a different database
# than admin, then create the user for that database.
# First it authenticates to Mongo using the admin user it created above.
# Then it switches to the REST API database and runs the createUser command
# to actually create the user and assign it to the database.
#if [ "$MONGODB_APPLICATION_DATABASE" != "admin" ]; then
#    echo "=> Creating a ${MONGODB_APPLICATION_DATABASE} database user with a password in MongoDB"
#    mongo admin -u $MONGODB_ADMIN_USER -p $MONGODB_ADMIN_PASS << EOF
#echo "Using $MONGODB_APPLICATION_DATABASE database"
#use $MONGODB_APPLICATION_DATABASE
#db.createUser({user: '$MONGODB_APPLICATION_USER', pwd: '$MONGODB_APPLICATION_PASS', roles:[{role:'readWrite',
# db:'$MONGODB_APPLICATION_DATABASE'}]})
#EOF
#fi

if [ "$MONGODB_APPLICATION_DATABASE" != "admin" ]; then
    echo "=> Creating an ${MONGODB_APPLICATION_DATABASE} user with a password in MongoDB"
    mongo admin -u $MONGODB_ADMIN_USER -p $MONGODB_ADMIN_PASS --port 27017 << EOF
use $MONGODB_APPLICATION_DATABASE
db.createUser({user: '$MONGODB_APPLICATION_USER', pwd: '$MONGODB_APPLICATION_PASS', roles:[{role:'dbOwner',db:'$MONGODB_APPLICATION_DATABASE'}]});
EOF
fi

if [ ! -z "$MONGODB_APPLICATION_DATABASE_2" ]; then
    echo "=> Creating an ${MONGODB_APPLICATION_DATABASE_2} user with a password in MongoDB"
    mongo admin -u $MONGODB_ADMIN_USER -p $MONGODB_ADMIN_PASS --port 27017 << EOF
use $MONGODB_APPLICATION_DATABASE_2
db.createUser({user: '$MONGODB_APPLICATION_USER', pwd: '$MONGODB_APPLICATION_PASS', roles:[{role:'dbOwner',db:'$MONGODB_APPLICATION_DATABASE_2'}]});
EOF
fi

if [ ! -z "$MONGODB_APPLICATION_DATABASE_3" ]; then
    echo "=> Creating an ${MONGODB_APPLICATION_DATABASE_3} user with a password in MongoDB"
    mongo admin -u $MONGODB_ADMIN_USER -p $MONGODB_ADMIN_PASS--port 27017 << EOF
use $MONGODB_APPLICATION_DATABASE_3
db.createUser({user: '$MONGODB_APPLICATION_USER', pwd: '$MONGODB_APPLICATION_PASS', roles:[{role:'dbOwner',db:'$MONGODB_APPLICATION_DATABASE_3'}]});
EOF
fi

if [ ! -z "$MONGODB_APPLICATION_DATABASE_4" ]; then
    echo "=> Creating an ${MONGODB_APPLICATION_DATABASE_4} user with a password in MongoDB"
    mongo admin -u $MONGODB_ADMIN_USER -p $MONGODB_ADMIN_PASS--port 27017 << EOF
use $MONGODB_APPLICATION_DATABASE_4
db.createUser({user: '$MONGODB_APPLICATION_USER', pwd: '$MONGODB_APPLICATION_PASS', roles:[{role:'dbOwner',db:'$MONGODB_APPLICATION_DATABASE_4'}]});
EOF
fi


sleep 1

# If everything went well, add a file as a flag so we know in the future to not re-create the
# users if we're recreating the container (provided we're using some persistent storage)
touch /data/db/.mongodb_password_set

echo "MongoDB configured successfully. You may now connect to the DB."
echo "========================================================================"
echo "You can now connect to the admin MongoDB server using:"
echo ""
echo "    mongo admin -u $MONGODB_ADMIN_USER -p $MONGODB_ADMIN_PASS --host <host> --port <port>"
echo ""
echo "========================================================================"