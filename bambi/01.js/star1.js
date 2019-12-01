let dev = false

let fs = require('fs')
let path = require('path')

let path_str = path.join(__dirname, '..', 'inputs', path.basename(__dirname, '.js') + (dev ? 'ex.' : '') + '.txt')
let content = fs.readFileSync(path_str).toString().trim().replace("\r", '').split("\n")

let output = content.reduce((sum, item) => {
  return sum + (Math.floor(item / 3) - 2)
}, 0)

console.log('star1', output)
