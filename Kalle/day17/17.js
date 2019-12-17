function solve() {
    let code = document.getElementById("instructions").value.split(",").map(num => parseInt(num));

    let intCodeComputer = new IntCodeComputer([...code]);

    //document.getElementById("solution").innerHTML = log.join();
    //document.getElementById("solution2").innerHTML = log2.join();
}