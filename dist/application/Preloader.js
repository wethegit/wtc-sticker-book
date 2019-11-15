"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preload = exports.resources = exports.default = void 0;
var preload = PIXI.loader;
exports.preload = preload;
var resources = preload.resources;
exports.resources = resources;
var ready = true;
var queue = [];

var loader = function loader(images, callback) {
  if (!ready) queue.push([images, callback]);

  for (var name in images) {
    preload.add(name, images[name]);
  }

  ready = false;
  preload.load(function (loaderResult, resources) {
    if (callback instanceof Function) callback(loaderResult, resources);

    if (queue.length > 0) {
      var next = queue.shift();
      loader(next[0], next[1]);
    } else {
      ready = true;
    }
  });
  return loader.resources;
};

exports.default = loader;