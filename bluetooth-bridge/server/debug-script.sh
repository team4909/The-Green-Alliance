echo 
echo "BLUETOOTH CONFIGURATION"
echo "Take note of the following Bluetooth MAC Address. This"
echo "identifier is needed to configure the Bluetooth portion"
echo "of the transfer mechanism. Ex. 00:25:96:12:34:56"
hcitool dev
echo
echo "Latest Git Commit: "
cd ~/2019-Core && git show --oneline -s
echo
echo "Webhook Logs: "
sudo journalctl -u bt-worker-hook.service -b
echo
echo "Bluetooth Worker Logs: "
sudo journalctl -u bt-worker.service -b