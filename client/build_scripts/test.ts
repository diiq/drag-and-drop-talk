import '../polyfills.ts';

declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () { };

// Then we find all the tests.
let context = require.context('../app/', true, /\.spec\.tsx?$/);

// And load the modules.
context.keys().map(context);

// Finally, start Karma to run the tests.
__karma__.start();
