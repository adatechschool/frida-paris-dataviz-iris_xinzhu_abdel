// import { chooseMenu } from "./menuChoice";

import { fridaCocktails } from "./menuFrida.js";
const form = document.querySelector("#form");
const input = document.querySelector("#userInput");
const cocktailContainer = document.querySelector("#cocktailContainer");
const ageCheckingDiv = document.querySelector("#ageChecking");
const legalNotice = document.querySelector("#legalNotice");
const homePage = document.querySelector("#homePage");

//afficher cacher en fleché
const hide = (el) => el.style.display = "none";
const show = (el) => el.style.display = "block";

//Age popup variables
let form2, day, month, year;
let ageAlreadyChecked = false;

//popup caché
hide(ageCheckingDiv);
show(homePage);


//legal notice alcool
legalNotice.innerHTML = `<a>Excessive alcohol consumption is harmful to your health. Please drink responsibly.</a>`;

///
/// formulaire de recherche 
///
form.addEventListener("submit", (event) => {

  event.preventDefault();

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

///
/// html popup Age
///
const agePopupHTML = () => { //style="display: none;"
  ageCheckingDiv.innerHTML = `
    <form id="form2">
    <p> what is your birth date ?</p>
    <input class="ageInputs" id="month" placeholder="MM"/>
    <input class="ageInputs" id="day" placeholder="DD"/>
    <input class="ageInputs" id="year" placeholder="YYYY"/>
    <button type="submit" id="submitAgeBtn"> submit </button>
    </form>`
  day = document.querySelector("#day");
  month = document.querySelector("#month");
  year = document.querySelector("#year");
  form2 = document.querySelector("#form2");
}

///
/// effacer les age inputs
///
const resetBirthInputs = () => {
  [day, month, year].forEach(input => input.value = "");
}

///
/// code pop up age
///
const ageInterface = () => {

  //variables de dates
  const aYearInMilis = 31557600000; //approx un an en milisecondes
  const today = new Date(); //date du jour
  const yearToday = new Date().getFullYear(); //année en cours
  let dateInput;

  //cacher derriere le formulaire de recherche et les resultats de recherche (eventuels)
  hide(homePage);
  hide(cocktailContainer);

  //HTML dynamique du pop up activé 
  agePopupHTML();
  show(ageCheckingDiv);

  // au click :
  form2.addEventListener("submit", (e) => {
    e.preventDefault();

    //recuperation des inputs
    const dd = parseInt(day.value.trim());
    const mm = parseInt(month.value.trim());
    const yyyy = parseInt(year.value.trim());

    //partie consditions
    if (!dd || !mm || !yyyy || isNaN(dd) || isNaN(mm) || isNaN(yyyy)) {
      alert("You must enter valid birthdate to enter this website");
      resetBirthInputs();
      return;
    }
    else if (dd < 1 || dd > 31 || mm < 1 || mm > 12 || yyyy < 999 || yyyy >= 9999) {
      alert("Valid birthdate format : MM DD YYYY");
      resetBirthInputs();
      return;
    }
    else if (yyyy > yearToday) { 
      alert("So, you're born in the future ? 🛸💨");
      resetBirthInputs();
      return;
    }
    else if (yyyy < 1909) {
      alert("That can't be 💀 ");
      resetBirthInputs();
      return;
    }
    resetBirthInputs();

    // alerte anniversaire (inutile)
    if (dd === today.getDate() && mm - 1 === today.getMonth()) {
      alert("🥳 HAPPY BIRTHDAY TO YOU ✨🎉 ");
      resetBirthInputs();
    }

    //partie verification age legal
    dateInput = new Date(yyyy, mm - 1, dd); // les mois vont de 0 a 11 ds Date !

    const ageMilis = today.getTime() - dateInput.getTime();
    const captainAge = ageMilis / aYearInMilis // age en float

    if (captainAge < 18) {
      alert("You are under 18, you cannot enter this website 👋");
      resetBirthInputs();
      return;
    }
    else {
      // affichage du site
      hide(ageCheckingDiv);
      show(homePage);
      show(cocktailContainer);

      //renvoie l'information que l'age est verifié
      ageAlreadyChecked = true;
    }

  });

};

const choices = document.querySelector("#choices");
const menuFrida = document.querySelector("#menuFrida");
const aboutUs = document.querySelector ("#aboutUs");

choices.addEventListener("click", (event) =>{
    event.preventDefault();

    const clickedText = event.target.innerHTML;
    if (clickedText === "Homepage"){
        show(homePage);
        hide(menuFrida);
        hide(aboutUs);
        hide(cocktailContainer)
    }
    if (clickedText === "Menu Frida"){
        show(menuFrida);
        hide(homePage);
        hide(aboutUs);
        hide(cocktailContainer)

        menuFrida.innerHTML=""
        showMenuFrida()
    }
    if (clickedText === "About Us"){
        show(aboutUs);
        hide(menuFrida);
        hide(homePage);
        hide(cocktailContainer)
    }
    });


    const showMenuFrida = () => {
      fridaCocktails.forEach(element => {
        
        const cocktailPage = document.createElement("div");
        cocktailPage.classList.add("eachResultat"); 
        menuFrida.appendChild(cocktailPage);
    
        const divImg = document.createElement("div");
        divImg.classList.add("imgCocktail");
        cocktailPage.appendChild(divImg);
    
        const image = document.createElement("img");
        image.classList.add("cocktailImage");
        image.src = element.image;
        image.alt = element.title;
        divImg.appendChild(image);
    
        const divTxt = document.createElement("div");
        divTxt.classList.add("textContainer");
        divImg.appendChild(divTxt);
    
        const h2 = document.createElement("h2");
        h2.classList.add("cocktailName");
        h2.innerHTML = element.title;
        divTxt.appendChild(h2);
    
        const p = document.createElement("p");
        p.innerHTML = element.description;
        divTxt.appendChild(p);
    
        const ul = document.createElement("ul");
        ul.classList.add("ingredientList");
    
        element.ingredients.forEach(ing => {
          const li = document.createElement("li");
          li.textContent = `${ing.name} : ${ing.measure}`;
          ul.appendChild(li);
        });
    
        divTxt.appendChild(ul);
      });
    };
    
