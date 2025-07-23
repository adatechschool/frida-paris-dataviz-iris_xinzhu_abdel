const form = document.querySelector("#form");
const input = document.querySelector("#userInput");
const cocktailPage = document.querySelector("#cocktailPage");
const imageContainer = document.getElementById("imageContainer");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = input.value;
  loadCocktail(inputValue);
  loadCocktailImage(inputValue)
});

const loadCocktail = async (value) => {
  try {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
    const data = await res.json();
    console.log("data", data);
    
    cocktailPage.innerHTML = "";
    

    for (const item of data.drinks) {
      cocktailPage.innerHTML += `
        <p class="cocktailName">${item.strDrink}</p>
        <p>${item.strInstructions}</p><ul>`

        const valueCocktailName= document.querySelector(".cocktailName")
        loadCocktailImage(valueCocktailName)

      for (let i = 1; i <=15 ; i++) {
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



  const loadCocktailImage = async (value) => {
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=cocktail%20${value}&per_page=1`, {
        headers: {
          Authorization: "OuSp8N62yB8uuxUrt2Pz0kDI7FAYv8cJVsiFHCibJ1vX9eaOdFK4Sx0G"
        }
      });
      const data = await response.json();
      console.log(data)
      const image = data.photos[0];
      
    
      const cocktailImage = document.createElement("img");
      cocktailImage.src = image.src.large
      imageContainer.appendChild(cocktailImage);
  
    } catch (error) {
      console.log("erreur :", error);
    }
  };
  
  

