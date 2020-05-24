import { avaTestToExample } from './ava-test-to-example'
import { parseAvaFile } from './parse-ava'
import test from 'ava'
import path from 'path'

test(`Converts an ava test into a js-doc example`, async t => {
  const tests = await parseAvaFile(path.join(__dirname, '../../test/benchmark/sample.test.js'))
  const example = avaTestToExample(tests[0])
  t.log(example)
  t.truthy(example)
  t.snapshot(example)
})
