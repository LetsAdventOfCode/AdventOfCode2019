fs = require('fs');
const input = fs.readFileSync('./input.txt', 'UTF-8');
let parsedInput = input.split('-').map(i => parseInt(i));

function findPasswords(startNumber, endnumber) {
    let validPasswords = 0;
    for (let password = startNumber; password <= endnumber; password++) {
        let passwordArray = password.toString().split('');
        let adjacentNumbers = false;
        for (let i = 0; i < passwordArray.length; i++) {
            if (i === 0) continue;

            if (passwordArray[i] < passwordArray[i - 1] ) {
                break;
            }

            if (passwordArray[i] === passwordArray[i - 1]) {
                adjacentNumbers = true;
            }

            if (i === (passwordArray.length - 1) && adjacentNumbers) {
                console.log('valid password detected', password);
                validPasswords++;
            }
        }
    }

    console.log('Valid passwords:', validPasswords);
}


findPasswords(parsedInput[0], parsedInput[1]);