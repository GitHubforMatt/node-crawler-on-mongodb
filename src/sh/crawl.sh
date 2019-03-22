#!/bin/bash
DATEVAR=$(date +%Y-%m-%d_%H-%M-%S)
./node_modules/.bin/babel-node ./src/crawl.js --dev-mode --crawl-number 1 2>&1 >> ./logs/crawl_$DATEVAR.log

# crontab -e # (Not require sudo)
# 23 9 * * * cd pmm/crawler && ./src/sh/crawl.sh
