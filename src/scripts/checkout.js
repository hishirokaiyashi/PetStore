// DbName in indexedDB
const dbName = "PetStore";

// Valiables
const buttonCheckout = document.getElementById("checkout-btn");

// Carts
let dataProduct = JSON.parse(sessionStorage.getItem("checkout-product")) || [];
let dataCounpon = JSON.parse(sessionStorage.getItem("coupon-data")) || null;
let listCart = JSON.parse(localStorage.getItem("listCart")) || [];


if (dataProduct.length == 0) {
    document.body.remove();
} else {
    // provinces
    let provinceId = document.getElementById("province-id");
    let provinceItem = "";
    const fetchDataProvinces = async () => {
        const responseProvince = await fetch("https://provinces.open-api.vn/api/?depth=1")
        let dataProvinces = await responseProvince.json();
        dataProvinces.forEach((province) => {
            provinceItem +=
                `
                <option value="${province.name}">${province.name}</option>
            `
        })
        provinceId.innerHTML = provinceItem;

    }
    fetchDataProvinces();

    // Cart    
    const updateAmountLengthCart = () => {
        let amount = 0;
        listCart.forEach((item) => {
            amount += item.amount;
        })
        document.getElementById("number-cart").innerText = amount;
    }
    updateAmountLengthCart()
    function addDot(price) {
        const formattedPrice =
            price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
        return formattedPrice;
    }

    function removeDot(price) {
        const unFormattedPrice = price.replace(".", "").replace("đ", "").trim();
        return parseInt(unFormattedPrice);
    }

    // data
    let dataCarts = ""
    dataProduct.forEach((item) => {
        dataCarts += `
        <div class="Checkout-payment-product-middle-detail">
        <img
          src="${item.img}"
          class="product-img-item"
          alt="${item.name}"
        />
        <div class="Checkout-payment-product-content-container">
          <p class="Checkout-payment-product-title">
             ${item.name}
          </p>
          <div class="Checkout-payment-product-amount-and-price">
            <p class="Checkout-payment-product-amount">
              x
              <span class="Checkout-payment-product-amout-number"
                >${item.amount}</span
              >
            </p>
            <span class="Checkout-payment-price">${addDot(item.price * item.amount)}</span>
          </div>
        </div>
      </div>
        `
    })
    document.querySelector(".Checkout-payment-product-middle").innerHTML = dataCarts;

    let total = 0;
    let coupon;
    let shipping = 30000;

    let totalFee = document.getElementById("total-fee");
    let shippingFee = document.getElementById("shipping-fee");
    let discountFee = document.getElementById("discount-fee");
    let totalPricefeeAll = document.getElementById("total-price-fee");
    let checkoutLength = document.getElementById("Checkout-payment-length");
    let totalCheckout = dataProduct.reduce((acc, cur) => acc + (cur.amount * cur.price), 0);
    checkoutLength.innerHTML = dataProduct.length
    totalFee.innerHTML = addDot(totalCheckout);
    shippingFee.innerHTML = addDot(shipping);
    if (dataCounpon) {
        coupon = dataCounpon.value;
    } else {
        coupon = 0;
    }
    discountFee.innerHTML = addDot(coupon);
    totalPricefeeAll.innerHTML = addDot(totalCheckout + shipping - coupon);

    // form
    let form = {
        fullName: "",
        province: "",
        address: "",
        email: "",
        phoneNumber: "",
    }

    //if have loggedInUser, auto fill form 
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    if (loggedInUser) {
        document.getElementById("fullName").value = loggedInUser.fullname ? loggedInUser.fullname : "";
        document.getElementById("province-id").value = loggedInUser.province;
        document.getElementById("Address").value = loggedInUser.address;
        document.getElementById("email").value = loggedInUser.email;
        document.getElementById("phoneNumber").value = loggedInUser.phoneNumber;
    }

    // Validate inputs
    function handleInput(item) {
        // if(item.id=="fullName") {
        //     form.fullName=item.value;
        // }
        // let inputFullName= document.getElementById("fullName");
        const regex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^0\d{9}$/;
        switch (item.id) {
            case "fullName":
                if (!regex.test(item.value)) {
                    form.fullName = item.value.trim();
                    document.querySelector("label[for='fullName']").innerHTML = "";
                } else {
                    document.querySelector("label[for='fullName']").innerHTML = "Invalid fullname, please try again!";
                }
                break;
            case "province-id":
                form.province = item.value;
                break;
            case "Address":
                if (item.value) {
                    form.fullName = item.value.trim();
                    document.querySelector("label[for='Address']").innerHTML = "";
                } else {
                    document.querySelector("label[for='Address']").innerHTML = "Invalid address, please try again!";
                }
                break;
            case "email":
                if (emailRegex.test(item.value)) {
                    form.email = item.value;
                    document.querySelector("label[for='email']").innerHTML = "";
                }
                else {
                    document.querySelector("label[for='email']").innerHTML = "Invalid email, please try again!";
                }
                break;
            case "phoneNumber":
                if (phoneRegex.test(item.value)) {
                    form.phoneNumber = item.value;
                    document.querySelector("label[for='phoneNumber']").innerHTML = "";
                }
                else {
                    document.querySelector("label[for='phoneNumber']").innerHTML = "Invalid phoneNumber, please try again!";
                }
                break;
        }
    }
}

// Checkout orders save in db

const removeDot = (price) => {
    const unFormattedPrice = price.replace(".", "").replace("đ", "").trim();
    return parseInt(unFormattedPrice);
}

const handleOrder = (e) => {
    e.preventDefault();

    const dbName = "PetStore";
    const storeName = "orders";

    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore(storeName, {
            keyPath: "id",
            autoIncrement: true,
        });
        objectStore.createIndex("customerEmail", "customerEmail", { unique: false });
    };

    request.onerror = function () {
        console.log("Error opening database");
    };

    request.onsuccess = function (event) {
        const db = event.target.result;

        const transaction = db.transaction(storeName, "readwrite");
        const objectStore = transaction.objectStore(storeName);

        const order = {
            customerId: loggedInUser.id,
            customerName: document.getElementById("fullName").value.trim(),
            customerAddress: document.getElementById("Address").value,
            customerProvince: document.getElementById("province-id").value,
            customerEmail: document.getElementById("email").value,
            customerPhone: document.getElementById("phoneNumber").value,
            items: dataProduct,
            total: document.getElementById("total-price-fee").innerHTML,
            timestamp: new Date().getTime(),
            status: "Pending",
            coupon: dataCounpon,
        };

        const addRequest = objectStore.add(order);

        addRequest.onsuccess = () => {
            console.log("Order added to IndexedDB", addRequest.result);
            sessionStorage.removeItem("checkout-product");


            const result = listCart.filter(obj1 => !dataProduct.some(obj2 => obj1.id === obj2.id));

            listCart = result;
            localStorage.setItem("listCart", JSON.stringify(result))
            const currentUserID = JSON.parse(localStorage.getItem("loggedInUser")).id || null;
            console.log(currentUserID)
            if (currentUserID) {
                updateCartDB(currentUserID, result)
            }
        }
        addRequest.onerror = (event) =>
            console.log(`Error adding order to IndexedDB: ${event.target.error}`);

        transaction.oncomplete = () => db.close();
    };
};


const updateCartDB = (id, cart) => {
    const request = indexedDB.open('PetStore');
    console.log(id, cart)

    request.onsuccess = (event) => {
        const db = event.target.result;

        // Access the object store containing user data
        const transaction = db.transaction(['users'], 'readwrite');
        const objectStore = transaction.objectStore('users');

        // Get the user object with the specified ID
        const getRequest = objectStore.get(id);
        getRequest.onsuccess = (event) => {
            const user = event.target.result;

            // Update the user's cart property
            user.cart = cart;

            // Put the updated user object back into the object store
            const putRequest = objectStore.put(user);
            putRequest.onsuccess = () => {
                console.log('User cart updated successfully');
                db.close();
            };
        };
    };

}


buttonCheckout.addEventListener("click", handleOrder);