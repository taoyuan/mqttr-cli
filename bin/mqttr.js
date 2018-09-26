#!/usr/bin/env node

const path = require('path');
const commist = require('commist')();

const helpMe = require('help-me')({
	dir: path.join(__dirname, '..', 'doc')
});

commist.register('publish', require('./pub'));
commist.register('subscribe', require('./sub'));
commist.register('version', () => {
	console.log('* mqttr     version:', require('mqttr/package').version);
	console.log('* mqttr-cli version:', require('../package.json').version);
});
commist.register('help', helpMe.toStdout);

if (commist.parse(process.argv.slice(2)) !== null) {
	console.log('No such command:', process.argv[2], '\n');
	helpMe.toStdout();
}
