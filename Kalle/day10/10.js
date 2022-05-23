var gameBoard = [];
var sortedAsteroids = [];
var laserPointer = 0;
var laserTarget;
var monitoringStation;
var destroyedAsteroids = [];

function update() {
    laserPointer = (laserPointer + sortedAsteroids.length) % sortedAsteroids.length;
    if (sortedAsteroids[laserPointer] && sortedAsteroids[laserPointer].length > 0) {
        laserTarget = sortedAsteroids[laserPointer].shift();
        destroyedAsteroids.push(laserTarget);
        gameBoard[laserTarget.y][laserTarget.x] = 'D';
    } else {
        //Need to set lasertarget to the edge of the grid
    }
    
    laserPointer--;
    
    if (destroyedAsteroids.length === 200) {
        document.getElementById("destroyed").innerHTML = laserTarget.x * 100 + laserTarget.y;
    }
}

function draw() {
    let context = document.getElementById('canvas').getContext('2d');
    var cellWidth = canvas.width / gameBoard[0].length;
    var cellHeight = canvas.height / gameBoard.length;
        
    gameBoard.forEach((row, y) => {
        row.forEach((value, x) => {
            context.beginPath();
            gameObject = getSymbol(value, x, y);
            gameObject.draw(context, x, y, cellHeight, cellWidth);
        });
    });
    if (monitoringStation) {
        context.beginPath();
        context.strokeStyle = 'red';
        //context.lineWidth = 5;
        context.moveTo(monitoringStation.x * cellWidth + cellWidth / 2, monitoringStation.y * cellHeight + cellHeight / 2);
        context.lineTo(laserTarget.x * cellWidth + cellWidth / 2, laserTarget.y * cellHeight + cellHeight / 2);
        context.stroke();
    }
}

asteroid = function (color) {
    return {
        color: color,
        draw: function (context, x, y, height, width) {
            context.fillStyle = 'black';
            context.fillRect(x * width, y * height, width, height);
            context.fillStyle = color;
            context.arc(x * width + width / 2, y * height + height / 2, height / 10, 0, 2 * Math.PI);
            context.fill();
        }
    };
};

space = function (color) {
    return {
        color: color,
        draw: function (context, x, y, height, width) {
            context.fillStyle = color;
            context.fillRect(x * width, y * height, width, height);
        }
    };
};

function getSymbol(val) {
    if (val === '.') {
        return space('black');
    }
    if (val === '#') {
        return asteroid('white');
    }
    if (val === 'M') {
        return asteroid('green');
    }
    if (val === 'D') {
        return asteroid('yellow');
    }
    return 'black';
}

function loop() {

    update();
    draw();

    window.requestAnimationFrame(loop);
}

function scanAsteroidBelt() {
    let asteroids = scanForAsteroids();
    monitoringStation = findBestMonitorLocation(asteroids);
    document.getElementById("detected").innerHTML = monitoringStation.visibleAsteroidsCount;
    gameBoard[monitoringStation.y][monitoringStation.x] = 'M';
    sortedAsteroids = sortAsteroids(monitoringStation);
    laserPointer = sortedAsteroids.map(e =>  e[0].slope).indexOf(0);
    window.requestAnimationFrame(loop);
}

function sortAsteroids(monitorStation) {
    let arr = [];
    for (let slope in monitorStation.visibleAsteroids) {
        monitorStation.visibleAsteroids[slope] = monitorStation.visibleAsteroids[slope].filter(el => typeof el !== 'undefined');
        arr.push(monitorStation.visibleAsteroids[slope]);
    }
    arr = arr.sort((a, b) => a[0].slope - b[0].slope);
    return arr;
}

function findBestMonitorLocation(asteroids) {
    let bestProspect = { visibleAsteroidsCount: 0 };
    for (let prospect of asteroids) {
        for (let asteroid of asteroids) {
            if (prospect.x === asteroid.x && prospect.y === asteroid.y)
                continue;
            let asteroidCopy = new Asteroid(asteroid.x, asteroid.y);
            let slope = Math.atan2(prospect.x - asteroid.x, prospect.y - asteroid.y);
            asteroidCopy.slope = slope;
            let newDistance = manhattanDistance(prospect.x, prospect.y, asteroid.x, asteroid.y);
            if (prospect.visibleAsteroids[slope]) {
                prospect.visibleAsteroids[slope][newDistance] = asteroidCopy;
            } else {
                prospect.visibleAsteroids[slope] = [];
                prospect.visibleAsteroids[slope][newDistance] = asteroidCopy;
                prospect.visibleAsteroidsCount++;
            }
        }
        bestProspect = bestProspect.visibleAsteroidsCount > prospect.visibleAsteroidsCount ? bestProspect : prospect;
    }
    return bestProspect;
}

manhattanDistance = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

function scanForAsteroids() {
    let asterorids = [];
    for (let y = 0; y < gameBoard.length; y++) {
        for (let x = 0; x < gameBoard[y].length; x++) {
            if (gameBoard[y][x] === '#') {
                asterorids.push(new Asteroid(x, y));
            }
        }
    }
    return asterorids;
}

gameBoard = document.getElementById("input").value.split('\n').map(val => val.split(''));
draw();

class Asteroid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visibleAsteroids = [];
        this.visibleAsteroidsCount = [];
    }

    x;
    y;
    visibleAsteroids;
    visibleAsteroidsCount
}