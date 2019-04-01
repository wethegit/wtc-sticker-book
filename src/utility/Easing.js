
let easeOutExpo = (time, begin, change, duration) => {
  return (time==duration) ? begin+change : change * (-Math.pow(2, -10 * time/duration) + 1) + begin;
}

export { easeOutExpo }