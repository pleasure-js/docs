import { parseVue } from './parse-vue'
import omit from 'lodash/omit'
import test from 'ava'
import fs from 'fs'

test('Converts vue components into json', t => {
  const converted = parseVue(fs.readFileSync(benchmark('vue-component.vue')).toString())
  t.truthy(converted)
  converted.script.jsdoc = converted.script.jsdoc.map(obj => {
    return omit(obj, 'meta.filename')
  })
  t.snapshot(converted)
})
