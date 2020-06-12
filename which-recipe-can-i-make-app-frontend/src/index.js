const BASE_URL = "http://localhost:3000"
const USER_URL = `${BASE_URL}/get_current_user`
const RECIPES_URL = `${BASE_URL}/recipes`
const mainSection = document.querySelector('main')
const pageHeader = document.getElementById('header')

document.addEventListener("DOMContentLoaded", () => loadPage())

const loadPage = () => {
    fetch(USER_URL)
    .then(resp => resp.json())
    .then(json => {
        if (json.error) {
            homePage()
        } else {
            loggedInLayout(json)
        }
    })
    .catch(console.log)

    userSignupForm();
    userLoginForm();
}

const homePage = () => {
    const span = document.createElement('span')
    span.setAttribute("class", "navbar-brand mb-0 h1")
    span.innerText = 'What Recipe Can I Make?'
    pageHeader.appendChild(span)

    const headerForm = document.createElement('form')
    headerForm.setAttribute("class", "form-inline ml-auto")

    const signUpButton = document.createElement('button')
    signUpButton.setAttribute("id", "signUpButton")
    signUpButton.setAttribute("class", "btn btn-outline-info mr-2")
    signUpButton.innerHTML = "Sign Up"
    signUpButton.addEventListener("click", userSignupForm())
    
    const logInButton = document.createElement('button')
    logInButton.setAttribute("id", "logInButton")
    logInButton.setAttribute("class", "btn btn-success")
    logInButton.innerHTML = 'Login'
    
    headerForm.appendChild(signUpButton)
    headerForm.appendChild(logInButton)
    pageHeader.appendChild(headerForm)
}

const loggedInLayout = (user) => {
    const span = document.createElement('span')
    span.setAttribute("class", "navbar-brand mb-0 h1")
    span.innerText = 'What Recipe Can I Make?'

    const navUl = document.createElement('form')
    navUl.setAttribute("class", "navbar-nav mr-auto")

    const userLi = document.createElement('li')
    userLi.setAttribute("class", "nav-item")
    const userLink = document.createElement('a')
    userLink.setAttribute("class", "nav-link")
    userLink.setAttribute("href", "#")
    userLink.innerHTML = `${user['first_name']} ${user['last_name']}`
    userLink.addEventListener("click", displayUser(user))
    userLi.appendChild(userLink)
    navUl.appendChild(userLi)

    const pantryLi = document.createElement('li')
    pantryLi.setAttribute("class", "nav-item")
    const pantryLink = document.createElement('a')
    pantryLink.setAttribute("class", "nav-link")
    pantryLink.setAttribute("href", "#")
    pantryLink.innerHTML = "Pantry"
    pantryLink.addEventListener("click", displayPantry())
    pantryLi.appendChild(pantryLink)
    navUl.appendChild(pantryLi)

    const recipesLi = document.createElement('li')
    recipesLi.setAttribute("class", "nav-item")
    const recipesLink = document.createElement('a')
    recipesLink.setAttribute("class", "nav-link")
    recipesLink.setAttribute("href", "#")
    recipesLink.innerHTML = "Pantry"
    recipesLink.addEventListener("click", displayRecipes())
    recipesLi.appendChild(recipesLink)
    navUl.appendChild(recipesLi)

    const headerForm = document.createElement('form')
    headerForm.setAttribute("class", "form-inline ml-auto")
    
    const logOutButton = document.createElement('button')
    logOutButton.setAttribute("id", "logOutButton")
    logOutButton.setAttribute("class", "btn btn-success")
    logOutButton.innerHTML = 'Logout'

    pageHeader.appendChild(span) 
    pageHeader.appendChild(navUl)
    headerForm.appendChild(logOutButton)
    pageHeader.appendChild(headerForm)
}

const displayUser = (user) => {

}

const displayPantry = () => {

}

const displayRecipes = () => {

}

const userSignupForm = () => {
    const row = document.createElement('div')
    div.setAttribute("class", "row flex-xl-nowrap justify-content-center")
    const div = document.createElement('div')
    div.setAttribute("class", "col-6 mx-auto")
    const card = document.createElement('div')
    card.setAttribute("class", "shadow card")
    const cardHeader = document.createElement('h5')
    cardHeader.setAttribute("class", "card-header text-center")
    cardHeader.innerHTML = "User Login"
    const cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-body")
    const cardText = document.createElement('p')
    cardText.setAttribute("class", "card-text")
    const form = document.createElement('form')
    
    const firstNameGroup = document.createElement('div')
    firstNameGroup.setAttribute("class", "form-group")
    const firstNameLabel = document.createElement('label')
    firstNameLabel.setAttribute("for", "user_first_name")
    firstNameLabel.innerHTML = "First Name"
    const firstNameInput = document.createElement('input')
    firstNameInput.setAttribute("class", "form-control")
    firstNameInput.setAttribute("type", "text")
    firstNameInput.setAttribute("name", "user[first_name]")
    firstNameInput.setAttribute("id", "user_first_name")

    const lastNameGroup = document.createElement('div')
    lastNameGroup.setAttribute("class", "form-group")
    const lastNameLabel = document.createElement('label')
    lastNameLabel.setAttribute("for", "user_last_name")
    lastNameLabel.innerHTML = "Last Name"
    const lastNameInput = document.createElement('input')
    lastNameInput.setAttribute("class", "form-control")
    lastNameInput.setAttribute("type", "text")
    lastNameInput.setAttribute("name", "user[last_name]")
    lastNameInput.setAttribute("id", "user_last_name")

    const emailGroup = document.createElement('div')
    emailGroup.setAttribute("class", "form-group")
    const emailLabel = document.createElement('label')
    emailLabel.setAttribute("for", "user_email")
    emailLabel.innerHTML = "Email"
    const emailInput = document.createElement('input')
    emailInput.setAttribute("class", "form-control")
    emailInput.setAttribute("type", "text")
    emailInput.setAttribute("name", "user[email]")
    emailInput.setAttribute("id", "user_email")

    const passwordGroup = document.createElement('div')
    passwordGroup.setAttribute("class", "form-group")
    const passwordLabel = document.createElement('label')
    passwordLabel.setAttribute("for", "user_password")
    passwordLabel.innerHTML = "Password"
    const passwordInput = document.createElement('input')
    passwordInput.setAttribute("class", "form-control")
    passwordInput.setAttribute("type", "password")
    passwordInput.setAttribute("name", "user[password]")
    passwordInput.setAttribute("id", "user_password")

    const submitButton = document.createElement('input')
    submitButton.setAttribute("class", "btn btn-primary btn-block text-decoration-none")
    submitButton.setAttribute("type", "submit")
    submitButton.setAttribute("name", "commit")
    submitButton.setAttribute("value", "Login")
    submitButton.setAttribute("data-disable-with", "Login")

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
    // attach card to div
    div.appendChild(card)
    // attach div to row
    row.appendChild(div)
    // attach row to mainSection
    mainSection.appendChild(row)
}


