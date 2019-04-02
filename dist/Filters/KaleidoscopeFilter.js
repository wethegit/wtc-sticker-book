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

var shaderFrag = "\nprecision mediump float;\n  \nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec2 u_resolution;\nuniform vec2 dimensions;\nuniform vec4 filterArea;\n\n// math const\nconst float PI = 3.14159265359;\nconst float DEG_TO_RAD = PI / 180.0;\n\nvec2 Kaleidoscope( vec2 uv, float n ) {\n  float angle = PI / n;\n\n  float r = length( uv );\n  float a = atan( uv.y, uv.x ) / angle;\n\n  a = mix( fract( a ), 1.0 - fract( a ), mod( floor( a ), 2.0 ) ) * angle;\n\n  return vec2( cos( a ), sin( a ) ) * r;\n}\n\nvoid main() {\n  vec2 coord, uv, sample;\n\n   coord = vTextureCoord.xy * filterArea.xy;\n   uv = (coord - 0.5 * dimensions.xy) / min(dimensions.y, dimensions.x);\n\n   // if(uv.x < 0.) {\n   //   gl_FragColor = vec4(0., 1., 0., 1.);\n   // }\n   // if(uv.x > .5) {\n   //   gl_FragColor = vec4(0., 1., 0., 1.);\n   // }\n   // if(uv.x < -.5) {\n   //   gl_FragColor = vec4(1., 0., 0., 1.);\n   // }\n   // if(uv.y < 0.) {\n   //   gl_FragColor = vec4(0., 0., 1., 1.);\n   // }\n\n   // if(vTextureCoord.x < .5) {\n   //   gl_FragColor = vec4(1., 0., 0., 1.);\n   //   return;\n   // }\n\n  // coord = vTextureCoord.xy * filterArea.xy;\n  //uv = (coord - 0.5 * filterArea.xy) / filterArea.y;\n  uv = Kaleidoscope(uv, 6.) + .5;\n  vec4 c = texture2D(uSampler, uv * normalize(filterArea.yx));\n\n  // vec2 fr = fract(uv * 5.);\n  // c = mix(c, vec4(0.), smoothstep(.25, .2, length(fr - .5)));\n\n  gl_FragColor += c;\n}\n";

var BWFilter =
/*#__PURE__*/
function (_PIXI$Filter) {
  _inherits(BWFilter, _PIXI$Filter);

  function BWFilter() {
    var _this;

    _classCallCheck(this, BWFilter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BWFilter).call(this, null, shaderFrag));

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

  return BWFilter;
}(PIXI.Filter);

var _default = BWFilter;
exports.default = _default;