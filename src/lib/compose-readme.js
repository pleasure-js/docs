import jsdoc2md from 'jsdoc-to-markdown'

/**
 * @param {Object} options
 * @param {String} options.jsSource - Path to js file
 * @param {Object} options.jsdoc2mdOptions
 * @return {Promise<void>}
 */
export async function composeReadme ({ jsSource, jsdoc2mdOptions = { 'no-cache': false } } = {}) {
  /*
  todo:
    - read package.json for config
    - Create plugin pipeline
      - header plugin
        - grab main image url
        - grab title
        - grab description
        - grab badges
      - installation plugin
        - adds installation instruction of the package
      - At a glance plugin
        - embeds at-a-glance.js script (customizable from config)
      - Features plugin
        - Loads and lists tests in test/features.test.js or test/readme.test.js (customizable)
      -

   */
  const options = Object.assign({}, jsdoc2mdOptions, { files: jsSource })
  return jsdoc2md.render(options)
}
