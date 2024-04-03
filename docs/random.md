# Random notes
### helpful links
- https://explainshell.com/
### File retrieval after rm
```
$ sudo strings -td /dev/mapper/<volume> | grep '"<specific string in file>"
```
ex: 
26134141864 class Team(Account):
26134147482 class Team(Account):
- take the offset (26134140000) and pull data from that area in memory
```
$ sudo dd if=/dev/mapper/<volume> of=/tmp/recover skip=26134140000 count=1M bs=1
```
- skips 26134140000 blocks in memory, copies 1M blocks, and sets the block size to 1 Byte


### poke and peek
```
void *memoryAddress(struct interface *inter, size_t offset)
{
    char *newAddress = (char *)inter->pMemoryBase;      // Cast base address to char pointer
    newAddress += offset;                               // Add offset to base address
    return (void *)(newAddress);                        // Cast back to void pointer and return
}

uint32_t u32_peek(struct interface *inter, size_t offset)
{
    uint32_t *address = (uint32_t *)memoryAddress(inter, offset);      //get address
    uint32_t value = u32BE_to_HOST(*address);                               //read value and swaps the order of the bits
    return value;
}

void u32_poke(struct interface *inter, size_t offset, uint32_t value)
{
    uint32_t *address = (uint32_t *)memoryAddress(inter, offset);
    assert(address != NULL);
    *address = (value);
}

host_to_device(struct inter *inter, size_t offset, const void *pData, size_t bytecount)
{
    uint32_address = (uint32_t *)memoryAddress(inter, offset);
    assert(address != NULL);
    uint32_t *data = (uint32_t *)pData;
    assert(data != NULL);
    memcpy(address, data, bytecount);
}

device_to_host(struct inter *inter, size_t offset, const void *pData, size_t bytecount)
{
    uint32_address = (uint32_t *)memoryAddress(inter, offset);
    assert(address != NULL);
    uint32_t *data = (uint32_t *)pData;
    assert(data != NULL);
    memcpy(data, address, bytecount);
}
```

### 4-byte aligned
- (data_size + 3) & (~3);
---
### search for keyword
```
$ grep "<string>" /tmp/myfile
```
---
### dos2unix
- dos2unix *.sh
---

### finding and executing a comand to multiple files in a dir
```
$ sudo find /home/innoeli/Desktop/cfc400/trunk/ -type f -name "*.sh" -exec dos2unix {} +
```
### Replace a string (foo with bar) in multiple files
sed -i 's|foo|bar|g' *
or 
find . -type f -name "*.sh" -exec sed -i 's/foo/bar/g' {} +

// convert ' ' to '_' in a c file
char *p = logfilename;
for(;*p;++p){ if ( *p == ' ' ) { *p = '_' } };

### symbolic link
```
ln -s <source path> <alias path>
```
 > ln -s ~/../Vitis/ /tools/Xilinx/Vitis
