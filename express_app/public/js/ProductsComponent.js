Vue.component('products', {
    data(){
        return {
            catalogUrl: 'catalogData.json',
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            filtered: [],
        }
    },

    mounted(){
        this.$parent.getJson(`/api/products`)
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
