import test from 'ava'
import { parseFeatureFile, cucumberFeatureToMd, parseAvaFile, avaTestsToMd } from '../'
import path from 'path'
import trim from 'lodash/trim'
import fs from 'fs'
import { fromTestDirectory } from './utils/from-test-directory.js'

const sampleFeature = path.join(__dirname, './benchmark/sample-feature.feature')
const sampleFeatureMd = path.join(__dirname, './benchmark/sample-feature.md')
const sampleAvaTestMd = path.join(__dirname, './benchmark/sample.test.md')

const mdBenchmark = trim(fs.readFileSync(sampleFeatureMd).toString())
const sampleAvaTestMdBenchmark = trim(fs.readFileSync(sampleAvaTestMd).toString())

/**
 * Having a JSON object parsed per test is useful in order to output it to any other desired format.
 */

test(`Parses .feature files`, async t => {
  // > @source 'Given the tests in `./benchmark/sample.test.js` './benchmark/sample.test.js'
  const { feature } = await parseFeatureFile(sampleFeature)
  t.true(typeof feature === 'object')
  t.true(feature.hasOwnProperty('children'))
  t.true(feature.children.length > 0)
})

/**
 * Given a .feature file, we must be able to parse it into a markdown string.
 */

test(`Converts .feature files into markdown`, async t => {
  /**\
   * To do so, we have to convert the `.feature` file into a [CucumberFeature](#cucumber-feature) by using the
   * [parseFeatureFile](#parse-feature-file) method.
   */
  const feature = await parseFeatureFile(fromTestDirectory('./benchmark/sample-feature.feature'))
  t.is(cucumberFeatureToMd(feature), mdBenchmark)

  /**\
   * {{source mdBenchmark './benchmark/sample.test.md'}}
   */
})

/**
 * Having a object parsed per test is useful in order to output it to any other desired format.
 */

test(`Parses AVA files`, async t => {
  // > @source 'Given the tests in `./benchmark/sample.test.js` './benchmark/sample.test.js'
  const arrayOfTests = await parseAvaFile(fromTestDirectory('./benchmark/sample.test.js'))

  // returned object is an array of tests
  t.true(Array.isArray(arrayOfTests))
  t.is(arrayOfTests.length, 3)

  const firstAvaTest = arrayOfTests[0]

  t.true(typeof firstAvaTest === 'object')
  t.is(firstAvaTest.title, `Parses ava test\`s files`)
  t.is(firstAvaTest.description, 'I want to be able to parse test files to improve my software development experience')
  t.is(firstAvaTest.code, '// some code\nt.pass()')

  t.deepEqual(require(fromTestDirectory('./benchmark/sample.test.json')), arrayOfTests)
})

/**
 * Having a object parsed per test is useful in order to easily output it to any other desired format.
 */

test(`Converts AVA tests into markdown`, async t => {
  /**\
   * {{source 'Given the tests in `./benchmark/sample.test.js`' './benchmark/sample.test.js'}}
   */

  const arrayOfTests = await parseAvaFile(fromTestDirectory('./benchmark/sample.test.js'))
  t.is(avaTestsToMd(arrayOfTests), sampleAvaTestMdBenchmark)
})
