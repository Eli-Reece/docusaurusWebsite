# CSAPP
## Compilation System
- made up of the preprocessor, compiler, assembler, and linker
### Preprocessor
- modifies the original c program according to directives that being with the # char
- tells the preprocessor to read the contents of the system header filers and insert it directly into the program text
- into a modified source program ending with .i
### Compiler
- translates the text file with .i into a .s which contains an assembly-language program
### Assembler
- translates the assembly .s file into machine language instructions
- also known as a relocatable object program ( .o )
### Linker
- responsible for merging object files
- think of printf.o getting merged into your source
## Hardware Organization
### Buses
- electrical conduits that carry bytes of information back and forth between components
- typically designed to transfer fixed-size chunks known as __words__
- words are typically 4 or 8 bytes
### I/O Devices
- each I/O device is connect to the I/O bus by either a controller or adapter
- controllers are chip sets in the device itself or on the motherboard
- adapter is a card that plugs into a slot on the motherboard
## Caches
- systems spend a lot of time moving information from one to another
- due to physical laws, larger storage devices are slower than smaller storage devices and faster devices are often more expensive to build
- system designers include smaller, faster storage devices called __caches__ that serve as temporary staging areas for information that the processor is likely to need in the near future
- an L1 cache holds tens of thousands of bytes and can be accessed as fast as the register file
- an L2 cache holds hundreds of thousands to millions of bytes but can take 5 times longer to access than a L1 cache
- caches are implemented using static random access memory
- based on __locality__, the tendency for programs to access data and code in localized regions
- ** see figure 1.9 for memory hierarchy **
## Processes
- a __process__ is the operating system's abstraction for a running program
- multiple processes can run concurrently (instructions of one process are interleaved with the instructions of another process)
- this process of interleaving is called __context switching__, where __context__ is the current values of the PC, reg file and contents of main memory
- transition from one process to another is managed by the kernel
## Threads
- modern processes can consists of multiple execution units called __threads__
- it is easier to share data between multiple threads than multiple processes which makes it the choice for things like network programming
## Virtual memory 
- abstraction that provides each process with the illusion that it has exclusive use of the main memory
# Numerics
## Endianness
- big endian - MSB byte first
- little endian - LSB byte first
```
Example:
MSB    LSB
----------
0x01234567
----------
BE -> 01 23 45 67
LE -> 67 45 23 01
```
## Multiplying / Dividing by powers of 2
- left shift by k bits is equivalent to multiplying by 2^k
- right shift by k bits is equivalent to dividing by 2^k
```
Example:
x = 64 = 0x00000040 = 0100 0000 
x >> 3 = 0x00000008 = 0000 1000 = 8
x << 3 = 0x00000200 = 0010 0000 = 512
```


