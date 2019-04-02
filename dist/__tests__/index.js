"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = require("chai");

var indexExports = _interopRequireWildcard(require("../"));

var reactMantraDiExports = _interopRequireWildcard(require("react-mantra-di"));

var reComposerExports = _interopRequireWildcard(require("recompose"));

var _global = global,
    describe = _global.describe,
    it = _global.it;
describe('Module', function () {
  describe('createApp',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            it('should create app with provided args', function () {
              var context = {
                aa: 10
              };
              var app = (0, indexExports.createApp)(context);
              (0, _chai.expect)(app.context).to.deep.equal(context);
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('should have useDeps from react-mantra-di', function () {
    (0, _chai.expect)(indexExports.useDeps).to.be.equal(reactMantraDiExports.useDeps);
  });
  it('should have "compose" function from recompose', function () {
    var fnNames = ['compose'];
    fnNames.forEach(function (fnName) {
      var reactKomposerFn = reComposerExports[fnName];
      var indexFN = indexExports[fnName];
      (0, _chai.expect)(reactKomposerFn).to.be.equal(indexFN);
    });
  });
});