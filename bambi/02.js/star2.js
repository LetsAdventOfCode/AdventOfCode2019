let dev = false

let fs = require('fs')
let path = require('path')

let path_str = path.join(__dirname, '..', 'inputs', path.basename(__dirname, '.js') + (dev ? '.ex' : '') + '.txt')
let content = fs.readFileSync(path_str).toString().split(',').map((x) => { return parseInt(x) })

function exec(mem, patch) {
  for (var i = 0; i < patch.length; i+=2) {
    mem[patch[i]] = patch[i+1]
  }

  let pc = 0;
  let halt = false;

  let next = () => {
    return mem[pc++]
  }

  let v;
  while (!halt) {
    let op = next();
    if (op === undefined) { break }

    switch (op) {
      case 1: v = mem[next()] + mem[next()]; mem[next()] = v; break;
      case 2: v = mem[next()] * mem[next()]; mem[next()] = v; break;
      case 99: halt = true; break;
      default: console.error('unknown opcode', op); halt = true; break;
    }
  }

  return mem[0]
}

function find_pair(search) {
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      let output = exec(content.slice(0), [1, x, 2, y])
      if (output == search) {
        return [x, y]
      }
    }
  }  
}

let result = find_pair(19690720);
if (result) {
  console.log('star2', 100 * result[0] + result[1])
} else {
  console.error('No match found')
}
