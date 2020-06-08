const BASE_URL = "http://localhost:3000"
const USER_URL = `${BASE_URL}/get_current_user`
const RECIPES_URL = `${BASE_URL}/recipes`
const mainSection = document.querySelector('main')

document.addEventListener("DOMContentLoaded", () => getCurrentUser())

const getCurrentUser = () => {
    fetch(USER_URL)
    .then(resp => resp.json())
    .then(json => {
        if (json.error) {
            loginForm()
        } else {
            displayUser(json)
        }
    })
    .catch(console.log)
}

const displayUser = () => {

}

const loginForm = () => {
    const card = document.createElement('div')
    const cardHeader = document.createElement('h5')
    const cardBody = document.createElement('div')
    const cardText = document.createElement('p')
    const form = document.createElement('form')
    
    const firstNameGroup = document.createElement('div')
    const firstNameLabel = document.createElement('label')
    const firstNameInput = document.createElement('input')

    const lastNameGroup = document.createElement('div')
    const lastNameLabel = document.createElement('label')
    const lastNameInput = document.createElement('input')

    const emailGroup = document.createElement('div')
    const emailLabel = document.createElement('label')
    const emailInput = document.createElement('input')

    const passwordGroup = document.createElement('div')
    const passwordLabel = document.createElement('label')
    const passwordInput = document.createElement('input')

    const submitButton = document.createElement('input')

    // build firstNameGroup then attach to form
    firstNameGroup.appendChild(firstNameLabel)
    firstNameGroup.appendChild(firstNameInput)
    form.appendChild(firstNameGroup)
    // build lastNameGroup then attach to form
    lastNameGroup.appendChild(lastNameLabel)
    lastNameGroup.appendChild(lastNameInput)
    form.appendChild(lastNameGroup)
    // build emailGroup then attach to form
    emailGroup.appendChild(emailLabel)
    emailGroup.appendChild(emailInput)
    form.appendChild(emailGroup)
    // build passwordGroup then attach to form
    passwordGroup.appendChild(passwordLabel)
    passwordGroup.appendChild(passwordInput)
    form.appendChild(passwordGroup)
    // build button then attach to form
    form.appendChild(submitButton)
    // attach form to cardText
    cardText.appendChild(form)
    // attach cardText to cardBody
    cardBody.appendChild(cardText)
    // attach cardHeader then cardBody to card
    card.appendChild(cardHeader)
    card.appendChild(cardBody)
    // attach card to mainSection
    mainSection.appendChild(card)
}


