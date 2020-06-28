import test from 'ava'
import fs from 'fs'
import { jsDocSyntaxToJson } from './jsdoc-syntax-to-json'

test('Parses JSDoc syntax into JSON', async t => {
  const parsed = jsDocSyntaxToJson(fs.readFileSync(fromTestDirectory('./benchmark/jsdoc-syntax.js')).toString()).map(cleanDocsDynamicValues)
  t.true(Array.isArray(parsed))
  t.is(parsed.length, 1)
  t.truthy(parsed)
  t.snapshot(parsed)
})
