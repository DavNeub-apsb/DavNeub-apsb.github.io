// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#invert").on("click",applyInvert);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  
  applyFilterNoBackground(reddify);
  applyFilter(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);
  applyFilter(reddify);

  render($("#display"), image);
}
function applyInvert(){
  applyFilter(invert);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2, 3 & 5: Create the applyFilter function here
function applyFilter(filterFunction){
  for(var i = 0; i < image.length; i++){
    for(var j = 0; j <image[i].length; j++){
      //console.log(image[i][j]);
      var pixel = image[i][j];
      var pixelArray = rgbStringToArray(pixel);
      //This is where I'll modify color values later.
      filterFunction(pixelArray);
      var updatedPixel = rgbArrayToString(pixelArray);
      image[i][j] = updatedPixel;
    }
  }
}

// TODO 9 Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
  var backgroundColor = image[0][0];
  for(var i = 0; i < image.length; i++){
    for(var j = 0; j <image[i].length; j++){
      if(image[i][j] !== backgroundColor){
        var pixel = image[i][j];
        var pixelArray = rgbStringToArray(pixel);
        //This is where I'll modify color values later.
        filterFunction(pixelArray);
        var updatedPixel = rgbArrayToString(pixelArray);
        image[i][j] = updatedPixel;
      }
    }
  }
}

// TODO 6: Create the keepInBounds function
function keepInBounds(num){
  if(num < 0){
    return 0;
  }else if(num > 255){
    return 255;
  }else {
    return num;
  }
}

// TODO 4: Create reddify filter function
function reddify(pixelArray){
  pixelArray[RED]= 200;
}

// TODO 7 & 8: Create more filter functions
function decreaseBlue(pixelArray){
  pixelArray[BLUE] -= 50
  pixelArray[BLUE] = keepInBounds(pixelArray[BLUE]);
}
function increaseGreenByBlue(pixelArray){
  var valGreen = pixelArray[GREEN];
  var valBlue = pixelArray[BLUE];
  valGreen += valBlue;
  valGreen = keepInBounds(valGreen);
  pixelArray[GREEN] = valGreen;
}
// CHALLENGE code goes below here
function invert(pixelArray){
  pixelArray[RED] = 255 - pixelArray[RED];
  pixelArray[RED] = keepInBounds(pixelArray[RED]);
  pixelArray[GREEN] = 255 - pixelArray[GREEN];
  pixelArray[GREEN] = keepInBounds(pixelArray[GREEN]);
  pixelArray[BLUE] = 255 - pixelArray[BLUE];
  pixelArray[BLUE] = keepInBounds(pixelArray[BLUE]);
}