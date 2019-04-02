"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = exports.useDeps = exports.createApp = void 0;

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _reactMantraDi = require("react-mantra-di");

var _recompose = require("recompose");

var _app = _interopRequireDefault(require("./app"));

// export this module's functions
var createApp = function createApp() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _construct2.default)(_app.default, args);
}; // export react-mantra-di functions


exports.createApp = createApp;
var useDeps = _reactMantraDi.useDeps; // export react-komposer functions

exports.useDeps = useDeps;
var compose = _recompose.compose; //export const composeWithTracker = _composeWithTracker;
//export const composeWithPromise = _composeWithPromise;
//export const composeWithObservable = _composeWithObservable;
//export const composeAll = _composeAll;
//export const disable = _disable;

exports.compose = compose;