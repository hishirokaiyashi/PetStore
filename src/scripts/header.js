
// Thao tác với Menu ở dạng mobile
const headerContainer = document.querySelector('.header-container')
const menuIcon = document.querySelector('.header-container-menu-icon');
const headerList = document.querySelector('.header-container-items');
const iconMenuIconDetail = document.querySelectorAll('.header-container-menu-icon svg')
const icon = document.querySelector('.header-button-icon-first');
const listLi = document.querySelectorAll('.header-list-detail')
const homeContainer = document.querySelector('body')
const avatar = document.querySelector(".header-button-avatar");

// Search section
const search = document.getElementById("icon-search-btn");
const searchBox = document.querySelector(".search-container-box");
const searchInput = document.getElementById('search-input');
const searchProductsContainer = document.querySelector('.search-products-container');

// Open || Close search popup
search.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target)) {
        if (searchBox.classList.contains('search-inactive')) {
            searchBox.classList.remove('search-inactive');
        } else {
            searchBox.classList.add('search-inactive');
        }
    }
})

let searchKeys;
let searchProducts;

// Tải dữ liệu sản phẩm từ tệp JSON
fetch("/src/data/products.json")
    .then(response => response.json())
    .then(data => {
        searchProducts = data;
        console.log(searchProducts)
    });

searchInput.addEventListener('input', (e) => {
    document.querySelector(".search-products-container").innerHTML = "";
    searchKeys = e.target.value.toLowerCase().trim();
    if (searchKeys !== "") {
        let searchItems = searchProducts.filter((product) => product.name.toLowerCase().includes(searchKeys))
        if (searchItems.length > 0) {
            let searchHTML = "";
            searchProductsContainer.style.overflowY="scroll";
            searchItems.forEach((item) => {
                searchHTML += `
                <a href="${'./ProductDetail.html?id=' + item._id}" class="search-product-item-container" title="${item.name}">
                    <div class="search-product-item-container-left">
                        <p class="search-product-item-name">
                            ${item.name}
                        </p>
                        <div class="search-product-item-price">
                            <p class="price-after-searching">
                                ${addDot(parseInt(item.price) - parseInt(item.price) * item.sale / 100)}
                            </p>
                            <p class="price-before-searching">
                                ${addDot(item.price)}
                            </p>
                        </div>
                    </div>
                    <img src="${item.img}" alt="${item.name}" class="search-product-img">
                </a>
                `;
            })
            document.querySelector(".search-products-container").innerHTML = searchHTML;
        } else {
            document.querySelector(".search-products-container").innerHTML = "";
            let searchHTML = "";
            searchHTML += `
                <p class="search-nothing">There is no product matching your keywords...</p>
            `
            searchProductsContainer.style.overflowY="hidden";
            document.querySelector(".search-products-container").innerHTML = searchHTML;

        }
    }
})

// Mobile icon
menuIcon.addEventListener('click', () => {
    const menu = document.querySelector('[data-icon="material-symbols:menu"]');
    const close = document.querySelector('[data-icon="mdi:alpha-x"]');
    if (menu) {
        menu.setAttribute('data-icon', 'mdi:alpha-x');
    }
    if (close) {
        close.setAttribute('data-icon', 'material-symbols:menu')
    }
    let checkHeaderList = headerList.classList.contains('header-container-items-active')
    if (checkHeaderList) {
        headerList.classList.remove('header-container-items-active');
        homeContainer.classList.remove('body-overflow')
    } else {
        headerList.classList.add('header-container-items-active');
        homeContainer.classList.add('body-overflow')
    }
});

// Display active navigation
const currentUrl = window.location.href;

window.onload = () => {
    listLi.forEach((item) => {
        item.classList.remove("header-list-detail-tab-active");
    })

    if (currentUrl.includes("Home.html")) {
        listLi[0].classList.add("header-list-detail-tab-active");
    }

    if (["Products.html", "ProductDetail.html"].some((term) => currentUrl.includes(term))) {
        listLi[1].classList.add("header-list-detail-tab-active");
    }

    if (currentUrl.includes("AboutUs.html")) {
        listLi[2].classList.add("header-list-detail-tab-active");
    }
};


// Change size of navigation bar when scrolling
const changeBackground = () => {
    if (window.scrollY >= 66) {
        headerContainer.classList.add('header-active')
    } else {
        headerContainer.classList.remove('header-active')
    }
}

window.addEventListener("scroll", changeBackground)

// Handle login button click
const btnLogin = document.querySelector('.header-button-login');
btnLogin.addEventListener('click', () => {
    console.log('click')
    window.location.href = "SignIn.html";
})

// Hide login button when having user logged in
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (loggedInUser) {
    btnLogin.style.display = 'none';
    const userHeader = JSON.parse(localStorage.getItem("loggedInUser"));
    avatar.src = userHeader.avatar ? userHeader.avatar : "/assets/images/avatar-default.jpg";
} else {
    avatar.style.display = 'none';
}

// User menu dropdown
function dropdownFunction() {
    console.log('click')
    document.getElementById("dropdownUser").classList.toggle("show");
}

avatar.addEventListener('click', dropdownFunction)

// Hide dropdown menu when clicking outside
window.onclick = function (event) {
    if (!event.target.matches('.header-button-avatar')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Handle logout
const btnLogout = document.getElementById("logoutDropdown");
btnLogout.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('listCart');
    window.location.href = "Home.html";
})

// Handle profile edit
const btnProfile = document.getElementById("profileDropdown");
btnProfile.addEventListener('click', () => {
    console.log('click')
    window.location.href = "Profile.html";
})

// Display helpcenter section when having user logged in 
const btnHelpCenter = document.getElementById("btn-help-center");
if (btnHelpCenter) {
    btnHelpCenter.addEventListener('click', () => {
        if (!loggedInUser) {
            window.location.href = "SignIn.html";
        } else {
            window.location.href = "HelpCenter.html";
        }
    })
}
// Add dot to the price number => string
const addDot = (price) => {
    const formattedPrice =
      price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
    return formattedPrice;
  }
  
  // Remove dot to the price string => number
  const removeDot = (price) => {
    const unFormattedPrice = price.replace(".", "").replace("đ", "").trim();
    return parseInt(unFormattedPrice);
  }
