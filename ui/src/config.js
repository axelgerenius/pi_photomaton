export default {
  mqttUrl:
    process.env.VUE_APP_WS_HOSTNAME == "local"
      ? `ws://${document.domain}:9001`
      : `ws://${process.env.VUE_APP_WS_HOSTNAME}:9001`,
  mqttTopicTakePhoto: "photomaton/take",
  mqttTopicPhotoTaken: "photomaton/newPhoto",
  mqttTopicButton: "photomaton/button",

  countdownTime: 5,
  host:
    process.env.VUE_APP_WEB_HOST == "local"
      ? location.host
      : process.env.VUE_APP_WEB_HOST
};
