var matrixSize = 14000;
var startPos = 5000;
function solve() {
    let instructions = document.getElementById("input").value.split("\n").map(str => str.split(","));
    let matrix = createMatrix();
	let foundCrossings = [];
	runWires(instructions, matrix, foundCrossings);

	let shortest = matrixSize;
	for(var i = 0; i < foundCrossings.length; i++){
		shortest = Math.min((Math.abs(foundCrossings[i].x - startPos) + Math.abs(foundCrossings[i].y - startPos)), shortest);
	}
	var ctx = document.getElementById('canvas').getContext('2d');
	drawMatrix(matrix, ctx);
    document.getElementById("solution").innerHTML = shortest;
	// document.getElementById("solution2").innerHTML = array[1] + " " + array[2];
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

function runWires(instructions, matrix, foundCrossings){
	var currentState = {
		"first": { "x": startPos, "y": startPos, "xdir": 0, "ydir": 0, "steps": 0, "tag": 1 },
		"second": { "x": startPos, "y": startPos, "xdir": 0, "ydir": 0, "steps": 0, "tag": 2 }
	}
	
	matrix[startPos][startPos] = 0;
	for	(var i = 0; i < instructions[0].length; i++){
		performInstructions(currentState, instructions[0][i], instructions[1][i], matrix, foundCrossings)
	}
}

function performInstructions(currentState, firstInstruction, secondInstruction, matrix, foundCrossings){
	setDirection(currentState.first, firstInstruction);
	setDirection(currentState.second, secondInstruction);
	
	while(Math.max(currentState.first.steps, currentState.second.steps) > 0){
		step(currentState.first, matrix, foundCrossings);
		step(currentState.second, matrix, foundCrossings);
	}
}

function step(state, matrix, foundCrossings){
	if(state.steps > 0){
		state.x += state.xdir;
		state.y += state.ydir;
		
		if(!matrix[state.x][state.y] || matrix[state.x][state.y] == state.tag)
			matrix[state.x][state.y] = state.tag;
		else{
			matrix[state.x][state.y] = 3
			foundCrossings.push( { "x": state.x, "y": state.y })
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

createMatrix = () =>  {
	let matrix = [];
	for(var i=0; i < matrixSize; i++) {
		matrix[i] = new Array(matrixSize);
	}
	return matrix;
}

