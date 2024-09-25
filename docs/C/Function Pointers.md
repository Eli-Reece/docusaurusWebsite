
2024-08-05 21:00

Status: #baby

Tags: [[C]] [[Pointers]] [[Data Structures]] [[keywords]]

# Function Pointers

### Overview
- A function pointer is a variable that stores the address of a function that can be called later through that function pointer
### Use cases:
- callback functions
	- functions that are passed as arguments to other functions
- dynamic dispatch
- state machines
	- function pointers are used to transfer between states
- dynamic plug-in mechanisms
	- allows an application to dynamically use different plug-ins or modules at runtime
- ISRs
- some others
---
### Normal Syntax
```c
ret_type (*funcptr_name)( funcargs_datatypes ) = actualfunc_name
```
### Normal Syntax Example
```c
int add( int a, int b )
{
	return a+b;
}
int sub( int a, int b )
{
	return a-b;
}

int main()
{
	int (*pFun)( int, int ) = add;
	int sum = pFun( 5, 3 );

	pFun = sub;
	int diff = pFun( 5, 3 );

	fprintf( stdout, "sum:%d, diff:%d\n", sum, diff );
}
```
### Complicated Syntax 1
```c
void* (*foo)( int* );
```
- Here this a `function pointer foo` that `returns a void pointer` and takes an `integer pointer argument`
### A Different Complicated Syntax Example
- From Example 1
```c
int (*pFun)( int, int ) = add;
// or
int (*pFun)( int, int );
pFun = &add;
// The ampersand is optional!

int sum = pFun( 3, 2 );
// or
int sum = (*pFun)( 3, 2 );
// The dereference is optional!
```
---
### Function Argument Syntax
```c
// Exact same as for definitions
void function( ..., ret_type (*funcname)( funcargs_datatypes ), ... ){...}
// Where funcname only exists in the context of the function
```
### Function Argument Example
```c
void bubble_sort( void *array[], size_t length, int(*compare)( void*, void* ) ){...}
```
### Function Use Syntax
```c
function( ..., func_name , )
```
### Function Use Example
```c
void bubble_sort( void* array[], size_t length, int (*compare)( const void*, const void* ) ){...}

// Will cast to char
int strcmp_nocase( const void* first, const void* second ){...}

int main()
{
	char* strings[] = { "Hello", "Goodbye" };
	bubble_sort( strings, 2, strcmp_nocase )
}
```
---
Function Pointer [[Typedef]]
### Typedef Definition Syntax
```c
typedef ret_type (*funcptr_name_t)( funcargs_datatypes );
```
### Typedef Function Arg Syntax
```c
function( ..., funcptr_name_t funcname )
// Where funcname only exists in the context of the function
```
### Typedef Function Use Syntax
```c
function( ..., (funcptr_name_t)nameofactualfunc, ... )
```
### Typedef Example
```c
typedef int (*comp_t)( const void*, const void* );
void bubble_sort( void *array[], size_t length, comp_t compare ){...}
int strcmp_nocase( const void* first, const void* second ){...}
int main()
{
	char* strings[] = { "Hello", "Goodbye" };

	comp_t example = strcmp_nocase;
	bubble_sort( strings, 2, example )
	// or
	bubble_sort( strings, 2, (comp_t)strcmp_nocase )
}
```

---
### LUT Implementation
```c
#define ERROR -1
int add( int a, int b) { return a+b; }
int sub( int a, int b) { return a-b; }
int mul( int a, int b) { return a*b; }

typedef enum ops { ADD, SUB, MUL } opt_t;
typedef int (*arithfc_t)( int, int );

int calc( opt_t operation, int x, int y )
{
	static const arithfc_t ops[] = { add, sub, mul };
	if ( operation > MUL || operation < ADD ) return ERROR;
	return ops[operation]( x, y );
}

int main()
{
	fprintf( stdout, "sum:%d\n", calc( ADD, 5, 3) );
}
```
---
### State Machine Implementation
```c
void stateA( void );
void stateB( void );

typedef int (*statefc_t)( void );

statefc_t state = state_A;

void state_A()
{
	// do something
	state = state_B;
}

void state_B()
{
	// do something
	state = state_A;
}

int main()
{
	for(int i = 0; i < 5; i++ ) { state(); }
}
```
# References
- https://www.cprogramming.com/tutorial/function-pointers.html
-