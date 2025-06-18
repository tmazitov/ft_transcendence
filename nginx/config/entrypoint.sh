#!/bin/sh
set -e

# Подставляем переменные окружения в шаблон
envsubst '$SERVER_NAME $DOMAIN $FR_PORT $GS_PORT $MMRS_PORT $UMS_PORT' \
  < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/default.conf

# Запускаем nginx
exec nginx -g 'daemon off;'
