function solve() {
    let code = document.getElementById("instructions").value.split(",").map(num => parseInt(num));
    let log = [];
    runCode(code.slice(), log);
}

var relativeBase = 0;
var input = 0;

function runCode(code, log) {   
    let robot = { x: 0, y: 0, direction: 0 };
    let matrix = createMatrix();
    matrix[robot.y][robot.x] = 1;
    relativeBase = 0;
    let timeToMove = false;
    let paintCounter = [];
    let intCodeComputer = new IntCodeComputer(code);
    intCodeComputer.input = matrix[robot.y][robot.x];

    while (intCodeComputer.instructionPointer < intCodeComputer.programCode.length) {
        intCodeComputer.instructionPointer = intCodeComputer.executeInstruction(log);
        if (log.length === 1) {
            if (timeToMove) {
                intCodeComputer.input = turnAndMove(matrix, robot, log.shift());
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