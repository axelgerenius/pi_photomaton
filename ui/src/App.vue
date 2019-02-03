<template>
  <div id="app">
    <section id="main" class="hero is-danger is-fullheight has-text-centered">
      <div class="hero-body">
        <div class="container">
          <button
            v-if="state == 'iddle'"
            v-on:click="takePhoto()"
            class="button is-primary is-large"
          >
            Take photo
          </button>
          <countdown v-if="state == 'countdown'" />
          <div v-if="state == 'waiting'" class="line-scale">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <transition leave-active-class="animated fadeOutRightBig">
            <photo-viewer v-if="state == 'display'" v-bind:src="filename" />
          </transition>
          <p v-if="state == 'error'">{{ error }}</p>
          <button
            v-if="state == 'display' || state == 'error'"
            v-on:click="init()"
            class="button is-medium"
          >
            New photo
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="css">
@import "../node_modules/bulma/css/bulma.css";
@import "../node_modules/animate.css/animate.css";
@import "../node_modules/loaders.css/loaders.css";
</style>

<script>
import config from "./config.js";

import Countdown from "./components/Countdown.vue";
import PhotoViewer from "./components/PhotoViewer.vue";

export default {
  name: "app",
  components: {
    Countdown,
    PhotoViewer
  },
  data() {
    return {
      state: "iddle",
      waitPhoto: false,
      connected: false,
      filename: ""
    };
  },
  mounted() {
    this.$mqtt.on("connect", () => {
      this.connected = true;
    });
    this.$mqtt.on("message", (topic, message, packet) => {
      console.log(topic, message.toString(), packet);
      switch (topic) {
        case config.mqttTopicButton:
          this.state = "countdown";
          break;

        case config.mqttTopicTakePhoto:
          this.waitPhoto = true;
          setTimeout(() => this.waitReponse(), 2000);
          setTimeout(() => this.noResponse(), 10000);
          break;

        case config.mqttTopicPhotoTaken:
          this.waitPhoto = false;
          this.state = "display";
          this.filename = message.toString();
          break;

        default:
          break;
      }
    });
    this.$mqtt.subscribe(config.mqttTopicButton);
    this.$mqtt.subscribe(config.mqttTopicPhotoTaken);
    this.$mqtt.subscribe(config.mqttTopicTakePhoto);
  },
  methods: {
    init() {
      this.state = "iddle";
      this.filename = "";
      this.connected = this.$mqtt.connected;
    },
    takePhoto() {
      this.$mqtt.publish(config.mqttTopicButton, "pressed");
    },
    waitReponse() {
      this.state = "waiting";
    },
    noResponse() {
      if (this.waitPhoto) {
        this.error = "Timeout, no photo received";
        this.state = "error";
      }
    }
  }
};
</script>
