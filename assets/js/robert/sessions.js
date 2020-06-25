import { show } from "./profiles.js";

async function createUser() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let email = document.querySelector("#email").value;
  let firstName = document.querySelector("#first-name").value;
  let lastName = document.querySelector("#last-name").value;

  let newUser = {
    user: {
      username: username,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName,
    },
  };
  console.log(newUser);
  let signup = await post("users", newUser);
  show(signup);
}
async function login() {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let user = {
    username: username.value,
    password: password.value,
  };
  let login = await post("login", user);
  user = login;
  if (user.errors) {
    username.value = "";
    password.value = "";
    return alert("Acces denied, please try again");
  } else {
    localStorage.setItem("user", JSON.stringify(user));
    show(user);
  }
}

async function signout() {
  let user = JSON.parse(localStorage.getItem("user"));
  let request = await fetch("http://localhost:3000/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  window.location = "index.html";
  localStorage.clear();
  return request.json();
}

async function post(path, body) {
  let request = await fetch(`http://localhost:3000/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return request.json();
}

export { login, signout, createUser };
