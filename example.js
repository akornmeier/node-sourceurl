
var vm = require('vm');
var sourceURL = require('./');
var fs = require('fs');
var assert = require('assert');


// throwing

var js = [
  'throw new Error(message);'
].join('\n');

var fn = sourceURL(js, [ 'message' ], 'test.js');

try {
  vm.runInNewContext(fn + '.call(null, "it works")', {});
} catch (err) {
  assert(~err.stack.indexOf('(test.js:2:7)'));
}

// no params

var js = [
  'this.foo = "foo";'
].join('\n');

var fn = sourceURL(js, 'foo.js');

var ctx = {};

vm.runInNewContext(fn + '.call(null)', ctx);

assert.equal(ctx.foo, 'foo');


// lotsa params

var js = [
  'console.log(it, works, ":)");'
].join('\n');

var fn = sourceURL(js, [ 'it', 'works' ], 'log.js');

vm.runInNewContext(fn + '.call(null, "it", "works");', { console: console });
