var Double = function(methods) {
  this.methods = {};
  this.processMethods(methods);
};

Double.function = function(returnValue) {
  return new Double({
    fn: returnValue
  }).fn;
};

Double.prototype.functions = function() {
  var fns = [].slice.call(arguments);
  var methods = {};
  fns.forEach(function(fn) {
    methods[fn] = function() {};
  });
  this.processMethods(methods);
  return this;
};

Double.prototype.processMethods = function(methods) {
  for(var key in methods) {
    if(typeof methods[key] === 'function') {
      this.methods[key] = methods[key];
    } else {
      this.methods[key] = function() {
        return methods[key];
      };
    }
    this['_' + key] = methods[key];
    this[key] = function() {
      this[key].callCount++;
      this[key].called = true;
      this[key].args.push([].slice.call(arguments));

      return this.methods[key].apply(this, [].slice.call(arguments));
    }.bind(this);

    this[key].reset = function() {
      this.called = false;
      this.callCount = 0;
      this.args = [];
    }

    this[key].reset();
  }
};

module.exports = Double;
