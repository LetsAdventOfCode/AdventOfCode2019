function solve() {
    let code = document.getElementById("instructions").value.split(",").map(num => parseInt(num));
    let log;
    let phaseSettingsVariations = permute([0, 1, 2, 3, 4]);
    let thrust = 0;
    let powerSetting;
    for (let phaseSettings of phaseSettingsVariations) {
        log = intProgram(code.slice(), phaseSettings[0], 0, []);
        log = intProgram(code.slice(), phaseSettings[1], log[log.length - 1], []);
        log = intProgram(code.slice(), phaseSettings[2], log[log.length - 1], []);
        log = intProgram(code.slice(), phaseSettings[3], log[log.length - 1], []);
        log = intProgram(code.slice(), phaseSettings[4], log[log.length - 1], []);
        if (thrust < log[log.length - 1]) {
            powerSetting = phaseSettings;
            thrust = log[log.length - 1];
        }
    }
    document.getElementById("solution").innerHTML = thrust;
    //document.getElementById("solution2").innerHTML = powerSetting;
}

function intProgram(rows, input, input2, log) {
    let i = 0;
    while (i < rows.length) {
        i = doInstructions(rows, i, i === 0 ? input : input2, log);
    }

    return log;
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

function permute(phaseSettings) {
    if (phaseSettings.length < 2) return phaseSettings;

    var permutations = [];

    for (var i = 0; i < phaseSettings.length; i++) {
        var setting = phaseSettings[i];

        if (phaseSettings.indexOf(setting) !== i)
            continue;

        var remainingSettings = phaseSettings.slice(0, i).concat(phaseSettings.slice(i + 1, phaseSettings.length));

        for (var subPermutation of permute(remainingSettings))
            permutations.push([setting].concat(subPermutation));

    }
    return permutations;
}