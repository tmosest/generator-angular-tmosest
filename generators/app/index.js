'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  // Interact With User
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
        type: 'list',
        name: 'angular',
        message: 'What Version of Angular would you like to use?',
        choices: ['1.6', '2.0'],
        defualt: '1.6'
      },
      {
        type: 'list',
        name: 'jquery',
        message: 'jQuery?',
        choices: ['lite', '1.x', '2.x', '3.x'],
        default: 'lite'
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
  // Write Files
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
          name: this.props.name
        }
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
    }
  },
  // Install Dependencies
  install: function () {
    this.conflicter.force = true;
    this.installDependencies();
    if (this.props.jquery !== 'lite') {
      this.bowerInstall(['jquery=jquery#^' + this.props.jquery], {save: true});
    }
    this.bowerInstall(['angular=angular#^' + this.props.angular], {save: true});
  }
});
