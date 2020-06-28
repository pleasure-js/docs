import { cucumberFeatureToMd } from './cucumber-feature-to-md'
import { parseFeatureFile } from './parse-gherkin'
import test from 'ava'
import trim from 'lodash/trim'

test('Converts .feature files into markdown', async t => {
  /**
   * To do so, we have to convert the `.feature` file into a [CucumberFeature](#cucumber-feature) by using the
   * [parseFeatureFile](#parse-feature-file) method.
   */
  const feature = await parseFeatureFile(benchmark('sample-feature.feature'))
  t.is(cucumberFeatureToMd(feature), trim(benchmarkRaw('sample-feature.md')))
})
