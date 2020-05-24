import test from 'ava'
import at2e from './rollup-plugin-ava-test-to-example.js'
import fs from 'fs'

test(`Test plugin`, t => {
  at2e(fs.readFileSync('./rollup-plugin-ava-test-to-example.js').toString())
})
