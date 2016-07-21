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

```
Code    Language Name            Native Name
--------------------------------------------
ar	    Arabic	                 العربية
cs	    Czech	                 česky, čeština
da	    Danish	                 dansk
de	    German	                 Deutsch
en	    English	                 English
et	    Estonian	             eesti, eesti keel
fi	    Finnish	                 suomi, suomen kieli
fr	    French	                 français
nl	    Dutch	                 Nederlands, Vlaams
el	    Greek	                 Ελληνικά
he	    Hebrew	                 עברית
ht	    Haitian Creole	         Kreyòl ayisyen
hu	    Hungarian	             Magyar
id	    Indonesian	             Bahasa Indonesia
it	    Italian	                 Italiano
ja	    Japanese	             日本語
ko	    Korean	                 한국어
lt	    Lithuanian	             lietuvių kalba
lv	    Latvian	                 latviešu valoda
no	    Norwegian	             Norsk
pl	    Polish	                 polski
pt	    Portuguese	             Português
ro	    Romanian	             română
es	    Spanish	                 español
ru	    Russian	                 русский язык
sk	    Slovak	                 slovenčina
sl	    Slovene	                 slovenščina
sv	    Swedish	                 svenska
th	    Thai	                 ไทย
tr	    Turkish	                 Türkçe
uk	    Ukrainian	             українська
vi	    Vietnamese	             Tiếng Việt
zh-CHS	Simplified Chinese	     中文
zh-CHT	Traditional Chinese	     
```

forgive the terrible readme, this is super alpha of a crappy dev tool only for us
