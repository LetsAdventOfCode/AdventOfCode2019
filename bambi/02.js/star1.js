let dev = false

let fs = require('fs')
let path = require('path')

let path_str = path.join(__dirname, '..', 'inputs', path.basename(__dirname, '.js') + (dev ? '.ex' : '') + '.txt')
let content = fs.readFileSync(path_str).toString().split(',').map((x) => { return parseInt(x) })

if (!dev) {
  let patch = [
    1, 12,
    2, 2
  ]
  for (var i = 0; i < patch.length; i+=2) {
    content[patch[i]] = patch[i+1]
  }
}

let pc = 0;
let halt = false;

let next = () => {
  return content[pc++]
}

let v;
while (!halt) {
  let op = next();
  if (op === undefined) { break }

  switch (op) {
    case 1: v = content[next()] + content[next()]; content[next()] = v; break;
    case 2: v = content[next()] * content[next()]; content[next()] = v; break;
    case 99: halt = true; break;
    default: console.error('unknown opcode', op); halt = true; break;
  }
}

console.log('star1', content[0])
