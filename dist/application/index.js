"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Stage", {
  enumerable: true,
  get: function get() {
    return _Stage.default;
  }
});
Object.defineProperty(exports, "loader", {
  enumerable: true,
  get: function get() {
    return _Preloader.default;
  }
});
Object.defineProperty(exports, "eventListener", {
  enumerable: true,
  get: function get() {
    return _Events.default;
  }
});

var _Stage = _interopRequireDefault(require("./Stage"));

var _Preloader = _interopRequireDefault(require("./Preloader"));

var _Events = _interopRequireDefault(require("./Events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }