"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Stage = _interopRequireDefault(require("../application/Stage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var shaderFrag = "\nprecision mediump float;\n  \nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 n) { \n\treturn fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);\n}\n\nfloat noise(vec2 p){\n\tvec2 ip = floor(p);\n\tvec2 u = fract(p);\n\tu = u*u*(3.0-2.0*u);\n\t\n\tfloat res = mix(\n\t\tmix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),\n\t\tmix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);\n\treturn res*res;\n}\n\nvoid main() {\n  vec2 n = vec2( noise(vTextureCoord * 64.), noise(vTextureCoord * 128. + 2.) ) - .5;\n  vec4 c = texture2D(uSampler, vTextureCoord + n * .01);\n\n  gl_FragColor = c;\n}\n";

var DistortFilter =
/*#__PURE__*/
function (_PIXI$Filter) {
  _inherits(DistortFilter, _PIXI$Filter);

  function DistortFilter() {
    _classCallCheck(this, DistortFilter);

    return _possibleConstructorReturn(this, _getPrototypeOf(DistortFilter).call(this, null, shaderFrag));
  }

  return DistortFilter;
}(PIXI.Filter);

var _default = DistortFilter;
exports.default = _default;