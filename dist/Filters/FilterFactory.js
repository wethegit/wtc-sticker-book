"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BWFilter = _interopRequireDefault(require("./BWFilter"));

var _VignetteFilter = _interopRequireDefault(require("./VignetteFilter"));

var _GrainFilter = _interopRequireDefault(require("./GrainFilter"));

var _DistortFilter = _interopRequireDefault(require("./DistortFilter"));

var _KaleidoscopeFilter = _interopRequireDefault(require("./KaleidoscopeFilter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BlurFilter = PIXI.filters.BlurFilter;
var _availableFilters = {
  BWFilter: _BWFilter.default,
  VignetteFilter: _VignetteFilter.default,
  BlurFilter: BlurFilter,
  GrainFilter: _GrainFilter.default,
  DistortFilter: _DistortFilter.default,
  KaleidoscopeFilter: _KaleidoscopeFilter.default
};

var FilterFactory =
/*#__PURE__*/
function () {
  function FilterFactory() {
    _classCallCheck(this, FilterFactory);
  }

  _createClass(FilterFactory, null, [{
    key: "getClassByName",
    value: function getClassByName(name) {
      if (typeof name === 'string') {
        if (_availableFilters[name]) {
          return _availableFilters[name];
        }
      }

      return null;
    }
  }, {
    key: "registerClass",
    value: function registerClass(classDef) {
      _availableFilters[classDef.name] = classDef;
    }
  }]);

  return FilterFactory;
}();

var _default = FilterFactory;
exports.default = _default;