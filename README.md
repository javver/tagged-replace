# tagged-replace

[![Build Status](https://travis-ci.org/javver/tagged-replace.svg?branch=master)](https://travis-ci.org/javver/tagged-replace)
[![Coverage Status](https://coveralls.io/repos/github/javver/tagged-replace/badge.svg?branch=master)](https://coveralls.io/github/javver/tagged-replace?branch=master)

Replace pieces of your source using comment tags to identify the location.

## Usage

```js
/* configuration.js */

var myServer = /*host*/ '' /*/host*/;
```

```js
var fs = require('fs');
var taggedReplace = require('tagged-replace');

var content = fs.readFileSync('./configuration.js');
console.log( taggedReplace( content, { host: '\'myhost.example.com\'' } ) );
```

```js
/* console */

var myServer = /*host*/ 'myhost.example.com' /*/host*/;
```

`taggedReplace(contents[, values[, options]])`

#### `contents`

`contents` is the string which may contains some tags

#### `values`

`values` is an object where each key is the name of a tag and its value will be replaced, as a string in the characters between the starting and ending tag.

#### `options`

`options` is an object with overrides for the default parameters described below.

## Configuration

### Tag characters

#### startPrefix

The beginning of the start tag. Defaults to '/*'.

#### startSuffix

The ending of the start tag. Defaults to '*/'.

#### endPrefix

The beginning of the end tag. Defaults to '/*/'.

#### endSuffix

The ending of the end tag. Defaults to '*/'.

### Result padding

#### space

Set to `true` to keep the contents separated from the tags by a space. Defaults to `true`.

The default options are:

```js
defaultOptions = {
   startPrefix: '/*',
   startSuffix: '*/',
   endPrefix: '/*/',
   endSuffix: '*/',
   space: true
};
```
