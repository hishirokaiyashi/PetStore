// save data to json file
let products = []

// Tải dữ liệu sản phẩm từ tệp JSON
fetch("/src/data/products.json")
  .then(response => response.json())
  .then(data => {
    products = data;
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
    let filteredProducts = [];

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

    // Hiển thị danh sách sản phẩm
    let html = "";
    filteredProducts.forEach(product => {
        html += `
            <div class="card-product" data-id="${product._id}">
                <div class="card-product-img-top">
                    <img src="${product.img}" alt="" class="card-product-img">
                    <span class="card-product-name">${product.name}</span>
                </div>
                <div class="card-product-bottom">
                    <div class="card-product-price">
                        <span class="card-product-price-before-discount"><sup>$</sup>${product.price}</span>
                        <b class="card-product-price-discount"><sup>$</sup>${((100 - product.sale) / 100) * product.price}</b>
                    </div>
                    <div class="card-product-rate-detail">
                        <div class="rating-star">
                            <span class="iconify" data-icon="material-symbols:star-rounded"></span>
                            <span class="iconify" data-icon="material-symbols:star-rounded"></span>
                            <span class="iconify" data-icon="material-symbols:star-rounded"></span>
                            <span class="iconify" data-icon="material-symbols:star-rounded"></span>
                            <span class="iconify" data-icon="material-symbols:star-rounded"></span>
                        </div>
                    </div>
                    <div class="card-product-sold">
                        <span class="card-product-sold-number">${product.numOfProductsSold}</span>
                        <span class="card-product-sold-text">Sold</span>
                    </div>
                </div>
                <div class="card-product-discount">
                    <img src="../../assets/imgs/Bookmark.png" alt="sale discount" class="product-discount-bookmark">
                    <span class="card-product-discount-text">-${product.sale}%</span>
                </div>
                <div class="card-product-buy-now">
                    <button class="card-product-buy-now-btn">
                        Buy now <iconify-icon icon="material-symbols:shopping-cart-rounded"></iconify-icon>
                    </button>
                </div>
            </div>
        `;
    });
    productList.innerHTML = html;
    // click vào sản phẩm để xem chi tiết
    const cardProduct = document.querySelectorAll(".card-product");
    cardProduct.forEach(card => {
        card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        window.location.href = `./ProductDetail.html?id=${id}`;
        });
    });
}

// Lắng nghe sự kiện click vào các checkbox
checkAll.addEventListener("change", showFilteredProducts);
checkFoods.addEventListener("change", showFilteredProducts);
checkAccessories.addEventListener("change", showFilteredProducts);
checkToys.addEventListener("change", showFilteredProducts);
checkCage.addEventListener("change", showFilteredProducts);
checkEatingUtensils.addEventListener("change", showFilteredProducts);
checkCleaningTools.addEventListener("change", showFilteredProducts);










