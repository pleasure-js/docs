import test from 'ava'
import { avaTestsToMd } from './ava-test-to-md.js'

test(`Converts AVA tests into markdown`, async t => {
  /**
   * Having a object parsed per test is useful in order to easily output it to any other desired format.
   */

  const arrayOfTests = await parseAvaFile(fromTestDirectory('./benchmark/sample.test.js'))
  t.is(avaTestsToMd(arrayOfTests), sampleAvaTestMdBenchmark)
})