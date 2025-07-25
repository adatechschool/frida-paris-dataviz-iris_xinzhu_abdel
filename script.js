const form = document.querySelector("#form");
const input = document.querySelector("#userInput");
const cocktailContainer = document.querySelector("#cocktailContainer");

///
/// formulaire de recherche 
///
form.addEventListener("submit", (event) => {
    const homePage = document.querySelector("#homePage");

    event.preventDefault();

    const inputValue = input.value.trim();
    if (!inputValue) { // pour regler le cas de quand il y a rien (ca affichait undifined et plein de trucs)
        cocktailContainer.innerHTML = `<p> Please tap an ingredient or a cocktail name 🍋🍸</p>`
        return;
    }
    loadCocktailFetch(inputValue);
    form.style.display = "none";

    input.value = ""; //on vide le champs de texte après chqaue click 
});

///
/// recherche Cocktail API
///
const loadCocktailFetch = async (value) => {
    try {
        cocktailContainer.innerHTML = `<p>Loading ... ⚙ </p>`// on peut changer par un .svg si on veut
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
        const data = await res.json();

        if(!data.drinks){ 
            cocktailContainer.innerHTML= `<p class=errorIngredient> Please try an other ingredient or a cocktail name 🍋🍸</p>`
            return
        }
        cocktailContainer.innerHTML = "";
        htmlAppend(data);
    }
    catch (error) {
        console.log("error", error);
    };

};

///
/// Boucle de l'api la data/element
///
const htmlAppend = async (data) => {
    for (const item of data.drinks) {
      const cocktailPage = document.createElement("div");
      cocktailPage.classList.add("eachResultat");
  
      const source = await getCocktailImageSrc(item.strDrink);
  
      // structure HTML avec l'image à gauche, le texte à droite
      cocktailPage.innerHTML =
      `
        <div class="imgCocktail">
          <img class="cocktailImage" src="${source}" alt="${item.strDrink}">
          <div class="textContainer">
            <h2 class="cocktailName">${item.strDrink}</h2>
            <p>${item.strInstructions}</p>
            <ul class="ingredientList"></ul>
          </div>
        </div>
      `;
      // ajouter les ingrédients à la <ul>
      const ul = cocktailPage.querySelector(".ingredientList");
  
      for (let i = 1; i <= 15; i++) {
        const ingredient = item["strIngredient" + i];
        const measure = item["strMeasure" + i];
        if (ingredient && measure) {
          ul.innerHTML += `<li>${ingredient} : ${measure}</li>`;
        }
      }
  
      cocktailContainer.appendChild(cocktailPage);
    }
  };
  

/// 
/// Api image 
///
const getCocktailImageSrc = async (value) => {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=cocktail%20${value}&per_page=1`, {
            headers: {
                Authorization: "OuSp8N62yB8uuxUrt2Pz0kDI7FAYv8cJVsiFHCibJ1vX9eaOdFK4Sx0G"
            }
        });
        const data = await response.json();
        console.log("dataomage", data)
        const imageSrc = data.photos[0].src.large;
        return imageSrc;

    } catch (error) {
        console.log("erreur :", error);
    }
};

///
/// bouton hamburger
///  
const toggle = document.querySelector("#menu-toggle")
const menu = document.querySelector("#nav-menu")

toggle.addEventListener("click", () => {
    menu.classList.toggle("hidden")
}) 


