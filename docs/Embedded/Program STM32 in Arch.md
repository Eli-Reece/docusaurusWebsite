
2024-08-09 22:07

Status: #baby

Tags: [[embedded]] [[Linux]]

# Program STM32 in Arch
### Hardware
- STM32 board
- ST-Link V2
### Install the tools
- CubeMX
- GNU ARM Embedded Toolchain
	- arm-none-eabi-gcc
	- arm-none-eabi-gdb
	- arm-none-eabi-newlib
- make
- OpenOCD
	- On-Chip Debugger software that will upload compiled code to the STM32
- vscode
	- stm32-for-vscode extension
### CubeMX Configuration

- Configure Project output to Makefile
```
Project Manager->Project->Toolchain/IDE
set to Makefile
```
- Set project to copy all used libraries to the project folder
```
Code Generator tab
enable 'Copy all use libraries into the project folder'
```
- Do whatever ever configuration then build
```
click 'GENERATE CODE'
```
### vscode
- Open the project in vscode
- Write code
```
Open the command palette (Ctrl+Shift+P)
Build STM32 Project
Flash STM32
```
# References
- https://gist.github.com/Bonnee/393c4be25d2e8620d9ec406073940d3a
