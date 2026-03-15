#!/bin/sh
set -eu

envsubst '${LOVED_ONE_NAME} ${BIRTHDAY_MONTH} ${BIRTHDAY_DAY}' \
  < /usr/share/nginx/html/config.template.js \
  > /usr/share/nginx/html/config.js
