# mjml-r

> For Nodejs only

MJML generator with recursive

## install

```bash
yarn add mjml-r
```

```js
const mjmlR = require("mjml-r");

templatesPath = "tempDir";
genPath = "genPath";
ignoreFiles = [".DS_Store"]; // option
clearOldGens = true; // option; default false

mjmlR(dirPath, genPath, ignoreFiles, clearOldGens);
```
