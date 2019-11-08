const API = 'https://raw.githubusercontent.com/paradoxalyty/online-store-api-example/master/responses';

class List {
    constructor(url, container) {
        this.container = container;
        this.url = url;
        this.data = [];
        this.allProducts = [];
        this.filtered = [];
        this._init();
    }

    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    handleData(data) {
        this.data = [...data];
        this.render();
    }

    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    /**
     * Каким то удивительным образом метод reduce считает количество товаров в корзине....
     * @returns {number|*}
     */
    calcQuantity() {
        return this.allProducts.reduce((accum, item) => accum += item.quantity, 0);
    }

    getItem(id) {
        return this.allProducts.find(el => el.product_id === id);
    }

    render() {
        const block = document.querySelector(this.container);

        for (let item of this.data) {
            const prod = new lists[this.constructor.name](item);
            this.allProducts.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render());
        }
    }

    filter(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(el => regexp.test(el.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.product_id}"]`);
            if (this.filtered.includes(el)) {
                block.classList.remove('invisible');
            } else {
                block.classList.add('invisible');
            }
        })
    }

    _init() {
        return false;
    }
}

class Item {
    constructor(el, img = 'https://placehold.it/200x150') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.product_id = el.product_id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.product_id}">
                <img src="${this.img}" alt="${this.product_name}">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} &curren;</p>
                    <button class="btn addToCart" data-id="${this.product_id}">add to cart</button>
                </div>
            </div>`;
    }
}

class ProductsList extends List {
    constructor(cart, url = '/catalogData.json', container = '.products') {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('addToCart')) {
                let id = +e.target.dataset['id'];
                cart.addProduct(this.getItem(id));
            }
        });
        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector('.search-field').value);
        });
    }
}

class ProductItem extends Item {}

class Cart extends List {
    constructor(url = '/getBasket.json', container = '.cartMain') {
        super(url, container);
        this.cartBody = document.querySelector('#cartBody');
        this.btnOpenCart = document.querySelector('#openCart');
        this.btnCloseCart = document.querySelector('#closeCart');

        this.btnEventListeners();
        this.getJson()
            .then(data => this.handleData(data.contents));
    }

    addProduct(product) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result) {
                    let find = this.allProducts.find(el => el.product_id === product.product_id);
                    if (find) {
                        find.quantity++;
                        this._updateCart(find);
                        this._updateCounter();
                    } else {
                        let prod = Object.assign({quantity: 1}, product);
                        this.data = [prod];
                        this.render();
                        this._updateCounter();
                    }
                } else {
                    console.log('Error');
                }
            })
    }

    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result) {
                    let id = +element.dataset['id'];
                    let find = this.allProducts.find(el => el.product_id === id);
                    if (find.quantity > 1) {
                        find.quantity--;
                        this._updateCart(find);
                        this._updateCounter();
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${id}"]`).remove();
                        this._updateCounter();
                    }
                } else {
                    console.log('Error');
                }
            })
    }

    /**
     * обновляем количество элементов в корзине
     * @private
     */
    _updateCounter() {
        document.querySelector('.counter').textContent = `${this.calcQuantity()}`;
    }

    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.product_id}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
        block.querySelector('.product-total-price').textContent = `${product.quantity * product.price}`;
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('removeFromCart')) {
                this.removeProduct(e.target);
            }
        });
        /*
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        })
        */
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

class CartItem extends Item {
    constructor(el, img = 'https://placehold.it/50x60') {
        super(el, img);
        this.quantity = el.quantity;
    }

    render() {
        return `<div class="cart-item" data-id="${this.product_id}">
                    <div class="product-bio">
                        <img src="${this.img}" class="cartItemImage" alt="product image">
                        <div class="product-desc">
                            <h3 class="product-name">${this.product_name}</h3>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-price">${this.price} &curren; each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-total-price">${this.quantity * this.price}</p>
                        <button class="removeFromCart" data-id="${this.product_id}">&#128465;</button>
                    </div>
                </div>`;
    }
}

let lists = {
    ProductsList: ProductItem,
    Cart: CartItem
};

const cart = new Cart();
const products = new ProductsList(cart);