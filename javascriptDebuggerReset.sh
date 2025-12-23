#!/usr/bin/env zsh

pwd

pkill -f "chrome-user-data"
pkill -f "Google Chrome"
pkill -f "Chromium"

echo 'All Chrome and Chromium processes have been terminated.'