var Double = require('./double');

var Stub = function(obj, methodName) {
  this.obj = obj;
  this.methodName = methodName;
  this.oldMethod = this.obj[methodName];
  this.shouldPersist = false;
};

Stub.prototype = {
  _createDouble: function(fn) {
    var opts = {};
    opts[this.methodName] = fn;
    return new Double(opts);
  },
  persist: function() {
    this.shouldPersist = true;
    return this;
  },
  returnValue: function(val) {
    this.double = this._createDouble(function() { return val; });
    this._setStubMethodName();
    return this;
  },
  callFunction: function(fn) {
    this.double = this._createDouble(fn);
    this._setStubMethodName();
    return this;
  },
  _setStubMethodName: function() {
    this.obj[this.methodName] = function() {
      this.reset();
      var result = this.double[this.methodName].apply(null, [].slice.call(arguments));
      ['callCount', 'called', 'args'].forEach(function(prop) {
        this[prop] = this.double[this.methodName][prop];
      }, this);
      return result;
    }.bind(this);
  },
  destroy: function() {
    this.shouldPersist = false;
    this.reset();
  },
  reset: function() {
    if(!this.shouldPersist) {
      this.obj[this.methodName] = this.oldMethod;
    }
    return this;
  }
};

module.exports = Stub;
