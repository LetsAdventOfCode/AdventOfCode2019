function solve() {
    let cookBook = document.getElementById("instructions").value.split("\n");
    recipes = parseCookBook(cookBook);
    neededOre = 0;
    let waste = {};
    simplify(recipes['FUEL'], waste);
    let copyWaste = copyAndMultiplyWaste(waste, 1);
    let returnedWasteOre = 0;
    for (let i in waste) {
        returnedWasteOre += tryReturnWaste(copyWaste, i);
    }

    let availableOre = parseInt(document.getElementById("availableOre").value);

    //let minimumRepeats = Math.floor(availableOre / (neededOre - returnedWasteOre));
    let wasteHandling = { previousWaste: waste, waste: waste };
    let maxFuels = calcMaxFuels(availableOre, neededOre - returnedWasteOre, wasteHandling);

    document.getElementById("solution").innerHTML = neededOre - returnedWasteOre;
    document.getElementById("solution2").innerHTML = maxFuels;
}
var neededOre = 0;

function calcMaxFuels(availableOre, recipeCost, wasteHandling) {
    let minimumRepeats = Math.floor(availableOre / recipeCost);
    console.log(minimumRepeats + ' + ');
    let newWaste = copyAndMultiplyWaste(wasteHandling.waste, minimumRepeats);
    let moreReturnedOre = 0;
    for (let i in wasteHandling.waste) {
        moreReturnedOre += tryReturnWaste(newWaste, i);
    }
    let leftOvers = availableOre + moreReturnedOre - recipeCost * minimumRepeats;
    wasteHandling.previousWaste = wasteHandling.waste;
    wasteHandling.waste = newWaste;
    return minimumRepeats > 0 ? calcMaxFuels(leftOvers, recipeCost, wasteHandling) + minimumRepeats : minimumRepeats;
}

function copyAndMultiplyWaste(waste, multiplier) {
    let newWaste = [];
    for (let i in waste) {
        newWaste[i] = waste[i] * multiplier;
    }
    return newWaste;
}

function simplify(recipe, waste) {
    for (let ingredient of recipe.ingredients) {
        if (ingredient.name === 'ORE') {
            neededOre += ingredient.quantity;
        }
        else {
            let recipeToCraft = recipes[ingredient.name];
            let neededRecipeRuns = Math.ceil(ingredient.quantity * recipe.quantity / recipeToCraft.quantity);
            let wasteProduced = recipeToCraft.quantity * neededRecipeRuns - ingredient.quantity;
            if (wasteProduced > 0) {
                if (!waste[ingredient.name]) {
                    waste[ingredient.name] = 0;
                }
                waste[ingredient.name] += wasteProduced;
            }
            for (var i = 0; i < neededRecipeRuns; i++) {
                simplify(recipeToCraft, waste);
            }
        }
    }
}

function tryReturnWaste(waste, i) {
    let returnedOre = 0;
    let recipe = recipes[i];
    let returnableMultiplier = Math.floor(waste[i] / recipe.quantity);
    if (returnableMultiplier > 0) {
        let newWaste = waste[i] % recipe.quantity;
        if (newWaste === 0) {
            delete waste[i];
        }
        else {
            waste[i] = newWaste;
        }

        if (recipe.ingredients[0].name === 'ORE') {
            returnedOre += returnableMultiplier * recipe.ingredients[0].quantity;
        }
        else {
            for (let ingredient of recipe.ingredients) {
                if (!waste[ingredient.name]) {
                    waste[ingredient.name] = 0;
                }
                waste[ingredient.name] += ingredient.quantity * returnableMultiplier;
                returnedOre += tryReturnWaste(waste, ingredient.name);
            }
        }
    }

    return returnedOre;
}

function parseCookBook(cookBook) {
    let dict = {};
    for (let recipe of cookBook) {
        let splittedRecipe = recipe.split('=>');
        let ingredients = splittedRecipe[0].split(',').map(i => i.trim()).map(v => createComponent(v, dict));
        let chemical = splittedRecipe[1].split(',').map(i => i.trim()).map(v => createComponent(v, dict))[0];
        if (dict[chemical.name]) {
            dict[chemical.name].ingredients = ingredients.map();
        }
        else {
            chemical.ingredients = ingredients;
            dict[chemical.name] = chemical;
        }
    }
    return dict;
}

function createComponent(component, dict) {
    let splitted = component.split(' ');
    return {
        quantity: parseInt(splitted[0]),
        name: splitted[1]
    };
}