<title>
Structures (structs)
</title>

A struct is just a new data type that you define. It is just variable that can have fields of different data types. In other languages you might have heard of classes, C does not have classes, but it has structs. Structs are way to combine related data under a name. 

## Example

If you needed to use points in the from (x,y) in your program. You could just define two ints:

```c
int x = 0;
int y = 0;
```

But what if you have more points? Are you just going to add a number onto the variable name? This approach becomes unsustainable quickly. The points that go together (x1, y1) are not linked or related in anyway, all the variables are just thrown into the scope and it is up to programmer to figure out which pairs go together.
```c
int x1 = 0;
int y1 = 0;
int x2 = 0;
int y2 = 0;
int x3 = 0;
int y3 = 0;
...
```
With this approach you have to repeat yourself, probably copy and pasting. Rememeber DRY (Don't Repeat Yourself)? Structs are way to make this process much simpler and easier to work with.

## Using Structs

You can define a struct in a few ways.


#### The first is the simplest:
<!-- ```c
struct point_t{
    int x;
    int y;
};
``` -->

<div className="w-[400px]">

```c
struct point{
    int x;
    int y;
};
``` 
</div>
<div>

```c
typedef struct {
    int x;
    int y;
} point_t;
```
</div>
<div>

```c
typedef struct point{
    int x;
    int y;
} point_t;
```
</div>


<warning>
A common mistake is forgetting that a semicolon goes after the last brace.
</warning>


The code above defines a custom data type called `point_t`. It has two **fields**, both `int`, called `x` and `y`. To use create a `point_t` variable in code you would type:

```c
struct point_t point_1;
```

<Warning title="Important">
If you define your struct as <code>struct name_t {...};</code> then you <strong  color="#eab308">must</strong> use the <code>struct</code> keyword when declaring the variable. The code below is incorrect:

```c
point_t point_1; // ❌ This is incorrect based on how the struct was declared
```
</Warning>



#### The second way to define a struct:
```c
typedef struct {
    int x;
    int y;
} point_t;
```

<Definition title="typedef">
The keyword <code>typedef</code> basically create a new data type to be reference by that name.
</Definition>


This code defines a custom data type called `point`. It has two **fields**, both `int`, called `x` and `y`.

<Info>
When defining your own custom types with typedef, it is common practice to add a _t at the end of name to indicate it is a custom type.
</Info>




### Accessing Fields

Given this struct and variable of type `point_t`.

```c
typedef struct {
    int x;
    int y;
} point_t;

point_t point1;
```
You can access its fields with the  `.` (**dot**) notation. This initilizes the `x` field to 10 and the `y` field to 20. 

```c
point1.x = 10;
point1.y = 20;
```

You can also do these in one line.

```c
point1 = {10, 20};
```

<Info>
When initilizing a struct's fields in one line using the <code>{...}</code> syntax, the variables will be set in the order that they are declared in the struct definition. In this case, the x field was defined first so it will be assigned 10, and the y field will be assigned 20.
</Info>
