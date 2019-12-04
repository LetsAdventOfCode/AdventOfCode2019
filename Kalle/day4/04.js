function solve() {
    let passwordLimits = document.getElementById("input").value.split("-").map(num => parseInt(num));
    
	let result = [];
	bruteforce(passwordLimits, result);
	
    document.getElementById("solution").innerHTML = result.shortest;
	document.getElementById("solution2").innerHTML = result.shortestWireShortCircuit;
}

function bruteforce(passwordLimits, result){
	for(let i = passwordLimits[0]; i < passwordLimits[1]; i++) {
		if(isValidPassword(i + '') && onlyIncresing(i + '')){
			result.push(i);
		}
	}
}

function isValidPassword(password) {
	var dupesRegexp = /(.{1}){1}\1/g;
	var tripletsRegexp = /([0-9])\1\1/g;
	var dupes = password.match(dupesRegexp);
	var triplets = password.match(tripletsRegexp);
	return dupes && dupes.some(dupe => !triplets || triplets.every(triple => dupe[1] != triple[1]))
}

function onlyIncresing(password){
	for(let i = 0; i < password.length - 1; i++)
		if(password[i] > password[i+1]) return false;
	return true;
}