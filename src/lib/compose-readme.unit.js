import { composeReadme } from './compose-readme.js'
import test from 'ava'
import path from 'path'

test('Compose readme', async t => {
  const jsSource = path.join(__dirname, '../../dist/docs.esm.js')
  const processed = await composeReadme({ jsSource })
  t.truthy(processed)
  t.snapshot(processed)
})
