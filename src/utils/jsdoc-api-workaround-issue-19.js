import { explainSync as _explainSync, explain as _explain } from 'jsdoc-api'
import path from 'path'
import fs from 'fs'
import os from 'os'

const tmpDirHasLeadingUnderscore = () => /\/_/.test(os.tmpdir())

/**
 * Quick fix for jsdoc-api issue#19
 *
 * @desc The issue occurs only when using the jsdoc API with the source code option
 * leaving the default jsdoc option `source.excludePattern`
 * on systems with a temp directory that has a leading underscore anywhere in its path
 *
 * @see https://github.com/jsdoc2md/jsdoc-api/issues/19
 * @see https://github.com/jsdoc/jsdoc/issues/1712
 * @private
 */

/**
 * @typedef {Object} JSDocOptions
 * @see https://github.com/jsdoc2md/jsdoc-api#jsdoc-apijsdocoptions
 * @property {String} source - JS source code
 * @property {String} configure - Path to jsdoc config file
 * @property {Boolean} $workaroundIssue19 - Whether the fix was applied or not
 * @private
 */

/**
 * Prepares jsdoc options for fix  applying
 * @param {JSDocOptions} options
 * @return {JSDocOptions} Fixed options
 * @private
 */
function fixOptions (options) {
  if (!options.source || options.configure || !tmpDirHasLeadingUnderscore()) {
    return options
  }

  options.$workaroundIssue19 = true
  options.configure = path.join(os.tmpdir(), 'jsdoc-api-workaround.json')

  setupTemporaryFile(options)

  return options
}

/**
 * Spins a temporary jsdoc config file that automatically clears the option value in `source.excludePattern`
 * @param {JSDocOptions} options
 * @private
 */
function setupTemporaryFile (options) {
  const jsDocConfig = JSON.parse(fs.readFileSync(require.resolve('jsdoc/conf.json.EXAMPLE')).toString())
  jsDocConfig.source.excludePattern = ''

  fs.writeFileSync(options.configure, JSON.stringify(jsDocConfig, null, 2))
}

/**
 * Clean up the temporary created file (if any)
 * @param {JSDocOptions} options
 * @private
 */
function workaroundCleanup (options) {
  if (options.$workaroundIssue19) {
    fs.unlinkSync(options.configure)
  }
}

/**
 * Display user-friendly error
 * @param {Error} err
 * @param {JSDocOptions} options
 * @private
 */
function handleError (err, options) {
  if (err.message === 'There are no input files to process.' && options.source && !options.$workaroundIssue19 && tmpDirHasLeadingUnderscore()) {
    // warn user about the known issue
    console.log('  WARNING!!!')
    console.log('  Be aware of issue: https://github.com/jsdoc/jsdoc/issues/1712')
    console.log('  And its workaround described here: https://github.com/jsdoc2md/jsdoc-api/issues/19')
  }
}

/**
 * @see https://github.com/jsdoc2md/jsdoc-api#module_jsdoc-api.explainSync
 * @private
 */
export function explainSync (options) {
  let errored
  let res
  options = fixOptions(options)

  try {
    res = _explainSync(options)
  } catch (err) {
    errored = err
    handleError(err, options)
  }
  workaroundCleanup(options)
  if (errored) {
    throw errored
  }
  if (res) {
    res.pop()
  }
  return res
}

/**
 * @see https://github.com/jsdoc2md/jsdoc-api#jsdocexplainoptions--promise
 * @private
 */
export async function explain (options) {
  let errored
  let res
  options = fixOptions(options)

  try {
    res = await _explain(options)
  } catch (err) {
    errored = err
    handleError(err, options)
  }
  workaroundCleanup(options)
  if (errored) {
    throw errored
  }
  if (res) {
    res.pop()
  }
  return res
}
