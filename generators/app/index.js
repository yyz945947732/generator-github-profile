"use strict";
const Generator = require("yeoman-generator");
const _ = require("lodash");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  initializing() {
    this.props = {
      githubName: "",
      theme: "light"
    };
  }

  prompting() {
    this.log(
      yosay(
        `Welcome to the spectacular ${chalk.red(
          "generator-github-profile"
        )} generator!`
      )
    );

    const prompts = [
      {
        name: "githubName",
        message: "GitHub's username",
        when: !this.props.githubName,
        default: this.user.git.name()
      },
      {
        type: "list",
        name: "theme",
        message: "Select a theme:",
        default: "light",
        choices: [
          {
            name: "Light",
            value: "light"
          },
          {
            name: "Dark",
            value: "dark"
          }
        ]
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = _.merge(this.props, props);
    });
  }

  _getTrophyTheme() {
    const { theme } = this.props;
    if (theme === "light") {
      return "flat";
    }

    if (theme === "dark") {
      return "onedark";
    }

    return "flat";
  }

  writing() {
    const { githubName, theme } = this.props;
    const trophyTheme = this._getTrophyTheme();

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      {
        githubName,
        theme,
        trophyTheme
      }
    );
  }
};
