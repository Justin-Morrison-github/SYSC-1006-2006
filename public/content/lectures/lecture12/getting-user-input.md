<title>
Getting User Input
</title>

In this course we will use the `scanf()` function to read text input from the console. `scanf` is similar to `printf` in the fact that it uses the same **format specifiers** (%d, %f, %s), so review those if you don't remember them.

<info>
    The format string can take multiple format specifiers, but that is beyond the scope of this course.
</info>

The header of the `scanf()` is:

```c
int scanf(const char* format, ...);  
```


<warning title="Important">
    <strong color="#ef4444">Do Not</strong> include text or escape characters in the scanf format string. It is not the same as python's <code>input()</code> function.
</warning>

With `printf` you are writing data is that with `scanf` you are <em>reading</em> data, and that data must be read somewhere. To store that data, you must provide the **address** of where to write the data as an arguement to `scanf`. 

Example
```c
int age;
printf("Enter age: ");
scanf("%d", &age);
```

The above block of code would print `"Enter age: "` and then wait for the user to type in a value and press enter. Assuming the user entered a valid integer, it will be stored in the variable age. You must use the ampersand (`&`) to get the address of a non-pointer variable (`int`, `float`, `char`, etc). You don't need to use the ampersand for variables that are already pointers (`strings`).

Note the space after the colon, `scanf` will start reading for wherever the cursor ends, so if you want it look nice in the console, add some space. You could even put a newline `\n` in the printf to push the input to the next line.

<info>
    If you want to provide a prompt to the user, you <strong>must</strong> use <code>printf()</code>, you cannot include a prompt inside <code>scanf()</code>
</info>

## More Examples

### Reading an int

```c
scanf("%d", &num);
```

### Reading a char

```c
scanf(" %c", &letter);
```

<warning title="Important" notitle="true">
    Reading a character is a bit special, you must put a space <strong>before</strong> the format specifier. This is empty possible previous characters from the input buffer.
</warning>




### Reading a string

```c
scanf("%s", my_string);
```

<info>
   Notice how there is no ampersand (<code>&</code>) when reading a string as mentioned before.
</info>

### Reading a float

```c
scanf("%f", &real_num);
```


### Reading a double

```c
scanf("%lf", &measurement);
```

Remember to use the correct format specifier based on what type of floating pont number you are using (float or double).


<info>

   
<h3>Beyond this course</h3>

   You may have noticed that when outputting with <code>printf()</code> %f could be used for either <code>floats</code> or <code>doubles</code>, but when inputting with <code>scanf()</code> you must you too different format specifiers (%f vs %lf).

   The reason for this is, when you are printing, you are passing a <strong>value</strong>. In the C standard any float value passed to any variadic function (printf is one) is promoted to a double. But when inputting data, you are using a <strong>pointer</strong>, and pointers don't get promoted.

   [Link to StackOverflow Post About This](https://stackoverflow.com/questions/4264127/correct-format-specifier-for-double-in-printf)
</info>
