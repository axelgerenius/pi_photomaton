<template>
  <section id="main" class="hero is-danger is-fullheight has-text-centered">
    <p v-if="!connected">Not connected</p>
    <div class="hero-body">
      <div class="container ">
        <button v-if="showButton" v-on:click="countdownStart()" class="button is-primary is-large">Take photo</button>
        <transition enter-active-class="animated heartBeat" mode="out-in">
          <h1 v-if="showCountdown" class="title" v-bind:key="countdown">{{countdown}}</h1>
          <h1 v-if="showSmile" class="title">Say cheese !</h1>
        </transition>
        <transition enter-active-class="animated jackInTheBox" leave-active-class="animated fadeOutRightBig">
          <figure v-show="fileLoaded">
            <img v-bind:src="fileName" v-on:load="showPhoto()" />
          </figure>
        </transition>
        <button  v-if="showPicture" v-on:click="init()" class="button is-medium">New photo</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
figure {
  box-shadow: 0px 0px 10px gray;
  padding: 1em 1em 2.6em 1em;
  background: white;
  margin: 1em;
  border: 1px #ccc solid;
}
img {
  border: 1px #ccc solid;
}
</style>


<script>
import config from "../config.js";

export default {
  name: "photo-taker",
  data() {
    return {
      countdown: 0,
      fileName: "",
      fileLoaded: false,
      showButton: true,
      showCountdown: false,
      showPicture: false,
      showSmile: false,
    }
  },
  mounted() {
    this.$mqtt.subscribe('#', {}, (err, granted) => {
      console.log(err, granted);
    });
    this.$mqtt.subscribe(config.mqttTopicPhotoTaken, {}, (err, granted) => {
      console.log(err, granted);
      if (granted != null && granted.length > 0) {
        if (granted[0] != null && granted[0].topic == config.mqttTopicPhotoTaken) {
          // TODO
          // this.loadPhoto("sample.jpg")
        }
      }
    });
  },
  computed: {
    connected() {
      return this.$mqtt.connected;
    }
  },
  methods: {
    init() {
      this.showPicture = false;
      this.showButton = true;
      this.fileLoaded = false;
      this.fileName = "";
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
      this.$mqtt.publish(config.mqttTopicTakePhoto, 'go');
      // Sample // If not connected, show sample
      if (!this.$mqtt.connected) {
        setTimeout(() => this.loadPhoto("sample.jpg"), 1000);
      }
    },
    loadPhoto(file) {
      this.showSmile = false;
      this.showPicture = true;
      this.fileLoaded = false;
      this.fileName = file;
    },
    showPhoto() {
      this.fileLoaded = true;
    }

  }
};
</script>
