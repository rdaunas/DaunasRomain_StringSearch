const gallery = document.querySelector(".gallery");

let allRecipes;
let FilteredRecipes;

for(recette of recipes){
    let ingredients = "";
    for(let i of recette.ingredients){
        //console.log(i);
        let content =`<p>${i.ingredient}: `;
        if(i.quantity != undefined){content += i.quantity}
        if(i.unit != undefined){content += i.unit}
        content += "</p>";
        ingredients += content;
    }
    gallery.insertAdjacentHTML("beforeend",`
    <div class="card">
        <div class="card__img" ></div>
        <div class="card__title">
            <h6 class="card__title__text">${recette.name}</h6><i class="far fa-clock"></i><p>${recette.time} min</p>
        </div>            
        <div class="card__list">
            ${ingredients}
        </div>
        <p class="card__desc">${recette.description}</p>
    </div>` )
}   