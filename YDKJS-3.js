/* You Don't Know JS: this & Object Prototypes
A log of the code used during the course of the book in examples and practice problems.
All code is executed in the Chrome console and then copied here.
*/

// Chapter 1: this Or That?
function identify() {
    return this.name.toUpperCase();
}
function speak() {
    var greeting = "Hello, I'm " + identify.call(this);
    console.log(greeting);
}
var me = {
    name: "Kyle"
};
var you = {
    name: "Reader"
};

identify.call(me);      // KYLE
identify.call(you);     // READER
speak.call(me);         // Hello, I'm KYLE
speak.call(you);        // Hello, I'm READER
// "this" is referring to the object being passed as an argument instead of explicitly passing in a context object as follows:
function identify(context) {
    return context.name.toUpperCase();
}
function speak() {
    var greeting = "Hello, I'm " + identify.(context);
    console.log(greeting);
}
identify(you);      // READER
speak(me);          // Hello, I'm KYLE

// Wrong usage of "this"
function foo(num) {
    console.log("foo: " + num);
    this.count++;   // count of how many times "foo" is called
}
foo.count = 0;
var i;
for (i = 0; i < 10; i++) {
    if (i > 5) {
        foo(i);
    }
}
console.log(foo.count);     // 0 instead of 4
// In the above example, "this" is not pointing to the function object "foo". This is because the "foo" function object must be called in a different manner for the "this" keyword to work.
function foo(num) {
    console.log("foo: " + num);
    this.count++;
}
foo.count = 0;
var i;
for (i = 0; i < 10; i++) {
    if (i > 5) {
        foo.call(foo, i);   // By using ".call()" we make sure "this" is pointing at the function object "foo".
    }
}
console.log(foo.count);     // 4, correct
// "this" is a binding that is made when a function is invoked. What it eventually references is determined by the call-site (how the function is called).

// Chapter 2: "this" All Makes Sense Now!
// Demo of call-stack and call-site
function baz() {
    // call-stack is: "baz" so the call-site is in the global scope.
    console.log("baz");
    bar();      // call-site for "bar"
}
function bar() {
    // call-stack is: "baz" -> "bar" so the call-site is in "baz"
    console.log("bar");
    foo();      // call-site for "foo"
}
function foo() {
    // call-stack is: "baz" -> "bar" -> "foo" so the call-site is in "bar"
    console.log("foo");
}
baz();      // call-site for "baz"

// Default binding
function foo() {
    console.log(this.a);
}
var a = 2;
foo();      // 2
// In this example "this" is being pointed to the global scope because "foo" is called with a plain function reference (foo()). The value of the property "a" in the global object is "2".

// Implicit Binding
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo();      // 2
// In this case "this" is referencing "obj", therefore "this.a" is the same as "obj.a".

function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo;      // function reference
var a = "oops, global"; // "a" is a property on the global object
bar();      // "oops, global"
// "bar" references the function "foo" and is then called in plain function reference (bar()). "this" then addresses the property "a" of the global object, (default binding).

function foo() {
    console.log(this.a);
}
function doFoo(fn) {
    fn();
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global";
doFoo(obj.foo);     // "oops, global"
// The "this" is unbound when it is passed as a callback function

// Explicit Binding
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2
};
foo.call(obj);  // 2
// By using call(..) or apply(..) we can force the function's "this" to be the object given as the first parameter. "this" in "foo" is pointing to "obj".

// Hard Binding
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2
};
var bar = function() {
    foo.call(obj);
};
bar();  // 2
setTimeout(bar, 100);   // 2
bar.call(window);   // 2
// Function "bar" calls "foo.call(obj)" which hard binds the "this" in "foo" with "obj". No matter how the function "bar" is invoked it will always invoke the internal "foo" function with "obj".

function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}
var obj = {
    a: 2
};
var bar = function() {
    return foo.apply(obj, arguments);   // Hard binds the "obj" and passes the arguments from"bar()"
};
var b = bar(3);     // 2 3
console.log(b);     // 5

// Function.prototype.bind is a built-in function that is used for hard-binding.
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}
var obj = {
    a: 2
};
var bar = foo.bind(obj);    // "this" in the function "foo" is now hard-bound to "obj"
var b = bar(3);     // 2 3
console.log(b);     // 5

// For many built-in functions there is an optional parameter called "context" which designates the object "this" is bound to.
function foo(el) {
    console.log(el, this.id);
}
var obj = {
    id: "awesome"
};
// forEach(function, context)
[1, 2, 3].forEach(foo, obj);    // 1 awesome 2 awesome 3 awesome

// "new" Binding
function foo(a) {
    this.a = a;
}
var bar = new foo(2);   // a new object "foo" is stored in "bar"
console.log(bar.a);     // 2
// By calling "foo()" with "new" in front of it, a new object is created and it is set as the "this" inside of "foo()".

// Order of Binding
function foo() {
    console.log(this.a);
}
var obj1 = {
    a: 2,
    foo: foo
};
var obj2 = {
    a: 3,
    foo: foo
}
obj1.foo();     // 2
obj2.foo();     // 3
obj1.foo.call(obj2);    // 3
obj2.foo.call(obj1):    // 2
// Explicit binding comes before implicit binding.

function foo(something) {
    this.a = something;
}
var obj1 = {
    foo: foo
}
var obj2 = {};
obj1.foo(2);            // Sets "obj1.a" to "2"
console.log(obj1.a);    // 2

obj1.foo.call(obj2, 3); // Sets "obj2.a" to "3"
console.log(obj2.a);    // 3

var bar = new obj1.foo(4);  // The "new" binding precedes any implicit binding of "obj1" and creates a new object stored in "bar" with property "a" set to "4"
console.log(obj1.a);    // 2
console.log(bar.a);     // 4
// "new" binding comes before implicit binding.

function foo(something) {
    this.a = something;
}
var obj1 = {};

var bar = foo.bind(obj1);   // Hard binding "obj1" to the "foo" function in "bar"
bar(2);     // Set the property "a" of "obj1" to "2"
console.log(obj1.a);    // 2

var baz = new bar(3);   // The "new" binding creates a new object stored in "baz" with a property "a" set to "3". "obj1" is no longer bound to the function "foo", "this" is now pointing to the newly created object "baz".
console.log(obj1.a);    // 2
console.log(baz.a);     // 3
// The "new" binding overrides hard binding.

function foo(p1, p2) {
    this.val = p1 + p2;
}
var bar = foo.bind(null, "p1");
var baz = new bar("p2");
baz.val;    // p1p2
// Another example of "new" binding overriding hard binding.

/* Determining "this"
1. Function is called with "new". "this" points to the newly constructed object. ("new" binding)
    var bar = new foo()
2. Function is called with ".call()" or ".apply()" or ."bind()". "this" points to the specified object. (explicit binding)
    var bar = foo.call(obj1)
    var bar = foo.bind(obj1)
3. Function is called with a context. "this" points to that object. (implicit binding)
    var bar = obj1.foo()
4. Function is called plainly. "this" points to the global object. (default binding)
    var bar = foo()
*/

// Lexical "this"
// Arrow functions
function foo() {
    return (a) => {     // Arrow declaration
        console.log(this.a);
    };
}
var obj1 = {
    a: 2
};
var obj2 = {
    a: 3
};
var bar = foo.call(obj1);
bar.call(obj2);     // 2, not 3
// The "this" in the arrow function inside "foo()" is bound to "obj1" and can not be overridden, even with "new".
