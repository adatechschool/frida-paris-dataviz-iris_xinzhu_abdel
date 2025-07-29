import { fridaCocktails } from "./menuFrida.js";

export const showMenuFrida = () => {
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