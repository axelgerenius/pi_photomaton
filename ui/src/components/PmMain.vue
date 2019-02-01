<template>
  <section id="main" class="hero is-danger is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <button v-if="showButton" v-on:click="countdownStart()" class="button is-primary is-large">Take photo</button>
        <h1 v-if="showCountdown" class="title">{{countdown}}</h1>
        <h1 v-if="showSmile" class="title">Say cheese !</h1>
        <div v-if="showPicture">
          <img v-if="file!=''" v-bind:src="file" />
          <button v-on:click="init()" class="button is-medium">Restart</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import config from "../config.js";

export default {
  name: "pm-main",
  data() {
    return {
      countdown: 0,
      file: "",
      showButton: true,
      showCountdown: false,
      showPicture: false,
      showSmile: false,
    }
  },
  mounted () {
    this.$mqtt.subscribe(config.mqttEventTake, {}, (err, granted) => {
      console.log(err, granted);
      if (granted != null && granted.length > 0) {
        if (granted[0] != null && granted[0].topic == config.mqttTopicTaken) {
          // TODO
        }
      }
    });
  },
  methods: {
    init() {
      this.showPicture = false;
      this.showButton = true;
      this.file = "";
    },
    countdownStart() {
      this.countdown = 3;
      this.showButton = false;
      this.showCountdown = true;
      this.countdownUpdate();
    },
    countdownUpdate() {
      setTimeout(() => {
        this.countdown += -1;
        if (this.countdown == 0) {
          this.showCountdown = false;
          this.showSmile = true;
          this.takePhoto();
        }
        else 
        {
          this.countdownUpdate();
        }
      }, 1000);
    },
    takePhoto() {
      this.$mqtt.publish(config.mqttEventTake, 'go');
      setTimeout(() => this.showPhoto(), 1000);
    },
    showPhoto() {
      this.showSmile = false;
      this.showPicture = true;
      // TODO Retrieve the file
      this.file = "sample.jpg";
    }
  }
};
</script>

<style scoped>
#main {
  height: 100%;
}
</style>
