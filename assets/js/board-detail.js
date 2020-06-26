import Board, {destroyList, editList, createCardList, createList} from "./apiwrapper.js";

initApp();

async function initApp() {
    const board = new Board();
    const response = await board.find(getIdBoard()).catch( e => {window.location.href = "my-boards.html"});
    writingEventNameBoard(response.data);
    renderLists(response.data.lists);
}

function writingEventNameBoard(board) {
    const boardTop = document.querySelector(".boardtop");
    boardTop.children[0].textContent = board.name;
    document.querySelector("body").classList.add(`board-${board.color}`);
    boardTop.children[1].dataset.boardId = board.id;
    if (board.starred) boardTop.children[1].classList.add("star_enable")
    boardTop.children[2].dataset.boardId = board.id;
    boardTop.addEventListener("click", eventDelegationBoardTop);
}

function eventDelegationBoardTop(e) {
    const element = e.target
    if (element.id === "star-board") starredBoard(element.dataset.boardId, element);
    if (element.id === "delete-board") deleteBoard(element.dataset.boardId);
}
async function starredBoard(boardId, element) {
    const board = new Board();
    await board.find(boardId)
    await board.update({starred: !board.starred});
    element.classList.toggle("star_enable")
}

async function deleteBoard(boardId) {
    await new Board().destroy(boardId);
    window.location.href = "my-boards.html";
}
function getIdBoard(){
    const id = window.location.search.split("=")[1];
    if (!id) window.location.href = "my-boards.html"
    return id
}

function renderAddList() {
    const buttonAddList = document.createElement("div");
    buttonAddList.innerHTML = `
    <i class="fas fa-plus"></i>
     Add a list
    `;
    buttonAddList.classList.add("list__add");
    buttonAddList.addEventListener("click", changeFormAddList);
    return buttonAddList;
}

function changeFormAddList(e) {
    const listsContainer = e.target.parentNode;
    e.target.remove();
    listsContainer.append(renderFormAddList());
}

function renderFormAddList(){
    const form = document.createElement("div");
    form.classList.add("list__addcard");
    form.innerHTML = `
    <input type="text" class="list__addtitle" placeholder="Enter list title...">
    <div class="formaddcard__bottom">
        <button class="list__addbutton">Add List</button>
        <i class="fas fa-times list__addcancel"></i>
    </div>
    `;
    form.addEventListener("click", delegationAddList);
    const container = document.createElement("div");
    container.classList.add("list");
    container.append(form);
    return  container;
}

function delegationAddList(e){
    const listContainer = e.target.parentNode.parentNode;
    if(e.target.classList.contains("list__addbutton")) sendListForm(listContainer);
    if(e.target.classList.contains("list__addcancel")) changeButtonAddList(listContainer.parentNode.parentNode);
}

async function sendListForm(listContainer) {
    const name = listContainer.children[0].value;
    const lists = listContainer.parentNode.parentNode;
    const list = await createList(getIdBoard(), {name, closed: false})
                        .catch(e => console.log(e))
    addListToContainer(list, lists);
}
function changeButtonAddList(listsContainer) {
    listsContainer.lastChild.remove();
    listsContainer.append(renderAddList());
}
function addListToContainer(list, lists){
    lists.lastChild.remove();
    lists.append(renderList(list));
    lists.append(renderAddList());
}

function renderLists(lists) {
    const listContainer = document.querySelector(".list__container");
    lists.forEach( (list) => {
        listContainer.append(renderList(list));
    } );
    listContainer.append(renderAddList());
    document.querySelector(".board__container").append(listContainer);
}

function renderList(list){
    const listCard = document.createElement("div");
    listCard.classList.add("list");
    listCard.dataset.id = list.listId || list.id;
    listCard.innerHTML = `
        <div class="list__top">
        <span class="list__title">${list.name}</span>
        <i class="far fa-times-circle"></i>
        </div>
        `;
    listCard.addEventListener("click", delegationList);
    listCard.append(renderCards(list));
    listCard.append(renderAddCards());
    return listCard;
}
function renderAddCards() {
    const addContainer = document.createElement("div");
    addContainer.classList.add("card__addbutton")
    addContainer.innerHTML = `
            <i class="fas fa-plus"></i>
            <span class="card_addtext">Add another card</span>
    `;
    addContainer.addEventListener("click", renderInputAddCard);
    return addContainer;
}
function renderInputAddCard(e) {
    const parent = e.target.parentNode;
    const list = parent.parentNode;
    parent.remove();
    list.append(generateFormAddCard());
}
function generateFormAddCard() {
    const form = document.createElement("div");
    form.classList.add("list__addcard");
    form.innerHTML = `
        <input type="text" class="list__addtitle" placeholder="Enter a title for this card...">
        <div class="formaddcard__bottom">
            <button class="list__addbutton">Add Card</button>
            <i class="fas fa-times list__addcancel"></i>
        </div>
        `;
    form.addEventListener("click", delegationFormCard);
    return form;
}



function delegationFormCard(e) {
    e.preventDefault();
    // send card
    if (e.target.classList.contains("list__addbutton")) addCartToList(e.target);
    // cancel form
    if(e.target.classList.contains("list__addcancel")){
        const form = e.target.parentNode.parentNode;
        form.parentNode.append(renderAddCards());
        form.remove();
    }
}
async function addCartToList(element) {
    const form = element.parentNode.parentNode;
    const cardContainer = form.parentNode.children[1]
    const input = form.children[0];
    const body = {
        name: input.value,
        closed: false,
    }
    try {
        body.pos = parseInt(cardContainer.lastChild.dataset.pos,10)+1
    } catch  {
        body.pos = 1;
    }
    const card = await createCardList(form.parentNode.dataset.id, body);
    cardContainer.append(createCard(card));
    form.remove();
    cardContainer.parentNode.append(renderAddCards());
}
function renderCards(list){
    const cardsContainer = document.createElement("div");
    cardsContainer.classList.add("card__container");
    if(list.cards) list.cards.forEach(card => {
        cardsContainer.append(createCard(card))
    });
    return cardsContainer
}

function createCard(card) {
    const cardHtml = document.createElement("div")
    cardHtml.classList.add("card");
    const labelsContainer = document.createElement("div");
    labelsContainer.classList.add("card__labels")
    card.labels.forEach(label => {
        const labelHtml = document.createElement("div")
        labelHtml.classList.add("card__label",`board-${label.color}`)
        labelHtml.dataset.labelId = label.labelId;
        labelsContainer.append(labelHtml);
    });
    cardHtml.append(labelsContainer);
    const cardName = document.createElement("span");
    cardName.classList.add("card__title");
    cardName.textContent = card.name;
    cardHtml.append(cardName);  
    cardHtml.dataset.pos = card.pos;
    cardHtml.addEventListener("click", showDetail);
    return cardHtml
}

async function delegationList(e){
    const element = e.target;
    const list = element.parentNode.parentNode;
    if(element.classList.contains("fa-times-circle")) {
        await destroyList(getIdBoard(),list.dataset.id)
        list.remove();
    }
    if(element.classList.contains("list__title")) {
        changeTitleList(element);
    }
}

function changeTitleList(element) {
    const textTitle = element.textContent;
    const content = element.parentNode;
    element.remove();
    content.prepend(generateImputTitle(textTitle));
}

function generateImputTitle(textTitle){
    const input = document.createElement("input")
    input.value = textTitle;
    input.classList.add("list__addtitle");
    input.addEventListener("blur", editTitle);
    input.addEventListener("keydown", editTitleEnter)
    return input;
}
function editTitleEnter(e) {
    if(e.key === "Enter"){
        e.target.blur();
    }
}
async function editTitle(e) {
    const element = e.target;
    const list = element.parentNode.parentNode
    const name = element.value
    await editList(getIdBoard(),list.dataset.id, {name: name})
        .catch(e => window.location.href = "my-boards.html");
    element.remove();
    list.children[0].prepend(renderTitle(name));
}

function renderTitle(name){
    const title = document.createElement("span");
    title.classList.add("list__title")
    title.textContent = name
    return title;
}


// Modal detail card

function showDetail(e){
    const blackContainer = document.createElement("div");
    blackContainer.classList.add("blackcontainer")
    blackContainer.addEventListener("click", closeBlackContainer);
    blackContainer.append(generateModalDetailCard());

    document.querySelector("body").append(blackContainer);
}

function closeBlackContainer(e){
    e.preventDefault();
    if (e.target.classList.contains("blackcontainer")) e.target.remove();
}

function generateModalDetailCard(){
    
}