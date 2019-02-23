import Vue from "vue";
import VueRouter from "vue-router";
import VueMqtt from "vue-mqtt";

import config from "./config";
import App from "./App.vue";

import Taker from "./views/Taker.vue";
import Gallery from "./views/Gallery.vue";

Vue.use(VueRouter);

Vue.use(VueMqtt, config.mqttUrl, {
  clientId: "WebClient-" + parseInt(Math.random() * 100000)
});

Vue.config.productionTip = false;

const routes = [
  { path: "/", component: Taker },
  { path: "/gallery", component: Gallery }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
