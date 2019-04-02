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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var shaderFrag = "\nprecision mediump float;\n  \nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nvoid main() {\n\n  vec2 coord, uv;\n  coord = vTextureCoord.xy * filterArea.xy;\n  uv = (coord - 0.5 * dimensions.xy) / max(dimensions.y, dimensions.x);\n  \n  vec4 c = texture2D(uSampler, vTextureCoord);\n\n  float l = length(uv);\n\n  c.rgb *= clamp(1. - l * l * l * 2., 0., 1.);\n\n  gl_FragColor = c;\n}\n";

var VignetteFilter =
/*#__PURE__*/
function (_PIXI$Filter) {
  _inherits(VignetteFilter, _PIXI$Filter);

  function VignetteFilter() {
    var _this;

    _classCallCheck(this, VignetteFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VignetteFilter).call(this, null, shaderFrag));

    _defineProperty(_assertThisInitialized(_this), "apply", function (filterManager, input, output) {
      this.uniforms.u_resolution.x = this.stageInstance.dimensions.x;
      this.uniforms.u_resolution.y = this.stageInstance.dimensions.y;
      this.uniforms.dimensions[0] = input.sourceFrame.width;
      this.uniforms.dimensions[1] = input.sourceFrame.height; // draw the filter...

      filterManager.applyFilter(this, input, output);
    });

    _this.uniforms.u_resolution = {
      type: "v2",
      value: {
        x: 0,
        y: 0
      }
    };
    return _this;
  }

  return VignetteFilter;
}(PIXI.Filter);

var _default = VignetteFilter;
exports.default = _default;