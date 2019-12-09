function solve() {
    let map = document.getElementById("input").value.split("\n");
    let dict = sortMap(map);
    let orbits = 0;
    for (let key in dict) {
        orbits += countOrbits(dict[key]);
    }
    //let stepsToSanta = countStepsToSanta(dict['YOU']);
    document.getElementById("solution").innerHTML = orbits;
}

function countOrbits(orbitMap) {
    if (orbitMap.children.length === 0)
        return 0;
    return orbitMap.children.length + orbitMap.children.map(c => countOrbits(c)).reduce((acc, cur) => acc + cur);
}

function sortMap(map) {
    let dict = [];
    for (let i = 0; i < map.length; i++) {
        let spaceObjects = map[i].split(')');
        let existingNode = dict[spaceObjects[0]];
        let existingChildNode = dict[spaceObjects[1]];
        if (existingNode) {
            if (!existingChildNode) {
                existingChildNode = { id: spaceObjects[1], children: [], parent: existingNode };
            }
            existingNode.children.push(existingChildNode);
            dict[existingChildNode.id] = existingChildNode;
        }
        else {
            let node = { id: spaceObjects[0], children: [] };
            if (!existingChildNode) {
                existingChildNode = { id: spaceObjects[1], children: [], parent: node };
            }
            node.children.push(existingChildNode);
            dict[node.id] = node;
            dict[existingChildNode.id] = existingChildNode;
        }
    }
    return dict;
}

function countStepsToSanta(node) {
    if (node.id === 'SAN') {
        return 0;
    }
    else if (checkChilds(node.children)) {
        return 0;
    }
    else {
        return 1 + countStepsToSanta(node.parent);
    }
}

function checkChildren(nodes) {
    for (let node of nodes) {
        return node.id === 'SAN';
    }
}