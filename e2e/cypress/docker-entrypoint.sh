#!/bin/sh
npm i
cypress install
chmod -R 777 /app/.cache
cypress run "$@"
EXIT_CODE=$?
mkdir -p /app/cypress/videos /app/cypress/screenshots
exit $EXIT_CODE
