

## Loops

A loop is a piece of code that repeats other pieces of code. Imagine you wanted to print all the numbers from 1 to 100. You could do it manually:
```c
printf("%d", 1);
printf("%d", 2);
printf("%d", 3);
printf("%d", 4);
...
```

A general rule in programming is DRY (Don't Repeat Yourself). If you find you are copy and pasting often and only changing a thing or two, it probably means there is a better way to do it. In this case, it is **so** much easier to use a loop.

#### In C there are 3 types of loops to use.

1. `for` loops
2. `while` loops
3. `do while` loops

 There is no one *best* option because they all have their own strengths and weaknesses. 

## For Loops

For loops are the best option for the example I gave of printing the numbers from 1 to 100. For loops are great when you know exactly how many iterations you need to do and what condition to stop at.

#### General Syntax
```c
for(init; condition; update){
    body
}
```

You can actually have any number of init and update statements, they just have to be seperated by commas `,`. You can also have multiple conditions but they must be combined with the logical operation AND (`&&`), OR (`||`), or NOT (`!`). The condition must evaluate to a boolean (true or false) value. You can think of the condition as an internal if statements that gets run every iteration of the loop.


#### Example

##### Print numbers from 1 to 100
```c
for(int i = 1; i <= 100; i = i + 1){
    printf("%d\n", i)
}
```

What this code says is:
- Start at `i = 1`
- Check if i is less than or equal to 100 (`i <= 100`)
    - If Yes? 
        - Execute the body of code inside the braces. Print the current number
        - Once all the code in the body is executed, the update statements are run. In these case that is `i = i + 1`. This increments the value of i
        - Once the value of i has be incremented, check the condition again
    - If No?
        - Don't execute the code in the body and exit the loop
        - This means it will won't numbers when `i <= 100` fails (Another way to say this is when `i > 100` is true), which occurs at `i = 101` like we want.

Often times in loops, if you are using a variables just as a counter, then name it with a single letter. Often `i` is used.

As you learned in the lesson on expression this can also be written as:
```c
for(int i = 1; i <= 100; i += 1){
    printf("%d\n", i)
}
```

Or most commonly written as:
```c
for(int i = 1; i <= 100; i++){
    printf("%d\n", i)
}
```

> NOTE: `i++` is what is called *syntatic sugar* for `i = i + 1` or `i += 1`. *Syntatic sugar* is just a shorthand expression for another piece of code. It is often made because programmers are lazy and want to type the fewest characters possible.



## While Loops

Pseudocode

```c
while(condition_is_true){
    // do something
}
```

You can make the equivalent of the for loop from before with a while loop like this:
```c
int i = 0;
while(i < 100){
    printf("%d\n", i);
    i++;
}
```



## Do While Loops
