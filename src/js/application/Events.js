const eventListener = new EventEmitter();

// This just allows us to pass in an event object and pause / cancel it.
const pauseEvent = (e)=> {
  if(e.stopPropagation) e.stopPropagation();
  if(e.preventDefault) e.preventDefault();
  e.cancelBubble=true;
  e.returnValue=false;
  return false;
}

export { eventListener as default, pauseEvent };