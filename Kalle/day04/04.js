function solve() {
    var now = new Date();
    let passwordLimits = document.getElementById("input").value.split("-");
    passwordLimits[0] = makeValid(passwordLimits[0]);
	let dumbPasswords = [];
	let dumberPasswords = [];
    smartForce(passwordLimits.map(num => parseInt(num)), dumbPasswords, dumberPasswords);
	
    document.getElementById("solution").innerHTML = dumbPasswords.length;
    document.getElementById("solution2").innerHTML = dumberPasswords.length;
    document.getElementById('time').innerHTML = (new Date() - now) + ' ms';
}

function smartForce(passwordLimits, dumbPasswords, dumberPasswords){
	let evaluatedPasswords = 0;
	for(let i = passwordLimits[0]; i <= passwordLimits[1]; i++) {
        evaluatedPasswords++;
		let password = i + '';
		let validityMatching = password.match(/([0-9])\1+/g);
		if(validityMatching){
			dumbPasswords.push(i);
			
			if(validityMatching.some(m => m.length === 2)){
				dumberPasswords.push(i);
			}
		}
		
		i += skip(password);
    }
    document.getElementById('smartPasswords').innerHTML = evaluatedPasswords;
}

makeValid = (password) => {
    let newPassword = [];
    newPassword[0] = password[0];
    for (let i = 1; i < password.length; i++) {
        newPassword[i] = password[i] > newPassword[i - 1] ? password[i] : newPassword[i - 1];
    }
    return newPassword.join('');
};

skip = (password) => {
    let match = password.match(/9*$/)[0];
    password = password.length === match.length ? '0' + password : password;
    return match.length > 0 ? (match.replace(new RegExp('9', 'g'), '1')) * (password[password.length - 1 - match.length] * 1 + 1) : 0;
};