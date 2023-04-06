// save data to json file
let products = []
let listCart = [];
let filteredProducts = [];
//check localstorage
if (localStorage.getItem("listCart")) {
    listCart = JSON.parse(localStorage.getItem("listCart"));
}

const updateAmountLengthCart = () => {
    let amount = 0;
    listCart.forEach((item) => {
        amount += item.amount;
    })
    document.getElementById("number-cart").innerText = amount;
}
updateAmountLengthCart();

// Tải dữ liệu sản phẩm từ tệp JSON
fetch("/src/data/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        let filteredProducts = [...products];
        // Hiển thị toàn bộ danh sách sản phẩm khi trang web được tải lần đầu
        showFilteredProducts();
    });

// Lấy checkbox từ DOM
const checkAll = document.getElementById("check-all");
const checkFoods = document.getElementById("check-foods");
const checkAccessories = document.getElementById("check-accessories");
const checkToys = document.getElementById("check-toys");
const checkCage = document.getElementById("check-cage");
const checkEatingUtensils = document.getElementById("check-eating-utensils");
const checkCleaningTools = document.getElementById("check-cleaning-tools");

// Lấy phần tử HTML để hiển thị danh sách sản phẩm
const productList = document.querySelector(".products-center");

// Hàm hiển thị danh sách sản phẩm dựa trên checkbox được chọn
function showFilteredProducts() {
    // Reset current page to 1
    currentPage = 1;
    // Lấy giá trị của các checkbox được chọn
    const showAll = checkAll.checked;
    const showFoods = checkFoods.checked;
    const showAccessories = checkAccessories.checked;
    const showToys = checkToys.checked;
    const showCage = checkCage.checked;
    const showEatingUtensils = checkEatingUtensils.checked;
    const showCleaningTools = checkCleaningTools.checked;

    // Nếu checkbox "All" được chọn thì hiển thị toàn bộ danh sách sản phẩm
    if (showAll) {
        filteredProducts = products;
    } else {
        // Nếu checkbox "All" không được chọn thì hiển thị danh sách sản phẩm dựa trên các checkbox khác
        filteredProducts = products.filter(product => {
            if (showFoods && product.category === "foods") {
                return true;
            } else if (showAccessories && product.category === "accessories") {
                return true;
            } else if (showToys && product.category === "toys") {
                return true;
            } else if (showEatingUtensils && product.category === "eating utensils") {
                return true;
            } else if (showCleaningTools && product.category === "cleaning tools") {
                return true;
            } else if (showCage && product.category === "cage") {
                return true;
            }
        });
    }

    //sort by price 
    const sortPrice = document.getElementById("sort-price");
    const sortPriceValue = sortPrice.value;
    if (sortPriceValue === "Decrease") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    if (sortPriceValue === "Increase") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    //gan su kien cho sort price
    sortPrice.addEventListener("change", showFilteredProducts);

    //sort by sale
    const sortSold = document.getElementById("sort-sold");
    const sortSoldValue = sortSold.value;
    if (sortSoldValue === "Decrease") {
        filteredProducts.sort((a, b) => b.numOfProductsSold - a.numOfProductsSold);
    }
    if (sortSoldValue === "Increase") {
        filteredProducts.sort((a, b) => a.numOfProductsSold - b.numOfProductsSold);
    }
    sortSold.addEventListener("change", showFilteredProducts);

    //sort by rate 
    const sortRate = document.getElementById("sort-rate");
    const sortRateValue = sortRate.value;
    if (sortRateValue === "Excellent") {
        filteredProducts.filter(product => product.rate === 5);
    }
    if (sortRateValue === "Good") {
        filteredProducts.filter(product => product.rate === 4);
    }
    if (sortRateValue === "Fair") {
        filteredProducts.filter(product => product.rate === 3);
    }
    if (sortRateValue === "Uncertain") {
        filteredProducts.filter(product => product.rate === 2);
    }
    if (sortRateValue === "Poor") {
        filteredProducts.filter(product => product.rate === 1);
    }
    sortRate.addEventListener("change", showFilteredProducts);

    renderProducts();
}

const addDot = (price) => {
    const formattedPrice =
        price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
    return formattedPrice;
}

// Lắng nghe sự kiện click vào các checkbox
checkAll.addEventListener("change", showFilteredProducts);
checkFoods.addEventListener("change", showFilteredProducts);
checkAccessories.addEventListener("change", showFilteredProducts);
checkToys.addEventListener("change", showFilteredProducts);
checkCage.addEventListener("change", showFilteredProducts);
checkEatingUtensils.addEventListener("change", showFilteredProducts);
checkCleaningTools.addEventListener("change", showFilteredProducts);

const renderProducts = () => {
    let html = "";
    filteredProducts.forEach(product => {
        html += `
        <div data-id=${product._id
        } class="card-product" draggable="false">
            <div data-id=${product._id} class="productItem-container">
                <div class="product-sale">
                -
                <p>${product.sale}</p>
                % 
                </div>
                <img
              src="${product.img}"
              class="product-img-item"
              alt="${product.name}"
                 />
                <div class="item-info-first">
                    <div class="item-price-container">
                    <p class="item-title">${product.name}</p>
                    <div class="item-sold">
                        <div class="item-rating">
                            <span class="iconify" data-icon="mdi:star"></span>
                            <span class="iconify" data-icon="mdi:star"></span>
                            <span class="iconify" data-icon="mdi:star"></span>
                            <span class="iconify" data-icon="mdi:star"></span>
                            <span class="iconify" data-icon="mdi:star"></span>
                        </div>
                        <p class="item-sold-number">${product.numOfProductsSold} sold</p>
                    </div>
                    <div class="item-price-before-container">
                        <p class="price-before">${addDot(product.price)}</p>
                    </div>
                    <div class="item-price-after">
                        <p class="price-after">${addDot(
                        ((100 - product.sale) / 100) * parseInt(product.price)
                        )}</p>
                    </div>
                </div>
              
                <div class="item-icon-container">
                    <span
                        class="iconify footer-container-fifth-item-icon"
                        data-icon="icon-park-outline:like"
                    >
                    </span>
                </div>
            </div>
            <div class="quick-view-detail">
              <button onclick="addToCart(this, event)" class="btn-add-to-card">
                Add To Card
              </button>
            </div>
            </div>
        </div>
        `;
    });
    productList.innerHTML = html;
    // click vào sản phẩm để xem chi tiết
    const cardProduct = document.querySelectorAll(".productItem-container");
    cardProduct.forEach(card => {
        card.addEventListener("click", () => {
            const id = card.getAttribute("data-id");
            window.location.href = `./ProductDetail.html?id=${id}`;
        });
    });

}


/*** PRODUCTS PAGINATION */

// const productsPerPage = 3;
// let currentPage = 1;
// const productPagination = document.querySelector(".products-pagination");

// const renderProducts = () => {
//     const startIndex = (currentPage - 1) * productsPerPage;
//     const endIndex = startIndex + productsPerPage;
//     const productsPage = filteredProducts.slice(startIndex, endIndex);

//     let html = "";
//     productsPage.forEach(product => {
//         html += `
//             <div class="card-product" data-id="${product._id}">
//                 <div class="card-product-img-top">
//                     <img src="${product.img}" alt="" class="card-product-img">
//                     <span class="card-product-name">${product.name}</span>
//                 </div>
//                 <div class="card-product-bottom">
//                     <div class="card-product-price">
//                         <span class="card-product-price-before-discount">${addDot(product.price)}</span>
//                         <b class="card-product-price-discount">${addDot(((100 - product.sale) / 100) * product.price)}</b>
//                     </div>
//                     <div class="card-product-rate-detail">
//                         <div class="rating-star">
//                             <span class="iconify" data-icon="material-symbols:star-rounded"></span>
//                             <span class="iconify" data-icon="material-symbols:star-rounded"></span>
//                             <span class="iconify" data-icon="material-symbols:star-rounded"></span>
//                             <span class="iconify" data-icon="material-symbols:star-rounded"></span>
//                             <span class="iconify" data-icon="material-symbols:star-rounded"></span>
//                         </div>
//                     </div>
//                     <div class="card-product-sold">
//                         <span class="card-product-sold-number">${product.numOfProductsSold}</span>
//                         <span class="card-product-sold-text">Sold</span>
//                     </div>
//                 </div>
//                 <div class="card-product-discount">
//                     <img src="../../assets/imgs/Bookmark.png" alt="sale discount" class="product-discount-bookmark">
//                     <span class="card-product-discount-text">-${product.sale}%</span>
//                 </div>
//                 <div class="card-product-buy-now">
//                     <button class="card-product-buy-now-btn">
//                         View Detail <iconify-icon icon="material-symbols:shopping-cart-rounded"></iconify-icon>
//                     </button>
//                 </div>
//             </div>
//         `;
//     });
//     productList.innerHTML = html;
//     // click vào sản phẩm để xem chi tiết
//     const cardProduct = document.querySelectorAll(".card-product");
//     cardProduct.forEach(card => {
//         card.addEventListener("click", () => {
//             const id = card.getAttribute("data-id");
//             window.location.href = `./ProductDetail.html?id=${id}`;
//         });
//     });

//     renderPagination();
// }

// const renderPagination = () => {
//     productPagination.innerHTML = "";
//     const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//     const linksToShow = [];
//     const maxLinks = 6;
//     const halfMaxLinks = Math.floor(maxLinks / 2);
//     let firstLink = 1;
//     let lastLink = totalPages;


//     if (totalPages <= 1) {
//         return
//     }

//     if (totalPages > maxLinks) {
//         firstLink = Math.max(currentPage - halfMaxLinks, 1);
//         lastLink = Math.min(currentPage + halfMaxLinks, totalPages);

//         if (lastLink - firstLink < maxLinks - 2) {
//             if (currentPage < totalPages / 2) {
//                 lastLink = Math.min(lastLink + (maxLinks - (lastLink - firstLink + 1)), totalPages)
//             } else {
//                 firstLink = Math.max(firstLink - (maxLinks - (lastLink - firstLink + 1)), 1);
//             }
//         }

//         if (firstLink > 1) {
//             linksToShow.push(1);
//             if (firstLink > 2) {
//                 linksToShow.push("...");
//             }
//         }
//     }

//     for (let i = firstLink; i <= lastLink; i++) {
//         linksToShow.push(i);
//     }

//     if (lastLink < totalPages) {
//         if (lastLink < totalPages - 1) {
//             linksToShow.push("...");
//         }
//         linksToShow.push(totalPages);
//     }

//     for (const link in linksToShow) {
//         const pageLink = document.createproduct("a");
//         pageLink.href = "#";
//         pageLink.textContent = linksToShow[link];

//         if (linksToShow[link] === currentPage) {
//             pageLink.classList.add("active-page");
//         }

//         if (linksToShow[link] !== "...") {
//             pageLink.addEventListener("click", (e) => {
//                 e.preventDefault();
//                 currentPage = linksToShow[link];
//                 renderProducts();
//             })
//         } else {
//             pageLink.addEventListener("click", (e) => {
//                 e.preventDefault();
//                 currentPage = parseInt(linksToShow[parseInt(link)-1]) + 1
//                 renderProducts();
//             })
//         }

//         productPagination.appendChild(pageLink);
//     }

//     if (currentPage > 1 && currentPage < totalPages) {
//         document.getElementById("first-page").style.display = "flex";
//         document.getElementById("last-page").style.display = "flex";
//     } else if (currentPage === 1) {
//         document.getElementById("first-page").style.display = "none";
//         document.getElementById("last-page").style.display = "flex";

//     } else {
//         document.getElementById("last-page").style.display = "none";
//         document.getElementById("first-page").style.display = "flex";



//     }

// }

// // Go to the very first page
// const goToFirstPage = () => {
//     currentPage = 1;
//     renderProducts();
// }

// // Go to the last page
// const goToLastPage = () => {
//     currentPage = Math.ceil(filteredProducts.length / productsPerPage);
//     renderProducts();
// }

// document.querySelector("#first-page").addEventListener("click", goToFirstPage)
// document.querySelector("#last-page").addEventListener("click", goToLastPage)








