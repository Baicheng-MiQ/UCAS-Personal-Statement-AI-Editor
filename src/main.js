import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Notifications from '@kyvg/vue3-notification'

// require styles
import './index.css'

createApp(App).use(router).use(store).use(Notifications).mount('#app')
