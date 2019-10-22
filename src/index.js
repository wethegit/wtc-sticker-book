import "./pep.js";
import * as PIXI from "pixi.js";

import Stage from "./application/Stage.js";
import loader, { resources } from "./application/Preloader.js";
import eventListener from "./application/Events.js";
import Sticker from "./DisplayObject/Sticker.js";
import TextSticker from "./DisplayObject/Text-Sticker.js";

export {
  Stage as default,
  PIXI,
  loader,
  resources,
  eventListener,
  Sticker,
  TextSticker
};
