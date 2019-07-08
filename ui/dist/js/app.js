/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("56d7");


/***/ }),

/***/ "07bb":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1564":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_2_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ac42");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_2_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_2_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_2_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "334b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Gallery_vue_vue_type_style_index_0_id_0b26a80e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3c5c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Gallery_vue_vue_type_style_index_0_id_0b26a80e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Gallery_vue_vue_type_style_index_0_id_0b26a80e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Gallery_vue_vue_type_style_index_0_id_0b26a80e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "3c5c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "3f8d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoViewer_vue_vue_type_style_index_0_id_3aa0a5e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9545");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoViewer_vue_vue_type_style_index_0_id_3aa0a5e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoViewer_vue_vue_type_style_index_0_id_3aa0a5e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoViewer_vue_vue_type_style_index_0_id_3aa0a5e8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js
var parse_int = __webpack_require__("e814");
var parse_int_default = /*#__PURE__*/__webpack_require__.n(parse_int);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.promise.finally.js
var es7_promise_finally = __webpack_require__("097d");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__("8c4f");

// EXTERNAL MODULE: ./node_modules/vue-mqtt/dist/build.js
var build = __webpack_require__("daa7");
var build_default = /*#__PURE__*/__webpack_require__.n(build);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js
var object_assign = __webpack_require__("5176");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/promise.js
var promise = __webpack_require__("795b");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// CONCATENATED MODULE: ./src/plugins/VueConfig.js







var save = function save(Vue, config) {
  Object.defineProperty(Vue.prototype, "$config", {
    get: function get() {
      return config;
    }
  });
};

var VueConfig_install = function install(Vue, base) {
  return new promise_default.a(function (resolve) {
    var config = base;
    fetch("custom.json").then(function (response) {
      if (response.ok) {
        response.json().then(function (json) {
          config = assign_default()(config, json);
          save(Vue, config);
          resolve(config);
        });
      } else {
        console.log("Fetch response ko");
        save(Vue, config);
        resolve(config);
      }
    }).catch(function (error) {
      console.log("Fetch error: ".concat(error.message));
      save(Vue, config);
      resolve(config);
    });
  });
};

/* harmony default export */ var VueConfig = ({
  install: VueConfig_install
});
// CONCATENATED MODULE: ./src/values.js
/* harmony default export */ var values = ({
  host:  true ? location.host : undefined,
  // MQTT params
  mqttUrl:  true ? "ws://".concat(document.domain, ":9001") : undefined,
  mqttTopicTakePhoto: "photomaton/take",
  mqttTopicPhotoTaken: "photomaton/newPhoto",
  mqttTopicButton: "photomaton/button",
  mqttTopicListAsk: "photomaton/list",
  mqttTopicListResult: "photomaton/list_result",
  // COUNTDOWNS
  countdownTime: 5,
  countdownText: "Say cheese !",
  //
  buttonType: "icon",
  buttonText: "Take photo",
  buttonIcon: "fa-camera",
  backgroundDuration: 10,
  backgroundImages: [],
  //
  displayTime: 30,
  galleryShow: false
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1e9d50a5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=19857439&
var Appvue_type_template_id_19857439_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(this.$config.backgroundImages.length > 0)?_c('background'):_vm._e(),(!_vm.connected)?_c('div',{staticClass:"notification is-warning has-text-centered",attrs:{"id":"health"}},[_vm._v("\n    Not connected to MQTT\n  ")]):_vm._e(),_c('router-view')],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=19857439&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1e9d50a5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Background.vue?vue&type=template&id=768d55ac&scoped=true&
var Backgroundvue_type_template_id_768d55ac_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{style:(_vm.style)})}
var Backgroundvue_type_template_id_768d55ac_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Background.vue?vue&type=template&id=768d55ac&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Background.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Backgroundvue_type_script_lang_js_ = ({
  name: "background",
  data: function data() {
    return {
      duration: this.$config.backgroundDuration * 1000,
      current: 0
    };
  },
  computed: {
    file: function file() {
      return this.$config.backgroundImages[this.current];
    },
    style: function style() {
      return "background-image: url(".concat(this.file, ");");
    }
  },
  mounted: function mounted() {
    this.tick();
  },
  methods: {
    tick: function tick() {
      var _this = this;

      setTimeout(function () {
        _this.current += 1;
        if (_this.current >= _this.$config.backgroundImages.length) _this.current = 0;

        _this.tick();
      }, this.duration);
    }
  }
});
// CONCATENATED MODULE: ./src/components/Background.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Backgroundvue_type_script_lang_js_ = (Backgroundvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Background.vue?vue&type=style&index=0&id=768d55ac&scoped=true&lang=css&
var Backgroundvue_type_style_index_0_id_768d55ac_scoped_true_lang_css_ = __webpack_require__("ee9b");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Background.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Backgroundvue_type_script_lang_js_,
  Backgroundvue_type_template_id_768d55ac_scoped_true_render,
  Backgroundvue_type_template_id_768d55ac_scoped_true_staticRenderFns,
  false,
  null,
  "768d55ac",
  null
  
)

/* harmony default export */ var Background = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: "app",
  components: {
    Background: Background
  },
  data: function data() {
    return {
      connected: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$mqtt.on("connect", function () {
      _this.connected = true;
    });
  },
  beforeUpdate: function beforeUpdate() {
    this.connected = this.$mqtt.connected;
  }
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=0&lang=sass&
var Appvue_type_style_index_0_lang_sass_ = __webpack_require__("cf25");

// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=1&lang=css&
var Appvue_type_style_index_1_lang_css_ = __webpack_require__("b0a0");

// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=2&lang=scss&
var Appvue_type_style_index_2_lang_scss_ = __webpack_require__("1564");

// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=3&lang=css&
var Appvue_type_style_index_3_lang_css_ = __webpack_require__("dc82");

// CONCATENATED MODULE: ./src/App.vue









/* normalize component */

var App_component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js_,
  Appvue_type_template_id_19857439_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (App_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1e9d50a5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Taker.vue?vue&type=template&id=cdfc8ee8&
var Takervue_type_template_id_cdfc8ee8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"hero is-danger is-fullheight has-text-centered",attrs:{"id":"main"}},[_c('div',{staticClass:"hero-body"},[(_vm.state == 'display')?_c('countdown-bar',{attrs:{"seconds":_vm.displayTime},on:{"end":function($event){_vm.closePhoto()}}}):_vm._e(),_c('div',{staticClass:"container"},[_c('transition',{attrs:{"leave-active-class":_vm.animation,"mode":"out-in"}},[(_vm.state == 'iddle')?_c('button',{staticClass:"button is-primary is-large",class:{ 'is-circle': _vm.isIcon },on:{"click":function($event){_vm.buttonPressed()}}},[(_vm.isIcon)?_c('span',{staticClass:"icon is-large"},[_c('i',{staticClass:"fas fa-2x",class:_vm.buttonIcon})]):_c('span',[_vm._v("\n            "+_vm._s(_vm.buttonText)+"\n          ")])]):_vm._e(),(_vm.state == 'countdown')?_c('countdown',{attrs:{"seconds":_vm.countdownTime,"text":_vm.countdownText,"animated":"true"},on:{"end":function($event){_vm.countdownEnded()}}}):_vm._e(),(_vm.state == 'load' || _vm.state == 'display')?_c('photo-viewer',{staticClass:"fullScreen",attrs:{"src":_vm.filename},on:{"load":function($event){_vm.photoLoaded()},"fail":function($event){_vm.closePhoto()}}}):_vm._e(),(_vm.state == 'error')?_c('p',[_vm._v(_vm._s(_vm.error))]):_vm._e()],1),(_vm.state == 'waiting' || _vm.state == 'load')?_c('div',{staticClass:"ball-pulse-rise"},[_c('div'),_c('div'),_c('div'),_c('div'),_c('div')]):_vm._e(),_c('transition',{attrs:{"enter-active-class":"animated fadeIn"}},[(_vm.state == 'display' || _vm.state == 'error')?_c('div',{staticClass:"middleLeft"},[_c('span',{staticClass:"icon is-large",on:{"click":function($event){_vm.closePhoto()}}},[_c('i',{staticClass:"fas fa-chevron-left fa-3x"})])]):_vm._e()])],1),(_vm.state == 'iddle' && _vm.galleryShow)?_c('span',{staticClass:"bottomRight icon is-large",on:{"click":function($event){_vm.$router.push('/gallery')}}},[_c('i',{staticClass:"fas fa-th fa-3x"})]):_vm._e()],1)])}
var Takervue_type_template_id_cdfc8ee8_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/Taker.vue?vue&type=template&id=cdfc8ee8&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/date/now.js
var now = __webpack_require__("0a0d");
var now_default = /*#__PURE__*/__webpack_require__.n(now);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1e9d50a5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Countdown.vue?vue&type=template&id=4865334a&
var Countdownvue_type_template_id_4865334a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('transition',{attrs:{"enter-active-class":_vm.animation,"mode":"out-in"}},[(_vm.showCountdown)?_c('h1',{key:_vm.countdown,staticClass:"title"},[_vm._v("\n      "+_vm._s(_vm.countdown)+"\n    ")]):_vm._e(),(_vm.showSmile)?_c('h1',{staticClass:"title"},[_vm._v(_vm._s(_vm.finalText))]):_vm._e()])],1)}
var Countdownvue_type_template_id_4865334a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Countdown.vue?vue&type=template&id=4865334a&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Countdown.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Countdownvue_type_script_lang_js_ = ({
  name: "countdown",
  props: ["seconds", "text", "animated"],
  data: function data() {
    return {
      countdown: 3,
      showCountdown: true,
      showSmile: false
    };
  },
  computed: {
    animation: function animation() {
      if (this.animated) {
        if (this.countdown == 0) return "animated bounceIn";else return "animated heartBeat";
      }

      return "";
    },
    finalText: function finalText() {
      return this.text;
    }
  },
  mounted: function mounted() {
    this.countdown = this.seconds;
    this.showCountdown = true;
    this.update();
  },
  methods: {
    update: function update() {
      var _this = this;

      setTimeout(function () {
        _this.countdown += -1;

        if (_this.countdown == 0) {
          _this.showCountdown = false;
          _this.showSmile = true;

          _this.$emit("end");
        } else {
          _this.update();
        }
      }, 1000);
    }
  }
});
// CONCATENATED MODULE: ./src/components/Countdown.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Countdownvue_type_script_lang_js_ = (Countdownvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Countdown.vue





/* normalize component */

var Countdown_component = Object(componentNormalizer["a" /* default */])(
  components_Countdownvue_type_script_lang_js_,
  Countdownvue_type_template_id_4865334a_render,
  Countdownvue_type_template_id_4865334a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Countdown = (Countdown_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1e9d50a5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CountdownBar.vue?vue&type=template&id=34930d7c&scoped=true&
var CountdownBarvue_type_template_id_34930d7c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('progress',{staticClass:"progress",attrs:{"max":_vm.seconds},domProps:{"value":_vm.countdown}})}
var CountdownBarvue_type_template_id_34930d7c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CountdownBar.vue?vue&type=template&id=34930d7c&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CountdownBar.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var CountdownBarvue_type_script_lang_js_ = ({
  name: "countdown-bar",
  props: ["seconds"],
  data: function data() {
    return {
      countdown: 3
    };
  },
  mounted: function mounted() {
    this.countdown = this.seconds;
    this.update();
  },
  methods: {
    update: function update() {
      var _this = this;

      setTimeout(function () {
        _this.countdown += -1;

        if (_this.countdown == 0) {
          _this.$emit("end");
        } else {
          _this.update();
        }
      }, 1000);
    }
  }
});
// CONCATENATED MODULE: ./src/components/CountdownBar.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CountdownBarvue_type_script_lang_js_ = (CountdownBarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CountdownBar.vue?vue&type=style&index=0&id=34930d7c&scoped=true&lang=css&
var CountdownBarvue_type_style_index_0_id_34930d7c_scoped_true_lang_css_ = __webpack_require__("fe12");

// CONCATENATED MODULE: ./src/components/CountdownBar.vue






/* normalize component */

var CountdownBar_component = Object(componentNormalizer["a" /* default */])(
  components_CountdownBarvue_type_script_lang_js_,
  CountdownBarvue_type_template_id_34930d7c_scoped_true_render,
  CountdownBarvue_type_template_id_34930d7c_scoped_true_staticRenderFns,
  false,
  null,
  "34930d7c",
  null
  
)

/* harmony default export */ var CountdownBar = (CountdownBar_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1e9d50a5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PhotoViewer.vue?vue&type=template&id=3aa0a5e8&scoped=true&
var PhotoViewervue_type_template_id_3aa0a5e8_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('transition',{attrs:{"enter-active-class":"animated fadeIn"}},[_c('figure',{directives:[{name:"show",rawName:"v-show",value:(_vm.isLoaded),expression:"isLoaded"}]},[_c('img',{attrs:{"src":_vm.file},on:{"load":function($event){_vm.showPhoto()},"error":function($event){_vm.showError()}}})])]),(_vm.error)?_c('p',[_vm._v("Error during photo load")]):_vm._e()],1)}
var PhotoViewervue_type_template_id_3aa0a5e8_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/PhotoViewer.vue?vue&type=template&id=3aa0a5e8&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PhotoViewer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var PhotoViewervue_type_script_lang_js_ = ({
  name: "photo-viewer",
  props: ["src"],
  data: function data() {
    return {
      file: "",
      isLoaded: false,
      error: false
    };
  },
  computed: {
    style: function style() {
      return "max-height: ".concat(document.body.clientHeight, "px; \n              max-width: ").concat(document.body.clientWidth, "px;");
    }
  },
  mounted: function mounted() {
    this.show = false;
    this.file = this.src;
  },
  watch: {
    // whenever question changes, this function will run
    src: function src(newSrc, oldSrc) {
      console.log(newSrc, oldSrc);
      this.loadPhoto(newSrc);
    }
  },
  methods: {
    loadPhoto: function loadPhoto(file) {
      this.isLoaded = false;
      this.error = false;
      this.file = file;
    },
    showPhoto: function showPhoto() {
      this.isLoaded = true;
      this.$emit("load");
    },
    showError: function showError() {
      var _this = this;

      this.error = true;
      setTimeout(function () {
        _this.$emit("fail");
      }, 10000);
    }
  }
});
// CONCATENATED MODULE: ./src/components/PhotoViewer.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PhotoViewervue_type_script_lang_js_ = (PhotoViewervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/PhotoViewer.vue?vue&type=style&index=0&id=3aa0a5e8&scoped=true&lang=css&
var PhotoViewervue_type_style_index_0_id_3aa0a5e8_scoped_true_lang_css_ = __webpack_require__("3f8d");

// CONCATENATED MODULE: ./src/components/PhotoViewer.vue






/* normalize component */

var PhotoViewer_component = Object(componentNormalizer["a" /* default */])(
  components_PhotoViewervue_type_script_lang_js_,
  PhotoViewervue_type_template_id_3aa0a5e8_scoped_true_render,
  PhotoViewervue_type_template_id_3aa0a5e8_scoped_true_staticRenderFns,
  false,
  null,
  "3aa0a5e8",
  null
  
)

/* harmony default export */ var PhotoViewer = (PhotoViewer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Taker.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Takervue_type_script_lang_js_ = ({
  name: "taker",
  components: {
    Countdown: Countdown,
    PhotoViewer: PhotoViewer,
    CountdownBar: CountdownBar
  },
  data: function data() {
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
      displayTime: this.$config.displayTime,
      galleryShow: this.$config.galleryShow
    };
  },
  computed: {
    leaveClass: function leaveClass() {
      switch (this.state) {
        case "iddle":
          return "animated fadeOutRightBig";

        default:
          return "";
      }
    },
    isIcon: function isIcon() {
      return this.$config.buttonType != "text";
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$mqtt.on("message", function (topic, message, packet) {
      console.log(topic, message.toString(), packet);

      switch (topic) {
        case _this.$config.mqttTopicButton:
          _this.setState("countdown");

          break;

        case _this.$config.mqttTopicTakePhoto:
          _this.waitPhoto = true;
          setTimeout(function () {
            return _this.waitReponse();
          }, 2000);
          setTimeout(function () {
            return _this.noResponse();
          }, 12000);
          break;

        case _this.$config.mqttTopicPhotoTaken:
          _this.waitPhoto = false;

          _this.setState("load");

          _this.filename = "http://".concat(_this.$config.host, "/images/").concat(message.toString());
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
    init: function init() {
      this.setState("iddle");
      this.filename = "";
      this.connected = this.$mqtt.connected;
    },
    buttonPressed: function buttonPressed() {
      this.triggerTime = now_default()().toString();
      this.$mqtt.publish(this.$config.mqttTopicButton, this.triggerTime);
    },
    countdownEnded: function countdownEnded() {
      if (this.triggerTime != null) {
        this.$mqtt.publish(this.$config.mqttTopicTakePhoto, this.triggerTime);
        this.triggerTime = null;
      }
    },
    photoLoaded: function photoLoaded() {
      this.setState("display");
    },
    waitReponse: function waitReponse() {
      if (this.waitPhoto) {
        this.setState("waiting");
      }
    },
    noResponse: function noResponse() {
      if (this.waitPhoto) {
        this.error = "Timeout, no photo received";
        this.state = "error";
      }
    },
    closePhoto: function closePhoto() {
      this.setState("iddle", "animated fadeOutRightBig");
    },
    setState: function setState(state, animation) {
      if (animation) {
        this.animation = animation;
      } else {
        this.animation = "";
      }

      this.state = state;
    }
  }
});
// CONCATENATED MODULE: ./src/views/Taker.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Takervue_type_script_lang_js_ = (Takervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/Taker.vue?vue&type=style&index=0&lang=css&
var Takervue_type_style_index_0_lang_css_ = __webpack_require__("e557");

// CONCATENATED MODULE: ./src/views/Taker.vue






/* normalize component */

var Taker_component = Object(componentNormalizer["a" /* default */])(
  views_Takervue_type_script_lang_js_,
  Takervue_type_template_id_cdfc8ee8_render,
  Takervue_type_template_id_cdfc8ee8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Taker = (Taker_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1e9d50a5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Gallery.vue?vue&type=template&id=0b26a80e&scoped=true&
var Galleryvue_type_template_id_0b26a80e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"gallery"}},[(_vm.isLoading)?_c('div',{staticClass:"hero is-fullheight has-text-centered"},[_vm._m(0)]):_c('div',{staticClass:"columns is-multiline"},_vm._l((_vm.pageContent),function(image){return _c('div',{key:image.timestamp,staticClass:"column is-one-fifth"},[_c('figure',{staticClass:"image is-4by3"},[_c('a',{attrs:{"href":("" + _vm.path + (image.image))}},[_c('img',{attrs:{"src":(_vm.path + "thumbnails/" + (image.image)),"alt":""}})])])])}),0),_c('div',{staticClass:"level"},[_c('div',{staticClass:"level-left"},[(_vm.currentPage > 1)?_c('div',{staticClass:"level-item",on:{"click":function($event){_vm.goPrevious()}}},[_c('i',{staticClass:"fas fa-chevron-left fa-3x"})]):_vm._e()]),_c('div',{staticClass:"level-item"},[_c('i',{staticClass:"fas fa-chevron-down fa-3x",on:{"click":function($event){_vm.goBack()}}})]),_c('div',{staticClass:"level-right"},[(_vm.totalPage > _vm.currentPage)?_c('div',{staticClass:"level-item",on:{"click":function($event){_vm.goNext()}}},[_c('i',{staticClass:"fas fa-chevron-right fa-3x"})]):_vm._e()])])])}
var Galleryvue_type_template_id_0b26a80e_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"line-scale"},[_c('div'),_c('div'),_c('div'),_c('div'),_c('div')])}]


// CONCATENATED MODULE: ./src/views/Gallery.vue?vue&type=template&id=0b26a80e&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.math.trunc.js
var es6_math_trunc = __webpack_require__("84b4");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/number/parse-int.js
var number_parse_int = __webpack_require__("70f1");
var number_parse_int_default = /*#__PURE__*/__webpack_require__.n(number_parse_int);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Gallery.vue?vue&type=script&lang=js&








//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Galleryvue_type_script_lang_js_ = ({
  name: "gallery",
  props: ["page"],
  data: function data() {
    return {
      isLoading: true,
      images: [],
      path: "http://".concat(this.$config.host, "/images/"),
      pageLimit: 15
    };
  },
  computed: {
    currentPage: function currentPage() {
      return this.page ? number_parse_int_default()(this.page) : 1;
    },
    totalPage: function totalPage() {
      var count = Math.trunc(this.images.length / this.pageLimit);
      if (this.images.length % this.pageLimit > 0) count += 1;
      return count;
    },
    pageContent: function pageContent() {
      if (this.isLoading) return [];
      return this.images.slice((this.currentPage - 1) * this.pageLimit, this.currentPage * this.pageLimit);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$mqtt.on("photomaton/list", function () {
      _this.connected = true;
    });
    this.$mqtt.on("message", function (topic, message, packet) {
      console.log(topic, message.toString(), packet);

      switch (topic) {
        case _this.$config.mqttTopicListResult:
          _this.images = JSON.parse(message.toString());
          _this.isLoading = false;
          break;

        default:
          break;
      }
    });
    this.$mqtt.subscribe(this.$config.mqttTopicListAsk);
    this.$mqtt.subscribe(this.$config.mqttTopicListResult);
    this.$mqtt.publish(this.$config.mqttTopicListAsk);
  },
  methods: {
    goNext: function goNext() {
      this.$router.replace({
        path: "/gallery/".concat(this.currentPage + 1)
      });
    },
    goPrevious: function goPrevious() {
      this.$router.replace({
        path: "/gallery/".concat(this.currentPage - 1)
      });
    },
    goBack: function goBack() {
      this.$router.go(-1);
    }
  }
});
// CONCATENATED MODULE: ./src/views/Gallery.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Galleryvue_type_script_lang_js_ = (Galleryvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/Gallery.vue?vue&type=style&index=0&id=0b26a80e&scoped=true&lang=css&
var Galleryvue_type_style_index_0_id_0b26a80e_scoped_true_lang_css_ = __webpack_require__("334b");

// CONCATENATED MODULE: ./src/views/Gallery.vue






/* normalize component */

var Gallery_component = Object(componentNormalizer["a" /* default */])(
  views_Galleryvue_type_script_lang_js_,
  Galleryvue_type_template_id_0b26a80e_scoped_true_render,
  Galleryvue_type_template_id_0b26a80e_scoped_true_staticRenderFns,
  false,
  null,
  "0b26a80e",
  null
  
)

/* harmony default export */ var Gallery = (Gallery_component.exports);
// CONCATENATED MODULE: ./src/main.js













vue_runtime_esm["a" /* default */].use(vue_router_esm["a" /* default */]);
var routes = [{
  path: "/",
  component: Taker
}, {
  path: "/gallery",
  component: Gallery
}, {
  path: "/gallery/:page",
  component: Gallery,
  props: true
}];
var router = new vue_router_esm["a" /* default */]({
  routes: routes
});
vue_runtime_esm["a" /* default */].config.productionTip = false;
VueConfig.install(vue_runtime_esm["a" /* default */], values).then(function (config) {
  vue_runtime_esm["a" /* default */].use(build_default.a, config.mqttUrl, {
    clientId: "WebClient-" + parse_int_default()(Math.random() * 100000)
  });
  new vue_runtime_esm["a" /* default */]({
    router: router,
    render: function render(h) {
      return h(App);
    }
  }).$mount("#app");
});

/***/ }),

/***/ "73c8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9545":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9a50":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ac42":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "aca6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b0a0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("07bb");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c2e5":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "cf25":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_index_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0cfb");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_index_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_index_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_index_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_sass___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "dc82":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_3_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9a50");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_3_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_3_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_3_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e557":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Taker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c2e5");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Taker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Taker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Taker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ee9b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Background_vue_vue_type_style_index_0_id_768d55ac_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("aca6");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Background_vue_vue_type_style_index_0_id_768d55ac_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Background_vue_vue_type_style_index_0_id_768d55ac_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Background_vue_vue_type_style_index_0_id_768d55ac_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "fe12":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CountdownBar_vue_vue_type_style_index_0_id_34930d7c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("73c8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CountdownBar_vue_vue_type_style_index_0_id_34930d7c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CountdownBar_vue_vue_type_style_index_0_id_34930d7c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CountdownBar_vue_vue_type_style_index_0_id_34930d7c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

/******/ });
//# sourceMappingURL=app.js.map