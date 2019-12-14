var input = 0;
var relativeBase = 0;

function runProgram(rows, input, log) {
    let i = 0;
    relativeBase = 0;
    while (i < rows.length) {
        i = doInstructions(rows, i, log);
    }

    return rows;
}

function runCode(code, instructionPointer, log) {
    let operator = code[instructionPointer];
    let param1 = code[instructionPointer + 1];
    let param2 = code[instructionPointer + 2];
    let param3 = code[instructionPointer + 3];

    let mode = getMode(operator);
    switch (operator % 100) {
        case 1:
            code[param3 + (mode[0] === '2' ? relativeBase : 0)] = getValue(mode[2], param1, code, relativeBase) + getValue(mode[1], param2, code, relativeBase);
            return instructionPointer + 4;
        case 2:
            code[param3 + (mode[0] === '2' ? relativeBase : 0)] = getValue(mode[2], param1, code, relativeBase) * getValue(mode[1], param2, code, relativeBase);
            return instructionPointer + 4;
        case 3:
            code[param1 + (mode[2] === '2' ? relativeBase : 0)] = input;
            return instructionPointer + 2;
        case 4:
            log.push(getValue(mode[2], param1, code, relativeBase));
            return instructionPointer + 2;
        case 5:
            return getValue(mode[2], param1, code, relativeBase) !== 0 ? getValue(mode[1], param2, code, relativeBase) : instructionPointer + 3;
        case 6:
            return getValue(mode[2], param1, code, relativeBase) === 0 ? getValue(mode[1], param2, code, relativeBase) : instructionPointer + 3;
        case 7:
            code[param3 + (mode[0] === '2' ? relativeBase : 0)] = getValue(mode[2], param1, code, relativeBase) < getValue(mode[1], param2, code, relativeBase) ? 1 : 0;
            return instructionPointer + 4;
        case 8:
            code[param3 + (mode[0] === '2' ? relativeBase : 0)] = getValue(mode[2], param1, code, relativeBase) === getValue(mode[1], param2, code, relativeBase) ? 1 : 0;
            return instructionPointer + 4;
        case 9:
            relativeBase += getValue(mode[2], param1, code, relativeBase);
            return instructionPointer + 2;
        case 99:
        default:
            return code.length;
    }
}

function getValue(mode, param, code, relativeBase) {
    return mode === '1' ? param : mode === '2' ? (code[param + relativeBase] ? code[param + relativeBase] : 0) : (code[param] ? code[param] : 0);
}

function getMode(operator) {
    let mode = (operator / 100).toFixed(0);
    return mode.length === 1 ? '00' + mode : mode.length === 2 ? '0' + mode : mode;
}