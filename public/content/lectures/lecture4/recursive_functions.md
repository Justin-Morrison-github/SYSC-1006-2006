# Functions

A common issue programmers often run into is that you have some logic in your code that needs to repeat but changes slightly. For beginners, sometimes they 'solve' this problem by simply copy and pasting the code and tweaking it until if works. That's great that it works, but it's not *effiecient* and it is not easily *maintainable*. As previously mentiod If you find that you are copy and pasting code, there is often a better solution. In this particular problem, a solution is to **"factor out"** the logic code into a **function** and then pass the necessary data too that function.

> Defintion: A function is a collection of code that can be executed by **calling** the function name. Function **parameters** define what the function expects to get passed, or the data it will use to produce an output. This parameters get filled by values called **arguments** at runtime. A function can **return** a value or not. Unlike Python, a function in C can only return *1* value.

> **Important:** Make sure to terminate every C statement with a semicolon.

A **Variable** holds data. A **Function** does work. A **Loop** repeats tasks.


We have already seen an example of a function in previous code. The `main` function is just a function, it just happens that the creators of C decided every program would start execution in the main function. 

Example of main function:
```c
int main(void){
    return 0;
}
```