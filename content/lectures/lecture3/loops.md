

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

### General Syntax (pseudocode)
```c
for(init; condition; update){
    body
}
```

### Steps
1. `init`: Execute init statments, normally setting up loop variables
2. `condition`: Check if the condition is true. If it isn't, exit the loop
3. `body`: Execute code in body
4. `update`: Execute update statements, often incrementing loop variables


### Example

#### Print numbers from 1 to 100
```c
// |   init   |   cond   |  update  |  
for(int i = 1; i <= 100; i = i + 1){
    printf("%d\n", i)   // body
}
```

What this code says is:
1. Start at `i = 1`
2. Check if `i` is less than or equal to 100 (`i <= 100`)
    - If Yes? 
        - Execute the body of code inside the braces. Print the current number.
        - Once all the code in the body is executed, the update statements are run. In these case that is `i = i + 1`. This increments the value of i to the next number.
        - Once `i` has been incremented, repeat step 2
    - If No?
        - Don't execute the code in the body and exit the loop
        - This means it won't print numbers when `i <= 100` fails (Another way to say this is when `i > 100` is true), which occurs at `i = 101` like we want.

Often times in loops, if you are using a variables just as a counter, then name it with a single letter. Often `i`, `j`, and `k` are used for counters and `x`, `y`, and `z` are used for math/coordinate variables.  

As you learned in the lesson on expressions this can also be written as:
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

> NOTE: `i++` is what is called **syntatic sugar** for `i = i + 1` or `i += 1`. **Syntatic sugar** is just a shorthand expression for another piece of code. It is often made because programmers are lazy and want to type the fewest characters possible.


## Multiple `init`, `condition`, and `update` Statements

You can actually have any number of init and update statements, they just have to be seperated by commas `,`. You can
also have multiple conditions but they must be combined with the logical operation AND (`&&`), OR (`||`), or NOT (`!`).
The condition must evaluate to a boolean (true or false) value. 

### Example. Printing a number increasing from 0→100 and a number decreasing from 100→0
```c
for(int up = 0, down = 100; up <= 100 && down >= 0; up++, down--){
    printf("(%d, %d)\n", up, down)
}
```
This prints:
```c
(0, 100)
(1, 99)
...
(99, 1)
(100, 0)
```


### Nested For Loops
Nested for loop can be used if you want to iterate over multiple independent values.

#### Example: Printing all (x, y) pairs from 0-100 (inclusive).

```c
for(int x = 0; x <= 100; x++){
    for(int y = 0; y <= 100; y++){
        printf("(%d, %d)\n", x, y);  // Prints (x,y) pair
    }
}
```
This will print
```c
(0, 0)
(0, 1)
...
(100, 99)
(100, 100)
```

## While Loops
While loops are often when code needs to be repeated while a condition is met. That means that a for loop is a sub-set of a while loop, meaning that anything you can do with a for loop, you can also do it with a while loop. 

Pseudocode

```c
while(condition){
    // body
}
```

### Steps
1. Check if condition evaluates to true
2. If yes, execute the code in the body
3. If no, exit loop 


You can make the equivalent of the for loop from before with a while loop like this:
```c
int i = 0;
while(i < 100){
    printf("%d\n", i);
    i++;
}
```

There isn't much point to do this since that's what for loops are for. While loops are often used for logically conditions that are either true or false.

## Example.
Let's say you have a timer and want to increment its counter until the user stops it. Assume you have a variable called `is_timer_stopped` that is true once a timer is stopped. You might use code like this:

```c
int counter = 0;
while(!is_timer_stopped){
    counter++;
}
printf("The counter is: %d", counter);
```

### Nested While Loops
While loops can also be nested.

#### Example: Printing all (x, y) pairs from 0-100 (inclusive) with a `while` loop. 
You won't often see nested while loops like this, for loops are much more standard and to be honest nicer looking.

```c
int x = 0;
int y = 0;
while(x <= 100){
    while(y <= 100){
        printf("(%d, %d)\n", x, y);  // Prints (x,y) pair
        y++;
    }
    x++;
}
```

<Important>
    When using a counter while loop, don't forget to increment the counter variables or you will get an infinite loop. (I may or may not have don't that when making this example.)
</Important>


## Do While Loops
Do while loops are very similar to while loops except that the condition is checked ***after*** executing the body of code instead of before. 