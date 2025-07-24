<title>
    Conditionals
</title>

Conditionals determine the path that code follows in a program based on a condition, hence the name.


## If statements
If statements control the flow of code based on a boolean true/false condition.

Syntax:
```c
if (condition) 
{
    // Code to be executed
}
```

<Important>The condition ***must*** be surrounded by brackets.</Important>

## Single Line If Statements

If the body of an if statement is only one line, the brackets are optional.

Example:
```c
if (condition)
{
  single_line();
}
other_code();
```

Is the exact same as:

```c
if (condition)
    single_line();
other_code();
```


In this case, if the condition is met the code is executed inside of the curly braces. If the condition is not met, the
code in the braces is skipped. Importantly, the condition can be any valid C expression that results in a boolean
(true/false) value.

Some examples of valid boolean expression in C:

Any arithemic comparison
```c
if(x < 5){ ... } Any Boolean operators if(x && y==true){ ... } 
```

Here is some pseudocode for the simplest form on an if/else statement. 

```c 
if condition: code block 1 else: code block 2
 ``` 

If `condition` evaluates to true, then
    code block 1 is executed. But if `condition` is false, code block 2 is executed.



## Ternary Operator

A ternary operator can be thought of as a one line if statement. It allows dynamic assignment when an if statement would be a little overkill.

### Syntax
```c
type var = (condition) ? value_if_condition_true : value_if_condition_false
```

### Examples
```c
// Assume x is some number, you could find the sign of x in the most useless
int sign = (x >= 0) ? 1 : -1
```



```c
int x = 5;
int y = (x > 5) ? x + 1 : 1 + abs(x + 1)

// Sometimes a ternary operator is easier to understand if you surround the values in brackets.
// I would recomended doing it for any value that isn't a literal. 

int y = (x > 0) ? (x + 1) : (1 + abs(x + 1))
```

That is equivalent to:

```c
int x = 5;
if (x > 0)
{
    int y = x + 1;
} 
else
{
    int y = 1 + abs(x + 1);
}
```


### Nested Ternary Operator

Ternary operators can be nested, meaning the value of a ternary operator depends on another ternary operator.

<Warning>
    Nested ternary operators become very difficult to understand at a glance. If you feel the need to nest a ternary operator, I would suggest simply going for an if/else tree. 
</Warning>

#### Example

```c
// Say you are trying to model a car starting with a bunch of boolean values
#include <stdbool.h> // For boolean data type (bool, true, false)
boolean car_started = (is_key_turned) ? ((is_there_gas) ? true : false) : false
```


```c
/* Say you have an object that is moving such that:
 *    - Moving backwards (velocity < 0)
 *    - Moving forwards (velocity > 0)
 *    - Stationary (velocity == 0)
 *
 *And you want to find the "direction" of the motion in the following format
 *    - backwards = -1
 *    - forwards = 1
 *    - stationary = 0
 */

#include <stdbool.h> // For boolean data type (bool, true, false)

int direction = (velocity > 0) ? 1 : (velocity < 0) ? : -1 : 0
```