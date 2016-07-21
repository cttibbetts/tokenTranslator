# tokenTranslator
Take in the token file, spit out a translated version

First, get yourself a microsoft account and add http://datamarket.azure.com/dataset/bing/microsofttranslator

Then, in your [account](http://datamarket.azure.com/dataset/bing/microsofttranslator) find your account key and customer id.
Add them both in app.js:
```javascript
	var client = new MsTranslator({
		client_id: '[your customer id]',
		client_secret: '[your account key]'
	}, true)
```

Change the `toLanguage` variable to change the output language.

put the `tokens.js` file at the root of this directory, and run `node app.js`
the app will write to `out.txt` in that language. 


forgive the terrible readme, this is super alpha of a crappy dev tool only for us