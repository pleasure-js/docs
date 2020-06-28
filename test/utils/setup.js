import fs from 'fs'
import path from 'path'
import { fromTestDirectory } from './from-test-directory.js'
import unset from 'lodash/unset'

const cleanDocsDynamicValues = (obj) => {
  unset(obj, 'meta.filename')
  unset(obj, 'meta.path')
  return obj
}

function fixture (name) {
  const fixtureFile = path.join(__dirname, '../fixtures', name)
  const benchmarkFile = path.join(__dirname, '../benchmark', name)
  if (!fs.existsSync(fixtureFile) && !fs.existsSync(benchmarkFile)) {
    throw new Error(`Fixture ${path.relative(process.cwd(), fixtureFile)} not found`)
  }

  return fs.existsSync(fixtureFile) ? fixtureFile : benchmarkFile
}

function fixtureRaw (name) {
  return fs.readFileSync(fixture(name)).toString()
}

Object.assign(global, {
  fixture,
  fixtureRaw,
  benchmark: fixture,
  benchmarkRaw: fixtureRaw,
  fromTestDirectory,
  cleanDocsDynamicValues
})
