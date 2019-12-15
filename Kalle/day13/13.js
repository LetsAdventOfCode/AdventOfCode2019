var intCodeComputer = {};
var gameBoard = [];
var currentScore = 0;
var width = 44;
var height = 20;
var instructionPointer = 0;
var gameCode = [];
var gameLog = [];
var blocks = 0;
var ballPos = { x: 0, y: 0 };
var padPos = { x: 0, y: 0 };
var useAi = true;

createMatrix = () => {
    let matrix = [];
    for (let i = 0; i < height; i++) {
        matrix[i] = new Array(width).fill(0);
    }
    return matrix;
};

function update() {
    if (useAi) {
        if (ballPos.x < padPos.x) {
            intCodeComputer.input = -1;
        }
        if (ballPos.x > padPos.x) {
            intCodeComputer.input = 1;
        }
        if (ballPos.x === padPos.x) {
            intCodeComputer.input = 0;
        }
    } else {
        intCodeComputer.input = (state.pressedKeys['left'] ? -1 : 0) + (state.pressedKeys['right'] ? 1 : 0);
    }

    while (gameLog.length < 3 && intCodeComputer.instructionPointer < gameCode.length) {
        intCodeComputer.instructionPointer = intCodeComputer.executeInstruction(gameLog);
    }

    while (gameLog.length >= 3) {
        if (gameLog[0] === -1 && gameLog[1] === 0) {
            currentScore = gameLog[2];
        }
        gameBoard[gameLog[1]][gameLog[0]] = gameLog[2];
        if (gameLog[2] === 3) {
            padPos.x = gameLog[0];
            padPos.y = gameLog[1];
        } else if (gameLog[2] === 4) {
            ballPos.x = gameLog[0];
            ballPos.y = gameLog[1];
        }
        gameLog.shift(); gameLog.shift(); gameLog.shift();
    }
}

function draw() {
    let context = document.getElementById('canvas').getContext('2d');
    context.beginPath();
    var cellWidth = canvas.width / gameBoard[0].length;
    var cellHeight = canvas.height / gameBoard.length;
    document.getElementById("currentScore").innerHTML = currentScore;
    gameBoard.forEach((row, y) => {
        row.forEach((value, x) => {
            gameObject = getSymbol(value, x, y);
            gameObject.draw(context, x, y, cellHeight, cellWidth);
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

function getSymbol(val, x, y) {
    if (val === 0) {
        return square('black');
    }
    if (val === 1) {
        return square('white');
    }
    if (val === 2) {
        return square(getRandomBlockColor(x, y));
    }
    if (val === 3) {
        return pad('#7FB3D5');
    }
    if (val === 4) {
        return circle('#922B21');
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

function startGame() {
    useAi = document.getElementById("useAi").checked;
    intCodeComputer.instructionPointer = 69;
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
gameCode = document.getElementById("gameCode").value.split(",").map(num => parseInt(num));
intCodeComputer = new IntCodeComputer(gameCode);
drawInitialBoard();
document.getElementById("gameObjects").innerHTML = blocks;