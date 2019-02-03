export default {
  //mqttUrl: `ws://${document.domain}:9001`,
  mqttUrl: `ws://192.168.1.19:9001`,
  mqttTopicTakePhoto: "photomaton/take",
  mqttTopicPhotoTaken: "photomaton/newPhoto",
  mqttTopicButton: "photomaton/button",

  countdownTime: 5
};
