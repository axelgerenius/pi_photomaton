import Vue from "vue";
import App from "./App.vue";
import VueMqtt from "vue-mqtt";
import config from "./config";

Vue.use(VueMqtt, config.mqttUrl, {
  clientId: "WebClient-" + parseInt(Math.random() * 100000)
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
