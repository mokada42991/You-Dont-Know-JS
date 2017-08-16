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

// The RHS reference for "b" searches first within the scope of "foo" and when it is not found moves onto the next scope, the global scope, where the variable and its value are found.

// Errors
function foo(a) {
    console.log(a + b);
    b = a;
}

foo(2);

// The RHS reference for "b" will not be found in the function scope or the global scope and this results in a "ReferenceError" thrown by the Engine.

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
// eval()
function foo(str, a) {
    eval(str);              // cheating!
    console.log(a, b);
}

var b = 2;

foo("var b = 3;", 1);       // 1, 3 insterad of 1, 2

// The lexical scope is modified by the eval() function. When console.log() is performed, the variable b is found within the scope of "foo" instead of the global variable where it was initially declared.

// with
function foo(obj) {
    with (obj) {        // with method
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

// Chapter 3: Function vs. Block Scope
// Scope from Functions
function foo(a) {
    var b = 2;
    // some code
    function bar () {
        // some code
    }
    // more code
    var c = 3;
}

bar();  // ReferenceError
console.log(a, b, c)    // ReferenceError on all three
// "a", "b", "c" and "bar" are all within the scope of "foo". "foo", in turn is located in the global scope.

function doSomething(a) {
    b = a + doSomethingElse(a * 2);

    console.log(b * 3);
}

function doSomethingElse(a) {
    return a - 1;
}

var b;
doSomething(2);     // 15
// "doSomethingElse" and "b" are likely private details of how "doSomething" works. Therefore both should be enclosed within the scope of "doSomething" as follows:
function doSomething(a) {
    function doSomethingElse(a) {
        return a - 1;
    }
    var b;

    b = a + doSomethingElse(a * 2);

    console.log(b * 3);
}

doSomething(2);     // 15

// Collision Avoidance
function foo() {
    function bar(a) {
        i = 3;  // changes the "i" in the enclosing scope's for-loop
        console.log(a + i);
    }

    for (var i = 0; i < 10; i++) {
        bar(i * 2);     // infinite loop!
    }
}

foo();
// The problem would be solved if "i" would be declared as a local variable inside "bar": "var i = 3". Or if a another name would be used: "var j = 3".

// Functions As Scopes
// Hide any variable or function declarations from the outer scope by wrapping a function around it. In this case, "foo":
var a = 2;

function foo() {
    var a = 3;
    console.log(a); // 3
}
foo();
console.log(a);     // 2
// This is not ideal because the extra identifier name, "foo" pollutes the global scope and we need to execute the function. Instead we use a function expression so the name "foo" is found only within the function and it executes automatically:
var a = 2;

(function foo() {
    var a = 3;
    console.log(a); // 3
})();

console.log(a);     // 2

// Anonymous vs. Named
setTimeout( function(){     // Anonymous function expression
    console.log("I waited 1 second!");
}, 1000);

setTimeout(function timeoutHandler(){   // Now the function has a name
    console.log("I waited 1 second!");
}, 1000);

// Invoking Function Expressions Immediately
// IIFE (Immediately Invoked Function Expression)
var a = 2;

(function foo(){
    var a = 3;
    console.log(a); // 3
})();               // function is invoked immediately
console.log(a);     // 2

// An IIFE with arguments
var a = 2;

(function IIFE(global){
    var a = 3;
    console.log(a);         // 3
    console.log(global.a);  // 2
})(window);

console.log(a);     // 2

// A case where the function to be executed is defined after it has been invoked and the parameters passed.
var a = 2;

(function IIFE(def){
    def(window);
})(function def(global){
    var a = 3;
    console.log(a);         // 3
    console.log(global.a);  // 2
});

// Blocks As Scopes
// Simple example of block scope
for (var i = 0; i < 10; i++) {
    console.log(i);
}
// Variable "i" is used soley within the context of the for-loop.
// try/catch
try {
    undefined();    // illegal operation to force an exception!
}
catch (err) {
    console.log(err);   // works
}

console.log(err);   // ReferenceError
// "err" exists only in the "catch" clause

// let
// The "let" keyword attaches the variable declaration to the scope of the block it finds itself in.
var foo = true;

if (foo) {
    {   // Explicit block for "let" to bind to.
        let bar = foo * 2;
        bar = something(bar);
        console.log(bar);
    }
}

console.log(bar);   // ReferenceError

// Garbage Collection
function process(data) {
    // do something
}
var someReallyBigData = { .. };
process(someReallyBigData);
var btn = document.getElementById("my_button");
btn.addEventListener("click", function click(evt){
    console.log("button clicked");
}, /*capturingPhase=;*/false);
// The JS engine runs "process" and keeps the result saved during the entire "click" function.

function process(data) {
    // do something
}

{
    let someReallyBigData = { .. };
    process(someReallyBigData);
}

var btn = document.getElementById("my_button");
btn.addEventListener("click", function click(evt){
    console.log("button clicked");
}, /*capturingPhase=;*/false);
// By creating a block and using the "let" keyword, we are able to dump the entire block of code after it has been used.

// let Loops
for (let i = 0; i < 10; i++) {
    console.log(i);
}

console.log(i);     // ReferenceError
// Variable "i" is only accessible in the for-loop.

{
    let j;
    for (j = 0; j < 10; j++) {
        let i = j;      // re-bound for each iteration
        console.log(i);
    }
}
// The "let" keyword reassigns the value for "i" in each iteration.

// Careful when replacing "var" with "let" during the refactoring of code. "let" binds to single blocks and is not seen in any other scope.
var foo = true, baz = 10;

if (foo) {
    var /*let*/ bar = 3;
    if (baz > bar) {
        console.log(baz);
    }
    // ...
}
// Above code refactored:
var foo = true, baz = 10;

if (foo) {
    var /*let*/ bar = 3;
    // ...
}

if (baz > bar) {
    /*let bar = 3*/     // The declaration has to come with.
    console.log(baz);
}

// const
// const creates a block-scoped varaible but the value is fixed and any attempt to change the value at a later time will throw and error.
var foo = true;
if (foo) {
    var a = 2;
    const b = 3;    // block-scoped to the "if"

    a = 3;
    b = 4;          // error
}
console.log(a);     // 3
console.log(b);     // ReferenceError
