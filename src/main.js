import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App);

// Vue Router
import router from "./router/index.js";

// Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.use(router).use(pinia).mount('#app')



