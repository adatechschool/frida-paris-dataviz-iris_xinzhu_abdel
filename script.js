import { menuHamburger } from "./menuHamburger.js";
import { about } from "./dataAbout.js";
import { ageInterface, ageCheckingDiv } from "./ageVerification.js";

// Sélecteurs principaux
const form = document.querySelector("#form");
const input = document.querySelector("#userInput");
const cocktailContainer = document.querySelector("#cocktailContainer");
const legalNotice = document.querySelector("#legalNotice");
const homePage = document.querySelector("#homePage");
const choices = document.querySelector("#choices");
const blur = document.querySelector("#blurBackground");

// Fonctions utilitaire
const hide = (el) => el.style.display = "none";
const show = (el) => el.style.display = "block";


// DEBUG - pour reset la vérification d’âge à chaque reload
localStorage.removeItem("ageChecked");


// Clé du localStorage pour l'âge
const AGE_KEY = "ageChecked";
let ageAlreadyChecked = false;
const saved = localStorage.getItem(AGE_KEY);

if (saved !== null) {
  ageAlreadyChecked = JSON.parse(saved);
}

console.log("clé:", AGE_KEY, "valeur:", saved, "ageValidé:", ageAlreadyChecked);

// Gestion du flou + vérification d’âge
if (ageAlreadyChecked) {
  blur.style.opacity = "0";

  setTimeout(() => {
    blur.style.display = "none";
  }, 1000);

  hide(ageCheckingDiv);
  show(homePage);
  show(cocktailContainer);
} else {
  blur.style.display = "block";
  blur.style.opacity = "1";

  hide(homePage);
  hide(cocktailContainer);
  ageInterface();
}

// Legal notice
legalNotice.innerHTML = `<p>Excessive alcohol consumption is harmful to your health. Please drink responsibly.</p>`;

// Soumission formulaire recherche
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const savedScript = localStorage.getItem(AGE_KEY);
  ageAlreadyChecked = savedScript ? JSON.parse(savedScript) : false;

  if (!ageAlreadyChecked) {
    ageInterface();
    return;
  }

  const inputValue = input.value.trim();

  if (!inputValue) {
    cocktailContainer.innerHTML = `<center><p> Please tap an ingredient or a cocktail name 🍋🍸</p></center>`;
    return;
  }

  loadCocktailFetch(inputValue);
  hide(form);
  input.value = "";
});

// Chargement des cocktails
const loadCocktailFetch = async (value) => {
  try {
    cocktailContainer.innerHTML = `<p>Loading ... ⚙ </p>`;
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
    const data = await res.json();

    if (!data.drinks) {
      cocktailContainer.innerHTML = `<p class=errorIngredient> Please try another ingredient or cocktail name 🍋🍸</p>`;
      return;
    }

    cocktailContainer.innerHTML = "";
    htmlAppend(data);
  } catch (error) {
    console.log("error reaching cocktails API", error);
  }
};

// Affichage des cocktails
const htmlAppend = async (data) => {
  for (const item of data.drinks) {
    const cocktailPage = document.createElement("div");
    cocktailPage.classList.add("eachResultat");

    const source = await getCocktailImageSrc(item.strDrink);

    cocktailPage.innerHTML = `
      <div class="imgCocktail">
        <img class="cocktailImage" src="${source}" alt="${item.strDrink}">
        <div class="textContainer">
          <h2 class="cocktailName">${item.strDrink}</h2>
          <p>${item.strInstructions}</p>
          <ul class="ingredientList"></ul>
        </div>
      </div>
    `;

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

// Appel image via Pexels
const getCocktailImageSrc = async (value) => {
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=cocktail%20${value}&per_page=1`, {
      headers: {
        Authorization: "Ta_CLE_API_PEXELS_ICI"
      }
    });

    const data = await response.json();
    return data.photos[0].src.large;
  } catch (error) {
    console.log("error reaching image API:", error);
  }
};

// Menu hamburger
const toggle = document.querySelector("#menu-toggle");
const menu = document.querySelector("#nav-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

menuHamburger(choices);
