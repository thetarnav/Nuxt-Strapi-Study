import Vue from 'vue'
import GlobalEvents from 'vue-global-events'
import vClickOutside from 'v-click-outside'

// register globally
Vue.component('GlobalEvents', GlobalEvents)

Vue.use(vClickOutside)
