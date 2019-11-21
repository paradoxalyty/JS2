export const search = {
   data() {
       return {
           inputSearch: '',
       }
   },

    template: `
        <form action="#" method="post" class="search-form" @submit.prevent="$root.$refs.products.filterGoods(inputSearch)">
            <label>
                <input type="text" class="search-field"  v-model="inputSearch">
                <input type="submit" value="">
            </label>
        </form>
    `
};