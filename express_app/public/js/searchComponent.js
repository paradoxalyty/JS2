Vue.component('search', {
   data() {
       return {
           inputSearch: '',
       }
   },

    methods: {
        filterGoods() {
            let regexp = new RegExp(this.inputSearch, 'i');
            this.$root.$refs.products.filtered = this.$root.$refs.products.products.filter(el => regexp.test(el.product_name));
        }
    },

    template: `
        <form action="#" method="post" class="search-form" @submit.prevent="filterGoods">
            <label>
                <input type="text" class="search-field"  v-model="inputSearch">
                <input type="submit" value="">
            </label>
        </form>
    `
});