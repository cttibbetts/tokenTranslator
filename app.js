var tokenFile;
define = function(obj) {
	tokenFile = obj;
 }

var MsTranslator = require('mstranslator');
var fs = require('fs');
require('./tokens.js');

var fromLanguage = 'en';
var toLanguage = 'ar';

var client = new MsTranslator({
		client_id: '[your customer id]',
		client_secret: '[your account key]'
	}, true)

var paths = [];
var tokens = [];
function addTokens(obj, path) {
	path = path || [];
	for (var key in obj) {
		var newPath = path.slice(0);
		newPath.push(key);
		if (typeof(obj[key]) === 'string') {
			paths.push(newPath);
			tokens.push(obj[key]);
		} else {
			addTokens(obj[key], newPath);
		}
	}
}

addTokens(tokenFile);

function addNewToken(token, root, path) {
	var next = path[0];
	if (!root[next]) {
		root[next] = {};
	}

	path = path.slice(1);
	if (path.length > 0) {
		addNewToken(token, root[next], path);
	} else {
		root[next] = token;
	}
}

var newTokens = {};	
var chunk = 50;
var results = 0;
var failures = 0;
for (var c = 0, len = tokens.length; c < len; c+=chunk) {
	var tokenChunk = tokens.slice(c, c+chunk);
	(function(tokenChunk, chunkIndex) {
		client.translateArray({
			texts: tokenChunk,
			from: fromLanguage,
			to: toLanguage
		}, function(err, data) {
			if (err) {
				console.log('ERROR:', err);
				failures++;
				return;
			}
			for (var i in data) {
				addNewToken(data[i].TranslatedText, newTokens, paths[chunkIndex + +i]);
				results++;
			}
		});
	})(tokenChunk, c);
}

intervalId = setInterval(function() {
	if (results >= tokens.length || results + (failures*50) >= tokens.length) {
		clearInterval(intervalId);
		console.log('Got this many results: ' + results + '\n - and (about) this many failures: ' + (failures*50) + '\n - with this many tokens put in:', tokens.length);

		var out = JSON.stringify(newTokens, null, 4);
		out = '// jscs:disable maximumLineLength\n\ndefine(' + out + ');\n';

		fs.writeFile("out.txt", out, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
	}
}, 500)

