export default {
  host:
    process.env.VUE_APP_WEB_HOST == "local"
      ? location.host
      : process.env.VUE_APP_WEB_HOST,

  // MQTT params
  mqttUrl:
    process.env.VUE_APP_WS_HOSTNAME == "local"
      ? `ws://${document.domain}:9001`
      : `ws://${process.env.VUE_APP_WS_HOSTNAME}:9001`,
  mqttTopicTakePhoto: "photomaton/take",
  mqttTopicPhotoTaken: "photomaton/newPhoto",
  mqttTopicButton: "photomaton/button",
  mqttTopicListAsk: "photomaton/list",
  mqttTopicListResult: "photomaton/list_result",

  // COUNTDOWNS
  countdownTime: 5,
  countdownText: "Say cheese !",
  displayTime: 30
};
