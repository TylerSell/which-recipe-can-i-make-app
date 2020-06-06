const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const RECIPES_URL = `${BASE_URL}/recipes`
const mainSection = document.querySelector('main')

document.addEventListener("DOMContentLoaded", getUser())

const getUser = () => {
    fetch(USERS_URL)
    .then(resp => resp.json())
    .then(json => {
        if (json.message) {
            alert(json.message)
        }
    })
}