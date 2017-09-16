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
