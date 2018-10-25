
import Sticker from '../DisplayObject/Sticker';
import Background from '../DisplayObject/Background';
import eventListener from './Events';
import { easeOutExpo } from '../utility/Easing';
import { resources } from './Preloader';

window.resources = resources;

/**
 * A class that provides a stage for the WTC Stickerbook
 *
 * @class Stage
 * @module Application
 * @author Liam Egan <liam@wethecollective.com>
 * @version 0.1.0
 * @created Oct 17, 2018
 */
class Stage {
  
  /**
   * The Stage Class constructor
   *
   * @constructor
   * @param {number}      w                 The width coord
   * @param {number}      h                 The height coord
   * @param {HTMLElement} container         The HTML element that wull contain the PIXI stage element
   */
  constructor(w, h, container) {
    this.app = new PIXI.Application(w, h, {backgroundColor : 0x666666});
    
    this.container = container;
    
    // Binding necessary functions and callbacks
    this._render = this._render.bind(this);
    
    // This stops PIXI from arresting touch drag events from the
    this.app.renderer.plugins.interaction.autoPreventDefault = false;
    
    // Set up the application dimensions
    this.dimensions = {x: w, y: h};
    
    // bind any relevant event listeners
    this.onClick = this.onClick.bind(this);
    
    window.t = this;
  }
  
  
  /**
   * Public methods
   */
  
  init() {
    
    // Set up the basic structure of the stage
    this.reset();
    
    // Set up the various callbacks    
    window.addEventListener('pointerdown', this.onClick);
    /**
     * @todo Document all of these events in the Events container
     */
    /**
     * Listens for a resize event cast from an unspecified location.
     *
     * @method
     * @param {number} width - The width to resize the viewport to
     * @param {number} height - The height to resize the viewport to
     * @listens Events:viewport-resize
     */
    eventListener.addListener('viewport-resize', (width, height) => {
      // this.setViewportDimensions(width, height);
      this.dimensions = {x: width, y: height};
    });
    /**
     * Listens for a set background event cast from an unspecified location
     * and sets the background with the value provided.
     *
     * @method
     * @param {PIXI:Container} value - The background element to add.
     * @param {number} type - The type of the background, can be scene or tiling.
     * @listens Events:set-background
     */
    eventListener.addListener('set-background', (value) => {
      this.setBackground(value);
    });
    /**
     * Listens for the addSticker event and adds the specified sticker.
     *
     * @method
     * @param {DisplayObject:Sticker} value - The sticker element to add.
     * @listens Events:add-sticker
     */
    eventListener.addListener('add-sticker', (value) => {
      this.addSticker(value);
    });
    /**
     * Listens for the drop sticker event and adds the specified sticker.
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
     * @method
     * @param {DisplayObject:Sticker} value - The sticker element to add.
     * @param {Object} position - the position of the dropped sticker on the canvas
     * @listens Events:drop-sticker
     */
    eventListener.addListener('drop-sticker', (value, position) => {
      this.dropSticker(value, position);
    });
    
    this.initialised = true;
  }
  
  /**
   * This destroys the stage, this should be fired whenever you need to
   * remove the stage and get rid of any memory traces of it. For example
   * when changing a page on an ajax site or whatever.
   *
   * @public
   * @return null
   */
  destroy() {
    // @todo add more destruction here.
    // Remove all relevant event listeners
    window.removeEventListener('pointerdown', this.onClick);
  }
  
  /**
   * This resets the application, setting up all of the basic components
   *
   * @public
   * @return null
   */
  reset() {
    this.stage = new PIXI.Container();
    this.bg = new PIXI.Container();
    this.foreground = new PIXI.Container();
    this.cardRear = new PIXI.Container();
  }
  /**
   * This adds a sticker to a specific location on the stage. This is
   * distinct from the addSticker insofar as it takes a position and
   * massages it to conform with local space.
   *
   * @public
   * @param {string|Sticker} value        A string representing the identifier of the sprite image loaded into the pixi loader, *OR* a Sticker itself
   * @param {object} position             The position of the dropped sticker.
   */
  dropSticker(value, position) {
    if( !resources[value] && !(value instanceof Sticker) ) return;
    window.app = this.app
    let offset = this.app.view.getBoundingClientRect();
    offset = {
      top: offset.top + document.body.scrollTop,
      left: offset.left + document.body.scrollLeft
    }
    
    const adjustedGlobalPosition = {
      x: position.x - offset.left, 
      y: position.y - offset.top };
    const adjustedCanvasPosition = {
      x: adjustedGlobalPosition.x / this.stageRatio, 
      y: adjustedGlobalPosition.y / this.stageRatio };
    this.addSticker(value, adjustedCanvasPosition);
  }
  /**
   * This adds a sticker to the stage
   *
   * @public
   * @param {string|Sticker} value              A string representing the identifier of the sprite image loaded into the pixi loader, *OR* a Sticker itself
   * @param {object} [position=null]    The pre-set position of the sticker
   * @param {number} [rotation=0]       The pre-set rotation of the sticker
   * @param {number} [radius=130]       The pre-set radius of the sticker
   * @return null
   */
  addSticker(value, position = null, rotation = 0, radius = 130) {
    if( !resources[value] && !(value instanceof Sticker) ) return;
    
    let sprite;
    
    // create the settings object
    let settings = {
      position : {
        x: position && !isNaN(position.x) ? position.x : this.dimensions.x * .5,
        y: position && !isNaN(position.y) ? position.y : this.dimensions.y * .5
      },
      rotation: rotation,
      radius: radius
    };
    
    // set up the sticker
    if(value instanceof Sticker) {
      sprite = value;
    } else {
      let texture = resources[value].texture;
      sprite = new Sticker(texture);
    }
    
    // set position, radius and rotation
    sprite.position.x = settings.position.x;
    sprite.position.y = settings.position.y;
    sprite.radius = settings.radius;
    sprite.stickerRotation = settings.rotation;
    
    // If the added sticker is larger than the stage, then we want to scale it down.
    if(sprite.w > this.dimensions.x) {
      const ratio = sprite.ratio;
      const tw = this.dimensions.x / sprite.w * 100; // This is the percentage difference between the stage width and the sticker width
      const trad = sprite.radius / 100 * tw; // Now modify the sprite's radius by that difference
      
      sprite.radius = trad;
    }
    
    // This just runs a small transition across the sprite, making it scale up and fade in from 0
    sprite.alpha = 0;
    sprite.scale.x = sprite.scale.y = 0;
    let now = performance.now();
    const tweener = (delta) => {
      let time = delta - now;
      if(time < 400) {
        sprite.scale.x = sprite.scale.y = sprite.alpha = easeOutExpo(time, 0, 1, 400);
        requestAnimationFrame(tweener);
      } else {
        sprite.scale.x = sprite.scale.y = sprite.alpha = 1;
      }
    };
    requestAnimationFrame(tweener);
    
    this.foreground.addChild(sprite);
    
    sprite.focus();
  }
  /**
   * This adds a background. Backgrounds are always singular, so adding a 
   * new background will also remove the old one.
   * One new thing added here is that all backgrounds are tiling, this
   * makes certain that all backgrounds are usable at all possible
   * resolutions. We tile out from the centre.
   *
   * @public
   * @param {string|PIXI.Container} value              A string representing the identifier of the sprite image loaded into the pixi loader, *OR* a Container itself
   * @return void
   */
  setBackground(value) {
    this.background = value;
    
    // Clear out the other children (there can only be one background at a time)
    if(this.bg) {
      this.bg.children.forEach((child) => {
        this.bg.removeChild(child);
      });
    }
    
    if(value === Stage.BG_CLEAR) {
      return;
    }
    if( !resources[value] && !(value instanceof PIXI.Container) ) return;
    
    let backgroundSprite;
    
    if(resources[value]) {
      let texture = resources[value].texture;
      backgroundSprite = new Background(texture, this.dimensions.x, this.dimensions.y);
    } else {
      
    }
    
    if(this.bg) {
      this.bg.addChild(backgroundSprite);
    }
  }
  /**
   * This outputs the scene for use as a data object. Mainly the use
   * for this is to generate pre-populated scenes, but it could also
   * be used to allow the user to share their scene.
   *
   * @public
   * @param {string} format
   * @return {object|string}   A representation of the scene, for consumption by an instance of the Sticker book
   */
  outputScene(format = 'json') {
    let output = {
      background: null,
      stickers: []
    };
    this.foreground.children.forEach((sticker) => {
      console.log(sticker, sticker.definition);
      output.stickers.push(sticker.definition);
    });
    
    if(format === 'json') {
      return JSON.stringify(output);
    }
    
    return output;
  }
  
  
  /**
   * Private methods
   */
  /**
   * This is the callback for the animation frame.
   *
   * @private
   * @param {number} delta    The delta as passed by requestAnimationFrame
   */
  _render(delta) {
    if(this.rendering) {
      requestAnimationFrame(this._render);
    }
  }
  
  /**
   * Event callbacks
   */
  onClick() {
    /**
     * On click event. This is when you click anywhere in the window and will just
     * send an unfocus event to all relevant sub elements.
     *
     * @event sticker-unfocus
     * @type {object}
     */
    setTimeout(()=> eventListener.emitEvent('sticker-unfocus', [this]), 10);
    
  }
  
  
  /**
   * Getters and setters
   */
  
  /**
   * (getter/setter) Whether the application is running (rendering). Checks to see
   * if a truthy value already exists and starts up the rendering process if not.
   *
   * @type {boolean}
   * @default false
   */
  set rendering(value) {
    if(this.rendering === false && value === true) {
      this._rendering = true;
      
      requestAnimationFrame(this._render);
    } else {
      this._rendering = false;
    }
  }
  get rendering() {
    return this._rendering === true;
  }
  /**
   * (getter/setter) Set up the container (HTML Element) which serves as the 
   * HTML root of the application.
   *
   * @type {HTMLElement}
   * @default null
   */
  set container(value) {
    if(value instanceof HTMLElement) {
      if(this.container instanceof HTMLElement) {
        /**
         * @todo Set up a facility whereby the PIXI application is removed 
         * from the old container and moved to the new one.
         */
      }
      value.appendChild(this.app.view);
      this._container = value;
    }
  }
  get container() {
    return this._container || null;
  }
  /**
   * (getter/setter) Set up the application (PIXI application)
   *
   * @type {Object}
   * @default null
   */
  set app(value) {
    if(value instanceof PIXI.Application) {
      this._app = value;
    }
  }
  get app() {
    return this._app || null;
  }
  /**
   * (getter/setter) Ad dthe stage instance and remove any already
   * existing stage elements
   *
   * @type {PIXI.Container}
   * @default null
   */
  set stage(value) {
    if( value instanceof PIXI.Container ) {
      if(this.stage instanceof PIXI.Container ) {
        this.app.stage.removeChild(this.stage);
      }
      this._stage = value;
      this._stage.name = 'rootStage';
      this.app.stage.addChild(this.stage);
      window.applicationStage = this.app.stage;
    }
  }
  get stage() {
    return this._stage || null;
  }
  /**
   * (getter/setter) Add the background instance and remove any
   * already existing stage elements
   *
   * @type {PIXI.Container}
   * @default null
   */
  set bg(value) {
    if( value instanceof PIXI.Container ) {
      if(this.bg instanceof PIXI.Container ) {
        this.stage.removeChild(this.bg);
      }
      this._bg = value;;
      this._bg.name = 'background';
      this.stage.addChild(this.bg);
    }
  }
  get bg() {
    return this._bg || null;
  }
  /**
   * (getter/setter) the background identifier. This is the 
   * string or constant that identifies how to draw the
   * sticker book's background.
   *
   * @type {string|int}
   * @default {Stage.BG_CLEAR}
   */
  set background(value) {
    if(typeof value === 'string' || value === Stage.BG_CLEAR) {
      this._background = value;
    }
  }
  get background() {
    return this._background || Stage.BG_CLEAR;
  }
  /**
   * (getter/setter) Add the foreground instance and remove any
   * already existing stage elements
   *
   * @type {PIXI.Container}
   * @default null
   */
  set foreground(value) {
    if( value instanceof PIXI.Container ) {
      if(this.foreground instanceof PIXI.Container ) {
        this.stage.removeChild(this.foreground);
      }
      this._foreground = value;
      this._foreground.name = 'foreground';
      this.stage.addChild(this.foreground);
    }
  }
  get foreground() {
    return this._foreground || null;
  }
  /**
   * (getter/setter) Add the rear card instance and remove any
   * already existing stage elements
   *
   * @type {PIXI.Container}
   * @default null
   */
  set cardRear(value) {
    if( value instanceof PIXI.Container ) {
      if(this.cardRear instanceof PIXI.Container ) {
        this.stage.removeChild(this.cardRear);
      }
      this._cardRear = value;
      this._cardRear.name = 'cardRear';
      this.stage.addChild(this.cardRear);
    }
  }
  get cardRear() {
    return this._cardRear || null;
  }
  /**
   * (getter/setter) Set the size of the stage. This will also
   * update the PIXI renderer and resize
   *
   * @type {Object}
   * @default {x: 0, y: 0}
   */
  set dimensions(value) {
    if(typeof value === 'object' && !isNaN(value.x) && !isNaN(value.y)) {
      this._dimensions = value;
      this.stageRatio = value.x / value.y;
      this.app.renderer.resize(value.x * this.pxAspect, value.y * this.pxAspect);
      /**
       * The stage resize event. Fired whenever the dimensions of the stage
       * are reset.
       *
       * @event stage-resize
       * @type {object}
       */
      eventListener.emitEvent('stage-resize', [value.x, value.y]);
    }
  }
  get dimensions() {
    return this._dimensions || {x: 0, y: 0};
  }
  /**
   * (getter/setter) The pixel aspect ratio of the application
   *
   * @type {number}
   * @default 1
   */
  set pxAspect(value) {
    if(value > 0) {
      this._pxAspect = value;
    }
  }
  get pxAspect() {
    return this._pxAspect || 1;
  }
  /**
   * (getter/setter) The stage ratio of the application
   *
   * @type {number}
   * @default 1
   */
  set stageRatio(value) {
    if(value > 0) {
      this._stageRatio = value;
    }
  }
  get stageRatio() {
    return this._stageRatio || 1;
  }
}

Stage.BG_CLEAR = 1;

export default Stage;