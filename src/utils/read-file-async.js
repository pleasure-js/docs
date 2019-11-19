import util from 'util'
import { readFile } from 'fs'

export const readFileAsync = util.promisify(readFile)
