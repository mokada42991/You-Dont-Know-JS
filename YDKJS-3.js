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
}``
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
-+
``    console.log("foo");
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

// Chapter 3: Objects
// Literal syntax for an object:
var myObj = {
    key: value
    // ...
};
// Constructed form:
var myObj = new Object();
myObj.key = value;
// It is a common misconception that "everything in JavaScript is an object". This is clearly not true.

/* There are 9 types of object sub-types also referred to as built-in objects.
- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error */
var strPrimitive = "I am a string";
typeof strPrimitive;                // "string"
strPrimitive instanceof String;     // false

var strObject = new String("I am a string");
typeof strPrimitive;                // "string"
strPrimitive instanceof String;     // true

Object.prototype.toString.call(strObject);  // [object String]

// The primitive value "I am a string" is not an object and to perform operations on it a "String" object is required. Luckily JavaScript coerces a "string" primitive to an object when necessary therefore the use of the literal form for a value is strongly preferred rather than the constructed object form.

var strPrimitive = "I am a string";
console.log(strPrimitive.length);   // 13
console.log(strPrimitive.charAt(3));    // "m"
// The enginve coerces the string primitive automatically into a "String" object so that the property/method access work. By contrast "Date" values can only be created with their constructed object form (using "new").

var myObject = {
    a: 2
}
myObject.a;     // 2 (Property access)
myObject["a"];  // 2 (Key access)

// Property or Key names are always strings. If any other value, including numbers, is used it will be converted to a string

// ES6 allows for computed property names where an expression is specified in the key-name position.
var prefix = "foo";
var myObject = {
    [prefix + "bar"]: "hello",
    [prefix + "baz"]: "world"
};
myObject["foobar"];     // hello
myObject["foobaz"];     // world

// Arrays
var myArray = ["foo", 42, "bar"];
myArray.length;     // 3
myArray[0];         // "foo"
myArray[2];         // "bar"

// Arrays are objects so you can technically also add properties onto an array but it is best to use arrays and objects for their intended use. Arrays store values at numeric indices, objects store key/value pairs.

// Duplicating objects
function anotherFunction() { /* ,,, */ }
var anotherObject = {
    c: true
};
var anotherArray = [];
var myObject = {
    a: 2,
    b: anotherObject,
    c: anotherArray,
    d: anotherFunction
};
anotherArray.push(anotherObject, myObject);
// If "myObject" were to be duplicated, an infinite circular duplication problem would occur because there are references to objects that reference back to "myObject".
// ES6 has a built-in function that creates a "shallow copy" of an object. Object.assign() takes a target object as its first parameter and takes one or more souce objects as subsequent parameters:
var newObj = Object.assign( {}, myObject );
newObj.a;                       // 2
newObj.b === anotherObject;     // true
newObj.c === anotherArray;      // true
newObj.d === anotherFunction;   // true

// Property Descriptors
var myObject = {
    a: 2,
}
Object.getOwnPropertyDescriptor(myObject, "a");
/*  {
        value: 2,
        writable: true,
        enumerable: true,
        configurable: true
    }*/
// The property descriptor of "a" has not only the value of 2 but also 3 other values. By using "Object.defineProperty()", you can add a new property, or modify an existing one with the desired characteristics:
var myObject = {};
Object.defineProperty(myObject, "a", {
    value: 2,
    writable: false,    // not writable
    configurable: true,
    enumerable: true
});
myObject.a = 3;
myObject.a;     // 2
// When "configurable" is changed to "false", the function "Object.defineProperty()" for that specific property will throw an error and that property can not be deleted.
// When "enumerable" is set to "false", that property will not show up in certain object-property enumerations, such as a for-loop.

// Immutability
// There are several ways to make properties or objects that cannot be changed.
// Object Constant:
var myObject = { };
Object.defineProperty(myObject, "FAVORITE_NUMBER", {
    value: 42,
    writable: false,
    configurable: false
});
// The property "FAVORITE_NUMBER" cannot but changed, redefined or deleted.
// Prevent Extensions:
var myObject = {
    a: 2
};
Object.preventExtensions(myObject);
myObject.b = 3;
myObject.b;     // undefined
// Prevents an object from having new properties added to it.
// Seal: "Object.seal()" creates an object in which properties cannot be added and existing properties cannot be reconfigured or deleted. Values can still be modified.
// Freeze: "Object.freeze()" takes an object and calls "Object.seal()" and makes it so that their values cannot be changed.

// [[Get]]
// When accessing a property of an object a [[Get]] operation is performed. The object is inspected for a property and if it exists, returns the value, and if it doesn't exist, returns "undefined" instead of a "ReferenceError".
var myObject = {
    a: undefined    // indistinguishable
};
myObject.a;     // undefined
myObject.b;     // undefined

// [[Put]]
/* When setting a property of an object a [[Put]] operation is performed. It will check first if the property already exists, and if so:
    1. Is the property an accessor descriptor? If so, call the setter, if any.
    2. Is the property a data descriptor with "writable" of "false"? If so, fail.
    3. Set the value to the existing property.
*/

// Getters & Setters
// Getters are properties which call a hidden function to retrieve a value and setters are properties which call a hidden function to set a value.
var myObject = {
    get a() {       // define a getter for "a"
        return 2;
    }
};
Object.defineProperty(
    myObject,       // target
    "b",            // property name
    {               // descriptor
        // define a getter for "b"
        get: function(){ return this.a * 2},
        // make sure "b" shows up as a property
        enumerable: true
    }
);
myObject.a;     // 2
myObject.b;     // 4
// Two properties are created on "myObject" which do not hold a value but instead calls a function that returns a value when the property is accessed. These "getters" are hard coded and cannot be reset.

var myObject = {
    get a() {       // define a getter for "a"
        return this._a_;
    },
    set a(val) {    // define a setter for "a"
        this._a_ = val * 2;
    }
};
myObject.a = 2;
myObject.a;         // 4

// Existence
// Two ways we an check to see if a property exists inside of an object without asking to get the property's value:
var myObject = {
    a: 2
};
("a" in myObject);      // true
("b" in myObject);      // false
myObject.hasOwnProperty("a");   // true
myObject.hasOwnProperty("b");   // false

// Enumeration
var myObject = { };
Object.defineProperty(
    myObject,
    "a",
    { enumerable: true, value: 2}
);
Object.defineProperty(
    myObject,
    "b",
    { enumerable: false, value: 3}
);
myObject.b;         // 3
("b" in myObject);  // true
myObject.hasOwnProperty("b");   // true

for (var k in myObject) {
    console.log(k, myObject[k]);
}   // "a" 2
// When the property descriptor of "enumerable" is set to "false" the property will not appear when we iterate through that object.

// Iteration
// Standard "for" loop:
var myArray = [1, 2, 3];
for (var i = 0; i < myArray.length; i++) {
    console.log(myArray[i]);
}   // 1, 2, 3

// Built-in functions: "forEach()" iterates over all values, "every()" iterates over values until the end or the callback returns a "false", "some()" keeps going until the end or the callback returns a "true".

// A "for .. in" loop iterates over the properties in an object that are enumerable.

// A "for .. of" loop iterates over the actual values and not the object properties.
var myArray = [1, 2, 3];
for (var v of myArray) {
    console.log(v);
}   // 1, 2, 3
// The "for .. of" loop asks for an existing "iterator object" of the thing to be iterated and calls the "next()" method of the "iterator object" for each loop iteration.

// A manual iteration through "myArray".
var myArray = [1, 2, 3];
var it = myArray[Symbol.iterator]();    // creates the "iterator object"
it.next();  // { value: 1, done: false }
it.next();  // { value: 2, done: false }
it.next();  // { value: 3, done: false }
it.next();  // { done: true }

// Regular objects do not have an "iterator object" but we can manually create a "iterator property" for an object.
var myObject = {
    a: 2,
    b: 3
};
Object.defineProperty(myObject, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        var o = this;               // myObject
        var idx = 0;
        var ks = Object.keys( o );  // ["a", "b"]
        return {
            next: function() {      // next()
                return {
                    value: o[ks[idx++]],    // myObject["a"] => 2
                    done: (idx > ks.length) // 0 > 2 => false
                };
            }
        };
    }
});
var it = myObject[Symbol.iterator]();
it.next();      // { value: 2, done: false }
it.next();      // { value: 3, done: false }
it.next();      // { value: undefined, done: true }

// Chapter 4: Mixing (Up) "Class" Objects
// Class -> Inheritance -> Instantiation
// Polymorphism is the idea that a behavior from a parent class is overridden in a child class to give it more specifics.
// JavaScript does not have actual classes. Classes in JavaScript are an optional pattern with syntax that looks like classes.

// A class is a blue-print. To get an actual object we must "instantiate" something from the class. This results in an "instance", an object built in accordance to the class with all of its characteristics.
// Instances of classes are built by a "constructor". This is a method of the class itself, usually with the same name as the class.
class = CoolGuy {
    specialTrick = nothing
    CoolGuy(trick) {        // constructor
        specialTrick = trick
    }
    showOff() {
        output("Here's my trick: ", specialTrick)
    }
}
Joe = new CoolGuy("jumping rope")   // constructor is called to instantiate a new "CoolGuy" instance called Joe with a parameter.
Joe.showOff();  // Here's my trick: jumping rope

// Class Inheritance
// A "child class" is a class which inherits the behaviors of a second class, the "parent class". The "child" contains a copy of the behoviors from the "parent" but can override them or define new ones.
// "Polymorphism" is the idea that any method can reference another method, of the same or different name, at a higher level of the inheritance hierarchy.
class Vehicle {
    engines = 1
    ignition() {
        output("Turning on my engine.")
    }
    drive() {
        ignition()
        output("Steering and moving forward!")
    }
}
class Car inherits Vehicle {
    wheels = 4
    drive() {
        inherited:drive()   // The original version of the method "drive()" from "Vehicle" is called. Polymorphism
        output("Rolling on all ", wheels, " wheels!")
    }
}
class SpeedBoat inherits Vehicle {
    engines = 2
    ignition() {
        output("Turning on my ", engines, " engines.")
    }
    pilot() {
        inherited:drive()   // The original version of "drive()" from "Vehicle" is called. The function "ignition()" which is in turn called by "drive()", is the "ignition()" found inside the class "SpeedBoat".
        output("Speeding through the water with ease!")
    }
}

// Mixins for JavaScript
// A simplified constructor "mixin(..)" which copies the properties from a "parent" object to a "child" object. Remember there are no classes in JavaScript
function mixin( sourceObj, targetObj ) {
    for (var key in sourceObj) {
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key];
        }
    }
    return targetObj;
}
var Vehicle = {
    engines : 1,
    ignition: function() {
        console.log("Turning on my engine.");
    },
    drive: function() {
        this.ignition();
        console.log("Steering and moving forward!");
    }
};
var Car = mixin( Vehicle, {
    wheels: 4,
    drive: function() {
        Vehicle.drive.call(this);
        console.log("Rolling on all " + this.wheels + " wheels!");
    }
});

// Parasitic Inheritance
// JS Class: "Vehicle"
function Vehicle() {
    this.engines = 1;
}
Vehicle.prototype.ignition = function() {
    console.log("Turning on my engine.");
};
Vehicle.prototype.drive = function() {
    this.ignition();
    console.log("Steering and moving forward!");
};
// Parasite Class: "Car"
function Car() {
    // New instance of Vehicle, "car"
    var car = new Vehicle();
    // Add a property
    car.wheels = 4;
    // Reference to Vehicle.drive()
    var vehDrive = car.drive;
    // Override Vehicle.drive()
    car.drive = function() {
        vehDrive.call(this);
        console.log("Rolling on all " + this.wheels + " wheels!");
    };
    return car;
}
var myCar = new Car();
myCar.drive();
// Turning on my engine. Steering and moving forward! Rolling on all 4 wheels!

// Chapter 5: Prototypes
// [[Prototype]] is an internal property of objects which is simply a reference to another object.
var anotherObject= {
    a: 2
};
// an object linked to "anotherObject" is created
var myObject = Object.create(anotherObject);
myObject.a;     // 2
// "myObject" is [[Prototype]] linked to "anotherObject". "myObject.a" doesn't exist but the [[Get]] operation keeps searching up the [[Prototype]] chain until the property is found or the chain ends (undefined).

var anotherObject= {
    a: 2
};
var myObject = Object.create(anotherObject);
for(var k in myObject) {
    console.log("found: " + k);
}   // found: a
("a" in myObject);  // true
// The "for .. in" loop iterates not only over the properties found in "myObject" but any property that can be reached via its [[Prototype]] chain. Same goes for "in" operator.

// Every [[Prototype]] chain ends with the built-in "Object.prototype".

// When setting a property on an object:
myObject.foo = "bar";
/*
    - If the property already exists in "myObject", the value is simply changed.
    - If the property is nowhere to be found in "myObject" or the [[Prototype]] chain, the property is added to "myObject" with the specified value.
*/
/* Scenarios for when the property is not found in "myObject" but is present higher up on the [[Prototype]] chain.
    - If the property found is not marked as "read-only" (writable: false), the new property is added to "myObject". This results in a "shadowed property".
    - If the property found is marked as "read-only" (writable: false), the setting and creating of that property fails.
    - If the property found is a "setter", the "setter" function will be called. No property will be added or redefined.
*/

// Example of implicit shadowing
var anotherObject= {
    a: 2
};
var myObject = Object.create(anotherObject);
anotherObject.a;    // 2
myObject.a;         // 2
anotherObject.hasOwnProperty("a");  // true
myObject.hasOwnProperty("a");       // false
myObject.a++;       // (myObject.a =  myObject.a + 1) which results in "myObject.a" being defined as 3 which creates a shadowed property.
anotherObject.a;    // 2
myObject.a;         // 3
myObject.hasOwnProperty("a");       // true

// "Class"
// JavaScript does not have blueprints called "classes", it only has "objects". Unlike class-oriented languages where "instances" or copies are created according to the "class", JavaScript objects are only able to be [[Prototype]] linked. No form of copying is happening.
// "Inheritance" is a concept only found in copy operations which JS does not have. Instead, an object is able to "delegate" properties/functions to another linked object.

function Foo(name) {    // Foo.prototype object is created
    this.name = name;
}
Foo.prototype.myName = function() {     // funtion "myName" is added to Foo.prototype
    return this.name;
};
var a = new Foo("a");   // object "a" is created with a "name" property set to "a" and a [[Prototype]] link to "Foo".
var b = new Foo("b");   // object "b" is created with a "name" property set to "b" and a [[Prototype]] link to "Foo".
a.myName();     // "a"
b.myName();     // "b"
// "myName" is in not located in either object "a" or "b" but is found further up the prototype chain in the "Foo.prototype" object.

// Prototypal Inheritance
function Foo(name) {
    this.name = name;
}
Foo.prototype.myName = function() {
    return this.name;
}
function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
}
// Creating a new object "Bar.prototype" that is linked to "Foo.protoype" using "Object.create()"
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.myLabel = function() {
    return this.label;
}
var a = new Bar("a", "obj a");
a.myName();     // "a"
a.myLabel();    // "obj a"
// Object "a" has access to "myName()" because it is prototype linked to "Foo.prototype"

// Pre-ES6 which essentially creates a new object and throws away the original "Bar.prototype"
Bar.prototype = Object.create(Foo.prototype);
// ES6+ which modifies the existing "Bar.prototype" and avoids garbage collection
Object.setPrototypeOf(Bar.prototype, Foo.prototype);

// [[Prototype]] Reflection
Foo.prototype.isPrototypeOf(a); // true
// In the entire [[Prototype]] chain of "a", does "Foo.prototype" ever appear?

Object.getPrototypeOf(a);
// Retrieves the [[Prototype]] of an object.

// Object Links
var foo = {
    something: function() {
        console.log("Tell me something good...");
    }
};
var bar = Object.create(foo);   // Object "bar" is created.
bar.something();    // Tell me something good...

// Object.create(object, [propertiesObject])
var anotherObject = {
    a: 2
};
var myObject = Object.create(anotherObject, {
    b: {
        enumerable: false,
        writable: true,
        configurable: false,
        value: 3
    },
    c: {
        enumerable: true,
        writable: false,
        configurable: false,
        value: 4
    }
});
myObject.hasOwnProperty("a");   // false
myObject.hasOwnProperty("b");   // true
myObject.hasOwnProperty("c");   // true
myObject.a;     // 2
myObject.b;     // 3
myObject.c;     // 4

// Chapter 6: Behavior Delegation
// An object is defined that has various methods that child objects can delegate to.
var Task = {
    setID: function(ID) { this.id = ID; },
    outputID: function() { console.log(this.id); }
};
// Another objet is defined that is [[Prototype]] linked to "Task".
var XYZ = Object.create(Task);
XYZ.prepareTask = function(ID, Label) {
    // A method is called which is found in "Task" but "this" binding calls the function in relation to "XYZ".
    this.setID(ID);
    this.label = Label;
};
XYZ.outputTaskDetails = function() {
    this.outputID();
    console.log(this.label);
};

// OO (Object Oriented) vs OLOO (Objects Linked with Other Objects)
// OO Version
function Foo(who) {
    this.me = who;
}
Foo.prototype.identify = function() {
    return "I am " + this.me;
}
function Bar(who) {
    Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function() {
    alert("Hello, " + this.identify() + ".");
};
var b1 = new Bar("b1");
var b2 = new Bar("b2");
b1.speak();
b2.speak();
// Parent class "Foo" is linked to child class "Bar". "b1" and "b2" are instances of "Bar".

// OLOO version
var Foo = {
    init: function(who) {
        this.me = who;
    },
    identify: function() {
        return "I am " + this.me;
    }
};
var Bar = Object.create(Foo);
Bar.speak = function() {
    alert("Hello, " + this.identify() + ".");
};
var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);
b2.init("b2");
b1.speak();
b2.speak();
// This code has the exact same functionality as the OO code, just greaty simplified. Instead of having to deal with constructors and prototypes, the 3 objects are simply linked together.

// Classes vs Objects
// Widget "Classes"
// Parent Class
function Widget(width,height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
}
Widget.prototype.render = function($where) {
    if (this.$elem) {
        this.$elem.css( {
            width: this.width + "px",
            height: this.height + "px"
        }).appendTo($where);
    }
};
// Child Class
function Button(width, height, label) {
    Widget.call(this, width, height);
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
}
// make "Button" inherit from "Widget"
Button.prototype = Object.create(Widget.prototype);
// override base inherited "render(..)"
Button.prototype.render = function($where) {
    Widget.prototype.render.call(this, $where);
    this.$elem.click(this.onClick.bind(this));
};
Button.prototype.onClick = function(evt) {
    console.log("Button '" + this.label + "' clicked!");
};
$(document).ready(function(){
    var $body = $(document.body);
    var btn1 = new Button(125, 30, "Hello");
    var btn2 = new Button(150, 40, "World");
    btn1.render($body);
    btn2.render($body);
});
// Terribly messy and complicated code.
// OLOO version of Widget/Button
var Widget = {
    init: function(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    },
    insert: function($where) {
        if (this.$elem) {
            this.$elem.css( {
                width: this.width + "px",
                height: this.height + "px"
            }).appendTo($where);
        }
    }
};
var Button = Object.create(Widget);
Button.setup = function(width, height, label) {
    this.init(width, height);
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
};
Button.build = function($where) {
    this.insert($where);
    this.$elem.click(this.onClick.bind(this));
};
Button.onClick = function(evt) {
    console.log("Button '" + this.label + "' clicked!");
}
$(document).ready(function() {
    var $body = $(document.body);
    var btn1 = Object.create(Button);
    btn1.setup(125, 30, "Hello");
    var btn2 = Object.create(Button);
    btn2.setup(150, 40, "World");
    btn1.build($body);
    btn2.build($body);
});
// Widget object is linked to the Button object, Button object has access to the Widget objects methods. Delegation pattern allows for simpler calls to methods (this.init(..)) and doesn't have any constructors (.prototype, new).

// Login and Authentication Controllers
var LoginController = {
    errors: [],
    getUser: function() {
        return document.getElementById("login_username").value;
    },
    getPassword: function() {
        document.getElementById("login_password").value;
    },
    validateEntry: function(user, pw) {
        user = user || this.getUser();
        pw = pw || this.getPassword();
        if (!(user && pw)) {
            return this.failure("Please enter a username & password!");
        }
        else if (pw.length < 5){
            return this.failure("Password must be 5+ characters!");
        }
        return true;
    },
    showDialog: function(title, msg) {
        // display success message
    },
    failure: function(err) {
        this.errors.push(err);
        this.showDialog("Error", "Login invalid: " + err);
    }
};
// Link "AuthController" to delegate to "LoginController"
var AuthController = Object.create(LoginController);
AuthController.errors = [];
AuthController.checkAuth = function() {
    var user = this.getUser();
    var pw = this.getPassword();
    if (this.validateEntry(user, pw)) {
        this.server("/check-auth", {
            user: user,
            pw: pw
        })
        .then(this.accepted.bind(this))
        .fail(this.rejected.bind(this));
    }
};
AuthController.server = function(url, data) {
    return $ajax({
        url: url,
        data: data
    });
};
AuthController.accepted = function() {
    this.showDialog("Success", "Authenticated!")
};
AuthController.rejected = function(err) {
    this.failure("Auth failed: " + err);
};
// A much simpler design using just two objects that are linked.
