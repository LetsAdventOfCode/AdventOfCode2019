function solve() {
    let code = document.getElementById("instructions").value.split(",").map(num => parseInt(num));
    let log = [];
    let log2 = [];
    intProgram(code.slice(), log);
}

var relativeBase = 0;
var input = 0;

function intProgram(rows, log) {
    let i = 0;    
    let robot = { x: 0, y: 0, direction: 0 };
    let matrix = createMatrix();
    matrix[robot.y][robot.x] = 1;
    input = matrix[robot.y][robot.x];
    relativeBase = 0;
    let timeToMove = false;
    let paintCounter = [];
    while (i < rows.length) {
        i = doInstructions(rows, i, log);
        if (log.length === 1) {
            if (timeToMove) {
                input = turnAndMove(matrix, robot, log.shift());
                timeToMove = false;
            }
            else {
                let index = robot.y + ', ' + robot.x;
                paintCounter[index] = (paintCounter[index] ? paintCounter[index] : 0) + 1;
                paint(matrix, robot, log.shift());
                timeToMove = true;
            }
        }
    }
    paintTheHull(matrix, document.getElementById('canvas').getContext('2d'));
    let atleastOnce = 0;
    for (let counter in paintCounter) {
        if (paintCounter[counter] > 0) {
            atleastOnce++;
        }
    }

    document.getElementById("solution").innerHTML = atleastOnce;
    return rows;
}

function paint(matrix, robot, color) {
    matrix[robot.y][robot.x] = color;
}

function paintTheHull(matrix, context) {
    var cellWidth = canvas.width / matrix[0].length;
    var cellHeight = canvas.height / matrix.length;

    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            context.fillStyle = cellColor(value);
            context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        });
    });
}

function cellColor(val) {
    if (val === 0) {
        return 'black';
    }
    if (val === 1) {
        return 'white';
    }
    return 'black';
}

function turnAndMove(matrix, robot, direction) {
    robot.direction = (robot.direction + (direction === 0 ? 3 : 1)) % 4;
    robot.y += robot.direction === 0 ? -1 : robot.direction === 2 ? 1 : 0;
    robot.x += robot.direction === 1 ? 1 : robot.direction === 3 ? -1 : 0;
    
    return matrix[robot.y][robot.x];
}
createMatrix = (matrixSize) => {
    let matrix = [];
    for (let i = 0; i < 50; i++) {
        matrix[i] = new Array(25).fill(0);
    }
    return matrix;
};

function doInstructions(code, instructionPointer, log) {
    let operator = code[instructionPointer];
    let param1 = code[instructionPointer + 1];
    let param2 = code[instructionPointer + 2];
    let param3 = code[instructionPointer + 3];

    let mode = getMode(operator);
    switch (operator % 100) {
        case 1:
            code[param3 + (mode[0] === '2' ? relativeBase : 0)] = getValue(mode[2], param1, code, relativeBase) + getValue(mode[1], param2, code, relativeBase);
            return instructionPointer + 4;
        case 2:
            code[param3 + (mode[0] === '2' ? relativeBase : 0)] = getValue(mode[2], param1, code, relativeBase) * getValue(mode[1], param2, code, relativeBase);
            return instructionPointer + 4;
        case 3:
            code[param1 + (mode[2] === '2' ? relativeBase : 0)] = input;
            return instructionPointer + 2;
        case 4:
            log.push(getValue(mode[2], param1, code, relativeBase));
            return instructionPointer + 2;
        case 5:
            return getValue(mode[2], param1, code, relativeBase) !== 0 ? getValue(mode[1], param2, code, relativeBase) : instructionPointer + 3;
        case 6:
            return getValue(mode[2], param1, code, relativeBase) === 0 ? getValue(mode[1], param2, code, relativeBase) : instructionPointer + 3;
        case 7:
            code[param3 + (mode[0] === '2' ? relativeBase : 0)] = getValue(mode[2], param1, code, relativeBase) < getValue(mode[1], param2, code, relativeBase) ? 1 : 0;
            return instructionPointer + 4;
        case 8:
            code[param3 + (mode[0] === '2' ? relativeBase : 0)] = getValue(mode[2], param1, code, relativeBase) === getValue(mode[1], param2, code, relativeBase) ? 1 : 0;
            return instructionPointer + 4;
        case 9:
            relativeBase += getValue(mode[2], param1, code, relativeBase);
            return instructionPointer + 2;
        case 99:
        default:
            return code.length;
    }
}

function getValue(mode, param, code, relativeBase) {
    return mode === '1' ? param : mode === '2' ? (code[param + relativeBase] ? code[param + relativeBase] : 0) : (code[param] ? code[param] : 0);
}

function getMode(operator) {
    let mode = (operator / 100).toFixed(0);
    return mode.length === 1 ? '00' + mode : mode.length === 2 ? '0' + mode : mode;
}