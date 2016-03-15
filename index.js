'use strict';

var defaults = require('lodash.defaults');

var defaultOptions = {
   startPrefix: '/*',
   startSuffix: '*/',
   endPrefix: '/*/',
   endSuffix: '*/',
   space: true
};

function escapeRegexp(exp) {
   return exp.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function startTag(tagName, options) {
   var startPrefix = options.startPrefix;
   var startSuffix = options.startSuffix;
   return escapeRegexp(startPrefix + tagName + startSuffix);
}

function endTag(tagName, options) {
   var endPrefix = options.endPrefix;
   var endSuffix = options.endSuffix;
   return escapeRegexp(endPrefix + tagName + endSuffix);
}

function regexp(tagName, options) {
   var space = '';
   if (options.space) {
      space = escapeRegexp(' ');
   }
   return new RegExp(
      startTag(tagName, options) + '[\\s\\S]*?' + endTag(tagName, options), 'g');
}

function enclose(tag, content, options) {
   var space = '';
   if (options.space) {
      space = escapeRegexp(' ');
   }

   var startPrefix = options.startPrefix;
   var startSuffix = options.startSuffix;
   var endPrefix = options.endPrefix;
   var endSuffix = options.endSuffix;
   return startPrefix + tag + startSuffix + space + content + space + endPrefix + tag + endSuffix;
}

function TaggedReplace(content, values, options) {

   var replaced = content;

   options = defaults({}, options, defaultOptions);

   if (values && typeof values === 'object') {
      var keys = Object.keys(values);
      replaced = keys.reduce(function(accum, tag) {
         return accum.replace(regexp(tag, options), enclose(tag, values[tag], options));
      }, replaced);
   }

   return replaced;

}

module.exports = TaggedReplace;
