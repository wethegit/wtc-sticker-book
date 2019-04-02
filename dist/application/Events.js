"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pauseEvent = exports.default = void 0;

var EventEmitter = _interopRequireWildcard(require("wolfy87-eventemitter"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var eventListener = new EventEmitter.default(); // This just allows us to pass in an event object and pause / cancel it.

exports.default = eventListener;

var pauseEvent = function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
};
/**
 * @module Application
 */

/**
 * Casts a download event to the application. Used to generate
 * an image and echo it to the user's URL bar.
 *
 * @event stage-download
 * @type {object}
 */

/**
 * Casts a reset event to the application. Used to clear the canvas
 * and start over.
 *
 * @event stage-reset
 * @type {object}
 */

/**
 * Casts a resize event to the application.
 *
 * @event viewport-resize
 * @type {object}
 * @property {number} width - The width to resize the viewport to
 * @property {number} height - The height to resize the viewport to
 */

/**
 * Casts a set background event and sets the background with the value provided.
 *
 * @event set-background
 * @type {object}
 * @property {String|PIXI:Container} value - The background element to add.
 */

/**
 * Casts a add sticker event and sets the background with the value provided.
 * can operate with either a texture identifier or a sticker object.
 *
 * @event add-sticker
 * @type {object}
 * @property {String|PIXI:Container} value - The sticker element to add.
 */

/**
 * Sends a JSON string representing a full stage scene that attempts to add
 * stickers and backgrounds.
 *
 * @event add-scene
 * @type {object}
 * @property {String} value - The JSON representing the full scene to add.
 */

/**
 * Casts the drop sticker event and adds the specified sticker.
 * NB: The position values should be normalised to the canvas PRIOR
 * to being sent to this listener.
 * This can be done using something like:
 * ```
    offset = $(@canvas).offset()
    left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    adjustedGlobalPosition = {x: position.x - offset.left + left, y: position.y - offset.top + top}
   ```
 *
 *
 * @event add-sticker
 * @type {object}
 * @property {DisplayObject:Sticker} value - The sticker element to add.
 * @property {Object} position - the position of the dropped sticker on the canvas
 */


exports.pauseEvent = pauseEvent;