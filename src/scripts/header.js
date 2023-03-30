
// Thao tác với Menu ở dạng mobile
const headerContainer = document.querySelector('.header-container')
const menuIcon = document.querySelector('.header-container-menu-icon');
console.log(menuIcon)
const headerList = document.querySelector('.header-container-items');
const iconMenuIconDetail = document.querySelectorAll('.header-container-menu-icon svg')
const icon = document.querySelector('.header-button-icon-first');
const listLi = document.querySelectorAll('.header-list-detail')
const homeContainer=document.querySelector('body')
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

listLi.forEach((item) => {
    item.addEventListener('click', () => {
        listLi.forEach((item) => {
            item.classList.remove('header-list-detail-tab-active')
        })
        item.classList.add('header-list-detail-tab-active');
    })
})

// change when scroll
const changeBackground = () => {
    if (window.scrollY >= 66) {
        headerContainer.classList.add('header-active')
    } else {
        headerContainer.classList.remove('header-active')
    }
}

window.addEventListener("scroll", changeBackground)