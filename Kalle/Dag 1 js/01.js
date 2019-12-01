function solve() {
    var input = document.getElementById("input").value;
    var rows = input.split("\n");
	
	var sum = rows.map(calculateFuelRequirement).reduce((a,b) => a + b, 0);
	var recursiveSum = rows.map(calculateFuelRequirementRecursive).reduce((a,b) => a + b, 0);
	
    document.getElementById("solution").innerHTML = sum;
	document.getElementById("solution2").innerHTML = recursiveSum;
}

function calculateFuelRequirement(mass) {
	return Math.floor((mass/3))-2;
}

function calculateFuelRequirementRecursive(mass) {
	var fuelRequirement = calculateFuelRequirement(mass);
	return fuelRequirement <= 0 ? 0 : fuelRequirement + calculateFuelRequirementRecursive(fuelRequirement);
}