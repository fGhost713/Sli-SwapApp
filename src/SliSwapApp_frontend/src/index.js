import { SliSwapApp_backend } from "../../declarations/SliSwapApp_backend";
import {LoginWithStoic} from "../assets/testscript.js"

// function buttonclicked(){
//   alert('Hello world');
//   document.getElementById("greeting").innerText = "blabla";

// };

// function LoginWithStoic(){
// console.log("blabla");

// }

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("loginWithStoicWallet").addEventListener('click', LoginWithStoic, false);
  // document.querySelector('button').addEventListener('click', loadSearch, false);
 }, false)

// document.querySelector("form").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   console.log("init");
//   return false;
//   const button = e.target.querySelector("button");
//   let buttonName = button.name;

//   const name = document.getElementById("name").value.toString();

//   button.setAttribute("disabled", true);

//   // Interact with foo actor, calling the greet method
//   const greeting = await SliSwapApp_backend.greet(name);

//   button.removeAttribute("disabled");

//   //document.getElementById("greeting").innerText = greeting;
//   document.getElementById("greeting").innerText = buttonName;

//   return false;
// });
