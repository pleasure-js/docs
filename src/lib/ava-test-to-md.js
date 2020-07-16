import { jsCodeToMd } from './js-code-to-md.js'
import kebabCase from 'lodash/kebabCase'

const Options = {
  joinString: '\n\n',
  htmlTitle: false,
  wrapInDetails: false,
  headingLevel: 1,
  withFlag: true,
  codeParser: jsCodeToMd
}

/**
 * Parses give {@link AvaTest} into markdown
 * @param {AvaTest} AvaTest - The {@link AvaTest}
 * @param {Object} [options]
 * @param {Boolean} [options.htmlTitle=false] - Whether to use real html tags for the titles or not
 * @param {Boolean} [options.wrapInDetails=false] - Whether to wrap the test inside a  details / summary tag
 * @param {Boolean} [options.joinString=\n\n]
 * @param {Number} options.headingLevel=1 - How many `#` for the test title
 * @param {Boolean|Function} [options.withFlag=true] - Whether to append or not the test flag at the end of the
 * @param {Boolean|Function} [options.codeParser] - Function that resolved the coee
 * @return {String} The markdown string
 */
export function avaTestToMd (AvaTest, options = {}) {
  const {
    joinString,
    htmlTitle,
    wrapInDetails,
    headingLevel,
    withFlag,
    codeParser
  } = Object.assign({}, Options, options)
  const { title, description, code, flag } = AvaTest
  const orEmpty = v => v || ''
  let mdTitle

  if (!htmlTitle) {
    mdTitle = `${'#'.repeat(headingLevel)} ${title}${withFlag && flag ? ' *(' + flag + ')*' : ''}`
  } else {
    mdTitle = `<a name="${kebabCase(title)}"></a>

<h${headingLevel}>${title}${withFlag && flag ? ' *(' + flag + ')*' : ''}</h${headingLevel}>`
  }

  const mdCode = code ? codeParser(code) : ''

  if (wrapInDetails) {
    return `<a name="${kebabCase(title)}"></a>
<details>
    <summary><strong>${title}${withFlag && flag ? ' <em>(' + flag + ')</em>' : ''}</strong></summary>

${orEmpty(description)}

${orEmpty(mdCode)}
</details>`
  }

  const markdown = [mdTitle]

  if (description) {
    markdown.push(description)
  }

  if (mdCode) {
    markdown.push(mdCode)
  }

  return markdown.join(joinString)
}

/**
 * Parses given {@link AvaTest}'s into markdown
 * @param {AvaTest[]} AvaTests - An array of {@link AvaTest}'s
 * @param {Object} [options] - The {@link avaTestToMd} options
 * @return {String}
 */
export function avaTestsToMd (AvaTests, options) {
  options = Object.assign({}, Options, options)
  return AvaTests.map(avaTest => avaTestToMd(avaTest, options)).join(options.joinString)
}
