function solve() {
    let intCode = document.getElementById("intCode").value.split(",").map(num => parseInt(num));
    let phaseSettingsVariations = permute([0, 1, 2, 3, 4]);
    let maxThrust = findMaxThrust(intCode, phaseSettingsVariations);

    let phaseSettingsFeedback = permute([5, 6, 7, 8, 9]);
    let maxThrustFeedback = findMaxThrust(intCode, phaseSettingsFeedback);

    document.getElementById("maxThrust").innerHTML = maxThrust.thrust;
    document.getElementById("phaseSettings").innerHTML = maxThrust.phaseSettings.join(', ');
    document.getElementById("maxThrustFeedback").innerHTML = maxThrustFeedback.thrust;
    document.getElementById("phaseSettingsFeedback").innerHTML = maxThrustFeedback.phaseSettings.join(', ');
}

function findMaxThrust(intCode, phaseSettingsVariations) {
    let maxThrust = { thrust: 0, phaseSettings: [] };
    for (let phaseSettings of phaseSettingsVariations) {
        let amplifiers = setupAmplifiers(intCode, phaseSettings);
        
        let thrust = 0;
        while (amplifiers.every(amp => !amp.hasTerminated)) {
            for (let amplifier of amplifiers) {
                amplifier.inputHandler.input = thrust;
                thrust = amplifyThrust(amplifier);
            }

            if (maxThrust.thrust < thrust) {
                maxThrust.phaseSettings = phaseSettings;
                maxThrust.thrust = thrust;
            }
        }
    }
    return maxThrust;
}

function amplifyThrust(amplifier) {
    let log = [];
    while (log.length < 1 && !amplifier.hasTerminated) {
        amplifier.instructionPointer = amplifier.executeInstruction(log);
    }
    return log[0];
}

function setupAmplifiers(intCode, phaseSettings) {
    let amplifiers = [];
    for (let i = 0; i < 5; i++) {
        let amplifier = new IntCodeComputer([...intCode]);
        amplifier.inputHandler = new InputHandler(phaseSettings[i]);
        amplifiers.push(amplifier);
    }
    return amplifiers;
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

class InputHandler {
    constructor(phaseSetting) {
        this.phaseSetting = phaseSetting;
        this.phaseSettingUsed = false;
    }

    input;

    getInput() {
        let input = this.phaseSettingUsed ? this.input : this.phaseSetting;
        this.phaseSettingUsed = true;
        return input;
    }
}