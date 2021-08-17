
let result = [];
function stringSearch(s , recipeArray) { 
       
            return recipeArray.filter((obj) => JSON.stringify(obj).toLowerCase().indexOf(s.toLowerCase()) !== -1);
    
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
