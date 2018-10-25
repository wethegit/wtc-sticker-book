import Stage from '../application/Stage';
import { default as eventListener, pauseEvent } from '../application/Events';
import { resources } from '../application/Preloader';
import Sticker from './Sticker';

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
class TextSticker extends Sticker {
  
  /**
   * The Sticker Class constructor. Takes a texture object and creates the sticker.
   *
   * @constructor
   * @param {PIXI.Texture} texture         The texture object to use to create the sticker
   */
  constructor(texture, text, fontFamily, fontSize, strokeWidth) {
    super();
    
    this.text = text;
    this.fontSize = fontSize;
    this.strokeWidth = strokeWidth;
    this.fontFamily = fontFamily;
    
    this.initialised = true;
    this.createSprite();
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
  createSprite() {
    // deferring this method
    if(this.initialised === true) {
      // Create the canvas
      this.canvas = document.createElement('canvas');
      let ctx = this.canvas.getContext('2d');
      // Split the text along provided newline characters
      const textlines = this.text.split("\\r\\n");
      // Line width is used to measure how wide the canvas needs to be
      let lineWidth = 0;

      // Set the font based on the provided values
      ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`; // This is here purely to run the measurements

      // Loop through the lines and adjust the canvas width based on whether "this" is wider than lineWidth
      textlines.forEach((line, i) => {
        let w = ctx.measureText(line).width;
        if(w > lineWidth) {
          lineWidth = w;
        }
      });

      // Set the canvas dimensions based on the calculated values
      this.canvas.width = (lineWidth + this.strokeWidth * 2.) * 2.;
      this.canvas.height = (this.fontSize * textlines.length + this.strokeWidth * 2.) * 2.;

      // Set up the canvas for drawing
      ctx = this.canvas.getContext('2d');
      ctx.font = `${this.fontWeight} ${this.fontSize*2}px ${this.fontFamily}`;
      ctx.textAlign="center";
      ctx.textBaseline="middle"; 
      ctx.lineWidth = this.strokeWidth;

      // Loop through the lines and draw each one.
      textlines.forEach((line, i) => {
        let linepos = this.canvas.height * 1. / textlines.length;
        linepos = this.fontSize * 2. * .5 + i * linepos;

        ctx.strokeStyle = 'black';
        ctx.fillStyle = "white";
        ctx.lineWidth = this.strokeWidth * 2.;
        ctx.strokeText(line, this.canvas.width*.5, linepos);

        ctx.fillText(line, this.canvas.width*.5, linepos);
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
  set text(value) {
    if(typeof value === 'string') {
      this._text = value;
    }
  }
  get text() {
    return this._text || null;
  }
  /**
   * (getter/setter) The font size, in pixels.
   *
   * @type {number}
   * @default 60
   */
  set fontSize(value) {
    if(value > 0) this._fontSize = value;
  }
  get fontSize() {
    return this._fontSize || 60;
  }
  /**
   * (getter/setter) The stroke width, in pixels.
   *
   * @type {number}
   * @default 10
   */
  set strokeWidth(value) {
    if(value > 0) this._strokeWidth = value;
  }
  get strokeWidth() {
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
  set fontFamily(value) {
    if(typeof value === 'string') this._fontFamily = value;
  }
  get fontFamily() {
    return this._fontFamily || 'helvetica';
  }
  /**
   * (getter/setter) The font weight. Light, bold, 600 etc.
   * are all valid values.
   *
   * @type {number}
   * @default ''
   */
  set fontWeight(value) {
    if(typeof value === 'string' || value > 0) this._fontWeight = value;
  }
  get fontWeight() {
    return this._fontWeight || '';
  }
  /**
   * (getter/setter) Whether the sprite itself has been initialised
   *
   * @type {boolean}
   * @default false
   */
  set initialised(value) {
    this._initialised = value === true;
  }
  get initialised() {
    return this._initialised === true;
  }
  /**
   * (getter/setter) The canvas element for use by the class to
   * render the text for insertion into the sprite.
   *
   * @type {DOMElement}
   * @default null
   */
  set canvas(value) {
    if(value && typeof value.getContext === 'function') this._canvas = value;
  }
  get canvas() {
    return this._canvas || null;
  }
  
  /**
   * (getter) the sticker type.
   *
   * @readonly
   * @type {string}
   */
  get stickerType() {
    return 'text-sticker';
  }
  /**
   * (getter) the object representation of this sticker.
   *
   * @readonly
   * @type {object}
   */
  get definition() {
    const output = {
      type: this.stickerType,
      text: this.text,
      fontSize: this.fontSize,
      strokeWidth: this.strokeWidth,
      fontFamily: this.fontFamily,
      radius: this.radius,
      position: { x: this.position.x, y: this.position.y },
      rotation: this.stickerRotation
    }
    return output;
  }
}

export default TextSticker;