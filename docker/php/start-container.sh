#!/usr/bin/env bash

USER_ID=${LOCAL_USER_ID:-9001}

echo "Starting with UID : $USER_ID"
if id -u "www-data" >/dev/null 2>&1; then
    echo "User already exists. Changing UID."
    usermod -u $USER_ID www-data
else
    echo "User doesn't exist. Creating user."
    useradd --shell /bin/bash -u $USER_ID -o -c "" -m -d /home/www-data www-data
fi

# Check if home directory exists, if not create it
if [ ! -d "/home/www-data" ]; then
    echo "Home directory doesn't exist. Creating directory."
    mkdir /home/www-data
    chown www-data:www-data /home/www-data
fi

chown -R www-data:www-data /var/www/html
chown -R www-data:www-data /var/www/
export HOME=/home/www-data

gosu www-data initial-setup.sh

# Start the php server and let it take over the shell session
exec php-fpm8.2 -F
