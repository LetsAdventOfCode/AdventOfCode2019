function solve() {
    let moons = document.getElementById("input").value.replace(/</g, '').replace(/>/g, '').replace(/ /g, '').split('\n').map(moon => moon.split(',').map(coord => coord.split('='))).map(moon => parseMoon(moon));
    let checkSteps = parseInt(document.getElementById("steps").value);
    let halt = false;
    let cycleFrequenzies = { x: -1, y: -1, z: -1 };
    let initialState = moons.map(copyMoonState);
    let steps = 0;
    while (!halt) {
        let stateTotalEnergy = moons.map(moon => moon.totalEnergy).reduce((max, cur) => max + cur);
        calcVelocities(moons);
        applyGravity(moons);

        steps++;
        /* 
         * We should be able to calculate the cycle faster by just checking velocity?
         * It should be enough to just let the planets orbit half a lap to determine the cycle frequenzy
         * A moon should have 0 velocity in an axis half way through the orbit so the cycle frequenzy is just 2 times that
         * Myabe theres even a more clever way to calculate the cycle frequenzy since they are all interdependant?
         */
        if (cycleFrequenzies.x === -1 && isCyclic(initialState, moons, 'x')) {
            cycleFrequenzies.x = steps;
        }
        if (cycleFrequenzies.y === -1 && isCyclic(initialState, moons, 'y')) {
            cycleFrequenzies.y = steps;
        }
        if (cycleFrequenzies.z === -1 && isCyclic(initialState, moons, 'z')) {
            cycleFrequenzies.z = steps;
        }
        if (cycleFrequenzies.x !== -1 && cycleFrequenzies.y !== -1 && cycleFrequenzies.z !== -1) {
            document.getElementById("solution2").innerHTML = lcm(lcm(cycleFrequenzies.x, cycleFrequenzies.y), cycleFrequenzies.z);
            halt = true;
        }
        if (steps === checkSteps) {
            document.getElementById("solution").innerHTML = stateTotalEnergy;
        }
    }
}

function lcm(a, b) {
    return a * b / gcd(a, b);
}

function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
};

function isCyclic(initialState, currentState, coord) {
    let isRepeated = true;
    for (let i in initialState) {
        isRepeated = isRepeated && initialState[i].position[coord] === currentState[i].position[coord] && initialState[i].velocity[coord] === currentState[i].velocity[coord];
    }
    return isRepeated;
}

function parseMoon(moon) {
    let parsedMoon = { position: {}, velocity: { x: 0, y: 0, z: 0 } };
    for (let coord of moon) {
        parsedMoon.position[coord[0]] = parseInt(coord[1]);
    }
    calcEnergies(parsedMoon);
    return parsedMoon;
}

function calcVelocities(moons) {
    for (let moonIndex in moons) {
        let tempMoons = moons.slice();
        tempMoons.splice(moonIndex, 1);
        calcVelocity(moons[moonIndex], tempMoons);
    }
}

function calcVelocity(moon, moons) {
    for (let othermoon of moons) {
        moon.velocity.x += moon.position.x === othermoon.position.x ? 0 : moon.position.x < othermoon.position.x ? 1 : -1;
        moon.velocity.y += moon.position.y === othermoon.position.y ? 0 : moon.position.y < othermoon.position.y ? 1 : -1;
        moon.velocity.z += moon.position.z === othermoon.position.z ? 0 : moon.position.z < othermoon.position.z ? 1 : -1;
    }
}

function applyGravity(moons) {
    for (let moon of moons) {
        moon.position.x += moon.velocity.x;
        moon.position.y += moon.velocity.y;
        moon.position.z += moon.velocity.z;
        calcEnergies(moon);
    }
}

function calcEnergies(moon) {
    moon.potentialEnergy = Math.abs(moon.position.x) + Math.abs(moon.position.y) + Math.abs(moon.position.z);
    moon.kineticEnergy = Math.abs(moon.velocity.x) + Math.abs(moon.velocity.y) + Math.abs(moon.velocity.z);
    moon.totalEnergy = moon.potentialEnergy * moon.kineticEnergy;
}

function copyMoonState(moon) {
    return { position: { x: moon.position.x, y: moon.position.y, z: moon.position.z }, velocity: { x: moon.velocity.x, y: moon.velocity.y, z: moon.velocity.z }, potentialEnergy: moon.potentialEnergy, kineticEnergy: moon.kineticEnergy, totalEnergy: moon.totalEnergy };
}