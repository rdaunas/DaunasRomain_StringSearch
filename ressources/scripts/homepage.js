const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".searchbar__input");
const ingredientFilter = document.querySelector("#dropdownBlue");
const ustensilesFilter = document.querySelector("#dropdownOrange");
const appareilFilter = document.querySelector("#dropdownGreen");

let allRecipes = recipes;
let searchedRecipes= recipes;
let filteredRecipes = [];

renderRecipe(allRecipes);
populateFilter(allRecipes, ingredientFilter, appareilFilter, ustensilesFilter);



//SEARCH EVENT HANDLING
searchInput.addEventListener("keyup", (event) => {
    let badges = document.querySelectorAll(".badge");
    for(badge of badges){
        badge.remove();
    }

    if( event.target.value.length >= 3) {
        searchedRecipes = stringSearch(event.target.value , allRecipes);
        renderRecipe(searchedRecipes);
        populateFilter(searchedRecipes, ingredientFilter, appareilFilter, ustensilesFilter);
    }
    else {
        searchedRecipes = allRecipes;
        renderRecipe(allRecipes);
        populateFilter(allRecipes, ingredientFilter, appareilFilter, ustensilesFilter);
    }
})


//RENDER RECIPE CARD
function renderRecipe(listRecette) {

    gallery.innerHTML = "";

    if(listRecette.length != 0) {
        for(recette of listRecette){
            let ingredients = "";
            for(let i of recette.ingredients){
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
    else {
        gallery.insertAdjacentHTML("beforeend", "<p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>");
    }
       
}
function itemToBadge(element) {
    let color;
    color = element.closest(".filter").className.split("--")[1];
    document.querySelector(".badgeContainer").insertAdjacentHTML("beforeend",`<span class="badge tag tag--${color}"><p class="badge__text">${element.innerHTML}</p><i class="far fa-times-circle badgeButton" onclick="deleteBadge(this)"></i></span>`);
    secondaryFilter(element.innerHTML);

}

function secondaryFilter(filter) {
    if( document.querySelectorAll(".badge__text").length > 1) {
        filteredRecipes = filterSearch(filter, filteredRecipes);
    }else {
        filteredRecipes = filterSearch(filter, searchedRecipes);
    }
    renderRecipe(filteredRecipes);
    populateFilter(filteredRecipes, ingredientFilter, appareilFilter, ustensilesFilter);
}
function deleteFilter() {
    let appliedFilter= [];
    let array = allRecipes;

    for(filter of document.querySelectorAll(".badge__text")) { //get list of filter from html
        appliedFilter.push(filter.innerHTML);
    }
    for(filter of appliedFilter) {                                  //apply filter and push result into an array
       array = filterSearch(filter, array);
    }
    if(appliedFilter.length == 0) {                                         //if no filter, re render using array from search function
        renderRecipe(searchedRecipes);
        populateFilter(searchedRecipes, ingredientFilter, appareilFilter, ustensilesFilter);
    }
    else {                                                          //render using recipes from array
        filteredRecipes = array;
        renderRecipe(array);        
        populateFilter(array, ingredientFilter, appareilFilter, ustensilesFilter);
    }
}
function deleteBadge(element) {
    element.closest(".badge").remove();
    deleteFilter();
}