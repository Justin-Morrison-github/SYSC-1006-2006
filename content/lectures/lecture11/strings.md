<title>
Strings
</title>

A string is any combination character strings defined in the ASCII table. The ASCII table is shown below. 

![alt-text](/content/lectures/lecture11/ascii.jpg)

Examples of strings are:
```c
"Hello World!"
"0123456789"
"+/*&#@!\t\n"
```

<info>
Remember, C does not have a dedicated <strong>string</strong> type
</info>

## Implementing Strings in C

In C, strings are implmented as an array of characters. Importantly, the string must be terminated by the <strong> null terminating character </strong>. Since the null terminating character is appended onto the end of the string, the number of elements in the character array is always 1 more than the length of the string <em>(length of array = length of string + terminating character)</em>.

<definition title="Null Terminating Character">
Special character to represent the end of a string, in the ASCII table it is the <strong> NUL </strong> value which equals 0. In code it looks like: <code>\0</code>. 
</definition>

<warning title="Important">
The null terminating character (NUL) is different than '0', which is the character zero, or NULL, which is the null pointer. It is a very small difference that can trip up students.
</warning>


## Using String Variables

You can define a string in a few ways. Since a string is just an array of characters, you can just use the regular array syntax.

```c
char course[] = "SYSC1006"
```
C will figure out how long the array must be to store the strings plus the null terminating character at runtime. The resulting array will look like this:

<array type="string" string="SYSC1006">
</array>




If you want to be explicit in how large the array should be you can declare it like this. But in most cases it is redundant since C will figure it out.

```c
char course[9] = "SYSC1006"
```

It is also fine if you declare an array with a size <em>larger</em> than the length needed. The null terminator is all C needs to know when the string ends.

```c
char course[10] = "SYSC1006"
```

In this case, indexes 0 through 7 will contain by the contents of "SYSC1006", index 8 will be the null terminating character, and the character at index 9 could literally be anything, C doesn't care because the null terminating character ends the string at the index before.

<array type="string" string="SYSC1006" array='["S", "Y", "S", "C", "1", "0", "0", "6", "\\0", ""]'>
</array>


<array type="string" string="SYSC1006" array='[1,2,3,4]'>
</array>

<!-- <array array=["T", "e", "s", "t", "\0", ""] /> -->


<!-- <array type="string" contents="SYSC1006">
</array> -->

<!-- <array type="string" contents="SYSC1006"/> -->

<warning title="Warning">
Declaring an array with a size <em>less</em> than what is required to fit the string plus the null terminating character can lead to unexpected behaviour.

<CodeBox language='c'>
char course[4] = "SYSC1006";
</CodeBox>

This code will create an array that can't contain the whole string and also won't contain the null terminating character.

<array type="string" string="SYSC" shownull="false">
</array>


</warning>
