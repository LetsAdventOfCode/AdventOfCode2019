function solve() {
    let code = document.getElementById("instructions").value.split(",").map(num => parseInt(num));
    let input = parseInt(document.getElementById("input").value);
    let input2 = parseInt(document.getElementById("input2").value);
    let log = [];
    let log2 = [];
    intProgram(code.slice(), input, log);
    intProgram(code.slice(), input2, log2);

    document.getElementById("solution").innerHTML = log[log.length - 1];
    document.getElementById("solution2").innerHTML = log2[log2.length - 1];
}

function intProgram(rows, input, log) {
    let i = 0;
    while (i < rows.length) {
        i = doInstructions(rows, i, input, log);
    }

    return rows;
}

function doInstructions(code, instructionPointer, input, log) {
    let operator = code[instructionPointer];
    let param1 = code[instructionPointer + 1];
    let param2 = code[instructionPointer + 2];
    let param3 = code[instructionPointer + 3];
    let mode = getMode(operator);
    switch (operator % 100) {
        case 1:
            code[param3] = getValue(mode[2], param1, code) + getValue(mode[1], param2, code);
            return instructionPointer + 4;
        case 2:
            code[param3] = getValue(mode[2], param1, code) * getValue(mode[1], param2, code);
            return instructionPointer + 4;
        case 3:
            code[param1] = input;
            return instructionPointer + 2;
        case 4:
            log.push(getValue(mode[2], param1, code));
            return instructionPointer + 2;
        case 5:
            return getValue(mode[2], param1, code) !== 0 ? getValue(mode[1], param2, code) : instructionPointer + 3;
        case 6:
            return getValue(mode[2], param1, code) === 0 ? getValue(mode[1], param2, code) : instructionPointer + 3;
        case 7:
            code[param3] = getValue(mode[2], param1, code) < getValue(mode[1], param2, code) ? 1 : 0;
            return instructionPointer + 4;
        case 8:
            code[param3] = getValue(mode[2], param1, code) === getValue(mode[1], param2, code) ? 1 : 0;
            return instructionPointer + 4;
        case 99:
        default:
            return code.length;
    }
}

function getValue(mode, param, code) {
    return mode === '1' ? param : code[param];
}

function getMode(operator) {
    let mode = (operator / 100).toFixed(0);
    return mode.length === 1 ? '00' + mode : mode.length === 2 ? '0' + mode : mode;
}