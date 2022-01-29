import "bootstrap/dist/css/bootstrap.min.css"
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import Toast from "vue-toastification";

import { createApp } from 'vue'
import App from './App.vue'


const options = {
    // You can set your default options here
    position: "top-center",
};

const app = createApp(App).use(Toast, options);

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"