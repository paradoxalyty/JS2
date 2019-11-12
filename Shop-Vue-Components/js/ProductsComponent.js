Vue.component('products', {
    data(){
        return{
            catalogUrl: `catalogData.json`,
            products: [],
            imgCatalog: `http://placehold.it/200x150`,
            filtered: [],
        }
    },

    template: ` <div class="products">
                    <product
                        v-for="product of products"
                        :key="product.product_id"
                        :product="product"
                        :img="img">
                    </product>
                </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: ` <div class="product-item">
                    <img :src="img" alt="product.product_name">
                    <div class="desc">
                        <h3>{{ product.product_name}}</h3>
                        <p>{{ product.price }}</p>
                        <button class="btn buy-btn" @click="$parent.$emit('add-product', product)">add to cart</button>
                    </div>
                </div>`
});