'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the divine ' + chalk.red('Angular') + ' generator! by tmosest'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is your project name?',
        default: this.appname
      },
      {
        type: 'rawList',
        name: 'angular',
        message: 'What Version of Angular would you like to use?',
        choices: ['1.6', '2.0'],
        defualt: '1.6'
      }
    ];
    var done = this.async();
    this.prompt(prompts)
    .then(function (answers) {
      this.log('name: ', answers.name);
      this.log('angular: ', answers.angular2);
      done();
    }.bind(this));
  },

  writing: function () {
    /*this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );*/
  },

  install: function () {
    //this.installDependencies();
  }
});
