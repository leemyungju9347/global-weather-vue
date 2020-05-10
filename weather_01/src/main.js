import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

export const eventBus = new Vue({
    methods:{
      //시티명 받아오는 함수
      inputCity(cityName){
        this.$emit('inputCity',cityName)
      },
      getSignal(signal){
        this.$emit('getSignal',signal)
      }
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
