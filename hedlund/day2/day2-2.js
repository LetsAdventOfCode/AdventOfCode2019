fs = require('fs');
const input = fs.readFileSync('./input.txt', 'UTF-8');
let parsedInput = input.split(',').map(i => parseInt(i));

const correctOutput = 19690720;

function runProgram(instructions) {
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
            return instructions;
        }
        
    }
}

function tester(inputData) {
    let noCorrectOutput = true,
    noun = 0,
    verb = 0;
    while (noCorrectOutput) {
        let input = [...inputData];
        input[1] = noun;
        input[2] = verb;
        let result = runProgram(input);
        if (result[0] === correctOutput) {
            noCorrectOutput = false;
            console.log(input[1], input[2]);
        }

        if (noun < 98) {
            noun++;
        }
        if (noun == 98 && verb < 98) {
            verb++;
            noun = 0;
        }

        if (noun == 98 && verb == 98) {
            noCorrectOutput = false;
            console.log('Sorry');
        }
    }
}

tester(parsedInput); // 7610