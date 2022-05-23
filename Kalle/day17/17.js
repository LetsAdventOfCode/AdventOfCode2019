var intCodeComputer = {};
var gameBoard = [];
var width = 44;
var height = 20;
var gameLog = [];
var points = [];

function startGame() {
    gameBoard[0] = [];
    window.requestAnimationFrame(loop);
    window.addEventListener("keydown", keydown, false);
    window.addEventListener("keyup", keyup, false);
}

let successors = (root, m) => {
    let connectedCells = [
        [root[0] - 1, root[1]],
        [root[0], root[1] - 1],
        [root[0] + 1, root[1]],
        [root[0], root[1] + 1]
    ];

    const validCells = connectedCells.filter(
        (cell) =>
            cell[0] >= 0 && cell[0] < m.length
            && cell[1] >= 0 && cell[1] < m[0].length
    );

    const successors = validCells.filter(
        (cell) => m[cell[0]][cell[1]] === 35
    );

    return successors;
};

function update() {
    let j = 0;
    let sum = 0;
    for (let i = 0; i < 3000; i++) {
        while (gameLog.length < 1 && intCodeComputer.instructionPointer < intCodeComputer.intCode.length) {
            intCodeComputer.instructionPointer = intCodeComputer.executeInstruction(gameLog);
        }

        while (gameLog.length >= 1) {
            if (String.fromCharCode(gameLog[0]) === '\n') {
                j++;
                gameBoard[j] = [];
                gameLog.shift();
                break;
            }

            gameBoard[j].push(gameLog[0]);
            if (gameLog[0] === 35) {
                points.push([j, gameBoard[j].length - 1]);
            }
            gameLog.shift();
        }
    }
    for (let point of points) {
        if (successors(point, gameBoard).length === 4) {
            gameBoard[point[0]][point[1]] = 4;
            sum += point[0] * point[1];
        }        
    }
    document.getElementById("sum").innerHTML = sum;
}

function draw() {
    let context = document.getElementById('canvas').getContext('2d');
    context.beginPath();
    var cellWidth = canvas.width / gameBoard[0].length;
    var cellHeight = canvas.height / gameBoard.length;

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
    if (val === 46) {
        return square('black');
    }
    if (val === 35) {
        return square('white');
    }
    if (val === 2) {
        return square('red');
    }
    if (val === 3) {
        return pad('#7FB3D5');
    }
    if (val === 4) {
        return square('yellow');
    }
    return square('red');
}

function loop(timestamp) {

    if (intCodeComputer.instructionPointer >= intCodeComputer.intCode.length)
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

intCodeComputer = new IntCodeComputer(document.getElementById("intCode").value.split(",").map(num => parseInt(num)));
//document.getElementById("gameObjects").innerHTML = blocks;