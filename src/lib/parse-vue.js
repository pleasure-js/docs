import { jsDocSyntaxToJson } from './jsdoc-syntax-to-json'
import { jsdocJsonToMarkdown, JSDocJsonToMarkdownTemplates } from './jsdoc-json-to-markdown'

/**
 * @param {String} vueString
 */
export function parseVue (vueString) {
  const matched = [...vueString.matchAll(/^<[\s]*([^\s]+)([^>]+)?>(.*?)^<\/\1>/mgs)]
  const found = {}
  matched.forEach(([match, tag, params, code]) => {
    found[tag] = {
      params,
      code,
      match
    }
  })
  if (found.script) {
    found.script.jsdoc = jsDocSyntaxToJson(found.script.code)
    found.script.jsdocMd = jsdocJsonToMarkdown(found.script.jsdoc, { plugin: [require.resolve('dmd-clean')], template: JSDocJsonToMarkdownTemplates.main })
  }
  return found
}
