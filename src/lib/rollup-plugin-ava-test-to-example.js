import path from 'path'
import { avaTestsToMd } from './ava-test-to-md'
import { parseAvaFile, patterns } from './parse-ava'
import { pathExists } from 'fs-extra'
import util from 'util'
import { stripJsdocComment } from '../utils/strip-js-doc-comment'

const readFile = util.promisify(fs.readFile)

/**
 * Embeds corresponding unit tests into the js-doc @example tag of a js file
 * @return {Function}
 * @example <test
 */
export default function ({ suffix = `*.unit.js` } = {}) {
  const css = []
  let generated = false
  return {
    name: 'rollup-plugin-ava-test-to-example',
    async transform (code, id) {
      if (/\.js$/.test(id)) {
        const unit = id.replace(/\.js$/i, '.unit.js')
        if (await pathExists(unit)) {
          const examples = await avaTestsToMd(await parseAvaFile(unit), {
            codeParser (jsCode) {
              const pattern = new RegExp(patterns.findComment, 'msgi')
              return [
                '```js\n',
                jsCode.replace(pattern, (match, comment) => {
                  // console.log({ match, comment })
                  // return comment
                  return ('\n```\n\n' + stripJsdocComment(comment, '// ') + '\n\n```js\n').replace(/^\/\/ $/mg, '')
                }),
                '\n```']
                .join('')
                .replace(/[\n]*```js\n\n```[\n]*/mgs, '\n\n')
                .replace(/```js[\n]+/g, '```js\n')
                .replace(/[\n]*```$/mgs, '\n```')
            }
          })
          code = code.replace(/^ \* +@example +<test/, examples)
        }
        return { code }
      }
      return null
    }
  }
}
