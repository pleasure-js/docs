# pleasure-docs

> Better docs for software dev
>
> [![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![size][size]][size-url]
[![vulnerabilities][vulnerabilities]][vulnerabilities-url]
[![license][license]][license-url]

### Members

<dl>
<dt><a href="#installation">Installation</a></dt>
<dd></dd>
<dt><a href="#usage">Usage</a></dt>
<dd></dd>
</dl>

### Functions

<dl>
<dt><a href="#strip-jsdoc-comment">stripJsdocComment(jsDocCommentBlock)</a> ⇒ <code>String</code></dt>
<dd><p>Removes all asterisks and additional white spaces from JSDoc comments</p>
</dd>
<dt><a href="#parse-ava">parseAva(avaString, [options])</a> ⇒ <code><a href="#ava-test">Array.&lt;AvaTest&gt;</a></code></dt>
<dd><p>Parses given AVA test source code</p>
</dd>
<dt><a href="#parse-ava-file">parseAvaFile(file, [options])</a> ⇒ <code>Promise.&lt;Array.&lt;AvaTest&gt;&gt;</code></dt>
<dd><p>Parses given AVA file</p>
</dd>
<dt><a href="#parse-ava-file-sync">parseAvaFileSync(file, [options])</a> ⇒ <code><a href="#ava-test">Array.&lt;AvaTest&gt;</a></code></dt>
<dd><p>Parses given AVA file synchronously</p>
</dd>
<dt><a href="#parse-gherkin">parseGherkin(rawGherkinSyntax)</a> ⇒ <code><a href="#cucumber-feature">Promise.&lt;CucumberFeature&gt;</a></code></dt>
<dd><p>Parses given gherkin syntax</p>
</dd>
<dt><a href="#parse-feature-file">parseFeatureFile(featureFile)</a> ⇒ <code><a href="#cucumber-feature">Promise.&lt;CucumberFeature&gt;</a></code></dt>
<dd><p>Parses given <code>.feature</code> file</p>
</dd>
<dt><a href="#cucumber-feature-to-md">cucumberFeatureToMd(cucumberFeature, [options])</a> ⇒ <code>String</code></dt>
<dd><p>Parses given <a href="#cucumber-feature">CucumberFeature</a> into markdown</p>
</dd>
<dt><a href="#ava-test-to-md">avaTestToMd(AvaTest, [options])</a> ⇒ <code>String</code></dt>
<dd><p>Parses give <a href="#ava-test">AvaTest</a> into markdown</p>
</dd>
<dt><a href="#ava-tests-to-md">avaTestsToMd(AvaTests, [options])</a> ⇒ <code>String</code></dt>
<dd><p>Parses given <a href="#ava-test">AvaTest</a>&#39;s into markdown</p>
</dd>
<dt><a href="#js-doc-syntax-to-json">jsDocSyntaxToJson(source, [options])</a> ⇒ <code><a href="#js-doc-element">Array.&lt;JSDocElement&gt;</a></code></dt>
<dd><p>Converts given js code with jsdoc annotations into a <a href="#js-doc-element">JSDocElement</a></p>
</dd>
<dt><a href="#js-doc-syntax-to-json-async">jsDocSyntaxToJsonAsync(source, [options])</a> ⇒</dt>
<dd></dd>
<dt><a href="#jsdoc-json-to-markdown">jsdocJsonToMarkdown(JSDocJson, [options])</a> ⇒ <code>String</code></dt>
<dd><p>Renders given jsdoc object into a markdown string using dmd-clear, dmd-clean and pleasure-docs-dmd</p>
</dd>
</dl>

### Typedefs

<dl>
<dt><a href="#ava-test">AvaTest</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#cucumber-feature">CucumberFeature</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#feature-scenario">FeatureScenario</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#scenario-step">ScenarioStep</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#feature-tag">FeatureTag</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#scenario-example">ScenarioExample</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#js-doc-element">JSDocElement</a> : <code>Object</code></dt>
<dd><p>Item type of the items returned by <code>jsdoc-api.explainAsync</code> and <code>jsdoc-api.explain</code></p>
</dd>
</dl>


<br><a name="installation"></a>

### Installation
```
npm install dmd-readable
```

<br><a name="usage"></a>

### Usage
Pass the plug-in name to [`jsdoc2md`](https://github.com/jsdoc2md/jsdoc-to-markdown) or [`dmd`](https://github.com/jsdoc2md/dmd):

```
jsdoc2md --plugin dmd-readable
```

This plugin (which was used to generate this readme) does a few things:
- removes global indexes (see below)
- places descriptions in block-quotes (Use @summary for descriptions without block quotes)
- adds more whitespace before headings
- changes the delimiter for multiple types in param tables to a comma
- adds alias output

The removal of global indexes is now a setting in the [template](docs.hbs). If you are using your own template and you wish to retain this feature, add the following line to your template:

```
{{optionSet "global-index-format" "none"~}}
```

All options for global-index-format are "none", "grouped", "table", "dl". Other options and more info can be found [here](https://github.com/jsdoc2md/jsdoc-to-markdown/blob/master/docs/API.md#jsdoctomarkdown-).

This plugin also provides the following helper functions:

<br><a name="strip-jsdoc-comment"></a>

### stripJsdocComment(jsDocCommentBlock) ⇒ <code>String</code>
> Removes all asterisks and additional white spaces from JSDoc comments

**Returns**: <code>String</code> - The comment without the asterisks  

| Param | Type |
| --- | --- |
| jsDocCommentBlock | <code>String</code> | 

**Example**  
```js
const jsDocSyntax = `/**
 * A JSDoc description
 * @typedef {Object} Test
 **\/`
```

<br><a name="ava-test"></a>

### AvaTest : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | The AVA test title wrapped inside of the test function |
| description | <code>String</code> | The feature description (if any) added above the test as a JSDoc comment |
| code | <code>String</code> | The code found in the test. |
| flag | <code>String</code> | Either `'skip'`, `'only'`, `'todo'` or `null` for none; |


<br><a name="parse-ava"></a>

### parseAva(avaString, [options]) ⇒ [<code>Array.&lt;AvaTest&gt;</code>](#ava-test)
> Parses given AVA test source code

**Returns**: [<code>Array.&lt;AvaTest&gt;</code>](#ava-test) - The tests found in the source code  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| avaString | <code>String</code> |  | The source of the AVA test file |
| [options] | <code>Object</code> |  |  |
| options.unIndent | <code>Number</code> | <code>2</code> | Positive integer in which the code will be un-indented |
| options.testName | <code>String</code> | <code>test</code> | The name of the test function to look-up into the code |


<br><a name="parse-ava-file"></a>

### parseAvaFile(file, [options]) ⇒ <code>Promise.&lt;Array.&lt;AvaTest&gt;&gt;</code>
> Parses given AVA file


| Param | Type | Description |
| --- | --- | --- |
| file | <code>String</code> | Path to the AVA file |
| [options] | <code>Object</code> | Same options as in [parseAva](#parse-ava) |


<br><a name="parse-ava-file-sync"></a>

### parseAvaFileSync(file, [options]) ⇒ [<code>Array.&lt;AvaTest&gt;</code>](#ava-test)
> Parses given AVA file synchronously


| Param | Type | Description |
| --- | --- | --- |
| file | <code>String</code> | Path to the AVA file |
| [options] | <code>Object</code> | Same options as in [parseAva](#parse-ava) |


<br><a name="cucumber-feature"></a>

### CucumberFeature : <code>Object</code>
**See**: [https://cucumber.io/docs/gherkin/reference/](https://cucumber.io/docs/gherkin/reference/)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| feature | <code>Object</code> | The cucumber feature |
| feature.language | <code>String</code> | The language in which the feature is written. |
| feature.name | <code>String</code> | Feature name |
| feature.description | <code>String</code> | Feature description |
| feature.children | [<code>Array.&lt;FeatureScenario&gt;</code>](#feature-scenario) |  |
| comments | <code>Array</code> | Array of comments |


<br><a name="feature-scenario"></a>

### FeatureScenario : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the scenario |
| tags | [<code>Array.&lt;FeatureTag&gt;</code>](#feature-tag) | The tags |
| steps | [<code>Array.&lt;ScenarioStep&gt;</code>](#scenario-step) | The steps |
| examples | [<code>Array.&lt;ScenarioExample&gt;</code>](#scenario-example) | Array of examples |


<br><a name="scenario-step"></a>

### ScenarioStep : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| keyword | <code>String</code> | The keyword. I.e: Given, When, Then. |
| text | <code>String</code> | The tag name |
| [argument] | <code>Object</code> | Optional argument |


<br><a name="feature-tag"></a>

### FeatureTag : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The tag name |


<br><a name="scenario-example"></a>

### ScenarioExample : <code>Object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The example name |
| keyword | <code>String</code> | The keyword of the example |
| tableHeader | <code>Object</code> | Content of the table header, if any. |
| tableBody | <code>Object</code> | Content of the table body, if any. |


<br><a name="parse-gherkin"></a>

### parseGherkin(rawGherkinSyntax) ⇒ [<code>Promise.&lt;CucumberFeature&gt;</code>](#cucumber-feature)
> Parses given gherkin syntax


| Param | Type | Description |
| --- | --- | --- |
| rawGherkinSyntax | <code>String</code> | The string source of the gherkin feature |


<br><a name="parse-feature-file"></a>

### parseFeatureFile(featureFile) ⇒ [<code>Promise.&lt;CucumberFeature&gt;</code>](#cucumber-feature)
> Parses given `.feature` file


| Param | Type | Description |
| --- | --- | --- |
| featureFile | <code>String</code> | Path to the `.feature` file |


<br><a name="cucumber-feature-to-md"></a>

### cucumberFeatureToMd(cucumberFeature, [options]) ⇒ <code>String</code>
> Parses given [CucumberFeature](#cucumber-feature) into markdown

**Returns**: <code>String</code> - The markdown text  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cucumberFeature | [<code>CucumberFeature</code>](#cucumber-feature) |  | The cucumber feature |
| [options] | <code>Object</code> |  |  |
| options.scenarioHeadingLevel | <code>Number</code> | <code>2</code> | How many '#' prefixes an scenario title |

**Example** *(Parsing a &#x60;.feature&#x60; file.)*  

```js
const { parseFeatureFile, cucumberFeatureToMd } = require('@pleasure-js/docs')

parseFeatureFile('/path/to/feature-file.feature')
  .then(cucumberFeature => {
    console.log(cucumberFeatureToMd(cucumberFeature))
  })
```

<br><a name="ava-test-to-md"></a>

### avaTestToMd(AvaTest, [options]) ⇒ <code>String</code>
> Parses give [AvaTest](#ava-test) into markdown

**Returns**: <code>String</code> - The markdown string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| AvaTest | [<code>AvaTest</code>](#ava-test) |  | The [AvaTest](#ava-test) |
| [options] | <code>Object</code> |  |  |
| options.headingLevel | <code>Number</code> | <code>1</code> | How many `#` for the test title |
| [options.withFlag] | <code>Boolean</code>, <code>function</code> | <code>true</code> | Whether to append or not the test flag at the end of the |


<br><a name="ava-tests-to-md"></a>

### avaTestsToMd(AvaTests, [options]) ⇒ <code>String</code>
> Parses given [AvaTest](#ava-test)'s into markdown


| Param | Type | Description |
| --- | --- | --- |
| AvaTests | [<code>Array.&lt;AvaTest&gt;</code>](#ava-test) | An array of [AvaTest](#ava-test)'s |
| [options] | <code>Object</code> | The [avaTestToMd](#ava-test-to-md) options |


<br><a name="js-doc-element"></a>

### JSDocElement : <code>Object</code>
> Item type of the items returned by `jsdoc-api.explainAsync` and `jsdoc-api.explain`


<br><a name="js-doc-syntax-to-json"></a>

### jsDocSyntaxToJson(source, [options]) ⇒ [<code>Array.&lt;JSDocElement&gt;</code>](#js-doc-element)
> Converts given js code with jsdoc annotations into a [JSDocElement](#js-doc-element)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>String</code> |  | The JS code containing jsdoc annotations |
| [options] | <code>Object</code> |  |  |
| options.removeElementsWithoutId | <code>Boolean</code> | <code>false</code> | Whether to remove elements without an id or not |
| options.filterUndocumented | <code>Boolean</code> | <code>true</code> | Whether to remove undocumented elements |
| options.resolveIds | <code>Boolean</code> | <code>true</code> | Whether to auto-resolve ids for elements without one or not. `false` when `removeElementsWithoutId=true` |


<br><a name="js-doc-syntax-to-json-async"></a>

### jsDocSyntaxToJsonAsync(source, [options]) ⇒
**Returns**: Promise.<JSDocElement[]>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>String</code> |  | The JS code containing jsdoc annotations |
| [options] | <code>Object</code> |  |  |
| options.removeElementsWithoutId | <code>Boolean</code> | <code>false</code> | Whether to remove elements without an id or not |
| options.filterUndocumented | <code>Boolean</code> | <code>true</code> | Whether to remove undocumented elements |
| options.resolveIds | <code>Boolean</code> | <code>true</code> | Whether to auto-resolve ids for elements without one or not. `false` when `removeElementsWithoutId=true` |


<br><a name="jsdoc-json-to-markdown"></a>

### jsdocJsonToMarkdown(JSDocJson, [options]) ⇒ <code>String</code>
> Renders given jsdoc object into a markdown string using dmd-clear, dmd-clean and pleasure-docs-dmd

**Returns**: <code>String</code> - The markdown render  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| JSDocJson | <code>Object</code> |  |  |
| [options] | <code>Object</code> |  |  |
| options.template | <code>String</code> | <code>JSDocJsonToMarkdownTemplates.readme</code> |  |
| options.plugin | <code>Array.&lt;String&gt;</code> | <code>[&#x27;dmd-clear&#x27;,</code> | 'dmd-clean', 'dmd-readable'] |


[npm]: https://img.shields.io/npm/v/pleasure-docs.svg
[npm-url]: https://npmjs.com/package/pleasure-docs
[deps]: https://david-dm.org/darrenpaulwright/pleasure-docs.svg
[deps-url]: https://david-dm.org/darrenpaulwright/pleasure-docs
[size]: https://packagephobia.now.sh/badge?p&#x3D;pleasure-docs
[size-url]: https://packagephobia.now.sh/result?p&#x3D;pleasure-docs
[vulnerabilities]: https://snyk.io/test/github/DarrenPaulWright/pleasure-docs/badge.svg?targetFile&#x3D;package.json
[vulnerabilities-url]: https://snyk.io/test/github/DarrenPaulWright/pleasure-docs?targetFile&#x3D;package.json
[license]: https://img.shields.io/github/license/DarrenPaulWright/pleasure-docs.svg
[license-url]: https://npmjs.com/package/pleasure-docs/LICENSE.md
