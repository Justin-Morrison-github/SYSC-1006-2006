<title>
Functions
</title>


A common issue programmers often run into is that you have some logic in your code that needs to repeat but changes slightly. For beginners, sometimes they 'solve' this problem by simply copy and pasting the code and tweaking it until if works. That's great that it works, but it's not *effiecient* and it is not easily *maintainable*. As previously mentiod If you find that you are copy and pasting code, there is often a better solution. In this particular problem, a solution is to **"factor out"** the logic code into a **function** and then pass the necessary data too that function.




<exercise title="Exercise Set 1.1">
    <Quiz title="1.1.1" question="Which of loops is *not* supported by C" options="{for:'Incorrect', while:'Incorrect', foreach:'Correct', 'do while':'Incorrect'}" correct="foreach" hint="Does C let you loop over a list like python (for x in ___)?">
    </Quiz>
    <Quiz title="1.1.2" question="Which of loops is *not* supported by C" options="{for:'Incorrect', while:'Incorrect', foreach:'Correct', 'do while':'Incorrect'}" correct="foreach" hint="Does C let you loop over a list like python (for x in ___)?">
    </Quiz>
     <Quiz title="1.1.3" question="Which of loops is *not* supported by C" options="{for:'Incorrect', while:'Incorrect', foreach:'Correct', 'do while':'Incorrect'}" correct="foreach" hint="Does C let you loop over a list like python (for x in ___)?">
    </Quiz>
    <fillblank question="What is my name?" answer="Justin" cased="true">
</fillblank>

</exercise>


## Exercises
<!-- 
<exercise title="Exercise 1.0.0">
    <Quiz title="" question="Which of loops is *not* supported by C" options="{for:'Incorrect', while:'Incorrect', foreach:'Correct', 'do while':'Incorrect'}" correct="foreach" hint="Does C let you loop over a list like python (for x in ___)?">
    </Quiz>
    <fillblank question="What is my name?" answer="Justin" cased="true">

</fillblank>

</exercise>

<exercise title="Exercise 1.0.1">
    <Quiz title="" question="Which of loops is *not* supported by C" options="{for:'Incorrect', while:'Incorrect', foreach:'Correct', 'do while':'Incorrect'}" correct="foreach" hint="Does C let you loop over a list like python (for x in ___)?">
    </Quiz>
</exercise> -->


<!-- 
<warning>
    </div>
        Make sure that....
    </div>
</warning>

<info>
    </div>
        By the way, you can find out more...
    </div>
</info>

<definition title="Definition">
    <div>
        The defintion of...
    </div>
</definition> -->


<DropQuiz title="Quiz" question="Which of loops is *not* supported by C" options="{for:'Incorrect', while:'Incorrect', foreach:'Correct', 'do while':'Incorrect'}" correct="foreach" hint="Does C let you loop over a list like python (for x in ___)?">
</DropQuiz>


> Defintion: A function is a collection of code that can be executed by **calling** the function name. Function **parameters** define what the function expects to get passed, or the data it will use to produce an output. This parameters get filled by values called **arguments** at runtime. A function can **return** a value or not. Unlike Python, a function in C can only return *1* value.

> **Important:** Make sure to terminate every C statement with a semicolon.

A **Variable** holds data. A **Function** does work. A **Loop** repeats tasks.


We have already seen an example of a function in previous code. The `main` function is just a function, it just happens that the creators of C decided every program would start execution in the main function. 

Example of main function:
```c
int main(void){
    printf("Hello, world!\\n");
    return 0;
}
```

You can define your own function with:
- any return type
- any name
- any number and type of arguments
- any amount of code inside

A general rule to designing functions is that should only be responsible for only 1 thing, anything more than that should be broken up into smaller function. 

Just as a sidenote, make sure that your variable and function names make sense. Look at the following code and decide which one is easier to understand what is going on:

```c
int x = do_this();
int y = do_that(x);
printf("The value is: %d", y);
```

OR

```c
int input = get_user_input();
int sqrt = sqrt(x);
printf("The value is: %d", sqrt);
```

#### What the compiler needs

The compiler needs to know 3 things:
- The function's return type
- The name of the function
- The number of parameters the function expects and their types

If you don't define this information, the compilier will **implicitely** try to figure out those details based on the first time you call the function. This is called an ***implicit declaration***

> NOTE: Implicit declarations can be conveient but are also dangerous and discouraged in this course.


## Function Declaration/Prototype

The function declaration (sometimes called the function prototype) is the code where those 3 things are defined. It doesn't contain any information on the body or implementation of the function.

> NOTE: In this course a function declaration/prototype is a single line of code that defines a function.

Examples:
```c
int power(int base, int exp);
int power(int, int);
```

These two lines tells the compiler the same thing:
- The function will return an `int`
- The function is named `power`
- The function expects to be given 2 `int` values

The names of the parameters in the function prototype don't really matter and don't have to match the variable names in the body/defintion of the actual function implementation.

## Function Defintion

This the code that actually defines what the function does; its ful implementation/body.

> NOTE: Variable names are mandatory in function definition. The values passed to the function will be assigned to these variables.

Example

```c
int power(int base, int exp) {
    int i = 1;
    int pow = 1;

    while (i <= exp) {
        pow *= base;
        i += 1;
    }
    return pow;
}
```

> NOTE: Students often get confused on the difference between a function declation/prototype and a function definition and why they are needed. The reason this is taught is because later in the course you will learn about header files(.h files like <stdio.h>)  which will contain the function declaration/prototypes and have accompaning source files (.c files that contain the implementation of the functions declared in the header file). When you include the the .h header file it links the function declaration with its implementation in the .c file so you can execute the function.

## Function Call/Invocation 

This is an example of how to call the function with previously declared and defined. Assume that the implementation of the `power` function is either below main or in a different .c file (to come in next lecture).

```c
#include <stdio.h>

int main(main) {
    int i = 0;

    while (i < 10) {
        printf("i = %d, 2^i = %d, (-3)^i = %d", i, power(2,i), power(-3, i));
        i += 1;
    }
    return pow;
}
```
This will print:
```
i = 0, 2^i = 1, (-3)^i = 1
i = 1, 2^i = 2, (-3)^i = -3
i = 2, 2^i = 4, (-3)^i = 9
...
```

Notice that when *power* is called it is passed a value `i`. This is *not* the same `i` that is in the `power` function body. Only the *value* (0,1,2...) of the loop counter `i` get passed to `power`, and then the parameter `exp` gets assigned to the value (0,1,2...). I emphasize this because it is a very important concept called **Pass by value**, only the *value* of the variable `i` is passed to `power`, where a local copy is made and stored in `exp`.

A **Variable** holds data. A **Function** does work. A **Loop** repeats tasks.

[Go to Other Lesson: **Terms**](http://localhost:5173/lecture/Terminology)

[Go Home: **Home**](http://localhost:5173/)


<!-- <div style="background: #191f28; padding: 1rem; border-radius: 12px;">
    Code
    <br></br>
  <iframe
    src="https://replit.com/@morrisonxjustin/C-Demo?embed=true"
    width="100%"
    height="500"
    frameborder="0"
    allowfullscreen
    style="border-radius: 8px; box-shadow: 0 0 10px #0003;"
  ></iframe>
</div> -->








```c
int x = 5
printf("%d\n", x)

```

<details>
<summary>Question 1</summary>
Is this valid C code?

```c
int x = 5
printf("%d\n", x)

```


[quiz question="Is this valid C code" options="{True:'No, there are no semicolons', False:'Correct!'}" correct="False"]

</details>


## Exercises
<exercise title="Exercise Set 2.0">
<quiz title="2.1.5" question="Is this valid C code?" options="{True:'No, there are no semicolons', False:'Correct!'}" correct="False">

```c
int x = 5
printf("%d\n", x)
```

</quiz>


<Quiz title="2.1.6" question="Which of loops is *not* supported by C" options="{for:'Incorrect', while:'Incorrect', foreach:'Correct', 'do while':'Incorrect'}" correct="foreach" hint="Does C let you loop over a list like python (for x in ___)?">
</Quiz>
</exercise>

<ccoderunner title="My First C Program" />