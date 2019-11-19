# Parses .feature files

Having a JSON object parsed per test is useful in order to output it to any other desired format.

```js
// > @source 'Given the tests in `./benchmark/sample.test.js` './benchmark/sample.test.js'
const { feature } = await parseFeatureFile(sampleFeature)
t.true(typeof feature === 'object')
t.true(feature.hasOwnProperty('children'))
t.true(feature.children.length > 0)
```

# Converts .feature files into markdown

Given a .feature file, we must be able to parse it into a markdown string.



To do so, we have to convert the `.feature` file into a [CucumberFeature](#cucumber-feature) by using the
[parseFeatureFile](#parse-feature-file) method.

```js
const feature = await parseFeatureFile(fromTestDirectory('./benchmark/sample-feature.feature'))
t.is(cucumberFeatureToMd(feature), mdBenchmark)
```

{{source mdBenchmark './benchmark/sample.test.md'}}



# Parses AVA files

Having a object parsed per test is useful in order to output it to any other desired format.

```js
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
```

# Converts AVA tests into markdown

Having a object parsed per test is useful in order easily to output it to any other desired format.



{{source 'Given the tests in `./benchmark/sample.test.js`' './benchmark/sample.test.js'}}

```js
const arrayOfTests = await parseAvaFile(fromTestDirectory('./benchmark/sample.test.js'))
t.is(avaTestsToMd(arrayOfTests), sampleAvaTestMdBenchmark)
```