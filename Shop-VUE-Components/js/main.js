const API = 'https://raw.githubusercontent.com/paradoxalyty/online-store-api-example/master/responses/';

const app = new Vue({
        el: '#root',
        methods: {
            getJson(url) {
                return fetch(`${API + url}`)
                    .then(result => result.json())
                    .catch(error => this.$refs.error.setText(error))
            },
        },
    });