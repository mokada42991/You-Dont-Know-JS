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
// Special numbers
// "NaN" stands for not a number but is more of an invalid number or a failed number.
var a = 2 / "foo"       // NaN
typeof a === "number";  // true
// You can test if a value is an "NaN":
var a = 2 / "foo";
isNaN( a );     // true
// But it has a flaw:
var b = "foo";
isNaN( b );     // true
// As of ES6 a new utility is available:
Number.isNaN( a );  // true
Number.isNaN( b );  // false
// Polyfill for Number.isNaN:
if (!Number.isNaN) {
    Number.isNaN = function(n) {
        return n !== n;     // NaN is the only value in JavaScript that is not equal to itself.
    };
}
// Infinities
// JS has finite numeric representations so any number larger than the MAX_VALUE is expressed as "Infinity".
var a = Number.MAX_VALUE;   // 1.7976931348623157e+308
a + a;                  // Infinity
a + Math.pow(2,970);    // Infinity
a + Math.pow(2,969);    // 1.7976931348623157e+308
// Zeros
// JS has a normal 0 and a negative 0 ( -0 ). It results from certain mathematic operations.
var a = 0 / -3;     // -0
var b = 0 * -3;     // -0
// When converting a negative zero to a string, it returns a normal zero.
a;                  // -0
a.toString();       // "0"
a + "";             // "0"
String(a);          // "0"
JSON.stringify(a);  // "0"
// Comparison operators are configured to lie whether a value is a zero or a negative zero:
var a = 0;
var b = 0 / -3;
a == b;         // true
-0 == 0;        // true
a === b;        // true
-0 === 0;       // true
0 > -0;         // false
a > b;          // false
// Distingushing a negative zero
function isNegZero(n) {
    n = Number(n);
    return (n === 0) && (1 / n === -Infinity);
}
isNegZero(-0);      // true
isNegZero(0 / -3);  // true
isNegZero(0);       // false
// As of ES6 there is a new utility that tests two values for absolute equality, "Object.is()".
var a = 2 / "foo";
var b = -3 * 0;
Object.is(a, NaN);      // true
Object.is(b, -0);       // true
Object.is(b, 0);        // false
// Polyfill
if (!Object.is) {
    Object.is = function(v1, v2) {
        // test for negative zero
        if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2;
        }
        // test for NaN
        if (v1 !== v1) {
            return v2 !== v2;
        }
        // everything else
        return v1 === v2;
    }
}
// Value vs Reference
var a = 2;
var b = a;  // "b" is always a copy of the value in "a"
b++;
a;          // 2
b;          // 3

var c = [1, 2, 3];
var d = c;  // "d" is a reference to the shared value
d.push(4);
c;          // [1, 2, 3, 4]
d;          // [1, 2, 3, 4]
// Simple values (null, undefined, string, number, boolean, symbol) are always assigned by "value-copy".
// Compound values (objects including arrays and functions) always create a copy of the "reference" on assignment.
function foo(x) {
    x.push(4);
    x;  // [1, 2, 3, 4]
    // later
    x = [4, 5, 6];
    x.push(7);
    x;  // [4, 5, 6, 7]
}
var a = [1, 2, 3];
foo( a );
a;      // [1, 2, 3, 4] not [4, 5, 6, 7]

// Chapter 3: Natives
/* There are various built-ins or "natives" in JS:
- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol() */
var s = new String( "Hello World!" );
console.log( s.toString() );    // "Hello World!"
// The result of the constructor form of value creation "new String(...)" is an object wrapper around the primitive string.
var a = new String( "abc" );
typeof a;   // "object"
a instanceof String;    // true
Object.prototype.toString.call(a);  // "[object String]"
console.log(a); // String {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}

// Internal [[Class]]
// Values that are "typeof" "object" are tagged with an internal [[Class]] property. This can be revealed with the following:
Object.prototype.toString.call( [1, 2, 3] );    // "[object Array]"
Object.prototype.toString.call( /regex-literal/i );    // "[object RegExp]"
// Most cases this internal [[Class]] value corresponds to the built-in native constructor but not always (Null, Undefined).

// Boxing Wrappers
// Primitive values do not have properties or methods so JS automatically "boxes" the primitive values with an object wrapper.
var a = "abc";
a.length;   // 3
a.toUpperCase();    // "ABC"
// To "unbox" the object wrapper and get the primitive value out:
var a = new String("abc");
var b = new Number(42);
var c = new Boolean(true);
a.valueOf();    // "abc"
b.valueOf();    // 42
c.valueOf();    // true

// For array, object, function and regular expression values it is universally preferred that you use the literal form for creating values and not with the constructor.
// Empty slot arrays are a no-go, never ever intentionally create one.
// There is also almost no reason to use the constructor form to create an object, function or reg-ex.
var c = new Object();
c.foo = "bar";
c;  // { foo: "bar" }
var d = { foo: "bar" };
d;  // { foo: "bar" }

var e = new Function( "a", "return a * 2" );
var f = function(a) {  return a* 2 };
function g(a) { return a * 2 }

var h = new RegExp( "^a*b+", "g");
var i = /^a*b+/g;

// Date(..) and Error(..)
// To create a date object value, "new Date()" is used. The constructor accepts arguments to specify the date/time used but if omitted, the current date/time is returned. Calling "getTime()" on the object returns the current timestamp value, a signed integer number of millisenconds since Jan 1, 1970. This is done easier with the built-in function, "Date.now()".
if (!Date.now) {
    Date.now = function() {
        return (new Date()).getTime();
    };
}
// The main reason you would want to create an error object is to capture the current execution stack in the object which makes finding the position of the error and debugging it easier.
function foo(x) {
    if (!x) {
        throw new Error( "x wasn't provided" );
    }
    // ..
}

// Native Prototypes
// Each built-in native constructor has its own ".prototype" object with its own default behaviors and methods.
String.prototype.indexOf(..);
String#charAt(..);
String#substr(..); String#substring(..); String#slice(..);
String#toUpperCase(..); String#toLowerCase(..);
String#trim(..);

// Chapter 4: Coercion
// Two types of coercion, "implicit" and "explicit"
var a = 42;
var b = a + "";         // "42" Implicit
var c = String( a );    // "42" Explicit
// For "b" the coercion happens implicitly through the string concatenation which as a side effect, forces 42 to become a string. For "c" it is obvious that the value is being converted to a string with the constructor.

// Abstract Value Operations
// How a value becomes either a string, number or boolean.
// ToString
var a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
a.toString();   // "1.07e21"
var a = [1, 2, 3];
a.toString();   // "1,2,3"
// JSON Stringification
JSON.stringify( 42 );   // "42"
JSON.stringify( "42" );   // ""42""
JSON.stringify( null );   // "null"
// Values that are not JSON-safe will either be omitted or replaced.
JSON.stringify( undefined );   // undefined
JSON.stringify( function(){} );   // undefined
JSON.stringify( [1,undefined,function(){},4] );   // "[1,null,null,4]"
// IF an object has a toJSON() method, this will be called first to get a value for serialization.
var o = { };
var a = {
    b: 42,
    c: o,
    d: function(){}
};
o.e = a;    // Would throw an error when converted to JSON.
a.toJSON = function() { // toJSON() defined
    return { b: this.b };
};
JSON.stringify( a );    // "{"b":42}"

// JSON.stringify(..) has an optional second argument called "replacer". This can either be an array or a function.
var a = {
    b: 42,
    c: "42",
    d: [1,2,3]
};
JSON.stringify( a, ["b", "c"] );    // "{"b":42,"c":"42"}"
JSON.stringify( a, function(k,v) {
    if (k !== "c") return v;
}); // "{"b":42."d":[1,2,3]}"
// If "replacer" is an array, only the property names included in the array will be returned. If "replacer" is a function, it is called first on the object, then on each property in the object.
// JSON.stringify(..) also takes a third argument, "space" which is used as indentation.
var a = {
    b: 42,
    c: "42",
    d: [1,2,3]
};
JSON.stringify( a, null, 3 );
/*
"{
    "b": 42,
    "c": "42",
    "d": [
        1,
        2,
        3
    ]
}"
*/

// ToNumber
// "true" becomes "1", "false" becomes "0", "undefined" becomes "NaN", "null" becomes "0". A string works like the rules for numeric literals. Objects and arrays will be converted to their primitive value equivalent and this value is coerced to a number. The primitive value equivalent can be found either in the valueOf() method or toString() method of the object.
var a = {
    valueOf: function() {
        return "42";
    }
};
var b = {
    toString: function() {
        return "42";
    }
};
var c = [4,2];
c.toString = function() {
    return this.join("");
};
Number( a );        // 42
Number( b );        // 42
Number( c );        // 42
Number( "" );       // 0
Number( [] );       // 0
Number( "abc" );    // NaN

// ToBoolean
// "1" can be coerced to "true", "0" to "false" but the values are not the same.
/* List of "falsy" values that will coerce to "false":
    - undefined
    - null
    - false
    - +0, -0, NaN
    - ""
*/
// Anything not on this list is "truthy" including objects (with a small exception).
var a = "false";
var b = "0";
var c = "''";
var d = Boolean(a && b && c);   // true

var a = [];
var b = {};
var c = function(){};
var d = Boolean(a && b && c);   // true

// Explicit Coercion
// Strings <--> Numbers
var a = 42;
var b = String( a );
var c = "3.14";
var d = Number( c );
b;  // "42"
d;  // 3.14

var a = 42;
var b = a.toString();
var c = "3.14";
var d = +c;     // unary operator
b;  // "42"
d;  // 3.14
