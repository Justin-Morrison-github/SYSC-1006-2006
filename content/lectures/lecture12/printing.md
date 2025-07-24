# Printing

Printing in C is much more complicated than in a language like python.

To print something to the console you need to use the `printf` function (The f stands for format).

```
printf()
```

 Unlike python, C does not allow direct printing off its data types except for strings. 

In C you **can't** do any of the following:

```C
printf(1)      ❌
printf(3.1415) ❌ These all will cause errors
printf('A')    ❌
```

You can only print strings directly.
```C
printf("Hello World!")  ✅ This will work
```
## Format Specifiers

Because of this limatation, C provides **format specifiers** to format data types into strings to be printed. They tell C how to interpret the data to be printed. Data is just 1's and 0's at the end of the day, there need to be some rules as to how things should look when printed. I won't bore you with it but there are a lot of format specifiers, you can find out more if you want. I will just give the necessary ones for now.

| Data Type        | Format Specifier | Pneumonic           |
|------------------|------------------|---------------------|
| `int` (signed)   | %d or %i         | decimal or integer  |
| `int` (unsigned) | %u               | unsigned            |
| `char`           | %c               | character           |
| `string`         | %s               | string              |
| `float`          | %f               | floating point      |
| `double`         | %lf              | long floating point |

Honestly even I had to look a bunch of these up. In my opinion it's not really realistic to expect people to memorize these format specifiers when 1 google search can get you all of them. **It is important to know that they exist though.**

### Examples In Code

```
printf()
```




