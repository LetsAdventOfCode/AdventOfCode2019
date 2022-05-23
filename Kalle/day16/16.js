function handleClick(myRadio) {
    let textArea = document.getElementById("signal");
    let phases = document.getElementById("phases");
    switch (parseInt(myRadio.value)) {
        case 1:
            textArea.value = "12345678";
            phases.value = 4;
            break;
        case 2:
            textArea.value = "80871224585914546619083218645595";
            phases.value = 100;
            break;
        case 3:
            textArea.value = "19617804207202209144916044189917";
            phases.value = 100;
            break;
        case 4:
            textArea.value = "69317163492948606335995924319873";
            phases.value = 100;
            break;
        case 100:
        default:
            textArea.value = "59768092839927758565191298625215106371890118051426250855924764194411528004718709886402903435569627982485301921649240820059827161024631612290005106304724846680415690183371469037418126383450370741078684974598662642956794012825271487329243583117537873565332166744128845006806878717955946534158837370451935919790469815143341599820016469368684893122766857261426799636559525003877090579845725676481276977781270627558901433501565337409716858949203430181103278194428546385063911239478804717744977998841434061688000383456176494210691861957243370245170223862304663932874454624234226361642678259020094801774825694423060700312504286475305674864442250709029812379";
            phases.value = 100;
            break;
    }
}

function solve() {
    let signal = document.getElementById("signal").value.split('').map(num => parseInt(num));
    let phases = document.getElementById("phases").value;
    let pattern = [0, 1, 0, -1];

    let decodeTest = fft([...signal], phases, pattern);
    document.getElementById("solution").innerHTML = decodeTest.join('').substring(0, 8);
    //let decodedSignal = fft(getActualSignal(signal), phases, pattern);

    //let offset = decodedSignal.slice(0, 8);

    
    //document.getElementById("solution2").innerHTML = decodedSignal.join('').substring(offset, 8);
}

function getActualSignal(signal) {
    let realSignal = [];
    for (let i = 0; i < 10000; i++) {
        realSignal = realSignal.concat(signal);
    }
    return realSignal;
}

function fft(signal, phases, pattern) {
    while (phases > 0) {
        let output = [];
        for (let i = 0; i < signal.length; i++) {
            let patternToApply = createPattern(pattern, i, signal.length);
            output.push(applyPattern(signal, patternToApply, i));
        }
        signal = output;
        phases--;
    }
    return signal;
}

function applyPattern(signal, patternToApply, outputIndex) {
    let newOutput = 0;
    for (let i = 0; i < signal.length; i++) {
        newOutput += signal[i] * patternToApply[i];
    }
    let newOutputString = newOutput.toString();
    let ans = parseInt(newOutputString[newOutputString.length - 1]);
    //console.log(outputIndex + ' ' + newOutputString);
    return ans;
}

function getPatternForSignal(pat, outputIndex, inputIndex) {    
    let i = outputIndex !== 0 ? Math.floor((inputIndex + 1) / outputIndex) : inputIndex + 1;
    return pat[i % 4];
}

function createPattern(pat, outputi, length) {
    let pattern = [];
    for (let i = 0; i <= length; i++) {
        pattern.push(pat[i % 4]);
        for (let j = 0; j < outputi; j++) {
            pattern.push(pat[i % 4]);
        }
        if (pattern.length >= length + 1) break;
    }
    pattern.shift();
    return pattern;
}

handleClick(100);