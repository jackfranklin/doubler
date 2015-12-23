# Doubler

Simple test doubles and stubs for NodeJS testing purposes, designed for usage when tools like Sinon offer more power than your project needs.

```sh
npm install --save-dev doubler
```

## Documentation

Until I am able to write up proper docs, the best place to look is the [test file](https://github.com/jackfranklin/doubler/blob/master/test/doubles.js), which shows the API nicely.

## Doubles

### Creating an object with methods on it

Useful when you need to pass an object in that contains multiple methods:

```js
var Double = require('doubler').Double;
var double = new Double({
  // either give it a function to call
  foo: function() { return 2 },
  // or just a single value
  bar: 3
});
double.foo(); //=> 2
double.bar(); //=> 3
double.foo.called; //=> true
double.foo.callCount; //=> 1
double.foo('bar');
double.foo.args; //=> [[], ['bar']]

// reset the double, as if it had never been called
double.foo.reset(); //=> resets double back to new state
double.foo.called; //=> false
```

### Single function double

Often you don't want to create an object with doubles on it but generate just a function:

```js
var doubleFn = Double.function(2);
doubleFn(); //=> 2
doubleFn.called; //=> true
doubleFn.callCount; //=> 1
doubleFn.args; //=> [[]]
```

You can also give a custom function to call rather than a single return:

```js
var doubleFn = Double.function(function() {
  return 3;
});
doubleFn(); //=> 3
doubleFn.called; //=> true
doubleFn.callCount; //=> 1
doubleFn.args; //=> [[]]
```

## Stubs

```js
var Stub = require('doubler').Stub;

// some object with a method we'd like to stub:
var Foo = {
  get: function() { return 2; }
}

new Stub(Foo, 'get').returnValue(4);
Foo.get(); //=> 4
Foo.get(); //=> 2 (Spies only last for one invocation by default)

new Stub(Foo, 'get').callFunction(function() {
  return 5;
});
Foo.get(); //=> 5

// call persist() to make a stub last forever
var stub = new Stub(Foo, 'get').persist().returnValue(4);
Foo.get(); //=> 4
Foo.get(); //=> 4
Foo.get(); //=> 4 and so on

// entirely remove the stub
stub.destroy();
Foo.get(); //=> 2
```

Under the hoods stubs actually use doubles, so all the properties on a double that you can use to check invocations are also available on stubs:

```js
var Stub = require('doubler').Stub;

// some object with a method we'd like to stub:
var Foo = {
  get: function() { return 2; }
}

new Stub(Foo, 'get').returnValue(4);
Foo.get(); //=> 4
Foo.get.called; //=> true
Foo.get.callCount; //=> 1
Foo.get.args; //=> [[]]
```


## Changelog

#### V0.6.0
- provide `Double.function` for creating standalone function doubles

#### V0.5.0
- Proxy properties from a Stub's underlying double through. You can now call `args`, `callCount` and `called` on a stub.

#### V0.4.0
- add `#reset` method to doubles to allow them to be set back to blank

#### V0.3.0
- doubles keep track of their arguments

#### V0.2.1
- pass arguments through to stubbed functions

#### V0.2.0
- added basic Stubs

#### V0.1.0
- initial release
