const save = (Vue, config) => {
  Object.defineProperty(Vue.prototype, "$config", {
    get() {
      return config;
    }
  });
};

const install = (Vue, base) =>
  new Promise(resolve => {
    let config = base;
    fetch("custom.json")
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            config = Object.assign(config, json);
            save(Vue, config);
            resolve(config);
          });
        } else {
          console.log("Fetch response ko");
          save(Vue, config);
          resolve(config);
        }
      })
      .catch(error => {
        console.log(`Fetch error: ${error.message}`);
        save(Vue, config);
        resolve(config);
      });
  });

export default {
  install
};
