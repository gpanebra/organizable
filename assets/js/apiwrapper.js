const URLSERVER = "http://localhost:3000/boards";
const TOKEN = getUserToLocalStorage().token;

async function fetchToServer(method,body,id){
    return new Promise(async (resolve, reject) => {
        const configFetch = {
            method: method,
            headers: {
                'Authorization': `Token token="${TOKEN}"`,
                'Content-Type': "application/json",
            },
        };
        let urlFetch = URLSERVER;
        if (id) urlFetch += "/" + id 
        if (body) configFetch.body = JSON.stringify(body);
        const response = await fetch(urlFetch, configFetch);
        let data;
        if(response.status !== 204) data = await response.json();
        resolve({status: response.status, data});
    });
}
export default class Board {
    constructor (name, color, starred, closed) {
        this.name = name;
        this.color = color;
        this.starred = starred;
        this.closed = closed;
    }
    find(id){
        return new Promise(async (resolve, reject) => {
            const data = await fetchToServer("GET", null, id)
            if (data.status !== 200 ) {
                reject(data.data);
                return
            }
            this.updateState(data.data)
            resolve(data)
        })
    }

    create(){
        return new Promise(async (resolve, reject) => {
            const data = await fetchToServer('POST', {
                name: this.name,
                close: this.closed,
                color: this.color,
                starred: this.starred
            });
            if (data.status !== 201) {
                reject(data.data.errors.message);
                return
            }
            resolve(data);
        })
    }
    update(board){
        return new Promise(async (resolve, reject) => {
            const data = await fetchToServer("PATCH", board, this.id)
            if (data.status !== 200) {
                reject (data);
                return
            }
            this.updateState(data.data);
            resolve(data);
        });
    }

    destroy(id){
        return new Promise(async (resolve, reject) => {
            const data = await fetchToServer("DELETE", null, this.id || id) 
            if (data.status !== 204) {
                reject(data);
            }
            resolve(data);
        })
    }

    updateState(data){
        this.id = data.id,
        this.name = data.name;
        this.color = data.color;
        this.starred = data.starred;
        this.closed = data.closed;
    }

}


export function getBoards() {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(URLSERVER, {
            method: 'GET',
            headers: {'Authorization': `Token token="${TOKEN}"`}
        });
        const data = await response.json();
        if (response.status != 200) reject(data.data.errors.message);
        resolve(data);
    });
}

export function destroyList(boardId, listId) {
    return new Promise (async (resolve, reject) => {
        const response = await fetch(`${URLSERVER}/${boardId}/lists/${listId}`, {
            method: 'DELETE',
            headers: {'Authorization': `Token token="${TOKEN}"`}
        });
        if (response.status !== 204) reject(response.status);
        resolve(response.status);
    });
}

export function editList(boardId,  listId, body) {
    return new Promise (async (resolve, reject) => {
        const response = await fetch(`${URLSERVER}/${boardId}/lists/${listId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Token token="${TOKEN}"`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if (response.status !== 200) reject(data)
        resolve(data);
    });
}

export function createList(boardId, body) {
    return new Promise (async (resolve, reject) => {
        const response = await fetch(`${URLSERVER}/${boardId}/lists`, {
            method: 'POST',
            headers: {
                'Authorization': `Token token="${TOKEN}"`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if (response.status !== 201 ) reject(data);
        resolve(data);
    });
}

// cards

export function createCardList(listId, body) {
    return new Promise (async (resolve, reject) => {
        const response = await fetch(`http://localhost:3000/lists/${listId}/cards`, {
            method: 'POST',
            headers: {
                'Authorization': `Token token="${TOKEN}"`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if (response.status !== 201) reject(data)
        resolve(data);
    });
}

function getUserToLocalStorage() {
    //return localStorage.getItem('user')
    return {user: "newUser", token: "wuGduaBo6Uxsj3pCosg271MG"}
}
