const URLSERVER = "http://localhost:3000/boards";
const TOKEN = getUserToLocalStorage().token;

export default class Board {
    constructor (name, color, starred, closed) {
        this.name = name;
        this.color = color;
        this.starred = starred;
        this.closed = closed;
    }
    find(id){
        return new Promise(async (resolve, reject) => {
            const response = await fetch(`${URLSERVER}/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token token="${TOKEN}"`,
                }
            });
            const data = await response.json();
            if (response.status !== 200 ) {
                reject(data.errors.message);
                return
            }
            this.updateState(data)
            resolve(data)
        })
    }

    create(){
        return new Promise(async (resolve, reject) => {
            const response = await fetch(URLSERVER, {
                method: 'POST',
                headers: {
                    'Authorization': `Token token="${TOKEN}"`,
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({name: this.name, color: this.color, starred: this.starred, closed: this.closed}),
            });
            const data = await response.json();
            if (response.status !== 201) {
                reject(data.errors.message);
                return
            }
            this.id= data.id;
            resolve(data);
        })
    }
    cargar(){
        console.log(this);
    }
    update(board){
        return new Promise(async (resolve, reject) => {
            const response = await fetch(`${URLSERVER}/${this.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token token="${TOKEN}"`,
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(board),
            });
            const data = await response.json();
            if (response.status !== 200) {
                reject (data);
                return
            }
            this.updateState(data);
            resolve(data);
        });
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
        if (response.status != 200) reject(data.errors.message);
        resolve(data);
    });
}

function getUserToLocalStorage() {
    //return localStorage.getItem('user')
    return {user: "newUser", token: "CXsJ4TJkwL6cMdL8kFP3wWJG"}
}
