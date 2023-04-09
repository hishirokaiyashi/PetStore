let listCart = [];

// Lấy thông tin người dùng đăng nhập hiện tại (nếu có)
function getLoggedInUser() {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    return JSON.parse(user);
  }
}
// Get cart items from localstorage
if (localStorage.getItem("listCart")) {
  listCart = JSON.parse(localStorage.getItem("listCart"));
}

// tạo 1 cái biến global để lưu trữ thông tin người dùng đăng nhập hiện tại 
const signedInUser = getLoggedInUser();

if (signedInUser) {
  document.body.remove();
}

// dbName in indexedDB eg. .env 
const dbName = "PetStore";

// slide
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

function turnSignup() {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
  document.querySelector("#signup").checked = true;
};

function turnLogin() {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
  document.querySelector("#login").checked = true;
};

signupLink.onclick = (() => {
  signupBtn.click();
  return false;
});

signupBtn.onclick = (() => {
  document.title = "Pet Store - Sign Up"
})

loginBtn.onclick = (() => {
  document.title = "Pet Store - Log In"
})
//end slide

const signupButton = document.getElementById("signUp");
// signupButton.onclick = (() => { console.log("sign up") })
const loginButton = document.getElementById("logIn")
// loginButton.onclick = (() => { console.log("sign in") })

const loginEmail = document.getElementById("emailLogIn");
const loginPassword = document.getElementById("pwdLogIn");

// fetch user data from json to localStorage
// fetch('../data/users.json')
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         localStorage.setItem('users', JSON.stringify(data));
//         console.log(localStorage.getItem('users'));
//       });

// check validation form login
function validateLogin(email, password) {
  let check = true;
  //check required
  if (email === "") {
    loginEmail.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Email is not empty';
    loginEmail.parentNode.insertBefore(errorMessage, loginEmail.nextSibling);
    check = false;
  }
  if (password === "") {
    loginPassword.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Password is not empty';
    loginPassword.parentNode.insertBefore(errorMessage, loginPassword.nextSibling);
    check = false;
  }

  // Kiểm tra email có hợp lệ hay không
  if (email !== "" && password !== "") {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}|\.\w{2,3}\.\w{2,3})$/;
    if (!emailRegex.test(email)) {
      loginEmail.classList.add("invalid");
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error-message');
      errorMessage.textContent = 'Email is invalid';
      loginEmail.parentNode.insertBefore(errorMessage, loginEmail.nextSibling);
      check = false;
    }
    // check password length
    if (password.length < 6) {
      loginPassword.classList.add("invalid");
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error-message');
      errorMessage.textContent = 'Password must be at least 6 characters';
      loginPassword.parentNode.insertBefore(errorMessage, loginPassword.nextSibling);
      check = false;
    }
  }
  return check;
}
// Update cart quantity
const updateAmountLengthCart = () => {
  let amount = 0;
  listCart.forEach((item) => {
    amount += item.amount;
  })
  document.getElementById("number-cart").innerText = amount;
}

// Call update quantity 
updateAmountLengthCart();
// get user data from localStorage
// function getUserData(email) {
//   const users = JSON.parse(localStorage.getItem("users"));
//   if (users) {
//     const user = users.find((user) => user.email === email);
//     if (user) {
//       return user;
//     }
//   }

//   return null;
// }

//check login info
// function checkLogin(email, password) {
//   const user = getUserData(email);
//   if (user) {
//     if (user.password === password) {
//       return true;
//     } else {
//       loginPassword.classList.add("invalid");
//       const errorMessage = document.createElement('div');
//       errorMessage.classList.add('error-message');
//       errorMessage.textContent = 'Password is not correct';
//       loginPassword.parentNode.insertBefore(errorMessage, loginPassword.nextSibling);
//       return false;
//     }
//   } else {
//     loginEmail.classList.add("invalid");
//     const errorMessage = document.createElement('div');
//     errorMessage.classList.add('error-message');
//     errorMessage.textContent = 'Email is not correct';
//     loginEmail.parentNode.insertBefore(errorMessage, loginEmail.nextSibling);
//     return false;
//   }
// }


// Set current user and list cart
function setLoggedInUser(user, cart) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
  localStorage.setItem("listCart", JSON.stringify(cart));
}

// login handle show password
function handleShowPassword() {
  let pwdLogin = document.getElementById("pwdLogIn");
  let hidePassword = document.querySelector('[data-icon="mdi:eye-off"]')
  let showPassword = document.querySelector('[data-icon="ic:baseline-remove-red-eye"]')
  if (hidePassword) {
    hidePassword.setAttribute('data-icon', 'ic:baseline-remove-red-eye');
    pwdLogin.type = "text"
  }
  if (showPassword) {
    pwdLogin.type = "password"
    showPassword.setAttribute('data-icon', 'mdi:eye-off')
  }
}

function handleShowPasswordSigUp() {
  let pwdSignUp = document.getElementById("pwdSignUp");
  let hidePasswordSignUp = document.querySelector('[data-icon="bi:eye-slash-fill"]')
  let showPasswordSignUp = document.querySelector('[data-icon="bi:eye-fill"]')
  if (hidePasswordSignUp) {
    hidePasswordSignUp.setAttribute('data-icon', 'bi:eye-fill');
    pwdSignUp.type = "text"
  }
  if (showPasswordSignUp) {
    showPasswordSignUp.setAttribute('data-icon', 'bi:eye-slash-fill')
    pwdSignUp.type = "password"
  }
}

//login handle 
function loginHandle() {
  //remove error message
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });

  const email = loginEmail.value;
  const password = loginPassword.value;

  if (validateLogin(email, password)) {
    // if (checkLogin(email, password)) {
    const request = indexedDB.open(dbName);

    request.onerror = function (e) {
      console.log("Database error: " + e.target.errorCode)
    }

    request.onsuccess = function (e) {
      const db = e.target.result;
      const transaction = db.transaction("users", "readonly");
      const store = transaction.objectStore("users");
      const emailIndex = store.index("email");
      const emailRequest = emailIndex.get(email);

      emailRequest.onsuccess = function (e) {
        const user = e.target.result;
        if (user) {
          if (user.password === password) {
            const { id, username: currentUserName, email: currentEmail, cart: currentCart, avatar: currentAvatar, phoneNumber: currentPhoneNumber, address: currentAddress, fullname: currentFullname } = { ...user }
            const currentUser = {
              id,
              username: currentUserName,
              email: currentEmail,
              avatar: currentAvatar,
              phoneNumber: currentPhoneNumber,
              address: currentAddress,
              fullName: currentFullname
            }
            setLoggedInUser(currentUser, currentCart);
            // console.log("Login successfully! 🎉")
            toast({
              title: "Success!",
              message: "Login successfully! Please wait for 2 seconds 😎",
              type: "success",
              duration: 3000
            });
            setTimeout(()=>{
              window.location.href = "Home.html";
            }, 2000)

          } else {
            // console.log("Wrong password, try again! 🥵")

            loginPassword.classList.add("invalid");
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'Wrong Password Try Again! 🥵';
            loginPassword.parentNode.insertBefore(errorMessage, loginPassword.nextSibling);
          }
        } else {
          // console.log("Wrong email, try again! 🥵")
          loginEmail.classList.add("invalid");
          const errorMessage = document.createElement('div');
          errorMessage.classList.add('error-message');
          errorMessage.textContent = 'Wrong email, try again! 🥵';
          loginEmail.parentNode.insertBefore(errorMessage, loginEmail.nextSibling);
          return;
        }
      }

      emailRequest.onerror = function (e) {
        console.log("Invalid account 🥵" + e.target.errorCode)
      }
    }

    /*** HIEU 's */
    // const user = getUserData(email);
    // setLoggedInUser(user);
    // const header = document.querySelector('header');
    // header.classList.add('user-authenticated');
    // const avatarImage = document.querySelector('.user-info .avatar img');
    // const usernameLink = document.querySelector('.user-info .username a');

    // Other stuff
    // avatarImage.src = user.avatar;
    // avatarImage.alt = user.name;
    // usernameLink.textContent = user.name;
    // usernameLink.href = '/profile'; // Link đến trang thông tin chi tiết của user

  }
  // }
}

loginButton.addEventListener("click", loginHandle);

document.querySelector("#pwdLogIn").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    loginHandle();
  }
})

// check sign up start
const usernameSignUp = document.getElementById("usernameSignUp");
const emailSignUp = document.getElementById("emailSignUp");
const passwordSignUp = document.getElementById("pwdSignUp");

// check validation form signup
function validateSignUp(username, email, password) {
  let check = true;
  //check required
  if (username === "") {

    usernameSignUp.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Username is not empty';
    usernameSignUp.parentNode.insertBefore(errorMessage, usernameSignUp.nextSibling);
    check = false;
  }
  if (email === "") {

    emailSignUp.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Email is not empty';
    emailSignUp.parentNode.insertBefore(errorMessage, emailSignUp.nextSibling);
    check = false;

  }
  if (password === "") {

    passwordSignUp.classList.add("invalid");
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Password is not empty';
    passwordSignUp.parentNode.insertBefore(errorMessage, passwordSignUp.nextSibling);
    check = false;

  }

  // console.log(isValidUsername("giao &&"))

  // Kiểm tra email có hợp lệ hay không
  function isValidUsername(username) {
    if (/[^\w]/.test(username)) {
      return false;
    }
    return true;
  }
  // Kiểm tra password có ít nhất 1 chữ hoa 
  function hasUppercase(password) {
    return /[A-Z]/.test(password);
  }
  if (username !== "" && email !== "" && password !== "") {
    // const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}|\.\w{2,3}\.\w{2,3})$/;
    if (!isValidUsername(username)) {
      usernameSignUp.classList.add("invalid");
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error-message');
      errorMessage.textContent = 'User Name cannot contain symbol characters';
      usernameSignUp.parentNode.insertBefore(errorMessage, usernameSignUp.nextSibling);
      check = false;
    }
    if (!emailRegex.test(email)) {
      emailSignUp.classList.add("invalid");
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error-message');
      errorMessage.textContent = 'Email is invalid';
      emailSignUp.parentNode.insertBefore(errorMessage, emailSignUp.nextSibling);
      check = false;
    }
    // check password length
    if (password.length < 6) {
      passwordSignUp.classList.add("invalid");
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error-message');
      errorMessage.textContent = 'Password must be at least 6 characters';
      passwordSignUp.parentNode.insertBefore(errorMessage, passwordSignUp.nextSibling);
      check = false;
    } else if (!hasUppercase(password)) {
      passwordSignUp.classList.add("invalid");
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error-message');
      errorMessage.textContent = 'Password must contain at least one word uppercase';
      passwordSignUp.parentNode.insertBefore(errorMessage, passwordSignUp.nextSibling);
      check = false;
    }
  }
  return check;
}

//function check email exist --> HIEU 'S
// function checkEmailExist(email) {
//   const users = JSON.parse(localStorage.getItem("users"));
//   if (users) {
//     const user = users.find((user) => user.email === email);
//     if (user) {
//       return true;
//     }
//   }
// }

// sign up handle by enter


//sign up handle

function signUpHandle() {
  //remove error message
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((errorMessage) => {
    errorMessage.remove();
  });
  const username = usernameSignUp.value.trim();
  const email = emailSignUp.value.trim();
  const password = passwordSignUp.value.trim();

  if (validateSignUp(username, email, password)) {
    const storeName = "users";
    const indexName = "email";
    const ordersStoreName = "orders";

    const openRequest = indexedDB.open(dbName, 1);

    openRequest.onerror = function () {
      console.error("Failed to open database");
    };

    openRequest.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Create users store
      const store = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      store.createIndex(indexName, "email", { unique: true });

      // Create orders store
      const ordersStore = db.createObjectStore(ordersStoreName, { keyPath: "id", autoIncrement: true });
      ordersStore.createIndex("customerEmail", "customerEmail", { unique: false });

    };

    openRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);

      const request = store.index(indexName).get(email);

      request.onsuccess = function (event) {
        const result = event.target.result;
        if (result) {
          console.log("Email already exists");
          emailSignUp.classList.add("invalid");
          const errorMessage = document.createElement('div');
          errorMessage.classList.add('error-message');
          errorMessage.textContent = 'Email already exists 😣 !';
          emailSignUp.parentNode.insertBefore(errorMessage, emailSignUp.nextSibling);
          toast({
            title: "Fail!",
            message: "Email already exists 😣 !",
            type: "error",
            duration: 5000
          });
        } else {
          const newUser = {
            username,
            email,
            password,
            phoneNumber: "",
            address: "",
            avatar: "",
            cart: []
          };
          const addRequest = store.add(newUser);
          addRequest.onsuccess = function () {
            turnLogin()
            toast({
              title: "Success!",
              message: "Sign up sucessfully 😎 !",
              type: "success",
              duration: 3000
            });
            console.log("User added successfully");
          };
          addRequest.onerror = function () {
            console.error("Failed to add user");
          };
        }
      };
    };

    /** PROMISE ALL BUT ERROR */

    // openRequest.onupgradeneeded = function (event) {
    //   const db = openRequest.result;
    //   const store = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
    //   store.createIndex("email", "email", { unique: true });
    //   store.createIndex("username", "username", { unique: true });

    // };

    // openRequest.onsuccess = function (event) {
    //   const db = openRequest.result;
    //   const transaction = db.transaction([storeName], "readwrite");
    //   const store = transaction.objectStore(storeName);

    //   const emailCheck = store.index("email").get(email);
    //   const usernameCheck = store.index("username").get(email);

    //   Promise.all([emailCheck, usernameCheck]).then(([emailResult, usernameResult]) => {
    //     if (emailResult) {
    //       console.log("Email already exists");
    //     } else if (usernameResult) {
    //       console.log("Username already exists");
    //     } else {
    //       const newUser = { username, email, password };
    //       const addRequest = store.put(newUser);
    //       addRequest.onsuccess = function () {
    //         console.log("User added successfully");
    //       };
    //       addRequest.onerror = function () {
    //         console.error("Failed to add user");
    //       };
    //     }
    //   })

    /**** HIEU ' S  */

    // if(checkEmailExist(email)){
    //   emailSignUp.classList.add("invalid");
    //   const errorMessage = document.createElement('div');
    //   errorMessage.classList.add('error-message');
    //   errorMessage.textContent = 'Email is exist';
    //   emailSignUp.parentNode.insertBefore(errorMessage, emailSignUp.nextSibling);
    // }else{
    //   const user = {
    //     username: username,
    //     email: email,
    //     password: password
    //   }
    //   const users = JSON.parse(localStorage.getItem("users"));
    //   if (users) {
    //     users.push(user);
    //     localStorage.setItem("users", JSON.stringify(users));
    //   } else {
    //     localStorage.setItem("users", JSON.stringify([user]));
    //   }
    //   turnLogin();
    // }
  }
}

signupButton.addEventListener("click", signUpHandle);
document.querySelector("#pwdSignUp").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    signUpHandle();
  }
})
// check sign up end


