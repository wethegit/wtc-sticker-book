"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Stage = _interopRequireDefault(require("../application/Stage"));

var _Events = _interopRequireWildcard(require("../application/Events"));

var _Preloader = require("../application/Preloader");

var _Sticker2 = _interopRequireDefault(require("./Sticker"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * This class provides an extension of the PIXI container that provides specialised 
 * functionality for the sticker book.
 *
 * @class TextSticker
 * @module DisplayObject
 * @augments PIXI.Container
 * @author Liam Egan <liam@wethecollective.com>
 * @version 0.1.0
 * @created Oct 18, 2018
 */
var TextSticker =
/*#__PURE__*/
function (_Sticker) {
  _inherits(TextSticker, _Sticker);

  /**
   * The Sticker Class constructor. Takes a texture object and creates the sticker.
   *
   * @constructor
   * @param {PIXI.Texture} texture         The texture object to use to create the sticker
   */
  function TextSticker(texture, text, fontFamily, fontSize, strokeWidth, strokeColour, fillColour) {
    var _this;

    _classCallCheck(this, TextSticker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextSticker).call(this));
    if (!text) return _possibleConstructorReturn(_this);
    _this.text = text;
    _this.fontSize = fontSize;
    _this.strokeWidth = strokeWidth;
    _this.fontFamily = fontFamily;
    _this.strokeColour = strokeColour;
    _this.fillColour = fillColour;
    _this.initialised = true;

    _this.createSprite();

    return _this;
  }
  /**
   * Public methods
   */

  /**
   * This creates the sprite. Basically what we're doing here is
   * going through and creating a separate "virtual" canvas
   * element, drawing the text onto that and then rendering a
   * pixi sprite with that canvas
   *
   * @public
   * @return null
   */


  _createClass(TextSticker, [{
    key: "createSprite",
    value: function createSprite() {
      var _this2 = this;

      // deferring this method
      if (this.initialised === true) {
        // Create the canvas
        this.canvas = document.createElement('canvas');
        var ctx = this.canvas.getContext('2d'); // Split the text along provided newline characters

        var textlines = this.text.split("\\r\\n"); // Line width is used to measure how wide the canvas needs to be

        var lineWidth = 0; // Set the font based on the provided values

        ctx.font = "".concat(this.fontWeight, " ").concat(this.fontSize, "px ").concat(this.fontFamily); // This is here purely to run the measurements
        // Loop through the lines and adjust the canvas width based on whether "this" is wider than lineWidth

        textlines.forEach(function (line, i) {
          var w = ctx.measureText(line).width;

          if (w > lineWidth) {
            lineWidth = w;
          }
        }); // Set the canvas dimensions based on the calculated values

        this.canvas.width = (lineWidth + this.strokeWidth * 2.) * 2.;
        this.canvas.height = (this.fontSize * textlines.length + this.strokeWidth * 2.) * 2. + this.fontSize; // Set up the canvas for drawing

        ctx = this.canvas.getContext('2d');
        ctx.font = "".concat(this.fontWeight, " ").concat(this.fontSize * 2., "px ").concat(this.fontFamily);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineWidth = this.strokeWidth; // Loop through the lines and draw each one.

        textlines.forEach(function (line, i) {
          var linepos = _this2.canvas.height * 1. / textlines.length - _this2.fontSize / 2.;
          linepos = _this2.fontSize * 2. * .5 + i * linepos + _this2.fontSize / 2.;
          ctx.lineJoin = 'round';
          ctx.strokeStyle = _this2.strokeColour;
          ctx.fillStyle = _this2.fillColour;
          ctx.lineWidth = _this2.strokeWidth * 2.;
          ctx.strokeText(line, _this2.canvas.width * .5, linepos);
          ctx.fillText(line, _this2.canvas.width * .5, linepos);
        });
        this.sprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(this.canvas));
        this.setDimensions(this.sprite.width, this.sprite.height);
        this.indicatorScale += this.ratio * .2; // This just scales up the indicator slightly based on the sticker ratio
      }
    }
    /**
     * Event callbacks
     */

    /**
     * Getters and setters
     */

    /**
     * (getter/setter) The text for the text sticker. If the text contains the
     * special newline characters (`\r\n`) these will be split across lines
     * in the initialisation method
     *
     * @type {string}
     * @default null
     */

  }, {
    key: "text",
    set: function set(value) {
      if (typeof value === 'string') {
        this._text = value;
      }
    },
    get: function get() {
      return this._text || null;
    }
    /**
     * (getter/setter) The font size, in pixels.
     *
     * @type {number}
     * @default 60
     */

  }, {
    key: "fontSize",
    set: function set(value) {
      if (value > 0) this._fontSize = value;
    },
    get: function get() {
      return this._fontSize || 60;
    }
    /**
     * (getter/setter) The stroke width, in pixels.
     *
     * @type {number}
     * @default 10
     */

  }, {
    key: "strokeWidth",
    set: function set(value) {
      if (value > 0) this._strokeWidth = value;
    },
    get: function get() {
      return this._strokeWidth || 10;
    }
    /**
     * (getter/setter) The font family to use. If we're using a custom font,
     * we should make sure that it's loaded well before this call is ever
     * made.
     *
     * @type {string}
     * @default 'helvetica'
     */

  }, {
    key: "fontFamily",
    set: function set(value) {
      if (typeof value === 'string') this._fontFamily = value;
    },
    get: function get() {
      return this._fontFamily || 'helvetica';
    }
    /**
     * (getter/setter) The stroke colour.
     *
     * @type {string}
     * @default 'black'
     */

  }, {
    key: "strokeColour",
    set: function set(value) {
      if (typeof value === 'string') this._strokeColour = value;
    },
    get: function get() {
      return this._strokeColour || 'black';
    }
    /**
     * (getter/setter) The fill colour.
     *
     * @type {string}
     * @default 'white'
     */

  }, {
    key: "fillColour",
    set: function set(value) {
      if (typeof value === 'string') this._fillColour = value;
    },
    get: function get() {
      return this._fillColour || 'white';
    }
    /**
     * (getter/setter) The font weight. Light, bold, 600 etc.
     * are all valid values.
     *
     * @type {number}
     * @default ''
     */

  }, {
    key: "fontWeight",
    set: function set(value) {
      if (typeof value === 'string' || value > 0) this._fontWeight = value;
    },
    get: function get() {
      return this._fontWeight || '';
    }
    /**
     * (getter/setter) Whether the sprite itself has been initialised
     *
     * @type {boolean}
     * @default false
     */

  }, {
    key: "initialised",
    set: function set(value) {
      this._initialised = value === true;
    },
    get: function get() {
      return this._initialised === true;
    }
    /**
     * (getter/setter) The canvas element for use by the class to
     * render the text for insertion into the sprite.
     *
     * @type {DOMElement}
     * @default null
     */

  }, {
    key: "canvas",
    set: function set(value) {
      if (value && typeof value.getContext === 'function') this._canvas = value;
    },
    get: function get() {
      return this._canvas || null;
    }
    /**
     * (getter) the sticker type.
     *
     * @static
     * @readonly
     * @type {string}
     */

  }, {
    key: "definition",

    /**
     * (getter) the object representation of this sticker.
     *
     * @readonly
     * @type {object}
     */
    get: function get() {
      var output = {
        type: TextSticker.stickerType,
        params: [null, this.text, this.fontFamily, this.fontSize, this.strokeWidth],
        radius: this.radius,
        position: {
          x: this.position.x,
          y: this.position.y
        },
        rotation: this.stickerRotation
      };
      return output;
    }
  }], [{
    key: "stickerType",
    get: function get() {
      return 'text-sticker';
    }
  }]);

  return TextSticker;
}(_Sticker2.default);

var _default = TextSticker;
exports.default = _default;