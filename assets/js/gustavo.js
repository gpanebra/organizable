import { createBoard } from "./jorge.js";
import { getBoards } from "./apiwrapper.js";
import Board from "./apiwrapper.js";

//Sidebar controller
let sidebar = document.querySelector(".sidebar");
let buttons = Array.from(sidebar.children);
buttons.forEach((element) => element.addEventListener("click", navigation));

function navigation() {
  buttons.forEach((element) => {
    element.classList.remove("marked");
    element.classList.remove("unhoverable");
  });
  this.classList.add("unhoverable");
  this.classList.add("marked");
}

//Boards Cntroller

const normalBoardsVar = document.querySelector("#normal-boards");
if (normalBoardsVar) normalBoards();
const starredBoardsVar = document.querySelector("#starred-boards");
if (starredBoardsVar) starredBoards();
const closedBoardsVar = document.querySelector("#closed-boards");
if (closedBoardsVar) closedBoards();

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

async function closedBoards() {
  let data = await getBoards().catch((e) => {
    if (e.status === 401) window.location.href = "sign-up.html";
  });
  console.log(data);
  data = data.filter((data) => data.closed == true);
  data.forEach((board) => {
    let newBoard = drawBoard(board);
    closedBoardsVar.prepend(newBoard);
  });
}

export function drawBoard(board) {
  const div = document.createElement("div");
  const boardButtonsContainer = document.createElement("div");
  const starButton = document.createElement("button");
  const closeButton = document.createElement("button");
  starButton.id = `${board.id}`;
  starButton.className = `star`;
  closeButton.id = `${board.id}`;
  closeButton.className = `close`;
  boardButtonsContainer.className = `board-buttons`;
  starButton.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path class="star-icon" d="M11.3854 4.01933L8.10841 3.52017L6.64374 0.417433C6.38131 -0.135624 5.62094 -0.142654 5.35626 0.417433L3.89159 3.52017L0.614589 4.01933C0.0269265 4.10838 -0.208587 4.86532 0.21758 5.29886L2.58842 7.71263L2.02767 11.1224C1.92674 11.7387 2.54804 12.2004 3.06842 11.9121L6 10.3021L8.93159 11.9121C9.45196 12.198 10.0733 11.7387 9.97233 11.1224L9.41158 7.71263L11.7824 5.29886C12.2086 4.86532 11.9731 4.10838 11.3854 4.01933ZM8.25645 7.31892L8.78803 10.5623L6 9.03199L3.21197 10.5623L3.74356 7.31892L1.48711 5.02233L4.60486 4.54895L6 1.59619L7.39514 4.54895L10.5129 5.02233L8.25645 7.31892Z" fill="#C3BE0E"/>
  </svg>`;
  closeButton.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0)">
  <path class="recover-icon"  d="M10.125 7.5H9.375C9.27554 7.5 9.18016 7.53951 9.10983 7.60983C9.03951 7.68016 9 7.77554 9 7.875V10.5H1.5V3H4.875C4.97446 3 5.06984 2.96049 5.14016 2.89016C5.21049 2.81984 5.25 2.72446 5.25 2.625V1.875C5.25 1.77554 5.21049 1.68016 5.14016 1.60984C5.06984 1.53951 4.97446 1.5 4.875 1.5H1.125C0.826631 1.5 0.540483 1.61853 0.329505 1.8295C0.118526 2.04048 0 2.32663 0 2.625L0 10.875C0 11.1734 0.118526 11.4595 0.329505 11.6705C0.540483 11.8815 0.826631 12 1.125 12H9.375C9.67337 12 9.95952 11.8815 10.1705 11.6705C10.3815 11.4595 10.5 11.1734 10.5 10.875V7.875C10.5 7.77554 10.4605 7.68016 10.3902 7.60983C10.3198 7.53951 10.2245 7.5 10.125 7.5ZM11.4375 0H8.4375C7.93664 0 7.68633 0.607266 8.03906 0.960938L8.87648 1.79836L3.16406 7.50867C3.11162 7.56093 3.07001 7.62303 3.04162 7.6914C3.01323 7.75977 2.99862 7.83308 2.99862 7.90711C2.99862 7.98114 3.01323 8.05445 3.04162 8.12282C3.07001 8.19119 3.11162 8.25329 3.16406 8.30555L3.69539 8.83594C3.74765 8.88838 3.80974 8.92999 3.87812 8.95838C3.94649 8.98677 4.0198 9.00138 4.09383 9.00138C4.16786 9.00138 4.24117 8.98677 4.30954 8.95838C4.37791 8.92999 4.44001 8.88838 4.49227 8.83594L10.2019 3.12469L11.0391 3.96094C11.3906 4.3125 12 4.06641 12 3.5625V0.5625C12 0.413316 11.9407 0.270242 11.8352 0.164752C11.7298 0.0592632 11.5867 0 11.4375 0V0Z" fill="#F0F2F5"/>
  </g>
  <defs>
  <clipPath id="clip0">
  <rect width="12" height="12" fill="white"/>
  </clipPath>
  </defs>
  </svg><svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path class="close-icon" d="M6.78125 9.75H7.34375C7.41834 9.75 7.48988 9.72037 7.54262 9.66762C7.59537 9.61488 7.625 9.54334 7.625 9.46875V4.40625C7.625 4.33166 7.59537 4.26012 7.54262 4.20738C7.48988 4.15463 7.41834 4.125 7.34375 4.125H6.78125C6.70666 4.125 6.63512 4.15463 6.58238 4.20738C6.52963 4.26012 6.5 4.33166 6.5 4.40625V9.46875C6.5 9.54334 6.52963 9.61488 6.58238 9.66762C6.63512 9.72037 6.70666 9.75 6.78125 9.75ZM10.625 1.875H8.69352L7.89664 0.546094C7.79664 0.379457 7.65517 0.241568 7.48602 0.145865C7.31688 0.0501615 7.12583 -9.24232e-05 6.93148 1.27604e-07H4.56852C4.37425 -1.14555e-05 4.1833 0.0502809 4.01424 0.14598C3.84519 0.24168 3.70379 0.379525 3.60383 0.546094L2.80648 1.875H0.875C0.775544 1.875 0.680161 1.91451 0.609835 1.98484C0.539509 2.05516 0.5 2.15054 0.5 2.25L0.5 2.625C0.5 2.72446 0.539509 2.81984 0.609835 2.89016C0.680161 2.96049 0.775544 3 0.875 3H1.25V10.875C1.25 11.1734 1.36853 11.4595 1.5795 11.6705C1.79048 11.8815 2.07663 12 2.375 12H9.125C9.42337 12 9.70952 11.8815 9.9205 11.6705C10.1315 11.4595 10.25 11.1734 10.25 10.875V3H10.625C10.7245 3 10.8198 2.96049 10.8902 2.89016C10.9605 2.81984 11 2.72446 11 2.625V2.25C11 2.15054 10.9605 2.05516 10.8902 1.98484C10.8198 1.91451 10.7245 1.875 10.625 1.875ZM4.5275 1.1932C4.54003 1.17234 4.55777 1.15509 4.57896 1.14314C4.60016 1.13118 4.6241 1.12493 4.64844 1.125H6.85156C6.87586 1.12497 6.89975 1.13124 6.9209 1.14319C6.94206 1.15515 6.95975 1.17238 6.97227 1.1932L7.38148 1.875H4.11852L4.5275 1.1932ZM9.125 10.875H2.375V3H9.125V10.875ZM4.15625 9.75H4.71875C4.79334 9.75 4.86488 9.72037 4.91762 9.66762C4.97037 9.61488 5 9.54334 5 9.46875V4.40625C5 4.33166 4.97037 4.26012 4.91762 4.20738C4.86488 4.15463 4.79334 4.125 4.71875 4.125H4.15625C4.08166 4.125 4.01012 4.15463 3.95738 4.20738C3.90463 4.26012 3.875 4.33166 3.875 4.40625V9.46875C3.875 9.54334 3.90463 9.61488 3.95738 9.66762C4.01012 9.72037 4.08166 9.75 4.15625 9.75Z" fill="#F0F2F5"/>
  </svg>
  `;
  starButton.addEventListener("click", addStarredBoards);
  closeButton.addEventListener("click", addClosedBoards);
  div.className = `board-${board.color} board`;
  div.innerHTML = `<p class="board-title">${board.name}</p>`;
  boardButtonsContainer.append(closeButton);
  boardButtonsContainer.append(starButton);
  div.append(boardButtonsContainer);
  return div;
}

async function addStarredBoards() {
  let boardClassObject = new Board(null, null, null, null);
  let getBoard = await boardClassObject.find(this.id);
  getBoard.starred = getBoard.starred ? false : true;
  boardClassObject.update(getBoard);
  window.location.href = "my-boards.html";
}

async function addClosedBoards() {
  let boardClassObject = new Board(null, null, null, null);
  let getBoard = await boardClassObject.find(this.id);
  getBoard.closed = getBoard.closed ? false : true;
  boardClassObject.update(getBoard);
  window.location.href = "my-boards.html";
}

//Boards BUttons

/*const board = document.querySelector(".board");
if (board) {
  board.addEventListener("mouseenter", changeStarColor);
  board.addEventListener("mouseleave", changeStarColor2);
}

function changeStarColor() {
  this.children.style.display = "content";
}

function changeStarColor2() {
  this.children.style.display = "none";
}*/
