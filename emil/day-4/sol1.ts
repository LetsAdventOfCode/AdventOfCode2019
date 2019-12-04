
function checkIncreasing(input: string): boolean {
  let prev = 0;
  for (var i = 0; i < input.length; ++i) {
    let current = parseInt(input[i], 10);
    if(current < prev) {
      return false;
    }
    prev = current;
  }
  return true;
}

function checkDouble(input: string): boolean {
  let prev = 0;
  for (var i = 0; i < input.length; ++i) {
    let current = parseInt(input[i], 10);
    if(current === prev) {
      return true;
    }
    prev = current;
  }
  return false;
}

function checkNum(input: number): boolean {
  const str = '' + input;

  return checkDouble(str) && checkIncreasing(str);
}

function main(input: string) {
  const start = parseInt(input.substring(0, input.indexOf('-')), 10);
  const stop  = parseInt(input.substring(input.indexOf('-') + 1), 10);

  let count = 0;

  for (var i = start; i <= stop; ++i) {
    count+= (checkNum(i) ? 1 : 0);
  }

  console.log(count);
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
