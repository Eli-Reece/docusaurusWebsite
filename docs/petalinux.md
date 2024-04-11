# PetaLinux 
## PetaLinux 2022.1 / BRAM build
## Create Project
```
source <path-to-installed-Petalinux>/settings.sh
petalinux-create -t project --template zynqMP -n <name-for-project>
cd <name-for-project>
```
---
## Setup Config
```
petalinux-config --get-hw-description=<.xsa-path>
```
### Yocto settings
```
YOCTO_MACHINE_NAME -> xilinx-zcu102.conf
```
### DTG Settings
```
MACHINE_NAME -> zcu102-rev1.0
```
### Subsystem AUTO Hardware Settings
- no advanced bootable images storage settings?
---
## Custom Application
```
petalinux-create -t apps --template c --name bramex --enable
```
- add files
- edit makefile
- edit .bb
```
petalinux-build -c bramex
```
---
## Kernel Config
```
petalinux-config -c kernel 
```
### kernel hacking
```
[ ] Filter access to /dev/mem
``` 
### Device Drivers
```
[*] Userspace I/O drivers
	---> [*] Userspace I/O platform driver with generic IRQ handling
	---> [*] Userspace I/O platform driver with generic IRQ handling and dynamic memory
```
---
## Rootfs Config
```
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
## Device Tree
```
petalinux-build -c device-tree
```
### PL Config
```
cd project-spec/meta-user/recipes-bsp/device-tree/files
micro system-user.dtsi
```
```
/include/ "system-conf.dtsi"
/ {
   #address-cells = <2>;
   #size-cells = <2>;
   memory {
       device_type = "memory";
       reg = <0x0 0x0 0x0 0x80000000>, <0x0 0xA0000000 0x0 0x100000>, <0x00000008 0x00000000 0x0 0x80000000>;
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
- regs are set for 1MB of BRAM starting at 0xA0000000

### U-boot Config
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
- bitstream not automatically included in 2022.1 PL (add --fpga flag if using block design)
- copy the BOOT.bin, boot.scr, and image.ub into the SD card 






		
