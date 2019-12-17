function solve() {
    recipes = parseReactions(document.getElementById("instructions").value.split("\n"));
    let requiredOre = oreToCraftProduct(recipes['FUEL'], 1, {});
    let availableOre = parseInt(document.getElementById("availableOre").value);
    let maxFuels = calcMaxFuels(availableOre, requiredOre);
    document.getElementById("solution").innerHTML = requiredOre;
    document.getElementById("solution2").innerHTML = maxFuels;
}

function calcMaxFuels(availableOre, recipeCost) {
    let minimumRepeats = 0;
    let waste = {};
    let oreAvailable = true;
    while (oreAvailable) {
        let leapOfFaith = Math.floor(availableOre / recipeCost) || 1;
        availableOre -= oreToCraftProduct(recipes['FUEL'], leapOfFaith, waste);
        if (availableOre > 0) {
            minimumRepeats += leapOfFaith;
        } else {
            break;
        }
    }
    return minimumRepeats;
}

function oreToCraftProduct(recipe, quantityNeeded, waste) {
    let neededOre = 0;
    let recipeMultiplier = Math.ceil(quantityNeeded / recipe.quantity);

    recipe.ingredients.forEach(ingredient => {
        let produced = recipeMultiplier * ingredient.quantity;
        if (ingredient.name === 'ORE') {
            neededOre += produced;
        }
        else {
            waste[ingredient.name] = waste[ingredient.name] || 0;
            if (waste[ingredient.name] < produced) {
                neededOre += oreToCraftProduct(recipes[ingredient.name], produced - waste[ingredient.name], waste);
            }

            waste[ingredient.name] = waste[ingredient.name] - produced;
        }
    });

    waste[recipe.name] = (waste[recipe.name] || 0) + recipeMultiplier * recipe.quantity;

    return neededOre;
}

function parseReactions(cookBook) {
    let dict = {};
    for (let recipe of cookBook) {
        let splittedRecipe = recipe.split('=>');
        let ingredients = splittedRecipe[0].split(',').map(i => i.trim()).map(v => createComponent(v));
        let chemical = splittedRecipe[1].split(',').map(i => i.trim()).map(v => createComponent(v))[0];
        if (dict[chemical.name]) {
            chemical.ingredients = {};
            for (let ingredient of ingredients) {
                chemical.ingredients = ingredients;
            }
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