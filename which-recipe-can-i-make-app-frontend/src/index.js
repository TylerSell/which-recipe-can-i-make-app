const BASE_URL = "http://localhost:3000"
const USER_URL = `${BASE_URL}/get_current_user`
const RECIPES_URL = `${BASE_URL}/recipes`
const mainSection = document.querySelector('main')
const pageHeader = document.getElementById('header')
let globalUser;

document.addEventListener("DOMContentLoaded", () => loadPage())

// loadPage DONE
const loadPage = () => {
    const sendObject = {
        credentials: "include",
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }

    let user;

    fetch(USER_URL, sendObject)
    .then(resp => resp.json())
    .then(json => {
        if (json.error) {
            homePage()
        } else {
            user = json;
            loggedInLayout(user)
        }
    })
    .catch(console.log)
}

// homePage layout DONE
const homePage = () => {
    const span = document.createElement('span')
    span.setAttribute("class", "navbar-brand mb-0 h1")
    span.setAttribute("id", "homePageNav")
    span.innerText = 'What Recipe Can I Make?'

    const headerForm = document.createElement('form')
    headerForm.setAttribute("class", "form-inline ml-auto")
    headerForm.setAttribute("id", "homePageForm")

    const signUpButton = document.createElement('button')
    signUpButton.setAttribute("id", "signUpButton")
    signUpButton.setAttribute("class", "btn btn-outline-info mr-2")
    signUpButton.innerHTML = "Sign Up"
    signUpButton.addEventListener("click", displaySignupForm)
    headerForm.appendChild(signUpButton)

    const logInButton = document.createElement('button')
    logInButton.setAttribute("id", "logInButton")
    logInButton.setAttribute("class", "btn btn-success")
    logInButton.innerHTML = 'Login'
    logInButton.addEventListener("click", displayLoginForm)
    headerForm.appendChild(logInButton)
    
    pageHeader.appendChild(span)
    pageHeader.appendChild(headerForm)

    const homePageContent = document.createElement('row')
    homePageContent.setAttribute("id", "homePageContent")
    homePageContent.setAttribute("class", "row flex justify-content-center")

    const contentCard = document.createElement('div')
    contentCard.setAttribute("class", "shadow card text-white bg-dark mx-auto my-5")
    contentCard.style.maxWidth = "640px"

    const cardImg = document.createElement('img')
    cardImg.setAttribute("class", "card-img-top")
    cardImg.setAttribute("src", "https://cdn.pixabay.com/photo/2014/04/03/19/46/recipe-312959_960_720.jpg")
    cardImg.setAttribute("alt", "Recipe Card Photo")
    cardImg.style.maxHeight = "640px"
    cardImg.style.maxWidth = "960px"

    const cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-body")

    const cardTitle = document.createElement('h5')
    cardTitle.setAttribute("class", "card-title text-center")
    cardTitle.innerHTML = "What Recipe Can I Make?"

    const cardText = document.createElement('p')
    cardText.setAttribute("class", "card-text")
    cardText.innerHTML = "That is the real question.  We all have our own stack of recipes that we make fairly frequently.  We all have lots of items in our pantries.  But inevitably at some point this happens to us all.  We start looking through our recipes wondering if we have all the items and ingredients to make the recipe in our hands.  We find a recipe only to spend the next couple minutes finding all the ingredients only to discover that we are missing something major.  Back to the drawing board and find another one.  Ahhhhh it happened again.  This is getting really frustrating.  Why can't there be a way to know which recipes I CAN make with what I already have in my pantry.  That is what this app is here to solve.  You enter YOUR recipes.  You enter what is in your pantry.  And at any time you can quickly check what recipes you have all the items for.  It will also save all your recipes for you and you can update your pantry as you make things so that you will always know where you stand and what you can make.  So if you are new here signup at the Sign Up button above or if you have been here before Login so you can get cooking!"
    
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
    contentCard.appendChild(cardImg)
    contentCard.appendChild(cardBody)
    homePageContent.appendChild(contentCard)
    mainSection.appendChild(homePageContent)
}

// loggedInLayout DONE
const loggedInLayout = (user) => {
    document.getElementById('homePageNav').remove()
    document.getElementById('loginRow').remove()
    document.getElementById('signupRow').remove()
    document.getElementById('homePageForm').remove()
    const span = document.createElement('span')
    span.setAttribute("class", "navbar-brand mb-0 h1")
    span.setAttribute("id", "loggedInNav")
    span.innerText = 'What Recipe Can I Make?'

    const navUl = document.createElement('ul')
    navUl.setAttribute("class", "nav mr-auto")

    const userLi = document.createElement('li')
    userLi.setAttribute("class", "nav-item")
    const userLink = document.createElement('a')
    userLink.setAttribute("class", "nav-link text-secondary text-capitalize")
    userLink.setAttribute("href", "#")
    userLink.setAttribute("id", "displayUserLink")
    userLink.innerHTML = `${user['first_name']} ${user['last_name']}`
    userLink.addEventListener("click", getUser)
    userLi.appendChild(userLink)
    navUl.appendChild(userLi)

    const pantryLi = document.createElement('li')
    pantryLi.setAttribute("class", "nav-item")
    const pantryLink = document.createElement('a')
    pantryLink.setAttribute("class", "nav-link text-secondary")
    pantryLink.setAttribute("href", "#")
    pantryLink.setAttribute("id", "displayPantryLink")
    pantryLink.innerHTML = "Pantry"
    pantryLink.addEventListener("click", displayPantry)
    pantryLi.appendChild(pantryLink)
    navUl.appendChild(pantryLi)

    const recipesLi = document.createElement('li')
    recipesLi.setAttribute("class", "nav-item")
    const recipesLink = document.createElement('a')
    recipesLink.setAttribute("class", "nav-link text-secondary")
    recipesLink.setAttribute("href", "#")
    recipesLink.setAttribute("id", "displayRecipesLink")
    recipesLink.innerHTML = "Recipes"
    recipesLink.addEventListener("click", displayRecipes)
    recipesLi.appendChild(recipesLink)
    navUl.appendChild(recipesLi)

    const headerForm = document.createElement('form')
    headerForm.setAttribute("class", "form-inline ml-auto")
    
    const logOutButton = document.createElement('button')
    logOutButton.setAttribute("id", "logOutButton")
    logOutButton.setAttribute("class", "btn btn-outline-info")
    logOutButton.innerHTML = 'Logout'
    logOutButton.addEventListener("click", logoutUser)

    pageHeader.appendChild(span) 
    pageHeader.appendChild(navUl)
    headerForm.appendChild(logOutButton)
    pageHeader.appendChild(headerForm)
}

// displaySignupForm DONE
const displaySignupForm = (event) => {
    event.preventDefault();

    const signupRow = document.getElementById('signupRow')
    if (!signupRow) {
        userSignupForm();
    } else {
        signupRow.remove();
        userSignupForm();
    }

    const loginRow = document.getElementById('loginRow')
    if (!!loginRow) {
        loginRow.remove();
    }

    const homePageContent = document.getElementById('homePageContent')
    if (!!homePageContent) {
        homePageContent.remove();
    }
}

// userSignupForm DONE
const userSignupForm = () => {
    const row = document.createElement('div')
    row.setAttribute("class", "row flex-xl-nowrap justify-content-center")
    row.setAttribute("id", "signupRow")

    const card = document.createElement('div')
    card.setAttribute("class", "shadow card text-white bg-dark w-50 mx-auto my-5")
    const cardHeader = document.createElement('h5')
    cardHeader.setAttribute("class", "card-header text-center")
    cardHeader.innerHTML = "New User Signup"
    const cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-body")
    const cardText = document.createElement('p')
    cardText.setAttribute("class", "card-text")
    const form = document.createElement('form')
    form.setAttribute("id", "signupForm")
    
    const firstNameGroup = document.createElement('div')
    firstNameGroup.setAttribute("class", "form-group")
    const firstNameLabel = document.createElement('label')
    firstNameLabel.setAttribute("for", "user_first_name")
    firstNameLabel.innerHTML = "First Name"
    const firstNameInput = document.createElement('input')
    firstNameInput.setAttribute("class", "form-control bg-secondary text-white")
    firstNameInput.setAttribute("type", "text")
    firstNameInput.setAttribute("name", "user[first_name]")
    firstNameInput.setAttribute("id", "user_first_name")

    const lastNameGroup = document.createElement('div')
    lastNameGroup.setAttribute("class", "form-group")
    const lastNameLabel = document.createElement('label')
    lastNameLabel.setAttribute("for", "user_last_name")
    lastNameLabel.innerHTML = "Last Name"
    const lastNameInput = document.createElement('input')
    lastNameInput.setAttribute("class", "form-control bg-secondary text-white")
    lastNameInput.setAttribute("type", "text")
    lastNameInput.setAttribute("name", "user[last_name]")
    lastNameInput.setAttribute("id", "user_last_name")

    const emailGroup = document.createElement('div')
    emailGroup.setAttribute("class", "form-group")
    const emailLabel = document.createElement('label')
    emailLabel.setAttribute("for", "user_email_signup")
    emailLabel.innerHTML = "Email"
    const emailInput = document.createElement('input')
    emailInput.setAttribute("class", "form-control bg-secondary text-white")
    emailInput.setAttribute("type", "text")
    emailInput.setAttribute("name", "user[email]")
    emailInput.setAttribute("id", "user_email")

    const passwordGroup = document.createElement('div')
    passwordGroup.setAttribute("class", "form-group")
    const passwordLabel = document.createElement('label')
    passwordLabel.setAttribute("for", "user_password")
    passwordLabel.innerHTML = "Password"
    const passwordInput = document.createElement('input')
    passwordInput.setAttribute("class", "form-control bg-secondary text-white")
    passwordInput.setAttribute("type", "password")
    passwordInput.setAttribute("name", "user[password]")
    passwordInput.setAttribute("id", "user_password_signup")

    const submitButton = document.createElement('input')
    submitButton.setAttribute("class", "btn btn-outline-info btn-block text-decoration-none")
    submitButton.setAttribute("type", "submit")
    submitButton.setAttribute("name", "commit")
    submitButton.setAttribute("value", "Sign Up")
    submitButton.setAttribute("data-disable-with", "Signing You Up.....")
    submitButton.addEventListener("click", signupUser)

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
    // attach div to row
    row.appendChild(card)
    // attach row to mainSection
    mainSection.appendChild(row)
}

// signupUser DONE
const signupUser = (event) => {
    event.preventDefault();

    let formData = new FormData(document.getElementById('signupForm'));

    const sendObject = {
        credentials: "include",
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formData
    }

    fetch(`${BASE_URL}/users`, sendObject)
    .then(response => response.json())
    .then(json => {
        if (json.error) {
            alert(json.error)
        } else {
            userData = json;
            globalUser = new User(userData['id'], userData['first_name'], userData['last_name'], userData['email'])
            loggedInLayout(globalUser)
        }
    })
    .catch(console.log)
}

// displayLoginForm DONE
const displayLoginForm = (event) => {
    event.preventDefault();

    const loginRow = document.getElementById('loginRow')
    if (!loginRow) {
        userLoginForm();
    } else {
        loginRow.remove();
        userLoginForm();
    }

    const signUpRow = document.getElementById('signupRow')
    if (!!signUpRow) {
        signUpRow.remove();
    }

    const homePageContent = document.getElementById('homePageContent')
    if (!!homePageContent) {
        homePageContent.remove();
    }
}

// userLoginForm DONE
const userLoginForm = () => {
    const row = document.createElement('div')
    row.setAttribute("class", "row flex-xl-nowrap justify-content-center")
    row.setAttribute("id", "loginRow")

    const card = document.createElement('div')
    card.setAttribute("class", "shadow card text-white bg-dark w-50 mx-auto my-5")
    const cardHeader = document.createElement('h5')
    cardHeader.setAttribute("class", "card-header text-center")
    cardHeader.innerHTML = "User Login"
    const cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-body")
    const cardText = document.createElement('p')
    cardText.setAttribute("class", "card-text")
    const form = document.createElement('form')
    form.setAttribute("id", "loginForm")

    const emailGroup = document.createElement('div')
    emailGroup.setAttribute("class", "form-group")
    const emailLabel = document.createElement('label')
    emailLabel.setAttribute("for", "user_email")
    emailLabel.innerHTML = "Email"
    const emailInput = document.createElement('input')
    emailInput.setAttribute("class", "form-control bg-secondary text-white")
    emailInput.setAttribute("type", "text")
    emailInput.setAttribute("name", "email")
    emailInput.setAttribute("id", "user_email_login")

    const passwordGroup = document.createElement('div')
    passwordGroup.setAttribute("class", "form-group")
    const passwordLabel = document.createElement('label')
    passwordLabel.setAttribute("for", "user_password")
    passwordLabel.innerHTML = "Password"
    const passwordInput = document.createElement('input')
    passwordInput.setAttribute("class", "form-control bg-secondary text-white")
    passwordInput.setAttribute("type", "password")
    passwordInput.setAttribute("name", "password")
    passwordInput.setAttribute("id", "user_password_login")

    const submitButton = document.createElement('input')
    submitButton.setAttribute("class", "btn btn-outline-info btn-block text-decoration-none")
    submitButton.setAttribute("type", "submit")
    submitButton.setAttribute("name", "commit")
    submitButton.setAttribute("value", "Login")
    submitButton.setAttribute("data-disable-with", "Logging You In.....")
    submitButton.addEventListener("click", loginUser)

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
    // attach card to row
    row.appendChild(card)
    // attach row to mainSection
    mainSection.appendChild(row)
}

// loginUser DONE
const loginUser = (event) => {
    event.preventDefault();
    // alert(document.getElementById('loginForm'));

    let formData = new FormData(document.getElementById('loginForm'));
    
    const sendObject = {
        credentials: "include",
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formData
    }

    fetch(`${BASE_URL}/login`, sendObject)
    .then(response => response.json())
    .then(json => {
        if (json.error) {
            alert(json.error)
        } else {
            const userData = json;
            globalUser = new User(userData['id'], userData['first_name'], userData['last_name'], userData['email'])
            loggedInLayout(globalUser)
        }
    })
    .catch(console.log)
}

// logoutUser DONE
const logoutUser = (event) => {
    const sendObject = {
        credentials: "include",
        method: "DELETE",
        headers: {
            // "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(`${BASE_URL}/logout`, sendObject)
    .then(response => response.json())
    .then(json => {
        if (json.error) {
            alert(json.error)
        } else {
            document.getElementById('loggedInNav').remove()
            homePage()
        }
    })
    .catch(console.log)
}

// User class DONE
class User {
    id;
    first_name;
    last_name;
    email;

    constructor(id, first_name, last_name, email) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
    }
}





// getUser DONE
const getUser = (event) => {
    event.preventDefault();
    
    document.getElementById('displayUserLink').removeAttribute("class")
    document.getElementById('displayUserLink').setAttribute("class", "nav-link text-info text-capitalize")
    document.getElementById('displayPantryLink').removeAttribute("class")
    document.getElementById('displayPantryLink').setAttribute("class", "nav-link text-secondary")
    document.getElementById('displayRecipesLink').removeAttribute("class")
    document.getElementById('displayRecipesLink').setAttribute("class", "nav-link text-secondary")

    displayUser(globalUser)
}

// displayUser DONE
const displayUser = (user) => {
    document.getElementById('updateUserRow').remove();

    const row = document.createElement('div')
    row.setAttribute("class", "row flex-xl-nowrap justify-content-center")
    row.setAttribute("id", "userRow")

    const card = document.createElement('div')
    card.setAttribute("class", "shadow card text-white bg-dark w-50 mx-auto my-5")
    const cardHeader = document.createElement('h5')
    cardHeader.setAttribute("class", "card-header text-center")
    cardHeader.innerHTML = "Your Information"
    const cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-body")
    const cardText = document.createElement('p')
    cardText.setAttribute("class", "card-text")

    const nameRow = document.createElement('div')
    nameRow.setAttribute("class", "row ml-3")
    const nameCol = document.createElement('div')
    nameCol.setAttribute("class", "col")
    const nameP = document.createElement('p')
    nameP.setAttribute("class", "h5 text-capitalize")
    const nameHeading = document.createElement('strong')
    nameHeading.innerText = "Name: "
    nameP.appendChild(nameHeading)
    nameP.insertAdjacentText("beforeend", `${user['first_name']} ${user['last_name']}`)
    nameCol.appendChild(nameP)
    nameRow.appendChild(nameCol)
    cardText.appendChild(nameRow)

    const emailRow = document.createElement('div')
    emailRow.setAttribute("class", "row ml-3")
    const emailCol = document.createElement('div')
    emailCol.setAttribute("class", "col")
    const emailP = document.createElement('p')
    emailP.setAttribute("class", "h5")
    const emailStrong = document.createElement('strong')
    emailStrong.innerText = "Email: "
    emailP.appendChild(emailStrong)
    emailP.insertAdjacentText("beforeend", `${user['email']}`)
    emailCol.appendChild(emailP)
    emailRow.appendChild(emailCol)
    cardText.appendChild(emailRow)

    const editButtonRow = document.createElement('div')
    editButtonRow.setAttribute("class", "row mx-3")
    const editButtonCol = document.createElement('div')
    editButtonCol.setAttribute("class", "col")
    const editButton = document.createElement('button')
    editButton.setAttribute("class", "btn btn-outline-warning btn-block")
    editButton.innerText = "Edit Your Info"
    editButton.addEventListener("click", updateUserForm)
    editButtonCol.appendChild(editButton)
    editButtonRow.appendChild(editButtonCol)
    cardText.appendChild(editButtonRow)

    // attach cardText to cardBody
    cardBody.appendChild(cardText)
    // attach cardHeader then cardBody to card
    card.appendChild(cardHeader)
    card.appendChild(cardBody)
    // attach div to row
    row.appendChild(card)
    // attach row to mainSection
    mainSection.appendChild(row)
}

const updateUserForm = (event) => {
    event.preventDefault();
    document.getElementById('userRow').remove();

    const row = document.createElement('div')
    row.setAttribute("class", "row flex-xl-nowrap justify-content-center")
    row.style.display = "none"
    row.setAttribute("id", "updateUserRow")

    const card = document.createElement('div')
    card.setAttribute("class", "shadow card text-white bg-dark w-50 mx-auto my-5")
    const cardHeader = document.createElement('h5')
    cardHeader.setAttribute("class", "card-header text-center")
    cardHeader.innerHTML = "Update Your Information"
    const cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-body")
    const cardText = document.createElement('p')
    cardText.setAttribute("class", "card-text")
    const form = document.createElement('form')
    form.setAttribute("id", "updateUserForm")
    
    const firstNameGroup = document.createElement('div')
    firstNameGroup.setAttribute("class", "form-group")
    const firstNameLabel = document.createElement('label')
    firstNameLabel.setAttribute("for", "update_user_first_name")
    firstNameLabel.innerHTML = "First Name"
    const firstNameInput = document.createElement('input')
    firstNameInput.setAttribute("class", "form-control bg-secondary text-white")
    firstNameInput.setAttribute("type", "text")
    firstNameInput.setAttribute("name", "user[first_name]")
    firstNameInput.setAttribute("value", `${globalUser.first_name}`)
    firstNameInput.setAttribute("id", "update_user_first_name")

    const lastNameGroup = document.createElement('div')
    lastNameGroup.setAttribute("class", "form-group")
    const lastNameLabel = document.createElement('label')
    lastNameLabel.setAttribute("for", "update_user_last_name")
    lastNameLabel.innerHTML = "Last Name"
    const lastNameInput = document.createElement('input')
    lastNameInput.setAttribute("class", "form-control bg-secondary text-white")
    lastNameInput.setAttribute("type", "text")
    lastNameInput.setAttribute("name", "user[last_name]")
    lastNameInput.setAttribute("value", `${globalUser.last_name}`)
    lastNameInput.setAttribute("id", "update_user_last_name")

    const emailGroup = document.createElement('div')
    emailGroup.setAttribute("class", "form-group")
    const emailLabel = document.createElement('label')
    emailLabel.setAttribute("for", "update_user_email_")
    emailLabel.innerHTML = "Email"
    const emailInput = document.createElement('input')
    emailInput.setAttribute("class", "form-control bg-secondary text-white")
    emailInput.setAttribute("type", "text")
    emailInput.setAttribute("name", "user[email]")
    emailInput.setAttribute("value", `${globalUser.email}`)
    emailInput.setAttribute("id", "update_user_email")

    const passwordGroup = document.createElement('div')
    passwordGroup.setAttribute("class", "form-group")
    const passwordLabel = document.createElement('label')
    passwordLabel.setAttribute("for", "update_user_password")
    passwordLabel.innerHTML = "Password (optional)"
    const passwordInput = document.createElement('input')
    passwordInput.setAttribute("class", "form-control bg-secondary text-white")
    passwordInput.setAttribute("type", "password")
    passwordInput.setAttribute("name", "user[password]")
    passwordInput.setAttribute("placeholder", "Enter New Password or Leave Blank for Unchanged")
    passwordInput.setAttribute("id", "update_user_password")

    const submitButton = document.createElement('input')
    submitButton.setAttribute("class", "btn btn-outline-info btn-block text-decoration-none")
    submitButton.setAttribute("type", "submit")
    submitButton.setAttribute("name", "commit")
    submitButton.setAttribute("value", "Update My Info")
    submitButton.setAttribute("data-disable-with", "Updating.....")
    submitButton.addEventListener("click", updateUser)

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
    // attach div to row
    row.appendChild(card)
    // attach row to mainSection
    mainSection.appendChild(row)
    // make sure the form is not hidden
    document.getElementById('updateUserRow').removeAttribute("style")
}

const updateUser = (event) => {
    event.preventDefault();
    
    let formData = new FormData(document.getElementById('updateUserForm'))

    // fetch send updated user info
    const sendObject = {
        credentials: "include",
        method: "PATCH",
        headers: {
            // "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formData
    }

    fetch(`${BASE_URL}/users/${globalUser.id}`, sendObject)
    .then(response => response.json())
    .then(json => {
        if (json.error) {
            alert(json.error)
        } else {
            userData = json;
            globalUser.first_name = userData['first_name']
            globalUser.last_name = userData['last_name']
            globalUser.email = userData['email']
            // display updated current user
            displayUser(globalUser)
        }
    })
    .catch(console.log)

}












const displayRecipes = (event) => {
    event.preventDefault();

    document.getElementById('displayUserLink').removeAttribute("class")
    document.getElementById('displayUserLink').setAttribute("class", "nav-link text-secondary text-capitalize")
    document.getElementById('displayPantryLink').removeAttribute("class")
    document.getElementById('displayPantryLink').setAttribute("class", "nav-link text-secondary")
    document.getElementById('displayRecipesLink').removeAttribute("class")
    document.getElementById('displayRecipesLink').setAttribute("class", "nav-link text-info")
}

const displayPantry = (event) => {
    event.preventDefault();

    document.getElementById('displayUserLink').removeAttribute("class")
    document.getElementById('displayUserLink').setAttribute("class", "nav-link text-secondary text-capitalize")
    document.getElementById('displayPantryLink').removeAttribute("class")
    document.getElementById('displayPantryLink').setAttribute("class", "nav-link text-info")
    document.getElementById('displayRecipesLink').removeAttribute("class")
    document.getElementById('displayRecipesLink').setAttribute("class", "nav-link text-secondary")
}
