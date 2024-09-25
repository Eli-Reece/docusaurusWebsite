2024-08-04 03:24

Status: #baby

Tags: [[C]] [[embedded]]

# Bitwise Operations

## Multiplying / Dividing by powers of 2
- shifting left by k bits is equivalent to multiplying by 2^k
- shifting right by k bits is equivalent to dividing by 2^k
```
Example:
x = 64 = 0x00000040 = 0100 0000
x >> 3 = 0x00000008 = 0000 1000 = 8
x << 3 = 0x00000200 = 0010 0000 = 512
```
## 4-byte Aligned Trick
```c
alignedSize = ( dataSize + 3 ) & ( ~3 );

0 => 3 & ~3 -> 0011 & 1100 = 0
1 => 4 & ~3 -> 0100 & 1100 = 4
2 => 5 & ~3 -> 0101 & 1100 = 4
3 => 6 & ~3 -> 0110 & 1100 = 4
4 => 7 & ~3 -> 0111 & 1100 = 4
5 => 8 & ~3 -> 1000 & 1100 = 8
6 => 9 & ~3 -> 1001 & 1100 = 8
7 => 10 & ~3 -> 1010 & 1100 = 8
8 => 11 & ~3 -> 1011 & 1100 = 8
9 => 12 & ~3 -> 1100 & 1100 = 12
```
- Great for [[Accessing Memory|Verifying an address]] verifying address after an offset as been added

# References

