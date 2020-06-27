// import { login, signout, createUser } from "./robert.js";

import { createBoard } from "./jorge.js";
import Board, { getBoards } from "./apiwrapper.js";
const user = JSON.parse(localStorage.getItem("user"));
import { login, signout, createUser } from "./robert/sessions.js";

const loginBtn = document.querySelector("#login-btn");
const createBtn = document.querySelector("#create-btn");
const signoutBtn = document.querySelector("#sign-out");

if (createBtn) createBtn.addEventListener("click", createUser);
if (loginBtn) loginBtn.addEventListener("click", login);
if (signoutBtn) signoutBtn.addEventListener("click", signout);

let wrapperBoard = document.querySelector(".my-boards-wrapper");
if (wrapperBoard) createBoard();

export { user };
