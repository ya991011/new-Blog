import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/assets.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.filter("snippet", function (value) {
  return value.slice(0, 10) + "...";
});
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
