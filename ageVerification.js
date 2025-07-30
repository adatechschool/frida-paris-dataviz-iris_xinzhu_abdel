const ageCheckingDiv = document.querySelector("#ageChecking");
let form2, day, month, year;

// afficher / cacher simplifié
const hide = (el) => el.style.display = "none";
const show = (el) => el.style.display = "block";

const agePopupHTML = () => {
    ageCheckingDiv.innerHTML =
   `
    <form id="form2">
      <h4>What is your birth date ?</h4>
      <div id="ageInputs">
        <input class="ageInputs" id="month" placeholder="MM"/>
        <input class="ageInputs" id="day" placeholder="DD"/>
        <input class="ageInputs" id="year" placeholder="YYYY"/>
      </div>
      <button type="submit" id="submitAgeBtn"> submit </button>
    </form>
  `;
    day = document.querySelector("#day");
    month = document.querySelector("#month");
    year = document.querySelector("#year");
    form2 = document.querySelector("#form2");
};
const resetBirthInputs = () => {
    [day, month, year].forEach(input => input.value = "");
};

const ageInterface = () => {
    const homePage = document.querySelector("#homePage");
    const cocktailContainer = document.querySelector("#cocktailContainer");

    const aYearInMilis = 31557600000;
    const today = new Date();
    const yearToday = today.getFullYear();

    hide(homePage);
    hide(cocktailContainer);

    agePopupHTML();
    ageCheckingDiv.style.display = "flex";

    form2.addEventListener("submit", (e) => {
        e.preventDefault();

        const dd = parseInt(day.value.trim());
        const mm = parseInt(month.value.trim());
        const yyyy = parseInt(year.value.trim());

        if (!dd || !mm || !yyyy || isNaN(dd) || isNaN(mm) || isNaN(yyyy)) {
            alert("You must enter valid birthdate to enter this website");
            resetBirthInputs();
            return;
        }

        if (dd < 1 || dd > 31 || mm < 1 || mm > 12 || yyyy < 999 || yyyy >= 9999) {
            alert("Valid birthdate format : MM DD YYYY");
            resetBirthInputs();
            return;
        }

        if (yyyy > yearToday) {
            alert("So, you're born in the future ? 🛸💨");
            resetBirthInputs();
            return;
        }

        if (yyyy < 1909) {
            alert("That can't be 💀");
            resetBirthInputs();
            return;
        }

        resetBirthInputs();

        if (dd === today.getDate() && mm - 1 === today.getMonth()) {
            alert("🥳 HAPPY BIRTHDAY TO YOU ✨🎉 ");
        }

        const dateInput = new Date(yyyy, mm - 1, dd);
        const ageMilis = today.getTime() - dateInput.getTime();
        const captainAge = ageMilis / aYearInMilis;

        if (captainAge < 18) {
            alert("You are under 18, you cannot enter this website 👋");
            localStorage.setItem("ageChecked", JSON.stringify(false));
            resetBirthInputs();
            return;
        }
        // Age OK
        localStorage.setItem("ageChecked", JSON.stringify(true));
        // Animation blur
        const blur = document.querySelector("#blurBackground");
        blur.style.opacity = "0";
        setTimeout(() => {
            blur.style.display = "none";
        }, 500);
        // Animation formulaire
        ageCheckingDiv.style.transition = "opacity 0.5s ease";
        ageCheckingDiv.style.opacity = "1";
        setTimeout(() => {
            ageCheckingDiv.style.opacity = "0";
            setTimeout(() => {
                hide(ageCheckingDiv);
                show(homePage);
                show(cocktailContainer);
            }, 500);
        }, 50);
    });
};

export { ageInterface, ageCheckingDiv };