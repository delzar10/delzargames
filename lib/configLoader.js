'use strict';

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

let env = process.env.NODE_ENV.trim();

console.log(`Node environment: ${env}`);
console.log(`loading config.${env}.json`);

module.exports = require(`../config/config.${env}.json`);
