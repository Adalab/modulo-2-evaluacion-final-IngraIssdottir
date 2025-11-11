'use strict';

const productsList = document.querySelector('.js_products_list');

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


fetch(apiURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    products = data;

    localStorage.setItem( 'productsBackup' , JSON.stringify(products) );
    localStorage.setItem('nombre' , 'ingra');
    renderProducts(products);

});
