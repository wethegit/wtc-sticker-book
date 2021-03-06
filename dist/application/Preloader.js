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
  if (!ready) {
    queue.push([images, callback]);
    return;
  }

  ready = false;
  var toLoad = 0;

  for (var name in images) {
    if (resources[name]) return;
    toLoad++;
    preload.add(name, images[name]);
  }

  if (toLoad <= 0) {
    if (callback) callback(loader, resources);
    return;
  }

  preload.load(function (loaderResult, resources) {
    if (callback instanceof Function) callback(loaderResult, resources);
    ready = true;

    if (queue.length > 0) {
      var next = queue.shift();
      loader(next[0], next[1]);
    }
  });
  return loader.resources;
};

exports.default = loader;