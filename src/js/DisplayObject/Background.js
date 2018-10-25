import Stage from '../application/Stage';
import { default as eventListener, pauseEvent } from '../application/Events';
import { resources } from '../application/Preloader';

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
class Background extends PIXI.extras.TilingSprite {
  
  /**
   * The Background Class constructor. Takes a texture object and creates the tiling sprite (background).
   *
   * @constructor
   * @param {PIXI.Texture} texture         The texture object to use to create the tiling background
   * @param {number} width         The width of the stage
   * @param {number} height         The height of the stage
   */
  constructor(texture, width, height) {
    super(texture, width, height);
    // super();
    
    this.anchor.x = .5;
    this.anchor.y = .5;
    
    // Bind the listeners to the class
    this.onStageResize = this.onStageResize.bind(this);
    
    eventListener.addListener('stage-resize', this.onStageResize);
    
    // Fire the resize event manually so that the container 
    setTimeout(() => {
      this.onStageResize(width, height);
    }, 0);
  }
  
  
  /**
   * This method detects whether the sticker should be destroyed by testing whether it has 
   * a parent element.
   *
   * @public
   * @return boolean  Whether or not this element has been destroyed in the process of doing this
   */
  detectDestroy() {
    if(this.parent === null) {
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
  destroy() {
    super.destroy();
    
    // Removing external event listeners
    eventListener.off('stage-resize', this.onStageResize);
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
  onStageResize(width, height) {
    const destroyed = this.detectDestroy();
    
    if(destroyed) return;
    
    let textureRatio = this.texture.width / this.texture.height;
    let stageRatio = width / height;
    
    this.width = width;
    this.height = height;
    
    // If the texture size is greater than the stage size, then we need to scale it down
    if(this.texture.width > width || this.texture.height > height) {
      if(textureRatio > stageRatio) {
        // cropping a landscape to a landscape OR
        // a portrait to a portrait
        // or landscape to a portrait
        this.tileScale.y = this.height / this.texture.height;
        this.tileScale.x = this.tileScale.y * textureRatio;

        // cropPosition[1] = targetDimensions[1] / 2. - resizeDimensions[1] / 2.;
        // cropPosition[0] = 0;
      } else {
        // cropping a portrait to a landscape
        this.tileScale.x = this.width / this.texture.width;
        this.tileScale.y = this.tileScale.x / textureRatio;

        // cropPosition[1] = targetDimensions[1] / 2. - resizeDimensions[1] / 2.;
        // cropPosition[0] = 0;
      }
    }
    
    this.position.x = width * .5;
    this.position.y = height * .5;
    
  }
}

export default Background;