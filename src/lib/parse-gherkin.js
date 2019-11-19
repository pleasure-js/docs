import { Parser, AstBuilder, TokenMatcher, TokenScanner } from 'gherkin'
import { readFileAsync } from 'src/utils/read-file-async.js'
import fs from 'fs'

const GherkinParser = new Parser(new AstBuilder())
const matcher = new TokenMatcher()

/**
 * @typedef {Object} CucumberFeature
 * @property {Object} feature - The cucumber feature
 * @property {String} feature.language - The language in which the feature is written.
 * @property {String} feature.name - Feature name
 * @property {String} feature.description - Feature description
 * @property {FeatureScenario[]} feature.children
 * @property {Array} comments - Array of comments
 * @see {@link https://cucumber.io/docs/gherkin/reference/}
 */

/**
 * @typedef {Object} FeatureScenario
 * @property {String} name - The name of the scenario
 * @property {FeatureTag[]} tags - The tags
 * @property {ScenarioStep[]} steps - The steps
 * @property {ScenarioExample[]} examples - Array of examples
 */

/**
 * @typedef {Object} ScenarioStep
 * @property {String} keyword - The keyword. I.e: Given, When, Then.
 * @property {String} text - The tag name
 * @property {Object} [argument] - Optional argument
 */

/**
 * @typedef {Object} FeatureTag
 * @property {String} name - The tag name
 */

/**
 * @typedef {Object} ScenarioExample
 * @property {String} name - The example name
 * @property {String} keyword - The keyword of the example
 * @property {Object} tableHeader - Content of the table header, if any.
 * @property {Object} tableBody - Content of the table body, if any.
 */

/**
 * Parses given gherkin syntax
 * @param {String} rawGherkinSyntax - The string source of the gherkin feature
 * @return {Promise<CucumberFeature>}
 */
export async function parseGherkin (rawGherkinSyntax) {
  const scanner = new TokenScanner(rawGherkinSyntax)
  return GherkinParser.parse(scanner, matcher)
}

/**
 * Parses given `.feature` file
 * @param {String} featureFile - Path to the `.feature` file
 * @return {Promise<CucumberFeature>}
 */
export async function parseFeatureFile (featureFile) {
  return parseGherkin((await readFileAsync(featureFile)).toString())
}

/**
 * Parses given `.feature` file synchronously
 * @param {String} featureFile - Path to the `.feature` file
 * @return {CucumberFeature}
 */
export async function parseFeatureFileSync (featureFile) {
  return parseGherkin(fs.readFileSync(featureFile).toString())
}
