let listCart = [];

// Get cart items from localstorage
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