import { explainSync, explain } from '../utils/jsdoc-api-workaround-issue-19.js'
import kebabCase from 'lodash/kebabCase'

function removeUndocumented (jsDocElements) {
  return jsDocElements.filter(docEle => !docEle.undocumented)
}

function removeElementsWithoutAnId (jsDocElements) {
  return jsDocElements.filter(docEle => !!docEle.id)
}

function autoResolveIds (jsDocElements) {
  return jsDocElements.map(docEle => {
    if (!docEle.id) {
      docEle.id = kebabCase(docEle.name)
    }
    return docEle
  })
}

// todo: define object
/**
 * @typedef {Object} JSDocElement
 * Item type of the items returned by `jsdoc-api.explainAsync` and `jsdoc-api.explain`
 */

/**
 * Converts given js code with jsdoc annotations into a {@link JSDocElement}
 * @param {String} source - The JS code containing jsdoc annotations
 * @param {Object} [options]
 * @param {Boolean} options.removeElementsWithoutId=false - Whether to remove elements without an id or not
 * @param {Boolean} options.filterUndocumented=true - Whether to remove undocumented elements
 * @param {Boolean} options.resolveIds=true - Whether to auto-resolve ids for elements without one or not. `false` when `removeElementsWithoutId=true`
 * @return {JSDocElement[]}
 */

export function jsDocSyntaxToJson (source, { resolveIds = true, filterUndocumented = true, removeElementsWithoutId = false } = {}) {
  let res = explainSync({ source })
  if (filterUndocumented) {
    res = removeUndocumented(res)
  }
  if (removeElementsWithoutId) {
    res = removeElementsWithoutAnId(res)
  } else if (resolveIds) {
    res = autoResolveIds(res)
  }
  return res
}

/**
 *
 * @param {String} source - The JS code containing jsdoc annotations
 * @param {Object} [options]
 * @param {Boolean} options.removeElementsWithoutId=false - Whether to remove elements without an id or not
 * @param {Boolean} options.filterUndocumented=true - Whether to remove undocumented elements
 * @param {Boolean} options.resolveIds=true - Whether to auto-resolve ids for elements without one or not. `false` when `removeElementsWithoutId=true`
 * @return Promise.<JSDocElement[]>
 */

export async function jsDocSyntaxToJsonAsync (source, { resolveIds = true, filterUndocumented = true, removeElementsWithoutId = false } = {}) {
  let res = await explain({ source })
  if (filterUndocumented) {
    res = removeUndocumented(res)
  }
  if (removeElementsWithoutId) {
    res = removeElementsWithoutAnId(res)
  } else if (resolveIds) {
    res = autoResolveIds(res)
  }
  return res
}
