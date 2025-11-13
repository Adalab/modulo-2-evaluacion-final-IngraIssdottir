const a=document.querySelector(".js_products_list"),_=document.querySelector(".js_search_bar"),b=document.querySelector(".js_search_button"),h=document.querySelector(".js_basket"),f="https://fakestoreapi.com/products";let s=[],o=[];const i=()=>{let t='<h3 class="basket_title">Cesta</h3>';for(const e of o)t+=`<article class="basket_item">
              <image src="${e.image}" class="product_image_basket" alt="${e.title}/>
              <div class="basket_item_info">
                <p>${e.title}</p>
                <p>${e.price} €</p>
              </div>
            </article>`;h.innerHTML=t};function g(t){return`<article class="product_card">
          <img class="product_image" src="${t.image}" alt="${t.title}">
          <p class="product_name">${t.title}</p>
          <p class="product_price">${t.price} €</p>
          <button class="buy_button js_buy_button">Comprar</button>
          <button class="eliminate_button js_eliminate_button hidden">Eliminar</button>
        </article>`}function r(t){let e="";for(const c of t)e+=g(c);a.innerHTML=e}b.addEventListener("click",()=>{const t=_.value.toLowerCase();if(t===""){r(s);return}const e=s.filter(c=>c.title.toLowerCase().includes(t));r(e)});fetch(f).then(function(t){return t.json()}).then(function(t){console.log(t),s=t,localStorage.setItem("productsBackup",JSON.stringify(s)),r(s)});const n=JSON.parse(localStorage.getItem("basketData"));n&&(o=n,i());a.addEventListener("click",t=>{const e=t.target.closest(".buy_button");if(!e)return;const c=e.closest(".product_card"),l=c.querySelector(".product_name").textContent,u=c.querySelector(".product_price").textContent,d=c.querySelector(".product_image").src,p=c.querySelector(".js_eliminate_button"),m={title:l,price:u,image:d};o.push(m),localStorage.setItem("basketData",JSON.stringify(o)),i(),p.classList.remove("hidden"),e.classList.add("hidden")});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzsifQ==
