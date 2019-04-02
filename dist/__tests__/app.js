"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _app = _interopRequireDefault(require("../app"));

var _global = global,
    describe = _global.describe,
    it = _global.it;
describe('App', function () {
  describe('constructor', function () {
    it('should fail if context is not provided', function () {
      var run = function run() {
        return new _app.default();
      };

      var errorMatch = /Context is required when creating a new app/;
      (0, _chai.expect)(run).to.throw(errorMatch);
    });
  });
  describe('loadModule', function () {
    it('should fail if initialized', function () {
      var app = new _app.default({});
      app.__initialized = true;
      (0, _chai.expect)(app.loadModule.bind(app)).to.throw(/already initialized/);
    });
    it('should fail if there is no module', function () {
      var app = new _app.default({});
      var errorMatch = /Should provide a module to load/;
      (0, _chai.expect)(app.loadModule.bind(app)).to.throw(errorMatch);
    });
    it('should fail if module is already loaded', function () {
      var app = new _app.default({});
      var module = {};
      module.__loaded = true;
      var errorMatch = /This module is already loaded/;
      (0, _chai.expect)(app.loadModule.bind(app, module)).to.throw(errorMatch);
    });
    describe('has routes field', function () {
      it('should fail if routes is not a function', function () {
        var app = new _app.default({});
        var module = {
          routes: {}
        };
        var errorMatch = /Module's routes field should be a function/;
        (0, _chai.expect)(app.loadModule.bind(app, module)).to.throw(errorMatch);
      });
      it('should save routes if it is a function', function () {
        var app = new _app.default({});
        var module = {
          routes: function routes() {}
        };
        app.loadModule(module);
        (0, _chai.expect)(app._routeFns).to.be.deep.equal([module.routes]);
      });
    });
    it('should merge actions with app wide global actions', function () {
      var app = new _app.default({});
      app.actions = {
        bb: 10
      };
      var module = {
        actions: {
          aa: 10
        }
      };
      app.loadModule(module);
      (0, _chai.expect)(app.actions).to.be.deep.equal({
        bb: 10,
        aa: 10
      });
    });
    it('should merge actions even actions is an empty field', function () {
      var app = new _app.default({});
      app.actions = {
        bb: 10
      };
      var module = {};
      app.loadModule(module);
      (0, _chai.expect)(app.actions).to.be.deep.equal({
        bb: 10
      });
    });
    describe('has module.load', function () {
      it('should throw an error if module.load is not a function', function () {
        var context = {};
        var app = new _app.default(context);
        var module = {
          load: 'not a function'
        };

        var run = function run() {
          return app.loadModule(module);
        };

        (0, _chai.expect)(run).to.throw(/module\.load should be a function/);
      });
      it('should call module.load with context and actions', function (done) {
        var context = {
          aa: 10
        };
        var app = new _app.default(context);
        app.actions = {
          hello: {
            aa: function aa(c, a) {
              (0, _chai.expect)(c).to.deep.equal(context);
              (0, _chai.expect)(a).to.be.equal(20);
              done();
            }
          }
        };
        var module = {
          load: function load(c, actions) {
            (0, _chai.expect)(c).to.be.equal(context);
            actions.hello.aa(20);
          }
        };
        app.loadModule(module);
      });
    });
    it('should mark the module as loaded', function () {
      var app = new _app.default({});
      var module = {};
      app.loadModule(module);
      (0, _chai.expect)(module.__loaded).to.be.equal(true);
    });
  });
  describe('init', function () {
    it('should fail if initialized', function () {
      var app = new _app.default({});
      app.__initialized = true;
      var errorMatch = /App is already initialized/;
      (0, _chai.expect)(app.init.bind(app)).to.throw(errorMatch);
    });
    it('should call all routes functions as the load order', function () {
      var app = new _app.default({});
      var calledRoutes = [];

      var genRoute = function genRoute(index) {
        return function () {
          return calledRoutes.push(index);
        };
      };

      app._routeFns = [genRoute(1), genRoute(2)];
      app.init();
      (0, _chai.expect)(calledRoutes).to.deep.equal([1, 2]);
    });
    it('should mark as initialized', function () {
      var app = new _app.default({});
      app.init();
      (0, _chai.expect)(app.__initialized).to.be.equal(true);
    });
  });
});