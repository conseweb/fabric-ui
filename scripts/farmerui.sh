#!/bin/bash

PWD=`pwd`
set -ex

docker rm -f farmerui || echo "";

docker run -d \
 --name farmerui \
 -p 8081:9000 \
 --network cknet --ip 172.16.1.21 \
 --cpu-period=200000 --cpu-quota=10000 \
 -e HTTP_PORT=9000 \
 -v /data/www/wallet:/opt/be \
 -w /opt/be \
 hub.conseweb.com:5000/dev:node grunt live