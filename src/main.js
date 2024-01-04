import { createApp } from 'vue'
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import {createRouter, createWebHistory} from "vue-router";
import HomePage from "./pages/HomePage.vue";
import UpdatePrizePage from "./pages/UpdatePrizePage.vue";


// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/prize-microservices/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/prize-microservices/:id',
            name: 'UpdatePrizePage',
            component: UpdatePrizePage
        }
    ]
});

myApp.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})
    .use(router)

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')

