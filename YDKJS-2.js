/* You Don't Know JS: Scope & Closures
A log of the code used during the course of the book in examples and practice problems.
All code is executed in the Chrome console and then copied here.
*/

// Chapter 1: What is Scope?
// Understanding Scope
/*
LHS reference: a look-up performed to find the location of a variable container or if a variable container exists within the scope in order to assign it a value.
RHS reference: a look-up performed to find the value of a given variable.
*/

// Quiz: Identify all LHS and RHS look-ups in the following:
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

// Nested Scope
function foo(a) {
    console.log(a + b);
}

var b = 2;
foo(2);
/*
The RHS reference for "b" searches first within the scope of "foo" and when it is not found moves onto the next scope, the global scope, where the variable and its value are found.
*/

// Errors
function foo(a) {
    console.log(a + b);
    b = a;
}

foo(2);
/*
The RHS reference for "b" will not be found in the function scope or the global scope and this results in a "ReferenceError" thrown by the Engine.
*/

// Chapter 2: Lexical Scope
// Lex-time
function foo(a) {
    var b = a * 2;

    function bar(c) {
        console.log(a, b, c);
    }

    bar(b* 3);
}

foo(2);     // 2, 4, 12
/*
There are three nested scopes.
1. The global scope.
2. The scope of "foo".
3. The scope of "bar".
As "bar" is executed, the Engine looks for "a" and "b" which are found in the "foo" scope, and "c" which is found in the "bar" scope. A scope look-up stops once it finds the first match.
*/

// Cheating Lexical
function foo(str, a) {
    eval(str);              // cheating!
    console.log(a, b);
}

var b = 2;

foo("var b = 3;", 1);       // 1, 3 insterad of 1, 2

// The lexical scope is modified by the eval() function. When console.log() is performed, the variable b is found within the scope of "foo" instead of the global variable where it was initially declared.

function foo(obj) {
    with (obj) {
        a = 2;
    }
}

var o1 = {
    a: 3
};

var o2 = {
    b: 3
};

foo(o1);
console.log(o1.a);  // 2

foo(o2);
console.log(o2.a)   // undefined
console.log(a);     // 2 -- a leaked global variable

// The "with" method is used for making multiple property references against an object. Function "foo" takes an object and assigns the property "a" the value of "2". "o1" has a property "a" so the value is set to "2". When the function is run on "o2", the property "a" is nowhere to be found and therefore a new variable "a" is automatically created in the global scope.
