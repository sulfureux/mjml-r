const fs = require("fs");
const path = require("path");

const pathExistedOrCreate = require("path-existed-or-create");
const mjml2html = require("mjml");
const rimraf = require("rimraf");
const htmlToText = require("html-to-text");

function isDir(dirPath) {
  return fs.lstatSync(dirPath).isDirectory();
}

function isEmailTemplate(templatePath) {
  return ".mjml" === path.extname(templatePath);
}

let rootTemplate = "";

function handleTemplateDir(
  templateDirPath,
  genDirPath,
  ignore = [],
  clear = false
) {
  if (clear) {
    rimraf.sync(genDirPath);
  }

  if (!rootTemplate) {
    rootTemplate = templateDirPath;
  }

  const files = fs.readdirSync(templateDirPath);
  const lengthFiles = files.length;

  for (let i = 0; i < lengthFiles; i++) {
    const name = files[i];
    let willGenPath = "";
    if (rootTemplate != templateDirPath) {
      willGenPath = templateDirPath.replace(`${rootTemplate}/`, "");
    }
    const genPath = path.resolve(genDirPath, willGenPath);
    try {
      pathExistedOrCreate(genPath);
    } catch (e) {
      console.log(e);
    }

    if (ignore.includes(name)) {
      continue;
    }
    const currentPath = path.resolve(templateDirPath, name);

    if (isDir(currentPath)) {
      handleTemplateDir(currentPath, genDirPath, ignore, false);
    }

    if (isEmailTemplate(currentPath)) {
      const html = mjml2html(
        fs.readFileSync(currentPath, { encoding: "utf8" }),
        { filePath: currentPath }
      );
      fs.writeFileSync(
        `${path.resolve(
          genPath,
          `${path.basename(currentPath, ".mjml")}.html`
        )}`,
        html.html
      );
      fs.writeFileSync(
        `${path.resolve(
          genPath,
          `${path.basename(currentPath, ".mjml")}.txt`
        )}`,
        htmlToText.fromString(html.html, {
          wordwrap: 130
        })
      );
    }
  }
}

module.exports = handleTemplateDir;
