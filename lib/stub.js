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
    var double = this._createDouble(function() { return val; });
    this.obj[this.methodName] = function() {
      this.reset();
      return double[this.methodName]();
    }.bind(this);
    return this;
  },
  callFunction: function(fn) {
    var double = this._createDouble(fn);
    this.obj[this.methodName] = function() {
      this.reset();
      return double[this.methodName]();
    }.bind(this);
    return this;
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
