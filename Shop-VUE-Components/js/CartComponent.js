Vue.component('cart', {
    data(){
        return {
            cartUrl: 'getBasket.json',
            showCart: false,
            cartItems: [],
            imgCart: 'https://placehold.it/50x60',
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson('addToBasket.json')
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
            this.$parent.getJson('deleteFromBasket.json')
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
    },
    mounted(){
        this.$parent.getJson(this.cartUrl)
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
                        <button id="clearCart" class="btn btnClear">clear all</button>
                        <button @click="showCart = !showCart" id="closeCart" class="btn btnClose">close</button>
                    </div>
                </div>
            </div>`
});

Vue.component('cart-item', {
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
});