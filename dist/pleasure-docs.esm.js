/*!
 * pleasure-docs v1.0.0
 * (c) 2019-2019 Martin Rafael <tin@devtin.io>
 * MIT
 */
import fs, { readFile } from 'fs';
import path from 'path';
import util from 'util';
import trim from 'lodash/trim';
import { Parser, AstBuilder, TokenMatcher, TokenScanner } from 'gherkin';
import { explainSync as explainSync$1, explain as explain$1 } from 'jsdoc-api';
import os from 'os';
import kebabCase from 'lodash/kebabCase';
import json2md from 'jsdoc-to-markdown';

/**
 * @name Installation
 * @summary
 *
 * ```
 * npm install pleasure-docs
 * ```
 */

/**
 * @name Usage
 * @summary
 * Pass the plug-in name to [`jsdoc2md`](https://github.com/jsdoc2md/jsdoc-to-markdown) or [`dmd`](https://github.com/jsdoc2md/dmd):
 *
 * ```
 * jsdoc2md --plugin dmd-readable
 * ```
 *
 * This plugin (which was used to generate this readme) does a few things:
 * - removes global indexes (see below)
 * - places descriptions in block-quotes (Use @summary for descriptions without block quotes)
 * - adds more whitespace before headings
 * - changes the delimiter for multiple types in param tables to a comma
 * - adds alias output
 *
 * The removal of global indexes is now a setting in the [template](docs.hbs). If you are using your own template and you wish to retain this feature, add the following line to your template:
 *
 * ```
 * {{optionSet "global-index-format" "none"~}}
 * ```
 *
 * All options for global-index-format are "none", "grouped", "table", "dl". Other options and more info can be found [here](https://github.com/jsdoc2md/jsdoc-to-markdown/blob/master/docs/API.md#jsdoctomarkdown-).
 *
 * This plugin also provides the following helper functions:
 *
 */

const PleasureDocs = true;

const readFileAsync = util.promisify(readFile);

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
 *  * @typedef {Object} Test
 *  **\/`
 * ```
 */
function stripJsdocComment (jsDocCommentBlock) {
  return trim(jsDocCommentBlock.replace(/^ \* /mgsi, ''))
}

const availableFlags = ['skip', 'only', 'todo'];
const patterns = {
  findComment: `/\\*\\*(?:\\\\\\n)?(.*?)\\n \\*/`,
  findStatusAndTitle: `^<test-name>(?:\\.(${ availableFlags.join('|') }))?\\((["'\`])([^\\n]+)\\3`,
  findCode: `(?:(?<=^<test-name>[^\\n]*)[\\s]*,[\\s]*[^\\{]*\\{\\n(.*?)\\n\\})?`
};

/**
 * @typedef {Object} AvaTest
 * @property {String} title - The AVA test title wrapped inside of the test function
 * @property {String} description - The feature description (if any) added above the test as a JSDoc comment
 * @property {String} code - The code found in the test.
 * @property {String} flag - Either `'skip'`, `'only'`, `'todo'` or `null` for none;
 */

/**
 * Parses given AVA test source code
 * @param {String} avaString - The source of the AVA test file
 * @param {Object} [options]
 * @param {Number} options.unIndent=2 - Positive integer in which the code will be un-indented
 * @param {String} options.testName=test - The name of the test function to look-up into the code
 * @return {AvaTest[]} The tests found in the source code
 *
 * @example
 *
 * Given
 *
 * ```js
 *
 * ```
 *
 * ```js
 *
 * ```
 */
function parseAva (avaString, { unIndent = 2, testName = 'test' } = {}) {
  const { findComment, findStatusAndTitle, findCode } = patterns;
  const avaTestPatternText = [
    `(?:${ findComment }[\\s]+)?`,
    findStatusAndTitle.replace('<test-name>', testName),
    findCode.replace('<test-name>', testName)
  ].join('');
  const avaTestsPattern = new RegExp(avaTestPatternText, 'gsmi');

  const testsWithCode = [];
  let testBlock;
  while ((testBlock = avaTestsPattern.exec(avaString)) !== null) {
    // build ava test parts
    const title = testBlock[4].replace(new RegExp(`\\\\${ testBlock[3] }`, 'g'), testBlock[3]);
    const description = testBlock[1] ? stripJsdocComment(testBlock[1]) : null;
    const code = testBlock[5] ? testBlock[5].replace(new RegExp(`^ {${ unIndent }}`, 'mgsi'), '') : null;
    const flag = testBlock[2] || null;
    testsWithCode.push({
      title,
      description,
      code,
      flag
    });
  }
  return testsWithCode
}

/**
 * Parses given AVA file
 * @async
 * @param {String} file - Path to the AVA file
 * @param {Object} [options] - Same options as in {@link parseAva}
 * @return {Promise<AvaTest[]>}
 */
async function parseAvaFile (file, options) {
  return parseAva((await readFileAsync(path.resolve(process.cwd(), file))).toString(), options)
}

/**
 * Parses given AVA file synchronously
 * @param {String} file - Path to the AVA file
 * @param {Object} [options] - Same options as in {@link parseAva}
 * @return {AvaTest[]}
 */
function parseAvaFileSync (file, options) {
  return parseAva(fs.readFileSync(path.resolve(process.cwd(), file)).toString(), options)
}

const GherkinParser = new Parser(new AstBuilder());
const matcher = new TokenMatcher();

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
async function parseGherkin (rawGherkinSyntax) {
  const scanner = new TokenScanner(rawGherkinSyntax);
  return GherkinParser.parse(scanner, matcher)
}

/**
 * Parses given `.feature` file
 * @param {String} featureFile - Path to the `.feature` file
 * @return {Promise<CucumberFeature>}
 */
async function parseFeatureFile (featureFile) {
  return parseGherkin((await readFileAsync(featureFile)).toString())
}

/**
 * Parses given {@link CucumberFeature} into markdown
 * @param {CucumberFeature} cucumberFeature - The cucumber feature
 * @param {Object} [options]
 * @param {Number} options.scenarioHeadingLevel=2 - How many '#' prefixes an scenario title
 * @return {String} The markdown text
 *
 * @example <caption>Parsing a `.feature` file.</caption>
 *
 * ```js
 * const { parseFeatureFile, cucumberFeatureToMd } = require('pleasure-docs')
 *
 * parseFeatureFile('/path/to/feature-file.feature')
 *   .then(cucumberFeature => {
 *     console.log(cucumberFeatureToMd(cucumberFeature))
 *   })
 * ```
 */
function cucumberFeatureToMd (cucumberFeature, { scenarioHeadingLevel = 2 } = {}) {
  const { feature } = cucumberFeature;
  const featureMd = [`# ${ trim(feature.name) }\n\n${ trim(feature.description.split('\n').map(trim).join('\n')) }`];

  // scenarios
  feature.children.forEach(scenario => {
    featureMd.push(`\n${ '#'.repeat(scenarioHeadingLevel) } ${ trim(scenario.name) }\n`);

    // steps
    scenario.steps.forEach(step => {
      featureMd.push(`**${ trim(step.keyword) }** ${ step.text }  `);
      if (step.argument && step.argument.type === 'DocString') {
        featureMd.push('\n```\n' + step.argument.content + '\n```\n');
      }
    });

    // examples
    if (scenario.examples) {
      scenario.examples.forEach(example => {
        featureMd.push(`\n**${ trim(example.keyword) }**${ example.name ? ': ' + example.name : '' }\n`);
        if (example.tableHeader) {
          const head = example.tableHeader.cells.map(({ value }) => value);
          const sep = head.map(() => `:---`);
          featureMd.push(`| ${ head.join(' | ') } |`);
          featureMd.push(`| ${ sep.join(' | ') } |`);
          example.tableBody.forEach(({ cells }) => {
            cells = cells.map(({ value }) => value);
            featureMd.push(`| ${ cells.join(' | ') } |`);
          });
        }
      });
    }
  });

  return featureMd.join(`\n`)
}

function jsCodeToMd (jsCode) {
  // return '```js\n' + jsCode + '\n```'
  // breakdown jsdoc comments (no need for JSdoc in tests at the end, right?)
  const pattern = new RegExp(patterns.findComment, 'msgi');
  return [
    '```js\n',
    jsCode.replace(pattern, (match, comment) => {
      // console.log({ match, comment })
      // return comment
      return '\n```\n\n' + stripJsdocComment(comment) + '\n\n```js\n'
    }),
    '\n```']
    .join('')
    .replace(/[\n]*```js\n\n```[\n]*/mgs, '\n\n')
    .replace(/```js[\n]+/g, '```js\n')
    .replace(/[\n]*```$/mgs, '\n```')
}

/**
 * Parses give {@link AvaTest} into markdown
 * @param {AvaTest} AvaTest - The {@link AvaTest}
 * @param {Object} [options]
 * @param {Number} options.headingLevel=1 - How many `#` for the test title
 * @param {Boolean|Function} [options.withFlag=true] - Whether to append or not the test flag at the end of the
 * @return {String} The markdown string
 */
function avaTestToMd (AvaTest, { headingLevel = 1, withFlag = true, codeParser = jsCodeToMd } = {}) {
  const { title, description, code, flag } = AvaTest;

  const mdTitle = `${ '#'.repeat(headingLevel) } ${ title }${ withFlag && flag ? ' *(' + flag + ')*' : '' }`;
  const mdCode = code ? codeParser(code) : '';

  const markdown = [mdTitle];

  if (description) {
    markdown.push(description);
  }

  if (mdCode) {
    markdown.push(mdCode);
  }

  return markdown.join(`\n\n`)
}

/**
 * Parses given {@link AvaTest}'s into markdown
 * @param {AvaTest[]} AvaTests - An array of {@link AvaTest}'s
 * @param {Object} [options] - The {@link avaTestToMd} options
 * @return {String}
 */
function avaTestsToMd (AvaTests, options) {
  return AvaTests.map(avaTest => avaTestToMd(avaTest, options)).join('\n\n')
}

const tmpDirHasLeadingUnderscore = () => /\/_/.test(os.tmpdir());

/**
 * Quick fix for jsdoc-api issue#19
 *
 * @desc The issue occurs only when using the jsdoc API with the source code option
 * leaving the default jsdoc option `source.excludePattern`
 * on systems with a temp directory that has a leading underscore anywhere in its path
 *
 * @see https://github.com/jsdoc2md/jsdoc-api/issues/19
 * @see https://github.com/jsdoc/jsdoc/issues/1712
 * @private
 */

/**
 * @typedef {Object} JSDocOptions
 * @see https://github.com/jsdoc2md/jsdoc-api#jsdoc-apijsdocoptions
 * @property {String} source - JS source code
 * @property {String} configure - Path to jsdoc config file
 * @property {Boolean} $workaroundIssue19 - Whether the fix was applied or not
 * @private
 */

/**
 * Prepares jsdoc options for fix  applying
 * @param {JSDocOptions} options
 * @return {JSDocOptions} Fixed options
 * @private
 */
function fixOptions (options) {
  if (!options.source || options.configure || !tmpDirHasLeadingUnderscore()) {
    return options
  }

  options.$workaroundIssue19 = true;
  options.configure = path.join(os.tmpdir(), 'jsdoc-api-workaround.json');

  setupTemporaryFile(options);

  return options
}

/**
 * Spins a temporary jsdoc config file that automatically clears the option value in `source.excludePattern`
 * @param {JSDocOptions} options
 * @private
 */
function setupTemporaryFile (options) {
  const jsDocConfig = JSON.parse(fs.readFileSync(require.resolve('jsdoc/conf.json.EXAMPLE')).toString());
  jsDocConfig.source.excludePattern = '';

  fs.writeFileSync(options.configure, JSON.stringify(jsDocConfig, null, 2));
}

/**
 * Clean up the temporary created file (if any)
 * @param {JSDocOptions} options
 * @private
 */
function workaroundCleanup (options) {
  if (options.$workaroundIssue19) {
    fs.unlinkSync(options.configure);
  }
}

/**
 * Display user-friendly error
 * @param {Error} err
 * @param {JSDocOptions} options
 * @private
 */
function handleError (err, options) {
  if (err.message === 'There are no input files to process.' && options.source && !options.$workaroundIssue19 && tmpDirHasLeadingUnderscore()) {
    // warn user about the known issue
    console.log(`  WARNING!!!`);
    console.log(`  Be aware of issue: https://github.com/jsdoc/jsdoc/issues/1712`);
    console.log(`  And its workaround described here: https://github.com/jsdoc2md/jsdoc-api/issues/19`);
  }
}

/**
 * @see https://github.com/jsdoc2md/jsdoc-api#module_jsdoc-api.explainSync
 * @private
 */
function explainSync (options) {
  let errored;
  let res;
  options = fixOptions(options);

  try {
    res = explainSync$1(options);
  } catch (err) {
    errored = err;
    handleError(err, options);
  }
  workaroundCleanup(options);
  if (errored) {
    throw errored
  }
  if (res) {
    res.pop();
  }
  return res
}

/**
 * @see https://github.com/jsdoc2md/jsdoc-api#jsdocexplainoptions--promise
 * @private
 */
async function explain (options) {
  let errored;
  let res;
  options = fixOptions(options);

  try {
    res = await explain$1(options);
  } catch (err) {
    errored = err;
    handleError(err, options);
  }
  workaroundCleanup(options);
  if (errored) {
    throw errored
  }
  if (res) {
    res.pop();
  }
  return res
}

function removeUndocumented(jsDocElements) {
  return jsDocElements.filter(docEle => !docEle.undocumented)
}

function removeElementsWithoutAnId (jsDocElements) {
  return jsDocElements.filter(docEle => !!docEle.id)
}

function autoResolveIds (jsDocElements) {
  return jsDocElements.map(docEle => {
    if (!docEle.id) {
      docEle.id = kebabCase(docEle.name);
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

function jsDocSyntaxToJson (source, { resolveIds = true, filterUndocumented = true, removeElementsWithoutId = false } = {}) {
  let res = explainSync({ source });
  if (filterUndocumented) {
    res = removeUndocumented(res);
  }
  if (removeElementsWithoutId) {
    res = removeElementsWithoutAnId(res);
  } else if (resolveIds) {
    res = autoResolveIds(res);
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

async function jsDocSyntaxToJsonAsync (source, { resolveIds = true, filterUndocumented = true, removeElementsWithoutId = false } = {}) {
  let res = await explain({ source });
  if (filterUndocumented) {
    res = removeUndocumented(res);
  }
  if (removeElementsWithoutId) {
    res = removeElementsWithoutAnId(res);
  } else if (resolveIds) {
    res = autoResolveIds(res);
  }
  return res
}

/**
 * @enum {Object} JSDocJsonToMarkdownTemplates
 * @property {String} main - Main template only for function descriptions
 * @property {String} readme - Full readme template with header, indexes and descriptions
 * @private
 */
const JSDocJsonToMarkdownTemplates = (() => {
  const main = `{{>main}}`;

  const readme = `{{optionSet "heading-depth" 3~}}
# {{package "name"}}

> {{package "description"}}
>
> {{#each (package "badges")}}[![{{this.name}}][{{this.name}}]][{{this.name}}-url]
  {{/each}}
  
{{>meta-header}}

{{>main}}

{{#each (package "badges")}}
[{{this.name}}]: {{this.image}}
[{{this.name}}-url]: {{this.url}}
{{/each}}`;

  return {
    main,
    readme
  }
})();

/**
 * Renders given jsdoc object into a markdown string using dmd-clear, dmd-clean and pleasure-docs-dmd
 * @param {Object} JSDocJson
 * @param {Object} [options]
 * @param {String} options.template=JSDocJsonToMarkdownTemplates.readme
 * @param {String[]} options.plugin=['dmd-clear', 'dmd-clean', 'dmd-readable']
 * @return {String} The markdown render
 */
function jsdocJsonToMarkdown (JSDocJson, { template = JSDocJsonToMarkdownTemplates.readme, plugin = ['dmd-clear', 'dmd-clean', 'dmd-readable'] } = {}) {

  return json2md.renderSync({
    data: JSDocJson,
    template,
    plugin
  })
}

export { PleasureDocs, avaTestToMd, avaTestsToMd, cucumberFeatureToMd, jsDocSyntaxToJson, jsDocSyntaxToJsonAsync, jsdocJsonToMarkdown, parseAva, parseAvaFile, parseAvaFileSync, parseFeatureFile, parseGherkin };
