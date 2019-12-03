
function cmpWirePoints(wireA: [number, number, number], wireB: [number, number, number]): boolean {
  return wireA[0] === wireB[0] && wireA[1] === wireB[1];
}

function manhattanLength(a: [number, number], b: [number, number]) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function main(input: string) {
  const wires: string[][] = input.split('\n').map((s) => s.split(','));

  const wirePoints: [number, number, number][][] = [[], []];

  let currentPoint: [number, number] = [0, 0];

  const intersections: [number, number, number, number][] = [];

  console.log('Tracing paths!');

  for (var i = 0; i < wires.length; ++i) {
    currentPoint = [0, 0];
    let currentLen = 1;
    for (const vector of wires[i]) {
      let dir = vector.substr(0,1);
      let steps = parseInt(vector.substr(1), 10);
      for (var j = 0; j < steps; ++j) {
        currentPoint[0] += (dir === 'L' ? -1 : (dir === 'R' ? 1 : 0));
        currentPoint[1] += (dir === 'D' ? -1 : (dir === 'U' ? 1 : 0));
        wirePoints[i].push([
          currentPoint[0],
          currentPoint[1],
          currentLen++,
        ]);
      }
    }
  }

  console.log('Finding intersections! This will take time!');

  for (let i = wirePoints[0].length - 1; i >= 0; i--) {
    for (let j = wirePoints[1].length - 1; j >= 0; j--) {
      if (cmpWirePoints(wirePoints[0][i], wirePoints[1][j])) {
        intersections.push([wirePoints[0][i][0], wirePoints[0][i][1], wirePoints[0][i][2], wirePoints[1][j][2]]);
      }
    }
  }

  console.log('Finding shortest total intersections!');

  let shortestDistance = 999999999;

  for (let i = intersections.length - 1; i >= 0; i--) {
    let len = intersections[i][2] + intersections[i][3];
    if (len < shortestDistance) {
      shortestDistance = len;
    }
  }

  console.log(shortestDistance);
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
