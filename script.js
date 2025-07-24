const form = document.querySelector("#form");
const input = document.querySelector("#userInput");
const cocktailPage = document.querySelector("#cocktailPage");
const imageContainer = document.getElementById("imageContainer");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = input.value.trim();
    if (!inputValue) { // pour regler le cas de quand il y a rien (ca affichait undifined et plein de trucs)
        cocktailPage.innerHTML = `<p> Entrez un nom de cocktail ou un ingrédient 🍋🍸</p>`
        return;
    }
    loadCocktail(inputValue);
});


const loadCocktail = async (value) => {
    try {
        cocktailPage.innerHTML = `<p>Chargment ... ⚙ </p>`// on peut changer par un .svg si on veut
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
        const data = await res.json();

        cocktailPage.innerHTML = "";
        htmlAppend(data);
    }
    catch (error) {
        console.log("error", error);
    };

};

        for (const item of data.drinks) {
            cocktailPage.innerHTML += `
            <h2 class="cocktailName">${item.strDrink}</h2>`
const htmlAppend = async (data) => {
    for (const item of data.drinks) {
        cocktailPage.innerHTML += `
            <p class="cocktailName">${item.strDrink}</p>`

        const valueCocktailName = item.strDrink;
        let source = await getCocktailImageSrc(valueCocktailName);
        // console.log("src", source);
        cocktailPage.innerHTML += `<img src=${source}>`;

        cocktailPage.innerHTML += `<p>${item.strInstructions}</p>`

        for (let i = 1; i <= 15; i++) {
            const ingredient = item["strIngredient" + i];
            const measure = item["strMeasure" + i];
            if (ingredient && measure) {
                cocktailPage.innerHTML += `<li>${ingredient} : ${measure} </li>`
            }
        };
    }

}

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
        // console.log("src",imageSrc);

    } catch (error) {
        console.log("erreur :", error);
    }
};

//  bouton hamburger
const toggle = document.querySelector("#menu-toggle")
const toggle2 = document.querySelector("#menu-toggle-2")
const menu = document.querySelector("#nav-menu")

// toggle.addEventListener("click", () => {
//     menu.classList.toggle("hidden")
    
// })
// toggle2.addEventListener("click", () => {
//     menu.classList.toggle("hidden") //
// })




