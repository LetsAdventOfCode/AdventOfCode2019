fs = require('fs');
const input = fs.readFileSync('./input.txt', 'UTF-8');
let parsedInput = input.split('\r\n').map(i => parseInt(i));

function calcFuelRequired(inputData) {
    let totaltFuelRequired = 0;
    inputData.forEach(mass => {
        conditionalMass = mass;
        while (conditionalMass) {
            let calculatedFuel = makeCalculationOnMass(conditionalMass);
            if (calculatedFuel > 0) {
                totaltFuelRequired += calculatedFuel;
                conditionalMass = calculatedFuel;
            } else {
                conditionalMass = false;
            }
        }
    });
    console.log(totaltFuelRequired);
}
function makeCalculationOnMass(mass) {
    return Math.floor((mass / 3)) - 2;
}

calcFuelRequired(parsedInput); // 4898585


