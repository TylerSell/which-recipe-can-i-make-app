const BASE_URL = "http://localhost:3000"
const USER_URL = `${BASE_URL}/get_current_user`
const RECIPES_URL = `${BASE_URL}/recipes`
const mainSection = document.querySelector('main')

document.addEventListener("DOMContentLoaded", () => getUser())

const getUser = () => {
    fetch(USER_URL)
    .then(resp => resp.json())
    .then(json => console.log(json))
}