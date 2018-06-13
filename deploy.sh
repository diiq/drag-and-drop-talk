#!/bin/bash

cd api && /usr/local/bin/heroku builds:create -a talks-sambleckley-com
cd ../client && npm run deploy
