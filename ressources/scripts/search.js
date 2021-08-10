
let result = [];

function stringSearch(s , recipeArray) {
    result = recipeArray.filter( recipe => {
        let ingredientMatch = false;
        recipe.ingredients.forEach( i => {
            if(i.ingredient.toLowerCase().indexOf(s.toLowerCase()) !== -1) {
                ingredientMatch = true;
            }
        });
        return recipe.name.toLowerCase().indexOf(s.toLowerCase()) !== -1 || recipe.description.toLowerCase().indexOf(s.toLowerCase()) !== -1 ||  ingredientMatch; 
    });
    return result;
}

function filterSearch(s , recipeArray) {
    let result = recipeArray.filter( recipe => {
        let ingredientMatch = false;
         recipe.ingredients.forEach( i => {
             if(i.ingredient.toLowerCase().indexOf(s.toLowerCase()) !== -1) {
                 ingredientMatch = true;
             }
         });
         let lowerCaseUstensils = recipe.ustensils.map(u => u.toLowerCase());
         return lowerCaseUstensils.indexOf(s.toLowerCase()) !== -1 || recipe.appliance.toLowerCase() == s.toLowerCase() || ingredientMatch;
     })
     return result;
}
