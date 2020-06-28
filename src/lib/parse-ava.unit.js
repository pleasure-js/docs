import test from 'ava'
import { parseAvaFile } from './parse-ava'

/**
 * Having a object parsed per test is useful in order to output it to any other desired format.
 */

test('Parses AVA files', async t => {
  // > @source 'Given the tests in `./benchmark/sample.test.js` './benchmark/sample.test.js'
  const arrayOfTests = await parseAvaFile(benchmark('sample.test.js'))

  // returned object is an array of tests
  t.true(Array.isArray(arrayOfTests))
  t.is(arrayOfTests.length, 3)

  const firstAvaTest = arrayOfTests[0]

  t.true(typeof firstAvaTest === 'object')
  t.is(firstAvaTest.title, 'Parses ava test`s files')
  t.is(firstAvaTest.description, 'I want to be able to parse test files to improve my software development experience')
  t.is(firstAvaTest.code, '// some code\nt.pass()')

  t.deepEqual(require(benchmark('sample.test.json')), arrayOfTests)
})
