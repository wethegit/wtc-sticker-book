"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Stage = _interopRequireDefault(require("../application/Stage"));

var _Events = _interopRequireWildcard(require("../application/Events"));

var _Preloader = require("../application/Preloader");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * This class provides an extension of the PIXI tiling sprite
 * functionality for the sticker book.
 *
 * @class Background
 * @module DisplayObject
 * @augments PIXI.extras.TilingSprite
 * @author Liam Egan <liam@wethecollective.com>
 * @version 0.1.0
 * @created Oct 25, 2018
 */
var Background =
/*#__PURE__*/
function (_PIXI$extras$TilingSp) {
  _inherits(Background, _PIXI$extras$TilingSp);

  /**
   * The Background Class constructor. Takes a texture object and creates the tiling sprite (background).
   *
   * @constructor
   * @param {PIXI.Texture} texture         The texture object to use to create the tiling background
   * @param {number} width         The width of the stage
   * @param {number} height         The height of the stage
   */
  function Background(texture, width, height) {
    var _this;

    _classCallCheck(this, Background);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Background).call(this, texture, width + 20, height + 20)); // super();

    _this.x = -10;
    _this.y = -10;
    _this.anchor.x = .5;
    _this.anchor.y = .5; // Bind the listeners to the class

    _this.onStageResize = _this.onStageResize.bind(_assertThisInitialized(_this));

    _Events.default.addListener('stage-resize', _this.onStageResize); // Fire the resize event manually so that the container 


    setTimeout(function () {
      _this.onStageResize(width, height);
    }, 0);
    return _this;
  }
  /**
   * This method detects whether the sticker should be destroyed by testing whether it has 
   * a parent element.
   *
   * @public
   * @return boolean  Whether or not this element has been destroyed in the process of doing this
   */


  _createClass(Background, [{
    key: "detectDestroy",
    value: function detectDestroy() {
      if (this.parent === null) {
        this.destroy();
        return true;
      }

      return false;
    }
    /**
     * Public methods
     */

    /**
     * This method destroys the sticker and removes all memory-traces of it.
     *
     * @public
     * @return null
     */

  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(Background.prototype), "destroy", this).call(this); // Removing external event listeners


      _Events.default.off('stage-resize', this.onStageResize);
    }
    /**
     * Event callbacks
     */

    /**
     * Reacts to the stage-resize event. Calculates the new size of the tiling background.
     *
     * @public
     * @param {number} width     The new stage width
     * @param {number} height     The new stage height
     * @return null
     */

  }, {
    key: "onStageResize",
    value: function onStageResize(width, height) {
      var destroyed = this.detectDestroy();
      if (destroyed) return;
      var textureRatio = this.texture.width / this.texture.height;
      var stageRatio = width / height;
      this.width = width + 40.;
      this.height = height + 40.; // If the texture size is greater than the stage size, then we need to scale it down

      if (this.texture.width > width || this.texture.height > height) {
        if (textureRatio > stageRatio) {
          // cropping a landscape to a landscape OR
          // a portrait to a portrait
          // or landscape to a portrait
          this.tileScale.y = this.height / this.texture.height;
          this.tileScale.x = this.tileScale.y;
          this.tilePosition.x = width * .5 + 40 - this.texture.width * this.tileScale.x * .5;
          this.tilePosition.y = height * .5 + 40 - this.texture.height * this.tileScale.y * .5;
        } else {
          // cropping a portrait to a landscape
          this.tileScale.x = this.width / this.texture.width;
          this.tileScale.y = this.tileScale.x;
          this.tilePosition.x = width * .5 + 40 - this.texture.width * this.tileScale.x * .5;
          this.tilePosition.y = height * .5 + 40 - this.texture.height * this.tileScale.y * .5;
        }
      }

      this.position.x = width * .5 - 10.;
      this.position.y = height * .5 - 10.;
    }
  }]);

  return Background;
}(PIXI.extras.TilingSprite);

var _default = Background;
exports.default = _default;