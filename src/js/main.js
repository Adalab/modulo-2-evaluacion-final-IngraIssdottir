'use strict';

const productsList = document.querySelector('.js_products_list');

const searchBar = document.querySelector('.js_search_bar');
const searchButton = document.querySelector('.js_search_button');

const buyBasket = document.querySelector('.js_basket');



const apiURL = 'https://fakestoreapi.com/products';  //--> variable donde guardamos la url de nuestra Api que usaremos para llenar un array vaío, y con el pintar el contenido de la página.

let products = []; //--> Array vacío para almacenar los productos que traemos de la API
let basket = []; //--> Array vacío para almacenar los porductos que metemos en la cesta

const renderBasket = () => {  //-- función arrow  para pintar la cesta en la página.
  
  let html = '<h3 class="basket_title">Cesta</h3>';  //--> variable donde se van a pintar los productos cuando los añadamos

  for(const item of basket) { //--> por cada objeto del array (que le añadimos al hacer click a añadir), pintamos el producto en la cesta
    html += `<article class="basket_item">
              <image src="${item.image}" class="product_image_basket" alt="${item.title}/>
              <div class="basket_item_info">
                <p>${item.title}</p>
                <p>${item.price} €</p>
              </div>
            </article>`;
  }

  buyBasket.innerHTML = html; //--> Aquí le decimos que lo añada al html

}

function renderOneProduct(oneProduct) { //--> estructura html para añadir las tarjetas de los productos
    const html = `<article class="product_card">
          <img class="product_image" src="${oneProduct.image}" alt="${oneProduct.title}">
          <p class="product_name">${oneProduct.title}</p>
          <p class="product_price">${oneProduct.price} €</p>
          <button class="buy_button js_buy_button">Comprar</button>
          <button class="eliminate_button js_eliminate_button hidden">Eliminar</button>
        </article>`;

  return html; //--> finaliza la ejecución de la función, y nos devuelve la variable con la estructura html que vamos a pintar
}

function renderProducts(products) {  //-->función con un bucle para pintar todos los productos, que usaremos en el fetch, y en la búsqueda
    let html = '';

    for( const oneProduct of products)  { //--> bucle que recorre nuestros 20 productos para pintarlos con la función anterior
        html += renderOneProduct(oneProduct); 
    }

    productsList.innerHTML = html; 
}


searchButton.addEventListener('click', () => { //--> evento click sobre el botón de buscar
  const searchProduct = searchBar.value.toLowerCase(); //--> variable donde almacenamos el valos introducido en la barra de busqueda (el toLowerCase pasa las mayusculas a minúscula y así que filtre independientemente de si escribes en mayúscula o minúscula)

  if (searchProduct === '') {  //--> si el campo de búsqueda esta vacío, renderiza la lista entera
    renderProducts(products);

    return; 
  }

  const filteredProducts = products.filter((oneProduct) => //--> variable donde guardamos los prodcutos filtrados desde nuestro array de productos
  oneProduct.title.toLowerCase().includes(searchProduct) //--> aquí le decimos que busque en los "title" de los productos los que coincidan con la barra de busqueda
  );

  renderProducts(filteredProducts); //--> renderiza los porductos filtrados

});


fetch(apiURL) //--> llamada a la API para descargar los prodcutos
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    products = data; //--> Almaceno los productos en mi array 

    localStorage.setItem( 'productsBackup' , JSON.stringify(products) ); //--> Guardar en el local storage el listado entero de productos.

    renderProducts(products); //--> renderizar todos los productos desde el array en el html.

});



const basketFromLocalStorage = JSON.parse(localStorage.getItem('basketData')); //--> con esta variable guardamos los productos de la cesta en localStorage para que no se borren al recargar la página
if (basketFromLocalStorage) {
  basket = basketFromLocalStorage;   
  renderBasket();
}

productsList.addEventListener('click', (ev) => {   //--> El evento está en todo el listado, por eso se usa closest. El botón que detecte más cercano al click es en el que se va a ejecutar el evento.
  const button = ev.target.closest('.buy_button'); //--> seleccionamos el botón que esté más cerca de nuestro click
  

  if(!button) return;  //--> Si no se detecta el botón, no se ejecuta el evento, evita errores, y vuelve a empezar cuando se clickee de nuevo.

  const article = button.closest('.product_card');  //--> se selecciona la card del botón en el que hemos pulsado
  const productName = article.querySelector('.product_name').textContent;
  const productPrice = article.querySelector('.product_price').textContent;  //--> guarda nombre, precio, imagen, botón eliminar, de la card pulsada
  const productImage = article.querySelector('.product_image').src;
  const buttonRemove = article.querySelector('.js_eliminate_button');

  const product = { //--> crea el objeto con la información guardada de la card pulsada
      title: productName,
      price: productPrice,
      image: productImage
    };

  basket.push(product); //--> añade a nuestro areray de basket el objeto de la card que acabamos de pulsar

  localStorage.setItem('basketData', JSON.stringify(basket)); //--> guarda la carta seleccionada en localStorage para que no se elimine al recargar la página

  renderBasket(); //-->> vuelve a pintar la cesta con la card seleccionada

  buttonRemove.classList.remove('hidden'); //--> le quita la clase hidden al botón de eliminar
  button.classList.add('hidden'); //--> y se la pone al de comprar

});

