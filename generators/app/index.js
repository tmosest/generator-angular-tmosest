'use strict';
/*
 * Requirements.
 */
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
    this.bootstrapChoices = ['None', 'CSS', 'SASS', 'LESS'];
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
        choices: ['Lite', '1.x', '2.x', '3.x'],
        default: 'Lite'
      },
      {
        type: 'list',
        name: 'bootstrap',
        message: 'Bootstrap?',
        choices: this.bootstrapChoices,
        defualt: 'None'
      }
    ];
    var done = this.async();
    this.prompt(prompts)
    .then(function (answers) {
      this.props = answers; // set props to answers
      this.log('name: ', answers.name);
      this.log('angular: ', answers.angular);
      this.log('bootstrap: ', answers.bootstrap);
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
    var bowerInstallList = [];
    var npmInstallList = [];
    // Bootstrap
    switch (this.props.bootstrap) {
      case this.bootstrapChoices[1]: // CSS
        bowerInstallList.push('bootstrap');
        break;
      case this.bootstrapChoices[2]: // Less
        bowerInstallList.push('bootstrap-less');
        npmInstallList.push('gulp-less');
        break;
      default:                      // SASS
        bowerInstallList.push('bootstrap-sass');
        npmInstallList.push('gulp-sass');
        break;
    }
    // jQuery
    if (this.props.jquery !== 'lite') {
      this.bowerInstall(['jquery=jquery#^' + this.props.jquery], {save: true});
    }
    // Angular
    this.bowerInstall(['angular=angular#^' + this.props.angular], {save: true});
    // Install
    this.bowerInstall(bowerInstallList, {save: true});
    this.npmInstall(npmInstallList, {save: true});
  }
});
