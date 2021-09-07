
var confLocs = []; //location of each confetti
var confTheta = []; // initial angle of each confetti
var slider1; 
var slider2; 
var slider3; 

setup = () => {
    
    createCanvas(900, 800, WEBGL);
    textSize(45);

    //for loop to push 200 3D vectors into confLocs
    for(let x=0; x<=200;x++){
        confLocs.push(createVector(random(-500 , 500 ), random(-800 , 0), random(-500 , 500 )));
        confTheta.push(random(0, 360));
    }

    sliderOne = createSlider(2, 6, 2);
    sliderOne.position(50, 20);
    sliderOne.style('width', '80px');

    sliderTwo = createSlider(1, 10, 1);
    sliderTwo.position(50, 50);
    sliderTwo.style('width', '80px');

    sliderThree = createSlider(1, 4, 1);
    sliderThree.position(50, 80);
    sliderThree.style('width', '80px');
}

confetti = () => {
    
    for(let i=0; i<=confLocs.length; i++){
        
        push();

        noStroke();
        ambientLight(200);
        ambientMaterial(random(0,250),random(0,250),random(0,250));

        //translate to that location the 3D vector describes
        translate(confLocs[i]);
        //rotate by the corresponding theta and draw a plane of size 15x15
        rotateX(confTheta[i]*.5);
        plane(15, 15);
        pop();
    }
    for (var j=0; j<confLocs.length; j++){
        push();
        confLocs[j].y += 1;
        confTheta[j] += 20;
        pop();
        if(confLocs[j].y > 0){
            confLocs[j].y = -800;
        }
      }
}

boxes = () => {
    //grid of boxes

    for (let x=-400; x <= 400; x +=50){
        for (let z=-400; z <= 400; z +=50){
        push();
        
        ////slider affects speed of the movement of the boxes
        slider2 = sliderTwo.value();

        //slider affects height of boxes
        slider1 = sliderOne.value();

        var distance;
        var length;
        distance = dist(0,0,x, z) + frameCount * slider2;
        //100 to 300 using the sin()
        length = (sin(distance)+1)/2 * (100 * slider1) + 100;

        
        length += 25 * slider1;

        normalMaterial();
        stroke(0);
        strokeWeight(2);
        translate(x, 0, z);  
        box(50,length,50);
        pop(); 
        }
    }
    
}

sliders = () => {
    slider = createSlider(0, 255, 100);
    slider.position(50, 20);
    slider.style('width', '80px');
}

draw = () => {
    background(80);
    angleMode(DEGREES);

    slider3 = sliderThree.value();

    //Camera
    var xLoc =  cos(frameCount*slider3) * 800;
    var zLoc = sin(frameCount*slider3) * 800;
    camera(xLoc*1.5, -800, zLoc*1.5, 0, 0, 0, 0, 1, 0);
    
    boxes();
    confetti();
    
}
