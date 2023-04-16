let video;
let poseNet;

let poses = [];
let bodies = [];

let errorCounter = 0;
let ball;

let initialized = false;

function setup() {
    createCanvas(640, 480);


    video = createCapture(VIDEO, ()=>{ initialized = true;});
    video.size(width, height);
    video.style.transform = "scale(-1, 1)";
    video.hide();


    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', function(results) {
        poses = results;
    });



    ball = new Ball(width / 2, 0);

   
}

function modelReady() {
  console.log('Model Loaded!');
}

function draw() {

    if(!initialized) {
        stroke(0)
        strokeWeight(10);
        rect(0,0,width,height);
        noStroke();
        textAlign(CENTER);
        textSize(48);
        text("Waiting for camera...", width/2, height/2 + 24);
        return;
    }

    background(255);

    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    
    let newBodies = getPosenetBodies();
    
    if(newBodies.length == 0){
        errorCounter++;
    }
    else{
        bodies = newBodies;
        errorCounter = 0;
    }

    if(errorCounter < 200){

        for(const body of bodies){

            for (let limb in body.limbs){
                drawLimb(body.limbs[limb]);
            };

            let head = body.head;
            let leftHand = body.limbs.leftForearm.end;
            let rightHand = body.limbs.rightForearm.end;

            noStroke();
            fill(255);
            circle(head.x, head.y, head.diameter);

            noFill();
            strokeWeight(4);
            stroke(0,255,0);
            circle(leftHand.x, leftHand.y, 100);
            circle(rightHand.x, rightHand.y, 100);

            if(dist(leftHand.x, leftHand.y, ball.pos.x, ball.pos.y) <= 100) {
                let handVec = createVector(leftHand.x, leftHand.y);
                ball.bounce(handVec);
            }
            
            if(dist(rightHand.x, rightHand.y, ball.pos.x, ball.pos.y) <= 100){
                let handVec = createVector(rightHand.x, rightHand.y);
                ball.bounce(handVec);
            } 

        }
    }
           
    ball.move();
    ball.draw();

    if(ball.pos.x <0 || ball.pos.x > width) {
        ball.dir.x = -ball.dir.x;
        ball.dir.rotate(-radians(Math.random()*30))
    }

    if(ball.pos.y > height) ball = new Ball(width / 2,0);
}



