/* You Don't Know JS: Up & Going
A log of the code used during the course of the book in examples and practice problems.
All code is executed in the Chrome console and then copied here.
*/

// Chapter 1: Into Programming
// Practice Problem
var tax = 0.08;
var phone = 99.99;
var accessory = 9.99;
var threshold = 200;

var bank = 303.91;
var amount = 0;

function calculateTax() {
	return amount * tax;
}

function formatAmount() {
	return "$" + amount.toFixed(2);
}

while (amount < bank) {
	amount = amount + phone;

	if (amount < threshold) {
		amount = amount + accessory;
	}
}

amount = amount + calculateTax(amount);

console.log("Your purchase: " + formatAmount(amount));

// Chapter 2: Into JavaScript
// Variables
// Function Scopes
var a = 2;

foo();

function foo() {
	a = 3;
	console.log(a);		// 3
	var a;
}

console.log(a);		// 2

// Nested Scopes
function foo() {
	var a = 1;

	function bar() {
		var b = 2;

		function baz() {
			var c = 3;
			console.log(a, b, c);	// 1, 2, 3
		}

		baz();
		console.log(a, b);		// 1, 2
	}

	bar();
	console.log(a);		// 1
}

foo();

// Functions As Values
// Immediately Invoked Function Expressions (IIFE)
var a = 42;

(function IIFE(){
	var a = 10;
	console.log(a);		// 10
})();

console.log(a);			// 42

// Closure
function makeAdder(x) {
	function add(y) {
		return y + x;
	}
	return add;
}

var plusOne = makeAdder(1);
var plusTen = makeAdder(10);

plusOne(3);		// 4	makeAdder(1)(3);
plusOne(41);	// 42	makeAdder(1)(41);
pluseTen(13);	// 23	makeAdder(10)(13);

// Modules
function User(){
	var username, password;
	function doLogin(user,pw) {
		username = user;
		password = pw;
		// login function follows
	}
	var publicAPI = {
		login: doLogin
	};
	return publicAPI;
}

var fred = User();	// User module instance
fred.login("fred", "12Battery34!");

// "this" Identifier
function foo() {
	console.log(this.bar);
}

var bar = "global";
var obj1 = {
	bar: "obj1",
	foo: foo
};
var obj2 = {
	bar: "obj2"
};

foo();				// "global"
obj1.foo();			// "obj1"
foo.call(obj2);		// "obj2"
new foo();			// undefined

// Prototypes
var foo = {
	a: 42
};
// bar object is created and linked to 'foo'
var bar = Object.create(foo);

bar.b = "hello world";

bar.b;		// "hello world"
bar.a;		// 42
