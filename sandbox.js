const { jsDocSyntaxToJson, jsdocJsonToMarkdown } = require('./')
const fs = require('fs')

const parsed = jsDocSyntaxToJson(fs.readFileSync('dist/pleasure-docs.esm.js').toString())
console.log({ parsed })
console.log(jsdocJsonToMarkdown(parsed))
