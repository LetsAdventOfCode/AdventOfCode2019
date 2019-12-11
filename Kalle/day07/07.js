function solve() {
    var rows = document.getElementById("input").value.split(",").map(num => parseInt(num));

    rows[1] = 12;
    rows[2] = 2;

    var runOnceArray = intProgram(rows.slice());

    var array = rows.slice();
    recursiveIntProgram(array, 0, 0);
    document.getElementById("solution").innerHTML = runOnceArray[0];
    document.getElementById("solution2").innerHTML = array[1] + " " + array[2];
}

function recursiveIntProgram(rows, val1, val2) {
    rows[1] = val1;
    rows[2] = val2;
    var array = [...rows];
    intProgram(array);
    if (array[0] > 19690720)
        return false;
    return array[0] === 19690720 || recursiveIntProgram(rows, val1 + 1, val2) || recursiveIntProgram(rows, val1, val2 + 1);
}

function intProgram(rows) {
    for (var i = 0; i < rows.length - 4; i += 4) {
        if (rows[i] === 99)
            break;
        doInstructions(rows, rows[i], rows[i + 1], rows[i + 2], rows[i + 3]);
    }
    return rows;
}

function doInstructions(array, operator, leftIndex, rightIndex, solutionIndex) {
    if (operator === 1)
        array[solutionIndex] = array[leftIndex] + array[rightIndex];
    else if (operator === 2)
        array[solutionIndex] = array[leftIndex] * array[rightIndex];
}