const form = document.querySelector("#form");
const input = document.querySelector("#userInput");
const cocktailContainer = document.querySelector("#cocktailContainer");
const ageCheckingDiv = document.querySelector("#ageChecking");
const legalNotice = document.querySelector("#legalNotice");
const homePage = document.querySelector("#homePage");

//Age popup
let form2, day, month, year;

//legal notice alcool
legalNotice.innerHTML = `<a>Excessive alcohol consumption is harmful to your health. Please drink responsibly.</a>`


form.addEventListener("submit", (event) => {

    event.preventDefault();

    //affichage du popup reste du site caché
    ageCheckingDiv.style.display = "block";

    const inputValue = input.value.trim();
    if (!inputValue) { // pour regler le cas de quand il y a rien (ca affichait undifined et plein de trucs)
        cocktailContainer.innerHTML = `<center><p> Please tap an ingredient or a cocktail name 🍋🍸</p></center>`
        return;
    }
    homePage.style.display = "block";
            cocktailContainer.style.display = "block";

    loadCocktail(inputValue);
    form.style.display = "none";

    input.value = ""; //on vide le champs de texte après chaque clic 
});


const loadCocktail = async (value) => {
    try {
        cocktailContainer.innerHTML = `<p>Loading ... ⚙ </p>`// on peut changer par un .svg si on veut
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
        const data = await res.json();

        cocktailContainer.innerHTML = "";
        htmlAppend(data);
    }
    catch (error) {
        console.log("error reaching cocktails API", error);
    };
};

const htmlAppend = async (data) => {
    for (const item of data.drinks) {
        const cocktailPage = document.createElement("div");
        cocktailPage.classList.add("eachResultat");
        cocktailContainer.appendChild(cocktailPage);

        cocktailPage.innerHTML += `
            <h2 class="cocktailName">${item.strDrink}</h2>`

        const valueCocktailName = item.strDrink;

        let source = await getCocktailImageSrc(valueCocktailName);
        cocktailPage.innerHTML += `<img src=${source}>`;

        for (let i = 1; i <= 15; i++) {
            const ingredient = item["strIngredient" + i]; //item["strIngredient1"] : accès dynamique via chaîne de caractère, équivalent de item.Stringredient1
            const measure = item["strMeasure" + i];
            if (ingredient && measure) {
                cocktailPage.innerHTML += `<li>${ingredient} : ${measure} </li>`
            };
        };

        cocktailPage.innerHTML += `<p>${item.strInstructions}</p>`
    };
};

const getCocktailImageSrc = async (value) => {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=cocktail%20${value}&per_page=1`, {
            headers: {
                Authorization: "OuSp8N62yB8uuxUrt2Pz0kDI7FAYv8cJVsiFHCibJ1vX9eaOdFK4Sx0G"
            }
        });
        const data = await response.json();
        console.log("dataimage", data)
        const imageSrc = data.photos[0].src.large;
        return imageSrc;

    } catch (error) {
        console.log("error reaching image API:", error);
    }
};

//  bouton hamburger
const toggle = document.querySelector("#menu-toggle")
const menu = document.querySelector("#nav-menu")

toggle.addEventListener("click", () => {
    menu.classList.toggle("hidden")
})
