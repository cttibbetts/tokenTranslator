# tokenTranslator
Take in the token file, spit out a translated version

First, get yourself a microsoft account and add [Microsoft Translator](http://datamarket.azure.com/dataset/bing/microsofttranslator)

Then, in your [account](http://datamarket.azure.com/dataset/bing/microsofttranslator) find your account key and customer id.
Add them both in config.js:
```javascript
	var config = {
		id: '[your customer id]',
		key: '[your account key]'
	};
```

Change the `toLanguage` variable to change the output language.

put the `tokens.js` file at the root of this directory, and run `node app.js`
the app will write to `out.js` in that language. 

ar	Arabic
cs	Czech
da	Danish
de	German
en	English
et	Estonian
fi	Finnish
fr	French
nl	Dutch
el	Greek
he	Hebrew
ht	Haitian Creole
hu	Hungarian
id	Indonesian
it	Italian
ja	Japanese
ko	Korean
lt	Lithuanian
lv	Latvian
no	Norwegian
pl	Polish
pt	Portuguese
ro	Romanian
es	Spanish
ru	Russian
sk	Slovak
sl	Slovene
sv	Swedish
th	Thai
tr	Turkish
uk	Ukrainian
vi	Vietnamese
zh-CHS	Simplified Chinese
zh-CHT	Traditional Chinese

forgive the terrible readme, this is super alpha of a crappy dev tool only for us