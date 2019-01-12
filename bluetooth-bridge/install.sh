#!/usr/bin/env bash

# TL;DR of Script
echo
echo "THE GREEN ALLIANCE SCOUTING PLATFORM"
echo " - INSTALLER SCRIPT"
echo
echo " will do the following: "
echo " - change device hostname to the 'the-green-alliance' "
echo " - enable ethernet tethering"
echo " - install and configure the TGA Bluetooth syncing server"
echo

sudo apt-get update
sudo apt-get -qq --yes install git

# Clone Repo
cd /home/pi
git clone https://github.com/The-Green-Alliance/2019-Core.git

# Update Repo
cd /home/pi/2019-Core
git checkout -f master
git pull

chmod +x /home/pi/2019-Core/TGA-DEBUG.sh

# Change Hostname to 'the-green-alliance'
echo "[TGA] Changing Hostname to 'the-green-alliance' ..."
echo "the-green-alliance" | sudo tee /etc/hostname > /dev/null
sudo sed -i 's/127.0.1.1.*/127.0.1.1\t'"the-green-alliance"'/g' /etc/hosts
sudo hostname "the-green-alliance"

# For Ethernet Tethering to Pi
echo "[TGA] Enabling Ethernet Tethering..."
sudo apt-get -qq --yes install avahi-daemon
sudo update-rc.d avahi-daemon defaults

# For Webhook Server Dependencies
echo "[TGA] Installing Node Dependencies..."
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get -qq --yes install nodejs
cd /home/pi/2019-Core/bluetooth-bridge/server
sudo npm install

# For Python Bluetooth Dependencies/Libraries
echo "[TGA] Installing Bluetooth Dependencies..."
sudo apt-get -qq --yes install libboost-python-dev
sudo apt-get -qq --yes install libboost-thread-dev
sudo apt-get -qq --yes install libbluetooth-dev
sudo apt-get -qq --yes install libglib2.0-dev
sudo apt-get -qq --yes install bluez
sudo apt-get -qq --yes install python-bluez
sudo apt-get -qq --yes install python3-pip
sudo pip3 -q install pybluez
sudo pip3 -q install requests

# Start Bluetooth Daemon
echo "[TGA] Starting OS Bluetooth Daemon..."
sudo sed -i 's/bluetoothd/bluetoothd -C/g' /lib/systemd/system/bluetooth.service
sudo systemctl daemon-reload
sudo systemctl restart bluetooth
sudo sdptool add SP

# Start Bluetooth Worker Daemons
echo "[TGA] Starting TGA Bluetooth Worker Daemons..."
sudo cp /home/pi/2019-Core/bluetooth-bridge/bt-worker-hook.service /lib/systemd/system/
sudo cp /home/pi/2019-Core/bluetooth-bridge/bt-worker.service /lib/systemd/system/
sudo chmod 644 /lib/systemd/system/bt-worker-hook.service
sudo chmod 644 /lib/systemd/system/bt-worker.service
sudo chmod +x /home/pi/2019-Core/bluetooth-bridge/server/server.js
sudo chmod +x /home/pi/2019-Core/bluetooth-bridge/server/worker.py

sudo systemctl daemon-reload
sudo systemctl enable bt-worker-hook.service
sudo systemctl enable bt-worker.service
sudo systemctl restart bt-worker-hook.service
sudo systemctl restart bt-worker.service