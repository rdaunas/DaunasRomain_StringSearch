const ingredient = document.querySelector("#Ingredients");
const appareil = document.querySelector("#Appareil");
const ustensiles = document.querySelector("#Ustensils");

let rotated = false;
function filterDrop(element) {
    if(!rotated) {
        element.querySelector(".fa-chevron-down").style.transform = "rotate(180deg)";
        rotated = true;
        element.style.height = "auto";
        element.querySelector(".dropdown").style.display = "flex";
        element.querySelector(".dropdown").style.height = "400px";
    }
    else {
        element.querySelector(".fa-chevron-down").style.transform = "rotate(0deg)";
        rotated = false;
        element.querySelector(".dropdown").style.display = "none";
        element.style.height = "50px";
        //element.querySelector(".dropdown").style.height = "50px";

    }
}

appareil.addEventListener( "click", () => {filterDrop(appareil)});
ingredient.addEventListener( "click", () => {filterDrop(ingredient)});
ustensiles.addEventListener( "click", () => {filterDrop(ustensiles)});