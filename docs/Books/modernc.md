# Modern C
### Qualifier notation
> char const* const path_name;
- the first const qualifies the char to its left (const char)
- the second const qualifies it again to whats to its left (const pointer)
### bool
- the value 0 represents false
- any other value represents true
- dont comparre to 0, false, or true
```
if (b) {} -> good
if ( b == true ) {} -> bad
```
### main
```c
int main( int argc, char* argv[argc+1] ) {..}
```
- `argc` is the argument count parameter which holds the nubmer of command line arguments
- `argv[argc+1]` is an array of pointers to characters
    - `argc+1` ensures there is space for `argc` arguments plus a NULL char

### Expressing computations
- the type `size_t` represetns values in the range [0, SIZE_MAX]
    - use for sizes, cardinalities, or ordinal numbers
- remainder ops `a % b` can be computed as `a - z*b` given `z = a / b`
- never modify more than 1 object in a statement
### aggregate data types
- arrays are not pointers
- an array in a condition evaluates to true
- there are array objects but no array values
- arrays can not be compared
### Variable Length Arrays
- can not have initializers
- cannot be declared outside functions
```c
double c[] = { [3] = 42.0, [2] = 17.0, };
```
- the length of an array A is `( sizeof(A) ) / ( sizeof(A[0] )`
- array parameters behave **as-if** the array is passed by reference
```
void swap_double( double a[static 2] )
{
    double tmp = a[0];
    a[0] = a[1];
    a[1] = tmp;
}
```
- this will act directly on the array and not on a copy
### strings and char arrays
- a string is a 0-terminated array of char
- but not all char arrays are strings
```
char chough0[] = "chough";
char chough3[7] = { ’c’, ’h’, ’o’, ’u’, ’g’, ’h’, };
char chough4[6] = { ’c’, ’h’, ’o’, ’u’, ’g’, ’h’, }; // not a string as its not 0 terminated
```
**Functions that operate on char-arrays:**
- `memcpy(target, source, len)` can be use to copy one array to another.
These have to be known to be distinct arrays. The number of char to be copied
must be given as a third argument len.
- `memcmp(s0, s1, len)` compares two arrays in the lexicographic ordering.
That is it first scans initial parts of the two arrays that happen to be equal and
then returns the difference between the two first characters that are distinct. If no
differing elements are found up to len, 0 is returned.
- `memchr(s, c, len)` searches array s for the appearance of character c.

**Functions that operate on strings:**
- `strlen(s)` returns the length of the string s. This is simply the position of the
first 0-character and not the length of the array. It is your duty to ensure that s is
indeed a string, that is that it is 0-terminated.
- `strcpy(target, source)` works similar to memcpy. It only copies up to the
string length of the source, and therefore it doesn’t need a len parameter.
Again, source must be 0-terminated. Also, target must be big enough to
hold the copy.
- `strcmp(s0, s1)` compares two arrays in the lexicographic ordering similar to
memcmp, but may not take some language specialties into account. The comparison stops at the first 0-character that is encountered in either s0 or s1. Again,
both parameters have to be 0-terminated.
- `strcoll (s0, s1)` compares two arrays in the lexicographic ordering respecting
language specific environment settings. We will learn how to properly ensure to
set this in Section 8.5.
- `strchr(s, c)` is similar to memchr, only that the string s must be 0-terminated.
- `strspn(s0, s1)` returns the number of initial characters in s0 that also appear
in s1.
- `strcspn(s0, s1)` returns the number of initial characters in s0 that do not appear
in s1.
```
Copying a string
int main( int argc, char* argv[argc+1] )
{
    size_t const len = strlen( argv[0] );
    char name[len+1];

    // copy the name
    memcpy( name, argv[0], len);
    // ensure null termination
    name[len] = 0;
}
```
### pointers
- pointers are opaque objects meaning that they hide the details and are not transparent about the structure they point to
- 3 states: valid, null, or indeterminate
- pointers evaluate to false if they are null
- if we can not ensure that a pointer is valid, we must at least ensure that is null
- always initialize pointers
### structs
- Identifier names terminating with _t are reserverd
- forward decleare a struct within a typedef using the same identifier as the tag name
```
typedef struct animalStruct animalStruct;
struct animalStruct {
    ...
}
```
### main
- use EXIT_SUCCESS or EXIT_FAILURE are return values of main
- reaching end block is EXIT_SUCCESS by default
- calling exit() is essentially the same
- all command line arguments are transferred as strings
- argv[0] holds the name of the program invocation
### recursion
- first check the termination condition (else you have infinite recursion)
- ensure preconditions of a recursive function in a wrapper function
