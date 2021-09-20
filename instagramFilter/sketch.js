// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var userSelection =1;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    if(key === '2'){
      image(secondFilterOption(imgIn), imgIn.width, 0);
    }
    if(key === '3'){
      image(thirdFilterOption(imgIn), imgIn.width, 0);
    }
    if(key === '1'){
      image(earlyBirdFilter(imgIn), imgIn.width, 0);
    }
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
/////////////////////////////////////////////////////////////////
function keyPressed() {
  loop();
}
////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = sepiaFilter(imgIn);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  return resultImg;
}

function secondFilterOption(img){
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = invertFilter(imgIn);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  return resultImg;
}

function thirdFilterOption(img){
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = greyscaleFilter(imgIn);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  return resultImg;
}
////////////////////////////////////////////////////////////////
function sepiaFilter(imgIn){
  var imgOut = createImage(imgIn.width, imgIn.height);

  imgOut.loadPixels();
  imgIn.loadPixels();

  for (var x = 0; x < imgOut.width; x++) {
    for (var y = 0; y < imgOut.height; y++) {

      var index = (x + y * imgOut.width) * 4;

      var oldRed = imgIn.pixels[index+0];
      var oldGreen = imgIn.pixels[index+1];
      var oldBlue = imgIn.pixels[index+2];

      newRed = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189)
      newGreen = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168)
      newBlue = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131)

      imgOut.pixels[index + 0] = newRed;
      imgOut.pixels[index + 1] = newGreen;
      imgOut.pixels[index + 2] = newBlue;
      imgOut.pixels[index + 3] = 255;
    }
  }

  imgOut.updatePixels();
  return imgOut;
}

function invertFilter(imgIn){
  var imgOut = createImage(imgIn.width, imgIn.height);

  imgOut.loadPixels();
  imgIn.loadPixels();

  for (var x = 0; x < imgOut.width; x++) {
    for (var y = 0; y < imgOut.height; y++) {

      var index = (x + y * imgOut.width) * 4;

      var newRed = 255 - imgIn.pixels[index + 0];
      var newGreen = 255 - imgIn.pixels[index + 1];
      var newBlue = 255 - imgIn.pixels[index + 2];

      imgOut.pixels[index + 0] = newRed;
      imgOut.pixels[index + 1] = newGreen;
      imgOut.pixels[index + 2] = newBlue;
      imgOut.pixels[index + 3] = 255;
    }
  }

  imgOut.updatePixels();
  return imgOut;
}

function greyscaleFilter(img){
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
      for (y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;

          var r = img.pixels[index + 0];
          var g = img.pixels[index + 1];
          var b = img.pixels[index + 2];

          var gray = (r + g + b) / 3; // simple
          //var gray = r * 0.299 + g * 0.587 + b * 0.0114; // LUMA ratios

          imgOut.pixels[index+0]= imgOut.pixels[index+1] = imgOut.pixels[index+2] = gray;
          imgOut.pixels[index+3]= 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

function darkCorners(imgIn){
  // adjust the luminosity/brightness of the pixel by scaling each colour channel
  var dynLum; //1 tp 0.4
  var distance; //300 to 450
  var imgOut = createImage(imgIn.width, imgIn.height);

  imgOut.loadPixels();
  imgIn.loadPixels();

  for (var x = 0; x < imgOut.width; x++) {
    for (var y = 0; y < imgOut.height; y++) {
      dynLum =1;

      var index = (x + y * imgOut.width) * 4;

      var newRed = imgIn.pixels[index+0];
      var newGreen = imgIn.pixels[index+1];
      var newBlue = imgIn.pixels[index+2];

      distance = dist(imgIn.width/2,imgIn.height/2,x,y);

      if(distance <= 300){
        newRed * 1;
        newGreen * 1;
        newBlue * 1;
      }else if(300 < distance <= 450){
        dynLum = map(distance,301,450,1,0.4);
        newRed *= dynLum;
        newGreen *= dynLum;
        newBlue *= dynLum;
      }else if(distance > 450){
        dynLum = map(distance,450,imgIn.width,0.4,0);
        newRed *= dynLum;
        newGreen *= dynLum;
        newBlue *= dynLum;
      }

      newRed =  constrain(newRed, 0, 255); 
      newGreen =  constrain(newGreen, 0, 255); 
      newBlue =  constrain(newBlue, 0, 255); 

      imgOut.pixels[index + 0] = newRed;
      imgOut.pixels[index + 1] = newGreen;
      imgOut.pixels[index + 2] = newBlue;
      imgOut.pixels[index + 3] = 255;
    }
  }

  imgOut.updatePixels();
  return imgOut;
}

function radialBlurFilter(img){
  //radial filter that blurs more as you move away from its centre.
  var imgOut = createImage(img.width, img.height);
  var matrixSize = matrix.length;

  imgOut.loadPixels();
  img.loadPixels();

  // read every pixel
  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;
          var oldRed = img.pixels[index+0];
          var oldGreen = img.pixels[index+1];
          var oldBlue = img.pixels[index+2];

          var c = convolution(x, y, matrix, matrixSize, img);
           // distance between it and the mouse on the colour image
           var distance = dist(x,y,mouseX,mouseY);
           // console.log(distance);
           //remap the distance from a range 100 to 300 to a new range from 0 to 1
           distance = map(distance,100,300,0,1);
           // console.log(mouseX,mouseY);
           //constrain the returned value from 0 to 1 
          distance = constrain(distance,0,1);
          var dynBlur = distance;
           // console.log(dynBlur);

          imgOut.pixels[index + 0] = c[0]*dynBlur + oldRed*(1-dynBlur);
          imgOut.pixels[index + 1] = c[1]*dynBlur + oldGreen*(1-dynBlur);
          imgOut.pixels[index + 2] = c[2]*dynBlur + oldBlue*(1-dynBlur);
          imgOut.pixels[index + 3] = 255;

      }
  }
  imgOut.updatePixels();
  return imgOut;
}

function convolution(x, y, matrix, matrixSize, img) {
  var totalRed = 0.0;
  var totalGreen = 0.0;
  var totalBlue = 0.0;
  var offset = floor(matrixSize / 2);

  // convolution matrix loop
  for (var i = 0; i < matrixSize; i++) {
      for (var j = 0; j < matrixSize; j++) {
          // Get pixel loc within convolution matrix (loop over the matrix)
          var xloc = x + i - offset;
          var yloc = y + j - offset;
          var index = (xloc + img.width * yloc) * 4;
          // ensure we don't address a pixel that doesn't exist
          index = constrain(index, 0, img.pixels.length - 1);

          // multiply all values with the mask and sum up
          totalRed += img.pixels[index + 0] * matrix[i][j];
          totalGreen += img.pixels[index + 1] * matrix[i][j];
          totalBlue += img.pixels[index + 2] * matrix[i][j];
      }
  }
  // return the new color
  return [totalRed, totalGreen, totalBlue];
}

function borderFilter(imgIn){
  var buffer = createGraphics(imgIn.width, imgIn.height);
  // var imgOut = createImage(imgIn.width, imgIn.height);

  // buffer.loadPixels();
  imgIn.loadPixels();

  buffer.image(imgIn,0, 0);
  buffer.noFill();
  buffer.stroke(255);
  buffer.strokeWeight(40);
  buffer.rect(0,0, imgIn.width, imgIn.height,70);
  
  buffer.rect(0,0, imgIn.width, imgIn.height);

  buffer.updatePixels();
  return buffer;
}
