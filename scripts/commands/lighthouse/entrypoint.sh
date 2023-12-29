#!/bin/sh
set -e

lighthouse "$@"

chmod 777 /app/artifacts/lighthouse.json