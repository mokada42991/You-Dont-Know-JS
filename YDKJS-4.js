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

// If "DEBUG" does not exist, this would throw a ReferenceError.
if (DEBUG) {
    console.log("Debugging is starting");
}
// A safer existence check.
if (typeof DEBUG !== "undefined") {
    console.log("Debugging is starting");
}

// A utility function meant to be copied and pasted into other programs in which you want to check if a certain variable has already been used.
function doSomethingCool() {
    var helper = (typeof FeatureXYZ !== "undefined") ? FeatureXYZ : function() { /* ... */ };
    var val = helper();
    // ...
}

// Chapter 2: Values
// Arrays
var a = [1, "2". [3]];
a.length;       // 3
a[0] === 1;     // true
a[2][0] === 3;  // true

var a = [ ];
a[0] = 1;
// no a[1] set
a[2] = [3];
a[1];       // undefined
a.length;   // 3
// Arrays are also objects that can have "string" key/properties added to them but do not count to the length of the array.
var a = [ ];
a[0] = 1;
a["foobar"] = 2;
a.length;       // 1
a["foobar"];    // 2
a.foobar;       // 2
// If a string key value can be coerced to a number, it is assumed that it is a number index of the array and not a key.
var a = [ ];
a["13"];        // a[13]
a.length;       // 13
// Converting an array-like value into a true array so that we can call array utilities on them.
function foo() {
    var arr = Array.prototype.slice.call(arguments);
    arr.push("bam");
    console.log(arr);
}
foo("bar", "baz");  // ["bar", "baz", "bam"]

// Strings
var a = "foo";
var b = ["f", "o", "o"];
// Similarities to arrays
a.length;           // 3
b.length;           // 3
a.indexOf("o");     // 1
b.indexOf("o");     // 1
var c = a.concat("bar");    // "foobar"
var d = b.concat(["b", "a", "r"]);    // ["f", "o", "o", "b", "a", "r"];
a === c;            // false
b === d;            // false
a;                  // "foo"
b;                  // ["f", "o", "o"]
// Differences
a[1] = "O";
b[1] = "O";
a;              // "foo"
b;              // ["f", "O", "o"]
// Strings are immutable, arrays are mutable. String methods must alter the contents and create and return a new string, whereas array methods modifies content in place.
c = a.toUpperCase();
a === c;    // false
a;          // "foo"
c;          // "FOO"
b.push("!");
b;          // ["f", "O", "o", "!"]
// Non-mutation array methods can be borrowed and used on strings.
a;          // "foo"
a.join;     // undefined
a.map;      // undefined
var c = Array.prototype.join.call(a, "-");
var d = Array.prototype.map.call(a, function(v) {
    return v.toUpperCase() + ".";
}).join("");
c;      // "f-o-o"
d;      //"F.O.O."
// Example of a method that mutates an array that does not work on strings because they are immutable.
a.reverse;      // undefined
Array.prototype.reverse.call(a);    // undefined
b.reverse();    // ["!", "o", "O", "f"]
// Reversing a string
var a = "foo";
c = a.split("").reverse().join("");
c;      // "oof"

// Numbers
// JavaScript has just one numeric type: "number". This type includes both integer values and fractional decimal numbers.
// Very large or very small numbers will by default be outputted in exponent form.
var a = 5E10;
a;      // 50000000000
a.toExponential();  // "5e+10"
var b = a * a;
b;      // 2.5e+21
var c = 1 / a;
c;      // 2e-11
// Number values are boxed with the "number" object wrapper and have access to buit in methods.
var a = 42.59;
a.toFixed( 0 );     // "43"
a.toFixed( 1 );     // "42.6"
a.toFixed( 2 );     // "42.59"
a.toFixed( 3 );     // "42.590"
a.toPrecision( 1 ); // "4e+1"
a.toPrecision( 2 ); // "43"
a.toPrecision( 3 ); // "42.6"
a.toPrecision( 4 ); // "42.59"
a.toPrecision( 5 ); // "42.590"

// An infamous side effect of using binary floating-point numbers is:
0.1 + 0.2 === 0.3;  // false
// 0.1 + 0.2 actually yields 0.30000000000000004 which is not equal to 0.3. It is common practice to use a tiny "rounding error" value as the tolerance for comparison, in JS's case, "Number.EPSILON", a predifined value.
function numbersCloseEnoughToEqual(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON;
}
var a = 0.1 + 0.2;
var b = 0.3;
numbersCloseEnoughToEqual(a, b);    // true
numbersCloseEnoughToEqual(0.0000001, 0.0000002);    // false
// Integers in JavaScript have a max and min value. You can test for integers with the following:
Number.isInteger( 42 );     // true
Number.isInteger( 42.3 );   // false

// Special Values
/* For the "undefined" type, there is one and only one value: "undefined". Same goes for "null".
- "null" is an empty value
- "undefined" is a missing value */
// The "void __ " expression sets the result of the expression to "undefined".
function doSomething() {
    if (!APP.ready) {
        return void setTimeout( doSomething, 100 );
    }
    var result;
    // do some other stuff
    return result;
}
