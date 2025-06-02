# Hello World in C

Most of you probably know what a hello world program is by now. It is the commonly the first program that anyone writes in a new language. It simply prints the string "Hello World!" to the console. This is what a Hello World program looks like in C. I am assuming that you have already taken a course in Python and understand the basics of programming in Python (types, functions, function parameter/arguments, imports)

```C
#include <stdio.h>

int main(int argc, char* const argv){
    printf("Hello World\n");
    return 0;
}
```

There are a couple things you probably haven't seen before and are curious about. 
1. What is the `#include <stdio.h>`? 
2. What does `int main (...)` mean? 
3. What are `argc` and `argv`? 
4. What is the `\n`?
5. What does `return 0` do?
6. What are the braces {...} for?
---

1. The `#include <stdio.h>` is telling C to include the standard input/output header file.  (std → standard, io → input, output, .h → header file )
    - Just based on the name **standard**, you can probably guess that this is an official C built-in library. 
    - The pound/number sign `#include` is a **preproccessor directive** which is handled by the compiler to link the contents of `stdio.h` to the current file. It will functially copy and paste the code in `stdio.h` into the current file at the `#include` before compiling. This allows you to use functions and values defined in `stdio.h`. One of those functions is `printf`.
2. The `int main(...)` is declaring a function called `main` which has a **return type** of `int`. That just means when the main function finishes execution C expects `main` to return some number. `main` is a special type of function. Every C program **must** have a `main` function because that is where program execution begins in C. 
3. `argc` and `argv` are **parameters** for the `main` function. When you run your program from the terminal, you can add what are called **command line arguments**. The number of command line arguments get passed into `argc`, and the arguments themselves get passed as an array of strings to `argv`.
    - In this course you will likely never see `argc` and `argv` again. However they are quite useful (if not necessary) if you ever write tools in C. 
4. The `\n` is called the **new line character**. It is a type of **escape character** which is a way to add formatting to string by using a backwards slash followed by a letter. The `\` character followed by the letter `n` moves the cursor down 1 line when it gets printed. In Python it is the default behaviour of the `print` function to move down a line everytime print is called, but in C you have to explicity tell `printf()` when you want a new line to begin (yes it is as annoying as it sounds).
5. `return 0` is what returns the `int` return value described in point 2. In this example it is basically useless (you can remove and most compilers won't complain). This is one of those things which you might not see in this course but is widely used in C. These are normally called **error codes** and they are typically just `int` values that represent some outcome of an event. Typically the return value `0` means success, and anything other than 0 is some sort of error. 
6. Braces are used in C to define a block of code that belongs to a function. It tells C where `main` starts and ends. A more software specific term is that the braces define the **scope** of a function. Variables defined in the *scope* of a function only exist in that scope. When a function returns, those scoped variables go away. 

