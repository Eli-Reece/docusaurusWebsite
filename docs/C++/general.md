# General
### comments
- same as C
### namespace 
- in professional development, it is common to use namespaces to avoid naming conflicts
```
using namespace std;
cout << "Hello, World!" << endl;

vs

std::cout << "Hello, World!" << std::endl;
```
### objects and variables
- in C++ direct memory access is discouraged and instead objects are used
- **object**: a region of storage that can store a value and has other properties, typically unnamed
- **variable**: a named object
- data types are pretty much the same as C
### object initialization
- **copy initialization**: `int x = 5;`
    - the value of the object is copied to the new object
    - 'less efficient' than direct initialization
    - used when passing arguments or returning to/from a function by value 
- **direct initialization**: `int x(5);`
    - the value of the object is directly assigned to the new object
    - 'more efficient' than copy initialization
- **list initialization**: `int x{5};`
    - the value of the object is directly assigned to the new object
    - 'more efficient' than copy initialization
    - can also be used in copy form: `int x = {5};`
    - `prefer direct list initialization`
### headers
- you can use the -I flag to include a directory in the search path
- `g++ -o main -I /path/to/header main.cpp`
- include header guards to avoid multiple inclusion
```
#ifndef HEADER_NAME_H
#define HEADER_NAME_H

// code

#endif
```
- the preprocessor checks if the header has been included before and if not, includes it
- you can also use `#pragma once` to avoid multiple inclusion
- use this, so it's not the programmer's responsibility to avoid multiple inclusion
### fixed width integers
- `#include <cstdint>`
- example: `std::uint32_t x = 5;`
- be wary of uint8_T and int8_t as these are likely to behave like chars insteead of integers
- int_fast#_t: the fastest integer type with at least # bits
- int_least#_t: the smallest integer type with at least # bits
### fixed width best practice
- Prefer int when the size of the integer doesn’t matter (e.g. the number will always fit within the range of a 2-byte signed integer) and the variable is short-lived (e.g. destroyed at the end of the function). For example, if you’re asking the user to enter their age, or counting from 1 to 10, it doesn’t matter whether int is 16 or 32 bits (the numbers will fit either way). This will cover the vast majority of the cases you’re likely to run across.
- Prefer std::int#_t when storing a quantity that needs a guaranteed range.
- Prefer std::uint#_t when doing bit manipulation or where well-defined wrap-around behavior is required.
### size_t
- `size_t` is an unsigned integer type that is used to represent the size of objects in bytes and is therefore used as the return type of the sizeof operator
- `size_t` is guaranteed to be big enough to contain the size of the biggest object the host system can handle
### explicit type conversion
- **static_cast**: used for simple conversions
- `static_cast<new_type>(expression)`
- `static_cast<int>(5.0)`
### inline
- **inline expansion**: the compiler replaces the function call with the function code
- this can reduce overhead of function calls
- `inline int add(int x, int y) { return x + y; }`
- modern compilers are smart enough to inline functions without the inline keyword so best practice is to not use this keyword
- but in modern practice it has evolved to mean "multiple definitions are allowed"
- every definition for an inline function must be identical so the only real use is if you're defining those functions or variables in a header file
### constexpr
- **constant expression**: an expression that can be evaluated at compile time
- `constexpr int add(int x, int y) { return x + y; }`
- can provide performance benefits but is not good for runtime code
### std::string
- `std::string name {"Frank"};`
- `std::string name = "John";`
- can handle strings of different lengths
- use `std::getline(std::cin, name);` instead of `std::cin >> name;` to handle spaces
- you can also use std::ws to ignore any leading whitespace
- `std::getline(std::cin >> std::ws, name);`
- prefer `std::string_view` for read-only strings (function parameters)