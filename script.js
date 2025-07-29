import { menuHamburger } from "./menuHamburger.js";
import { about } from "./dataAbout.js";
import { ageInterface, ageCheckingDiv } from "./popup.js";

const form = document.querySelector("#form");
const input = document.querySelector("#userInput");
const cocktailContainer = document.querySelector("#cocktailContainer");
const legalNotice = document.querySelector("#legalNotice");
const homePage = document.querySelector("#homePage");
const choices = document.querySelector("#choices");

let ageAlreadyChecked = false
const AGE_KEY = "ageChecked";

//afficher cacher en fleché
const hide = (el) => el.style.display = "none";
const show = (el) => el.style.display = "block";

//Age popup variables
let ageAlreadyChecked = false; // de base on part a faux
// localStorage.clear(); // <- -permet d'effacer le localStorage
const AGE_KEY = "ageChecked"; //on crée une clef pour aller chercher sa value plus tard
const saved = localStorage.getItem(AGE_KEY); //on met sa veleur dans saved
if (saved !== null) {
  ageAlreadyChecked = JSON.parse(saved); // si il y a qqch on le parse (car strings)
}
console.log("clef", AGE_KEY, "saved", saved, "agebool", ageAlreadyChecked) // etat du check


//popup caché
hide(ageCheckingDiv);
show(homePage);

  if (ageAlreadyChecked) {
    document.querySelector("#blurBackground").style.display = "none";
    document.querySelector("#ageChecking").style.display = "none";
    document.querySelector("#homePage").style.display = "block";
    document.querySelector("#cocktailContainer").style.display = "block";
  } else {
    document.querySelector("#blurBackground").style.display = "block";
    document.querySelector("#ageChecking").style.display = "flex";
    document.querySelector("#homePage").style.display = "none";
    document.querySelector("#cocktailContainer").style.display = "none";

    ageInterface()
  }

  console.log("clé:", AGE_KEY, "valeur:", saved, "ageValidé:", ageAlreadyChecked);
});






//legal notice alcool
legalNotice.innerHTML = `<p>Excessive alcohol consumption is harmful to your health. Please drink responsibly.</p>`;

///
/// formulaire de recherche 
///
form.addEventListener("submit", (event) => {

  event.preventDefault();

  //enregistre l'etat du local stroage et renvoie valeur si présente
  const savedScript = localStorage.getItem(AGE_KEY);
  if (savedScript !== null) {
    ageAlreadyChecked = JSON.parse(savedScript);
  }
  else {
    ageAlreadyChecked = false;
  }

  //si l'age n'a pas été checké
  if (!ageAlreadyChecked) {
    ageInterface();
    return;
  };

  const inputValue = input.value.trim();
  if (!inputValue) { // pour regler le cas de quand il y a rien (ca affichait undifined et plein de trucs)
    cocktailContainer.innerHTML = `<center><p> Please tap an ingredient or a cocktail name 🍋🍸</p></center>`;
    return;
  }
  loadCocktailFetch(inputValue);
  hide(form);


  input.value = ""; //on vide le champs de texte après chaque clic 
});

///
/// recherche Cocktail API
///
const loadCocktailFetch = async (value) => {
  try {
    cocktailContainer.innerHTML = `<p>Loading ... ⚙ </p>`// on peut changer par un .svg si on veut
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
    const data = await res.json();

    if (!data.drinks) {
      cocktailContainer.innerHTML = `<p class=errorIngredient> Please try an other ingredient or a cocktail name 🍋🍸</p>`
      return;
    }
    cocktailContainer.innerHTML = "";
    htmlAppend(data);
  }
  catch (error) {
    console.log("error reaching cocktails API", error);
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
    const imageSrc = data.photos[0].src.large;
    return imageSrc;

  } catch (error) {
    console.log("error reaching image API:", error);
  }
};

///
/// bouton hamburger
///  
const toggle = document.querySelector("#menu-toggle");
const menu = document.querySelector("#nav-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("hidden");
})


      const blur = document.querySelector("#blurBackground");
      blur.style.opacity = "0"; // transition

      setTimeout(() => {
        blur.style.display = "none";
      }, 1000);

      menuHamburger(choices);