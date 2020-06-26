import { createBoard } from "./jorge.js";
import { getBoards } from "./apiwrapper.js";
import Board from "./apiwrapper.js";

let sidebar = document.querySelector(".sidebar");
let buttons = Array.from(sidebar.children);
buttons.forEach((element) => element.addEventListener("click", navigation));
const normalBoardsVar = document.querySelector("#normal-boards");
if (normalBoardsVar) normalBoards();
const starredBoardsVar = document.querySelector("#starred-boards");
if (starredBoardsVar) starredBoards();
function navigation() {
  buttons.forEach((element) => {
    element.classList.remove("marked");
    element.classList.remove("unhoverable");
  });
  this.classList.add("unhoverable");
  this.classList.add("marked");
}

/*function createBoard(){
  const data = await getBoards().catch(e=>{if (e.status===401) window.location.href="sign-up.html"});
  
}*/
let boardCreator = document.querySelector(".board-creator");
boardCreator.addEventListener("click", createBoard);

function changeSomething() {
  this.style.backgroundColor = "red";
}

async function normalBoards() {
  let data = await getBoards().catch((e) => {
    if (e.status === 401) window.location.href = "sign-up.html";
  });
  console.log(data);
  data = data.filter((data) => data.starred == false && data.closed == false);
  data.forEach((board) => {
    let newBoard = drawBoard(board);
    normalBoardsVar.prepend(newBoard);
  });
}

async function starredBoards() {
  let data = await getBoards().catch((e) => {
    if (e.status === 401) window.location.href = "sign-up.html";
  });
  console.log(data);
  data = data.filter((data) => data.starred == true);
  data.forEach((board) => {
    let newBoard = drawBoard(board);
    starredBoardsVar.prepend(newBoard);
  });
}

export function drawBoard(board) {
  const div = document.createElement("div");
  const starButton = document.createElement("button");
  starButton.id = `${board.id}`;
  starButton.className = `star`;
  starButton.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path class="star-icon" d="M11.3854 4.01933L8.10841 3.52017L6.64374 0.417433C6.38131 -0.135624 5.62094 -0.142654 5.35626 0.417433L3.89159 3.52017L0.614589 4.01933C0.0269265 4.10838 -0.208587 4.86532 0.21758 5.29886L2.58842 7.71263L2.02767 11.1224C1.92674 11.7387 2.54804 12.2004 3.06842 11.9121L6 10.3021L8.93159 11.9121C9.45196 12.198 10.0733 11.7387 9.97233 11.1224L9.41158 7.71263L11.7824 5.29886C12.2086 4.86532 11.9731 4.10838 11.3854 4.01933ZM8.25645 7.31892L8.78803 10.5623L6 9.03199L3.21197 10.5623L3.74356 7.31892L1.48711 5.02233L4.60486 4.54895L6 1.59619L7.39514 4.54895L10.5129 5.02233L8.25645 7.31892Z" fill="#C3BE0E"/>
  </svg>`;
  starButton.addEventListener("click", addStarredBoards);
  div.addEventListener("mouseenter", changeStarColor);
  div.className = `board-${board.color} board`;
  div.innerHTML = `<p class="board-title">${board.name}</p>
  `;
  div.append(starButton);
  return div;
}

async function addStarredBoards() {
  console.log(this.id);
  let boardClassObject = new Board(null, null, null, null);
  let getBoard = await boardClassObject.find(this.id);
  getBoard.starred= getBoard.starred ? false : true;
  boardClassObject.update(getBoard);
  window.location.href = "my-boards.html";
  console.log(getBoard);
}

function changeStarColor() {
  this.starButton.svg.path.style.fill="red";
}