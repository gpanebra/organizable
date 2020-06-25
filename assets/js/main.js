import {create, login} from "./robert.js";

const loginBtn = document.querySelector("#login-btn")
const createBtn = document.querySelector("#create-btn")

if (createBtn) createBtn.addEventListener("click", create);
if (loginBtn) loginBtn.addEventListener("click", login);

