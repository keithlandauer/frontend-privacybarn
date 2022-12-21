import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './input.css'

import  { library }  from '@fortawesome/fontawesome-svg-core'
import  { fas }  from '@fortawesome/free-solid-svg-icons'
import  { far }  from '@fortawesome/free-regular-svg-icons'
import  { fab } from '@fortawesome/free-brands-svg-icons'
import  { FontAwesomeIcon }  from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'
library.add(fas, far, fab)
axios.defaults.baseURL = 'https://keithlfig.pythonanywhere.com/'
createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

dom.watch()
