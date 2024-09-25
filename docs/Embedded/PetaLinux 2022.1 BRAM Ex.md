
2024-08-04 03:13

Status:

Tags: [[embedded]] [[Linux]] [[Xilinx]] [[zcu102]] [[device tree]] [[U-Boot]]

# PetaLinux

## PetaLinux 2022.1 Example / BRAM build
## Create Project
```bash
source <path-to-installed-Petalinux>/settings.sh
petalinux-create -t project --template zynqMP -n <projname>
cd <projname>
```
---
## Setup Config
```bash
petalinux-config --get-hw-description=<.xsa-path>
```
### Yocto settings
```bash
YOCTO_MACHINE_NAME -> xilinx-zcu102.conf
```
### DTG Settings
```bash
MACHINE_NAME -> zcu102-rev1.0
```
---
## Adding a Custom Application
```bash
petalinux-create -t apps --template c --name <appname> --enable
```
- add files
- edit makefile
- edit .bb
```bash
petalinux-build -c <appname>
```
---
## Kernel Configuration
```bash
petalinux-config -c kernel
```
### Kernel Hacking
```bash
[ ] Filter access to /dev/mem
```
### Device Drivers
```bash
[*] Userspace I/O drivers
	---> [*] Userspace I/O platform driver with generic IRQ handling
	---> [*] Userspace I/O platform driver with generic IRQ handling and dynamic memory
```
---
## RFS Configuration
```bash
petalinux-config -c rootfs
Apps
	---> [*] <your app>
Image Features
	---> [*] auto-login
```
- issue when running under the "petalinux" user account where access to /dev/mem/ is blocked
	- enabling auto-login (root) fixed but is an "unsecure" solution
    - not for production + idc
---
## Device Tree and U-Boot Modification
```bash
petalinux-build -c device-tree
```
### Memory Mapping
```bash
cd project-spec/meta-user/recipes-bsp/device-tree/files
<edit> system-user.dtsi

/include/ "system-conf.dtsi"
/ {
   #address-cells = <2>;
   #size-cells = <2>;
   memory {
       device_type = "memory";
       reg = <0x0 0x0 0x0 0x80000000>, <0x0 0xa0000000 0x0 0x100000>, <0x00000008 0x00000000 0x0 0x80000000>;
   };
   reserved-memory {
       ranges;
       reserved {
           reg = <0x0 0xa0000000 0x0 0x100000>;
       };
   };
};

&axi_bram_ctrl_0 {
    status = "disabled";
};
```
- Regs are set for 1MB of BRAM starting at 0xA0000000 (based on Vivado/FPGA design)

## U-boot Config
```
cd project-spec/meta-user/recipes-bsp/u-boot/files
micro platform-top.h
```
```
#define CONFIG_NR_DRAM_BANKS 3
```
---
## Build
```
petalinux-build
```
---
## Package and Boot
```
cd images/linux
petalinux-package --boot --format BIN --fsbl zynqmp_fsbl.elf --u-boot --fpga --force
```
- bitstream not automatically included in 2022.1 PL
	- add --fpga flag if using custom block design
- copy the BOOT.bin, boot.scr, and image.ub into the SD card

# References
- https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18842412/Accessing+BRAM+In+Linux


