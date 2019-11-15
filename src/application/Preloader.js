const preload = PIXI.loader;
let resources = preload.resources;
let ready = true;
let queue = [];

const loader = (images, callback) => {
  if (!ready) queue.push([images, callback]);

  for (const name in images) {
    preload.add(name, images[name]);
  }

  ready = false;
  preload.load((loader, resources) => {
    if (callback instanceof Function) callback(loader, resources);

    if (queue.length > 0) {
      const next = queue.shift();
      loader(next[0], next[1]);
    } else {
      ready = true;
    }
  });
  return loader.resources;
};

export { loader as default, resources, preload };
