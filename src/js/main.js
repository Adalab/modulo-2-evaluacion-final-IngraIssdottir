'use strict';

const productsList = document.querySelector('.js_products_list');
const searchBar = document.querySelector('.js_search_bar');
const searchButton = document.querySelector('.js_search_button');

const apiURL = 'https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json';

let products = [];


function renderOneProduct(oneProduct) {
    const html = `<article class="product_card">
          <img class="product_image" src="${oneProduct.image}" alt="">
          <p class="product_name">${oneProduct.title}</p>
          <p class="Product_price">${oneProduct.price}</p>
          <button class="buy_button">Comprar</button>
        </article>`;

  return html;
}

function renderProducts(products) {
    let html = '';

    for( const oneProduct of products)  {
        html += renderOneProduct(oneProduct);
    }

    productsList.innerHTML = html;
}

searchButton.addEventListener('click', () => {
  const searchProduct = searchBar.value.toLowerCase();

  if (searchProduct === '') {
    renderProducts(products);

    return;
  }

  const filteredProducts = products.filter((oneProduct) => 
  oneProduct.title.toLowerCase().includes(searchProduct)
);

renderProducts(filteredProducts);

});

fetch(apiURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    products = data;

    localStorage.setItem( 'productsBackup' , JSON.stringify(products) );

    renderProducts(products);

});
