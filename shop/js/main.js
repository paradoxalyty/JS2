const API = 'https://raw.githubusercontent.com/paradoxalyty/online-store-api-example/master/responses';

function makeGETRequest(url) {
    return new Promise(((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        }
    }));
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this._fetchProducts()
            .then(() => {
                this._render();
            });
    }

    _fetchProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
                console.log(this.data);
            })
            .catch(error => console.log(error));
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let item of this.data) {
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }


    /*
        _countTotalPrice() {
            /!*let totalPrice = 0;
            this.allProducts.forEach(item => {
                totalPrice += item.price;
            });
            console.log(totalPrice);*!/
            let totalPrice = this.allProducts.reduce((accum, item) => accum += item.price, 0);
            console.log(totalPrice);
        }*/
}

const catalog = new ProductList();

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.product_id = product.product_id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.product_id}">
                <img src="${this.img}" alt="${this.product_name}">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} &curren;</p>
                    <button class="btn addToCart" 
                            data-id="${this.product_id}"
                            data-name="${this.product_name}"
                            data-image="${this.img}"
                            data-price="${this.price}">
                            add to cart</button>
                </div>
            </div>`;
    }
}

class Cart {
    constructor() {
        this.cartBody = document.querySelector('#cartBody');
        this.btnOpenCart = document.querySelector('#openCart');
        this.btnCloseCart = document.querySelector('#closeCart');

        this.btnEventListeners();

    }

    addToBasket() {
    }

    init() {
    }

    render() {
    }

    totalCartPrice() {
    }

    clearCart() {
    }

    btnEventListeners() {
        this.btnOpenCart.addEventListener('click', () => this.openCart());
        this.btnCloseCart.addEventListener('click', () => this.closeCart());
    }

    openCart() {
        if (this.cartBody.style.display === "block") {
            this.cartBody.classList.remove("swing-in-top-fwd");
            this.cartBody.classList.add("swing-out-top-bck");
            setTimeout(function () {
                this.cartBody.style.display = "none";
            }, 250);
        } else {
            this.cartBody.classList.remove("swing-out-top-bck");
            this.cartBody.classList.add("swing-in-top-fwd");
            setTimeout(function () {
                this.cartBody.style.display = "block";
            }, 250);
        }
    }

    closeCart() {
        this.cartBody.classList.remove("swing-in-top-fwd");
        this.cartBody.classList.add("swing-out-top-bck");
        setTimeout(function () {
            this.cartBody.style.display = "none";
        }, 1000);
    }
}

const cart = new Cart;

class CartItem {
    constructor() {
    }

    _init() {
    }

    totalQuantity() {
    }

    totalPrice() {
    }

    addToCart() {
    }

    removeFromCart() {
    }
}

const cartItem = new CartItem();


