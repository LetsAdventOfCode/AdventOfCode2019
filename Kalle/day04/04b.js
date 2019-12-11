function solve2() {
    var now = new Date();
    let passwordLimits = document.getElementById("input").value.split("-").map(num => parseInt(num));

    let dumbPasswords = [];
    let dumberPasswords = [];
    bruteforce(passwordLimits, dumbPasswords, dumberPasswords);

    document.getElementById("solution3").innerHTML = dumbPasswords.length;
    document.getElementById("solution4").innerHTML = dumberPasswords.length;
    document.getElementById('time2').innerHTML = (new Date() - now) + ' ms';
}

function bruteforce(passwordLimits, dumbPasswords, dumberPasswords) {
    let evaluatedPasswords = 0;
    for (let i = passwordLimits[0]; i <= passwordLimits[1]; i++) {
        evaluatedPasswords++;
        let password = i + '';
        let dupes = {};
        if (isPasswordValid(password, dupes) && areYouSure(password)) {
            dumbPasswords.push(i);

            if (areYouReallyThough(password, dupes.dupes)) {
                dumberPasswords.push(i);
            }
        }
    }
    document.getElementById('dumbPasswords').innerHTML = evaluatedPasswords;
}

function isPasswordValid(password, dupes) {
    let regex = /(.{1}){1}\1/g;
    dupes.dupes = password.match(regex);
    return dupes.dupes;
}

function areYouReallyThough(password, dupes) {
    let tripletsRegexp = /([0-9])\1\1/g;
    let triplets = password.match(tripletsRegexp);
    return dupes && dupes.some(dupe => !triplets || triplets.every(triple => dupe[1] !== triple[1]));
}

function areYouSure(password) {
    for (let i = 0; i < password.length - 1; i++)
        if (password[i] > password[i + 1]) return false;
    return true;
}