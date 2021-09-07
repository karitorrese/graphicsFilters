
var imgs = [];
var avgImg;
var numOfImages = 30;
var selectedImg = 0;
var stop = false;
var value=0;

function preload() {
    var filename;
    for(i=0; i<30; i++){
        filename = 'assets/'+i+'.jpg';
        imgs.push(loadImage(filename));
    }
}

function setup() {
    //createCanvas(512, 512);
    createCanvas(1536, 512);
    pixelDensity(1);
    noStroke();
    frameRate(12);

    delaySec = 5;

    avgImg = createGraphics(512, 512); //buffer to save the results of our calculation
}

function draw() {
    background(125);
    image(imgs[selectedImg], 0, 0);
    noLoop();
    for (var i = 0; i < imgs.length; i++){
        imgs[i].loadPixels();
        avgImg.loadPixels();
        var one = imgs[i];
        drawPhotos(one,  imgs.length );
        image(avgImg, 512, 0);
    }
    if(value!==0){
        image(avgImg, 1024, 0,10-value);
    }
}

//image drawn on the left is a random face
function keyPressed() {
    // s key
    if (keyCode === 83) {
        selectedImg = round(random(0,29));
        image(imgs[selectedImg], 0, 0);
    }
}
function mouseMoved() {

    if(value>-512){
        value = value - 5;
        console.log(value);
        image(avgImg, 1024, 0,10-value);
    }
}


//image and 30, finalImg
function drawPhotos(img, num) {
    loadPixels();
    img.loadPixels();
    avgImg.loadPixels();

    var index, pxLoc;
    var r, g, b;
    var sumR, sumG, sumB;
    var d = pixelDensity();
    for (var m = 0; m < img.width; m++) {
        for (var n = 0; n < img.height; n++) {
            
            //Convert the x and y coordinates from the for-loop to a pixel index value
            index = 512 * n + m;
            pxLoc = index * 4;
            r = img.pixels[pxLoc];
            g = img.pixels[pxLoc + 1];
            b = img.pixels[pxLoc + 2];
            // // loop over
            for (var i = 0; i < d; i++) {
                for (var j = 0; j < d; j++) {
                idx = 4 * ((n * d + j) * (512 * d) + (m * d + i));
                sumR = pixels[idx] * (num ) / num + r / float(num);
                sumG = pixels[idx + 1] * (num ) / num + g / float(num);
                sumB = pixels[idx + 2] * (num ) / num + b / float(num);
                }
            }
            avgImg.set(m,n,color(sumR,sumG,sumB));
            
        }
    }
    avgImg.updatePixels();
}


