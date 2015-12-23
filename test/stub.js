var expect = require('expect.js');
var Stub = require('../lib/stub');

describe('stubs', function() {
  var Foo = {
    get: function() {
      return 'foo';
    }
  };

  it('can stub a method to return a value', function() {
    new Stub(Foo, 'get').returnValue(1);
    expect(Foo.get()).to.eql(1);
  });

  it('can stub on a method with a function', function() {
    new Stub(Foo, 'get').callFunction(function() {
      return 'bar';
    });
    expect(Foo.get()).to.eql('bar');
  });

  it('cleans up after one call', function() {
    new Stub(Foo, 'get').returnValue(1);
    expect(Foo.get()).to.eql(1);
    expect(Foo.get()).to.eql('foo');
  });

  it('gives access to the callCount', function() {
    var stub = new Stub(Foo, 'get').returnValue(1);
    Foo.get();
    expect(stub.callCount).to.eql(1);
  });

  it('gives access to the arguments', function() {
    var stub = new Stub(Foo, 'get').callFunction(function() {
    });
    Foo.get('foo');
    expect(stub.args).to.eql([['foo']]);
  });

  it('says when it has been called', function() {
    var stub = new Stub(Foo, 'get').returnValue(1);
    Foo.get('foo');
    expect(stub.called).to.eql(true);
  });

  it('passes any arguments through', function() {
    new Stub(Foo, 'get').callFunction(function(a, b) {
      return a + b;
    });
    expect(Foo.get(2, 2)).to.eql(4);
  });

  it('can let a stub exist for ever', function() {
    var stub = new Stub(Foo, 'get').persist().returnValue(1);
    expect(Foo.get()).to.eql(1);
    expect(Foo.get()).to.eql(1);
    stub.destroy();
  });

  it('lets a persisted stub be reset', function() {
    var stub = new Stub(Foo, 'get').persist().returnValue(1);
    expect(Foo.get()).to.eql(1);
    stub.destroy();
    expect(Foo.get()).to.eql('foo');
  });
});
