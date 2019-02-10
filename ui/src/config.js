export default {
  //mqttUrl: `ws://${document.domain}:9001`,
  mqttUrl:
    process.env.VUE_APP_WS_HOST == "local"
      ? `ws://${document.domain}:9001`
      : `ws://${process.env.VUE_APP_WS_HOST}:9001`,
  mqttTopicTakePhoto: "photomaton/take",
  mqttTopicPhotoTaken: "photomaton/newPhoto",
  mqttTopicButton: "photomaton/button",

  countdownTime: 5
};
