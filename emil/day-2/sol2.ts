
let noun = -1;
let verb = 0;
let valid = 19690720;

function fixMemory(memory: number[]) {
  memory = memory.slice(0);
  memory[1] = noun;
  memory[2] = verb;
  return memory;
}

function runOps(memory: number[]) {
  memory = memory.slice(0);
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
      pc++;
      return memory;
    }
  }
  return memory;
}

function main(input: string) {
  const memory: number[] = input.split(',').map((i) => {
    return parseInt(i, 10);
  });
  let outMemory = memory;
  while (outMemory[0] !== valid) {
    noun++;
    if (noun >= 100) {
      verb++;
      noun = 0;
    }
    outMemory = runOps(fixMemory(memory));
  }
  console.log(`${noun}, ${verb}`);
  console.log(noun * 100 + verb);
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
