import { showAbout } from "./showAbout.js";
import { showMenuFrida } from "./showMenuFrida.js";



export const menuHamburger = (choices) => {
    const menuFrida = document.querySelector("#menuFrida");
    const aboutUs = document.querySelector("#aboutUs");
    const cocktailContainer = document.querySelector("#cocktailContainer");
    const homePage = document.querySelector("#homePage");

    choices.addEventListener("click", (event) => {
        event.preventDefault();

        const clickedText = event.target.innerHTML;
        if (clickedText === "Homepage") {
            homePage.style.display="block";
            menuFrida.style.display="none";
            aboutUs.style.display="none";
            cocktailContainer.style.display="none";
        };
        if (clickedText === "Menu Frida") {
            menuFrida.style.display="block"
            homePage.style.display="none";
            aboutUs.style.display="none";
            cocktailContainer.style.display="none";

            menuFrida.innerHTML = ""
            showMenuFrida();
        };
        if (clickedText === "About Us") {
            aboutUs.style.display = "flex";
            showAbout();
            menuFrida.style.display="none";
            homePage.style.display="none";
            cocktailContainer.style.display="none";
        };
    });
};