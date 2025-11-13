'use strict';

const productsList = document.querySelector('.js_products_list');

const searchBar = document.querySelector('.js_search_bar');
const searchButton = document.querySelector('.js_search_button');

const buyBasket = document.querySelector('.js_basket');

const buyButton = document.querySelector('.js_buy_button');
const eliminateButton =document.querySelector('.js_eliminate_button');



const apiURL = 'https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json';

let products = [];
let basket = [];

const renderBasket = () => {
  if(basket.length === 0) {
    buyBasket.innerHTML = `<h3 class="basket_title">Cesta</h3>
                            <p>Tu carrito está vacío</p>`;
    return;
  }

  let html = '<h3 class="basket_title">Cesta</h3>';

  for(const item of basket) {
    html += `<article class="basket_item">
              <image src="${item.image}" class="product_image_basket" alt="${item.title}/>
              <div class="basket_item_info">
                <p>${item.title}</p>
                <p>${item.price} €</p>
              </div>
            </article>`;
  }

  buyBasket.innerHTML = html;

}

function renderOneProduct(oneProduct) {
    const html = `<article class="product_card">
          <img class="product_image" src="${oneProduct.image}" alt="${oneProduct.title}">
          <p class="product_name">${oneProduct.title}</p>
          <p class="product_price">${oneProduct.price} €</p>
          <button class="buy_button js_buy_button">Comprar</button>
          <button class="eliminate_button js_eliminate_button hidden">Eliminar</button>
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


// ¡¡¡Desactivado hasta que podamos arreglar el aspecto de los productos 
// dentro de la cesta y podamos quitarlos de forma manual!!!
/*const basketFromLocalStorage = JSON.parse(localStorage.getItem('basketData'));
if (basketFromLocalStorage) {
  basket = basketFromLocalStorage;   
  renderBasket();
}*/

productsList.addEventListener('click', (ev) => {
  const button = ev.target.closest('.buy_button');
  

  if(!button) return;

  const article = button.closest('.product_card');
  const productName = article.querySelector('.product_name').textContent;
  const productPrice = article.querySelector('.product_price').textContent;
  const productImage = article.querySelector('.product_image').src;
  const buttonRemove = article.querySelector('.js_eliminate_button');

  const product = {
      title: productName,
      price: productPrice,
      image: productImage
    };

  basket.push(product);

  localStorage.setItem('basketData', JSON.stringify(basket));

  renderBasket();

  buttonRemove.classList.remove('hidden');
  button.classList.add('hidden');

});

