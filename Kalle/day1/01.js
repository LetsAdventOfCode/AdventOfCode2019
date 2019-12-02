function solve() {
    let input = document.getElementById("input").value;
    let rows = input.split("\n").map(num => parseInt(num));
	
	let sum = rows.map(calculateFuelRequirement).reduce((a,b) => a + b, 0);
	let recursiveSum = rows.map(calculateFuelRequirementRecursive).reduce((a,b) => a + b, 0);
	
    document.getElementById("solution").innerHTML = sum;
	document.getElementById("solution2").innerHTML = recursiveSum;
}

function calculateFuelRequirementRecursive(mass) {
	let fuelRequirement = calculateFuelRequirement(mass);
	return fuelRequirement <= 0 ? 0 : fuelRequirement + calculateFuelRequirementRecursive(fuelRequirement);
}

calculateFuelRequirement = (mass) => Math.floor((mass/3))-2;