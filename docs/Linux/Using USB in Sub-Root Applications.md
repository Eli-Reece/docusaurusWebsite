
2024-08-13 22:26

Status: #baby

Tags: [[Linux]]

# Using USB in Sub-Root Applications
1. **Identify your device:**
   Plug in your logic analyzer and use the `lsusb` command to list connected USB devices and find the relevant entry. For example, you might see something like:

```sh
Bus 001 Device 007: ID 0925:3881 Lakeview Research Saleae Logic
```
   Note the Vendor ID (`0925`) and Product ID (`3881`).

2. **Create a udev rule file:**
   You need to create a file in `/etc/udev/rules.d`. The file name should be descriptive, for example, `99-logic-analyzer.rules`.

```bash
sudo nano /etc/udev/rules.d/99-logic-analyzer.rules
```

3. **Add the udev rule:**
   Add the following line to the file, replacing `0925` with your Vendor ID and `3881` with your Product ID:

```bash
SUBSYSTEM=="usb", ATTR{idVendor}=="0925", ATTR{idProduct}=="3881", MODE="0666", GROUP="plugdev"
```
   This rule sets the permissions to `0666` (read and write for everyone) and assigns the device to the `plugdev` group.

4. **Reload udev rules:**
   Reload the udev rules to apply the new configuration:

```bash
sudo udevadm control --reload-rules
sudo udevadm trigger
```

5. **Add your user to the `plugdev` group:**
   If your user is not already a member of the `plugdev` group, add your user to it:

```sh
sudo groupadd plugdev
sudo usermod -aG plugdev $USER
# If u want to verify
getent group plugdev
```
   Log out and back in for the group change to take effect.

6. **Replug the device:**
   Unplug and replug the logic analyzer to trigger the new udev rule.



# References

