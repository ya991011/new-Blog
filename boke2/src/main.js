import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/assets.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import VueSocketio from 'vue-socket.io'


Vue.use(new VueSocketio({
  debug: true,
  // 服务器端地址
  connection: 'http://localhost:3001',
}))


// 自定义指令
Vue.filter("snippet", function (value) {
  return value.slice(0, 50) + "...";
});

// 挂载this.$message
Vue.prototype.$message = ElementUI.Message;
Vue.config.productionTip = false;
Vue.use(ElementUI);

// 创建兄弟组件传值bus总线
export const eventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
