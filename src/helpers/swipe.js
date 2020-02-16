let xDown = null;
let yDown = null;
 
function handleTouchStart(e) {
  xDown = e.touches[0].clientX;
  yDown = e.touches[0].clientY;
}
 
function handleTouchMove(e) {
  if ( ! xDown || ! yDown ) {
    e.preventDefault();
    return false;
  }

  let swipe = {
    left: false,
    right: false
  };

  let xUp = e.touches[0].clientX;
  let yUp = e.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if(Math.abs(xDiff) > Math.abs(yDiff)){
    if (xDiff > 10){
      swipe.left = true;
    } else if (xDiff < -10){
      swipe.right = true;
    }
  }

  xDown = null;
  yDown = null;

  if (swipe.left || swipe.right) {
    e.preventDefault();
    e.stopPropagation();
    return swipe;
  }
}

export {handleTouchStart, handleTouchMove}
