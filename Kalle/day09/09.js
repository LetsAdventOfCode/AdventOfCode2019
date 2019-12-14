function solve() {
    let code = document.getElementById("instructions").value.split(",").map(num => parseInt(num));
    let input = parseInt(document.getElementById("input").value);
    let input2 = parseInt(document.getElementById("input2").value);
    let log = [];
    let log2 = [];
    let intCodeComputer = new IntCodeComputer([...code]);
    let intCodeComputer2 = new IntCodeComputer([...code]);
    intCodeComputer.runProgram(input, log);
    intCodeComputer2.runProgram(input2, log2);

    document.getElementById("solution").innerHTML = log.join();
    document.getElementById("solution2").innerHTML = log2.join();
}