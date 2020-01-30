import trim from 'lodash/trim'

/**
 * Removes all asterisks and additional white spaces from JSDoc comments
 * @param {String} jsDocCommentBlock
 * @return {String} The comment without the asterisks
 *
 * @example
 *
 * ```js
 * const jsDocSyntax = `/**
 *  * A JSDoc description
 *  *
 *  * Hello
 *  **\/`
 *
 *  // => Outputs:
 *  // A JSDoc description
 *  //
 *  // Hello
 * ```
 */
export function stripJsdocComment (jsDocCommentBlock) {
  return trim(jsDocCommentBlock.replace(/^ \* ?/mgsi, ''))
}
