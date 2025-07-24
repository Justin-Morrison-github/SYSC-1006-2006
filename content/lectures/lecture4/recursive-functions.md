<title>
    Recursive Functions
</title>

<definition title="Recursive Function">
    A recursive function is a simply a function that calls itself.
</definition>

### Example of recursion

```c
int factorial(int x){
    if(x = 1){
        return 1;
    }

    return x * factorial(x - 1)
}
```


### Visual of recursion

Take the code:

```c
int x = factorial(5);
```

Will turn into:
```c
int x = factorial(5);                   // 5!
int x = 5 * factorial(4);               // 5 * 4!
int x = 5 * 4 * factorial(3);           // 5 * 4 * 3!
int x = 5 * 4 * 3 * factorial(2);       // 5 * 4 * 3 * 2!
int x = 5 * 4 * 3 * 2 * factorial(1);   // 5 * 4 * 3 * 2 * 1!  (Rememeber 1! = 1)
int x = 5 * 4 * 3 * 2 * 1;  
int x = 120;            
```

<recurse x="5" name="factorial">
</recurse>
