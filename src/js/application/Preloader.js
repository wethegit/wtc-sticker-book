
const preload = PIXI.loader;
let resources = preload.resources;

const loader = (images, callback) => {
  for(const name in images) {
    preload.add(name, images[name]);
  }
  preload.load((loader, resources) => {
    if(callback instanceof Function) {
      callback(loader, resources);
    }
  });
  return loader.resources;
}

export { loader as default, resources, preload };