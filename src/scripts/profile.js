/***  GLOBAL QUERY VARIABLES & VARIABLES USED BELOW ***/
let listCart = [];
let userInfo = {};
let newUserInfo = {};
let listOrder = [];

const dbName = "PetStore";

const fullname = document.querySelector("#profile-fullname-input");
const address = document.querySelector("#Address");
const email = document.querySelector("#profile-email-input");
const phoneNo = document.querySelector("#profile-phoneNumber-input");
const profileBtn = document.querySelector(".profile-btn-submit");
const avatarElement = document.querySelector(".profile-avatar");
const fileInput = document.querySelector("#file-input");
const formDetail = document.querySelector("#profile-form");

const oldPassword = document.querySelector("#profile-password-input");
const newPassword = document.querySelector("#profile-newpassword-input");
const confirmedNewPassword = document.querySelector("#profile-confirm-newpassword-input");
/**  EMPTY WHEN THERE IS NO LOGGED-IN USER **/
/* Get current user infor from localstorage */
if (localStorage.getItem("loggedInUser")) {
  userInfo = JSON.parse(localStorage.getItem("loggedInUser"));

  newUserInfo = { ...userInfo };

  document.title = newUserInfo.fullname ? newUserInfo.fullname + " | PetStore" : newUserInfo.username ? newUserInfo.username + " | PetStore" : "My Profile | PetStore"

  fullname.value = userInfo.fullname ? userInfo.fullname : "";
  address.value = userInfo.address ? userInfo.address : "";
  email.value = userInfo.email ? userInfo.email : "";
  phoneNo.value = userInfo.phoneNumber ? userInfo.phoneNumber : "";
  avatarElement.src = userInfo.avatar ? userInfo.avatar : "/assets/images/avatar-default.jpg";
  // password.value = userInfo.password ? userInfo.password : "";
} else {
  document.body.remove();
}

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file.type.startsWith("image/")) {
    // Create a new file object
    const reader = new FileReader();
    // Set the "onload" event
    reader.onload = () => {
      const base64Image = reader.result;
      avatarElement.src = reader.result;
      newUserInfo.avatar = base64Image;
    }
    reader.readAsDataURL(file);
  }
})

/* Get cart items from localstorage */
if (localStorage.getItem("listCart")) {
  listCart = JSON.parse(localStorage.getItem("listCart"));
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

// Function to compare 2 objects
const objectsAreEqual = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

// Listen to the changes of all input fields
fullname.addEventListener('change', function () {
  newUserInfo.fullname = this.value.trim();
  if (!objectsAreEqual(userInfo, newUserInfo)) {
    profileBtn.disabled = true;
  } else {
    profileBtn.disabled = false;
  }
});

address.addEventListener('change', function () {
  newUserInfo.address = this.value.trim();
  if (!objectsAreEqual(userInfo, newUserInfo)) {
    profileBtn.disabled = true;
  } else {
    profileBtn.disabled = false;
  }
});

email.addEventListener('change', function () {
  newUserInfo.email = this.value.trim();
  if (!objectsAreEqual(userInfo, newUserInfo)) {
    profileBtn.disabled = true;
  } else {
    profileBtn.disabled = false;
  }
});

phoneNo.addEventListener('change', function () {
  newUserInfo.phoneNumber = this.value.trim();
  if (!objectsAreEqual(userInfo, newUserInfo)) {
    profileBtn.disabled = true;
  } else {
    profileBtn.disabled = false;
  }
});

// Update user profile 
function handleEditProfile() {
  // event.preventDefault();
  if (confirm("Are you sure you want to change your profile information?")) {
    // Connect to database called PetStore
    const request = indexedDB.open(dbName, 1);

    // If there happens any error when connecting
    request.onerror = (event) => {
      console.error("Database error: ", event.target.errorCode);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const tx = db.transaction("users", "readwrite");
      const store = tx.objectStore("users");

      const getRequest = store.get(newUserInfo.id);
      getRequest.onsuccess = (event) => {
        const user = event.target.result;
        if (user) {
          // Update user properties
          user.fullname = newUserInfo.fullname;
          user.address = newUserInfo.address;
          user.email = newUserInfo.email;
          user.phoneNumber = newUserInfo.phoneNumber;
          user.avatar = newUserInfo.avatar;

          // Save the updated user object back into the store
          const putRequest = store.put(user);
          putRequest.onsuccess = () => {
            console.log("User updated successfully");
            toast({
              title: "Thành công!",
              message: "Update Profile User sucessfully 😎 !",
              type: "success",
              duration: 5000
            });
            localStorage.setItem("loggedInUser", JSON.stringify(newUserInfo));
            userInfo = JSON.parse(localStorage.getItem("loggedInUser"));
          };
          putRequest.onerror = (event) => {
            console.error("Error updating user: ", event.target.error);
          };
        } else {
          console.error(`User with ID ${newUserInfo.id} not found`);
        }
      };
      tx.onerror = (event) => {
        console.error("Error editing user: ", event.target.error);
      };
    };
  }
}

// Handle tabs title profile
const tabsProfile = document.querySelectorAll(".edit-profile");
const contents = document.querySelectorAll('.profile-content');

tabsProfile.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabsProfile.forEach((tab) => {
      tab.classList.remove("tab-profile-active");
    })
    tab.classList.add("tab-profile-active");
    const targetId = tab.dataset.target;
    contents.forEach(content => {
      if (content.id === targetId) {
        content.classList.remove('profile-inActive-class');
        content.classList.add('profile-active-class');
      } else {
        content.classList.remove('profile-active-class');
        content.classList.add('profile-inActive-class');
      }
    });
  })
})
// Handle change password --> Validate newPassword, confirmedNewPassword
function hasUppercase(password) {
  return /[A-Z]/.test(password);
}

function handleChangePassword() {
  console.log(formDetail)

  let errorMessage;
  let checkErrorMessage = document.querySelector('.error-message');
  if (checkErrorMessage) {
    checkErrorMessage.remove();
    newPassword.classList.remove("invalid")
    confirmedNewPassword.classList.remove("invalid")
    oldPassword.classList.remove("invalid")
  }
  // console.log(checkErrorMessage)
  // formDetail.removeChild(checkErrorMessage);


  if (oldPassword.value === "") {
    oldPassword.classList.add("invalid");
    errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Please enter a new password';
    oldPassword.parentNode.insertBefore(errorMessage, oldPassword.nextSibling);
    return;
  }

  if (confirmedNewPassword.value !== newPassword.value) {
    confirmedNewPassword.classList.add("invalid");
    console.log(errorMessage)
    errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Your confirmed password does not match your new password';
    confirmedNewPassword.parentNode.insertBefore(errorMessage, confirmedNewPassword.nextSibling);
    return;
  }

  if (newPassword.value === "") {
    newPassword.classList.add("invalid");
    errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Please enter your new password';
    newPassword.parentNode.insertBefore(errorMessage, newPassword.nextSibling);
    return;

  } else if (newPassword.value.length < 6) {
    newPassword.classList.add("invalid");

    errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Corfirm new password must have at least 6 characters';
    newPassword.parentNode.insertBefore(errorMessage, newPassword.nextSibling);
    return;

  } else if (!hasUppercase(newPassword.value)) {
    newPassword.classList.add("invalid")

    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Password must contain at least one word uppercase';
    newPassword.parentNode.insertBefore(errorMessage, newPassword.nextSibling);
    return;

  } else {
    const request = indexedDB.open(dbName);

    request.onerror = function (e) {
      console.log("Database error: " + e.target.errorCode)
    }

    request.onsuccess = function (e) {
      const db = e.target.result;
      const transaction = db.transaction("users", "readwrite");
      const store = transaction.objectStore("users");
      const emailIndex = store.index("email");
      const emailRequest = emailIndex.get(newUserInfo.email);

      emailRequest.onsuccess = function (e) {
        const user = e.target.result;
        if (user) {
          if (user.password === oldPassword.value) {

            // Change password in user object
            user.password = newPassword.value;

            // Save the updated user back into the store
            const putRequest = store.put(user);

            putRequest.onsuccess = () => {
              console.log("Password updated successfully");
              toast({
                title: "Thành công!",
                message: "Update Password sucessfully 😎 !",
                type: "success",
                duration: 5000
              });
            };

            putRequest.onerror = (event) => {
              console.error("Error updating user: ", event.target.error);
            };

          } else {
            oldPassword.classList.add("invalid");
            errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'Wrong password, try again!';
            oldPassword.parentNode.insertBefore(errorMessage, oldPassword.nextSibling);
            return;
          }
        } else {
          console.log("Wrong email, try again! 🥵")

        }
      }

      emailRequest.onerror = function (e) {
        console.log("Invalid account 🥵" + e.target.errorCode)
      }
    }
  }

  if (confirmedNewPassword.value === "") {
    console.log("Please enter your confirmed password")
    // formDetail.removeChild(errorMessage)
    confirmedNewPassword.classList.add("invalid");


    errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Confirmed password must not be empty';

    confirmedNewPassword.parentNode.insertBefore(errorMessage, confirmedNewPassword.nextSibling);
    return;

  } else if (confirmedNewPassword.value.length < 6) {

    confirmedNewPassword.classList.add("invalid");
    errorMessage = document.createElement('div');


    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Corfirm new password must have at least 6 characters';
    // if (errorMessage && errorMessage.classList.contains("error-message")) {
    //   formDetail.removeChild(errorMessage)
    // }
    confirmedNewPassword.parentNode.insertBefore(errorMessage, confirmedNewPassword.nextSibling);
    return;

  } else if (!hasUppercase(confirmedNewPassword.value)) {
    // formDetail.removeChild(errorMessage)
    confirmedNewPassword.classList.add("invalid")



    errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Password must contain at least one word uppercase';
    // if (errorMessage && errorMessage.classList.contains("error-message")) {
    //   formDetail.removeChild(errorMessage)
    // }
    confirmedNewPassword.parentNode.insertBefore(errorMessage, confirmedNewPassword.nextSibling);

  }
}

/** RENDER ORDERS */
window.onload = function () {
  const request = indexedDB.open(dbName);

  request.onerror = function (e) {
    console.log("Database error: " + e.target.errorCode)
  }

  request.onsuccess = function (e) {
    const db = e.target.result;
    const transaction = db.transaction("orders", "readonly");
    const store = transaction.objectStore("orders");
    const emailIndex = store.index("customerEmail");
    const emailRange = IDBKeyRange.only(userInfo.email);

    emailIndex.openCursor(emailRange).onsuccess = function (e) {
      const cursor = e.target.result;
      if (cursor) {
        listOrder.push(cursor.value);
        cursor.continue();
      } else {
        if (listOrder.length > 0) {
          let orderHTML = "";
          listOrder.forEach((item) => {
            orderHTML += `<div class="profile-content-three-middle-detail">
            <div class="profile-content-three-middle-detail-top">
              <div class="profile-content-three-middle-detail-top-left">
                <span>Order</span>
                <span>${item.id}</span>
              </div>
              <div class="profile-content-three-middle-detail-top-right">
                <span>Total: ${item.total}</span>
              </div>
            </div>
            <div class="profile-content-three-middle-detail-middle">
              <div class="profile-content-three-middle-detail-middle-first">
                <span>Product</span>
                <div class="product-container">
                  <img src=${item.items[0].img} alt="avatar-default" class="product-img">
                  <div class="product-content-container">
                    <p>${item.items[0].name}</p>
                    <p>Quanity: ${item.items[0].amount}</p>
                  </div>
                </div>
              </div>
              <div class="profile-content-three-middle-detail-middle-second">
                <span>Shipping Info</span>
                <div class="product-detail-container">
                  <p>${item.customerAddress}</p>
                  <p>${item.customerPhone}</p>
                </div>
              </div>
              <div class="profile-content-three-middle-detail-middle-third">
                <span>Package Status</span>
                <div class="product-status-container">
                  <span class="iconify Profile-order-box" data-icon="carbon:pending-filled"></span>
                  <span>${item.status}</span>
                </div>
              </div>
            </div>
          </div>`
          })

          document.querySelector(".profile-content-three-middle").innerHTML = orderHTML;
        } else {
          let orderHTML = "";
          orderHTML += `
            <div class="Orders-nothing-container">
              <img 
              src="/assets/images/nothing.gif"
              alt="Nothing-to-show"
              class="Cart-img-product-nothing"
              />
              <p style='text-align: center;'>You have not ordered anything yet! </p>
              <button class="btn-order-nothing" onclick="window.location.href ='Products.html'">Visit Shop</button>
            </div>
          `
          document.querySelector(".profile-content-three-middle").innerHTML = orderHTML;
        }
      }
    };
  }
}
