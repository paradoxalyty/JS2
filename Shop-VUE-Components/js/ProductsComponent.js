Vue.component('products', {
    data(){
        return {
            catalogUrl: 'catalogData.json',
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            filtered: [],
        }
    },
    methods: {
        filterGoods() {
            let regexp = new RegExp(this.inputSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(this.catalogUrl)
            .then(data => this.products = data)
            .then(data => this.filtered = data);
    },
    template: `
        <div class="products">
            <product 
            v-for="product of filtered"
            :key="product.product_id"
            :product="product"
            :img="imgCatalog"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
/*    data() {
        return {
            /!**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             *!/
            cartAPI: this.$root.$refs.cart, // добираемся до компонента корзины, чтобы далее использовать метод добавления
        };
    },*/

    template: `
        <div class="product-item">
            <img :src="img" :alt="product.product_name">
            <div class="desc">
                <h3>{{ product.product_name }}</h3>
                <p>{{ product.price }}</p>
                <button class=" btn buy-btn" @click="$root.$refs.cart.addProduct(product)">add to cart</button>
                <!--<button class=" btn buy-btn" @click="$parent.$emit('add-product', product)">add to cart</button>-->
            </div>
        </div>
    `
});
