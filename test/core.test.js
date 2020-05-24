import test from 'ava'
import { jsDocSyntaxToJson, jsDocSyntaxToJsonAsync, jsdocJsonToMarkdown } from '../'
import fs from 'fs'
import { fromTestDirectory } from './utils/from-test-directory.js'

test(`Parses JSDoc syntax into JSON`, async t => {
  const parsed = jsDocSyntaxToJson(fs.readFileSync(fromTestDirectory('./benchmark/jsdoc-syntax.js')).toString())
  fs.writeFileSync('jsdoc.json', JSON.stringify(parsed, null, 2))
  t.true(Array.isArray(parsed))
  t.is(parsed.length, 1)
  t.truthy(parsed)
})

test(`JSDoc to markdown`, async t => {
  // const marked = jsdocJsonToMarkdown(jsDocSyntaxToJson(fs.readFileSync(fromTestDirectory('./benchmark/jsdoc-syntax.js')).toString()).slice(0, 1))
  const docs = jsDocSyntaxToJson(fs.readFileSync(fromTestDirectory('../dist/docs.esm.js')).toString())
  // console.log({ docs })
  const marked = jsdocJsonToMarkdown(docs, { plugin: ['dmd-readable'] })
  t.truthy(marked)
  fs.writeFileSync('TEST.json', JSON.stringify(docs, null, 2))
  fs.writeFileSync('README-TEST.md', marked)
  console.log({ marked })
})

test.todo(`Parses markdown using handlebars and special designed partials to help improve software dev documentation`)
test.todo(`Describes API routes and methods into JSON`)
test.todo(`Describes API routes and methods into markdown`)
test.todo(`Describes API routes and methods into an open api spec in json and yaml`)
test.todo('Register helpers for API in markdown')
