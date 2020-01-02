## Functions

<dl>
<dt><a href="#parseAva">parseAva(avaString, [options])</a> ⇒ <code><a href="#AvaTest">Array.&lt;AvaTest&gt;</a></code></dt>
<dd><p>Parses given AVA test source code</p>
</dd>
<dt><a href="#parseAvaFile">parseAvaFile(file, [options])</a> ⇒ <code>Promise.&lt;Array.&lt;AvaTest&gt;&gt;</code></dt>
<dd><p>Parses given AVA file</p>
</dd>
<dt><a href="#parseAvaFileSync">parseAvaFileSync(file, [options])</a> ⇒ <code><a href="#AvaTest">Array.&lt;AvaTest&gt;</a></code></dt>
<dd><p>Parses given AVA file synchronously</p>
</dd>
<dt><a href="#parseGherkin">parseGherkin(rawGherkinSyntax)</a> ⇒ <code><a href="#CucumberFeature">Promise.&lt;CucumberFeature&gt;</a></code></dt>
<dd><p>Parses given gherkin syntax</p>
</dd>
<dt><a href="#parseFeatureFile">parseFeatureFile(featureFile)</a> ⇒ <code><a href="#CucumberFeature">Promise.&lt;CucumberFeature&gt;</a></code></dt>
<dd><p>Parses given <code>.feature</code> file</p>
</dd>
<dt><a href="#cucumberFeatureToMd">cucumberFeatureToMd(cucumberFeature, [options])</a> ⇒ <code>String</code></dt>
<dd><p>Parses given <a href="#CucumberFeature">CucumberFeature</a> into markdown</p>
</dd>
<dt><a href="#avaTestToMd">avaTestToMd(AvaTest, [options])</a> ⇒ <code>String</code></dt>
<dd><p>Parses give <a href="#AvaTest">AvaTest</a> into markdown</p>
</dd>
<dt><a href="#avaTestsToMd">avaTestsToMd(AvaTests, [options])</a> ⇒ <code>String</code></dt>
<dd><p>Parses given <a href="#AvaTest">AvaTest</a>&#39;s into markdown</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#AvaTest">AvaTest</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#CucumberFeature">CucumberFeature</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FeatureScenario">FeatureScenario</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ScenarioStep">ScenarioStep</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FeatureTag">FeatureTag</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ScenarioExample">ScenarioExample</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="parseAva"></a>

## parseAva(avaString, [options]) ⇒ [<code>Array.&lt;AvaTest&gt;</code>](#AvaTest)
Parses given AVA test source code

**Kind**: global function  
**Returns**: [<code>Array.&lt;AvaTest&gt;</code>](#AvaTest) - The tests found in the source code  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| avaString | <code>String</code> |  | The source of the AVA test file |
| [options] | <code>Object</code> |  |  |
| options.unIndent | <code>Number</code> | <code>2</code> | Positive integer in which the code will be un-indented |
| options.testName | <code>String</code> | <code>test</code> | The name of the test function to look-up into the code |

<a name="parseAvaFile"></a>

## parseAvaFile(file, [options]) ⇒ <code>Promise.&lt;Array.&lt;AvaTest&gt;&gt;</code>
Parses given AVA file

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>String</code> | Path to the AVA file |
| [options] | <code>Object</code> | Same options as in [parseAva](#parseAva) |

<a name="parseAvaFileSync"></a>

## parseAvaFileSync(file, [options]) ⇒ [<code>Array.&lt;AvaTest&gt;</code>](#AvaTest)
Parses given AVA file synchronously

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>String</code> | Path to the AVA file |
| [options] | <code>Object</code> | Same options as in [parseAva](#parseAva) |

<a name="parseGherkin"></a>

## parseGherkin(rawGherkinSyntax) ⇒ [<code>Promise.&lt;CucumberFeature&gt;</code>](#CucumberFeature)
Parses given gherkin syntax

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| rawGherkinSyntax | <code>String</code> | The string source of the gherkin feature |

<a name="parseFeatureFile"></a>

## parseFeatureFile(featureFile) ⇒ [<code>Promise.&lt;CucumberFeature&gt;</code>](#CucumberFeature)
Parses given `.feature` file

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| featureFile | <code>String</code> | Path to the `.feature` file |

<a name="cucumberFeatureToMd"></a>

## cucumberFeatureToMd(cucumberFeature, [options]) ⇒ <code>String</code>
Parses given [CucumberFeature](#CucumberFeature) into markdown

**Kind**: global function  
**Returns**: <code>String</code> - The markdown text  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cucumberFeature | [<code>CucumberFeature</code>](#CucumberFeature) |  | The cucumber feature |
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
<a name="avaTestToMd"></a>

## avaTestToMd(AvaTest, [options]) ⇒ <code>String</code>
Parses give [AvaTest](#AvaTest) into markdown

**Kind**: global function  
**Returns**: <code>String</code> - The markdown string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| AvaTest | [<code>AvaTest</code>](#AvaTest) |  | The [AvaTest](#AvaTest) |
| [options] | <code>Object</code> |  |  |
| options.headingLevel | <code>Number</code> | <code>1</code> | How many `#` for the test title |
| [options.withFlag] | <code>Boolean</code> \| <code>function</code> | <code>true</code> | Whether to append or not the test flag at the end of the |

<a name="avaTestsToMd"></a>

## avaTestsToMd(AvaTests, [options]) ⇒ <code>String</code>
Parses given [AvaTest](#AvaTest)'s into markdown

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| AvaTests | [<code>Array.&lt;AvaTest&gt;</code>](#AvaTest) | An array of [AvaTest](#AvaTest)'s |
| [options] | <code>Object</code> | The [avaTestToMd](#avaTestToMd) options |

<a name="AvaTest"></a>

## AvaTest : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | The AVA test title wrapped inside of the test function |
| description | <code>String</code> | The feature description (if any) added above the test as a JSDoc comment |
| code | <code>String</code> | The code found in the test. |
| flag | <code>String</code> | Either `'skip'`, `'only'`, `'todo'` or `null` for none; |

<a name="CucumberFeature"></a>

## CucumberFeature : <code>Object</code>
**Kind**: global typedef  
**See**: [https://cucumber.io/docs/gherkin/reference/](https://cucumber.io/docs/gherkin/reference/)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| feature | <code>Object</code> | The cucumber feature |
| feature.language | <code>String</code> | The language in which the feature is written. |
| feature.name | <code>String</code> | Feature name |
| feature.description | <code>String</code> | Feature description |
| feature.children | [<code>Array.&lt;FeatureScenario&gt;</code>](#FeatureScenario) |  |
| comments | <code>Array</code> | Array of comments |

<a name="FeatureScenario"></a>

## FeatureScenario : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the scenario |
| tags | [<code>Array.&lt;FeatureTag&gt;</code>](#FeatureTag) | The tags |
| steps | [<code>Array.&lt;ScenarioStep&gt;</code>](#ScenarioStep) | The steps |
| examples | [<code>Array.&lt;ScenarioExample&gt;</code>](#ScenarioExample) | Array of examples |

<a name="ScenarioStep"></a>

## ScenarioStep : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| keyword | <code>String</code> | The keyword. I.e: Given, When, Then. |
| text | <code>String</code> | The tag name |
| [argument] | <code>Object</code> | Optional argument |

<a name="FeatureTag"></a>

## FeatureTag : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The tag name |

<a name="ScenarioExample"></a>

## ScenarioExample : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The example name |
| keyword | <code>String</code> | The keyword of the example |
| tableHeader | <code>Object</code> | Content of the table header, if any. |
| tableBody | <code>Object</code> | Content of the table body, if any. |


* * *

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Martín Rafael González
