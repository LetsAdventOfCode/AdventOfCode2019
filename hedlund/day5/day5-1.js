fs = require('fs');
const input = fs.readFileSync('./input.txt', 'UTF-8');
let parsedInput = input.split(',').map(i => parseInt(i));

function runProgram(instructions) {
    let input = 1;
    for (let index = 0; index < instructions.length; index++) {
        let instruction = instructions[index];
        firstParamMode = false,
        secondParamMode = false,
        opCode = null;

        if (instruction > 1000) {
            secondParamMode = true;
            if ((instruction - 1000) > 100) {
                firstParamMode = true;
                opCode = instruction - 1100;
            } else {
                opCode = instruction - 1000;
            }
        } else if (instruction > 100) {
            firstParamMode = true;
            opCode = instruction - 100;
        } else {
            opCode = instruction;
        }

        let first = firstParamMode ? index + 1: instructions[index + 1],
            second = secondParamMode ? index + 2: instructions[index + 2],
            third = instructions[index + 3];

        if (opCode === 1) {
            instructions[third] = instructions[first] + instructions[second];
            index += 3;

        } else if (opCode === 2) {
            instructions[third] = instructions[first] * instructions[second];
            index += 3;

        } else if (opCode === 3) {
            instructions[first]  = input;
            index += 1;
        } else if (opCode === 4) {
            console.log('Output', instructions[first]);
            index += 1;
        } else if (opCode === 99) {
            return instructions;
        }
        
    }
}

runProgram(parsedInput); // 12428642 