let Limb = function(start, end){
    this.start = start;
    this.end = end;
    this.v = computeVector(start, end);
}

class Body{
    limbs = {};
    constructor(bodyMidpoint, pose){

        let lowerBodyMidpoint = computeMidPoint(pose.leftHip, pose.rightHip);

        if(lowerBodyMidpoint === null && bodyMidpoint !== null){
            lowerBodyMidpoint = {
                "x": bodyMidpoint.x, 
                "y": height
            }
        }

        this.limbs.body = new Limb(bodyMidpoint, lowerBodyMidpoint);

        this.limbs.leftArm = new Limb(bodyMidpoint, pose.leftElbow);
        this.limbs.rightArm = new Limb(bodyMidpoint, pose.rightElbow);

        this.limbs.leftForearm = new Limb(pose.leftElbow, pose.leftWrist);
        this.limbs.rightForearm = new Limb(pose.rightElbow, pose.rightWrist);

        this.limbs.leftThigh = new Limb(lowerBodyMidpoint, pose.leftKnee);
        this.limbs.rightThigh = new Limb(lowerBodyMidpoint, pose.rightKnee);

        this.limbs.leftLeg = new Limb(pose.leftKnee, pose.leftAnkle);
        this.limbs.rightLeg = new Limb(pose.rightKnee, pose.rightAnkle);

        this.head = {
            'x': pose.nose.x,
            'y': pose.nose.y,
            'diameter': Math.abs(pose.leftEar.x - pose.rightEar.x) * 1.2
        }
        
    }
};


function getPosenetBodies() {

    let bodies = [];
    let midpoints = [];

    for(let pose of poses){
        let p = pose.pose;

        let midpoint = computeMidPoint(p.leftShoulder, p.rightShoulder);
        if(midpoint === null) continue;

       

        bodies.push(new Body(midpoint, p))
    }

    return bodies;
}


function computeVector(start, end){

    if(!predictionConfidence(start, end)) return null;

    let vec = createVector(end.x-start.x, end.y - start.y);

    return vec;
}


function drawLimb(limb){
    stroke(255);
    strokeWeight(40);
    line(limb.start.x, limb.start.y, limb.end.x, limb.end.y);
}


function predictionConfidence(a, b){
    return (a.confidence > 0.5 && b.confidence > 0.5);
}


function computeMidPoint(a, b){

    if(!predictionConfidence(a,b)) return null;

    let midpointX = (a.x + b.x) / 2;
    let midpointY = (a.y + b.y) / 2;

    return {
        "x": midpointX, 
        "y": midpointY
    };

}