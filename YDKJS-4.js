/* You Don't Know JS: Types & Grammar
A log of the code used during the course of the book in examples and practice problems.
All code is executed in the Chrome console and then copied here.
*/

// Chapter 1: Types
/* JavaScript defines seven built-in types:
    - null
    - undefined
    - boolean
    - number
    - string
    - object
    - symbol
*/
typeof undefined    === "undefined";   // true
typeof true         === "boolean";      // true
typeof 42           === "number";       // true
typeof "42"         === "string";       // true
typeof { life: 42 } === "object";       // true
// added in ES6
typeof Symbol()     === "symbol";       // true

typeof function a(){ ... } === "function"   // true
// A function is a callable object, therefore it is not a built-in type.

typeof [1,2,3] === "object";    // true
// An array is also a "subtype" of an object.

// Values have types. Variables hold values. A variable's value does not need to keep the initial type assigned at the start.
var a = 42;
typeof a;   // "number"

a = true;
typeof a;   // "boolean"

// An "undefined" variable is one that has been declared but has no value. An "undeclared" variable is one that has not been formally declared in the scope.
var a;
typeof a;   // "undefined"
b;  // ReferenceError: b is not defined ("undeclared")
