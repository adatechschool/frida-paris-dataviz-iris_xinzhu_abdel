import { about } from "./dataAbout.js"

export const showAbout = () =>{
  document.querySelector("#aboutText").innerHTML = 
  `<h3>${about.team}</h3>
  <ul>
  <li><strong>Abdel </strong>${about.abdel}</li>
  <li><strong>Iris </strong>${about.iris}</li>
  <li><strong>Xinzhu </strong>${about.xinzhu}</li>
  </ul>`
};