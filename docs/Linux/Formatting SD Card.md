---
sidebar_position: 1
---

2024-09-13 18:39

Status: #baby

Tags: [[Linux]]

# Formatting SD Card into FAT32
### Identify the SD card
```bash
$ watch lsblk
# plug in the SD Card
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    0 953.9G  0 disk
├─sda1        8:1    0  1000M  0 part /efi
├─sda2        8:2    0 457.9G  0 part
└─sda3        8:3    0   495G  0 part /
** here **
sdb           8:16   1 117.8G  0 disk
└─sdb1        8:17   1     5G  0 part
** here **
nvme0n1     259:0    0 931.5G  0 disk
├─nvme0n1p1 259:1    0   100M  0 part
├─nvme0n1p2 259:2    0    16M  0 part
├─nvme0n1p3 259:3    0 930.9G  0 part
└─nvme0n1p4 259:4    0   522M  0 part
```
### Ensure its umounted
```bash
sudo umount /dev/sdb1
```
### Create a single partition
```bash
sudo fdisk /dev/sdb
```
1. Type `d` to delete the existing partition.
2. Type `n` to create a new partition.
3. Select `p` for primary partition.
4. Press Enter to accept the default partition number (which should be 1).
5. Press Enter to accept the default first sector (start of the disk).
6. Press Enter again to accept the default last sector (end of the disk) to use the entire disk.
7. Type `t` to change the partition type.
8. Type `b` to set the partition type to W95 FAT32.
9. Type `w` to write the changes and exit.
### Format the partition
```bash
sudo mkfs.vfat -F 32 /dev/sdb1
```
### (Optional) Add label
```bash
sudo mkfs.vfat -F 32 -n my_sd_card /dev/sdb1
```
### Verify changes
```bash
❯ sudo fdisk -l /dev/sdb
Disk /dev/sdb: 117.75 GiB, 126437294080 bytes, 246947840 sectors
Disk model: Storage Device
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x96f729ef

Device     Boot Start       End   Sectors   Size Id Type
/dev/sdb1        2048 246947839 246945792 117.8G  b W95 FAT32
❯ lsblk -f /dev/sdb
NAME   FSTYPE FSVER LABEL    UUID                                 FSAVAIL FSUSE% MOUNTPOINTS
sdb
└─sdb1 vfat   FAT32 SD_MUSIC C296-CE14
```

# References

