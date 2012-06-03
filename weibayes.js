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

var r = 0;
console.log(Math.pow(fs.readFileSync(commander.input).toString().split('\n')
	.map(function(val, ind, arr) {
		if(/\+$/.test(val)) {
			val = val.replace(/\+$/, "");
		} else {
			r++;
		}
		return Math.pow(val, commander.beta);
	})
	.reduce(function(reduction, val) {
		return reduction + val/r;
	}), (1/commander.beta))
);
