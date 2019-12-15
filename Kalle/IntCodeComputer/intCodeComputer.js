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
        return mode === '1' ? param : mode === '2' ? this.programCode[param + this.relativeBase] ? this.programCode[param + this.relativeBase] : 0 : this.programCode[param] ? this.programCode[param] : 0;
    }

    getMode(operator) {
        let mode = (operator / 100).toFixed(0);
        return mode.length === 1 ? '00' + mode : mode.length === 2 ? '0' + mode : mode;
    }
}