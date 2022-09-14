#!/bin/sh

source .env

# Wait for database to be ready
until nc -z -v -w30 $DB_HOST $DB_PORT; do
 echo 'Waiting for PostgreSQL...'
 sleep 1
done
echo "PostgreSQL is up and running!"

yarn prisma migrate deploy

echo "PostgreSQL database has been created & migrated!"

yarn build
yarn start:prod