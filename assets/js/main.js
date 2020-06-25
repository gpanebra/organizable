
//import { login, signout, createUser } from "./robert.js";
import  Board, {getBoards } from "./apiwrapper.js";
const user = JSON.parse(localStorage.getItem("user"));
import { login, signout, createUser } from "./robert/sessions.js";
import { show } from "./robert/profiles.js";

const loginBtn = document.querySelector("#login-btn");
const createBtn = document.querySelector("#create-btn");
const signoutBtn = document.querySelector("#sign-out");

if (createBtn) createBtn.addEventListener("click", createUser);
if (loginBtn) loginBtn.addEventListener("click", login);
if (signoutBtn) signoutBtn.addEventListener("click", signout);

getBoards().then(e => console.log(e))
const hola = new Board();
hola.find(3).then(data => hola.destroy());

export { user };
