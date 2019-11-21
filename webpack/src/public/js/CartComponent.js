const cartItem = {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" class="cartItemImage" alt="product image">
                        <div class="product-desc">
                            <h3 class="product-name">{{cartItem.product_name}}</h3>
                            <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                            <p class="product-price">{{cartItem.price}} &curren; each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-total-price">{{cartItem.quantity*cartItem.price}}₽</p>
                        <button class="removeFromCart" @click="$emit('remove', cartItem)">&#128465;</button>
                    </div>
                </div>
    `
};

export const cart = {
    data(){
        return {
            cartUrl: 'getBasket.json',
            showCart: false,
            cartItems: [],
            imgCart: 'https://placehold.it/50x60',
        }
    },

    components: {
        'cart-item': cartItem
    },

    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.product_id === product.product_id);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.product_id}`, {quantity: 1})
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                            this.updateCounter();
                        }
                    });
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result) {
                            this.cartItems.push(prod);
                            this.updateCounter();
                        }
                    });
            }
        },

        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.product_id}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                            this.updateCounter();
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${product.product_id}`)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    });
                this.updateCounter();
            }
        },

        /**
         * Подсчет количества всех товаров в корзине.
         * @returns {*|number}
         */
        calcQuantity() {
            return this.cartItems.reduce((accum, item) => accum += item.quantity, 0);
        },

        /**
         * Метод динамически обновляет количество товаров корзины на кнопке CART.
         */
        updateCounter() {
            document.querySelector('.counter').textContent = `${this.calcQuantity()}`;
        },

        /**
         * Метод удаляет все товары корзины при клике на кнопке CLEAR ALL.
         */
        clearCart() {
            this.cartItems.splice(0);
            this.updateCounter();
        }
    },

    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },

    template: `
            <div>
                <button class="btn btnCart" @click="showCart = !showCart" type="button">Open Cart (<b class="counter">0</b>)</button>
                <div v-show="showCart" id="cartBody" class="modalWindow">
                    <div id="cartContent" class="cartMain">
                    
                        <cart-item class="cart-item" 
                        v-for="item of cartItems" 
                        :key="item.product_id"
                        :cart-item="item" 
                        :img="imgCart"
                        @remove="remove">
                        </cart-item>
                    </div>
                    <p class="message" v-if="!cartItems.length">Cart is empty</p>
                    <div class="cartFooter">
                        <button @click="clearCart()" class="btn btnClear">clear all</button>
                        <button @click="showCart = !showCart" id="closeCart" class="btn btnClose">close</button>
                    </div>
                </div>
            </div>`
};