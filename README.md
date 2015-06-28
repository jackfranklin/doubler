# Doubler

Simple test doubles for NodeJS testing purposes, designed for usage when tools like Sinon offer more power than your project needs.

Also provides a very simple Stub implementation.

```sh
npm install --save-dev doubler
```

## Documentation

Until I am able to write up proper docs, the best place to look is the [test file](https://github.com/jackfranklin/doubler/blob/master/test/doubles.js), which shows the API nicely.

## Doubles

```js
var Double = require('doubler').Double;
var double = new Double({ foo: function() { return 2; } });
double.foo(); //=> 2
double.foo.called; //=> true
double.foo.callCount; //=> 1
double.foo('bar');
double.foo.args; //=> [[], ['bar']]
double.foo.reset(); //=> resets double back to new state
```

## Stubs

```js
var Stub = require('doubler').Stub;
var Foo = {
    get: function() { return 2; }
}

new Stub(Foo, 'get').returnValue(4);
Foo.get(); //=> 4
Foo.get(); //=> 2 (Spies only last for one invocation)

new Stub(Foo, 'get').callFunction(function() {
    return 5;
});
Foo.get(); //=> 5

var stub = new Stub(Foo, 'get').persist().returnValue(4);
Foo.get(); //=> 4
Foo.get(); //=> 4
Foo.get(); //=> 4 and so on
stub.destroy();
Foo.get(); //=> 2
```


## Changelog

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
