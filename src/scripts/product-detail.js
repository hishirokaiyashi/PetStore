// lấy id của sản phẩm từ query string
const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);

//fetch data từ file product JSON
fetch("/src/data/products.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // tìm kiếm sản phẩm theo id
    const product = data.find(product => product._id === productId)
    if (product) {
    console.log(product);
    // nếu sản phẩm tồn tại, hiển thị thông tin sản phẩm
    const productImage = document.querySelector(".product-img");
    productImage.src = product.img;
    productImage.alt = product.name;
    const productName = document.querySelector(".product-name");
    productName.textContent = product.name ;
    const productRating = document.querySelector(".product-rating-number");
    productRating.textContent = product.rate + "/5";
    const productSold = document.querySelector(".product-sold-amount");
    productSold.textContent = product.numOfProductsSold;
    const productPriceBeforeDiscount = document.querySelector(".product-price-before-discount");
    productPriceBeforeDiscount.textContent = "$" +  product.price ;
    const productPriceAfterDiscount = document.querySelector(".product-price-after-discount");
    productPriceAfterDiscount.textContent = "$" +  ((100 - product.sale) / 100) * product.price ;
    const productDiscount = document.querySelector(".product-discount");
    productDiscount.textContent = "-" + product.sale + "%";
    const productName2 = document.querySelector(".product-detail-information-overview-product-name");
    productName2.textContent = product.name ;
    const productCategory = document.querySelector(".product-detail-information-overview-product-category");
    productCategory.textContent = product.category ;
    } else {
      // nếu sản phẩm không tồn tại, hiển thị thông báo lỗi
      console.error(`Không tìm thấy sản phẩm có id là ${productId}`);
    }
  })
  .catch(error => {
    console.error("Đã xảy ra lỗi khi fetch data từ file JSON: ", error);
  });

// fetch data từ file product details JSON
fetch("/src/data/product-details.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // tìm kiếm sản phẩm theo id
    const productInfo = data.find(product => product.product === productId)
    if (productInfo) {
    console.log(productInfo);
    // nếu sản phẩm tồn tại, hiển thị thông tin sản phẩm
    const productStock = document.querySelector(".product-detail-information-overview-product-stock");
    productStock.textContent = productInfo.numOfProductsInStock;
    const productDescription = document.querySelector(".product-detail-information-overview-product-description");
    productDescription.textContent = productInfo.description;
    const productRate = document.querySelector(".product-detail-rating-number");
    productRate.textContent = productInfo.numOfRate + "/5" + "  |  ";
    const productReview = document.querySelector(".product-detail-review-number");
    productReview.textContent = productInfo.numOfProductsReview + " reviews";
    } else {
      // nếu sản phẩm không tồn tại, hiển thị thông báo lỗi
      console.error(`Không tìm thấy sản phẩm có id là ${productId}`);
    }
  })
  .catch(error => {
    console.error("Đã xảy ra lỗi khi fetch data từ file JSON: ", error);
  });


//related products
fetch("/src/data/products.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // tìm kiếm sản phẩm theo id
    const relatedProducts = data.filter(product => product.category && product._id !== productId)
    if (relatedProducts) {
    console.log(relatedProducts);
    // nếu sản phẩm tồn tại, hiển thị thông tin sản phẩm
    const relatedProductsContainer = document.querySelector(".related-product");
    relatedProductsContainer.innerHTML = relatedProducts.map(product => {
      return `
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
      `
    }).join("");
    } else {
      // nếu sản phẩm không tồn tại, hiển thị thông báo lỗi
      console.error(`Không tìm thấy sản phẩm có id là ${productId}`);
    }
  })

  //increase and decrease quantity
  const decreaseQuantity = document.querySelector(".product-order-amount-input-button-decrease");
  const increaseQuantity = document.querySelector(".product-order-amount-input-button-increase");
  const quantity = document.querySelector(".product-order-amount-input-text");
  let quantityValue = 1;
  decreaseQuantity.addEventListener("click", () => {
    if (quantityValue > 1) {
      quantityValue--;
      quantity.value = quantityValue;
    }
  });
  increaseQuantity.addEventListener("click", () => {
    quantityValue++;
    quantity.value = quantityValue;
  });

  //add to cart
  const addToCartButton = document.querySelector(".product-order-button-add-to-cart");
  addToCartButton.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = {
      id: productId,
      quantity: quantityValue,
    };
    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart) {
      productInCart.quantity += product.quantity;
    } else {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm sản phẩm vào giỏ hàng");
  });