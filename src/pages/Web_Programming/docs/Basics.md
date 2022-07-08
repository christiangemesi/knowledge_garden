## General

Important: JS has no compiler!

## Constructor of object:different defining ways

- arrays with `[]`
- objects with `{}`
- numbers with a digit (`0`) or `Number()`
- literal for functions with curried style `var => /* do sth */`

## Variable

**Scope**: Visibility area of initialized variables

- global: window or Browser (everywhere) from initialization on
- hoisted: Initialized at beginning of {...} even if variable called before
- locale: in {...} from the point the variable is initialized (function wide)

```javascript
x = 5; // global, mutable => not recommended
var x = 5; // hoisted, mutable => not recommended
let x = 5; // locale, mutable
const x = 5; // locale, immutable
```

## Functions

**Function**: Function is only a reference not an actual function and does not know the amount of wanted parameters\
\
**Parameter**: Variables in the definition of a function

```javascript
function foo(parameter1, parameter2) {
    /* code */
}
```

**Argument**: Variables inserted in a function when using it

```javascript
foo(argument1, argument2);
```

\
**Function calls**: Functions can be called with every amount of parameters. If there are too many arguments passed the
first few are use if necessary. If there are less arguments passed the last few parameters with no value are undefined.

```javascript
function foo(param) {
    /* code */
}

foo(); // param is undefined
foo(arg); // param is arg
foo(arg1, arg2); // param is arg1 and arg2 is ignored
```

**Function return**: Functions need a return statement otherwise the return value is undefined

```javascript
function foo() {
    /* code without return value */
}

let var1 = foo(); // var1 is undefined

function foo() {
    /* code */
    return value;
}

let var2 = foo(); // var2 has a value
```

\
**Function as constant**: Function can be saved in variables as a definition or used function

```javascript
// definition new function
let func = function (param1, param2) {
    /* code */
};

// definition used function
let func2 = foo(arg1, arg2);

// usage of new function
func(arg1, arg2);

// usage of used function
func2;
```

**Override**: Same named functions/variables override each other even if the parameters are different. Naming can only
reference one thing.

```javascript
// here is no foo defined
function foo() {
    /* code */
}

foo(); // here foo no parameter is called

function foo(param) {
    /* code */
}

foo(); // here foo one parameter is called

let foo = value;
foo(); // here foo as a constant is called with error is not a function
```

\
**Fat arrow style**: Alternative notation of a function, like java lambdas

```javascript
// definition
let foo = (param1, param2) => expression;
let foo2 = (param) => {
    /* code block */
};
```

**Curried style**: functions pass variables to other functions and one function can only have one parameter/ argument

```javascript
// definition
const foo = (parameter1) => (parameter2) => expression;

// usage
foo(argument1)(argument2);
```

**IIFE**: Immediately invoked function expression. Functions in definition direct called

```javascript
// split function definition and call
function foo() {...
};
foo();

// named function definition with direct call
(function foo() {...
})();

// unnamed function definition with direct call
(function () {...
})();

// lambda definition with direct call
(() => {...
})();
```

## Arrays

**Array**: `array.__(value)`

- unshift: Add element on start of array (index 0)
- shift: Remove element on start of array (index 0)
- push: Add element on end of array (biggest index)
- pop: Remove element on end of array (biggest index)

### Tips and Tricks spread operator

**Spread array**: unbox array elements, just take the values without brackets with operator `...arrayName`

```javascript
let x = [1, 2, 3];
// array x is boxed [[1, 2, 3], 4, 5, 6]
let y = [x, 4, 5, 6];
// array x is unboxed or spread [1, 2, 3, 4, 5, 6]
let z = [...x, 4, 5, 6];
// copy all values in new array [1, 2, 3]
let copyX = [...x];
// use with var-arg functions "1 – 2 – 3"
console.log(...x);
```
