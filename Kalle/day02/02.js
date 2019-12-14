function solve() {
    var programCode = document.getElementById("input").value.split(",").map(num => parseInt(num));
	
    programCode[1] = 12;
    programCode[2] = 2;
    let intCodeComputer = new IntCodeComputer(programCode.slice());
    intCodeComputer.runProgram(0, []);
	
    var array = programCode.slice();
    recursiveIntProgram(array, 0, 0);
    document.getElementById("solution").innerHTML = intCodeComputer.programCode[0];
	document.getElementById("solution2").innerHTML = array[1] + " " + array[2];
}

function recursiveIntProgram(rows, val1, val2){
	rows[1] = val1;
	rows[2] = val2;
    var array = [...rows]; 
    let intCodeComputer = new IntCodeComputer(array);
    intCodeComputer.runProgram(0, []);
	if(array[0] > 19690720)
		return false;
	return array[0] === 19690720 || recursiveIntProgram(rows, val1 + 1, val2) || recursiveIntProgram(rows, val1, val2 + 1);	
}