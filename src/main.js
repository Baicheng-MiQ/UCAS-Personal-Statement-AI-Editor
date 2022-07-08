import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Notifications from '@kyvg/vue3-notification'

// icons: https://carbon-elements.netlify.app/icons/examples/preview/
import { CarbonIconsVue } from '@carbon/icons-vue'
import Play from '@carbon/icons-vue/es/play--outline/20'

// require styles
import './index.css'

createApp(App).use(router).use(store).use(Notifications).use(CarbonIconsVue, {
    components: {
        Play,
    }
}).mount('#app')
