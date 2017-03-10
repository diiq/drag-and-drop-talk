#!/bin/bash

trap 'kill %1; kill %2' SIGINT

cd api && bundle exec rails server --port 5000 -b 0.0.0.0 | sed -e "s/^/[api] /" & cd client && npm start | sed -e "s/^/[client] /";
