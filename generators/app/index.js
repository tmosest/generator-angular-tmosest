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
      },
      {
        type: 'confirm',
        name: 'jquery',
        message: 'Would you like to include jQuery?',
        default: true
      }
    ];
    var done = this.async();
    this.prompt(prompts)
    .then(function (answers) {
      this.props = answers;
      this.log('name: ', answers.name);
      this.log('angular: ', answers.angular);
      done();
    }.bind(this));
  },
  writing: {
    // Copy Configuration files
    config: function () {
      // Pakcage.json
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name
        }
      );
      // Bower
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'), {
          name: this.props.name,
          angular: this.props.angular
        }
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
    }
  },
  install: function () {
    this.installDependencies();
    if (this.props.jquery === true) {
      this.bowerInstall(['jquery'], {save: true});
    }
  }
});
