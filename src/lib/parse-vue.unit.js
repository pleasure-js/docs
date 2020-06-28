import { parseVue } from './parse-vue'
import test from 'ava'
import fs from 'fs'

test('Converts vue components into json', t => {
  const converted = parseVue(fs.readFileSync(benchmark('vue-component.vue')).toString())
  t.truthy(converted)
  t.snapshot(converted)
})
