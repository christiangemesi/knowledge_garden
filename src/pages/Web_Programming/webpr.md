### Higher-order functions

**Map**: execute a function or do a unary operation on each value, partial application

- outer type stays same (array, object, function,...)
- inner type can change (string -> number,...)
- number elements stay same

```javascript
const times = (a) => (b) => a * b;
const twoTimes = times(2);

listVar.map((x) => times(2)(x));
// eta reduction
listVar.map(times(2));
// alpha transition
listVar.map(twoTimes);
```

**Filter**: remove elements not fitting to a condition, partial application

- outer type stays same (array, object, function,...)
- inner type stays same
- number elements can change

```javascript
const odd = (x) => x % 2 === 1;

listVar.filter((x) => x % 2 === 1);
// alpha transition
listVar.filter((x) => odd(x));
// eta reduction
listVar.filter(odd);
```

**Reduce**: do a binary operation on all values, un-partial application

- outer type can disappear
- inner type can change (strings -> number,...)
- number elements can change

```javascript
const plus = (acc, cur) => acc + cur;

listVar.reduce((acc, cur) => acc + cur);
// alpha transition
listVar.reduce(plus);

// with initial value 0
listVar.reduce(plus, 0);
```

**Initial value**: avoids error for empty lists, normally the neutral element of type operation

### Function types

**Literal scope (IIFE)**: (unnamed) function

```javascript
// definition
var varName = function optionalName() {
    // do sth
};

// usage
varName();
// use as callback
callbackFunction(varName);
```

**Capturing scope (closure)**: private variables for functions, boxed functions

```javascript
// definition
const func = (function (paramsOuter) {
    let localVar = value;
    return function (paramsInner) {
        // do sth
    };
})(argsOuter);

// usage
func(argsInner);
```

**Higher-order functions**: takes other function as arguments or returns function

```javascript
// definition
function callbackFunction(callbackFunc) {
    // do sth
}

// or
function callbackFunction2() {
    // do sth
    return func;
}

// usage
callbackFunction(funcName);
// or
callbackFunction2()(argsForFunc);
```

**Constructors (returning functions)**: creates a self defined object, uses keyword `new` in call

```javascript
// definition
function Object() {
    this.attribute = value;
}

// usage
const obj = new Object();
```

## Week 5 - Lesson

### Tips and Tricks semicolon

**New line on browser console**: Shift + Enter
**Auto semicolon insert**: not possible if situation not clear

```javascript
console
    .log() // no ;
    [(1, 2, 3)].map((x) => console.log(x));
// outputs error undefined not an object
```

Reason: console.log returns nothing (undefined) and without semicolon line are sicked together as one and ants to call 3
index of undefined\

### Tips and Tricks strings and escaping

**Strings**: can be written in `'` or `"`

```javascript
let a = 5;
// string with ` for variable injection
`Value of a = ${a}`;
```

**String escaping**: special characters need to be escaped because they hab a meaning

```javascript
// string with '
"it's here";
// escape general with \
"new line \n or word bound \b";
// escape \ with \
"backslash \\";
```

**Regular expression**: define how a string has to look

```javascript
// as a string with escaping
'\\bsome expression\\s \\\\'
// as a regex
/\bsome
expression\s \\/
```

**String constructor**: creates a string from given parameter and escapes if necessary

```javascript
String(/\bsome expression\s \\/);
// returns '\\bsome expression\\s \\\\'
```

**Literal**: direct use of something => [], {}, 0\
**Functional**: use of something in a constructor => Array(), Object(), Number()

### Scripting

**Scripting**: evaluating text from file, url, database or user input\
**Script execution**: in the browser can be modified and harm the system\
**Characteristics**: interpreted without compiler with best effort approach\
**Dynamic file addition**: add scripts by writing strings to body tag with another script

```javascript
// important spit </script> with string concat to not close current script tag
["function"].forEach((name) => {
    document.writeln(`<script src="${name}.js"><` + `/script>"`);
    document.writeln(`<script src="${name}Test.js"><` + `/script>"`);
});
```

**Code evaluation**: execute code as written in the function at current position

```javascript
// functionVar contains string of executable function
eval(functionVar);
```

**Functions**: literal `parameters => codeBlock`, functional `Function(parameters, codeBlock)`\
**Side effects**: Function() change values of (global) variables, visible that Function() was called => should not
happen\
**Sandbox**: secure evaluating scripts only in browsers given\

**Usage**:

- Automation
- Business rules
- Code distribution
- Text evaluation

## Week 5 - Video

### this decisions

- functions with 'new'
    - yes -> this is new empty object
    - no -> function with dot (object.func()) called
        - yes -> this is object before dot
        - no -> this is global object window

### this in JS

- Object methods use object attributes: function do() { this.attribute }
    - functions cannot access attribute without this. prefix
    - this refers to object name when calling objectName.attribute
- Problem when using these functions as callback
    - 'this' information gets lost
- Solve callback issue with binding this
    - old style: this.func.bind(this); or save this in var and callback in anonymous function
    - other style: func.call(obj) / func.apply(obj) to pass object for non dot functions
    - new style: () => this.func; (fat arrow function automatic bind)

## Week 6 - Lesson

### Tips and Tricks Array.from() and optional args

**Array.from()**: method to create an array out of the given parameter as return value\

- string as parameter: string gets split in characters as elements
- object with length as parameter: fill array with length undefined elements
    - map result with function: to fill elements with values
    - callback function as second parameter: to fill elements with values easier, callback is optional

### Objects

**Object**: data structures with attributes and methods to access / manage the data

- Open dynamic object: not safe because not obvious structure (this not clear)

```javascript
const obj
{
    attribute1: value1,
        attribute2
:
    value2,
        getName
:

    function () {
        return this.attribute1 + " " + this.attribute2;
    }
}
```

- Closed explicit object: safe with no unclear this -> not a class

```javascript
function Class(param1, param2) {
    let attribute1 = param1;
    let attribute2 = param2;
    return {
        getName: function () {
            return attribute1 + " " + attribute2;
        },
    };
}

// usage: Class(value1, value2)
```

- Mixed classified object: IIFE requires new for this usage, has a constructor -> is a prototype (class)

```javascript
const Class = (() => {
    function Class(param1, param2) {
        this.attribute1 = param1;
        this.attribute2 = param2;
    }

    Class.prototype.getName = function () {
        return this.attribute1 + " " + this.attribute2;
    };
    return Class;
})();
// usage: new Class(value1, value2)
// obj instanceof Class possible
```

**Object dereference operator**: . between object and called attribute/ method\
**Prototype**: type classification for object to manage shared properties\
**new keyword**: creates runtime scope by calling the constructor function (no lambda), sets prototype

## Week 7 - Lesson

### Tips and Tricks shortcuts

**Objects and properties**: if variable name is same as property name, property name can be left away

```javascript
let x = 1;

// long version
const o = {x: x};

// short
const obj = {x};

// usage
obj.x;
```

**Objects and functions**: if function name (as a property) is same as property name, property name and function keyword
can be left away

```javascript
// long version
const o = {
    foo: function foo() {
        return 1;
    },
};

// short
const obj = {
    foo() {
        return 1;
    },
};

// call/ usage
obj.foo();
```

### Classes

**class keyword**: syntactic sugar for mixed classified objects

- constructor: to set the properties of an object directly

```javascript
class ClassName {
    constructor(parameter) {
        this.property = parameter;
    }

    functionName(parameters) {
        // do sth
    }
}

// usage
const p = new ClassName(value);
// p instance of ClassName
```

**extends keyword**: syntactic sugar for creating a prototype chain

- chain: shows inheritance of prototypes (in some kind)
- super: to set the properties of the inherited class

```javascript
class SubClass extends ClassName {
    constructor(parameter, parameter2) {
        super(parameter);
        this.subProperty = parameter2;
    }

    subFunctionName(parameters) {
        // do things
    }
}

// usage
const s = new SubClass(value, value2);
// s instance of SubClass instance of ClassName
```

Rule: every object extends prototype Object\
**Functions**:

- are objects
- has a name
- is prototype
- has prototype property
- has constructor

Rule: Objects ar not functions in JS but in computer science\
**Prototypes**: modifiable and extendable objects. It can be changed at runtime\
\
**Dispatch**: properties first searched in the object and than in their prototypes

- Static: based on the static type
- Dynamic: based on the runtime type
- Dynamic by name: chain of responsibility

## Week 7 - Composing Software Article

1. split complex problems into small problems
2. solve small problems with easy solutions
3. combine easy solutions for the complex problem

**Composing Functions**: function using the output of an other function as argument -> (f°g)(x) = f(g(x))

```javascript
const f = x => /* do sth */;
const g = x => /* do sth */;

const composition = x => {
    return f(g(x));
};
composition(arg);
// or with a promise
Promise.resolve(arg)
    .then(f)
    .then(g)
    .then(val => /* val contains result */);
```

Rule: chaining is composing\
\
**Pipeline**: execute functions after each other and use output as next argument. Syntax without function keyword and
arrow (=>)

```javascript
import pipe from "lodash/fp/flow";

const compose = pipe(g, f);
compose(arg);
```

\
Rules:

- pregnant code expressions = more comprehension
- less code = less bugs
- composition before class inheritance
- inheritance/ classes is a composed object

**Composite datatype**: objects, arrays, sets, maps, not primitive types

```javascript
const fullName = {
    firstName,
    lastName,
};
```

**Compositional relationships**: delegation (state, strategy, and visitor patterns), acquaintance (referenced objects),
aggregation (DOM children)

## Week 8 - Lesson

### Tips and Tricks logging objects

**Logging with property names**: give an object to the log function instead of values

```javascript
let x = 1;
let y = 2;

console.log({x, y});
// output { x: 1, y: 2 }
```

**Destructor**: get all properties from object without using object dot notation\
**Logging parameter properties**: give a destructed object as parameter to the function

```javascript
// param version
let foo = (param) => console.log(param.x, param.y);

// destructor version
let foo = ({x, y}) => console.log(x, y);
```

### Moves

- Have to be learnt
- Adapt move combinations for situations
- Program collaborative

**Tasks**:

1. Improve tests: structure, explained reports for failed tests
2. Todo list: expected results, simplest way to solution

**Steps**: 0. Explorer: feasibility, edge cases, time-boxed

1. Start at the end: start static with all in one html file, add dynamic sketch when static sketch works

- dynamic sketches: JS, CSS

2. Extract: change static values to variables and repetitions to mappings or loops
3. Abstract: give names to extracted concepts or revert changes, concepts work themselves and in combinations
4. Reorganize: organize and refactor for future, prepare for release
5. Release: on its own standing solution with test, documentation and examples
6. Retrospective: look for good and bad habits/ goings

## Week 9 - Lesson

### Tips and tricks JS doc

**Parameter types**: default type is any. The definition of the specific type can be added in the JS doc, so that other
arguments are not allowed any more.

```javascript
/**
 * log to the console
 * @function
 * @param {!string} message mandatory text to printing to console
 * @return void
 * @example
 *        log("foo");
 **/
const log = (message) => console.log(message);
```

Description:

- `@function`: defines that the following code is a function
- `@param`: defines the parameter and with `{type}` the allowed type(s) of the arguments
    - `{!type}`: the parameter is mandatory of this type
    - `{type | type2}`: the parameter has to fullfil one type of the listed
    - `{'value' | 'value2'}`: the parameter can only be one of the values
    - `{...type}`: varargs type to give multiple arguments to the function, which can be accessed by the 'arguments'
      array
- `@return`: defines the value calculated with a type (without {})
- `@example`: show how the usage of the code
- `@template`: is used if the type T of parameter/return should be generic
- `@throws`: defines the exception if the function end with an exception
- more: <https://jsdoc.app>

### MVC - Patterns

Pattern - **High order function**: do prework -> do callback -> do postwork. Uses execute around method to do work\
**Resource Handling**: define handling one and use it with a callback to not forget a step

- Resources: files, databases, transactions, url loading, rest service call, error containment, cpu time, threads

```javascript
// example file
const fileHandle = (name, callback) => {
    // open file
    try {
        callback(file); // read or write file
    } catch (e) {
        // handle exception
    }
    // close file
};

// example database
const databaseHandle = (name, callback) => {
    // open database connection
    try {
        callback(database); // execute query statement
    } catch (e) {
        // handle exception
    }
    // close database connection
};
```

**UI framework**: knowing what it does & how it does it & why this way before using it\
**Milestones**: 0. running program with reasonable test amount which all run ok

1. reorganize, separate unessential and improve clarity (responsibilities, dependencies, sequence) with abstraction
2. separate todo operations from todo display -> improve clarity of one single todo change / many (list of) todo change
   with observable list usage
3. model-view-control separated
4. all views separated

**Observable**: used to observe values by listening to changes and notify all listeners. Collection examples are array,
list and set.

```javascript
const Observable = (value) => {
    const listeners = [];
    return {
        onChange: (callback) => listeners.push(callback),
        getValue: () => value,
        setValue: (val) => {
            if (value === val) return;
            value = val;
            listeners.forEach((notify) => notify(val));
        },
    };
};
```

**Parsing to numbers**: different ways, but many are problematic. Use `Number()` constructor!\
**MVC**: Model (what to show), View (how to show), Controller (manages view and data)

## Week 10 - Lesson

### Tips and tricks arrays

**Slice**: create a sub array form start to end index

```javascript
// copy whole array
array.slice();
[1, 2, 3, 4].slice(); // result [1, 2, 3, 4]

// sub array from the start index until the end of the array
array.slice(startIndex);
[1, 2, 3, 4].slice(1); // result [2, 3, 4]

// sub array from the start index until the end index excluding the end index
array.slice(startIndex, endIndex);
[1, 2, 3, 4].slice(1, 3); // result [2, 3]
```

**Splice**: change the current array by modifying elements in the array by adding/ removing/ updating

```javascript
// adding elements to the array before the start index and remove 0 elements (move the original elements towards the end)
array.splice(startIndex, 0, ...elements);
[1, 2, 3, 4].slice(1, 0, "a", "b"); // array [1, 'a', 'b', 2, 3, 4] and return []

// removing elements from the array starting at the start position for number elements
array.splice(startIndex, numberElements);
[1, 2, 3, 4].slice(1, 2); // array [1, 4] and return [2, 3]

// updating elements of the array starting form the start index for number elements (if number elements is same es followed amount of elements else also removing or adding)
array.splice(startIndex, numberElements, ...elements);
[1, 2, 3, 4].slice(1, 2, "a", "b"); // array [1, 'a', 'b', 4] and return [2, 3]
```

### Async

**Callback**: predefine an event handler for a later use. The function will passed values to another function when the
event is triggered to execute the code.

```javascript
setInterval(() => {
    // doSomething();
}, 1000 / 5);
```

Events: use callbacks to execute code when an event is triggered. Possible events: keyboard/ mouse input

```javascript
window.onkeydown = (event) => {
    // doSomething();
};
```

**Promise** (Thenable): define that code will come to a result at some time. It has different state starting with
pending. A Promise callback always returns a further promise.

```javascript
fetch(/* async task */)
    .then((response) => /* code executed successfully */)
    .catch((err) => /* code threw error */);

// other notation
const processEven = i => new Promise(
    (resolve, reject) => {
        if (i % 2 === 0) {
            resolve(i);
        } else {
            reject(i);
        }
    }
);
```

Auto promotion: non promise return values are automatically saved in the parameter variable, and gets wrapped in a new
promise.

**Synchronous**: all tasks are executed in the code order after each other.

**Asynchronous**: tasks can execute parallel and the resulting order is not given.

**async/await**:

- async defines that the code in this function contains a await with asynchronous execution.
- await defines that the called function will wait until the promise is resolved or rejected.

```javascript
const foo = async (i) => {
    const x = await processEven(i).catch((err) => err);
    console.log("foo: " + x);
};
```

## Week 11 - Lesson

### Tips and tricks navigator media devices

```javascript
// audio and video devs
// long version window = this
windows.navigator.mediaDevices().then(console.log);

// short version
navigator.mediaDevices().then(console.log);
```

```javascript
windows.Geolocation().then(console.log);

window.deviceOrientation().then(console.log);
```

### DataFlow

**Async coordination**:

1. No coordination - all actions independent => nothing to do
2. Sequence (side effects) - next action only starts when previous is finished => delegate coordination with scheduler
3. Dependency on former results - two actions depend on the same action which only should be executed once => implicit
   coordination with data flow variable

**Scheduler**: Queue of functions which are locked until the callbacks unlock them\
**Data flow variables**: Set the variable value if not already set. Lazy mode by not setting the value but returning it
in a function.

## Week 12 - Lesson

### Tips and tricks array functions

**Array functions with index**:

```javascript
[1, 2, 3, 4].map((it, inx) => it + ": " + inx);

[1, 2, 3, 4].filter((it, inx) => inx % 2 !== 0);
```

Reduce trick with filter: sum of all odd numbers is a square number.

```javascript
[1, 2, 3, 4].reduce((acc, cur) => acc + cur, 0);

// square numbers
[1, 2, 3, 4]
    .filter((it, inx) => inx % 2 !== 0)
    .reduce((acc, cur) => acc + cur, 0);
```

**Array check functions**: check the content of an array.

```javascript
// true when are all fitting
[1, 2, 3, 4].every((it, inx) => condition);

// true when at least one is fitting
[1, 2, 3, 4].some((it, inx) => condition);
```

### Modules

**Modules**: to organize code, clear dependencies

- Avoiding errors: globals, scoping, namespace
- Distinction: packet manager, build tool
    - Legacy: Module systems, module loader/ bundler
- Properties: use of `import` or `export`
- Include: async, transitive, with URI format recommended

```html
<!-- defer by default due to type module -->
<script src="relativePath/file.js" type="module"></script>
<!-- or -->
<script>
    // promise value
    import("relativePath/file.js").then(mod =>
    ... )
    ;
</script>
```

**Imports variants**:

```javascript
import "module-name";
import defaultExport from "module-name";
import * as name from "module-name";
import {export} from "module-name";
import {export as alias} from "module-name";
import {export1, export2} from "module-name";

var promise = import("module-name");
```

**Export variants**: all read-only and singletons

```javascript
export {name1, name2,
...,
nameN
}
;

export function FunctionName() {...
}

export const name1, name2, ..., nameN;
export default expression;
export {name1 as default,
...
}
;
export * from
...
;
export {name1, name2,
...,
nameN
}
from
...
;
```

**Implicit `use strict`**: exports are read-only, no global objects/this/ hoisting\
**Implicit `defer`**: `document.writeln()` no more useful\
**SOP**: Same origin policy, file system as a `null` origin, all js files should come from the same project directory
path.

- Possible ways to avoid: browsers dev mode, local webserver, bundler to execute sync, browser in debug mode

## Week 13 - Lesson

### Tips & tricks iterators

**Iterator**: is a function. Deconstructable like an array.

```javascript
const nodeList = document.querySelectorAll(selector);
const [elem1, e2, e3, e4] = nodeList;
[...nodeList] // node list elements as an array
for (const e of nodeList) {
    // code to handle the elems of nodeList
}
for (const e in nodeList) {
    // code to handle the properties of nodeList
}
```

**Function arguments**: only possible for functions with function keyword. Lists all the params as an iterator.

```javascript
function foo() {
    return arguments;
}
```

## Extras

### Modules of Toolkit

- snake
- hacking
