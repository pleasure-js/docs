const path = require('path')

const fromTestDirectory = (...paths) => {
  return path.resolve(__dirname, '../', ...paths)
}

module.exports = {
  fromTestDirectory
}
