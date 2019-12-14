function solve() {
    let programCode = document.getElementById("instructions").value.split(",").map(num => parseInt(num));
    let input = parseInt(document.getElementById("input").value);
    let input2 = parseInt(document.getElementById("input2").value);
    let log = [];
    let log2 = [];
    let intcodeComputer = new IntCodeComputer([...programCode]);
    let intcodeComputer2 = new IntCodeComputer([...programCode]);
    intcodeComputer.runProgram(input, log);
    intcodeComputer2.runProgram(input2, log2);

    document.getElementById("solution").innerHTML = log[log.length - 1];
    document.getElementById("solution2").innerHTML = log2[log2.length - 1];
}