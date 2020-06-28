import test from 'ava'

/**
 * I want to be able to parse test files to improve my software development experience
 */

test('Parses ava test`s files', async t => {
  // some code
  t.pass()
})

/**
 * And the ability of displaying a description of the test in the form of a JSDoc comment
 * right above the tests.
 */

test.skip('Returning useful information such as the title, description, code and flags', async t => {
  // some other code
  t.pass()
})

test.todo('Even todo tests without a sample code are or description are parsed.')
