const API = 'https://raw.githubusercontent.com/paradoxalyty/online-store-api-example/master/responses';

const app = new Vue({
    el: '#root',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'http://placehold.it/200x150',
        inputSearch: '',
        show: false,
        filtered: [],
        cartProducts: [],
        visible: true,
    },
    methods: {
        getJson(url){
            return fetch(`${API + url}`)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(product){
            console.log(product.product_id);
        },

        filterGoods(value) {
            let regexp = new RegExp (value, 'i');
            return this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.getJson(this.catalogUrl)
            .then(data => this.products = data)
            .then(data => this.filtered = data);
    }
});