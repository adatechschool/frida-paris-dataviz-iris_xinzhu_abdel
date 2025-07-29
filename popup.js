
const ageCheckingDiv = document.querySelector("#ageChecking");
let form2, day, month, year;

//afficher cacher en fleché
const hide = (el) => el.style.display = "none";
const show = (el) => el.style.display = "block";


///
/// html popup Age
///
const agePopupHTML = () => { //style="display: none;"
    ageCheckingDiv.innerHTML = `
    <form id="form2">
    <h4>What is your birth date ?</h4>
    <div id="ageInputs">
    <input class="ageInputs" id="month" placeholder="MM"/>
    <input class="ageInputs" id="day" placeholder="DD"/>
    <input class="ageInputs" id="year" placeholder="YYYY"/>
    </div>
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

    const homePage = document.querySelector("#homePage");
    const cocktailContainer = document.querySelector("#cocktailContainer");

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
    ageCheckingDiv.style.display = "flex";

    // au click :
    form2.addEventListener("submit", (e) => {
        e.preventDefault();

        //recuperation des inputs
        const dd = parseInt(day.value.trim());
        const mm = parseInt(month.value.trim());
        const yyyy = parseInt(year.value.trim());

        //partie conditions
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
            localStorage.setItem("ageChecked", JSON.stringify(false));
            resetBirthInputs();
            return;
        }
        else {
            // affichage du site
            localStorage.setItem("ageChecked", JSON.stringify(true));
            hide(ageCheckingDiv);
            show(homePage);
            show(cocktailContainer);

            //renvoie l'information que l'age est verifié



        }

    });

};

export { ageInterface, ageCheckingDiv };
