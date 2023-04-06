// provinces


// carts
let dataProduct = JSON.parse(sessionStorage.getItem("checkout-product")) || [];
let dataCounpon = JSON.parse(sessionStorage.getItem("coupon-data")) || null;
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
    let listCart = JSON.parse(localStorage.getItem("listCart")) || [];
    console.log(listCart)
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
        document.getElementById("fullName").value = loggedInUser.lastName + " " + loggedInUser.firstName;
        document.getElementById("province-id").value = loggedInUser.province;
        document.getElementById("Address").value = loggedInUser.address;
        document.getElementById("email").value = loggedInUser.email;
        document.getElementById("phoneNumber").value = loggedInUser.phone;
    }
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
                if (!regex.test(item.value)) {
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
