

const form = document.querySelector("#form");
const input = document.querySelector("#userInput");
const cocktailPage = document.querySelector("#cocktailPage");



form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = input.value;
    fetchCocktailName(inputValue);
});

const fetchCocktailName = async (value) => {
    try {
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
        const data = await res.json();
        // console.log("data",data);

        for (const item of data.drinks){
        cocktailPage.innerHTML += `<li>${item.strInstructionsFR}</li>`;
        };
    }
    catch (error){
        console.log("error", error);
    };
};

const fetchPictures = async ( ) => {
    try {
        const response = await fetch(`https://www.pexels.com/fr-fr/chercher/${value}/`)
        const data = await response.find()
    } catch (error) {
        return ""
    }
}