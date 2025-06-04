<title>
Code Organization
</title>

A natural way to organize your code is to seperate into functions. Each function does its own task and is called in the main function to complete some task. When writing functions, both the compiler and developer need the same information about the function:
- Return type
- Name
- Type and number of parameters

The best practice for large projects or code that is worked on by a team is too split what would otherwise be a massive single C file, into smaller modules.

A module is made of:
- A **header file (.h)** that declares (*not defines*) all sorts of *entities* (constants, variables, functions, types, etc)
- A **source file (.c)** that contains the source code (definition or implementation) of those *entities*
