const preload = PIXI.loader;
let resources = preload.resources;
let ready = true;
let queue = [];

const loader = (images, callback) => {
  if (!ready) {
    queue.push([images, callback]);
    return;
  }

  ready = false;

  let toLoad = 0;
  for (const name in images) {
    if (resources[name]) return;
    toLoad++;
    preload.add(name, images[name]);
  }

  if (toLoad <= 0) {
    if (callback) callback(loader, resources);
    return;
  }

  preload.load((loaderResult, resources) => {
    if (callback instanceof Function) callback(loaderResult, resources);

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
