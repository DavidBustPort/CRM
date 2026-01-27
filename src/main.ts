import { createApp } from 'vue'
import App from './App.vue'
import router from './app/router/router'
import './core/styles/main.scss'
import 'bootstrap/dist/js/bootstrap.min.js'
import fontAwesomeConfig from './config/fontAwesome'
import { setupInterceptors } from './core/interceptors'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import VueApexCharts from 'vue3-apexcharts'

//vue-datepicker
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import 'animate.css'

const app = createApp(App)

setupInterceptors()

app.use(router)
app.use(pinia)
app.use(VueApexCharts)

app.component('font-awesome-icon', fontAwesomeConfig)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')