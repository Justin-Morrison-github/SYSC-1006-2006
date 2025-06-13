# Data Types in C
C is actually quite a small and simple language in term of types. There are the basic types called **primitives** that are the simple types of data in C. Then there are more complicated **composite** types that are often made of multiples or a combination of primatives.

- Primitives
    - `int`
    - `float`
    - `double`
    - `char`
    - `bool` (Only after version C99)
- Composite types
    - `Arrays`
    - `Structs`

For those of you who have used other languages, you may see that C does not support a `string` type natively. That's a bit of a white lie for now. If you want to wait until a later lesson to learn why, be my guest. Or you can click the drop down below for a truncated answer.

<details>
<summary>Strings in C</summary>
Strings in C exist, they are represented as an array of characters where the last character is called the **null terminating character** to signify the end of the string.
</details>


----
## Literals
A literal is just a constant value of a certain type.

Here are some more examples of literals:
- int: `192`, `-10`
- double: `3.1415`, `-5.4`, `7.2e+4`
- float: `3.14f`, `-5.4f` (The `f` is needed to be float, otherwise would be treated as a double)
- char: `'a'`, `'1'`, `'*'` (Single quotation marks needed)
- string: `"Hello"`, `"1000"`, `"A"` (Double quotation marks needed)

A literal value can't change, they are typically typed or **hardcoded** by the programmer into the program.

---
## Variables

**A variable is a block of memory that contains a value and is referenced with a name. The value can change over time.**

Variables are the building blocks of programming. Unlink literals, variables can change throughout a program's lifetime. If you want to do things dynamically like store arthimetic results or user input (The majority of all computer programs do one of these two things, and often both), you need variables. 

#### In C, variables have the following:
- A type
- A name
- A value

Example
```C
int x = 5;
```

Here `int` is the type, `x` is the name, and `5` is the value. In English you might say: *"The integer named x is assigned the value 5"*


There are 2 steps to using a variable in C:
- **Declaration**
- **Initialization**

---


#### Declaration

C is a statically typed language which means you must define the type of the variable when it is declared and before it can be given a value. The type tells the compiler how to assign data to the variable. 

Examples:
```C
int x;
float pi;
double radius;
char letter;
```


As you can see, you can declare variables without assigning them a value. 
- **IMPORTANT**: If you declare a variable without initializing it with a value, its value will be ***undefined***. This value is often called a "garbage" value because it depends on previous data in memory that is left over "garbage".


##### Declaring Multiple Variables
You can also declare multiple variables of the same type on the same line. However, they ***must*** be of the same type.

Meaning you can do this:

```C
int x, y, z;  // ✅ OK — same type
```

But not this:
```C
int i, char c, float f; // ❌ Compilation error
```

If you have multiple types, their declarations must go on seperate lines:
```C
int i;
char c;
float f; // ✅ OK
```

---

#### Initialization
Initialization or assignment is where you actually assign values to your variables. 

Assuming you already have a variable `int x` declared. You can assign it like this:
```C
x = 5;
```

---

#### Combining Declaration and Initiliazation

You can declare your variables first and then initialize them later like this:
```C
int x;
...any other code...
x = 5;
``` 

or you can do it in one line:
```C
int x = 5;
``` 

More examples:
```C
float pi;
double radius = 5.345162;
char letter = 'a';
pi = 3.14;  //There can be code between declaration and initialization
```

Notice how for the char variable `letter` only single quotes were used. In C, when initializing a char you ***must*** use single qoutes.

### Declaring and Initiliazing mutliple variables at once

The same rules to as just declaring multiple variables on the same line; they ***must*** be the same type. But there is one more wrinkle, each value must be assigned seperately. I think an example will make this clearer. If you wanted to define three ints, x, y, and z and initialize them all to 0 you might think to do something like this:

```C
int x, y, z = 0; // ❌ Unintended outcome
```

But actually this only sets `z = 0` and leaves x and y uninitialized. 

What you actually want to do is this:
```C
int x = 0, y = 0, z = 0; // ✅ Correct outcome
```

This type of thing rarely comes up but it can be confusing to understand.


Also same as before you need to seperate types to their own lines:
```C
int x = 1, y = 2;
double r = 1.5, l = 4.0, w = 5.5;
char c = '@'; 
```


<details>
<summary>Answer</summary>
<br>
Test
</details>

## Data type qualifiers
C gives you a lot of control over how your data can be encoded/represented. In computers there are different ways to represent data. A **data type qualifier** is used to tell C what way you want to encode your data.

#### There are 2 characteriscs qualifiers control:
- Signed-ness: If the variable can hold both positive and negative values or just positive values.
    - `signed`
    - `unsigned`
- Data Size: Defines the *minimum* size of a variable in memory (Will explain later)
    - `short`
    - `long`



<!-- Qualifiers
- `signed`
- `unsigned`
- `short`
- `long`
- `long long` 

Don't worry we'll go through each individually. -->

---
### `signed`
- Only applies to `int` types. 

Tells the computer that these variables can hold "signed" or negative values. An `int` in C is implied to be signed, since in general use you will need both positive and negative values.

##### Range

A `signed int` has the range: -2^31^ → 2^31^ -1 which is `–2,147,483,648` to `2,147,483,647`
- Note: If you know you don't need to represent negative numbers, use an unsigned number as it gives you a larger positive range.

These are equivalent:
```C
int x;
signed int x;
signed x; //int is implied because signed only applies to int types
```

---

### `unsigned`
- Only applies to `int` types. 

Tells the computer that these variables can only hold "unsigned" or non-negative values (**0 included**). 
 An `int` in C is implied to be signed, since in general use you will need both positive and negative values.
- **Note**: 
    - A normal `int` is 32 bits in C which covers the range 0 → 2^32^ - 1 which is `0` to `4,294,967,295` (Just over 4 billion).
    - A `signed int` has the range: -2^31^ → 2^31^ -1
    which is `–2,147,483,648` to 	`2,147,483,647`


- **Note**: 
    - A normal `int` is 32 bits in C which covers the range 0 → 2^32^ - 1 which is `0` to `4,294,967,295` (Just over 4 billion).
    


---

### `short`
- Only applies to `int` types. 

Tells the computer that this variable should be smaller than normal. 

A normal `int` is 32 bits or 4 bytes
A `short int` is ***at least*** 16 bits or 2 bytes

- **Note**: 
    - A normal `int` is 32 bits in C which covers the range 0 → 2^32^ - 1 which is `0` to `4,294,967,295` (Just over 4 billion).
    - A `signed int` has the range: -2^31^ → 2^31^ -1
    which is `–2,147,483,648` to 	`2,147,483,647`


- **Note**: 
    - A normal `int` is 32 bits in C which covers the range 0 → 2^32^ - 1 which is `0` to `4,294,967,295` (Just over 4 billion).
    

### `long`
- Applies to `int` and `double` types. 

Tells the computer that this variable should be smaller than normal. 

A normal `int` is 32 bits or 4 bytes
A `short int` is 

- **Note**: 
    - A normal `int` is 32 bits in C which covers the range 0 → 2^32^ - 1 which is `0` to `4,294,967,295` (Just over 4 billion).
    - A `signed int` has the range: -2^31^ → 2^31^ -1
    which is `–2,147,483,648` to 	`2,147,483,647`

---


### [Data Type Qualifier Summary](https://en.wikipedia.org/wiki/C_data_types)
#### Signed-ness:
| Qualifier  | Effect                                           |
|------------|--------------------------------------------------|
| `signed`   | Allows use of both positive and negative numbers |
| `unsigned` | Can only use non-negative (>=0) values           |

##### Equivalent Statements
`signed int = int = signed`
`unsigned int = unsigned`

---

#### Size:
|    Qualifier    |                Size                |
|:---------------:|:----------------------------------:|
|   `short int`   |          At least 16 bits          |
|      `int`      | At least 16 bits, normally 32 bits |
|    `long int`   |          At least 32 bits          |
| `long long int` |          At least 64 bits          |





<exercise title="Exercise Set 2.0">
<quiz title="2.0.1" question="What would be the best data type to store the number 4.5" options="{int:'', float:'Correct', double:'', string:''}" correct="float">

```c
int x = 5
printf("%d\n", x)
```

</quiz>


<quiz title="2.0.2" question="What data type would some text?"  options="{char:'', float:'', double:'', string:'Correct'}" correct="string" hint="C doesn't have a data type of the same name.">
</quiz>


<fillblank  question="What would be the best data type to store the number 4.5?" answer="float">

```c
_____ radius = 4.5;
```

</fillblank>


<fillblank  question="What would be the best data type to store pi as precisely as possible?" answer="double">

```c
_____ pi = 3.1415926535; //...
```

</fillblank>


<Quiz title="2.1.6" question="Which of loops is *not* supported by C" options="{for:'Incorrect', while:'Incorrect', foreach:'Correct', 'do while':'Incorrect'}" correct="foreach" hint="Does C let you loop over a list like python (for x in ___)?">
</Quiz>
</exercise>