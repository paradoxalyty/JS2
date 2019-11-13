const API = 'https://raw.githubusercontent.com/paradoxalyty/online-store-api-example/master/responses/';

const app = new Vue({
        el: '#root',
        data: {},
        methods: {
            getJson(url) {
                return fetch(`${API + url}`)
                    .then(result => result.json())
                    .catch(error => console.log(error))
            },
        },
    });