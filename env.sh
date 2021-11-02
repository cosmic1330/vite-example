#!/bin/sh

set -e

sed -i 's/"APP_API"/"'"${APP_API}"'"/' /usr/share/nginx/html/index.html
sed -i 's/"APP_FOO"/"'"${APP_FOO}"'"/' /usr/share/nginx/html/index.html
sed -i 's/"APP_BAR"/"'"${APP_BAR}"'"/' /usr/share/nginx/html/index.html
sed -i 's/"APP_NUM"/"'"${APP_NUM}"'"/' /usr/share/nginx/html/index.html
