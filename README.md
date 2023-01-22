
Angular Project Structure Best Practices

I have been working on some angular projects for 5 years. So I have a lot of experience in angular. Here are some tips that I want to share on how to structure an Angular project. Remember, this is my own opinion and experience, so it may be wrong in some aspects of your project. Please read carefully and consider whether you should use this practice for your project or not. 
If your Angular project has a good structure, that might help your project gets some benefits such as easy maintenance, editable, reduced bugs, enhanced project quality.

Let's begin.

1. Object Oriented Thinking
- You should clearly understand Object Oriented Programming theory and how to use this knowledge in your project. This is extremely important because Angular uses OOP a lot, and most of its features are based on classes (components, directives, pipes...)
- And most software structural knowledge relies on Object Oriented Programming. If you don't clearly understand about Object Oriented Programming, you cannot structure your project well.
2. Separation 
- You should separate your functions/classes into smaller ones. If your functions/classes are big and complexity, you will get some difficulties like hard to edit and enhance your code. The smaller functions/classes will reduce dependencies, and they will be updated more easier
- Your functions/classes only should have one feature, maybe two features but don't try to have three or more features in your functions/classes.
- Your function/class should use the variables/objects as passed parameters, rather than calling them from other classes or global. Constants or utils functions/variables can be called from static classes but should be limited
- For functions you can consider: complexity, level of nested blocks, number of lines of code, etc. 
- For classes you can consider: number of member functions, member variables, base classes, number of lines of code, etc.
3. Don’t Repeat Yourself (DRY)
- What is duplication code? Simply put, it's when a snippet of code appears multiple times throughout a codebase.
- Code duplication makes software less maintainable
- There is one renowned way of reducing it. Using DRY or Do not Repeat Yourself principle, you make sure that you stay away from duplicate code as often as you can.
 4. Three Tier (Three Layer) Architecture
Three-tier (or three-layer) architecture is a widely accepted solution to organize the codebase. According to this architecture, the codebase is divided into three separate layers with distinctive responsibilities:
- Presentation layer: This is which the user interface functions are handled. It typically consists template, component.
- Business logic layer: This layer contains the business logic that control the application’s core functionalities. Like making decisions, calculations, evaluations, and processing the data passing between the other two layers.
- Data access layer: This layer is responsible for interacting with data such as databases, file handles, api,...
5. Editability:  I highly recommend that you should use these pattern to increase editability of your applications:
- DTO pattern
- Adapter pattern
6. Pass By Reference Principle
- Apart from increasing performance when using Pass By Reference as you know, It is also helpful in structuring your applications such as reducing lines of code, enhancing editability, and avoiding mistakes of developers in big applications. But Carefully when using Pass By Reference, you have to make sure that you clearly understand Pass By Reference knowledge to avoid critical errors.
7. Testing Code
- Testing code is helpful and keeps your coding structural strictly. If your code has any change, testing code will detect errors and notify you.



