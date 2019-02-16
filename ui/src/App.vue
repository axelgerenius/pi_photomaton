<template>
  <div id="app">
    <section id="main" class="hero is-danger is-fullheight has-text-centered">
      <div class="hero-body">
        <div class="container">
          <p v-if="!connected">Not connected</p>
          <transition v-bind:leave-active-class="animation" mode="out-in">
            <button
              v-if="state == 'iddle'"
              v-on:click="buttonPressed()"
              class="button is-primary is-large"
            >
              Take photo
            </button>
            <countdown
              v-if="state == 'countdown'"
              v-bind:seconds="countdownTime"
              v-bind:text="countdownText"
              animated="true"
              v-on:end="countdownEnded()"
            />
            <div v-if="state == 'waiting'" class="line-scale">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <photo-viewer
              v-if="state == 'load' || state == 'display'"
              v-bind:src="filename"
              v-on:load="photoLoaded()"
            />
            <p v-if="state == 'error'">{{ error }}</p>
          </transition>
          <transition enter-active-class="animated fadeIn">
            <button
              v-if="state == 'display' || state == 'error'"
              v-on:click="closePhoto()"
              class="button is-medium"
            >
              New photo
            </button>
          </transition>
        </div>
        <div id="BottomRight" v-if="state == 'display'">
          <countdown v-bind:seconds="displayTime" v-on:end="closePhoto()" />
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

<style scoped>
#BottomRight {
  position: absolute;
  bottom: 1em;
  right: 1em;
}
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
      filename: "",
      triggerTime: null,
      animation: "",
      countdownTime: config.countdownTime,
      countdownText: config.countdownText,
      displayTime: config.displayTime
    };
  },
  computed: {
    leaveClass() {
      switch (this.state) {
        case "iddle":
          return "animated fadeOutRightBig";

        default:
          return "";
      }
    }
  },
  mounted() {
    this.$mqtt.on("connect", () => {
      this.connected = true;
    });
    this.$mqtt.on("message", (topic, message, packet) => {
      console.log(topic, message.toString(), packet);
      switch (topic) {
        case config.mqttTopicButton:
          this.setState("countdown");
          break;

        case config.mqttTopicTakePhoto:
          this.waitPhoto = true;
          setTimeout(() => this.waitReponse(), 2000);
          setTimeout(() => this.noResponse(), 12000);
          break;

        case config.mqttTopicPhotoTaken:
          this.waitPhoto = false;
          this.setState("load");
          this.filename = `http://${config.host}/images/${message.toString()}`;
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
      this.setState("iddle");
      this.filename = "";
      this.connected = this.$mqtt.connected;
    },
    buttonPressed() {
      this.triggerTime = Date.now().toString();
      this.$mqtt.publish(config.mqttTopicButton, this.triggerTime);
    },
    countdownEnded() {
      if (this.triggerTime != null) {
        this.$mqtt.publish(config.mqttTopicTakePhoto, this.triggerTime);
        this.triggerTime = null;
      }
    },
    photoLoaded() {
      this.setState("display");
    },
    waitReponse() {
      this.setState("waiting");
    },
    noResponse() {
      if (this.waitPhoto) {
        this.error = "Timeout, no photo received";
        this.state = "error";
      }
    },
    closePhoto() {
      this.setState("iddle", "animated fadeOutRightBig");
    },
    setState(state, animation) {
      if (animation) {
        this.animation = animation;
      } else {
        this.animation = "";
      }
      this.state = state;
    }
  }
};
</script>
