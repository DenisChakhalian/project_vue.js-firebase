import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './theme.css'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import moment from 'moment'

createApp(App).use(store).use(router).use(moment).component('QuillEditor', QuillEditor).mount('#app')
// createApp(App).use(store).use(router).mount('#app')
