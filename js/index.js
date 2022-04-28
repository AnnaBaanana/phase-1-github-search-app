const userSearchURL = "https://api.github.com/search/users?q="
let param;
//const form = document.querySelector("#github-form")
//console.log(form)


function renderData() {
    console.log(`${userSearchURL}+${param}`)
    fetch(`${userSearchURL}+${param}`, {
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    }).then(res => res.json()).then(data => {
        console.log(data.items)
        const userData = data.items.forEach((element) => {
            console.log(element.login)
            let userList = document.querySelector("#user-list")
            const div = document.createElement("li")
            const h4 = document.createElement("h4")
            h4.textContent = element.login
            const img = document.createElement("img")
            img.className = "avatar"
            img.src = element.avatar_url
            const p = document.createElement("p")
            div.append(h4, img)
            userList.append(div)
        })
    })
}

function searchUser() {
    const form = document.querySelector("#github-form")
    console.log(form)
    form.addEventListener('submit', (e)=> {
        e.preventDefault()
        console.log(e.target[0].value)
        param = e.target[0].value
        renderData()
    })
}

function domLoaded() {
    document.addEventListener('DOMContentLoaded', ()=> {
    console.log("DOM Loaded")
    renderData()
    searchUser()
    })
}

domLoaded()