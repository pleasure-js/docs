import test from 'ava'
import { avaTestsToMd } from './ava-test-to-md.js'
import { parseAvaFile } from './parse-ava'
import trim from 'lodash/trim'

test('Converts AVA tests into markdown', async t => {
  /**
   * Having a object parsed per test is useful in order to easily output it to any other desired format.
   */

  const arrayOfTests = await parseAvaFile(benchmark('sample.test.js'))
  t.is(avaTestsToMd(arrayOfTests), benchmarkRaw('sample.test.md'))
})

test('Wraps tests into detail / summary tags.', async t => {
  /**
   * Having a object parsed per test is useful in order to easily output it to any other desired format.
   */

  const arrayOfTests = await parseAvaFile(benchmark('sample.test.js'), {})
  const output = avaTestsToMd(arrayOfTests, { wrapInDetails: true })
  t.is(output, trim(benchmarkRaw('sample.test-html.md')))
})
