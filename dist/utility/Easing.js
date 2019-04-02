"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.easeOutExpo = void 0;

var easeOutExpo = function easeOutExpo(time, begin, change, duration) {
  return time == duration ? begin + change : change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
};

exports.easeOutExpo = easeOutExpo;