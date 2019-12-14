class IntCodeComputer {
    input = 0;
    relativeBase = 0;
    instructionPointer = 0;

    constructor(programCode) {
        this.programCode = programCode;
    }
   
    runProgram(input, log) {
        this.input = input;
        this.relativeBase = 0;
        this.instructionPointer = 0;
        while (this.instructionPointer < this.programCode.length) {
            this.instructionPointer = this.executeInstruction(log);
        }
    }

    executeInstruction(log) {
        let operator = this.programCode[this.instructionPointer];
        let mode = this.getMode(operator);

        let param1 = this.getValue(mode[2], this.programCode[this.instructionPointer + 1]);
        let param2 = this.getValue(mode[1], this.programCode[this.instructionPointer + 2]);
        let param3 = this.getResultIndex(mode[0], 3);

        switch (operator % 100) {
            case 1:
                this.programCode[param3] = param1 + param2;
                return this.instructionPointer + 4;
            case 2:
                this.programCode[param3] = param1 * param2;
                return this.instructionPointer + 4;
            case 3:
                this.programCode[this.getResultIndex(mode[2], 1)] = this.input;
                return this.instructionPointer + 2;
            case 4:
                log.push(param1);
                return this.instructionPointer + 2;
            case 5:
                return param1 !== 0 ? param2 : this.instructionPointer + 3;
            case 6:
                return param1 === 0 ? param2 : this.instructionPointer + 3;
            case 7:
                this.programCode[param3] = param1 < param2 ? 1 : 0;
                return this.instructionPointer + 4;
            case 8:
                this.programCode[param3] = param1 === param2 ? 1 : 0;
                return this.instructionPointer + 4;
            case 9:
                this.relativeBase += param1;
                return this.instructionPointer + 2;
            case 99:
            default:
                return this.programCode.length;
        }
    }

    getResultIndex(mode, x) {
        return this.programCode[this.instructionPointer + x] + (mode === '2' ? this.relativeBase : 0);
    }

    getValue(mode, param) {
        return mode === '1' ? param : mode === '2' ? (this.programCode[param + this.relativeBase] ? this.programCode[param + this.relativeBase] : 0) : (this.programCode[param] ? this.programCode[param] : 0);
    }

    getMode(operator) {
        let mode = (operator / 100).toFixed(0);
        return mode.length === 1 ? '00' + mode : mode.length === 2 ? '0' + mode : mode;
    }
}

//var input = 0;
//var relativeBase = 0;

//function runProgram(rows, input, log) {
//    let i = 0;
//    relativeBase = 0;
//    while (i < rows.length) {
//        i = doInstructions(rows, i, log);
//    }

//    return rows;
//}

//function runCode(code, instructionPointer, log) {
//    let operator = code[instructionPointer];
//    let param1 = code[instructionPointer + 1];
//    let param2 = code[instructionPointer + 2];
//    let param3 = code[instructionPointer + 3];

//    let mode = getMode(operator);
//    switch (operator % 100) {
//        case 1:
//            code[param3 + (mode[0] === '2' ? relativeBase : 0)] = getValue(mode[2], param1, code, relativeBase) + getValue(mode[1], param2, code, relativeBase);
//            return instructionPointer + 4;
//        case 2:
//            code[param3 + (mode[0] === '2' ? relativeBase : 0)] = getValue(mode[2], param1, code, relativeBase) * getValue(mode[1], param2, code, relativeBase);
//            return instructionPointer + 4;
//        case 3:
//            code[param1 + (mode[2] === '2' ? relativeBase : 0)] = input;
//            return instructionPointer + 2;
//        case 4:
//            log.push(getValue(mode[2], param1, code, relativeBase));
//            return instructionPointer + 2;
//        case 5:
//            return getValue(mode[2], param1, code, relativeBase) !== 0 ? getValue(mode[1], param2, code, relativeBase) : instructionPointer + 3;
//        case 6:
//            return getValue(mode[2], param1, code, relativeBase) === 0 ? getValue(mode[1], param2, code, relativeBase) : instructionPointer + 3;
//        case 7:
//            code[param3 + (mode[0] === '2' ? relativeBase : 0)] = getValue(mode[2], param1, code, relativeBase) < getValue(mode[1], param2, code, relativeBase) ? 1 : 0;
//            return instructionPointer + 4;
//        case 8:
//            code[param3 + (mode[0] === '2' ? relativeBase : 0)] = getValue(mode[2], param1, code, relativeBase) === getValue(mode[1], param2, code, relativeBase) ? 1 : 0;
//            return instructionPointer + 4;
//        case 9:
//            relativeBase += getValue(mode[2], param1, code, relativeBase);
//            return instructionPointer + 2;
//        case 99:
//        default:
//            return code.length;
//    }
//}

//function getValue(mode, param, code, relativeBase) {
//    return mode === '1' ? param : mode === '2' ? (code[param + relativeBase] ? code[param + relativeBase] : 0) : (code[param] ? code[param] : 0);
//}

//function getMode(operator) {
//    let mode = (operator / 100).toFixed(0);
//    return mode.length === 1 ? '00' + mode : mode.length === 2 ? '0' + mode : mode;
//}