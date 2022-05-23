function solve() {
    let map = document.getElementById("input").value.split("\n");
    let dict = sortMap(map);
    let orbits = 0;
    for (let key in dict) {
        orbits += countOrbits(dict[key]);
    }
    let stepsToSanta = countStepsToSanta(dict['YOU'], [], {});
    document.getElementById("solution").innerHTML = orbits;
    document.getElementById("solution2").innerHTML = stepsToSanta.length - 2;
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
                existingChildNode = { id: spaceObjects[1], children: [] };
            }
            existingChildNode.parent = existingNode;
            existingNode.children.push(existingChildNode);
            dict[existingChildNode.id] = existingChildNode;
        }
        else {
            let node = { id: spaceObjects[0], children: [] };
            if (!existingChildNode) {
                existingChildNode = { id: spaceObjects[1], children: [], parent: node };
            }
            else if (!existingChildNode.parent) {
                existingChildNode.parent = node;
            }
            node.children.push(existingChildNode);
            dict[node.id] = node;
            dict[existingChildNode.id] = existingChildNode;
        }
    }
    return dict;
}

function countStepsToSanta(node, path, visited) {
    visited[node.id] = node.id;
    path.push(node);
    if (node.children.some(c => c.id === 'SAN')) {
        return path;
    }
    else {
        let parent = !node.parent || visited[node.parent.id] ? null : countStepsToSanta(node.parent, path.slice(), copyDict(visited));
        let children = node.children.map(c => visited[c.id] ? null : countStepsToSanta(c, path.slice(), copyDict(visited)));
        for (let child of children) {
            if (child) {
                return child;
            }
        }
        return parent || null;
    }
}

function copyDict(dict) {
    var copy = {};
    for (var key in dict) {
        copy[key] = dict[key];
    }
    return copy;
}