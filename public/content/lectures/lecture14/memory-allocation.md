<title>
    Memory Allocation
</title>

## Automatic Memory Allocation

In most imperative programming languages,

In C, parameters and local variables whose scope is the function are created/allocated when the function is called. These local variables are called **automatic** variables. These variables will dissappear when the functions return.

<info>
    Beyond this course: Some languages (including C) have <strong>static</strong> local variables which keep their values even after their function's activation frame has been deallocated.
</info>


## Limitations of Automatic variables

Say a function that contains some code like this:
```c
int numbers[1000];
```

The size of the array is determined at compile-time, but it is not allocated until the function is called during run-time. It is possible that the actual capacity needed isn't known until run-time. If that happens the array may be too large and waste space or it might be too small and lost data.

Another downside is that automatic variables only exist inside of the function they are declared in, the values stored inside those variables are not retained when the function frame gets deallocated.

### Solution: <em>Dynamic</em> Memory Allocation