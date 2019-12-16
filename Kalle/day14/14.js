function solve() {
    let cookBook = document.getElementById("instructions").value.split("\n");
    recipies = parseCookBook(cookBook);
    neededOre = 0;
    let waste = {};
    createRecipe('FUEL', 1, recipies, waste);
    neededOre -= tryReturnWaste(waste, recipies);
    document.getElementById("solution").innerHTML = neededOre;
    //document.getElementById("solution2").innerHTML = waste.join();
}
var neededOre = 0;
function createRecipe(component, previousMultiplier, recipies, waste) {
    let recipe = recipies[component];
    if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
            let amount = previousMultiplier;
            let toCraft = Math.ceil(amount / recipe.quantity);
            for (var i = 0; i < toCraft; i++) {
                let craftedMaterial = recipe.quantity;
                if (ingredient.name === 'ORE') {
                    //Craft
                    console.log("Crafted " + recipe.quantity + ' ' + recipe.name + ' using ' + ingredient.quantity + ' ' + ingredient.name);
                    neededOre += ingredient.quantity;
                    if (craftedMaterial - amount > 0) {
                        if (!waste[recipe.name]) {
                            waste[recipe.name] = 0;
                        }
                        waste[recipe.name] += craftedMaterial - amount;
                    }
                    amount -= craftedMaterial;

                }
                else {
                    createRecipe(ingredient.name, ingredient.quantity, recipies, waste);
                    if (craftedMaterial - amount > 0) {
                        if (!waste[recipe.name]) {
                            waste[recipe.name] = 0;
                        }
                        waste[recipe.name] += craftedMaterial - amount;
                    }
                    amount -= craftedMaterial;
                }
            }
        }
    }
    
}

function tryReturnWaste(waste, recipies) {
    let returnedOre = 0;
    for (let i in waste) {
        let recipe = recipies[i];
        let returnableMultiplier = Math.floor(waste[i] / recipe.quantity);
        if (returnableMultiplier > 0) {
            let newWaste = waste[i] % recipe.quantity;
            waste[i] = newWaste;
            if (recipe.ingredients[0].name === 'ORE') {
                returnedOre += returnableMultiplier * recipe.ingredients[0].quantity;
            }
            else {
                for (let ingredient of recipe.ingredients) {
                    if (!waste[ingredient.name]) {
                        waste[ingredient.name] = 0;
                    }
                    waste[ingredient.name] += ingredient.quantity * returnableMultiplier;
                }
            }
            returnedOre += tryReturnWaste(waste, recipies);
        }
    }
    return returnedOre;
}

function tryUseWaste(waste, recipeName, neededAmount) {
    let existingWaste = waste[recipeName] ? waste[recipeName] : 0;
    if (existingWaste >= neededAmount) {
        waste[recipeName] -= neededAmount;
        return true;
    }
    return false;
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