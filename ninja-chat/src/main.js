import "material-icons/css/material-icons.min.css";
import "materialize-css/dist/css/materialize.min.css";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
