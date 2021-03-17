class Particle
{
    constructor(game,x,y,locked = false,m = 1)
    {
        this.game = game;
        this.x = x;
        this.y = y;
        this.mass = m;
        this.xVel = 0;
        this.yVel = 0;
        this.locked = locked;
        this.selected = false;
    }
    update()
    {
        if(!this.locked)
        {
            this.x += this.xVel;
            this.y += this.yVel;
        }
        this.xVel = this.xVel*.99;
        this.yVel = this.yVel*.99;
    }
    draw(ctx)
    {
        ctx.beginPath();
        if(this.selected)
        {
            ctx.fillStyle = "White";
        }
        else
        {
            ctx.fillStyle = "Red";
        }
        if(this.locked)
        {
            ctx.strokeStyle = "Black";
        }
        else
        {
            ctx.strokeStyle = "Green";
        }
        ctx.arc(this.x,this.y,10,0,2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.fill();
    }
    applyForce(xForce,yForce)
    {
        let xAccel = xForce/this.mass;
        let yAccel = yForce/this.mass;
        this.xVel += xAccel;
        this.yVel += yAccel;
    }
}