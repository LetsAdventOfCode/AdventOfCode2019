
type Planet = [string, string[], number];

function planetIndex(planets: Planet[], search: string): number {
  for (var i = planets.length - 1; i >= 0; i--) {
    if (planets[i][0] === search) {
      return i;
    }
  }
  return -1;
}

function setPlanetDistances(planets: Planet[], currentPlanet: number, distance: number) {
  planets[currentPlanet][2] = distance;
  planets[currentPlanet][1].forEach((s) => {
    let index = planetIndex(planets, s);
    if (planets[index][2] === -1) {
      setPlanetDistances(planets, index, distance + 1);
    }
  });
}

function distance(planets: Planet[], sanIndex: number, youIndex: number): number {
  setPlanetDistances(planets, sanIndex, 0);

  return planets[youIndex][2];
}

function parseMap(map :[string, string][]): number {
  const planets: string[] = [];
  for (let i = map.length - 1; i >= 0; i--) {
    if (planets.indexOf(map[i][0]) === -1) {
      planets.push(map[i][0]);
    }
    if (planets.indexOf(map[i][1]) === -1) {
      planets.push(map[i][1]);
    }
  }

  const planetsM: Planet[] = planets.map((p) => {
    let neighbours: string[] = [];
    for (var i = map.length - 1; i >= 0; i--) {
      if (map[i][0] === p) {
        neighbours.push(map[i][1]);
      }
      if (map[i][1] === p) {
        neighbours.push(map[i][0]);
      }
    }
    return [p, neighbours, -1];
  });

  let you: number = -1;
  let san: number = -1;
  for (var i = planetsM.length - 1; i >= 0; i--) {
    if (planetsM[i][0] === 'SAN') {
      san = i;
    }
    if (planetsM[i][0] === 'YOU') {
      you = i;
    }
  }

  return distance(planetsM, san, you);
}

function main(input: string) {
  const map: [string, string][] = input.split('\n').slice(0, -1).map((s) => {
    return [s.substring(0, s.indexOf(')')), s.substring(s.indexOf(')') + 1)];
  });

  let length = parseMap(map);

  console.log(length - 2);
}

process.stdin.setEncoding('utf8');

let contents = '';

process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    contents+= chunk;
  }
});

process.stdin.on('end', () => {
  main(contents);
});
