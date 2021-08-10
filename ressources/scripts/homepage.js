const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".searchbar__input");
const ingredientFilter = document.querySelector("#dropdownBlue");
const ustensilesFilter = document.querySelector("#dropdownOrange");
const appareilFilter = document.querySelector("#dropdownGreen");

let allRecipes = recipes;
let filteredRecipes= recipes;

renderRecipe(allRecipes);
populateFilter(allRecipes, ingredientFilter, appareilFilter, ustensilesFilter);


//SEARCH EVENT HANDLING
searchInput.addEventListener("change", (event) => {

    if( event.target.value.length >= 3) {
        filteredRecipes = stringSearch(event.target.value , allRecipes);
        renderRecipe(filteredRecipes);
        populateFilter(filteredRecipes, ingredientFilter, appareilFilter, ustensilesFilter);
    }
    else {
        renderRecipe(allRecipes);
        populateFilter(allRecipes, ingredientFilter, appareilFilter, ustensilesFilter);
    }
})


//RENDER RECIPE CARD
function renderRecipe(listRecette) {

    gallery.innerHTML = "";

    for(recette of listRecette){
        let ingredients = "";
        for(let i of recette.ingredients){
            //console.log(i);
            let content =`<p>${i.ingredient}: `;
            if(i.quantity != undefined){content += i.quantity}
            if(i.unit != undefined){content += " "+i.unit}
            content += "</p>";
            ingredients += content;
        }
        gallery.insertAdjacentHTML("beforeend",`
        <div class="card">
            <div class="card__img" ></div>
            <div class="card__title">
                <h6 class="card__title__text">${recette.name}</h6><i class="far fa-clock card__title__icon"></i><p>${recette.time} min</p>
            </div>            
            <div class="card__list">
                ${ingredients}
            </div>
            <p class="card__desc">${recette.description}</p>
        </div>` )
    }   
}
function itemToBadge(element) {
    let color;
    color = element.closest(".filter").className.split("--")[1];
    document.querySelector(".badgeContainer").insertAdjacentHTML("beforeend",`<span class="badge tag tag--${color}"><p class="badge__text">${element.innerHTML}</p><i class="far fa-times-circle badgeButton" onclick="deleteBadge(this)"></i></span>`);
    secondaryFilter(element.innerHTML);

}
//TODO APPLY FILTER AND REMOVE IT
function secondaryFilter(filter) {
    filteredRecipes = filteredRecipes.filter( recipe => {
       let ingredientMatch = false;
        recipe.ingredients.forEach( i => {
            if(i.ingredient.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                ingredientMatch = true;
            }
        });
        let lowerCaseUstensils = recipe.ustensils.map(u => u.toLowerCase());
        return lowerCaseUstensils.indexOf(filter.toLowerCase()) !== -1 || recipe.appliance.toLowerCase() == filter.toLowerCase() || ingredientMatch;
    })
    renderRecipe(filteredRecipes);
    populateFilter(filteredRecipes, ingredientFilter, appareilFilter, ustensilesFilter);
}
function deleteFilter() {
    let appliedFilter= [];
    let array = [];

    for(filter of document.querySelectorAll(".badge__text")) {
        appliedFilter.push(filter.innerHTML);
    }
    for(filter of appliedFilter) {
        array.push.apply(array,filterSearch(filter, allRecipes));
    }
    if(array.length == 0) {
        filteredRecipes = stringSearch(searchInput.value , allRecipes);
        renderRecipe(filteredRecipes);
        populateFilter(filteredRecipes, ingredientFilter, appareilFilter, ustensilesFilter);
    }
    else { 
        filteredRecipes = array;
        renderRecipe(array);        
        populateFilter(array, ingredientFilter, appareilFilter, ustensilesFilter);
    }
}
function deleteBadge(element) {
    element.closest(".badge").remove();
    deleteFilter();
}