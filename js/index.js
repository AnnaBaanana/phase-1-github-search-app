const userSearchURL = "https://api.github.com/search/users?q="
let param = "Vanya"
const form = document.querySelector("#github-form")

domLoaded()

function domLoaded() {
    document.addEventListener('DOMContentLoaded', ()=> {
    console.log("DOM Loaded")
    renderData()
    })
}

function renderData() {
    console.log(`${userSearchURL}+${param}`)
    fetch(`${userSearchURL}+${param}`, {
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    }).then(res=> res.json()).then(data => {
        console.log(data)
        searchUser()
    })
}

function searchUser() {
    console.log(form)
    form.addEventListener('submit', (e)=> {
        e.preventDefault()
        console.log(e)
    })
}

