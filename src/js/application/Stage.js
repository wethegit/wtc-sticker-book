
import Sticker from '../DisplayObject/Sticker';
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
      this.setViewportDimensions(width, height);
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
    eventListener.addListener('set-background', (value, type) => {
      this.setBackground(value, type);
    });
    /**
     * Listens for the addSticker event and adds the specified sticker.
     *
     * @method
     * @param {DisplayObject:Sticker} value - The sticker element to add.
     * @listens Events:add-sticker
     */
    eventListener.addListener('add-sticker', (value) => {
      console.log('adding sticker')
      console.log(value)
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
    
    this.stage.addChild(this.bg);
  }
  /**
   * This sets the viewport dimentsions
   *
   * @public
   * @param {string} value              A string representing the identifier of the sprite image loaded into the pixi loader
   * @return null
   */
  /**
   * This adds a sticker to the stage
   *
   * @public
   * @param {string} value              A string representing the identifier of the sprite image loaded into the pixi loader
   * @param {object} [position=null]    The pre-set position of the sticker
   * @param {number} [rotation=0]       The pre-set rotation of the sticker
   * @param {number} [radius=130]       The pre-set radius of the sticker
   * @return null
   */
  addSticker(value, position = null, rotation = 0, radius = 130) {
    if(!resources[value]) return;
    
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
    let texture = resources[value].texture;
    let sprite = new Sticker(texture);
    
    // set position, radius and rotation
    sprite.position.x = settings.position.x;
    sprite.position.y = settings.position.y;
    sprite.radius = settings.radius;
    sprite.stickerRotation = settings.rotation;
    
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
     * @event sticker-added
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

Stage.BG_TYPE_SCENE = 0;
Stage.BG_TYPE_TILE = 1;

export default Stage;