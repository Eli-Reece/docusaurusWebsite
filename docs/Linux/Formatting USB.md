
2024-08-09 21:03

Status: #baby

Tags: [[Linux]]

# Formatting USB

### Identify the microSD card
```bash
> lsusb
> lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    0 953.9G  0 disk
├─sda1        8:1    0  1000M  0 part /efi
├─sda2        8:2    0 457.9G  0 part
└─sda3        8:3    0   495G  0 part /
sdb           8:16   1 117.8G  0 disk
└─sdb1        8:17   1    64M  0 part
nvme0n1     259:0    0 931.5G  0 disk
├─nvme0n1p1 259:1    0   100M  0 part
├─nvme0n1p2 259:2    0    16M  0 part
├─nvme0n1p3 259:3    0 930.9G  0 part
└─nvme0n1p4 259:4    0   522M  0 part
```
- sdb in our case
### Ensure it's not mounted
```bash
sudo umount /dev/sdb1
```
### Wipe the card
```bash
sudo dd if=/dev/zero of=/dev/sdb bs=1M status=progress
```
### Partition the microSD card
```bash
sudo cfdisk /dev/sdb
```
- label type: dos
- delete the existing partitions
- create a new partition and enter the size
- Select Primary as the partition type
- optionally set the bootable flag
- use w95 FAT32 (LBA)
```bash
sudo mkfs.fat -F 32 -n <name>
lsblk -o NAME,LABEL
```
### Mount it
```bash
sudo mkdir -p /mnt/<somename>
sudo mount /dev/sdb1 /mnt/<somename>
```
### Eject it
```bash
sudo umount /mnt/<somename>
sudo eject /dev/sdb
```
# References

