
// Thao tác với Menu ở dạng mobile
const headerContainer = document.querySelector('.header-container')
const menuIcon = document.querySelector('.header-container-menu-icon');
const headerList = document.querySelector('.header-container-items');
const iconMenuIconDetail = document.querySelectorAll('.header-container-menu-icon svg')
const icon = document.querySelector('.header-button-icon-first');
const listLi = document.querySelectorAll('.header-list-detail')
const homeContainer = document.querySelector('body')
const avatar = document.querySelector(".header-button-avatar");

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
// change when scroll
const changeBackground = () => {
    if (window.scrollY >= 66) {
        headerContainer.classList.add('header-active')
    } else {
        headerContainer.classList.remove('header-active')
    }
}

window.addEventListener("scroll", changeBackground)

const btnLogin = document.querySelector('.header-button-login');
btnLogin.addEventListener('click', () => {
    console.log('click')
    window.location.href = "SignIn.html";
})

//display none login when have loggedInUser
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
// if (loggedInUser) {
//     btnLogin.style.display = 'none';
// }

//show avatar when have loggedInUser
if (loggedInUser) {
    btnLogin.style.display = 'none';
    const userHeader = JSON.parse(localStorage.getItem("loggedInUser"));
    avatar.src = userHeader.avatar ? userHeader.avatar : "/assets/images/avatar-default.jpg" ;
} else{
    avatar.style.display = 'none';
}
//dropdown avatar

function dropdownFunction() {
    console.log('click')
    document.getElementById("dropdownUser").classList.toggle("show");
}

avatar.addEventListener('click', dropdownFunction)

//close dropdown when click outside
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

//logout
const btnLogout = document.getElementById("logoutDropdown");
btnLogout.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('listCart');
    window.location.href = "Home.html";
})

//profile
const btnProfile = document.getElementById("profileDropdown");
btnProfile.addEventListener('click', () => {
    console.log('click')
    window.location.href = "Profile.html";

    // window.location.pathname = "/src/pages/Profile.html";
})

//helpcenter is private page 
const btnHelpCenter = document.getElementById("btn-help-center");
if(btnHelpCenter){
    btnHelpCenter.addEventListener('click', () => {
        if (!loggedInUser) {
            window.location.href = "SignIn.html";
        } else {
            window.location.href = "HelpCenter.html";
        }
    })
}
