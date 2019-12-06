
type Planet = [string, string, string[]];

function countOrbits(planets: Planet[], planetIndex: number): [number, number] {
  const currentPlanet: Planet = planets[planetIndex];
  const childPlanets: string[] = currentPlanet[2];
  let prevOrbits: number = 0;
  let prevPlanets: number = 1;
  let res: [number, number];
  for (let i = planets.length - 1; i >= 0; i--) {
    for (let j = childPlanets.length - 1; j >= 0; j--) {
      if (childPlanets[j] === planets[i][0]) {
        res = countOrbits(planets, i);
        prevPlanets+= res[0];
        prevOrbits+= res[1];
      }
    }
  }
  return [prevPlanets, prevOrbits + prevPlanets];
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
    let sun: string = '';
    let dwarf: string[] = [];
    for (var i = map.length - 1; i >= 0; i--) {
      if (map[i][0] === p) {
        dwarf.push(map[i][1]);
      }
      if (map[i][1] === p) {
        sun = map[i][0];
      }
    }
    return [p, sun, dwarf];
  });

  let sun: number = -1;
  for (var i = planetsM.length - 1; i >= 0; i--) {
    if (planetsM[i][1] === '') {
      sun = i;
    }
  }

  const res = countOrbits(planetsM, sun);

  // Remove the previous planets from final orbits
  return res[1] - res[0];
}

function main(input: string) {
  const map: [string, string][] = input.split('\n').slice(0, -1).map((s) => {
    return [s.substring(0, s.indexOf(')')), s.substring(s.indexOf(')') + 1)];
  });

  let length = parseMap(map);

  console.log(length);
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
