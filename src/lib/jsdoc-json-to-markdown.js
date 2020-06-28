import json2md from 'jsdoc-to-markdown'

/**
 * @enum {Object} JSDocJsonToMarkdownTemplates
 * @property {String} main - Main template only for function descriptions
 * @property {String} readme - Full readme template with header, indexes and descriptions
 * @private
 */
export const JSDocJsonToMarkdownTemplates = (() => {
  const main = '{{>main}}'

  const readme = `{{optionSet "heading-depth" 3~}}
# {{pkg "name"}}

> {{pkg "description"}}
>
> {{#each (pkg "badges")}}[![{{this.name}}][{{this.name}}]][{{this.name}}-url]
  {{/each}}

{{>main}}

{{#each (pkg "badges")}}
[{{this.name}}]: {{this.image}}
[{{this.name}}-url]: {{this.url}}
{{/each}}`

  return {
    main,
    readme
  }
})()

/**
 * Renders given jsdoc object into a markdown string using dmd-clear, dmd-clean and pleasure-docs-dmd
 * @param {Object} JSDocJson
 * @param {Object} [options]
 * @param {String} options.template=JSDocJsonToMarkdownTemplates.readme
 * @param {String[]} options.plugin=['dmd-clear', 'dmd-clean', 'dmd-readable']
 * @return {String} The markdown render
 */
export function jsdocJsonToMarkdown (JSDocJson, { template = JSDocJsonToMarkdownTemplates.readme, plugin = ['dmd-readme'] } = {}) {
  return json2md.renderSync({
    data: JSDocJson,
    template,
    plugin
  })
}
