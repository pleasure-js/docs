import { jsCodeToMd } from './js-code-to-md.js'

/**
 * Parses give {@link AvaTest} into markdown
 * @param {AvaTest} AvaTest - The {@link AvaTest}
 * @param {Object} [options]
 * @param {Number} options.headingLevel=1 - How many `#` for the test title
 * @param {Boolean|Function} [options.withFlag=true] - Whether to append or not the test flag at the end of the
 * @param {Boolean|Function} [options.codeParser] - Function that resolved the coee
 * @return {String} The markdown string
 */
export function avaTestToMd (AvaTest, { headingLevel = 1, withFlag = true, codeParser = jsCodeToMd } = {}) {
  const { title, description, code, flag } = AvaTest

  const mdTitle = `${'#'.repeat(headingLevel)} ${title}${withFlag && flag ? ' *(' + flag + ')*' : ''}`
  const mdCode = code ? codeParser(code) : ''

  const markdown = [mdTitle]

  if (description) {
    markdown.push(description)
  }

  if (mdCode) {
    markdown.push(mdCode)
  }

  return markdown.join('\n\n')
}

/**
 * Parses given {@link AvaTest}'s into markdown
 * @param {AvaTest[]} AvaTests - An array of {@link AvaTest}'s
 * @param {Object} [options] - The {@link avaTestToMd} options
 * @return {String}
 */
export function avaTestsToMd (AvaTests, options) {
  return AvaTests.map(avaTest => avaTestToMd(avaTest, options)).join('\n\n')
}
