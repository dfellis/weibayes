#!/usr/bin/env node
var commander = require('commander');
var fs = require('fs');
var path = require('path');

commander
	.version('0.0.1')
	.option('-b, --beta [b]', 'The Weibull constant "beta"', parseFloat)
	.option('-i, --input [file]', 'The text file containing the failure times')
	.parse(process.argv);

if(!commander.beta || !commander.input) {
	console.warn("All options must be specified. See the --help for more information.");
	process.exit(-1);
} else if(!path.existsSync(commander.input)) {
	console.warn("The specified file does not exist.");
	process.exit(-2);
}

console.log(Math.pow(fs.readFileSync(commander.input).toString().split('\n')
	.map(function(val, ind, arr) {
		return Math.pow(val, commander.beta)/arr.length;
	})
	.reduce(function(reduction, val) {
		return reduction + val;
	}), (1/commander.beta))
);
