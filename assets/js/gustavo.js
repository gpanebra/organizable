/*var myBoardsButton = document.querySelector("my-boards-button");
const closedBoardsButton = document.querySelector("closed-boards-button");
const myProfileButton = document.querySelector("my-profile-button");
const logOutButton = document.querySelector("log-out-button");*/

/*function changeColor(element) {
  element.style.color = "yellow";
  element.stopPropagation();
}
*/
//onclick="changeColor(this)"
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

sidebar.addEventListener;
