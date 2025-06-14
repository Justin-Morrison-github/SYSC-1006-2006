<title>Expressions</title>

<definition title="Expression">
An expression is any line of code that produces a value. 
</definition>

<!-- > An expression is any line of code that produces a value.  -->


An expression is made of operands and operators. Those operators can be mathematical (+, -, /, *), logical (&&, ||, !), or any mix of both. Expresions are typically used to assign the result of operations to a varible or to use that result as a condition in a control flow statement (if, for, while, etc).


---
We will go through each of the main types of C operators.

```c
int d = 4 / 2; // d = 2
```

### Arthemetic

| Operation      | Symbol |
|----------------|--------|
| Addition       | +      |
| Subtraction    | -      |
| Multiplication | *      |
| Division       | /      |

##### Example of arthemetic expression in C
```c
int a = 1 + 2 + 3;       // a = 6
int b = 1 + 2 * 3;       // b = 7
int c = (1 + 2) * 3;     // c = 9
```
As you can see, regular BEDMAS (or PEMDAS if you're wrong) is followed in C as they are in any programming lanuage I can think about. You may have noticed I left out division in the example above. That is because there is an interesting property with division in C.

Here are some examples of division in C.

```c
int d = 4 / 2;           // d = 2
```

Okay? Looks normal enough.

```c
int e = 5 / 2;           // e = 2 ???
```

Wait what?!

There actually a straightforward answer for this. In C if both operands of a division are integers, then the result will also be an integer, this is called **integer division**. 

***IMPORTANT***: When integer division is performed the number is **truncated**, not rounded. This means the decimal are simply ignored (`3.99999` gets truncated to `3`)

Example:
```c
int x = 10 / 3;     // In a calculator x = 3.3333... but in C x = 3
int x = 20 / 3;     // In a calculator x = 6.6666... but in C x = 6
```

To get the correct mathematical answer you need to make one of the arguements a floating point number (float or double), and then the result with be a floating point number. Now that the result is a float, you will need to change the type of your variable to match.

If using literals just add a decimal point and a zero
Example:
```c
float f = 10.0 / 3  // now x = 3.3333...
```

If using variables you must cast one of the operands to a floating point type.
Example:
```c
int x = 10;
int y = 3;
float f = (float) x / y   // Cast as float, f = 3.3333...
float g = (double) x / y  // Cast as double, g = 3.3333...
```

 ### Floating point imprecision

> When doing floating point math in any computer system you can encounter **floating point imprecision**.

A classic example of floating point imprecision is the following:

```c
float f  = 0.1 + 0.1;
```

Naturally, `f = 0.2` right?

Close, but not quite. You will see if you print out the result to 10 decimal places.
```c
float f = 0.1 + 0.1;
printf("%.10f\n", f);
```

This prints:
`0.2000000030`

As you can see it is not quite exactly 0.2, but there is some error. This is a consquence of all data being encoded using binary (0's and 1's). There are only a finite number of bits available in a computer. But multiples of ten are irrational numbers in binary, so they cannot be exactly represented.

For anything you do in class this is not something to worry about. But if you are ever working on a computer system (this concept is not limited to C) where data must be very precise, keep this in mind.


### Logical

| Operation | Symbol |
|-----------|--------|
| AND       | &&     |
| OR        | \|\|   |
| NOT       | !      |


## Exercises

<exercise title="Exercise Set 1">
   
<VJQuiz question="1">
</VJQuiz>

<VJquiz question="2">
</VJquiz>

<Vjquiz question="3">
</Vjquiz>

<vjquiz question="4">
</vjquiz>

</exercise>


<exercise title="Exercise Set 2">
   
<JQuiz question="1">
</JQuiz>

<JQuiz question="2">
</JQuiz>

<JQuiz question="3">
</JQuiz>

<JQuiz question="4">
</JQuiz>

</exercise>
