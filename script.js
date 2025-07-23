const form = document.querySelector("#form");
const input = document.querySelector("#userInput");
const cocktailPage = document.querySelector("#cocktailPage");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = input.value;
  loadCocktail(inputValue);
});

const loadCocktail = async (value) => {
  try {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
    const data = await res.json();
    console.log("data", data);
    
    cocktailPage.innerHTML = "";
    
    for (const item of data.drinks) {
      cocktailPage.innerHTML += `
        <p>${item.strDrink}</p>
        <p>${item.strInstructions}</p><ul>`
      for (let i = 1; i <= 15 ; i++) {
        const ingredient = item["strIngredient" + i];
        const measure = item["strMeasure" + i];
        if(ingredient && measure){
          cocktailPage.innerHTML += `<li>${ingredient} : ${measure} </li>`
        }
      };
      cocktailPage.innerHTML += `</ul>`
    }}
    catch (error) {
      console.log("error", error);
    };
  };



