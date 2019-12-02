let dev = false

let fs = require('fs')
let path = require('path')

let path_str = path.join(__dirname, '..', 'inputs', path.basename(__dirname, '.js') + (dev ? '.ex' : '') + '.txt')
let content = fs.readFileSync(path_str).toString().trim().replace("\r", '').split("\n")

let calc = (item) => {
  return (Math.floor(item / 3) - 2)
}

let output = content.reduce((sum, item) => {
  let fuel = 0
  let last_fuel = calc(item)
  while (last_fuel > 0) {
    fuel += last_fuel
    last_fuel = calc(last_fuel)
  }
  return sum + fuel
}, 0)

console.log('star2', output)
