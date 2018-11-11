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
      }
    ]);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("_elm.json"),
      this.destinationPath("elm.json"),
      { name: this.answers.name }
    );

    this.fs.copy(this.templatePath("src"), this.destinationPath("src"));
  }
};
