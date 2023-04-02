//fetch data from json file
function getProducts() {
    return fetch('../data/products.json')
    .then((res)=>res.json())
    .then((data)=> {console.log(data)})
}

getProducts();

//display products
function displayProducts(products) {
    const productsDOM = document.querySelector('.products-center');
    let result = '';
    products.forEach((product) => {
        result += `
        <div class="product">
            <div class="img-container">
                <img src=${product.image} alt="product" class="product-img">
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    add to bag
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
        </div>
        `
    });
    productsDOM.innerHTML = result;
    
}

displayProducts(data);