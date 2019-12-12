fs = require('fs');
const input = fs.readFileSync('./input.txt', 'UTF-8');
let parsedInput = input.split(',').map(i => parseInt(i));

function runProgram(instructions) {
    instructions[1] = 12;
    instructions[2] = 2;
    for (let index = 0; index < instructions.length; index++) {

        let target = instructions[index + 3],
            first = instructions[index + 1],
            second = instructions[index + 2];

        if (instructions[index] === 1) {
            instructions[target] = (instructions[first] + instructions[second]);
            index += 3;

        } else if (instructions[index] === 2) {
            instructions[target] = (instructions[first] * instructions[second]);
            index += 3;

        } else if (instructions[index] === 99) {
            console.log(instructions[0]);
        }
        
    }
}

runProgram(parsedInput); // 3765464