"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preload = exports.resources = exports.default = void 0;
var preload = PIXI.loader;
exports.preload = preload;
var resources = preload.resources;
exports.resources = resources;

var loader = function loader(images, callback) {
  for (var name in images) {
    preload.add(name, images[name]);
  }

  preload.load(function (loader, resources) {
    if (callback instanceof Function) {
      callback(loader, resources);
    }
  });
  return loader.resources;
};

exports.default = loader;