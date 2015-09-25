var fs = require('fs');
var esprima = require('esprima');
var escope = require('escope');

var filename = process.argv[2];
var srcCode = fs.readFileSync(filename);

var ast = esprima.parse(srcCode, {
	loc: true
});

var globalScope = escope.analyze(ast).scopes[0];
globalScope.implicit.variables.forEach(function(v){
	var id = v.identifiers[0];
	console.log(`${id.name} used at line: ${id.loc.start.line} was not declared`);
});