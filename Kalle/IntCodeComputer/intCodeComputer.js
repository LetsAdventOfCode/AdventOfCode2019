class IntCodeComputer {
    constructor(intCode) {
        this.intCode = intCode;
    }

    input = 0;
    relativeBase = 0;
    instructionPointer = 0;
    intCode;
    inputHandler;

    get hasTerminated() {
        return this.instructionPointer >= this.intCode.length;
    } 

    runProgram(input, log) {
        this.input = input;
        this.relativeBase = 0;
        this.instructionPointer = 0;
        while (this.instructionPointer < this.intCode.length) {
            this.instructionPointer = this.executeInstruction(log);
        }
    }

    executeInstruction(log) {
        let operator = this.intCode[this.instructionPointer];
        let mode = this.getMode(operator);

        let param1 = this.getValue(mode[2], this.intCode[this.instructionPointer + 1]);
        let param2 = this.getValue(mode[1], this.intCode[this.instructionPointer + 2]);
        let param3 = this.getResultIndex(mode[0], 3);

        switch (operator % 100) {
            case 1:
                this.intCode[param3] = param1 + param2;
                return this.instructionPointer + 4;
            case 2:
                this.intCode[param3] = param1 * param2;
                return this.instructionPointer + 4;
            case 3:
                this.intCode[this.getResultIndex(mode[2], 1)] = this.getInput();
                return this.instructionPointer + 2;
            case 4:
                log.push(param1);
                return this.instructionPointer + 2;
            case 5:
                return param1 !== 0 ? param2 : this.instructionPointer + 3;
            case 6:
                return param1 === 0 ? param2 : this.instructionPointer + 3;
            case 7:
                this.intCode[param3] = param1 < param2 ? 1 : 0;
                return this.instructionPointer + 4;
            case 8:
                this.intCode[param3] = param1 === param2 ? 1 : 0;
                return this.instructionPointer + 4;
            case 9:
                this.relativeBase += param1;
                return this.instructionPointer + 2;
            case 99:
            default:
                return this.intCode.length;
        }
    }

    getInput() {
        if (typeof this.inputHandler !== 'undefined') {
            this.input = this.inputHandler.getInput();
        }
        return this.input;
    }

    getResultIndex(mode, x) {
        return this.intCode[this.instructionPointer + x] + (mode === '2' ? this.relativeBase : 0);
    }

    getValue(mode, param) {
        return mode === '1' ? param : mode === '2' ? this.intCode[param + this.relativeBase] ? this.intCode[param + this.relativeBase] : 0 : this.intCode[param] ? this.intCode[param] : 0;
    }

    getMode(operator) {
        let mode = (operator / 100).toFixed(0);
        return mode.length === 1 ? '00' + mode : mode.length === 2 ? '0' + mode : mode;
    }
}