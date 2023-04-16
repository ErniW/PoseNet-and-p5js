class Hand{
    constructor(forearm, whichHand){
        this.wrist = createVector(forearm.end.x, forearm.end.y);
        
        this.pos = forearm.v.copy();
        this.pos.normalize();
        this.pos.setMag(HAND_BOUNDING_DIAMETER / 2);
        this.pos.add(this.wrist);

        if(whichHand == 'left') this.hand = true;
        else if(whichHand == 'right') this.hand = false;
    }

    checkCollision(ball){
        return dist(this.pos.x, this.pos.y, ball.pos.x, ball.pos.y) <= HAND_BOUNDING_DIAMETER
    }

    switchTargetHand(targetHand){
        if(targetHand === null){
            score++;
            return this.hand;
        }
        else if(this.hand === targetHand){
            score = 0;
            return null;
        }
        else if(this.hand !== targetHand){
            score++;
            return !targetHand;
        }
    }

    draw(){
        noFill();
        strokeWeight(4);
        stroke(0,255,0);
        circle(this.pos.x, this.pos.y, HAND_BOUNDING_DIAMETER);
    }

}