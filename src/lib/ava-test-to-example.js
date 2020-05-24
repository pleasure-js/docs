import { jsCodeToMd } from './js-code-to-md.js'

/**
 * Parses give {@link AvaTest} into a js-doc example
 * @param {AvaTest} AvaTest - The {@link AvaTest}
 * @param {Object} [options]
 * @param {Boolean|Function} [options.codeParser] - Function that resolved the coee
 * @return {String} The markdown string
 */
export function avaTestToExample (AvaTest, { codeParser = jsCodeToMd } = {}) {
  const { title, description, code } = AvaTest

  const example = [`@example <caption>${ title }</caption>`, '']
  description && example.push(description, '')
  example.push(codeParser(code))

  return example.join(`\n`)
}
