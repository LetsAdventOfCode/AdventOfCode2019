var intCodeComputer = {};
var gameBoard = [];
var width = 44;
var height = 20;
var gameCode = [];
var gameLog = [];

function startGame() {
    window.requestAnimationFrame(loop);
    window.addEventListener("keydown", keydown, false);
    window.addEventListener("keyup", keyup, false);
}

createMatrix = () => {
    let matrix = [];
    for (let i = 0; i < height; i++) {
        matrix[i] = new Array(width).fill(0);
    }
    return matrix;
};

function update() {
    let matrix = [];
    matrix[0] = [];
    let j = 0;
    for (let i = 0; i < 3000; i++) {


        while (gameLog.length < 1 && intCodeComputer.instructionPointer < gameCode.length) {
            intCodeComputer.instructionPointer = intCodeComputer.executeInstruction(gameLog);

        }

        while (gameLog.length >= 1) {
            if (String.fromCharCode(gameLog[0]) === '\n') {
                j++;
                matrix[j] = [];
                gameLog.shift();
                break;
            }

            matrix[j].push(gameLog[0]);
            gameLog.shift();
            //gameBoard[gameLog[1]][gameLog[0]] = gameLog[0];
        }
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
        return square('red');
    }
    if (val === 3) {
        return pad('#7FB3D5');
    }
    if (val === 4) {
        return circle('#922B21');
    }
    return 'black';
}

function loop(timestamp) {

    if (intCodeComputer.instructionPointer >= gameCode.length)
        return;
    update();
    draw();

    window.requestAnimationFrame(loop);
}

var state = {
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


gameBoard = createMatrix();
gameCode = document.getElementById("intCode").value.split(",").map(num => parseInt(num));
intCodeComputer = new IntCodeComputer(gameCode);
//document.getElementById("gameObjects").innerHTML = blocks;