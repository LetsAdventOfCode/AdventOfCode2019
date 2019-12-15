function solve() {
    let cookBook = document.getElementById("instructions").value.split("\n");
    recipies = parseCookBook(cookBook);

    let waste = {};
    let usedOre = createRecipe('FUEL', 1, recipies, waste);

    document.getElementById("solution").innerHTML = usedOre;
    //document.getElementById("solution2").innerHTML = waste.join();
}

function createRecipe(component, amountNeeded, recipies, waste) {  
    let usedOre = 0;
    let recipe = recipies[component];
    if (recipe.ingredients) {
        if (tryUseWaste(waste, recipe.name, amountNeeded)) {
            return usedOre;
        }
        for (let ingredient of recipe.ingredients) {            
            if (ingredient.name === 'ORE') {
                let toCraft = Math.ceil(amountNeeded / recipe.quantity);
                
                //Craft
                for (var i = 0; i < toCraft; i++) {
                    let craftedMaterial = recipe.quantity;
                    if (tryUseWaste(waste, recipe.name, craftedMaterial)) {
                        amountNeeded -= craftedMaterial;
                        continue;
                    }
                    usedOre += ingredient.quantity;
                    if (craftedMaterial - amountNeeded > 0) {
                        if (!waste[recipe.name]) {
                            waste[recipe.name] = 0;
                        }
                        waste[recipe.name] += craftedMaterial - amountNeeded;
                    }
                    amountNeeded -= craftedMaterial;
                }
                return usedOre;
                
            }
            else {
                usedOre += createRecipe(ingredient.name, Math.ceil(amountNeeded / recipe.quantity) * ingredient.quantity, recipies, waste);
            }            
        }
    }
    return usedOre;
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