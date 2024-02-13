const C = require('./scripts/js-module-1');

const cal = new C();

console.log(cal.sum(6,8));


// In Nodejs each js file wraps with a Immediatly invoked function.

console.log('This are the argument of the IIF wrapper.');
console.log(arguments); //This are the arguments.

// The Function is.
console.log(require('module').wrapper);

// Returns the name of the current file.
console.log(__filename.slice(__filename.lastIndexOf('/')+1));


const funcs = require('./scripts/js-module-2');

console.log(funcs.sum(10,7));

// Here is the example of caching where the console.log() statement executes only one time.
const mod3 = require('./scripts/js-module-3');
require('./scripts/js-module-3');
require('./scripts/js-module-3');
require('./scripts/js-module-3');

console.log(mod3.val);
mod3.printHello('Hello World');