class Scene
{
    constructor(game)
    {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.particles = [];
        this.springs = [];
        this.gravity = 1;
        this.selected = 0;


        //this.start();
        //this.loadTestScene();
    }
    loadTestScene()
    {
        for(var i = 0; i < 2; i++)
        {
            this.particles.push(new Particle(this.game,380, 50 + (20 * i)));
            if(i != 0)
            {
                this.springs.push(new Spring(this.game,.1,200,this.particles[i],this.particles[i-1]));
            }
        }
        /*
            let p1 = new Particle(this.game,380,250,true);
            let p2 = new Particle(this.game,380,500);
            this.particles.push(p1);
            this.particles.push(p2);
            this.springs.push(new Spring(this.game, .01,200,p1,p2));
            */
           this.particles[0].locked = true;
        
    }
    update()
    {
        PARAMS.SHOWP = document.getElementById("showP").checked;
        PARAMS.SHOWS = document.getElementById("showS").checked;
        PARAMS.GRAVITY = document.getElementById("gravity").checked;
        let numOfParticles = this.particles.length;
        let numOfSprings = this.springs.length;
        if(this.selected == 2)
        {
            this.selected = 0;
            let a = null;
            let b = null;
            for(var i = 0; i < numOfParticles ; i++)
            {
                let temp = this.particles[i];
                if(temp.selected)
                {
                    temp.selected = false;
                    if(a == null)
                    {
                        a = temp;
                    }
                    else
                    {
                        b = temp;
                        break;
                    }
                }
            }
            PARAMS.SPRINGK = document.getElementById("springK").value;
            PARAMS.SPRINGX = document.getElementById("springX").value;
            this.springs.push(new Spring(this.game, PARAMS.SPRINGK,PARAMS.SPRINGX,a,b));

        }
        for(var i = 0; i < numOfSprings ; i++)
        {
            this.springs[i].update();
        }
        for(var i = 0; i < numOfParticles ; i++)
        {
            if(PARAMS.GRAVITY)
            {
                this.particles[i].applyForce(0,this.gravity * this.particles[i].mass);
            }
            this.particles[i].update();
        }
    }
    draw(ctx)
    { 
        let numOfParticles = this.particles.length;
        let numOfSprings = this.springs.length;
        if(PARAMS.SHOWS)
        {
            for(var i = 0; i < numOfSprings ; i++)
            {
                this.springs[i].draw(ctx);
            }
        }
        if(PARAMS.SHOWP)
        { 
            for(var i = 0; i < numOfParticles ; i++)
            {
            this.particles[i].draw(this.game.ctx);
            }
        }
    }
    placeParticle()
    {
        if(this.game.mouse && this.game.Q)
        {
            let x = this.game.mouse.x;
            let y = this.game.mouse.y;
            PARAMS.PARTICLEM = document.getElementById("particleM").value;
            console.log(PARAMS.PARTICLEM)
            PARAMS.LOCKED =  document.getElementById("locked").checked;
            this.particles.push(new Particle(this.game,x,y,PARAMS.LOCKED,PARAMS.PARTICLEM));
        }
    }
    selectParticle()
    {
        if(this.game.mouse && this.game.W)
        {
            let x = this.game.mouse.x + 10;
            let y = this.game.mouse.y + 10;
            let numOfParticles = this.particles.length;
            for(var i = numOfParticles - 1; i >= 0 ; i--)
            {
                let temp = this.particles[i];
                if((x > temp.x && x < temp.x + 20) && (y > temp.y && y < temp.y + 20))
                {
                    if(temp.locked)
                    {
                        temp.locked = false;
                    }
                    else
                    {
                        temp.locked = true;
                    }
                    temp.xVel = 0;
                    temp.yVel = 0;
                    break;
                }
            }
        } 
        if(this.game.mouse && this.game.E)
        {
            let x = this.game.mouse.x + 10;
            let y = this.game.mouse.y + 10;
            let numOfParticles = this.particles.length;
            for(var i = numOfParticles - 1; i >= 0 ; i--)
            {
                let temp = this.particles[i];
                if((x > temp.x && x < temp.x + 20) && (y > temp.y && y < temp.y + 20))
                {
                    if(temp.selected)
                    {
                        temp.selected = false;
                        this.selected--;
                    }
                    else
                    {
                        temp.selected = true;
                        this.selected++;
                    }
                    break;
                }
            }
        } 
    }
}
