export const error = {
    data(){
        return {
            text: ''
        }
    },

    methods: {
        setText(value) {
            this.text = value;
        }
    },

    template: `
        <div class="error" v-if="text">
            <p class="error-message">
            <button class="close-btn" @click="setText('')">&times;</button>
            {{ text }}
            </p>
        </div>
    `
};