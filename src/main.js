import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/element.js'

Vue.config.productionTip = false;
Vue.config.devtools = true;// 让chrome的F12中显示vue调试标签
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
