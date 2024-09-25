---
sidebar_position: 1
---

2024-08-04 02:57

Status: #Almost

Tags: [[C]] [[Pointers]] [[embedded]]

# Accessing Memory

## Quick Notes
- Use `void*` to pass around memory addresses
- Add `volatile` to the pointer type if the memory is volatile
## Getting an address from base and offset
```c
void* memAddr( const void* pBase, size_t offset )
{
    /* Validate parameters here if necessary */

    uint8_t* newAddr = (uint8_t*)pBase;
    newAddr += offset;
    return (void*)(newAddr);
}
```

## Reading a 32-bit value
```c
uint32_t u32_peek( const void* pBase, size_t offset )
{
	/* Validate parameters here if necessary */

    uint32_t* addr = (uint32_t*)memAddr( pBase, offset );

	/* Validate new address here if necessary (alignment) */

    return *addr;
}
```

## Writing a 32-bit value
```c
void u32_poke( const void* pBase, size_t offset, uint32_t data )
{
	/* Validate parameters here if necessary */

    uint32_t* addr = (uint32_t*)memAddr( pBase, offset );

	/* Validate new address here if necessary (alignment) */

    *addr = data;
}
```

## Host to Device (32-bit)
```c
void host_to_device( const void* pBase, size_t offset, const void* pData, size_t size )
{
	/* Validate parameters here if necessary */

	uint32_t* addr = (uint32_t*)memAddr( pBase, offset );

	/* Validate new address here if necessary (alignment) */

	uint32_t* hostData = (uint32_t*)pData;

	/* Validate hostData if necessary */

	memcpy( addr, hostData, size );
}
```

## Device to Host (32-bit)
```c
void device_to_host( const void* pBase, size_t offset, uint32_t* pData, size_t size )
{
	/* Validate parameters here if necessary */

	uint32_t* addr = (uint32_t*)memAddr( pBase, offset );

	/* Validate new address here if necessary (alignment) */

	memcpy( pData, addr, size );
}
```


# References
- N/A


