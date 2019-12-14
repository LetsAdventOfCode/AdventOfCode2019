function solve() {
    let programCode = document.getElementById("instructions").value.split(",").map(num => parseInt(num));
    let phaseSettingsVariations = permute([0, 1, 2, 3, 4]);
    let thrust = 0;

    for (let phaseSettings of phaseSettingsVariations) {
        let amplifiers = [];
        let log = [0];
        for (let i in phaseSettings) {
            amplifiers.push(new IntCodeComputer([...programCode]));
            amplifiers[i].input = phaseSettings[i];
            while (amplifiers[i].instructionPointer < programCode.length) {
                amplifiers[i].instructionPointer = amplifiers[i].executeInstruction(log);
                amplifiers[i].input = log[i];
            }
        }
        if (thrust < log[log.length - 1]) {
            powerSetting = phaseSettings;
            thrust = log[log.length - 1];
        }
    }

    document.getElementById("solution").innerHTML = thrust;
    //document.getElementById("solution2").innerHTML = powerSetting;
}

function permute(phaseSettings) {
    if (phaseSettings.length < 2) return phaseSettings;

    let permutations = [];

    for (let i = 0; i < phaseSettings.length; i++) {
        let setting = phaseSettings[i];

        if (phaseSettings.indexOf(setting) !== i)
            continue;

        var remainingSettings = phaseSettings.slice(0, i).concat(phaseSettings.slice(i + 1, phaseSettings.length));

        for (let subPermutation of permute(remainingSettings))
            permutations.push([setting].concat(subPermutation));

    }
    return permutations;
}