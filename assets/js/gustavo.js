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
