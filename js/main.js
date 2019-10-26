/*-------------------------------------CART open/close---------------------------------------------------------*/

let modal = document.getElementById("modal");
let btnOpen = document.getElementById("openCart");
let btnClose = document.querySelector(".close");
/*let count = document.querySelector("b");*/

btnOpen.addEventListener("click", function () {
    if (modal.style.display === "block") {
        modal.classList.remove("swing-in-top-fwd");
        modal.classList.add("swing-out-top-bck");
        setTimeout(function () {
            modal.style.display = "none";
        }, 250);
    } else {
        modal.classList.remove("swing-out-top-bck");
        modal.classList.add("swing-in-top-fwd");
        setTimeout(function () {
            modal.style.display = "block";
        }, 250);
    }
});

btnClose.addEventListener("click", function () {
    modal.classList.remove("swing-in-top-fwd");
    modal.classList.add("swing-out-top-bck");
    setTimeout(function () {
        modal.style.display = "none";
    }, 1000);
});
/*--------------------------------------CART open/close---------------------------------------------------------*/





/*-----------------------------------------------CATALOG--------------------------------------------------------*/
const products = [
  {id: 1, title: 'Notebook', price: 20000},
  {id: 2, title: 'Mouse', price: 1500},
  {id: 3, title: 'Keyboard', price: 5000},
  {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title = "some product", price) => {
  return `<div class="product-item">
            <h3>${title}</h3>
            <p>${price}</p>
          </div>`;
};

const renderProducts = goodsList => {
  document.querySelector('.products').innerHTML = goodsList.map(good => renderProduct(good.title, good.price)).join('');
};

renderProducts(products);
