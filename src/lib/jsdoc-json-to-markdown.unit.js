import test from 'ava'
import fs from 'fs'
import { jsDocSyntaxToJson } from './jsdoc-syntax-to-json'
import { jsdocJsonToMarkdown } from './jsdoc-json-to-markdown'
import path from 'path'

test('JSDoc to markdown', async t => {
  const docs = jsDocSyntaxToJson(fs.readFileSync(path.join(__dirname, '../../dist/docs.esm.js')).toString())
  const marked = jsdocJsonToMarkdown(docs)
  t.truthy(marked)
  // todo: implement proper test
  // fs.writeFileSync('TEST.json', JSON.stringify(docs, null, 2))
  // fs.writeFileSync('README-TEST.md', marked)
  // console.log({ marked })
})
