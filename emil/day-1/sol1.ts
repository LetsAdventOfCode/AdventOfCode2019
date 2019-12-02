
function requiredFuel(mass: number) {
  return Math.floor(mass/3) - 2;
}

function main(input: string) {
  const data = input.split('\n');
  const res = data.reduce((acc, d) => {
    if(d.length === 0) return acc;
    return acc += requiredFuel(parseInt(d, 10));
  }, 0);
  console.log(res);
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

