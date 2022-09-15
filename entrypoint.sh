#!/bin/sh

source .env

# Wait for database to be ready
until nc -z -v -w30 $DB_HOST $DB_PORT; do
 echo 'Waiting for PostgreSQL...'
 sleep 1
done
echo "PostgreSQL is up and running!"

# prod
# yarn prisma migrate deploy

# dev
yarn prisma migrate dev

echo "PostgreSQL database has been created & migrated!"

# prod
# yarn build
# yarn start:prod

# dev
yarn start:dev
