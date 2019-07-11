import Vue from "vue";
import VueRouter from "vue-router";
import VueMqtt from "vue-mqtt";

import VueConfig from "./plugins/VueConfig";
import values from "./values";
import App from "./App.vue";

import Taker from "./views/Taker.vue";
import Gallery from "./views/Gallery.vue";

Vue.use(VueRouter);
const routes = [
  { path: "/", component: Taker },
  { path: "/gallery", component: Gallery },
  { path: "/gallery/:page", component: Gallery, props: true }
];
const router = new VueRouter({
  routes
});

Vue.config.productionTip = false;

VueConfig.install(Vue, values).then(config => {
  Vue.use(VueMqtt, config.mqttUrl, {
    clientId: "WebClient-" + parseInt(Math.random() * 100000)
  });

  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
});
