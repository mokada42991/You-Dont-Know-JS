/* You Don't Know JS: Scope & Closures
A log of the code used during the course of the book in examples and practice problems.
All code is executed in the Chrome console and then copied here.
*/

// Chapter 1: What is Scope?
/*
LHS reference: a look-up performed to find the location of a variable container or if a variable container exists within the scope in order to assign it a value.
RHS reference: a look-up performed to find the value of a given variable.
*/

function foo(a) {
    var b = a;
    return a + b;
}
var c = foo(2);

/*
1. LHS reference for the variable "c" to declare the variable in the scope to assign it a value. [var c = ..]
2. RHS reference for "foo" to look up the value which is a function. [foo( ..]
3. LHS reference for the variable "a" which is located as a formal parameter for "foo". [a) ..] The parameter is assigned the value "2".
4. LHS reference for the variable "b" to declare the variable and to assign it a value. [var b = ..]
5. RHS reference for "a" to look up the value which is "2". [= a; ..]
6. RHS reference for "a" to look up the value which is "2". [return a + ..]
7. RHS reference for "b" to look up the value which is "2". [+ b; ..]
*/
