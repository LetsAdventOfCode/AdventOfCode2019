
function fixMemory(memory: number[]) {
  memory[1] = 12;
  memory[2] = 2;
  return memory;
}

function readInput(): number {
  return 1;
}

function runOps(memory: number[]) {
  let pc = 0;
  while (memory[pc] !== 99) {
    let mode1 = false;
    let mode2 = false;
    let op = -1;
    if(memory[pc] > 1000) {
      mode2 = true;
      if(memory[pc] - 1000 > 100) {
        mode1 = true;
        op = memory[pc] - 1100;
      } else {
        op = memory[pc] - 1000;
      }
    } else {
      if(memory[pc] > 100) {
        mode1 = true;
        op = memory[pc] - 100;
      } else {
        op = memory[pc];
      }
    }
    if (op === 1) {
      memory[memory[pc + 3]] =
        (mode2 ? memory[pc + 2] : memory[memory[pc + 2]]) +
        (mode1 ? memory[pc + 1] : memory[memory[pc + 1]]);
      pc+= 4;
    } else if (op === 2) {
      memory[memory[pc + 3]] =
        (mode2 ? memory[pc + 2] : memory[memory[pc + 2]]) *
        (mode1 ? memory[pc + 1] : memory[memory[pc + 1]]);
      pc+= 4;
    } else if (op === 3) {
      memory[memory[pc + 1]] = readInput();
      pc+= 2;
    } else if (op === 4) {
      console.log(memory[memory[pc + 1]], ': at pc', pc);
      if(memory[memory[pc + 1]] !== 0) {
        console.log(memory[pc - 4], memory[pc - 3],
          memory[pc - 2], memory[pc - 1]);
      }
      pc+= 2;
    } else {
      console.log(`Invalid op ${memory[pc]} at ${pc}`);
      return memory;
    }
  }
  return memory;
}

function main(input: string) {
  let memory: number[] = input.split(',').map((i) => {
    return parseInt(i, 10);
  });
  //memory = fixMemory(memory);
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
