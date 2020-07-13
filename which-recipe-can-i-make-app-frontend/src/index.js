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
    const homePageNav = document.getElementById('homePageNav')
    if (!!homePageNav) { homePageNav.remove() }

    const loginRow = document.getElementById('loginRow')
    if (!!loginRow) { loginRow.remove() }

    const signUpRow = document.getElementById('signupRow')
    if (!!signUpRow) { signUpRow.remove() }

    const homePageForm = document.getElementById('homePageForm')
    if (!!homePageForm) { homePageForm.remove() }

    const span = document.createElement('span')
    span.setAttribute("class", "navbar-brand mb-0 h1")
    span.setAttribute("id", "loggedInNav")
    span.innerText = 'What Recipe Can I Make?'

    const navUl = document.createElement('ul')
    navUl.setAttribute("class", "nav mr-auto")
    navUl.setAttribute("id", "navUl")

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
    pantryLink.addEventListener("click", getPantry)
    pantryLi.appendChild(pantryLink)
    navUl.appendChild(pantryLi)

    const recipesLi = document.createElement('li')
    recipesLi.setAttribute("class", "nav-item")
    const recipesLink = document.createElement('a')
    recipesLink.setAttribute("class", "nav-link text-secondary")
    recipesLink.setAttribute("href", "#")
    recipesLink.setAttribute("id", "displayRecipesLink")
    recipesLink.innerHTML = "Recipes"
    recipesLink.addEventListener("click", getRecipes)
    recipesLi.appendChild(recipesLink)
    navUl.appendChild(recipesLi)

    const headerForm = document.createElement('form')
    headerForm.setAttribute("class", "form-inline ml-auto")
    headerForm.setAttribute("id", "loggedInHeaderForm")
    
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

    const updateUserRow = document.getElementById('updateUserRow')
    if (!!updateUserRow) {
        updateUserRow.remove();
    }

    const userRow = document.getElementById('userRow')
    if (!!userRow) {
        userRow.remove();
    }

    const pantryRow = document.getElementById('pantryRow')
    if (!!pantryRow) {
        pantryRow.remove();
    }

    const recipesRow = document.getElementById('recipesRow')
    if (!!recipesRow) {
        recipesRow.remove();
    }

    const recipeRow = document.getElementById('recipeRow')
    if (!!recipeRow) {
        recipeRow.remove();
    }

    const newRecipeRow = document.getElementById('newRecipeRow')
    if (!!newRecipeRow) {
        newRecipeRow.remove();
    }

    displayUser(globalUser);
}

// displayUser DONE
const displayUser = (globalUser) => {

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
    nameP.insertAdjacentText("beforeend", `${globalUser.first_name} ${globalUser.last_name}`)
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
    emailP.insertAdjacentText("beforeend", `${globalUser.email}`)
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
    editButton.addEventListener("click", getUpdateUser)
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

// getUpdateUser DONE
const getUpdateUser = (event) => {
    event.preventDefault();

    const updateUserRow = document.getElementById('updateUserRow')
    if (!updateUserRow) {
        displayUpdateUser(globalUser);
    } else {
        updateUserRow.remove();
        displayUpdateUser(globalUser);
    }

    const userRow = document.getElementById('userRow')
    if (!!userRow) {
        userRow.remove();
    }

    const pantryRow = document.getElementById('pantryRow')
    if (!!pantryRow) {
        pantryRow.remove();
    }

    const recipesRow = document.getElementById('recipesRow')
    if (!!recipesRow) {
        recipesRow.remove();
    }
}

// displayUpdateUser DONE
const displayUpdateUser = (globalUser) => {
    const row = document.createElement('div')
    row.setAttribute("class", "row flex-xl-nowrap justify-content-center")
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
}

// updateUser DONE
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
            document.getElementById('loggedInNav').remove();
            document.getElementById('navUl').remove();
            document.getElementById('loggedInHeaderForm').remove();
            document.getElementById('updateUserRow').remove();
            loggedInLayout(globalUser)
            document.getElementById('displayUserLink').removeAttribute("class")
            document.getElementById('displayUserLink').setAttribute("class", "nav-link text-info text-capitalize")
            document.getElementById('displayPantryLink').removeAttribute("class")
            document.getElementById('displayPantryLink').setAttribute("class", "nav-link text-secondary")
            document.getElementById('displayRecipesLink').removeAttribute("class")
            document.getElementById('displayRecipesLink').setAttribute("class", "nav-link text-secondary")
            // display updated current user
            displayUser(globalUser);
        }
    })
    .catch(console.log)

}

// getPantry DONE
const getPantry = (event) => {
    if (event) {
        event.preventDefault();
    }

    document.getElementById('displayUserLink').removeAttribute("class")
    document.getElementById('displayUserLink').setAttribute("class", "nav-link text-secondary text-capitalize")
    document.getElementById('displayPantryLink').removeAttribute("class")
    document.getElementById('displayPantryLink').setAttribute("class", "nav-link text-info")
    document.getElementById('displayRecipesLink').removeAttribute("class")
    document.getElementById('displayRecipesLink').setAttribute("class", "nav-link text-secondary")

    const updateUserRow = document.getElementById('updateUserRow')
    if (!!updateUserRow) {
        updateUserRow.remove();
    }

    const userRow = document.getElementById('userRow')
    if (!!userRow) {
        userRow.remove();
    }

    const pantryRow = document.getElementById('pantryRow')
    if (!!pantryRow) {
        pantryRow.remove();
    }

    const recipesRow = document.getElementById('recipesRow')
    if (!!recipesRow) {
        recipesRow.remove();
    }

    const recipeRow = document.getElementById('recipeRow')
    if (!!recipeRow) {
        recipeRow.remove();
    }

    const newRecipeRow = document.getElementById('newRecipeRow')
    if (!!newRecipeRow) {
        newRecipeRow.remove();
    }

    // display the pantry
    displayPantry();
    document.getElementById('pantryForm').reset();

    // get the pantry items with a fetch request
    const sendObject = {
        credentials: "include",
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }

    fetch(`${BASE_URL}/users/${globalUser.id}/pantry_items`, sendObject)
    .then(resp => resp.json())
    // list pantry items
    // sort response alphabetically
    .then(json => {
        json.sort(function(a, b) {
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
        }).forEach(item => listPantryItem(item))
        // json.sort().forEach(item => listPantryItem(item))
    })
}

// displayPantry DONE
const displayPantry = () => {
    const row = document.createElement('div')
    row.setAttribute("class", "row flex-xl-nowrap justify-content-center")
    row.setAttribute("id", "pantryRow")

    const card = document.createElement('div')
    card.setAttribute("class", "shadow card text-white bg-dark w-50 mx-auto my-5")
    const cardHeader = document.createElement('h5')
    cardHeader.setAttribute("class", "card-header text-center")
    cardHeader.innerHTML = "Your Pantry"
    const cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-body")
    const cardText = document.createElement('p')
    cardText.setAttribute("class", "card-text")
    cardText.setAttribute("id", "pantryCardText")

    const pantyList = document.createElement('table')
    pantyList.setAttribute("class", "table table-sm table-hover table-dark")
    pantyList.setAttribute("id", "pantryList")
    const tableHead = document.createElement('thead')
    tableHead.setAttribute("class", "thead-dark")
    const tableBody = document.createElement('tbody')
    tableBody.setAttribute("id", "pantryTableBody")
    const tableRow = document.createElement('tr')
    const itemHeader = document.createElement('th')
    itemHeader.innerText = "Item Description"
    const quantityHeader = document.createElement('th')
    quantityHeader.innerText = "Quantity"
    const deleteItemHeader = document.createElement('th')
    deleteItemHeader.innerText = "Delete Item"
    tableRow.appendChild(itemHeader)
    tableRow.appendChild(quantityHeader)
    tableRow.appendChild(deleteItemHeader)
    tableHead.appendChild(tableRow)
    pantyList.appendChild(tableHead)
    pantyList.appendChild(tableBody)
    cardText.appendChild(pantyList)

    const pantryForm = document.createElement('form')
    pantryForm.setAttribute("class", "mx-auto")
    pantryForm.setAttribute("id", "pantryForm")

    const formRow = document.createElement('div')
    formRow.setAttribute("class", "form-row")
    formRow.setAttribute("id", "formRow")

    const hiddenField = document.createElement('input')
    hiddenField.setAttribute("type", "hidden")
    hiddenField.setAttribute("name", "pantry_item[user_id]")
    hiddenField.setAttribute("value", `${globalUser.id}`)

    const itemGroup = document.createElement('div')
    itemGroup.setAttribute("class", "form-group col")
    const itemLabel = document.createElement('label')
    itemLabel.setAttribute("for", "pantry_item_name")
    itemLabel.innerHTML = "Item"
    const itemInput = document.createElement('input')
    itemInput.setAttribute("class", "form-control bg-secondary text-white")
    itemInput.setAttribute("type", "text")
    itemInput.setAttribute("name", "pantry_item[name]")
    itemInput.setAttribute("id", "pantry_item_name")
    itemGroup.appendChild(itemLabel)
    itemGroup.appendChild(itemInput)
    formRow.appendChild(itemGroup)

    const quantityGroup = document.createElement('div')
    quantityGroup.setAttribute("class", "form-group col")
    const quantityLabel = document.createElement('label')
    quantityLabel.setAttribute("for", "pantry_item_quantity")
    quantityLabel.innerHTML = "Quantity"
    const quantityInput = document.createElement('input')
    quantityInput.setAttribute("class", "form-control bg-secondary text-white")
    quantityInput.setAttribute("type", "text")
    quantityInput.setAttribute("name", "pantry_item[quantity]")
    quantityInput.setAttribute("id", "pantry_item_quantity")
    quantityGroup.appendChild(quantityLabel)
    quantityGroup.appendChild(quantityInput)
    formRow.appendChild(quantityGroup)

    const submitGroup = document.createElement('div')
    submitGroup.setAttribute("class", "form-group col")
    const submitLabel = document.createElement('label')
    submitLabel.setAttribute("for", "pantry_item_submit")
    submitLabel.innerHTML = "&nbsp;"
    const submitButton = document.createElement('input')
    submitButton.setAttribute("class", "btn btn-outline-info btn-block text-decoration-none")
    submitButton.setAttribute("type", "submit")
    submitButton.setAttribute("name", "submit")
    submitButton.setAttribute("value", "Add Item")
    submitButton.setAttribute("data-disable-with", "Adding Item.....")
    submitButton.addEventListener("click", addPantryItem)
    submitGroup.appendChild(submitLabel)
    submitGroup.appendChild(submitButton)
    formRow.appendChild(submitGroup)

    pantryForm.appendChild(formRow)
    cardText.appendChild(pantryForm)
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

// listPantryItem DONE
const listPantryItem = (item) => {
    const pantryTableBody = document.getElementById('pantryTableBody')
    // list Pantry Items in List Item
    const pantryRow = document.createElement('tr')
    pantryRow.setAttribute("id", `${item.id}`)
    const itemName = document.createElement('td')
    itemName.innerHTML = `${item['name']}`
    const itemQuantity = document.createElement('td')
    itemQuantity.innerHTML = `${item['quantity']}`

    const deleteCell = document.createElement('td')
    const deleteButton = document.createElement('button')
    deleteButton.setAttribute("class", "btn btn-outline-danger btn-block text-decoration-none")
    deleteButton.setAttribute("type", "submit")
    deleteButton.setAttribute("name", "delete")
    deleteButton.setAttribute("value", "Delete")
    deleteButton.innerHTML = "Delete"
    deleteButton.setAttribute("data-disable-with", "Deleting Item.....")
    deleteButton.setAttribute("data-pantry-item-id", item.id)
    deleteButton.addEventListener("click", deletePantryItem)
    deleteCell.appendChild(deleteButton)
    // attach to pantryTableBody
    pantryRow.appendChild(itemName)
    pantryRow.appendChild(itemQuantity)
    pantryRow.appendChild(deleteCell)
    pantryTableBody.appendChild(pantryRow)
}

// addPantryItem DONE
const addPantryItem = (event) => {
    event.preventDefault();

    let formData = new FormData(document.getElementById('pantryForm'))

    // fetch send updated user info
    const sendObject = {
        credentials: "include",
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formData
    }

    fetch(`${BASE_URL}/users/${globalUser.id}/pantry_items`, sendObject)
    .then(response => response.json())
    .then(json => {
        if (json.error) {
            alert(json.error)
        } else {
            getPantry()
        }
    })
    .catch(console.log)
}

// deletePantryItem DONE
// deletePantry item 'Failed load fetch'
// but still deletes and completes function
// researched and this only shows error/failed load in Chrome
// shows this error only when response is empty as in a delete request
const deletePantryItem = (event) => {
    event.preventDefault();

    const sendObject = {
        credentials: "include",
        method: "DELETE",
        headers: {
            "Accept": "application/json"
        }
    }

    fetch(`${BASE_URL}/users/${globalUser.id}/pantry_items/${event.target.dataset.pantryItemId}`, sendObject)
    .catch(console.log)
    getPantry();
}

// getRecipes DONE
const getRecipes = (event) => {
    if (event) {
        event.preventDefault();
    }

    document.getElementById('displayUserLink').removeAttribute("class")
    document.getElementById('displayUserLink').setAttribute("class", "nav-link text-secondary text-capitalize")
    document.getElementById('displayPantryLink').removeAttribute("class")
    document.getElementById('displayPantryLink').setAttribute("class", "nav-link text-secondary")
    document.getElementById('displayRecipesLink').removeAttribute("class")
    document.getElementById('displayRecipesLink').setAttribute("class", "nav-link text-info")

    const updateUserRow = document.getElementById('updateUserRow')
    if (!!updateUserRow) {
        updateUserRow.remove();
    }

    const userRow = document.getElementById('userRow')
    if (!!userRow) {
        userRow.remove();
    }

    const pantryRow = document.getElementById('pantryRow')
    if (!!pantryRow) {
        pantryRow.remove();
    }

    const recipesRow = document.getElementById('recipesRow')
    if (!!recipesRow) {
        recipesRow.remove();
    }

    const recipeRow = document.getElementById('recipeRow')
    if (!!recipeRow) {
        recipeRow.remove();
    }
    
    const newRecipeRow = document.getElementById('newRecipeRow')
    if (!!newRecipeRow) {
        newRecipeRow.remove();
    }
    
    const updateRecipeRow = document.getElementById('updateRecipeRow')
    if (!!updateRecipeRow) {
        updateRecipeRow.remove();
    }

    // display recipes
    displayRecipes();

    // get the recipes with a fetch request
    const sendObject = {
        credentials: "include",
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }

    fetch(`${BASE_URL}/users/${globalUser.id}/recipes`, sendObject)
    .then(resp => resp.json())
    // list recipes
    .then(json => {
        // console.log(json)
        json.forEach(recipe => listRecipes(recipe))
    })
}

// displayRecipes DONE
const displayRecipes = () => {
    const row = document.createElement('div')
    row.setAttribute("class", "row flex-xl-nowrap justify-content-center")
    row.setAttribute("id", "recipesRow")

    const card = document.createElement('div')
    card.setAttribute("class", "shadow card text-white bg-dark w-50 mx-auto my-5")
    const cardHeader = document.createElement('h5')
    cardHeader.setAttribute("class", "card-header text-center")
    cardHeader.innerHTML = "Your Pantry"
    const cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-body")
    const cardText = document.createElement('p')
    cardText.setAttribute("class", "card-text")
    cardText.setAttribute("id", "recipesCardText")

    const pantyList = document.createElement('table')
    pantyList.setAttribute("class", "table table-sm table-hover table-dark")
    pantyList.setAttribute("id", "recipesList")
    const tableHead = document.createElement('thead')
    tableHead.setAttribute("class", "thead-dark")
    const tableBody = document.createElement('tbody')
    tableBody.setAttribute("id", "recipesTableBody")
    const tableRow = document.createElement('tr')
    const recipeHeader = document.createElement('th')
    recipeHeader.innerText = "Recipe Name"
    const calorieHeader = document.createElement('th')
    calorieHeader.innerText = "Calories Per Serving"
    const viewRecipeHeader = document.createElement('th')
    viewRecipeHeader.innerText = "View Recipe"
    tableRow.appendChild(recipeHeader)
    tableRow.appendChild(calorieHeader)
    tableRow.appendChild(viewRecipeHeader)
    tableHead.appendChild(tableRow)
    pantyList.appendChild(tableHead)
    pantyList.appendChild(tableBody)
    cardText.appendChild(pantyList)

    const recipeForm = document.createElement('form')
    recipeForm.setAttribute("class", "mx-auto")
    recipeForm.setAttribute("id", "recipeForm")

    const formRow = document.createElement('div')
    formRow.setAttribute("class", "form-row")
    formRow.setAttribute("id", "formRow")

    const submitGroup = document.createElement('div')
    submitGroup.setAttribute("class", "form-group col")
    const submitButton = document.createElement('input')
    submitButton.setAttribute("class", "btn btn-outline-info btn-block text-decoration-none")
    submitButton.setAttribute("type", "submit")
    submitButton.setAttribute("name", "submit")
    submitButton.setAttribute("value", "Create New Recipe")
    submitButton.setAttribute("data-disable-with", "New Recipe.....")
    submitButton.addEventListener("click", newRecipeForm)
    submitGroup.appendChild(submitButton)
    formRow.appendChild(submitGroup)

    recipeForm.appendChild(formRow)
    cardText.appendChild(recipeForm)
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

// listRecipes DONE
const listRecipes = (recipe) => {
    const recipesTableBody = document.getElementById('recipesTableBody')
    // list Pantry Items in List Item
    const recipesRow = document.createElement('tr')
    recipesRow.setAttribute("id", `${recipe.id}`)
    const recipeName = document.createElement('td')
    recipeName.innerHTML = `${recipe['name']}`
    const recipeCalories = document.createElement('td')
    recipeCalories.innerHTML = `${recipe['cal_per_serving']}`

    const viewCell = document.createElement('td')
    const viewButton = document.createElement('button')
    viewButton.setAttribute("class", "btn btn-outline-success btn-block text-decoration-none")
    viewButton.setAttribute("type", "submit")
    viewButton.setAttribute("name", "view")
    viewButton.setAttribute("value", "View")
    viewButton.innerHTML = "View"
    viewButton.setAttribute("data-disable-with", "Deleting Item.....")
    viewButton.setAttribute("data-recipe-id", recipe.id)
    viewButton.addEventListener("click", viewRecipe)
    viewCell.appendChild(viewButton)
    // attach to recipesTableBody
    recipesRow.appendChild(recipeName)
    recipesRow.appendChild(recipeCalories)
    recipesRow.appendChild(viewCell)
    recipesTableBody.appendChild(recipesRow)
}

// view Recipe DONE
const viewRecipe = (event) => {
    if (event) {
        event.preventDefault();
    }

    const updateUserRow = document.getElementById('updateUserRow')
    if (!!updateUserRow) {
        updateUserRow.remove();
    }

    const userRow = document.getElementById('userRow')
    if (!!userRow) {
        userRow.remove();
    }

    const pantryRow = document.getElementById('pantryRow')
    if (!!pantryRow) {
        pantryRow.remove();
    }

    const recipesRow = document.getElementById('recipesRow')
    if (!!recipesRow) {
        recipesRow.remove();
    }

    const recipeRow = document.getElementById('recipeRow')
    if (!!recipeRow) {
        recipeRow.remove();
    }

    const updateRecipeRow = document.getElementById('updateRecipeRow')
    if (!!updateRecipeRow) {
        updateRecipeRow.remove();
    }

    const recipeId = event.target.dataset.recipeId
    let pantry = [];
    let ingredients = [];

    const sendObject = {
        credentials: "include",
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }

    fetch(`${BASE_URL}/users/${globalUser.id}/pantry_items`, sendObject)
    .then(resp => resp.json())
    // list pantry items
    .then(json => {
        json.forEach(item => {
            pantry.push(`${item['name']}`)
        })
    })

    fetch(`${BASE_URL}/users/${globalUser.id}/recipes/${recipeId}`, sendObject)
    .then(resp => resp.json())
    .then(json => {
        
        // draw Recipe Card
        // show Recipe info 
        // add to Recipe Card
        const row = document.createElement('div')
        row.setAttribute("class", "row flex-xl-nowrap justify-content-center")
        row.setAttribute("id", "recipeRow")

        const card = document.createElement('div')
        card.setAttribute("class", "shadow card text-white bg-dark w-50 mx-auto my-5")
        const cardHeader = document.createElement('h4')
        cardHeader.setAttribute("class", "card-header text-center")
        cardHeader.innerHTML = `${json['name']}`
        const cardBody = document.createElement('div')
        cardBody.setAttribute("class", "card-body")
        const cardText = document.createElement('p')
        cardText.setAttribute("class", "card-text")

        const makeRow = document.createElement('div')
        makeRow.setAttribute("class", "row justify-content-center")
        const makeCol = document.createElement('div')
        makeCol.setAttribute("class", "col")
        const makeHeader = document.createElement('h4')

        json.ingredients.forEach(ingredient => {
            ingredients.push(`${ingredient['name']}`)
        })

        let isSuperset = ingredients.every(function (val) { return pantry.indexOf(val) >= 0; })
        
        if (isSuperset) {
            makeHeader.setAttribute("class", "h4 text-capitalize text-center text-success")
            makeHeader.innerHTML = "You can make this Recipe!"
        } else {
            makeHeader.setAttribute("class", "h4 text-capitalize text-center text-danger")
            makeHeader.innerHTML = "You cannot make this Recipe!"
        }

        makeCol.appendChild(makeHeader)
        makeRow.appendChild(makeCol)
        cardText.appendChild(makeRow)

        const servingSizeRow = document.createElement('div')
        servingSizeRow.setAttribute("class", "row ml-3")
        const servingSizeCol = document.createElement('div')
        servingSizeCol.setAttribute("class", "col")
        const servingSizeP = document.createElement('p')
        servingSizeP.setAttribute("class", "h6 text-muted text-capitalize")
        const servingSizeHeading = document.createElement('strong')
        servingSizeHeading.innerText = "Serving Size: "
        servingSizeP.appendChild(servingSizeHeading)
        servingSizeP.insertAdjacentText("beforeend", `${json['serving_size']}`)
        servingSizeCol.appendChild(servingSizeP)
        servingSizeRow.appendChild(servingSizeCol)
        cardText.appendChild(servingSizeRow)

        const calorieRow = document.createElement('div')
        calorieRow.setAttribute("class", "row ml-3")
        const calorieCol = document.createElement('div')
        calorieCol.setAttribute("class", "col")
        const calorieP = document.createElement('p')
        calorieP.setAttribute("class", "h6 text-muted text-capitalize")
        const calorieHeading = document.createElement('strong')
        calorieHeading.innerText = "Calories Per Serving: "
        calorieP.appendChild(calorieHeading)
        calorieP.insertAdjacentText("beforeend", `${json['cal_per_serving']}`)
        calorieCol.appendChild(calorieP)
        calorieRow.appendChild(calorieCol)
        cardText.appendChild(calorieRow)

        // show ingredient info
        // add to recipe card
        const ingredientRow = document.createElement('div')
        ingredientRow.setAttribute("class", "row ml-3")
        const ingredientCol = document.createElement('div')
        ingredientCol.setAttribute("class", "col")
        const ingredientHeader = document.createElement('h4')
        ingredientHeader.setAttribute("class", "h4 text-capitalize")
        ingredientHeader.innerHTML = "Ingredients"
        ingredientCol.appendChild(ingredientHeader)
        const ingredientUl = document.createElement('ul')
        ingredientCol.appendChild(ingredientUl)
        ingredientRow.appendChild(ingredientCol)
        cardText.appendChild(ingredientRow)
        // iterate through all ingredients and add them to <LI></LI>
        // attach the li to ingredientUl
        json.ingredients.forEach(ingredient => {
            const ingredientLi = document.createElement('li')
            ingredientLi.setAttribute("class", "text-muted text-capitalize")
            ingredientLi.innerHTML = `${ingredient['name']} (${ingredient['quantity']})`
            ingredientUl.appendChild(ingredientLi)
            ingredients.push(`${ingredient['name']}`)
        })

        // show instruction info
        // add to recipe card
        const instructionRow = document.createElement('div')
        instructionRow.setAttribute("class", "row ml-3")
        const instructionCol = document.createElement('div')
        instructionCol.setAttribute("class", "col")
        const instructionHeader = document.createElement('h4')
        instructionHeader.setAttribute("class", "h4 text-capitalize")
        instructionHeader.innerHTML = "Instructions"
        instructionCol.appendChild(instructionHeader)
        const instructionOl = document.createElement('ol')
        instructionCol.appendChild(instructionOl)
        instructionRow.appendChild(instructionCol)
        cardText.appendChild(instructionRow)
        // iterate through all instructions and add them to <LI></LI>
        // attach the li to instructionOl
        json.instructions.forEach(instruction => {
            const instructionLi = document.createElement('li')
            instructionLi.setAttribute("class", "text-muted text-capitalize")
            instructionLi.innerHTML = `${instruction['description']}`
            instructionOl.appendChild(instructionLi)
        })

        // draw edit button
        // add to recipe card
        const editButton = document.createElement('button')
        editButton.setAttribute("class", "btn btn-outline-warning btn-block text-decoration-none")
        editButton.setAttribute("type", "submit")
        editButton.setAttribute("name", "edit")
        editButton.setAttribute("value", "View")
        editButton.innerHTML = "Edit Recipe"
        editButton.setAttribute("data-disable-with", "Edit Recipe.....")
        editButton.setAttribute("data-recipe-id", json.id)
        editButton.addEventListener("click", editRecipeForm)
        cardText.appendChild(editButton)

        // attach cardText to cardBody
        cardBody.appendChild(cardText)
        // attach cardHeader then cardBody to card
        card.appendChild(cardHeader)
        card.appendChild(cardBody)
        // attach div to row
        row.appendChild(card)
        // attach row to mainSection
        mainSection.appendChild(row)
        })
}

// IN PROGRESS----------------------------------
const newRecipeForm = (event) => {
    event.preventDefault();

    const updateUserRow = document.getElementById('updateUserRow')
    if (!!updateUserRow) {
        updateUserRow.remove();
    }

    const userRow = document.getElementById('userRow')
    if (!!userRow) {
        userRow.remove();
    }

    const pantryRow = document.getElementById('pantryRow')
    if (!!pantryRow) {
        pantryRow.remove();
    }

    const recipesRow = document.getElementById('recipesRow')
    if (!!recipesRow) {
        recipesRow.remove();
    }

    const recipeRow = document.getElementById('recipeRow')
    if (!!recipeRow) {
        recipeRow.remove();
    }

    const updateRecipeRow = document.getElementById('updateRecipeRow')
    if (!!updateRecipeRow) {
        updateRecipeRow.remove();
    }

    const row = document.createElement('div')
    row.setAttribute("class", "row flex-xl-nowrap justify-content-center")
    row.setAttribute("id", "newRecipeRow")

    const card = document.createElement('div')
    card.setAttribute("class", "shadow card text-white bg-dark w-50 mx-auto my-5")
    const cardHeader = document.createElement('h5')
    cardHeader.setAttribute("class", "card-header text-center")
    cardHeader.innerHTML = "New Recipe"
    const cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-body")
    const cardText = document.createElement('p')
    cardText.setAttribute("class", "card-text")
    const form = document.createElement('form')
    form.setAttribute("id", "newRecipeForm")

    const hiddenField = document.createElement('input')
    hiddenField.setAttribute("type", "hidden")
    hiddenField.setAttribute("name", "recipe[user_id]")
    hiddenField.setAttribute("value", `${globalUser.id}`)
    form.appendChild(hiddenField)
    
    const recipeNameGroup = document.createElement('div')
    recipeNameGroup.setAttribute("class", "form-group")
    const recipeNameLabel = document.createElement('label')
    recipeNameLabel.setAttribute("for", "recipe_name")
    recipeNameLabel.innerHTML = "Recipe Name"
    const recipeNameInput = document.createElement('input')
    recipeNameInput.setAttribute("class", "form-control bg-secondary text-white")
    recipeNameInput.setAttribute("type", "text")
    recipeNameInput.setAttribute("name", "recipe[name]")
    recipeNameInput.setAttribute("id", "recipe_name")
    recipeNameGroup.appendChild(recipeNameLabel)
    recipeNameGroup.appendChild(recipeNameInput)
    form.appendChild(recipeNameGroup)

    const servineSizeGroup = document.createElement('div')
    servineSizeGroup.setAttribute("class", "form-group")
    const servineSizeLabel = document.createElement('label')
    servineSizeLabel.setAttribute("for", "recipe_serving_size")
    servineSizeLabel.innerHTML = "Serving Size"
    const servineSizeInput = document.createElement('input')
    servineSizeInput.setAttribute("class", "form-control bg-secondary text-white")
    servineSizeInput.setAttribute("type", "text")
    servineSizeInput.setAttribute("name", "recipe[serving_size]")
    servineSizeInput.setAttribute("id", "recipe_serving_size")
    servineSizeGroup.appendChild(servineSizeLabel)
    servineSizeGroup.appendChild(servineSizeInput)
    form.appendChild(servineSizeGroup)

    const caloriesGroup = document.createElement('div')
    caloriesGroup.setAttribute("class", "form-group")
    const caloriesLabel = document.createElement('label')
    caloriesLabel.setAttribute("for", "recipe_cal_per_serving")
    caloriesLabel.innerHTML = "Calories Per Serving"
    const caloriesInput = document.createElement('input')
    caloriesInput.setAttribute("class", "form-control bg-secondary text-white")
    caloriesInput.setAttribute("type", "text")
    caloriesInput.setAttribute("name", "recipe[cal_per_serving]")
    caloriesInput.setAttribute("id", "recipe_cal_per_serving")
    caloriesGroup.appendChild(caloriesLabel)
    caloriesGroup.appendChild(caloriesInput)
    form.appendChild(caloriesGroup)

    const ingredientDiv = document.createElement('div')
    ingredientDiv.setAttribute("class", "row justify-content-center")
    const ingredientHeader = document.createElement('h4')
    ingredientHeader.innerHTML = "Ingredients"
    ingredientDiv.appendChild(ingredientHeader)
    form.appendChild(ingredientDiv)

    const addIngredientButton = document.createElement('input')
    addIngredientButton.setAttribute("class", "btn btn-outline-info btn-block text-decoration-none")
    addIngredientButton.setAttribute("type", "submit")
    addIngredientButton.setAttribute("name", "commit")
    addIngredientButton.setAttribute("id", "addIngredientButton")
    addIngredientButton.setAttribute("value", "Add Ingredient")
    addIngredientButton.setAttribute("data-disable-with", "Adding Ingredient.....")
    addIngredientButton.addEventListener("click", insertIngredientForm)
    form.appendChild(addIngredientButton)
    
    const instructionDiv = document.createElement('div')
    instructionDiv.setAttribute("class", "row justify-content-center mt-2")
    const instructionHeader = document.createElement('h4')
    instructionHeader.innerHTML = "Instructions"
    instructionDiv.appendChild(instructionHeader)
    form.appendChild(instructionDiv)

    const addInstructionButton = document.createElement('input')
    addInstructionButton.setAttribute("class", "btn btn-outline-info btn-block text-decoration-none")
    addInstructionButton.setAttribute("type", "submit")
    addInstructionButton.setAttribute("name", "commit")
    addInstructionButton.setAttribute("id", "addInstructionButton")
    addInstructionButton.setAttribute("value", "Add Instruction")
    addInstructionButton.setAttribute("data-disable-with", "Adding Instruction.....")
    addInstructionButton.addEventListener("click", insertInstructionForm)
    form.appendChild(addInstructionButton)

    const submitButton = document.createElement('input')
    submitButton.setAttribute("class", "btn btn-outline-success btn-block text-decoration-none")
    submitButton.setAttribute("type", "submit")
    submitButton.setAttribute("name", "commit")
    submitButton.setAttribute("value", "Create Recipe")
    submitButton.setAttribute("data-disable-with", "Creating New Recipe.....")
    submitButton.addEventListener("click", newRecipe)
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

// insert Ingredient DONE
const insertIngredientForm = (event) => {
    event.preventDefault();

    const update = event.target.dataset.type

    const ingredientButton = document.getElementById('addIngredientButton')
    const parentForm = document.getElementById('newRecipeForm')
    const updateParentForm = document.getElementById('updateRecipeForm')

    const formRow = document.createElement('div')
    formRow.setAttribute("class", "form-row")
    formRow.setAttribute("id", "formRow")

    const ingredientNameGroup = document.createElement('div')
    ingredientNameGroup.setAttribute("class", "form-group col")
    const ingredientNameLabel = document.createElement('label')
    ingredientNameLabel.setAttribute("for", "ingredientName")
    ingredientNameLabel.innerHTML = "Name"
    const ingredientNameInput = document.createElement('input')
    ingredientNameInput.setAttribute("class", "form-control bg-secondary text-white")
    ingredientNameInput.setAttribute("type", "text")
    ingredientNameInput.setAttribute("name", "recipe[new_ingredient_attributes][][name]")
    ingredientNameInput.setAttribute("id", "ingredient_name")
    ingredientNameGroup.appendChild(ingredientNameLabel)
    ingredientNameGroup.appendChild(ingredientNameInput)
    formRow.appendChild(ingredientNameGroup)

    const ingredientQuantityGroup = document.createElement('div')
    ingredientQuantityGroup.setAttribute("class", "form-group col")
    const ingredientQuantityLabel = document.createElement('label')
    ingredientQuantityLabel.setAttribute("for", "ingredientQuantity")
    ingredientQuantityLabel.innerHTML = "Quantity"
    const ingredientQuantityInput = document.createElement('input')
    ingredientQuantityInput.setAttribute("class", "form-control bg-secondary text-white")
    ingredientQuantityInput.setAttribute("type", "text")
    ingredientQuantityInput.setAttribute("name", "recipe[new_ingredient_attributes][][quantity]")
    ingredientQuantityInput.setAttribute("id", "ingredient_quantity")
    ingredientQuantityGroup.appendChild(ingredientQuantityLabel)
    ingredientQuantityGroup.appendChild(ingredientQuantityInput)
    formRow.appendChild(ingredientQuantityGroup)

    if (update) {
        updateParentForm.insertBefore(formRow, ingredientButton)
    } else {
        parentForm.insertBefore(formRow, ingredientButton) 
    }
    
}

// insert Instruction DONE
const insertInstructionForm = (event) => {
    event.preventDefault();

    const update = event.target.dataset.type

    const instructionButton = document.getElementById('addInstructionButton')
    const parentForm = document.getElementById('newRecipeForm')
    const updateParentForm = document.getElementById('updateRecipeForm')

    const formRow = document.createElement('div')
    formRow.setAttribute("class", "form-row")
    formRow.setAttribute("id", "formRow")

    const instructionGroup = document.createElement('div')
    instructionGroup.setAttribute("class", "form-group col")
    const instructionLabel = document.createElement('label')
    instructionLabel.setAttribute("for", "instruction_description")
    instructionLabel.innerHTML = "Description"
    const instructionInput = document.createElement('input')
    instructionInput.setAttribute("class", "form-control bg-secondary text-white")
    instructionInput.setAttribute("type", "text")
    instructionInput.setAttribute("name", "recipe[new_instruction_attributes][][description]")
    instructionInput.setAttribute("id", "instruction_description")
    instructionGroup.appendChild(instructionLabel)
    instructionGroup.appendChild(instructionInput)
    formRow.appendChild(instructionGroup)

    if (update) {
        updateParentForm.insertBefore(formRow, instructionButton)
    } else {
        parentForm.insertBefore(formRow, instructionButton)    
    }
}

// new Recipe DONE
const newRecipe = (event) => {
    event.preventDefault();

    let formData = new FormData(document.getElementById('newRecipeForm'))

    const sendObject = {
        credentials: "include",
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formData
    }

    fetch(`${BASE_URL}/users/${globalUser.id}/recipes`, sendObject)
    .then(response => response.json())
    .then(json => {
        if (json.error) {
            alert(json.error)
        } else {
            getRecipes()
        }
    })
    .catch(console.log)
}

// editRecipeForm DONE
const editRecipeForm = (event) => {
    event.preventDefault();

    const updateUserRow = document.getElementById('updateUserRow')
    if (!!updateUserRow) {
        updateUserRow.remove();
    }

    const userRow = document.getElementById('userRow')
    if (!!userRow) {
        userRow.remove();
    }

    const pantryRow = document.getElementById('pantryRow')
    if (!!pantryRow) {
        pantryRow.remove();
    }

    const recipesRow = document.getElementById('recipesRow')
    if (!!recipesRow) {
        recipesRow.remove();
    }

    const recipeRow = document.getElementById('recipeRow')
    if (!!recipeRow) {
        recipeRow.remove();
    }

    // draw the form card
    const row = document.createElement('div')
    row.setAttribute("class", "row flex-xl-nowrap justify-content-center")
    row.setAttribute("id", "updateRecipeRow")

    const card = document.createElement('div')
    card.setAttribute("class", "shadow card text-white bg-dark w-50 mx-auto my-5")
    const cardHeader = document.createElement('h5')
    cardHeader.setAttribute("class", "card-header text-center")
    cardHeader.innerHTML = "Edit and Update Recipe"
    const cardBody = document.createElement('div')
    cardBody.setAttribute("class", "card-body")
    const cardText = document.createElement('p')
    cardText.setAttribute("class", "card-text")
    const form = document.createElement('form')
    form.setAttribute("id", "updateRecipeForm")

    const hiddenField = document.createElement('input')
    hiddenField.setAttribute("type", "hidden")
    hiddenField.setAttribute("name", "recipe[user_id]")
    hiddenField.setAttribute("value", `${globalUser.id}`)
    form.appendChild(hiddenField)
    
    let recipeId = event.target.dataset.recipeId
    // get the recipe with fetch
    const getSendObj = {
        credentials: "include",
        method: "GET",
        headers: {
            // "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }

    fetch(`${BASE_URL}/users/${globalUser.id}/recipes/${recipeId}`, getSendObj)
    .then(resp => resp.json())
    .then(json => {
        // add recipe fields to form and fill with recipe data
        const recipeNameGroup = document.createElement('div')
        recipeNameGroup.setAttribute("class", "form-group")
        const recipeNameLabel = document.createElement('label')
        recipeNameLabel.setAttribute("for", "recipe_name")
        recipeNameLabel.innerHTML = "Recipe Name"
        const recipeNameInput = document.createElement('input')
        recipeNameInput.setAttribute("class", "form-control bg-secondary text-white")
        recipeNameInput.setAttribute("type", "text")
        recipeNameInput.setAttribute("name", "recipe[name]")
        recipeNameInput.setAttribute("id", "recipe_name")
        recipeNameInput.setAttribute("value", `${json['name']}`)
        recipeNameGroup.appendChild(recipeNameLabel)
        recipeNameGroup.appendChild(recipeNameInput)
        form.appendChild(recipeNameGroup)

        const servineSizeGroup = document.createElement('div')
        servineSizeGroup.setAttribute("class", "form-group")
        const servineSizeLabel = document.createElement('label')
        servineSizeLabel.setAttribute("for", "recipe_serving_size")
        servineSizeLabel.innerHTML = "Serving Size"
        const servineSizeInput = document.createElement('input')
        servineSizeInput.setAttribute("class", "form-control bg-secondary text-white")
        servineSizeInput.setAttribute("type", "text")
        servineSizeInput.setAttribute("name", "recipe[serving_size]")
        servineSizeInput.setAttribute("id", "recipe_serving_size")
        servineSizeInput.setAttribute("value", `${json['serving_size']}`)
        servineSizeGroup.appendChild(servineSizeLabel)
        servineSizeGroup.appendChild(servineSizeInput)
        form.appendChild(servineSizeGroup)

        const caloriesGroup = document.createElement('div')
        caloriesGroup.setAttribute("class", "form-group")
        const caloriesLabel = document.createElement('label')
        caloriesLabel.setAttribute("for", "recipe_cal_per_serving")
        caloriesLabel.innerHTML = "Calories Per Serving"
        const caloriesInput = document.createElement('input')
        caloriesInput.setAttribute("class", "form-control bg-secondary text-white")
        caloriesInput.setAttribute("type", "text")
        caloriesInput.setAttribute("name", "recipe[cal_per_serving]")
        caloriesInput.setAttribute("id", "recipe_cal_per_serving")
        caloriesInput.setAttribute("value", `${json['cal_per_serving']}`)
        caloriesGroup.appendChild(caloriesLabel)
        caloriesGroup.appendChild(caloriesInput)
        form.appendChild(caloriesGroup)

        // iterate through ingredients and add fields for each ingredient and fill with ingredient data
        const ingredientDiv = document.createElement('div')
        ingredientDiv.setAttribute("class", "row justify-content-center")
        ingredientDiv.setAttribute("id", "updateIngredientDiv")
        const ingredientHeader = document.createElement('h4')
        ingredientHeader.innerHTML = "Ingredients"
        ingredientDiv.appendChild(ingredientHeader)
        form.appendChild(ingredientDiv)

        json.ingredients.forEach(ingredient => {
            const formRow = document.createElement('div')
            formRow.setAttribute("class", "form-row")

            const ingredientNameGroup = document.createElement('div')
            ingredientNameGroup.setAttribute("class", "form-group col")
            const ingredientNameLabel = document.createElement('label')
            ingredientNameLabel.setAttribute("for", "ingredientName")
            ingredientNameLabel.innerHTML = "Name"
            const ingredientNameInput = document.createElement('input')
            ingredientNameInput.setAttribute("class", "form-control bg-secondary text-white")
            ingredientNameInput.setAttribute("type", "text")
            ingredientNameInput.setAttribute("name", `recipe[existing_ingredient_attributes][${ingredient['id']}][name]`)
            ingredientNameInput.setAttribute("id", "ingredient_name")
            ingredientNameInput.setAttribute("value", `${ingredient['name']}`)
            ingredientNameGroup.appendChild(ingredientNameLabel)
            ingredientNameGroup.appendChild(ingredientNameInput)
            formRow.appendChild(ingredientNameGroup)

            const ingredientQuantityGroup = document.createElement('div')
            ingredientQuantityGroup.setAttribute("class", "form-group col")
            const ingredientQuantityLabel = document.createElement('label')
            ingredientQuantityLabel.setAttribute("for", "ingredientQuantity")
            ingredientQuantityLabel.innerHTML = "Quantity"
            const ingredientQuantityInput = document.createElement('input')
            ingredientQuantityInput.setAttribute("class", "form-control bg-secondary text-white")
            ingredientQuantityInput.setAttribute("type", "text")
            ingredientQuantityInput.setAttribute("name", `recipe[existing_ingredient_attributes][${ingredient['id']}][quantity]`)
            ingredientQuantityInput.setAttribute("id", "ingredient_quantity")
            ingredientQuantityInput.setAttribute("value", `${ingredient['quantity']}`)
            ingredientQuantityGroup.appendChild(ingredientQuantityLabel)
            ingredientQuantityGroup.appendChild(ingredientQuantityInput)
            formRow.appendChild(ingredientQuantityGroup)
            form.appendChild(formRow)
        })
        
        const addIngredientButton = document.createElement('input')
        addIngredientButton.setAttribute("class", "btn btn-outline-info btn-block text-decoration-none")
        addIngredientButton.setAttribute("type", "submit")
        addIngredientButton.setAttribute("name", "commit")
        addIngredientButton.setAttribute("id", "addIngredientButton")
        addIngredientButton.setAttribute("value", "Add Ingredient")
        addIngredientButton.setAttribute("data-disable-with", "Adding Ingredient.....")
        addIngredientButton.setAttribute("data-type", "updateForm")
        addIngredientButton.addEventListener("click", insertIngredientForm)
        form.appendChild(addIngredientButton)

        // iterate through instructions and add fields for each instruction and fill with instruction data
        const instructionDiv = document.createElement('div')
        instructionDiv.setAttribute("class", "row justify-content-center mt-2")
        const instructionHeader = document.createElement('h4')
        instructionHeader.innerHTML = "Instructions"
        instructionDiv.appendChild(instructionHeader)
        form.appendChild(instructionDiv)

        json.instructions.forEach(instruction => {
            const instructionFormRow = document.createElement('div')
            instructionFormRow.setAttribute("class", "form-row")
        
            const instructionGroup = document.createElement('div')
            instructionGroup.setAttribute("class", "form-group col")
            const instructionLabel = document.createElement('label')
            instructionLabel.setAttribute("for", "instruction_description")
            instructionLabel.innerHTML = "Description"
            const instructionInput = document.createElement('input')
            instructionInput.setAttribute("class", "form-control bg-secondary text-white")
            instructionInput.setAttribute("type", "text")
            instructionInput.setAttribute("name", `recipe[existing_instruction_attributes][${instruction['id']}][description]`)
            instructionInput.setAttribute("id", "instruction_description")
            instructionInput.setAttribute("value", `${instruction['description']}`)
            instructionGroup.appendChild(instructionLabel)
            instructionGroup.appendChild(instructionInput)
            instructionFormRow.appendChild(instructionGroup)
            instructionDiv.appendChild(instructionFormRow)
            form.appendChild(instructionFormRow)
        })

        const addInstructionButton = document.createElement('input')
        addInstructionButton.setAttribute("class", "btn btn-outline-info btn-block text-decoration-none")
        addInstructionButton.setAttribute("type", "submit")
        addInstructionButton.setAttribute("name", "commit")
        addInstructionButton.setAttribute("id", "addInstructionButton")
        addInstructionButton.setAttribute("value", "Add Instruction")
        addInstructionButton.setAttribute("data-disable-with", "Adding Instruction.....")
        addInstructionButton.setAttribute("data-type", "updateForm")
        addInstructionButton.addEventListener("click", insertInstructionForm)
        form.appendChild(addInstructionButton)

        const submitButton = document.createElement('input')
        submitButton.setAttribute("class", "btn btn-outline-success btn-block text-decoration-none")
        submitButton.setAttribute("type", "submit")
        submitButton.setAttribute("name", "commit")
        submitButton.setAttribute("value", "Update Recipe")
        submitButton.setAttribute("data-disable-with", "Updating Recipe.....")
        submitButton.setAttribute("data-recipe-id", `${recipeId}`)
        submitButton.addEventListener("click", updateRecipe)
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
    })
}

// updateRecipe DONE
const updateRecipe = (event) => {
    event.preventDefault();

    let recipeId = event.target.dataset.recipeId

    let formData = new FormData(document.getElementById('updateRecipeForm'))

    // fetch to send updated information
    const updateSendObj = {
        credentials: "include",
        method: "PATCH",
        headers: {
            // "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formData
    }

    fetch(`${BASE_URL}/users/${globalUser.id}/recipes/${recipeId}`, updateSendObj)
    .then(resp => resp.json())
    .then(json => {
        if (json.error) {
            alert(json.error)
        } else {
            getRecipes()
        }
    })
}