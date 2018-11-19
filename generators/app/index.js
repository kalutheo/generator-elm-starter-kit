var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  install() {
    this.spawnCommand("elm", ["reactor"]);
  }
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
      {
        type: "list",
        name: "type",
        choices: ["sandbox", "element", "document", "application"],
        message: "The type of application",
        default: "application"
      }
    ]);
  }

  writing() {
    const directory = this.answers.type;
    this.fs.copyTpl(
      this.templatePath(`${directory}/_elm.json`),
      this.destinationPath("elm.json"),
      { name: this.answers.name }
    );

    this.fs.copy(
      this.templatePath(`${directory}/src`),
      this.destinationPath("src")
    );
  }
};
