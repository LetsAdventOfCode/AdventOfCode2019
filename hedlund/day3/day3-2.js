fs = require('fs');
const input = fs.readFileSync('./input.txt', 'UTF-8').split('\r\n');
let parsedInput1 = input[0].split(',');
let parsedInput2 = input[1].split(',');

const matrixSize = 17000;
const startPosition = matrixSize / 2;
let theMatrix = [];
let redCableInput;
let blueCableInput;
let foundCrossings = [];
let manhattanDistance = matrixSize;
let fewestSteps = 999999;
let totalSteps = {
    '1': 0,
    '2': 0
};

function calcManhattan(input1, input2) {
    redCableInput = parseInput(input1);
    blueCableInput = parseInput(input2);

    for(let i = 0; i < matrixSize; i++) {
        theMatrix[i] = new Array(matrixSize);
    }

    populateMatrix();

    for (const crossing of foundCrossings) {
        manhattanDistance = Math.min((Math.abs(crossing.x - startPosition) + Math.abs(crossing.y - startPosition)), manhattanDistance);
        fewestSteps = Math.min((crossing.blueCableSteps + crossing.redCableSteps), fewestSteps);
    }
    console.log('Crossings found:', foundCrossings.length);
    console.log('Manhattan Distance:', manhattanDistance);
    console.log('Fewest steps:', fewestSteps);
}

function populateMatrix() {
    let currentState = {
        redCableState: {x: startPosition, y: startPosition, xdir: 0, ydir: 0, steps: 0, cableCode: 1},
        blueCableState: {x: startPosition, y: startPosition, xdir: 0, ydir: 0, steps: 0, cableCode: 2}
    };

    let longestInput = redCableInput.length > blueCableInput.length ? redCableInput : blueCableInput;
    for (const i in longestInput) {
        runTheCables(currentState.redCableState, redCableInput[i]);
        runTheCables(currentState.blueCableState, blueCableInput[i]);
    }
}

function runTheCables(currentWireState, instructions) {
    currentWireState = calcState(currentWireState, instructions);

    while (currentWireState.steps > 0) {
        step(currentWireState);
    }
}

function step(state) {
    if (state.steps > 0) {
        state.x += state.xdir;
        state.y += state.ydir;

        totalSteps[state.cableCode]++;

        if (!theMatrix[state.x][state.y] || theMatrix[state.x][state.y].marking === state.cableCode) {
            
            if (!theMatrix[state.x][state.y]) {
                theMatrix[state.x][state.y] = {
                    marking: state.cableCode
                };
            }

            theMatrix[state.x][state.y][state.cableCode] = totalSteps[state.cableCode];
        } else {
            theMatrix[state.x][state.y].marking = 3;
            theMatrix[state.x][state.y][state.cableCode] = totalSteps[state.cableCode];
            foundCrossings.push({x: state.x, y: state.y, redCableSteps: theMatrix[state.x][state.y]['1'], blueCableSteps: theMatrix[state.x][state.y]['2']});
        }
        state.steps--;
    }
}

function calcState(state, instruction) {
    state.xdir = 0;
    state.ydir = 0;
    state.steps = 0;
    if (instruction) {
        switch (instruction[0]) {
            case 'R':
                state.xdir = 1;
                break;
            case 'L':
                state.xdir = -1;
                break;
            case 'U':
                state.ydir = 1;
                break;
            case 'D':
                state.ydir = -1;
                break;
            default:
                console.log('Broken instructions');
                break;
        }
        state.steps = instruction[1];
    }

    return state;
}

function parseInput(input) {
    for (let i in input) {
        input[i] = [input[i].substr(0,1), parseInt(input[i].substr(1))];
    }
    return input;
}

calcManhattan(parsedInput1, parsedInput2); // 107036
// Run like this: node --max_old_space_size=4608 .\day3-1.js