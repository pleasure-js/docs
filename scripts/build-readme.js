const { parseAvaFile, avaTestsToMd } = require('../')
const path = require('path')
const fs = require('fs')

parseAvaFile(path.join(__dirname, '../test/guide.test.js'))
  .then(avaTests => {
    fs.writeFileSync(path.join(__dirname, '../README.md'), avaTestsToMd(avaTests))
  })
