"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
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
Object.defineProperty(exports, "Sticker", {
  enumerable: true,
  get: function get() {
    return _Sticker.default;
  }
});
Object.defineProperty(exports, "TextSticker", {
  enumerable: true,
  get: function get() {
    return _TextSticker.default;
  }
});
exports.PIXI = void 0;

require("./pep.js");

var PIXI = _interopRequireWildcard(require("pixi.js"));

exports.PIXI = PIXI;

var _Stage = _interopRequireDefault(require("./application/Stage.js"));

var _Preloader = _interopRequireDefault(require("./application/Preloader.js"));

var _Events = _interopRequireDefault(require("./application/Events.js"));

var _Sticker = _interopRequireDefault(require("./DisplayObject/Sticker.js"));

var _TextSticker = _interopRequireDefault(require("./DisplayObject/Text-Sticker.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }