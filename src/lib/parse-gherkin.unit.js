import { parseFeatureFile } from './parse-gherkin'
import test from 'ava'

test('Parses .feature files', async t => {
  /**
   * Having a JSON object parsed per test is useful in order to output it to any other desired format.
   */

  // > @source 'Given the tests in `./benchmark/sample.test.js` './benchmark/sample.test.js'
  const { feature } = await parseFeatureFile(benchmark('sample-feature.feature'))
  t.true(typeof feature === 'object')
  t.true(Object.hasOwnProperty.call(feature, 'children'))
  t.true(feature.children.length > 0)
})
