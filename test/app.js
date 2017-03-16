'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-angular-tmosest:app', function () {
  describe('Creates Configuration Files:', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({name: 'test_project', angular: '1.6'})
        .toPromise();
    });

    it('creates a Package.json file', function () {
      assert.file([
        'package.json'
      ]);
    });

    it('creates a bower.json file', function () {
      assert.file([
        'bower.json'
      ]);
    });

    it('creates bowerrc file', function () {
      assert.file([
        '.bowerrc'
      ]);
    });
  });
});
