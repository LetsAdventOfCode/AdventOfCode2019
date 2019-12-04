var matrixSize = 14000;
var startPos = 5000;
function solve() {
    let instructions = document.getElementById("input").value.split("\n").map(str => str.split(","));
    let matrix = createMatrix();
	let result = { shortest: 999999, shortestWireShortCircuit: 99999999, shortCircuits: [], stepsDict: [] };
	runWires(instructions, matrix, result);
	
	var ctx = document.getElementById('canvas').getContext('2d');
	drawMatrix(matrix, ctx);
    document.getElementById("solution").innerHTML = result.shortest;
	document.getElementById("solution2").innerHTML = result.shortestWireShortCircuit;
}

function drawMatrix(matrix, context){
    var cellWidth = canvas.width / matrixSize;
    var cellHeight = canvas.height / matrixSize;

    matrix.forEach((row, y) =>{
        row.forEach((value, x) => {
            context.fillStyle = cellColor(value);
            context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        });
    });
}
function cellColor(val) {
    if(val == 1){
        return 'red';
    }
	if(val == 2){
        return 'green';
    }
	if(val == 3){
        return 'yellow';
    }
	if(val == 0){
		return 'blue'
	}
    return 'white';
}

function runWires(instructions, matrix, result){
	var currentState = {
		"first": { "x": startPos, "y": startPos, "xdir": 0, "ydir": 0, "steps": 0, "tag": 1 },
		"second": { "x": startPos, "y": startPos, "xdir": 0, "ydir": 0, "steps": 0, "tag": 2 }
	}
	
	matrix[startPos][startPos] = 0;
	var usedSteps = { firstSteps: 0, secondSteps: 0 }
	for	(var i = 0; i < instructions[0].length; i++){
		performInstructions(currentState, instructions[0][i], instructions[1][i], matrix, result, usedSteps)
	}
}

function performInstructions(currentState, firstInstruction, secondInstruction, matrix, result, usedSteps){
	setDirection(currentState.first, firstInstruction);
	setDirection(currentState.second, secondInstruction);
	
	while(Math.max(currentState.first.steps, currentState.second.steps) > 0){
		step(currentState.first, matrix, result, usedSteps);
		step(currentState.second, matrix, result, usedSteps);
	}
}

function step(state, matrix, result, usedSteps){
	if(state.steps > 0){
		usedSteps.firstSteps += state.tag == 1 ? 1 : 0;
		usedSteps.secondSteps += state.tag == 2 ? 1 : 0;
		state.x += state.xdir;
		state.y += state.ydir;
		if(!result.stepsDict[state.x +  ',' + state.y]) {
			result.stepsDict[state.x +  ',' + state.y] = { firstSteps: state.tag == 1 ? usedSteps.firstSteps : 0, secondSteps: state.tag == 2 ? usedSteps.secondSteps : 0 };
		}
		else if(state.tag == 1){
			result.stepsDict[state.x +  ',' + state.y].firstSteps = usedSteps.firstSteps;
		}
		else if(state.tag == 2){
			result.stepsDict[state.x +  ',' + state.y].secondSteps = usedSteps.secondSteps;
		}
		if(!matrix[state.x][state.y] || matrix[state.x][state.y] == state.tag)
			matrix[state.x][state.y] = state.tag;
		else{
			matrix[state.x][state.y] = 3
			let shortCircuit = { "x": state.x, "y": state.y, usedSteps: result.stepsDict[state.x + ',' + state.y] };
			shortCircuit.manhattanDistance = manhattanDistance(startPos, startPos, state.x, state.y);
			result.shortCircuits.push(shortCircuit);
			result.shortest = Math.min(shortCircuit.manhattanDistance, result.shortest);
			result.shortestWireShortCircuit = Math.min((shortCircuit.usedSteps.firstSteps + shortCircuit.usedSteps.secondSteps), result.shortestWireShortCircuit);
		}
		state.steps--;
	}
}

function setDirection(state, instruction){
	resetInstruction(state);
	if(instruction){
		switch(instruction.substr(0, 1)){
		case "R":
			state.xdir = 1;
			break;
		case "L":
			state.xdir = -1;
			break;
		case "U":
			state.ydir = 1;
			break;
		case "D":
			state.ydir = -1;
			break;
	}
	state.steps = parseInt(instruction.substr(1), 10);
	}
}

function resetInstruction(state){
	state.xdir = 0;
	state.ydir = 0;
	state.steps = 0;
}

manhattanDistance = (a, b, x, y) => {
	return (Math.abs(a - x) + Math.abs(b - y));
}

createMatrix = () =>  {
	let matrix = [];
	for(let i = 0; i < matrixSize; i++) {
		matrix[i] = new Array(matrixSize);
	}
	return matrix;
}

