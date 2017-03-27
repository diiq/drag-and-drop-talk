#!/bin/bash

cd api && /usr/local/bin/heroku builds:create -a diiq-estimation-talk
cd ../client && npm run deploy
