
let mem: number[] = [];

function gm(addr: number): number {
  if (addr < 0) {
    console.log('READ FROM NEGATIVE!');
    return 0;
  }
  if (mem[addr] === undefined) {
    mem[addr] = 0;
  }
  return mem[addr];
}

function modegmaddr(addr: number, bpc: number, mode: number): number {
  if (mode === 0) {
    return gm(addr);
  }
  if (mode === 1) {
    return addr;
  }
  if (mode === 2) {
    return bpc + gm(addr);
  }
}

function modegm(addr: number, bpc: number, mode: number): number {
  return gm(modegmaddr(addr, bpc, mode));
}

function wm(addr: number, n: number) {
  if (addr < 0) {
    console.log('WROTE TO NEGATIVE!');
    return;
  }
  mem[addr] = n;
}

function modewmaddr(addr: number, bpc: number, mode: number): number {
  if (mode === 0) {
    return gm(addr);
  }
  if (mode === 1) {
    return addr;
  }
  if (mode === 2) {
    return bpc + gm(addr);
  }
}

function modewm(addr: number, bpc: number, mode: number, n: number) {
  wm(modegmaddr(addr, bpc, mode), n);
}

function readInput(): number {
  console.log('READ INPUT!');
  return 2;
}

function runOps() {
  let pc = 0;
  let bpc = 0;
  while (gm(pc) !== 99) {
    let mode1 = 0;
    let mode2 = 0;
    let mode3 = 0;
    let op = gm(pc);

    mode3 = (op > 20000 ? 2 : (op > 10000 ? 1 : 0));
    op = op - mode3 * 10000;
    mode2 = (op > 2000 ? 2 : (op > 1000 ? 1 : 0));
    op = op - mode2 * 1000;
    mode1 = (op > 200 ? 2 : (op > 100 ? 1 : 0));
    op = op - mode1 * 100;

    if (mode3) {
      console.log('WERE IN MODE 3');
    }

    //console.log('OP was', op, 'ORIG OP was', gm(pc), 'PC was', pc, 'BPC was', bpc, 'MODES were', mode1, mode2, mode3);

    if (op === 1) {
      modewm(pc + 3, bpc, mode3, modegm(pc + 2, bpc, mode2) + modegm(pc + 1, bpc, mode1));
      //wm(gm(pc + 3), modegm(pc + 2, bpc, mode2) + modegm(pc + 1, bpc, mode1));
      pc+= 4;
    } else if (op === 2) {
      modewm(pc + 3, bpc, mode3, modegm(pc + 2, bpc, mode2) * modegm(pc + 1, bpc, mode1));
      //wm(gm(pc + 3), modegm(pc + 2, bpc, mode2) * modegm(pc + 1, bpc, mode1));
      pc+= 4;
    } else if (op === 3) {
      let inp = readInput();
      //console.log("READINPUT", inp, "TO", modegm(pc + 1, bpc, mode1), modegmaddr(pc + 1, bpc, mode1));
      //wm(modegm(pc + 1, bpc, mode1), readInput());
      //wm(mode1 === 2 ? bpc + gm(pc + 1) : gm(pc + 1), inp);
      //wm(mode1 === 2 ? modegmaddr(pc + 1, bpc, 2) : gm(pc + 1), inp);
      //wm(modegmaddr(pc + 1, bpc, mode1), inp);
      modewm(pc + 1, bpc, mode1, inp);
      //wm(gm(pc + 1), inp);
      pc+= 2;
    } else if (op === 4) {
      //console.log(modegm(pc + 1, bpc, mode1));
      console.log(modegm(pc + 1, bpc, mode1), pc, modegmaddr(pc + 1, bpc, mode1));
      //console.log(gm(gm(pc + 1)), ': at pc', pc);
      /*if(gm(gm(pc + 1)) !== 0) {
        console.log(gm(pc - 4), gm(pc - 3),
          gm(pc - 2), gm(pc - 1));
      }*/
      pc+= 2;
    } else if (op === 5) {
      if (modegm(pc + 1, bpc, mode1) !== 0) {
        pc = modegm(pc + 2, bpc, mode2);
      } else {
        pc+= 3;
      }
    } else if (op === 6) {
      if (modegm(pc + 1, bpc, mode1) === 0) {
        pc = modegm(pc + 2, bpc, mode2);
      } else {
        pc+= 3;
      }
    } else if (op === 7) {
      modewm(pc + 3, bpc, mode3,
      //wm(gm(pc + 3),
        modegm(pc + 1, bpc, mode1) < modegm(pc + 2, bpc, mode2) ? 1 : 0);
      pc+= 4;
    } else if (op === 8) {
      modewm(pc + 3, bpc, mode3,
      //wm(gm(pc + 3),
        modegm(pc + 1, bpc, mode1) === modegm(pc + 2, bpc, mode2) ? 1 : 0);
      pc+= 4;
    } else if (op === 9) {
      bpc = bpc + modegm(pc + 1, bpc, mode1);
      pc+= 2;
    } else {
      console.log(`Invalid op ${gm(pc)} at ${pc}`);
      return;
    }
  }
  console.log('PC was', pc, 'when the execution reached a 99 op.');
  return;
}

function main(input: string) {
  let memory: number[] = input.split(',').map((i) => {
    return parseInt(i, 10);
  });

  mem = memory;
  runOps();
  console.log(mem);
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
