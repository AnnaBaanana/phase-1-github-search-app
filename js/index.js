const userSearchURL = "https://api.github.com/search/users?q="
let param;

//working renderData with separate createUser
function renderData() {
    console.log('Ready to render')
    let userList = document.querySelector("#user-list")
       //regular fetch to render data 
    fetch(`${userSearchURL}+${param}`, {
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    }).then(res => res.json()).then(data => {
        console.log(data)
        removeAllChildNodes(userList)
        data.items.forEach((element) => {
            userList.append(createUser(element))
    })})
    expandUser()
}

function createUser(element) {
    const div = document.createElement("div")
    div.className = "users"
    div.id = `${element.login}`
    const h4 = document.createElement("h4")
    h4.textContent = element.login
    const img = document.createElement("img")
    img.className = "avatar"
    img.src = element.avatar_url
    const p = document.createElement("p")
    div.append(h4, img)
    return div
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function searchUser() {
    console.log('Ready to search')
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

function expandUser() {
    const userList = document.querySelector("#user-list")
    userList.addEventListener("click", (e)=> {
    const userName = e.target.parentNode.childNodes[0].textContent
    fetch(`https://api.github.com/users/${userName}/repos`,{
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    }).then(res=> res.json()).then(data => {
        const userLoc = document.querySelector(`#${userName}`)
        const repoData = data.forEach((element) => {
            const repoItem = document.createElement('li')
            const a = document.createElement('a')
            a.href = ` ${element.html_url} `
            a.className = 'url'
            const aText = document.createTextNode(` ${element.name} `)
            a.appendChild(aText)
            //console.log(a)
            repoItem.append(a)
            userLoc.append(repoItem)
        })
})})}

domLoaded()