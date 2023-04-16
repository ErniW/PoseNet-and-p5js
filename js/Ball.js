class Ball{
    constructor(x, y){
        this.pos = createVector(x,y);
        this.dir = createVector(0, 1);
        this.gravity = createVector(0, 0.1);
    }

    move(){
        this.pos.add(this.dir);
        this.dir.add(this.gravity);
    }

    bounce(handVec){
        let bounceDirVec = this.pos.copy().sub(handVec);
        bounceDirVec.normalize();
        bounceDirVec.mult(5);
        this.dir = bounceDirVec;
    }

    draw(){
        strokeWeight(40);
        stroke(255,0,0);
        point(this.pos.x, this.pos.y);
    }
}