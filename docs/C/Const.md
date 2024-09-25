2024-08-04 02:59

Status: #small

Tags: [[C]] [[keywords]] [[qualifiers]]

# Const

The const qualifier signifies to the reader (typically more than the compiler) that a value is to not be modified
- In function parameters there is no need to add const to a value parameter that's passed by value
- Its a copy of a value not the value itself
- Okay for readability

```c
void example( const void* address, size_t offset ) {...};
// No need for const on offset since its a copied value
```



# References

