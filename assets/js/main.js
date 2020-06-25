//import {create, login} from "./robert.js";
import Board, {getBoards} from "./apiwrapper.js";
const loginBtn = document.querySelector("#login-btn")
const createBtn = document.querySelector("#create-btn")
console.log("gola");
//if (createBtn) createBtn.addEventListener("click", create);
//if (loginBtn) loginBtn.addEventListener("click", login);
getBoards().then(e => console.log(e))
const hola = new Board();
hola.find(1).then(data => hola.update({name: "hoskhli"}).then(e => hola.cargar()).catch(e => console.log(e)));


// hola.createBoard().then(data => {console.log(data);
//     hola.cargar();
// }).catch(e => console.log(e));


