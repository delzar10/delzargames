// Transpile test before execute
require('babel-register')();

// Disable webpack feature that mocha does not understand
require.extensions['.css'] = function() {};
require.extensions['.scss'] = function() {};
