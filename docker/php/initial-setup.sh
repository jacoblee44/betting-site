#!/usr/bin/env bash

# Make sure to use the latest .env.docker file
cp .env.docker .env

composer install
npm install
npm run build

if [ -n "$INITIAL_SETUP" ]; then
    php artisan migrate:fresh --seed
fi
