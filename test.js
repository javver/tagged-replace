'use strict';

var assert = require('assert');
var fs = require('fs');
var taggedReplace = require('./');

describe('taggedReplace', function() {

   it('leaves files with none or unknown as is', function() {
      var filecontent;

      filecontent = fs.readFileSync('./testfiles/no-tags.js', 'utf8');
      assert.equal(taggedReplace(filecontent), filecontent, 'no tags, no values');

      filecontent = fs.readFileSync('./testfiles/unknown-tags.js', 'utf8');
      assert.equal(taggedReplace(filecontent), filecontent, 'unknown tags, no values');
   });

   it('replaces text using a dictionary with one value', function() {
      var filecontent = fs.readFileSync('./testfiles/tag-server.js', 'utf8');
      var values = {
         server: 'servers.production'
      };
      var expected = fs.readFileSync('./testfiles/tag-server-replaced.js', 'utf8');
      assert.equal(taggedReplace(filecontent, values), expected, 'single value');
   });

   it('replaces text using a dictionary multiple values', function() {
      var filecontent = fs.readFileSync('./testfiles/tag-multiple.js', 'utf8');
      var values = {
         server: 'servers.development',
         user: '\'second.user\''
      };
      var expected = fs.readFileSync('./testfiles/tag-multiple-replaced.js', 'utf8');
      assert.equal(taggedReplace(filecontent, values), expected, 'single value');
   });

   it('replaces multiple instances of tag', function() {
      var filecontent = fs.readFileSync('./testfiles/tag-complex.js', 'utf8');
      var values = {
         server: 'servers.development',
         user: '\'second.user\''
      };
      var expected = fs.readFileSync('./testfiles/tag-complex-replaced.js', 'utf8');
      assert.equal(taggedReplace(filecontent, values), expected, 'single value');
   });

});
