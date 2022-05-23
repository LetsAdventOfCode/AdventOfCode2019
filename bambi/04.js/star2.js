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

  let adj = 0
  let adj_found = false
  let last
  for (let i = 0; i < 6; i++) {
    if (code[i] == last) {
      adj++
    } else {
      if (adj == 1) {
        adj_found = true
      }
      adj = 0
    } 
    if (last !== undefined && code[i] < last) {
      return false
    }
    last = code[i]
  }
  return adj_found || adj == 1
}

let input = []
let range = content.split('-')

for (let i = range[0]; i <= range[1]; i++) {
  input.push(i)
}

let matches = input.filter(filter_valid)
console.log('star2', matches.length)
