var expect = require('expect.js');
var Double = require('../index');

describe('Doubles', function() {
  it('can fake out a method', function() {
    var double = new Double({ foo: function() {} });
    expect(function() {
      double.foo();
    }).to.not.throwError();
  });

  it('keeps track of if the method has been called', function() {
    var double = new Double({ foo: function() {} });
    expect(double.foo.called).to.eql(false);
    double.foo();
    expect(double.foo.called).to.eql(true);
  });

  it('allows access to the call count', function() {
    var double = new Double({ foo: function() {} });
    expect(double.foo.callCount).to.eql(0);
    double.foo();
    double.foo();
    expect(double.foo.callCount).to.eql(2);
  });

  it('can be told to stub as blank fn by default', function() {
    var double = new Double().functions('foo');
    expect(function() {
      double.foo();
    }).to.not.throwError();
  });

  it('can stub many blank functions', function() {
    var double = new Double().functions('foo', 'bar');
    expect(function() {
      double.foo();
      double.bar();
    }).to.not.throwError();
  });

  it('can get functions to just return an object', function() {
    var double = new Double({ foo: 1 });
    expect(double.foo()).to.eql(1);
    expect(double.foo.called).to.eql(true);
  });
});
