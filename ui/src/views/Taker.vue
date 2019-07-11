<template>
  <section id="main" class="hero is-danger is-fullheight has-text-centered">
    <div class="hero-body">
      <countdown-bar
        v-if="state == 'display'"
        v-bind:seconds="displayTime"
        v-on:end="closePhoto()"
      />
      <div class="container">
        <transition v-bind:leave-active-class="animation" mode="out-in">
          <button
            v-if="state == 'iddle'"
            v-on:click="buttonPressed()"
            class="button is-primary is-large"
            v-bind:class="{ 'is-circle': isIcon }"
            v-bind:style="buttonStyle"
          >
            <span v-if="isIcon" class="icon is-large">
              <i class="fas fa-2x" v-bind:class="buttonIcon"></i>
            </span>
            <span v-else>
              {{ buttonText }}
            </span>
          </button>
          <countdown
            v-if="state == 'countdown'"
            v-bind:seconds="countdownTime"
            v-bind:text="countdownText"
            animated="true"
            v-on:end="countdownEnded()"
          />
          <photo-viewer
            v-if="state == 'load' || state == 'display'"
            v-bind:src="filename"
            v-on:load="photoLoaded()"
            v-on:fail="closePhoto()"
            class="fullScreen"
          />
          <p v-if="state == 'error'">{{ error }}</p>
        </transition>
        <div
          v-if="state == 'waiting' || state == 'load'"
          class="ball-pulse-rise"
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <transition enter-active-class="animated fadeIn">
          <div v-if="state == 'display' || state == 'error'" class="middleLeft">
            <span class="icon is-large" v-on:click="closePhoto()">
              <i class="fas fa-chevron-left fa-3x"></i>
            </span>
          </div>
        </transition>
      </div>
      <span
        v-if="state == 'iddle' && galleryShow"
        v-on:click="$router.push('/gallery')"
        class="bottomRight icon is-large"
      >
        <i class="fas fa-th fa-3x"></i>
      </span>
    </div>
  </section>
</template>

<style>
.fullScreen {
  position: fixed;
  top: 0;
  left: 0;
  width: -webkit-fill-available;
}
.bottomRight {
  position: fixed;
  bottom: 0.5em;
  right: 0.5em;
}
.bottomLeft {
  position: fixed;
  bottom: 0.5em;
  left: 0.5em;
}
.middleLeft {
  position: fixed;
  left: 0em;
  height: 100%;
}
.button.is-circle {
  border-radius: 9999px;
  height: 4em;
  width: 4em;
}
.button:hover {
  filter: brightness(85%);
}
</style>

<script>
import Countdown from "../components/Countdown.vue";
import CountdownBar from "../components/CountdownBar.vue";
import PhotoViewer from "../components/PhotoViewer.vue";

export default {
  name: "taker",
  components: {
    Countdown,
    PhotoViewer,
    CountdownBar
  },
  data() {
    return {
      state: "iddle",
      waitPhoto: false,
      filename: "",
      triggerTime: null,
      animation: "",
      countdownTime: this.$config.countdownTime,
      countdownText: this.$config.countdownText,
      buttonText: this.$config.buttonText,
      buttonIcon: this.$config.buttonIcon,
      buttonColor: this.$config.buttonColor,
      displayTime: this.$config.displayTime,
      galleryShow: this.$config.galleryShow
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
    },
    isIcon() {
      return this.$config.buttonType != "text";
    },
    buttonStyle() {
      if (this.buttonColor) return `background-color: ${this.buttonColor};`
      return "";
    }
  },
  mounted() {
    this.$mqtt.on("message", (topic, message, packet) => {
      console.log(topic, message.toString(), packet);
      switch (topic) {
        case this.$config.mqttTopicButton:
          this.setState("countdown");
          break;

        case this.$config.mqttTopicTakePhoto:
          this.waitPhoto = true;
          setTimeout(() => this.waitReponse(), 2000);
          setTimeout(() => this.noResponse(), 12000);
          break;

        case this.$config.mqttTopicPhotoTaken:
          this.waitPhoto = false;
          this.setState("load");
          this.filename = `http://${
            this.$config.host
          }/images/${message.toString()}`;
          break;

        default:
          break;
      }
    });
    this.$mqtt.subscribe(this.$config.mqttTopicButton);
    this.$mqtt.subscribe(this.$config.mqttTopicPhotoTaken);
    this.$mqtt.subscribe(this.$config.mqttTopicTakePhoto);
  },
  methods: {
    init() {
      this.setState("iddle");
      this.filename = "";
      this.connected = this.$mqtt.connected;
    },
    buttonPressed() {
      this.triggerTime = Date.now().toString();
      this.$mqtt.publish(this.$config.mqttTopicButton, this.triggerTime);
    },
    countdownEnded() {
      if (this.triggerTime != null) {
        this.$mqtt.publish(this.$config.mqttTopicTakePhoto, this.triggerTime);
        this.triggerTime = null;
      }
    },
    photoLoaded() {
      this.setState("display");
    },
    waitReponse() {
      if (this.waitPhoto) {
        this.setState("waiting");
      }
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
