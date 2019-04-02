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
 * This class provides an extension of the PIXI container that provides specialised 
 * functionality for the sticker book.
 *
 * @class Sticker
 * @module DisplayObject
 * @augments PIXI.Container
 * @author Liam Egan <liam@wethecollective.com>
 * @version 0.1.0
 * @created Oct 18, 2018
 */
var Sticker =
/*#__PURE__*/
function (_PIXI$Container) {
  _inherits(Sticker, _PIXI$Container);

  /**
   * The Sticker Class constructor. Takes a texture object and creates the sticker.
   *
   * @constructor
   * @param {PIXI.Texture} texture         The texture object to use to create the sticker
   */
  function Sticker(texture) {
    var _this;

    _classCallCheck(this, Sticker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sticker).call(this));
    _this.spriteContainer = new PIXI.Container(); // Bind any necessary listeners

    _this.onMouseMove = _this.onMouseMove.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
    _this.onKeyPress = _this.onKeyPress.bind(_assertThisInitialized(_this));
    _this.onKeyUp = _this.onKeyUp.bind(_assertThisInitialized(_this));
    _this.onDeleted = _this.onDeleted.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onUnFocus = _this.onUnFocus.bind(_assertThisInitialized(_this));
    _this.onDisable = _this.onDisable.bind(_assertThisInitialized(_this));
    _this.onEnable = _this.onEnable.bind(_assertThisInitialized(_this));
    _this.onMouseDownResize = _this.onMouseDownResize.bind(_assertThisInitialized(_this));
    _this.onMouseUpResize = _this.onMouseUpResize.bind(_assertThisInitialized(_this));
    _this.onMouseMoveResize = _this.onMouseMoveResize.bind(_assertThisInitialized(_this));
    _this.texture = texture; // Add some testing here for this and throw an error if it fails

    _this.createSprite(); // Set up the indicator


    _this.indicator = new PIXI.Graphics();

    _this.setIndicatorGraphics(); // Add the buttons


    _this.buttonDelete = _this.createButton(_this.deleteButtonTexture);
    _this.buttonResize = _this.createButton(_this.resizeButtonTexture); // position the buttons

    _this.setButtonPosition(_this.buttonDelete, Sticker.BUTTON_DELETE);

    _this.setButtonPosition(_this.buttonResize, Sticker.BUTTON_RESIZE); // set up the button listeners and emitters
    // Delete button mouse down - just cancels any unfocus


    _this.buttonDelete.on('mousedown', function () {
      _this.clickFocus = true;
    });

    _this.buttonDelete.on('touchstart', function () {
      _this.clickFocus = true;
    }); // Delete button mouse us - Deletes the sticker


    _this.buttonDelete.on('mouseup', function (e) {
      _this.onDelete(e);
    });

    _this.buttonDelete.on('touchend', function (e) {
      _this.onDelete(e);
    }); // The position button mouse down event


    _this.buttonResize.on('mousedown', _this.onMouseDownResize);

    _this.buttonResize.on('touchstart', _this.onMouseDownResize); // The position button mouse up event


    _this.buttonResize.on('mouseup', _this.onMouseUpResize);

    _this.buttonResize.on('touchend', _this.onMouseUpResize);

    _this.buttonResize.on('mouseupoutside', _this.onMouseUpResize);

    _this.buttonResize.on('touchendoutside', _this.onMouseUpResize); // The position button mouse move event


    _this.buttonResize.on('mousemove', _this.onMouseMoveResize);

    _this.buttonResize.on('touchmove', _this.onMouseMoveResize); // And custom events
    // this.onDeleted = this.onDeleted.bind(this);
    // this.onFocus = this.onFocus.bind(this);
    // this.onUnFocus = this.onUnFocus.bind(this);
    // this.onDisable = this.onDisable.bind(this);
    // this.onEnable = this.onEnable.bind(this);


    _Events.default.on('sticker-focus', _this.onFocus);

    _Events.default.on('sticker-unfocus', _this.onUnFocus);

    window.addEventListener('keydown', _this.onKeyPress);
    window.addEventListener('keyup', _this.onKeyUp); // Add everything to the container

    _this.addChild(_this.indicator);

    _this.addChild(_this.spriteContainer);

    _this.addChild(_this.buttonDelete);

    _this.addChild(_this.buttonResize);

    _this.focussed = false;
    /**
     * Sticker add event. Fired when a sticker is finishing initialising
     *
     * @event sticker-added
     * @type {object}
     * @property {object} sticker - The object representation of the sticker being added (this)
     */

    _Events.default.emitEvent('sticker-added', [_assertThisInitialized(_this)]);

    return _this;
  }
  /**
   * Public methods
   */

  /**
   * This creates the sprite. In a regular sticker this is a 
   * simple process of just creating a sprite fromt the
   * provided texture, but in subclasses we may want other 
   * things, like rendering text or whatever.
   *
   * @public
   * @return null
   */


  _createClass(Sticker, [{
    key: "createSprite",
    value: function createSprite() {
      this.sprite = new PIXI.Sprite(this.texture);
      this.setDimensions(this.sprite.width, this.sprite.height);
    }
    /**
     * This sets the dimensions of the stage and sets up the ratio 
     * object for future use.
     *
     * @public
     * @param {number} w    The width of the stage
     * @param {number} h    The height of the stage
     * @return null
     */

  }, {
    key: "setDimensions",
    value: function setDimensions(w, h) {
      if (w > h) {
        this.diameter = h;
      } else {
        this.diameter = w;
      }

      this.ratio = w / h;
      this.w = w;
      this.h = h;
      return;
    }
    /**
     * Set up the indicator graphics. We put this in a function in case we need to update it later on.
     * @todo add removal of old graphics, if they exist
     *
     * @public
     * @return null
     */

  }, {
    key: "setIndicatorGraphics",
    value: function setIndicatorGraphics() {
      var radius = this.radius * this.indicatorScale;
      this.indicator.clear();
      this.indicator.beginFill(this.helperColour, this.helperOpacity);
      this.indicator.drawCircle(0, 0, radius);
    }
    /**
     * Create a button object from a provided texture, or else create a placeholder
     *
     * @public
     * @param {PIXI.Texture} texture    The texture to use to create the button
     * @return null
     */

  }, {
    key: "createButton",
    value: function createButton(texture) {
      var button;

      if (texture) {
        button = new PIXI.Sprite(texture);
        button.anchor.x = button.anchor.y = 0.5;
      } else {
        // This is here simply to provide a fallback in the case the 
        // provided graphics don't exist or are broken for a button
        button = new PIXI.Graphics();
        button.clear();
        button.beginFill(this.helperColour, this.helperOpacity);
        button.drawCircle(0, 0, 60);
      }

      button.scale.x = button.scale.y = this.buttonScale;
      button.alpha = 0;
      return button;
    }
    /**
     * Set the cartesian position of a button based on its type and the radius of the sticker.
     * Because sticker size is measured in radial coordinates, we translate the position of 
     * the buttons from an angle, this means that buttons fluidly move out and in when scaling.
     *
     * @public
     * @param {PIXI.Container} buttonInstance     The button instance to position
     * @param {number} buttonType                 The constant indicator of the button to position.
     * @return null
     */

  }, {
    key: "setButtonPosition",
    value: function setButtonPosition(buttonInstance, buttonType) {
      if (buttonInstance instanceof PIXI.Container) {
        var radPos; // Currently the radial positions are a little magical, if we add more buttons
        // in future, or we want to have finer control over the position of the buttons
        // we can supplement this with a property or a calculation.
        // For now, magic numbers are more than sufficient.

        switch (buttonType) {
          case Sticker.BUTTON_DELETE:
            radPos = -2.35619449;
            break;

          case Sticker.BUTTON_RESIZE:
            radPos = 0.785398;
            break;
        }

        var radius = this.radius * this.indicatorScale;
        buttonInstance.position.x = Math.cos(radPos) * radius;
        buttonInstance.position.y = Math.sin(radPos) * radius;
      }
    }
    /**
     * This method focusses the sticker, making it active and firing a sticker-focus
     * event that should remove the focus all other on-stage elements
     *
     * @public
     * @return null
     */

  }, {
    key: "focus",
    value: function focus() {
      if (this.hasFocus === true) return;
      this.hasFocus = true;
      /**
       * Sticker focus event. Fired when the sticker is focussed for whatever readon
       *
       * @event sticker-focus
       * @type {object}
       * @property {object} sticker - The object representation of the sticker being focussed (this)
       */

      _Events.default.emitEvent('sticker-focus', [this]); // Make everythign internal to the sticker appear


      this.indicator.alpha = 1;
      this.indicator.scale.x = 1;
      this.indicator.scale.y = 1;
      this.buttonDelete.alpha = 1;
      this.buttonResize.alpha = 1; // Making the control buttons interactive
      // @todo test whether we need to add this to a timer instead

      this.buttonDelete.interactive = true;
      this.buttonResize.interactive = true;
    }
    /**
     * This method unfocusses the sticker, making it active and firing a sticker-unfocussed
     * event.
     *
     * @public
     * @return null
     */

  }, {
    key: "unfocus",
    value: function unfocus() {
      if (this.hasFocus === false) return;
      this.hasFocus = false;
      /**
       * Sticker unfocussed event. Fired when the sticker is un-focussed for whatever readon
       *
       * @event sticker-unfocussed
       * @type {object}
       * @property {object} sticker - The object representation of the sticker being focussed (this)
       */

      _Events.default.emitEvent('sticker-unfocussed', [this]); // Make everythign internal to the sticker disappear


      this.indicator.alpha = 0;
      this.indicator.scale.x = .1;
      this.indicator.scale.y = .1;
      this.buttonDelete.alpha = 0;
      this.buttonResize.alpha = 0; // Making the control buttons non-interactive
      // @todo test whether we need to add this to a timer instead

      this.buttonDelete.interactive = false;
      this.buttonResize.interactive = false;
    }
    /**
     * This method detects whether the sticker should be destroyed by testing whether it has 
     * a parent element.
     *
     * @public
     * @return null
     */

  }, {
    key: "detectDestroy",
    value: function detectDestroy() {
      if (this.parent === null) {
        this.destroy();
      }
    }
    /**
     * This method destroys the sticker and removes all memory-traces of it.
     *
     * @public
     * @return null
     */

  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(Sticker.prototype), "destroy", this).call(this); // Removing external event listeners


      _Events.default.off('sticker-focus', this.onFocus);

      _Events.default.off('sticker-unfocus', this.onUnFocus);

      window.removeEventListener('keydown', this.onKeyPress);
      window.removeEventListener('keyup', this.onKeyUp); // making sure we're unfocussed

      this.hasFocus = false;
    }
    /**
     * Event callbacks
     */

    /**
     * Reacts to mouse move on the sticker itself. Responsible for positioning the sticker based
     * on dragging
     *
     * @public
     * @param {Object} e     The event object
     * @return null
     */

  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      if (this.mouseDown === true) {
        this.mousePosition = e.data.getLocalPosition(this.parent);
        var oldPosition = {
          x: this.position.x,
          y: this.position.y
        };
        this.position.x = this.mousePosition.x + this.offsetPosition.x;
        this.position.y = this.mousePosition.y + this.offsetPosition.y;
        /**
         * Sticker mouse move event. Fired when the mouse or finder moves over a sticker
         *
         * @event sticker-dragged
         * @type {object}
         * @property {object} sticker - The object representation of the sticker being added (this)
         * @property {object} mousePosition - the position of the mouse within the sticker
         * @property {object} oldPosition - the old (previous) position of the sticker itself
         * @property {object} position - the current position of the sticker itself
         */

        _Events.default.emitEvent('sticker-dragged', [this, this.mousePosition, oldPosition, this.position]);

        (0, _Events.pauseEvent)(e);
      }
    }
    /**
     * Reacts to mouse down on the sticker itself. Responsible for focussing and setting up
     * variable for use by mouse movement (dragging)
     *
     * @public
     * @param {Object} e     The event object
     * @return null
     */

  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      this.clickFocus = true; // This just brings the sticker to the front of the stack

      var parent = this.parent;
      parent.removeChild(this);
      parent.addChild(this); // Focus the sticker and set it up for dragging

      this.focus();
      this.mouseDown = true;
      this.mousPosStart = e.data.getLocalPosition(this.parent);
      this.offsetPosition = {
        x: this.position.x - this.mousPosStart.x,
        y: this.position.y - this.mousPosStart.y
      };
      (0, _Events.pauseEvent)(e);
    }
    /**
     * Reacts to mouse up on the sticker. All this is here for is to provide a way to
     * escape from dragging.
     *
     * @public
     * @param {Object} e     The event object
     * @return null
     */

  }, {
    key: "onMouseUp",
    value: function onMouseUp(e) {
      this.mouseDown = false;
    }
    /**
     * Responds to keypress events and moves, rotates, deltes or 
     * unfocusses the sprite based on the key.
     *
     * @public
     * @param {Object} e     The event object
     * @return null
     */

  }, {
    key: "onKeyPress",
    value: function onKeyPress(e) {
      this.detectDestroy();
      if (!this.hasFocus) return; // console.log(e.which); //
      // Using the modifier key updates the distance for a variety of operations

      var distance = 1;

      if (e.shiftKey || e.metaKey || e.altKey || e.ctrlKey) {
        this.shiftKey = true;
        distance = 10;
      } // delete and backspace remove the sticker


      if (e.which == 8 || e.which == 46) {
        this.unfocus();
        this.onDelete();
      } // escape unfocusses the sticker


      if (e.which == 27) {
        this.unfocus();
      } // move left


      if (e.which == 37) {
        this.position.x -= distance;
      } // move right


      if (e.which == 39) {
        this.position.x += distance;
      } // move up


      if (e.which == 38) {
        this.position.y -= distance;
      } // move down


      if (e.which == 40) {
        this.position.y += distance;
      } // zoom out


      if (e.which == 219 || e.which == 189 || e.which == 109) {
        this.radius -= distance;
      } // zoom in 


      if (e.which == 221 || e.which == 187 || e.which == 107) {
        this.radius += distance;
      } // rotate left


      if (e.which == 188) {
        this.stickerRotation -= distance * .05;
      } // rotate right


      if (e.which == 190) {
        this.stickerRotation += distance * .05;
      }

      e.preventDefault();
    }
    /**
     * Responds to key up, this basically just removes the skift key flag.
     *
     * @public
     * @param {Object} e     The event object
     * @return null
     */

  }, {
    key: "onKeyUp",
    value: function onKeyUp(e) {
      this.shiftKey = false;
    }
    /**
     * @todo Complete
     *
     * @public
     * @param {Object} e     The event object
     * @return null
     */

  }, {
    key: "onDeleted",
    value: function onDeleted(target) {
      this.detectDestroy();
    }
    /**
     * Responds to the custom focus event. If the target passed by the vent is
     * not *this* then we unfocus this sticker.
     *
     * @public
     * @param {Object} target     The target of the focus.
     * @return null
     */

  }, {
    key: "onFocus",
    value: function onFocus(target) {
      if (target !== this) {
        this.unfocus();
      }
    }
    /**
     * Responds to the custom unfocus event which is fired from a higher-level
     * object. If the sticker has just been clicked on (*clickFocus*) then
     * we do nothing.
     *
     * @public
     * @param {Object} target     The target of the focus.
     * @return null
     */

  }, {
    key: "onUnFocus",
    value: function onUnFocus(target) {
      if (this.clickFocus === false) this.unfocus();
      this.clickFocus = false;
    }
    /**
     * @todo Complete
     *
     * @public
     * @param {Object} e     The event object
     * @return null
     */

  }, {
    key: "onDisable",
    value: function onDisable(target) {
      this.unfocus();
      this.disable();
      this.clickFocus = false;
    }
    /**
     * @todo Complete
     *
     * @public
     * @param {Object} e     The event object
     * @return null
     */

  }, {
    key: "onEnable",
    value: function onEnable(target) {
      this.enable();
    }
    /**
     * Responds to the delete event fired from the delet button or elsewhere.
     * This deletes the target from the PIXI object model and destroys itself.
     *
     * @public
     * @param {Object} e     The event object, normally from click
     * @return null
     */

  }, {
    key: "onDelete",
    value: function onDelete(e) {
      this.parent.removeChild(this);
      this.destroy();
    }
    /**
     * Responds to the mouse down event on the resize button. This sets up the state
     * that provides the functionality for the resize actions.
     *
     * @public
     * @param {Object} e     The event object
     * @return null
     */

  }, {
    key: "onMouseDownResize",
    value: function onMouseDownResize(e) {
      this.clickFocus = true;
      this.mouseDownResize = true;
      (0, _Events.pauseEvent)(e);
    }
    /**
     * Responds to the mouse up event on the resize button. This stops the resize action
     * and settles the state of the sticker back into its dormant state.
     *
     * @public
     * @param {Object} e     The event object
     * @return null
     */

  }, {
    key: "onMouseUpResize",
    value: function onMouseUpResize(e) {
      this.mouseDownResize = false;
      this.baseRotation = this.stickerRotation;
      this.setButtonPosition(this.buttonResize, Sticker.BUTTON_RESIZE);
    }
    /**
     * Responds to the mouse move event on the resize button. This method finds the 
     * relative mouse position, generates polar coordinates from it, and resizes
     * and rotates the sticker based on these polars.
     *
     * @public
     * @param {Object} e     The event object
     * @return null
     */

  }, {
    key: "onMouseMoveResize",
    value: function onMouseMoveResize(e) {
      if (this.mouseDownResize === true) {
        var mousepos = e.data.getLocalPosition(this.parent); // The length vector of the relative mouse position

        var distance = {
          x: mousepos.x - this.position.x,
          y: mousepos.y - this.position.y
        }; // The polar coordinates derived from this position

        var polar = {
          r: Math.sqrt(distance.x * distance.x + distance.y * distance.y),
          phi: Math.atan2(distance.y, distance.x)
        }; // The current radius of the sticker

        var radius = this.radius * this.indicatorScale; // This is the serious stuff. This sets the rotation and the radius of the sticker based on the
        // polar coordinates generated above
        // Holding down the shit key will lock this to resize, and stop sticker rotation

        if (!this.shiftKey) {
          this.stickerRotation = polar.phi + this.baseRotation - 0.785398; // Again, this magin number represents the rotational period for the resize button
        }

        this.radius = polar.r / this.indicatorScale; // Position the resize buttons so the user has a nice indication that they're doing something.

        this.buttonResize.position.x = Math.cos(polar.phi) * radius;
        this.buttonResize.position.y = Math.sin(polar.phi) * radius;
        /**
         * Sticker resize event. Fired when a sticker is resized and / or rotated
         *
         * @event sticker-resized
         * @type {object}
         * @property {object} sticker - The object representation of the sticker being resized (this)
         * @property {number} radius - The new radius of the modified object
         * @property {number} rotation - The new rotation of the modified object
         */

        _Events.default.emitEvent('sticker-resize', [this, this.rotation, this.radius]);

        (0, _Events.pauseEvent)(e);
      }
    }
    /**
     * Getters and setters
     */

    /**
     * (getter/setter) The colour of the helper circle that appears behind the 
     * sticker when focussed
     *
     * @type {number}
     * @default 0xEEEEEE
     */

  }, {
    key: "helperColour",
    set: function set(value) {
      if (!isNaN(value)) {
        this._helperColour = value;
      }
    },
    get: function get() {
      return this._helperColour || 0xEEEEEE;
    }
    /**
     * (getter/setter) The opacity of the helper circle that appears behind the 
     * sticker when focussed
     *
     * @type {number}
     * @default 0.5
     */

  }, {
    key: "helperOpacity",
    set: function set(value) {
      if (value >= 0) {
        this._helperOpacity = value;
      }
    },
    get: function get() {
      return this._helperOpacity >= 0 ? this._helperOpacity : 0.5;
    }
    /**
     * (getter/setter) Whether the helper circle should have a stroke
     * on it.
     * @todo Complete
     *
     * @type {boolean}
     * @default false
     */

  }, {
    key: "helperStroke",
    set: function set(value) {
      this._helperStroke = value === true;
    },
    get: function get() {
      return this._helperStroke === true;
    }
    /**
     * (getter/setter) The PIXI Texture object that represents the sticker
     * graphics.
     *
     * @type {object}
     * @default null
     */

  }, {
    key: "texture",
    set: function set(value) {
      if (value instanceof PIXI.Texture) {
        this._texture = value;
      }
    },
    get: function get() {
      return this._texture || null;
    }
    /**
     * (getter/setter) Indicates whether the sticker has "click focus", which just
     * indicates that the sticker is in a state whereby it can't have it's focus
     * immediately cancelled.
     *
     * @type {boolean}
     * @default false
     */

  }, {
    key: "clickFocus",
    set: function set(value) {
      this._clickFocus = value === true;
    },
    get: function get() {
      return this._clickFocus === true;
    }
    /**
     * (getter/setter) Indicates whether the sticker has focus, which provides all
     * of the flags for determining whether the sticker should react to user input.
     *
     * @type {boolean}
     * @default false
     */

  }, {
    key: "hasFocus",
    set: function set(value) {
      this._hasFocus = value === true;
    },
    get: function get() {
      return this._hasFocus === true;
    }
    /**
     * (getter/setter) The rotation of the sticker itself. We don't use `rotation`
     * here as that would clobber the extended PIXI class's property of the same 
     * name. Here we take the provided rotation and transmute it onto the sprite.
     *
     * @type {number}
     * @default 0
     */

  }, {
    key: "stickerRotation",
    set: function set(value) {
      this.sprite.rotation;

      if (!isNaN(value)) {
        this._stickerRotation = value;
        this.sprite.rotation = value;
      }
    },
    get: function get() {
      return isNaN(this._stickerRotation) ? 0 : this._stickerRotation;
    }
    /**
     * (getter/setter) The base rotation provides a transofrmation basis for
     * use during the resize / rotate actions. Basically we use:
     * mouse rotation + base rotation = sticker rotation
     *
     * @type {number}
     * @default 0
     */

  }, {
    key: "baseRotation",
    set: function set(value) {
      if (!isNaN(value)) this._baseRotation = value;
    },
    get: function get() {
      return this._baseRotation || 0;
    }
    /**
     * (getter/setter) The size to scale the control buttons for the sticker.
     *
     * @type {number}
     * @default 0.5
     */

  }, {
    key: "buttonScale",
    set: function set(value) {
      if (value > 0) {
        this._buttonScale = value;
        if (this.buttonDelete) this.buttonDelete.scale.x = this.buttonDelete.scale.y = value;
        if (this.buttonResize) this.buttonResize.scale.x = this.buttonResize.scale.y = value;
        console.log(this.buttonDelete, this.buttonDelete.scale);
      }
    },
    get: function get() {
      return this._buttonScale || Sticker.defaultButtonScale;
    }
    /**
     * (getter/setter) The default size to scale the control buttons for the sticker.
     *
     * @static
     * @type {number}
     * @default 0.5
     */

  }, {
    key: "indicatorScale",

    /**
     * (getter/setter) The size of the indicator in relation to the radius of
     * the sticker.
     *
     * @type {number}
     * @default 1.0
     */
    set: function set(value) {
      if (value > 0) this._indicatorScale = value;
    },
    get: function get() {
      return this._indicatorScale || 1.;
    }
    /**
     * (getter/setter) The sprite to display. This is basically what the user 
     * thinks of as the sticker.
     *
     * @type {PIXI.Sprite}
     * @default null
     */

  }, {
    key: "sprite",
    set: function set(value) {
      if (value instanceof PIXI.Sprite) {
        value.name = 'sprite';
        this._sprite = value;
        this._sprite.anchor.x = .5;
        this._sprite.anchor.y = .5; // Set up self interactivity

        this.interactive = true;
        this.sprite.interactive = true;
        this.sprite.on('mouseover', function (e) {
          document.body.style.cursor = 'all-scroll';
        });
        this.sprite.on('mouseout', function (e) {
          document.body.style.cursor = 'default';
        });
        this.sprite.on('mousemove', this.onMouseMove);
        this.sprite.on('touchmove', this.onMouseMove);
        this.sprite.on('mousedown', this.onMouseDown);
        this.sprite.on('touchstart', this.onMouseDown);
        this.sprite.on('mouseup', this.onMouseUp);
        this.sprite.on('touchend', this.onMouseUp);
        this.spriteContainer.addChild(this.sprite);
      }
    },
    get: function get() {
      return this._sprite || null;
    }
    /**
     * (getter/setter) The grahics object to use to display the indicator when
     * the user has focussed the sticker.
     *
     * @type {PIXI.Graphics}
     * @default null
     */

  }, {
    key: "indicator",
    set: function set(value) {
      if (value instanceof PIXI.Graphics) {
        value.name = 'indicator';
        this._indicator = value;
      }
    },
    get: function get() {
      return this._indicator || null;
    }
    /**
     * (getter/setter) The delete button PIXI object. 
     *
     * @type {PIXI.Container}
     * @default null
     */

  }, {
    key: "buttonDelete",
    set: function set(value) {
      if (value instanceof PIXI.Container) {
        value.name = 'deleteButton';
        this._buttonDelete = value;
      }
    },
    get: function get() {
      return this._buttonDelete || null;
    }
    /**
     * (getter/setter) The resize button PIXI object. 
     *
     * @type {PIXI.Container}
     * @default null
     */

  }, {
    key: "buttonResize",
    set: function set(value) {
      if (value instanceof PIXI.Container) {
        value.name = 'resizeButton';
        this._buttonResize = value;
      }
    },
    get: function get() {
      return this._buttonResize || null;
    }
    /**
     * (getter/setter) diameter of the sticker. This is used to determine
     * relative size when resizing etc.
     *
     * @type {number}
     * @default 0
     */

  }, {
    key: "diameter",
    set: function set(value) {
      if (!isNaN(value)) this._diameter = value;
    },
    get: function get() {
      return this._diameter || 0;
    }
    /**
     * (getter/setter) the ratio of the sticker. This is used to determine
     * the diameter and basic sticker values on instanciation.
     *
     * @type {number}
     * @default 0
     */

  }, {
    key: "ratio",
    set: function set(value) {
      if (!isNaN(value)) this._ratio = value;
    },
    get: function get() {
      return this._ratio || 0;
    }
    /**
     * (getter/setter) radius of the sticker. This is used to determine
     * relative size when resizing etc.
     *
     * @type {number}
     * @default diameter * .5 + 20
     */

  }, {
    key: "radius",
    set: function set(value) {
      if (!isNaN(value)) {
        this._radius = value;
        var w = value * 2. - 40;

        if (this.ratio > 1) {
          this.sprite.width = w * this.ratio;
          this.sprite.height = w;
        } else {
          this.sprite.width = w;
          this.sprite.height = w / this.ratio;
        }

        this.setDimensions(this.sprite.width, this.sprite.height);
        this.setButtonPosition(this.buttonDelete, Sticker.BUTTON_DELETE);
        this.setButtonPosition(this.buttonResize, Sticker.BUTTON_RESIZE);
        this.setIndicatorGraphics();
      }
    },
    get: function get() {
      return this.diameter * .5 + 20;
    }
    /**
     * (getter/setter) whether the sticker is currently focussed. this
     * sets up the control components of the sticker.
     *
     * @type {boolean}
     * @default false
     */

  }, {
    key: "focussed",
    set: function set(value) {
      var _this2 = this;

      if (value === true && this.focussed !== true) {
        /**
         * Sticker focus event. Fired when a sticker receives focus somehow
         *
         * @event sticker-dragged
         * @type {object}
         * @property {object} sticker - The object representation of the sticker being focussed (this)
         */
        _Events.default.emitEvent('sticker-focus', [this]);

        this.indicator.alpha = 1;
        this.indicator.scale.x = 1;
        this.indicator.scale.y = 1;
        this.buttonDelete.alpha = 1;
        this.buttonResize.alpha = 1;
        setTimeout(function () {
          _this2.buttonDelete.interactive = true;
          _this2.buttonResize.interactive = true;
        }, 500);
        this._focussed = true;
      } else if (this.focussed === true) {
        /**
         * Sticker unfocus event. Fired when a sticker loses focus via a focus event
         *
         * @event sticker-dragged
         * @type {object}
         * @property {object} sticker - The object representation of the sticker being unfocussed (this)
         */
        _Events.default.emitEvent('sticker-unfocus', [this]);

        this.indicator.alpha = 0;
        this.indicator.scale.x = .1;
        this.indicator.scale.y = .1;
        this.buttonDelete.alpha = 0;
        this.buttonResize.alpha = 0;
        setTimeout(function () {
          _this2.buttonDelete.interactive = false;
          _this2.buttonResize.interactive = false;
        }, 500);
        this._focussed = false;
      }
    },
    get: function get() {
      return this._focussed === true;
    }
    /**
     * (getter/setter) The texture for the delete button. This is here
     * to make the class more flexible to updates for people in the future.
     *
     * @type {PIXI.Texture}
     * @default null
     */

  }, {
    key: "deleteButtonTexture",
    set: function set(value) {
      if (value instanceof PIXI.texture) {
        this._deleteButtonTexture = value;
      }
    },
    get: function get() {
      var tex;

      try {
        tex = this._deleteButtonTexture || _Preloader.resources[Sticker.BUTTON_DELETE_NAME].texture;
      } catch (error) {
        tex = null;
      }

      return tex;
    }
    /**
     * (getter/setter) The texture for the resize button. This is here
     * to make the class more flexible to updates for people in the future.
     *
     * @type {PIXI.Texture}
     * @default null
     */

  }, {
    key: "resizeButtonTexture",
    set: function set(value) {
      if (value instanceof PIXI.texture) {
        this._resizeButtonTexture = value;
      }
    },
    get: function get() {
      var tex;

      try {
        tex = this._resizeButtonTexture || _Preloader.resources[Sticker.BUTTON_RESIZE_NAME].texture;
      } catch (error) {
        tex = null;
      }

      return tex;
    }
    /**
     * (getter/setter) indicates whether the user's mouse is down on the sticker.
     * this simply provides a hard case boolean for this value.
     *
     * @type {boolean}
     * @default false
     */

  }, {
    key: "mouseDown",
    set: function set(value) {
      this._mouseDown = value === true;
    },
    get: function get() {
      return this._mouseDown === true;
    }
    /**
     * @todo Complete
     *
     * @type {object}
     * @default {x: 0, y: 0}
     */

  }, {
    key: "mousePosStart",
    set: function set(value) {
      if (_typeof(value) === 'object' && !isNaN(value.x) && !isNaN(value.x)) {
        this._mousePosStart = value;
      }
    },
    get: function get() {
      return this._mousePosStart || {
        x: 0,
        y: 0
      };
    }
    /**
     * @todo Complete
     *
     * @type {object}
     * @default {x: 0, y: 0}
     */

  }, {
    key: "offsetPosition",
    set: function set(value) {
      if (_typeof(value) === 'object' && !isNaN(value.x) && !isNaN(value.x)) {
        this._offsetPosition = value;
      }
    },
    get: function get() {
      return this._offsetPosition || {
        x: 0,
        y: 0
      };
    }
    /**
     * @todo Complete
     *
     * @type {object}
     * @default {x: 0, y: 0}
     */

  }, {
    key: "mousePosition",
    set: function set(value) {
      if (_typeof(value) === 'object' && !isNaN(value.x) && !isNaN(value.x)) {
        this._mousePosition = value;
      }
    },
    get: function get() {
      return this._mousePosition || {
        x: 0,
        y: 0
      };
    }
    /**
     * (getter/setter) indicates whether the user's shift (or mod) key is pressed.
     *
     * @type {boolean}
     * @default false
     */

  }, {
    key: "shiftKey",
    set: function set(value) {
      this._shiftKey = value === true;
    },
    get: function get() {
      return this._shiftKey === true;
    }
    /**
     * (getter/setter) indicates whether the user's mouse is down on the resize
     * button. this simply provides a hard case boolean for this value.
     *
     * @type {boolean}
     * @default false
     */

  }, {
    key: "mouseDownResize",
    set: function set(value) {
      this._mouseDownResize = value === true;
    },
    get: function get() {
      return this._mouseDownResize === true;
    }
    /**
     * (getter) the sticker type.
     *
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
        type: Sticker.stickerType,
        params: [this.texture.textureCacheIds[0]],
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
    key: "defaultButtonScale",
    set: function set(value) {
      if (value > 0) Sticker._defaultButtonScale = value;
    },
    get: function get() {
      return Sticker._defaultButtonScale || .5;
    }
  }, {
    key: "stickerType",
    get: function get() {
      return 'basic-sticker';
    }
  }]);

  return Sticker;
}(PIXI.Container);
/*
 * The button names to use
 * @constant
 * @type {string}
*/


Sticker.BUTTON_DELETE_NAME = 'button_delete';
/*
 * @constant
 * @type {string}
*/

Sticker.BUTTON_RESIZE_NAME = 'button_resize';
/*
 * The button types. Mainly used for positioning.
 * @constant
 * @type {number}
*/

Sticker.BUTTON_DELETE = 0;
/*
 * @constant
 * @type {number}
*/

Sticker.BUTTON_RESIZE = 1;
var _default = Sticker;
exports.default = _default;