import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueMqtt from "vue-mqtt";

Vue.use(VueMqtt, "ws://localhost", {
  clientId: "WebClient-" + parseInt(Math.random() * 100000)
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
