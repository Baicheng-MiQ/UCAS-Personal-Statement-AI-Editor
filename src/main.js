import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Notifications from '@kyvg/vue3-notification'

// icons: https://carbon-elements.netlify.app/icons/examples/preview/
import { CarbonIconsVue } from '@carbon/icons-vue'
import Play from '@carbon/icons-vue/es/play--outline/20'
import EditorIcon from '@carbon/icons-vue/es/watson-health/text-annotation-toggle/32.js'
import MenuButton from '@carbon/icons-vue/es/menu/24.js'

// require styles
import './index.css'

createApp(App).use(router).use(store).use(Notifications).use(CarbonIconsVue, {
    components: {
        Play,
        EditorIcon,
        MenuButton
    }
}).mount('#app')
