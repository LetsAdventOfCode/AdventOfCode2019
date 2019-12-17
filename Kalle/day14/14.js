var longestPath = 0;
var tierList = [];
function solve() {
    tierList = [];
    longestPath = 0;
    let cookBook = document.getElementById("instructions").value.split("\n");
    recipes = parseCookBook(cookBook);
    countPath(recipes['FUEL']);
    let waste = {};
    let requiredOre = { quantity: 0 };
    simplify(recipes['FUEL'], requiredOre, waste);
    let copyWaste = copyAndMultiplyWaste(waste, 1);
    let returnedOre = { quantity: 0 };
    for (let i = tierList.length - 1; i >= 0; i--) {
        for (let key in tierList[i]) {
            tryReturnWaste(key, copyWaste, returnedOre);
        }
    }

    let availableOre = parseInt(document.getElementById("availableOre").value);
    let maxFuels = calcMaxFuels(availableOre, requiredOre.quantity - returnedOre.quantity, copyWaste);

    document.getElementById("solution").innerHTML = requiredOre.quantity - returnedOre.quantity;
    document.getElementById("solution2").innerHTML = maxFuels;
}

function countPath(recipe) {
    if (recipe.ingredients[0].name === 'ORE') {
        recipe.tier = 0;
        if (!tierList[0]) {
            tierList[0] = [];
        }
        tierList[0][recipe.name] = true;
        return 0;
    }

    let a = recipe.ingredients.map(i => 1 + countPath(recipes[i.name]));
    let longestChild = Math.max(...a);
    if (!tierList[longestChild]) {
        tierList[longestChild] = [];
    }
    recipe.tier = longestChild;
    tierList[longestChild][recipe.name] = true;
    return longestChild;
}

function calcMaxFuels(availableOre, recipeCost, waste) {
    let minimumRepeats = Math.floor(availableOre / recipeCost);
    console.log(minimumRepeats + ' + ');
    let newWaste = copyAndMultiplyWaste(waste, minimumRepeats);
    let returnedOre = { quantity: 0 };
    for (var i = tierList.length - 1; i >= 0; i--) {
        for (let key in tierList[i]) {
            tryReturnWaste(key, newWaste, returnedOre);
        }
    }
    let leftOvers = availableOre + returnedOre.quantity - recipeCost * minimumRepeats;
    return minimumRepeats > 0 ? calcMaxFuels(leftOvers, recipeCost, waste) + minimumRepeats : minimumRepeats;
}

function copyAndMultiplyWaste(waste, multiplier) {
    let newWaste = [];
    for (let i in waste) {
        newWaste[i] = waste[i] * multiplier;
    }
    return newWaste;
}

function simplify(recipe, requiredOre, waste) {
    for (let ingredient of recipe.ingredients) {
        if (ingredient.name === 'ORE') {
            requiredOre.quantity += ingredient.quantity;
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
                simplify(recipeToCraft, requiredOre, waste);
            }
        }
    }
}

function tryReturnWaste(component, waste, returnedOre) {
    if (component === 'ORE')
        return;
    let recipe = recipes[component];
    if (waste[component]) {
        let canBeSimplifiedTimes = Math.floor(waste[component] / recipe.quantity);
        
        if (canBeSimplifiedTimes) {
            let rest = waste[component] % recipe.quantity;
            console.log('Replacíng ' + canBeSimplifiedTimes * recipe.quantity + ' ' + recipe.name + ' with ' + recipe.ingredients.map(i => (canBeSimplifiedTimes * i.quantity) + ' ' + i.name).join(', ') + ' leaving ' + rest + ' ' + recipe.name);
            if (rest > 0) {
                waste[component] = rest;
            } else {
                delete waste[component];
            }
            
            for (let ingredient of recipe.ingredients) {
                if (ingredient.name === 'ORE') {
                    returnedOre.quantity += canBeSimplifiedTimes * ingredient.quantity;
                }
                else {
                    if (!waste[ingredient.name]) {
                        waste[ingredient.name] = 0;
                    }
                    waste[ingredient.name] += canBeSimplifiedTimes * ingredient.quantity;
                }
            }
        }
    }
}

function parseCookBook(cookBook) {
    let dict = {};
    for (let recipe of cookBook) {
        let splittedRecipe = recipe.split('=>');
        let ingredients = splittedRecipe[0].split(',').map(i => i.trim()).map(v => createComponent(v));
        let chemical = splittedRecipe[1].split(',').map(i => i.trim()).map(v => createComponent(v))[0];
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

function createComponent(component) {
    let splitted = component.split(' ');
    return new Component(splitted[1], parseInt(splitted[0]));
}

class Component {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    name;
    quantity;
}