fs = require('fs');
const input = fs.readFileSync('./input.txt', 'UTF-8');
let parsedInput = input.split('\r\n').map(entry => entry.split(')')),
orbitMap = {},
orbitsCount = 0;

function runProgram() {
    mapOrbit();
    for (const key in orbitMap) {
        orbitsCount += countOrbits(orbitMap[key]);
    }
    console.log(orbitsCount);
}

function countOrbits(orbitObject) {
    if (orbitObject.children.length === 0) {
        return 0;
    }
    return orbitObject.children.length + orbitObject.children.map(c => countOrbits(c)).reduce((acc, cur) => acc + cur);
}

function mapOrbit() {
    parsedInput.forEach(input => {
        orbitedParent = orbitMap[input[0]];
        orbitingChild = orbitMap[input[1]];

        if (orbitedParent) {
            if (!orbitingChild) {
                orbitingChild = {id: input[1], children: [], parent: orbitedParent};
            }
            orbitedParent.children.push(orbitingChild);
            orbitMap[orbitingChild.id] = orbitingChild;
        } else {
            orbitedParent = {id: input[0], children: []};
            if (!orbitingChild) {
                orbitingChild = {id: input[1], children: [], parent: orbitedParent};
            }
            orbitedParent.children.push(orbitingChild);
            orbitMap[orbitedParent.id] = orbitedParent;
            orbitMap[orbitingChild.id] = orbitingChild;
        }
    });
}

runProgram();