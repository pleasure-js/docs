import trim from 'lodash/trim'

/**
 * Parses given {@link CucumberFeature} into markdown
 * @param {CucumberFeature} cucumberFeature - The cucumber feature
 * @param {Object} [options]
 * @param {Number} options.scenarioHeadingLevel=2 - How many '#' prefixes an scenario title
 * @return {String} The markdown text
 *
 * @example <caption>Parsing a `.feature` file.</caption>
 *
 * ```js
 * const { parseFeatureFile, cucumberFeatureToMd } = require('@pleasure-js/docs')
 *
 * parseFeatureFile('/path/to/feature-file.feature')
 *   .then(cucumberFeature => {
 *     console.log(cucumberFeatureToMd(cucumberFeature))
 *   })
 * ```
 */
export function cucumberFeatureToMd (cucumberFeature, { scenarioHeadingLevel = 2 } = {}) {
  const { feature } = cucumberFeature
  const featureMd = [`# ${trim(feature.name)}\n\n${trim(feature.description.split('\n').map(trim).join('\n'))}`]

  // scenarios
  feature.children.forEach(scenario => {
    featureMd.push(`\n${'#'.repeat(scenarioHeadingLevel)} ${trim(scenario.name)}\n`)

    // steps
    scenario.steps.forEach(step => {
      featureMd.push(`**${trim(step.keyword)}** ${step.text}  `)
      if (step.argument && step.argument.type === 'DocString') {
        featureMd.push('\n```\n' + step.argument.content + '\n```\n')
      }
    })

    // examples
    if (scenario.examples) {
      scenario.examples.forEach(example => {
        featureMd.push(`\n**${trim(example.keyword)}**${example.name ? ': ' + example.name : ''}\n`)
        if (example.tableHeader) {
          const head = example.tableHeader.cells.map(({ value }) => value)
          const sep = head.map(() => ':---')
          featureMd.push(`| ${head.join(' | ')} |`)
          featureMd.push(`| ${sep.join(' | ')} |`)
          example.tableBody.forEach(({ cells }) => {
            cells = cells.map(({ value }) => value)
            featureMd.push(`| ${cells.join(' | ')} |`)
          })
        }
      })
    }
  })

  return featureMd.join('\n')
}
