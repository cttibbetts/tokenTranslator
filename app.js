// Hack to load in our token file
var tokenFile;
define = function(obj) {
	tokenFile = obj;
}

var MsTranslator = require('mstranslator');
var fs = require('fs');
var config = require('./config.js');
require('./tokens.js');

// Languages
var fromLanguage = 'en';
var toLanguage = 'zh-CHS';

// Set up the MsTranslator client
var client = new MsTranslator({
		client_id: config.id,
		client_secret: config.key
	}, true)

/**
 * Recursively iterate through "obj" to find all strings,
 * and add each to the tokens array, and their path to the
 * paths array.
 */
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

/**
 * Recursive function
 * Add the "token" to the "root" object at "path"
 * ex. addNewToken("foo", {}, ["hello", "world"]) ->
 *  {
 *    "hello": {
 *  	"world": "foo"
 *    }
 *  }
 */
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

/**
 * translate a list of tokens,
 * then add them to the new token object.
 * The offset represents where in the path list to look
 */
function translateList(tokenList, offset) {
	client.translateArray({
			texts: tokenList,
			from: fromLanguage,
			to: toLanguage
		}, function(err, data) {
			if (err) {
				console.log('ERROR:', err);
				failures++;
				return;
			}
			for (var i in data) {
				addNewToken(data[i].TranslatedText, newTokens, paths[offset + +i]);
				results++;
			}
		}
	);
}


var paths = [];
var tokens = [];
// Generate the tokens and paths array
addTokens(tokenFile);

// Count the characters in the token list
var charCount = 0;
for (var t in tokens) {
	charCount += tokens[t].length;
}
console.log('Translating ' + charCount + ' token characters!');

var newTokens = {};	
var chunk = 50;
var results = 0;
var failures = 0;
// for loop to chunk token queries into lengths that won't
// break the http request
for (var c = 0, len = tokens.length; c < len; c+=chunk) {
	var tokenChunk = tokens.slice(c, c+chunk);
	translateList(tokenChunk, c);
}

// Wait for all responses
intervalId = setInterval(function() {
	if (results >= tokens.length || results + (failures*50) >= tokens.length) {
		clearInterval(intervalId);
		console.log('Got this many results: ' + results + '\n - and (about) this many failures: ' + (failures*50) + '\n - with this many tokens put in:', tokens.length);

		var out = JSON.stringify(newTokens, null, 4);
		out = '// jscs:disable maximumLineLength\n\ndefine(' + out + ');\n';

		fs.writeFile('out.js', out, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
	}
}, 500);

