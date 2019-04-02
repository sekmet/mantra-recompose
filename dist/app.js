"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _reactMantraDi = require("react-mantra-di");

var App =
/*#__PURE__*/
function () {
  function App(context) {
    (0, _classCallCheck2.default)(this, App);

    if (!context) {
      var message = "Context is required when creating a new app.";
      throw new Error(message);
    }

    this.context = context;
    this.actions = {};
    this._routeFns = [];
  }

  (0, _createClass2.default)(App, [{
    key: "_bindContext",
    value: function _bindContext(_actions) {
      var actions = {};

      for (var key in _actions) {
        if (_actions.hasOwnProperty(key)) {
          var actionMap = _actions[key];
          var newActionMap = {};

          for (var actionName in actionMap) {
            if (actionMap.hasOwnProperty(actionName)) {
              newActionMap[actionName] = actionMap[actionName].bind(null, this.context);
            }
          }

          actions[key] = newActionMap;
        }
      }

      return actions;
    }
  }, {
    key: "loadModule",
    value: function loadModule(module) {
      this._checkForInit();

      if (!module) {
        var message = "Should provide a module to load.";
        throw new Error(message);
      }

      if (module.__loaded) {
        var _message = "This module is already loaded.";
        throw new Error(_message);
      }

      if (module.routes) {
        if (typeof module.routes !== 'function') {
          var _message2 = "Module's routes field should be a function.";
          throw new Error(_message2);
        }

        this._routeFns.push(module.routes);
      }

      var actions = module.actions || {};
      this.actions = (0, _objectSpread2.default)({}, this.actions, actions);

      if (module.load) {
        if (typeof module.load !== 'function') {
          var _message3 = "module.load should be a function";
          throw new Error(_message3);
        } // This module has no access to the actions loaded after this module.


        var boundedActions = this._bindContext(this.actions);

        module.load(this.context, boundedActions);
      }

      module.__loaded = true;
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this._checkForInit();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._routeFns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var routeFn = _step.value;

          var inject = function inject(comp) {
            return (0, _reactMantraDi.injectDeps)(_this.context, _this.actions)(comp);
          };

          routeFn(inject, this.context, this.actions);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._routeFns = [];
      this.__initialized = true;
    }
  }, {
    key: "_checkForInit",
    value: function _checkForInit() {
      if (this.__initialized) {
        var message = "App is already initialized";
        throw new Error(message);
      }
    }
  }]);
  return App;
}();

exports.default = App;