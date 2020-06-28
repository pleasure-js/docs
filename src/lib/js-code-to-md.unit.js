import test from 'ava'
import { jsCodeToMd } from './js-code-to-md'
import fs from 'fs'

test('JSDoc to markdown', async t => {
  // const marked = jsdocJsonToMarkdown(jsDocSyntaxToJson(fs.readFileSync(fromTestDirectory('./benchmark/jsdoc-syntax.js')).toString()).slice(0, 1))
  const docs = jsCodeToMd(fs.readFileSync(fromTestDirectory('../dist/docs.esm.js')).toString())

  t.truthy(docs)
  t.snapshot(docs)
})
