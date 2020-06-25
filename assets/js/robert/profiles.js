const editBtn = document.querySelector("#edit-btn");
const deleteBtn = document.querySelector("#delete-btn");
const form = document.querySelector(".form-container");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const children = Array.from(document.querySelectorAll("input"));

if (editBtn) editBtn.addEventListener("click", enableEdit);
if (deleteBtn) deleteBtn.addEventListener("click", deleteUser);

let currentpath = window.location.href.split("/");
currentpath = currentpath[currentpath.length - 1];
let user = JSON.parse(localStorage.getItem("user"));

if (currentpath == "profile.html") showProfile(currentpath);

async function showProfile(currentpath) {
  if (currentpath == "profile.html") {
    let currentUser = await getUser(user.id, user.token);
    displayProfile(currentUser);
  }
}

async function show(user) {
  let nowUser = await getUser(user.id, user.token);
  console.log(nowUser);
  localStorage.setItem("user", JSON.stringify(nowUser));
  window.location.href = "profile.html";
}

function displayProfile(user) {
  children.forEach((element) => (element.disabled = true));
  username.value = user.username;
  email.value = user.email;
  firstName.value = user.firstName;
  lastName.value = user.lastName;
}

async function getUser(id, token) {
  let request = await fetch(`http://localhost:3000/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token="${token}"`,
    },
  });
  return request.json();
}

/* EDIT PROFILE */

function enableEdit() {
  let form = document.querySelector(".form-container");
  let children = Array.from(form.querySelectorAll("input"));
  let saveBtn = createSaveBtn();
  children.forEach((element) => (element.disabled = false));
  editBtn.replaceWith(saveBtn);
}

function createSaveBtn() {
  const saveBtn = document.createElement("button");
  saveBtn.className = "save";
  saveBtn.id = "save-btn";
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", saveEdit);
  return saveBtn;
}

async function saveEdit() {
  let patchUser = {
    username: username.value,
    email: email.value,
    first_name: firstName.value,
    last_name: lastName.value,
  };
  let request = await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token="${user.token}"`,
    },
    body: JSON.stringify(patchUser),
  });
  let updatedUser = await request.json();
  localStorage.setItem("user", JSON.stringify(updatedUser));
  window.location.href = "profile.html";
}

/* DELETE USER */
async function deleteUser() {
  let answer = confirm("Are you sure to delete your account?");
  if (!answer) return false;
  let request = await fetch(`http://localhost:3000/users/${user.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token="${user.token}"`,
    },
  });
  localStorage.clear();
  window.location.href = "index.html";
}

export { show };
