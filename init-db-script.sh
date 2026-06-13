#!/usr/bin/env bash

set -e

echo "Resetting MongoDB database: trainingdb"

docker exec booking-mongodb-core mongosh \
  -u user \
  -p password \
  --authenticationDatabase admin \
  --eval "db.getSiblingDB('trainingdb').events.drop()"

echo "Importing seed data"

docker cp seed/events.json booking-mongodb-core:/tmp/events.json

MSYS_NO_PATHCONV=1 docker exec booking-mongodb-core mongoimport \
  -u user \
  -p password \
  --authenticationDatabase admin \
  --db trainingdb \
  --collection events \
  --file /tmp/events.json \
  --jsonArray

echo "Seed complete"