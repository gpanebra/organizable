import Board from "./apiwrapper.js";

import { drawBoard } from "./gustavo.js";

export function createBoard() {
  //creamos elementos
  const formContainer = createDivBlack();
  const form = createForm();
  formContainer.prepend(form);
  document.querySelector(".my-boards-wrapper").append(formContainer);
}

function createDivBlack() {
  const divblack = document.createElement("div");
  divblack.classList.add("blackcontainer");
  return divblack;
}

function createForm() {
  const form = document.createElement("form");
  form.classList.add("createboard");
  form.innerHTML = `
    <div data-color="blue" class="createboard__titlecontainer board-blue">
    <input type="text" class="createboard__title" placeholder="Board title">
    <div class="createboard__exit">x</div>
</div>
<div class="createboard__colorscontainer">
    <div data-color="blue" class="palet-color board-blue"></div>
    <div data-color="orange" class="palet-color board-orange"></div>
    <div data-color="green" class="palet-color board-green"></div>
    <div data-color="red" class="palet-color board-red"></div>
    <div data-color="purple" class="palet-color board-purple"></div>
    <div data-color="pink" class="palet-color board-pink"></div>
    <div data-color="lime" class="palet-color board-lime"></div>
    <div data-color="sky" class="palet-color board-sky"></div>
    <div data-color="grey" class="palet-color board-grey"></div>
</div>
<button class="createboard__submit">Create Board</button>
    `;
  form.addEventListener("click", eventDelegateForm);
  return form;
}

function eventDelegateForm(e) {
  e.preventDefault();
  const element = e.target;
  if (element.classList.contains("palet-color")) chancheColor(element);
  if (element.classList.contains("createboard__exit")) closeForm();
  if (element.classList.contains("createboard__submit")) sendForm();
}

function chancheColor(element) {
  const classColor = [
    "board-blue",
    "board-orange",
    "board-green",
    "board-red",
    "board-purple",
    "board-pink",
    "board-lime",
    "board-sky",
    "board-grey",
  ];
  const form = document.querySelector(".createboard__titlecontainer");
  const color = element.dataset.color;
  form.classList.remove(...classColor);
  form.classList.add(`board-${color}`);
  form.dataset.color = color;
}

function closeForm() {
  document.querySelector(".blackcontainer").remove();
}

async function sendForm() {
  const form = document.querySelector(".createboard__titlecontainer");
  const name = form.children[0].value;
  const color = form.dataset.color;
  const board = new Board(name, color, false, false);
  closeForm();
  let otherBoard = await board.create();
  let drawOtherBoard = drawBoard(otherBoard);
  document.querySelector("#normal-boards").prepend(drawOtherBoard);
}
