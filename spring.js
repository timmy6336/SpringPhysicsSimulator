class Spring
{
    constructor(game,k,x,a,b)
    {
        this.game = game;
        this.k = k;
        this.x = x;
        this.a = a;
        this.b = b;
        this.distance = Math.sqrt(((this.b.x - this.a.x) * (this.b.x - this.a.x)) + ((this.b.y - this.a.y) * (this.b.y - this.a.y)));
    }
    update()
    {
        let dX = this.b.x - this.a.x;
        let dY = this.b.y - this.a.y;
        this.distance = Math.sqrt((dX * dX) + (dY * dY));
        let force = (this.distance - this.x) * this.k;
        if(this.distance == 0)
        {
            this.distance == .000000000000000000001;
        }
        let fX = (dX / this.distance) * force;
        let fY = (dY / this.distance) * force;
        this.a.applyForce(fX,fY);
        this.b.applyForce(-fX,-fY);
    }
    draw(ctx)
    {
        var temp1 = ctx.lineWidth;
        var temp2 = ctx.strokeStyle;

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "White";
        ctx.moveTo(this.a.x,this.a.y);
        ctx.lineTo(this.b.x,this.b.y);
        ctx.stroke();
        ctx.lineWidth = temp1;
        ctx.strokeStyle = temp2;
        //console.log(this.distance);
    }
}