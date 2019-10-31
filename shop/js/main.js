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
class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this.init();
    }

    init() {
        this._fetchProducts();
        this._render();
    }

    _fetchProducts() {
        this.data = [
            {id: 1, title: 'Notebook', price: 40000},
            {id: 2, title: 'Mouse', price: 1000},
            {id: 3, title: 'Keyboard', price: 2500},
            {id: 4, title: 'Gamepad', price: 1500},
        ];
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let item of this.data) {
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="${this.title}">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} &curren;</p>
                    <button class=" btn buy-btn">add to cart</button>
                </div>
            </div>`;
    }
}

const catalog = new ProductList();

class Cart {
    constructor() {

    }
    init(){}
    render(){}
    totalCartPrice(){}
    clearCart(){}
}

class CartItem {
    constructor() {

    }
    totalQuantity(){}
    totalPrice(){}
    addToCart(){}
    removeFromCart(){}
}
