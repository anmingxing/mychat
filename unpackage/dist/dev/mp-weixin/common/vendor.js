(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {return;}var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!********************************************!*\
  !*** /Users/zxx/Local/mychat社交/pages.json ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 5 */
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 6 */
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26920200402001","_inBundle":false,"_integrity":"sha512-Mdhd/IRuUMHWPj3TtWrBb0kghRBA0YiO2L2THMFvhCTfQDSoSq1vwOdAx5n/8fIORAvG0uVQoYl73xeVFZML5A==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200402001.tgz","_shasum":"5f66f5dc252ac00c6064857dee8251ee51aa2391","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"bfdbb7b3000599679ef8cb29a969e6bd447b00c7","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200402001"};

/***/ }),
/* 7 */
/*!*************************************************************!*\
  !*** /Users/zxx/Local/mychat社交/pages.json?{"type":"style"} ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/chat/index": { "navigationBarTitleText": "对话", "backgroundColor": "#1c2024" }, "pages/user/login": { "navigationBarTitleText": "用户登陆", "backgroundColor": "#1c2024" }, "pages/app/indexs": { "navigationBarTitleText": "首页", "backgroundColor": "#1c2024" }, "pages/list/chat": { "navigationBarTitleText": "对话列表", "backgroundColor": "#1c2024" }, "pages/list/contacts": { "navigationBarTitleText": "联系人列表", "backgroundColor": "#1c2024" }, "pages/cosmos/index": { "navigationBarTitleText": "宇宙", "backgroundColor": "#1c2024" }, "pages/cosmos/push": { "navigationBarTitleText": "推送", "backgroundColor": "#1c2024" }, "pages/cosmos/details": { "navigationBarTitleText": "详情", "backgroundColor": "#1c2024" }, "pages/user/index": { "navigationBarTitleText": "用户详情", "backgroundColor": "#1c2024" }, "pages/user/changepwd": { "navigationBarTitleText": "修改密码", "backgroundColor": "#1c2024" }, "pages/user/changemobile": { "navigationBarTitleText": "修改手机", "backgroundColor": "#1c2024" }, "pages/user/profile": { "navigationBarTitleText": "个人资料", "backgroundColor": "#1c2024" }, "pages/user/center": { "navigationBarTitleText": "用户中心", "backgroundColor": "#1c2024" }, "pages/cms/index": { "navigationBarTitleText": "单页", "backgroundColor": "#1c2024" }, "pages/user/feedback": { "navigationBarTitleText": "反馈意见", "backgroundColor": "#1c2024" } }, "globalStyle": { "navigationBarBackgroundColor": "#000000", "navigationBarTitleText": "ColorUi for UniApp", "navigationStyle": "custom", "navigationBarTextStyle": "white" } };exports.default = _default;

/***/ }),
/* 8 */
/*!************************************************************!*\
  !*** /Users/zxx/Local/mychat社交/pages.json?{"type":"stat"} ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__083FA8C" };exports.default = _default;

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 15 */
/*!**************************************************!*\
  !*** /Users/zxx/Local/mychat社交/common/config.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.timeout = exports.pingInterval = exports.avatar = exports.logo = exports.title = exports.webSocket = exports.cdnUrl = exports.apiUrl = void 0; // api调用目录
// export const apiUrl = 'https://api.mymoyi.cn/api/moyichat/'
// export const apiUrl = 'http://modi.com/api/moyicosmic/'
// api调用目录
// export const apiUrl = 'https://api.mymoyi.cn/api/moyichat/'
var apiUrl = 'https://api.mymoyi.cn/api/moyicosmic/';
// export const apiUrl = 'http://192.168.43.15/api/moyicosmic/'


// cnd域名。没有就填写后端域名
// export const cdnUrl = 'http://modi.com'
// export const cdnUrl = 'https://api.mymoyi.cn'
exports.apiUrl = apiUrl;var cdnUrl = 'http://cdn-fyx.mymoyi.cn'; // 七牛云
// export const cdnUrl = 'http://192.168.43.15
// export const cdnUrl = 'https://moyioss.oss-cn-shanghai.aliyuncs.com'

// webSocket

// export const webSocket = 'ws://modi.com:8282'
exports.cdnUrl = cdnUrl;var webSocket = 'ws://api.mymoyi.cn:8282/';
// export const webSocket = 'wss://api.mymoyi.cn:8282/'
// export const webSocket = 'ws://192.168.43.15:8282/'

// 网站标题
exports.webSocket = webSocket;var title = 'MoYiCosmic 0.1';
// logo使用base64编码
exports.title = title;var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAADAFBMVEUAAAD///////////////////8vLy////9aWlr///////////81NTX///8yMjL///////////////9oaGj////d3d1qamr///////+ampr///9JSUn///9JSUltbW3///9ycnL////g4OD///8rKytHR0f///////////////+1tbVqamr///+zs7OWlpYfHx+GhoZKSkpHR0ckJCTd3d3e3t65ubm0tLSCgoL////29vbf39+zs7OHh4ebm5toaGiAgIBcXFwgICD////i4uLx8fHd3d2/v7+UlJRlZWVnZ2fe3t7b29u3t7eAgICFhYU4ODje3t7////u7u7f39/19fX///+VlZW/v7+AgIBKSkr////////////////w8PDAwMC0tLS+vr7e3t6+vr5/f398fHyOjo7////39/fs7Oz////////////k5OTw8PDZ2dny8vLi4uLd3d20tLTLy8t/f395eXnNzc20tLRFRUUcHBz////////v7+/Z2dnf39+4uLjJycnKysrAwMCVlZW1tbW4uLiVlZVISEj7+/v////29vbg4OD09PTk5OTe3t6zs7Pj4+Pl5eXc3Nx+fn6Xl5d1dXWioqL////////19fXe3t7b29vk5OTAwMB+fn6BgYF/f3/KyspLS0ugoKB3d3f6+vr6+vr39/f19fXt7e3l5eXMzMz////V1dXV1dXOzs7o6Oi+vr6Tk5OlpaW1tbXo6Oj///+lpaXm5uaTk5Pg4OCVlZW7u7tdXV10dHSLi4u1tbW0tLT////4+Pj19fX8/Pzv7+/t7e3h4eH39/f4+Pjr6+ve3t7////j4+Pn5+f4+Pj+/v719fWwsLDW1tbT09Pj4+OTk5N/f3/d3d2enp7t7e3g4OD39/ft7e3////Z2dmvr6+8vLzLy8vz8/Pd3d2hoaG/v7/////29vb09PT////ExMSAgIDJycmlpaX////FxcXNzc3GxsakpKTn5+fCwsKqqqqlpaX////////29vacnJz///9dOpxhAAAA/3RSTlMA+Pz6/vUD5QPr1u8G0wft3tzzE+JrCPfgJ9Ab6BQPxwzxfcwODfLEvbpmGthLNB0YEAsKcGJaUyvOrHJFJh8fGxkSv5aUj2s5KyWDfDsj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';
// 次要样式	文字 图标的颜色
exports.logo = logo;var avatar = cdnUrl + '/assets/img/avatar.png';
// 本地端主动给服务器ping的时间, 0 则不开启 , 单位秒 
exports.avatar = avatar;var pingInterval = 0;
// 超时时间 超出时间段将重连系统 单位秒
exports.pingInterval = pingInterval;var timeout = 30;exports.timeout = timeout;

/***/ }),
/* 16 */
/*!**********************************************!*\
  !*** /Users/zxx/Local/mychat社交/common/db.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.get = get;exports.set = set;exports.del = del;exports.clear = clear; //取值
function get(key) {var sync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  try {
    if (sync) {
      var data = uni.getStorageSync(key);
      if (data.data && data.type == 'object') {
        return data.data;
      }
      return data;
    } else {
      var _data = '';
      uni.getStorage({
        key: key,
        success: function success(res) {
          _data = res.data;
        } });

      return _data;
    }
  } catch (e) {
    return false;
  }
}

//赋值
function set(key, value) {var sync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  try {
    if (sync) {
      return uni.setStorageSync(key, value);
    } else {
      uni.setStorage({
        key: key,
        data: value });

    }
  } catch (e) {

  }
}

//移除
function del(key) {var sync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  try {
    if (sync) {
      return uni.removeStorageSync(key);
    } else {
      uni.removeStorage({
        key: key });

    }
  } catch (e) {
    return false;
  }
}

//清空
function clear() {var sync = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  try {
    if (sync) {
      return uni.clearStorageSync();
    } else {
      uni.clearStorage();
    }
  } catch (e) {
    return false;
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 17 */
/*!***********************************************!*\
  !*** /Users/zxx/Local/mychat社交/common/api.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.logout = exports.wechatLogin = exports.feedbackPush = exports.cmsGetDetails = exports.changeMobile = exports.changePassword = exports.editProfile = exports.cosmosPush = exports.cosmosLike = exports.addReview = exports.getReviewList = exports.getCosmosUserList = exports.getCosmosList = exports.getUserInfo = exports.friendsList = exports.sendBindMobileCaptcha = exports.sendLoginCaptcha = exports.refreshUser = exports.mobileLogin = exports.login = exports.init = exports.uploadFile = void 0;var _config = __webpack_require__(/*! ./config.js */ 15);


var db = _interopRequireWildcard(__webpack_require__(/*! ./db.js */ 16));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;} //引入common

/**
 * post请求
 */
var post = function post(method, data) {var _success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};var _complete = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  var userToken = '';
  var auth = db.get("userInfo");
  if (auth) {
    if (auth.expiretime > new Date() / 1000) {
      userToken = auth.token;
    }
  }
  uni.request({
    url: _config.apiUrl + method,
    data: data,
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': userToken },

    method: 'POST',
    success: function success(response) {
      var result = response.data;
      switch (result.code) {
        case 0:
        case 1:
          _success(result);
          break;
        case 401:
          db.del("userInfo");
          console.log('pluse login');
          uni.reLaunch({
            url: '/pages/user/login' });

          break;
        default:
          uni.showToast({
            title: result.msg,
            icon: 'none',
            duration: 2000 });

          break;}

    },
    complete: function complete() {
      _complete();
    } });

};

/**
    * 
    */
var uploadFile = function uploadFile(filePath) {var _success2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};var _fail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'image';

  var formData = {
    file: filePath };

  var auth = db.get("userInfo");
  var userToken = '';
  if (auth) {
    userToken = auth.token;
  }
  uni.uploadFile({
    url: _config.apiUrl + 'Common/upload',
    filePath: filePath,
    fileType: type,
    name: 'file',
    header: {
      'token': userToken },

    formData: formData,
    success: function success(uploadFileRes) {
      _success2(JSON.parse(uploadFileRes.data));
    },
    fail: function fail(error) {
      _fail(error);
    } });

};

// 初始化
exports.uploadFile = uploadFile;var init = function init(data, success, complete) {return post('init', data, success, complete);};

// 登陆
exports.init = init;var login = function login(data, success, complete) {return post('user/login', data, success, complete);};

// 手机登陆
exports.login = login;var mobileLogin = function mobileLogin(data, success, complete) {return post('user/mobileLogin', data, success, complete);};

// 刷新用户
exports.mobileLogin = mobileLogin;var refreshUser = function refreshUser(data, success, complete) {return post('user/refreshUser', data, success, complete);};

// 发送登陆验证码
exports.refreshUser = refreshUser;var sendLoginCaptcha = function sendLoginCaptcha(data, success, complete) {return post('sms/sendLoginCaptcha', data, success, complete);};

// 发送绑定验证码
exports.sendLoginCaptcha = sendLoginCaptcha;var sendBindMobileCaptcha = function sendBindMobileCaptcha(data, success, complete) {return post('sms/sendBindMobile', data, success, complete);};

// 关系列表
exports.sendBindMobileCaptcha = sendBindMobileCaptcha;var friendsList = function friendsList(data, success, complete) {return post('social/friendsList', data, success, complete);};

// 关系用户信息
exports.friendsList = friendsList;var getUserInfo = function getUserInfo(data, success, complete) {return post('social/getUserInfo', data, success, complete);};

// 宇宙列表
exports.getUserInfo = getUserInfo;var getCosmosList = function getCosmosList(data, success, complete) {return post('cosmos/getList', data, success, complete);};

// 宇宙列表
exports.getCosmosList = getCosmosList;var getCosmosUserList = function getCosmosUserList(data, success, complete) {return post('cosmos/getUserList', data, success, complete);};

// 宇宙回响
exports.getCosmosUserList = getCosmosUserList;var getReviewList = function getReviewList(data, success, complete) {return post('cosmos/getReview', data, success, complete);};

// 宇宙回响
exports.getReviewList = getReviewList;var addReview = function addReview(data, success, complete) {return post('cosmos/review', data, success, complete);};

// 宇宙标记
exports.addReview = addReview;var cosmosLike = function cosmosLike(data, success, complete) {return post('cosmos/like', data, success, complete);};

// 宇宙推送
exports.cosmosLike = cosmosLike;var cosmosPush = function cosmosPush(data, success, complete) {return post('cosmos/push', data, success, complete);};

// 编辑资料
exports.cosmosPush = cosmosPush;var editProfile = function editProfile(data, success, complete) {return post('user/editProfile', data, success, complete);};

// 修改密码
exports.editProfile = editProfile;var changePassword = function changePassword(data, success, complete) {return post('user/changePassword', data, success, complete);};

// 修改手机
exports.changePassword = changePassword;var changeMobile = function changeMobile(data, success, complete) {return post('user/changeMobile', data, success, complete);};

// 获取CMS详情
exports.changeMobile = changeMobile;var cmsGetDetails = function cmsGetDetails(data, success, complete) {return post('cms/getDetails', data, success, complete);};

// 反馈推送
exports.cmsGetDetails = cmsGetDetails;var feedbackPush = function feedbackPush(data, success, complete) {return post('feedback/push', data, success, complete);};

// 微信登陆
exports.feedbackPush = feedbackPush;var wechatLogin = function wechatLogin(data, success, complete) {return post('user/wechatLogin', data, success, complete);};


// 退出登陆
exports.wechatLogin = wechatLogin;var logout = function logout() {return post('user/logout');};exports.logout = logout;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 18 */
/*!**************************************************!*\
  !*** /Users/zxx/Local/mychat社交/common/common.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.timeToDate = timeToDate;exports.exitLogin = exitLogin;exports.getBase = getBase;exports.CDN = CDN;exports.errorToShow = errorToShow;exports.respond = respond;exports.saveUserInfo = saveUserInfo;exports.userInfo = userInfo;exports.addRecord = addRecord;exports.getRecord = getRecord;exports.updateRecordState = updateRecordState;exports.getUserInfo = getUserInfo;exports.addUserInfo = addUserInfo;exports.getNewMessageList = getNewMessageList;exports.addNewMessageList = addNewMessageList;exports.readNewMessageList = readNewMessageList;exports.isRoute = isRoute;exports.testString = testString;var db = _interopRequireWildcard(__webpack_require__(/*! ./db.js */ 16));
var api = _interopRequireWildcard(__webpack_require__(/*! ./api.js */ 17));

var _config = __webpack_require__(/*! ./config.js */ 15);function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;} //引入数据库操作




/**
 * 失败提示
 * @param {String} msg 提示消息
 * @param {Function} callback 回调函数
 */

function errorToShow() {var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '操作失败';var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  uni.showToast({
    title: msg,
    icon: 'none',
    duration: 2000,
    mask: true });

  setTimeout(function () {
    callback();
  }, 2000);
}
/**
   * 交互反馈震动加音频
   * @param {Object} src
   */
function respond(src) {
  if (!src) {
    src =
    'data:audio/mpeg;base64,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';
  }
  // 短震动
  uni.vibrateShort({});
  // 播放提示音
  var innerAudioContext = uni.createInnerAudioContext();
  innerAudioContext.autoplay = true;
  innerAudioContext.src = src;
  innerAudioContext.onError(function (res) {
    return false;
  });
  innerAudioContext.play();
  return true;
}


/**
   * 添加cdn
   * @param {Object} srcUrl
   */
function CDN(srcUrl) {
  if (srcUrl) {
    if (srcUrl.substring(0, 9) == '/uploads/') {
      return _config.cdnUrl + srcUrl;
    }
  }
  return srcUrl;
}

/**
   * 用户信息
   * @param {Array} data 用户数据
   */
function userInfo() {
  return db.get('userInfo');
}

/**
   * 保存登陆状态
   * @param {Array} data 用户数据
   */
function saveUserInfo(data) {
  data.userInfo.avatar = CDN(data.userInfo.avatar);
  db.set('userInfo', data.userInfo);
}

/**
   * 添加聊天记录
   */

function addRecord(id, data) {
  var name = 'Record_' + id;
  var rec = db.get(name);
  console.log('新增聊天记录addRecord');
  if (rec) {
    rec.push(data);
    db.set('Record_' + id, rec);
  } else {
    db.set('Record_' + id, [data]);
  }
}


/**
   * 添加聊天记录
   */

function getRecord(id) {

  console.log('getRecord');
  var rec = db.get('Record_' + id);
  if (rec) {
    console.log('recc', rec);
    return rec;
  } else {
    return [];
  }
}

/**
   * 更新聊天记录状态
   */

function updateRecordState(data) {
  console.log('试图更新聊天记录状态');
  var id = userInfo().id;
  console.log('updateRecordState', data);
  var record = db.get('Record_' + data.form);
  console.log('record', record);

  if (data.to == chat.id || data.form == chat.id) {
    var _record = this.record;
    for (var i = _record.length - 1; i >= 0; i--) {
      // 查找ID
      if (_record[i].id == data.id) {
        this.record[i].state = data.value;
        i = 0;
      }
    }
  }

  if (record) {
    // 开始查找数据
    for (var i = record.length - 1; i >= 0; i--) {
      if (record[i].id == data.id) {
        console.log('找到数据更新完成');
        record[i].state = data.value;
        db.set('Record_' + data.form, record);
        i = 0;
      }
    }
  }
}

function getUserInfo(id) {
  var rec = db.get('uid_' + id);
  if (rec) {
    return rec;
  } else {
    var info = userInfo();
    if (id == info.id) {
      return info;
    } else {
      return { 'id': 0 };
    }
  }
}


function addUserInfo(arr) {
  // let rec = db.get('uid_'+arr.id);
  // if(arr.user_id){
  // 	arr.id = user_id
  // }
  db.set('uid_' + arr.id, arr);
}


function addNewMessageList() {var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '1';var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "消灭人类暴政！世界属于三体！";var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "text";var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Date().getTime();var count = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var user = getUserInfo(id);
  console.log('试图添加NewMessageList', user);
  var tips = {
    count: count,
    value: value,
    type: type,
    time: time };

  if (user.id == 0) {
    api.getUserInfo({ id: id }, function (res) {
      if (res.code) {
        db.set('uid_' + id, res.data);
        addNewmsg(res.data, tips);
      }
    });
  } else {
    addNewmsg(user, tips);
    // if(list){
    // 	for (var i = list.length - 1; i >= 0; i--){
    // 		if(user.id == list[i].user.id){
    // 			tips.count += list[i].tips.count;
    // 			if(tips.type=='tips'){
    // 				tips.time = list[i].tips.time;
    // 			}
    // 			list.splice(i, 1);
    // 		}
    // 	}
    // 	list.unshift({user:user,tips:tips})
    // 	db.set('NewMessageList',list);
    // }else{
    // 	db.set('NewMessageList',[{user:user,tips:tips}]);
    // }
  }


}

function addNewmsg(user, tips) {
  var list = db.get('NewMessageList');
  if (list) {
    for (var i = list.length - 1; i >= 0; i--) {
      if (user.id == list[i].user.id) {
        tips.count += list[i].tips.count;
        if (tips.type == 'tips') {
          tips.time = list[i].tips.time;
        }
        list.splice(i, 1);
      }
    }
    list.unshift({ user: user, tips: tips });
    db.set('NewMessageList', list);
  } else {
    db.set('NewMessageList', [{ user: user, tips: tips }]);
  }
}

function getNewMessageList() {
  console.log('NewMessageList');
  var list = db.get('NewMessageList');
  if (list) {
    return list;
  } else {
    return [];
  }
}
function readNewMessageList(id) {
  var list = db.get('NewMessageList');
  if (list) {
    for (var i = list.length - 1; i >= 0; i--) {
      if (id == list[i].user.id) {
        list[i].tips.count = 0;
      }
    }
    db.set('NewMessageList', list);
  }
  uni.$emit('reMessgaeList');
}

/**
   * 判断当前路由
   */
function isRoute() {var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/pages/index/index";
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  if (route == page.route) {
    return true;
  } else {
    return false;
  }
}

function getBase() {
  // let arr ;
  return {
    cdnUrl: _config.cdnUrl };

}

function exitLogin() {
  db.del('userInfo');
  console.log('尝试关闭socket');

  uni.onSocketClose(function (res) {
    console.log('WebSocket 已关闭！');
  });
  uni.reLaunch({
    url: '/pages/user/login' });

}
function timeToDate(time) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (time < 9999999999) {
    time = time * 1000;
  }
  var timeDate = new Date(time);
  var currentTime = new Date();
  if (currentTime.getYear() == timeDate.getYear()) {
    if (new Date(time).toDateString() === new Date().toDateString()) {
      var hours = timeDate.getHours();
      var minutes = timeDate.getMinutes();
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      return hours + ':' + minutes;
    } else if (new Date(time + 86400).toDateString() === new Date().toDateString()) {
      return '昨天';
    }
    return timeDate.getMonth() + 1 + '月' + timeDate.getDate() + '日';
  }
  return timeDate.getYear() + '年' + (timeDate.getMonth() + 1) + '月';
}



/**
   * 字符串效验
   * @param {String} str 字符串
   * @param {String} model = [number|mobile|name|idcard|] 模式
   * @example 
   * testString('17080057443','mobile')
   */

function testString(str) {var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (typeof model == 'number') {
    if (str.length >= model) {
      return true;
    }
  } else {
    switch (model) {
      case null:
        return false;
        break;
      case 'idcard':
        return RegExp(/^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/).test(str);
        break;
      case 'mobile':
        return RegExp(/^1[0-9]{10}$/).test(str);
        break;
      case 'name':
        return RegExp(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/).test(str);
        break;
      default:
        return false;
        break;}

  }
  return false;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 19 */
/*!**************************************************!*\
  !*** /Users/zxx/Local/mychat社交/common/socket.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.connect = connect;var common = _interopRequireWildcard(__webpack_require__(/*! ./common.js */ 18));
var db = _interopRequireWildcard(__webpack_require__(/*! ./db.js */ 16));


var _config = __webpack_require__(/*! ./config.js */ 15);function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;} //引入参数操作





var test = 'ok';
var state = 'fail';
var time = 0;
function connect() {
  console.log('尝试重启', state);
  var newTime = new Date().getTime() - time;
  // 时间超过30秒未沟通允许重启
  if (state != 'connect') {
    var userInfo = common.userInfo();
    uni.connectSocket({
      url: _config.webSocket + '?id=' + userInfo.id + '&token=' + userInfo.token });

    uni.onSocketOpen(function (res) {
      state = 'connect';
      console.log('WebSocket连接已打开！');
      if (_config.pingInterval) {
        ping();
      }
      time = new Date().getTime();
      console.log('time', time);
      uni.$emit('socketOpen');
    });
    uni.onSocketError(function (res) {
      state = 'fail';
      uni.$emit('socketError');
      console.log('WebSocket连接打开失败！');
      // common.errorToShow('WebSocket连接打开失败，请检查！');
    });
    uni.onSocketMessage(function (res) {
      try {
        // console.log('onSocketMessage',res)
        time = new Date().getTime();
        res = JSON.parse(res.data);
        if (res.code == 401) {
          state = 'fail';
          console.log('未登陆');
          common.exitLogin();
        }
        uni.$emit('socketMessage', res);
      } catch (e) {
        console.log('接受到错误格式消息');
      }
    });
  } else {
    console.log('WebSocket正常状态无需重连');
  }

}

function ping() {
  console.log('主动ping给服务器');
  uni.sendSocketMessage({
    data: JSON.stringify({ type: 'ping' }) });

  setTimeout(function () {
    if (state == 'connect') {
      ping();
    }
  }, _config.pingInterval * 1000);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 20 */
/*!*************************************************!*\
  !*** /Users/zxx/Local/mychat社交/common/audio.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.palys = palys;var audioArr = {
  audio_1: 'data:audio/mpeg;base64,SUQzBAAAAAAAP1REUkMAAAASAAADMjAxOS0xMi0yOSAxNDowMQBUU1NFAAAADwAAA0xhdmY1Ny40MS4xMDAAAAAAAAAAAAAAAP/7UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEluZm8AAAAPAAAAIQAAG8AADg4OFhYWHh4eJSUlLS0tNDQ0PDw8Q0NDS0tLUlJSWlpaYWFhaWlpcHBweHh4f39/h4eHj4+PlpaWnp6epaWlra2ttLS0vLy8w8PDy8vL0tLS2tra4eHh6enp8PDw+Pj4////AAAAAExhdmM1Ny40OAAAAAAAAAAAAAAAACQAAAAAAAAAABvAzxxPcgAAAAAAAAAAAAAAAAAAAAD/+1BkAADxUwA96CEYABXAB4AAAAAD0AMRgIRgAHiAYMAAiACWSaORyOJI4OSXB80GLUoz6Edxz9CWIKf9x/lx78Hwfy4Ph/PifrB/l30///////9KcuXfnwfJ58Pk8Tg+/B8PmONgANCCcS1mrXLftdE76M/n/W//IfV8/n+r6z/8f+UFnMIH7JdeIOcWaSmXiB0+JKw+6pSdkW7O+spYXWAESfu0XAJJMnjk09x7YmmfdwBaSJK4s9IVF0OyPT6f/5ehfolcugAgOLSQKHBA//tSZBeNgdYqxIhGGlA5pYjGBSNeBWwrJhSBAAC8hWVCkjAA6OS5AJrKYP9ClLegAt6oAbB843C0ciBilBQwvOoRzYMLtrt19xAoogdS5GG21BQxkJ8RC6//6V+uaF+5oiUDPn1BiX7yZd/H/BFRQuCthSJnxIo+ExGPlx4BNbBMUefJ3G5CoxjWmzSm3a3ooVpfWHhGaz3//c9tGgARMjopzAjQ48TPvghOg/EYwo6QlDiioYsjDQfQlZ+66B606SCMPF1+/IHkh/55OV/xbcn/+1JEBoABaErRhgVAAC1H2hDBHAAFSPNnfPKACK0eakOUcAAJ/7YsEIDYqgL//jd0X/+Z4vBDJf//0/PEWF+P////JHvPvLYrC2OVWNQ5P0MHH/kDDDPmVxuNzigkf38w7r/+8vRiBhn//7egBBb/5eQCSSRoRd/bX/+Ne13unxvBuB0VEjKzIahv5vm+3//////////6IMEgFymL/mznNGIHyRymp12pqbN0dTZps47oa1Dpprf/9fbq2ps7///U1SIhChWum/9ocECEsAAOif/7UkQFAAFRPNppIRRkKKerHRTFOIVA82ejKEwQsZ5sdHQIqod82WnqrVPaS6SaZrJL/fi/+v//0Hf+Shy/////6FJDSjawywSyRoAKFX8jnI67k+WcIIr030f/19GMPX/6/1//6/////flAFptraHIJFGyAC3iWfI28ikS7h0SbaiMT/tR1pwRaJ/7+9k/+n////f+ihdttsHpZWJUABzDO6spTjyiwv4mOMjFn618rvt97Cv/7f//13/Vf19+ze9CQ1V221hNwJBwgDB6VXpb//tSRAaAAWY82O0goAQsJ5rtoZQAxX01bBhTgAClh3A3FGACpCITITg8LihCdGfsR2df/T7f7///zf//RF/ulKoiHCpaK4HW3Aw0ABkay+4vNwMfCAIcFlOER6n206/X2K+c///X///////51IULj//wjDkJFo0ICMW59P6qn/s7Mf/8xFRP/9Eanp/9r6Gudf//b7s7lgA/63CQAYC3STUCiyRiRsAAAD+voHkV4GV8mmCr+9Bm8ICbwyNKI8PlPsxL1/Sq3/2yKAEAYADHgon/+1JEBYEBW0jd7xjgBCuJG13jFACE1F+Rp4UNMKCMLnTApapOCAI4GT03DGOLwjVv///VL//////oV/////////uJQ7d9dkCIGJQAHyuTAelp2nmpk3crEL//3/6///+l2//GiRH8jf///////gokP//4h9rZ/l/OXQNQfTO32iQ4U0i7+n9yl+dHGAJgHIARvqRxGj6rbLaghHBAARk4siDsE0EwWQvrIYyN9P/Lv9owoJFw5/6wi//////sRTaZdIYlUCFABj8qbOGXkPtoeP/7UkQJAAFvJNt7I2mwL8kquD0KNgVMlXfkgLRApSRwdFALzkcHo4lmIFmTqtnH//7A8g7EVf/nv/Pf////99H7eBBBl691aMLC5kKrxZMSF8Cutu7P//PcGAazv/oo7/5f//////q3/v//lsoRk7dkFL7DS4AmAeCjuXoLgrsEFzUdaVO9o/C/XS/6hn/9Af/qDf///7vyk6n/vSV0AKMAkK9CgAEqjnIrsJyNDlSX///oP/9545xcl90YdZX////8UVWRCKJRwAqAsJQrFRj1//tSRAaAAVMk3WhpEVQppLtlGAWCBTEleaOAXlC9Em50waiiD4aOnLzd5iQWZ6NzKxv+hf/6gmtt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',
  audio_2: 'data:audio/mpeg;base64,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///5QIHEDHKSAKUAABScVQqJjXDhDIVFGT//5DKXazUN+V8r//2/9H//iInWf9kI3ywIC6BMKOBh5GjXkQgJgEz/p8PBoKMMLnQXDuJf1D3/////QKaISatZExJF0hCwW20o9eUH/YOvTqvt4UYUFTSbB/4v//////t/4M7//4mDdYxNsg0MkAAAjOQkhcvU00hFqp5EIOj/+1JECwABVEjbaUA/JC/G2y08yiIF7SVvtIUAELeOb7aQcAYCtv7+rizYjJDzeM/6t/9f///CYdsH/5HA6wCAHtlTH+VgTWUrV5NiQip+3hMGotFnZ6ceP+RiMv////0/3/8qT///BaoS2kAGwAIADVyMeH79tZiVyER5GA0Y3/5DMarK2pIXfT////////+3/////UcKPop97PRmwQSOsQ2BgyiCEo7dpHUG4wJDP6N5SDsSyZiDiNjYz+R//7er6f//UPWUlI+9phkrChgqBP/7UkQFgAFCTVoGHaAAKaObEMacAAV4yXAYlQAAp6auAwZQAKojFI41Eft+3bU3/+h/////+r/////8d//WNP/nkRdWI+GwWSnPvap0xOwXjpf/oDdQbisPSVakq9al2s/+ijnyFPv6f//ZNJUhkRuFYTog4rXh4e67vr+yGS05C1x+P3WGZfh6O////0Mb5Qt8oW//8RQXHxGg2+l/ghRj2H4bEAapsTfGvsSkKbjG////7/V+tf/7/6f+n/m/8TWtCWNiOBgiAOg5EI0XgKSO//tSRAgAAVMw328YoAQyKRuN4ygABQjDb6eM5oCvjG40ZKmSjydvrFk+IU+IAreUVLlH/ov/////+MX///1eob9rB9MOpgtKiQ5MRqUzP+conjS6OLnAs/i90TzjqD4a/r//////yqf+c3/////YsU8Ik6fg4IAAFYvgRbkZW0R1GhvbGts+C97+UndTzjcIBn+//////+hepCSo0KkMoESO7nBQrE3Ie3fJhL8T9yai5UBv+VZHq1jsZlv/V/+S+j//4PowTADECD+r5HOZLQv/+1JEBgABVDFYyeNpoC4pG60kRzqFHMOFoBhBcKiMbbSFJhgxCA7Grz2PyHoDR/Jx/7u1QH5X9D//////i2/f//6rWI6hQ6nU0QlDWBLLXOdNsGmIlOwcwCH80t2s3Cpv/zP+f////Lf/b/////qPMLDdqsnTAmkOWYOELVpsraRcfB2vhf4MfXMqYYb+X//////Bivs//+EpCG2RApAIABxTahOJnm4SbiTdwj1yAfgBf6MtqzMLGT7nf/+jyDv///CVtIdsEKAgQgEA4o3NK//7UkQGgAE4SGBowRPkJCYcLBwC04S8w2cjgFwAmgsw9DKNNt7iq0Th3wc8X8//n/82v////+rf//////+LkZkjQFwIAeEAQiAbkDDRwalBsaRHnNZa/U7/bXOtUKG///6j+H6cghCHElQmGgiBA9TOrIfhOWfjglt+V/+FTf/t///xP0f//BCYr73fTEBBgKMBPjMMLcZzD5ripypwLt4gzRuMDcWd///62f//+XWwAOkUMKiUELqpcVjGnVlGca+YoFP6t/46X/+e//r/gi/R//tSRBEAASow2ujgFwAihhrASAfSBLx7d6OAVhCZjG20YR1S//8FlPTE8AqoeUUXS6zZZ7KSvWW3/H5P/rFDjB///xOGPp//+FbWba3QwpUCQbmhU4qyIjUSVGkwFDmoVUS/9sE//qBeW//T///8fWBY2q1QAE4KJtogaB9Aq8wbkE4enHAg/lC/yxr4n////R9P//wW2k2ymMEcQAEJIDGBkIdqy06g7Jqgh/T/4eJ9Hr//Lf///CAoUjbplABYAjRSYlaQqeNWL2Dy+JGSb/z/+1JEHYEBFxjg6GEqLCXCu20AyASEZGOLpIRs8JYYq4DxqOjCuG6d4kkKw3///8Q/ZdHtpAZWBSBk+gQ0YC6MUNnm3OIRhXwra/EMjJla+Hf///5DN91UxDoKPRHzQyxax2sqCDEGOmuqZV//DAm/t//////oX///+lWaypsl3PuK9IunKILVLnG+m6idU1woR/6RGFJv1f/////5EL/ychEgRhYcEiYNY1mJFHU41u07T1YSv5Vv/A4h/P6f/p/cG+j//4M1kWWSowQAgAwlKv/7UkQrAAErMNSDB2nwJgYbnRwF4IRsw3OjgFwwmZhuNFCU2jwvEMgQLsyFd9Vzcv/Kfn+Uf+R////Qf6bELagBK3ZCgjRgWQZG0zME1r+O/jR308Bwz/7f9f///xop9H//xioVCy2aOgAFgapEObqEA7QrKPkRUkQA/hh/m8E7///7/v//8uOB/oO+DROWMpnGDDOoI2lRsF3IHAU/KN/4P/bj///8b6P//g/jNLBw0rYUKZCFbKWkmOt6AV1/GZN/zRSCT/p//////iORfV////tSRDaAARsYXegGEDwkxhs9CALgBMDFUABhQICHjG90UArG9W1Y2gyYlDBIVo0OAUTHadKDtaSCcH/o2JH+JP//iH///5DmY9xOAQwyk1r3tT0VdA6CuFj/K//WIco///6hn///qGZwgCOBQxwPxQox2QuyHyZae1iMHCQ3WH6N/4QJ///9P///wW8M4xDIkkxx5o4GSHvv1G2SehUDKfr/8hf/7///6Df//////+LXN/YzefSCSruJ1trD0lM7tNMokAda78ob/2Lgz///////+1JERQARBTDVgaAukCPjGuUhJXQEqSNhJQBcAJmYKkGEHPD/yrP///VVpKgiJIAVqkAhQNBo6mdEKiEwtm88lALF2+jZAPd6P//iH///4IVzhFh3gLVBa5ogU0dbKP3NEvSIq35SP/+KyTv//+UM/f//6/MEx7hler1nAvruFVfqIgcBq/1N/5ES/+v///Qf///////oFNeZiUhpAGBAWjFRAfJj2n8izedOfqTK3/WJaW///9A76v//lvNnDSInV7nCPUCTMvUMcCRU31f/Sf/7UkRTAPEtGNXJQD2AI2YqcEwF0gSNI1AGgFwAjpipAUAfSL/6X/3/1N///9////BhohEVbsUAAAA+sTw1Gw1l4hh3fIZq97GwZ1+4lCp9Ys1D////U31Uh4A4CCUxa7a4LitPEzyafaG8AGM922BpY5dk4ms////9H///xkf4EzfwIL4U5cCDRkLocXuM/ohIA7yXernW/6h8Nv///iP///7lkkTf2MuzFRyKjKqz9uKFnyjkvUumKQHMykdxz/5AP///////8osiMkikhxFC//tSRGEAARtI04GgLwAmAksdAYgFhLg7XSSZh0CVjGpU8bTozCRJLRSqmP9qi4w1cFAQQzpXJfDn0///J////JyoNVTNUMLCa1kIsyLupOwDq8yjSyjAE/jH+/jH6P//5H6bYZKnTA4EgRksJQT0NfKrTGxLOyhDgf8jf+Ewzqq//+LfR//8GQgEWVCoAAABopOUADIGY1YxW6Bk1DTUmuyRX/TLV+k/Jzf//8fy6bgKsH3S9yYPW4w76kyVBVFNvqb/xpX/9v//9Rv///////H/+1JEbQEBLzDUAwk54CPB22wYWHOEPGNnpISqcJYMbXRhFWaQwbgAAfDc6TRgCcigmmaO6lIqMdvoEY351//ctf//4M96v//pup2CeTEsgJCPDB1BxCOX4+AaKRAD+nKP/8X/1//7/6Cf///hdRobNrlKgEmBrDD1nNzUlmpbrUOLzOd0jf3CLfXxrv///W77v//AGEDS+lX7GA4h/bi7v8Fh8+FzETxxg4TNP6n/6BMf6v//l////WQy1I1kjhNccYHFbmVFdNbVkF7pJFQK8v/7UkR7AAEoMNVpoBaUJMkaQDQC4ASIwU0pgFpAkhht9CAKxv+e/8mv/9f///G///9QSy7i5OZ6GyL5mquzNEipzOtKocgCizbOmn/oLG///+Lf//+tlY10OFscTAF5hxlYVBOiE5bhmUPTUaDHzfGgf9Pr//Ffkv//jwwIoTA4AE2BoJyBcsDSA4VU80o1tvad+wqLv/yv///Ub9///oVSOkgUQNI2tfrcwLuaHnrMA7gCYYL+psLHf/M/6f/9f9C////////UaGBAROOG3AA1//tSRIgAATMYW2gJKHwl4xpVMQ06BLDDSqaAXACMDGlA9AkoKKSAwXKebyjIX3dt0L/5f6+Ipf+////6Cf///pWWHbNYi2xggLsQrMMPahXGcq5h40AXAP7fvgbf+gW/9//+n/f///////wrhkJJGAwAFgD/MJC1EJ1IHcIZuCF1uhierIGP5VzXWq1yj////EfxBRZbYoAJAAUF4sYLFhQODXJPKTGbkWT4P9P//////wZ50cI8AAhALhTNyYkuotddAcK1MmcIpKrtqk1v/Fz/+1JElAABKBjZ6EE6zCSGKr0cAtKFRSNABoD2AI+YqvBwC4ZL///GBv0K+fwAoEAo3vmFnVSGkPUMr19O9kNV8lJjUMAqU/X/UAO7///12wy7S22UQIDWGWlJZvE9K6vLm/TCz9nxaDR8kww261WNZQVK0smLCn9tCf///3/zgb///4gIcNIxLIgqGCAKMALNjWRq7HGWW8i7vqOi3s7dRSN/+oU40///4f9JiVZwaQ+wg6CiTJRkpqz5KDhuHuOqpMnA1BP9Tf9Y1zW3+pP/7f/7UkSegAFZSNlo4BUMJ4MaXTxnOIP0Y22igFRwkJhnQNAXSP6jf//////9AM9GswDVoOAAPWCcjpugbKnE1s0kEvLBFmt6Z//yaHj///BivpFZuzWd0lYQHOGHCyMcTUHQXj1I4Jwz/KFvc3xST/+b/l////jf//////+G5kGqhOID4N4TWWDZSjhbQLVQ5R7ywQU9+Sv/yHjz///hbPUAjJCYUGhA0PIkh0uYxU3WozkZyopUHb/p/8wv/9v/t/gi///////9hKIg/DYAADi8//tSRKmAASEY1MnjEzg1Jis9MeV1hOzDOAoA+kC9JGbBMAuAKg/CjCF2KJc4uhPUKNugkARDT8Yt/4jm///6jf///SJHbU6c/hDoK0KF5636mMhUu3hE36PQKf/5/+v///6P///////4uoZFsAgmmyCArLUOBVJ2VcXLolQUZ2cwVCKv6lrde4PRn+zVKfp3///+hH///5SVnbAIK2i0bwowmjbQMOjhL1czs7GiI5/3v+7A/5H//7P///VVVSUXC4NBG1PnVRzzEJiUXrQMwhT/+1JEqA8BHDDOAoAWkCuJCw0I4peEZME2CAC6QKYkajRwC4K9+g1BAM//I/9P///yj//b/////oNTiCqIgAxYulQU4LwgIi0GMUaio3mmbPqdReR+oyP/+M////UYSu2yUuNtAAeknLOn6qqTxMNZYXbZZ4N/Rvv4S//H+X//I////eQHbucKBZA9LhTCoCep+gpIhF0ERpRQU/yMd/6iJFLf+3//+gn6VQZGgvk8bmZI6u2S1QnR6lzIKhf6v/pnv/Wh/9v9X///////8QgEEP/7UkSwgBEzMU/JQBaQJskazBwFsYW8xUOgmOFAkIwp9JGVFA6AAPQsA/B6XQvTNkx5Vhc28rFv/K3+/UNBb///gj/qDZDjEAEkgQF6y4Rys11dSjg58X2s6A/hTq8LO/O+z+/rd///5cQXjIAkDWTgtYoJFq67uYuYicPE5P9aAv/rJp7/yJ///xgP8gpODIezyZ5wwYeomyB64LJVYxcdtQ7AEr/v390FP0///X///8GaCB0LcDlMxFnHQpqMUyoguTAU48+4+BYn/2Pf+Wmn//tSRLcAAVJIzIGgPYAjhhm4NALSBLR7V6AkofCXmGbkoAuA//+4r6BxLMjiACFJeJ1ki0Sqk7SN4DJPLbNbLOrGNf/QBgMBRF6///Bp4U2mWegBOZEUAkm52qsAoaqjBRgzrkAymMesFXcSlXbq1f+CteNQETF/hqAicgzSpY9LHolDSwWEqno8TA08qdKlgaw1j/8llRGAjQk6DRqJSx4REZYKuUDRaJTpU78Gg6VO4NHpU7EQmsDXxDhoDwDKD///+ZF81YHRG7/+gKihLiv/+1JEwIABJ0jOKkAXBCImCXU0AtIEqGE/poC0QJCYZmTQF0gyCwuIzJmf/iot/8WF2YqLN/W3/6xRv8UVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7UkTOgAEkGM2ozyuAI0YZYDQC0gS0YywGGKeAkAbmZBMMSFVVVVVVVVVVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSZNwIwSALRABgGQAlwFiAACIAAyyS2yCAdOBMgFmEAYwAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+1JkqQ/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==',
  audio_3: 'data:audio/mpeg;base64,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BgBS2UpZhDNbMzf///2XJp///+j/0A3///tSZIIJ0Vw6S0hcPRAc4np9ADCChVjnL6BwsMBZCenMALYKReskBNv/yl2+mz5WW4T///RVAEEDf//+qdg4h+2WLXMAgsMRQBMR7ENPg+LruQ38UobFt2////su3////9/gQAAAAFA3wgA9HrTBwClf5v+PrW4Vn9WcE///9P71XlEXZAmGFhsDiCMt3COtgODBHSARzgWT0Vt2////sv7f///99MM//sUkASAQQIAEL4w/jnYgckwZddNb//QdSKf//1L8v/8jgLnLlWJQAyr/+1Jkk43xajnJEB08oB2Emp0BQoaFwOcgIvRUQEmS6kAFChogAkQD8YBhEZ0v2fBCCAhaTwXcv1r0Vvqn///9m/f/////DHf/5IAAAAVgXAMAYvrWcNwagoj9OD4OD98H////3fxf/yeLHHuMNRlWMMAQMA0EowVANjCHQVMlAG8wFwCkkWfSByozoqf///6t////03/qDAXUQAK/tziQnwNT/+oopgzvM67///76f6//+U2hOEwsu4YFIAZhAAYCFI0wLwaxCAgX9UyYHDVDYP/7UmSkDYFrOcioXRUQG8S6XQGilIV06R4AdPKAZ4nndADmCkv////lb////+qKTqAAAAGBQwwBkEv1nBkwFdj4Z5rotDS3f6P/930ip/oacIHZQ8aPBgiJYkWBkJepu6G4cDCV7NGn3Ldgz8Tv0f+sl/1yoHgWRgAF93/cZ5/CH9rtYm6C1H97SZU59+8hAMAAA/94TcEN3W0SkUwUCzOh/J9uNBVtpyU2bXCf+HIYK/oL///6qQAAABqBdbAAEBnsn0zwG0U2aKw/h7q2X+nP//tSZLMPwZI5xoA9FKAaomotADCChmDnGgD4soBajajMBooaf9h6J5X/8coNf51lUgsQ5heHpnhoB9uLhh0B4GA5CSzpgrvXhX1u6f//6OJABGAqFV6ka9RHl0ORCozyX/Mn1VmDZCDKEAjF5rrL+0ruQQ0MwMCMxVDUxM841vF4wIAlTJL2UTssB76P////aAAAANQN8IADykEAetMQAUm/V1Dm1PwIabYhX//rmT/+f/PDOpK4YV2ygiALMBgEQwowKTBfVqOVIwKhsLABhqn/+1Jkvg2BeznGgD4VEBsCecoAOJCFAFscIAus0GoJ5ugA5gqi9Y5P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',
  audio_4: 'data:audio/mpeg;base64,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' };


function respond(src) {
  // 短震动
  uni.vibrateShort({});
  // 播放提示音
  var innerAudioContext = uni.createInnerAudioContext();
  innerAudioContext.autoplay = true;
  innerAudioContext.src = src;
  innerAudioContext.onError(function (res) {
    return false;
  });
  innerAudioContext.play();
  return true;
}

function palys() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tips';
  switch (type) {
    case 'tips':
      respond(audioArr.audio_1);
      break;
    default:
      break;}

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 21 */
/*!****************************************************!*\
  !*** /Users/zxx/Local/mychat社交/common/mysocket.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.test = test;console.log('myocket');

function test() {
  console.log('test');
}

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map