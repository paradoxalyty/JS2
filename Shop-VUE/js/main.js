const API = 'https://raw.githubusercontent.com/paradoxalyty/online-store-api-example/master/responses/';

const app = new Vue({
        el: '#root',
        data: {
            catalogUrl: 'catalogData.json',
            cartUrl: 'getBasket.json',
            products: [],
            imgCatalog: 'http://placehold.it/200x150',
            inputSearch: '',
            showCart: false,
            filtered: [],
            cartItems: [],
            imgCart: 'http://placehold.it/50x60',
            animation: true,
        },
        methods: {
            cartVisibility() {
                this.showCart = !this.showCart;
            },
            cartAnimation() {
                this.animation = !this.animation;
            },
            cartVisibilityHandler() {
                this.cartAnimation();
                setTimeout(()=>{
                    this.cartVisibility()
                },500);
            },
            getJson(url) {
                return fetch(`${API + url}`)
                    .then(result => result.json())
                    .catch(error => console.log(error))
            },
            addProduct(product) {
                this.getJson('addToBasket.json')
                    .then(data => {
                        if (data.result) {
                            let find = this.cartItems.find(el => el.product_id === product.product_id);
                            if (find) {
                                find.quantity++;
                            } else {
                                let prod = Object.assign({quantity: 1}, product);
                                this.cartItems.push(prod);
                            }
                        } else {
                            console.log('error');
                        }
                    })
            },
            remove(product) {
                this.getJson('deleteFromBasket.json')
                    .then(data => {
                        if (data.result) {
                            if (product.quantity > 1) {
                                product.quantity--;
                            } else {
                                this.cartItems.splice(this.cartItems.indexOf(product), 1);
                            }
                        } else {
                            console.log('error');
                        }
                    })
            },

            filterGoods() {
                let regexp = new RegExp(this.inputSearch, 'i');
                this.filtered = this.products.filter(el => regexp.test(el.product_name));
            }
        },
        mounted() {
            this.getJson(this.catalogUrl)
                .then(data => this.products = data)
                .then(data => this.filtered = data);
            this.getJson(this.cartUrl)
                .then(data => {
                    for (let el of data.contents) {
                        this.cartItems.push(el);
                    }
                });
        }
    })
;