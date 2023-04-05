//slide
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

function turnSignup() {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
};

function turnLogin() {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
};
signupLink.onclick = (() => {
    signupBtn.click();
    return false;
});
//end slide

const signupButton = document.getElementById("signUp");
signupButton.onclick = (()=>{console.log("sign up")})
const loginButton = document.getElementById("logIn")
loginButton.onclick = (()=>{console.log("sign in")})

const loginEmail = document.getElementById("emailLogIn");
const loginPassword = document.getElementById("pwdLogIn");

// fetch user data from json to localStorage
fetch('../data/users.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        localStorage.setItem('users', JSON.stringify(data));
        console.log(localStorage.getItem('users'));
      });

// check validation form login
function validateLogin(email, password){
  let check = true;
  //check required
  if(email === ""){
    loginEmail.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Email is not empty';
    loginEmail.parentNode.insertBefore(errorMessage, loginEmail.nextSibling);
    check= false;
  }
  if(password === ""){
    loginPassword.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Password is not empty';
    loginPassword.parentNode.insertBefore(errorMessage, loginPassword.nextSibling);
    check= false;
  }
  // Kiểm tra email có hợp lệ hay không
  if(email !== "" && password !== ""){
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!emailRegex.test(email)) {
    loginEmail.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Email is invalid';
    loginEmail.parentNode.insertBefore(errorMessage, loginEmail.nextSibling);
    check= false;
  }
  // check password length
  if (password.length < 6) {
    loginPassword.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Password must be at least 6 characters';
    loginPassword.parentNode.insertBefore(errorMessage, loginPassword.nextSibling);
    check = false;
  }}
  return check;
}

// get user data from localStorage
function getUserData(email){
  const users = JSON.parse(localStorage.getItem("users"));
  if (users) {
    const user = users.find((user) => user.email === email);
    if (user) {
      return user;
    }
  }

  return null;
}

//check login info
function checkLogin(email, password){
  const user = getUserData(email);
  if (user) {
    if (user.password === password) {
      return true;
    } else {
      loginPassword.classList.add("invalid");
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error-message');
      errorMessage.textContent = 'Password is not correct';
      loginPassword.parentNode.insertBefore(errorMessage, loginPassword.nextSibling);
      return false;
    }
  } else {
    loginEmail.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Email is not correct';
    loginEmail.parentNode.insertBefore(errorMessage, loginEmail.nextSibling);
    return false;
  }
}

//login handle 
function loginHandle(){
  //remove error message
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });
  const email = loginEmail.value;
  const password = loginPassword.value;
  if(validateLogin(email, password)){
    if(checkLogin(email, password)){
      window.location.href = "Home.html";
    }
  }
}

loginButton.addEventListener("click", loginHandle);


// check sign up start
const usernameSignUp = document.getElementById("usernameSignUp");
const emailSignUp = document.getElementById("emailSignUp");
const passwordSignUp = document.getElementById("pwdSignUp");
// check validation form signup
function validateSignUp(username, email, password){
  let check = true;
  //check required
  if(username === ""){
    usernameSignUp.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Username is not empty';
    usernameSignUp.parentNode.insertBefore(errorMessage, usernameSignUp.nextSibling);
    check= false;
  }
  if(email === ""){
    emailSignUp.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Email is not empty';
    emailSignUp.parentNode.insertBefore(errorMessage, emailSignUp.nextSibling);
    check= false;
  }
  if(password === ""){
    passwordSignUp.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Password is not empty';
    passwordSignUp.parentNode.insertBefore(errorMessage, passwordSignUp.nextSibling);
    check= false;
  }
  // Kiểm tra email có hợp lệ hay không
  if(username !== "" && email !== "" && password !== ""){
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!emailRegex.test(email)) {
    emailSignUp.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Email is invalid';
    emailSignUp.parentNode.insertBefore(errorMessage, emailSignUp.nextSibling);
    check= false;
  }
  // check password length
  if (password.length < 6) {
    passwordSignUp.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Password must be at least 6 characters';
    passwordSignUp.parentNode.insertBefore(errorMessage, passwordSignUp.nextSibling);
    check = false;
  }}
  return check;
}

//function check email exist
function checkEmailExist(email){
  const users = JSON.parse(localStorage.getItem("users"));
  if (users) {
    const user = users.find((user) => user.email === email);
    if (user) {
      return true;
    }
  }
}

//sign up handle
function signUpHandle(){
  //remove error message
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });
  const username = usernameSignUp.value;
  const email = emailSignUp.value;
  const password = passwordSignUp.value;
  if(validateSignUp(username, email, password)){
    if(checkEmailExist(email)){
      emailSignUp.classList.add("invalid");
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error-message');
      errorMessage.textContent = 'Email is exist';
      emailSignUp.parentNode.insertBefore(errorMessage, emailSignUp.nextSibling);
    }else{
      const user = {
        username: username,
        email: email,
        password: password
      }
      const users = JSON.parse(localStorage.getItem("users"));
      if (users) {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
      } else {
        localStorage.setItem("users", JSON.stringify([user]));
      }
      turnLogin();
    }
  }
}



signupButton.addEventListener("click", signUpHandle);

// check sign up end
  

  