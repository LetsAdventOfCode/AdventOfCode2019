var intCodeComputer = {};
var gameBoard = [];
var currentScore = 0;
var width = 42;
var height = 42;
var instructionPointer = 0;
var gameCode = [];
var gameLog = [];
var droid = { x: width / 2, y: height / 2, direction: 'north', states: [] };
var closedNodes = [];

var directionMap = {
    'north': 1,
    'east': 4,
    'south': 2,
    'west': 3
};
createMatrix = () => {
    let matrix = [];
    for (let i = 0; i < height; i++) {
        matrix[i] = new Array(width).fill(-1);
    }
    return matrix;
};

function update() {
    getOpen();
    let open = getOpen();    
    if (open[0]) {
        droid.direction = open[0].direction;
    }
    else {
        let previousState = droid.states.pop();
        if (!previousState) return;
        droid.direction = getPreviousStateDirection(previousState);
    }
    intCodeComputer.input = directionMap[droid.direction];
    
    if (open[0]) {
        droid.states.push({ x: droid.x, y: droid.y });
    }
    closedNodes[droid.x + ',' + droid.y] = true;    
    
    while (gameLog.length < 1 && intCodeComputer.instructionPointer < gameCode.length) {
        intCodeComputer.instructionPointer = intCodeComputer.executeInstruction(gameLog);
    }

    while (gameLog.length >= 1) {
        let location = { y: droid.y + getDirection('y', intCodeComputer.input), x: droid.x + getDirection('x', intCodeComputer.input) };
        gameBoard[location.y][location.x] = gameLog[0];
        
        if (gameLog[0] !== 0) {            
            droid.y = location.y;
            droid.x = location.x;
        } else {
            droid.states.pop();
            closedNodes[location.x + ',' + location.y] = true;
        }
        if (gameLog[0] === 2) {
            document.getElementById("shortestPath").innerHTML = droid.states.length;
        }

        gameLog.shift();
    }
}

function getPreviousStateDirection(previousState) {
    let xdiff = droid.x - previousState.x;
    let ydiff = droid.y - previousState.y;
    if (xdiff === 0) {
        if (ydiff <= -1) {
            return 'south';
        }
        else return 'north';
    }
    else if (xdiff <= -1) {
        return 'east';
    }
    else return 'west';
}

function getOpen() {
    let open = [];
    let north = { x: droid.x, y: droid.y - 1, direction: 'north' };
    if (!closedNodes[north.x + ',' + north.y]) {
        open.push(north);
    }
    let east = { x: droid.x + 1, y: droid.y, direction: 'east' };
    if (!closedNodes[east.x + ',' + east.y]) {
        open.push(east);
    }
    let south = { x: droid.x, y: droid.y + 1, direction: 'south' };
    if (!closedNodes[south.x + ',' + south.y]) {
        open.push(south);
    }
    let west = { x: droid.x - 1, y: droid.y, direction: 'west' };
    if (!closedNodes[west.x + ',' + west.y]) {
        open.push(west);
    }
    return open;
}

function getDirection(coord, input) {
    switch (coord) {
        case 'y':
            return input === 1 ? -1 : input === 2 ? 1 : 0;
        case 'x':
            return input === 3 ? -1 : input === 4 ? 1 : 0;
    }
}

function draw() {
    let context = document.getElementById('canvas').getContext('2d');
    context.beginPath();
    var cellWidth = canvas.width / gameBoard[0].length;
    var cellHeight = canvas.height / gameBoard.length;

    gameBoard.forEach((row, y) => {
        row.forEach((value, x) => {
            if (x === droid.x && y === droid.y) {
                droidObject = getSymbol(4);
                droidObject.draw(context, droid.x, droid.y, cellHeight, cellWidth);
            } else {
                gameObject = getSymbol(value);
                gameObject.draw(context, x, y, cellHeight, cellWidth);
            }
        });
    });
}

circle = function (color) {
    return {
        color: color,
        draw: function (context, x, y, height, width) {
            context.fillStyle = color;
            context.arc(x * width, y * height, height / 3, 0, 2 * Math.PI);
            context.fill();
        }
    };
};
square = function (color) {
    return {
        color: color,
        draw: function (context, x, y, height, width) {
            context.fillStyle = color;
            context.fillRect(x * width, y * height, width, height);
        }
    };
};
pad = function (color) {
    return {
        color: color,
        draw: function (context, x, y, height, width) {
            context.fillStyle = color;
            context.fillRect(x * width - 3, y * height, width + 3, height / 4);
        }
    };
};

function getSymbol(val) {
    if (val === -1) {
        return square('black');
    }
    if (val === 0) {
        return square('white');
    }
    if (val === 1) {
        return square('#7FB3D5');
    }
    if (val === 2) {
        return square('#922B21');
    }
    if (val === 4) {
        return square('red');
    }
    return 'black';
}

function getRandomBlockColor(x, y) {
    let random = (x + y) % 5;
    if (random === 0) {
        return '#76D7C4';
    }
    if (random === 1) {
        return '#F0B27A';
    }
    if (random === 2) {
        return '#D2B4DE';
    }
    if (random === 3) {
        return '#ABEBC6';
    }
    if (random === 4) {
        return '#F5CBA7';
    }
}

function loop(timestamp) {

    if (instructionPointer >= gameCode.length)
        return;
    update();
    draw();

    window.requestAnimationFrame(loop);
}

var state = {
    x: width / 2,
    y: height / 2,
    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false
    }
};

var keyMap = {
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down'
};

function keydown(event) {
    var key = keyMap[event.keyCode];
    state.pressedKeys[key] = true;
}

function keyup(event) {
    var key = keyMap[event.keyCode];
    state.pressedKeys[key] = false;
}

function findOxygenSystem() {
    intCodeComputer.instructionPointer = 0;
    intCodeComputer.input = 1;
    gameBoard[height / 2][width / 2] = 2;
    window.requestAnimationFrame(loop);
    window.addEventListener("keydown", keydown, false);
    window.addEventListener("keyup", keyup, false);
}

function drawInitialBoard() {
    while (intCodeComputer.instructionPointer !== 65) {
        intCodeComputer.instructionPointer = intCodeComputer.executeInstruction(gameLog);
    }
    while (gameLog.length > 0) {
        if (gameLog[0] === -1 && gameLog[1] === 0) {
            currentScore = gameLog[2];
        }
        gameBoard[gameLog[1]][gameLog[0]] = gameLog[2];
        if (gameLog[2] === 2) {
            blocks++;
        }
        if (gameLog[2] === 3) {
            padPos.x = gameLog[0];
            padPos.y = gameLog[1];
        } else if (gameLog[2] === 4) {
            ballPos.x = gameLog[0];
            ballPos.y = gameLog[1];
        }
        gameLog.shift(); gameLog.shift(); gameLog.shift();
    }
    draw();
}

gameBoard = createMatrix();
visitMap = createMatrix();
gameCode = document.getElementById("gameCode").value.split(",").map(num => parseInt(num));
intCodeComputer = new IntCodeComputer(gameCode);
//drawInitialBoard();
//document.getElementById("gameObjects").innerHTML = blocks;