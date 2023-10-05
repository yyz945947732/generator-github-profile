"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-github-profile:app", () => {
  beforeEach(() => {
    const answers = {
      githubName: "yyz945947732",
      theme: "light"
    };
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(answers);
  });

  it("creates files", () => {
    const files = ["README.md"];
    assert.file(files);
  });

  it("fills the README with options", () => {
    assert.fileContent("README.md", "Hi 👋, I'm yyz945947732");
    assert.fileContent(
      "README.md",
      "https://github-profile-trophy.vercel.app/?username=yyz945947732&theme=flat"
    );
    assert.fileContent(
      "README.md",
      "https://github-readme-stats.vercel.app/api/top-langs?username=yyz945947732&show_icons=true&locale=en&layout=compact&theme=light"
    );
    assert.fileContent(
      "README.md",
      "https://github-readme-stats.vercel.app/api?username=yyz945947732&show_icons=true&locale=en&theme=light"
    );
  });
});
