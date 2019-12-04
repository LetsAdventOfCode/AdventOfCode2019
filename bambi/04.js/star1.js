let dev = false

let fs = require('fs')
let path = require('path')

let path_str = path.join(__dirname, '..', 'inputs', path.basename(__dirname, '.js') + (dev ? '.ex' : '') + '.txt')
let content = fs.readFileSync(path_str).toString().trim()


let filter_valid = (item) => {
  let code = typeof item == 'string' ? item : item.toString()

  if (code.length != 6) {
    return false
  }

  let adj = false
  let last
  for (let i = 0; i < 6; i++) {
    if (code[i] == last) {
      adj = true
    }
    if (last !== undefined && code[i] < last) {
      return false
    }
    last = code[i]
  }
  return adj
}

let input = []
let range = content.split('-')

for (let i = range[0]; i <= range[1]; i++) {
  input.push(i)
}

let matches = input.filter(filter_valid)
console.log('star1', matches.length)
