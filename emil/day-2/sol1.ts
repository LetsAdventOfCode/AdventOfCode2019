
function fixMemory(memory: number[]) {
  memory[1] = 12;
  memory[2] = 2;
  return memory;
}

function runOps(memory: number[]) {
  let pc = 0;
  while (memory[pc] !== 99) {
    if (memory[pc] === 1) {
      memory[memory[pc + 3]] =
        memory[memory[pc + 2]] + memory[memory[pc + 1]];
      pc+= 4;
    } else if (memory[pc] === 2) {
      memory[memory[pc + 3]] =
        memory[memory[pc + 2]] * memory[memory[pc + 1]];
      pc+= 4;
    } else {
      console.log(`Invalid op ${memory[pc]} at ${pc}`);
    }
  }
  return memory;
}

function main(input: string) {
  let memory: number[] = input.split(',').map((i) => {
    return parseInt(i, 10);
  });
  memory = fixMemory(memory);
  memory = runOps(memory);
  console.log(memory);
}

process.stdin.setEncoding('utf8');

let contents = '';

process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    contents+= chunk;
  }
});

process.stdin.on('end', () => {
  main(contents);
});
