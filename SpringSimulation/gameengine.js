// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        this.select = true;

    };

    init(ctx) { // called after page has loaded
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        var that = this;

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x, y: y, radius: 0 };
        }

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            that.mouse = getXandY(e);
        }, false);

        this.ctx.canvas.addEventListener("mousedown", function (e) {
            that.mousedown = true;
            if(that.select)
            {
                that.camera.placeParticle();
                that.camera.selectParticle();
            }
            that.select = false;
            that.holding = true;
        }, false);
        this.ctx.canvas.addEventListener("mouseup", function (e) {
            that.holding = false;
            that.select = true;
            that.mousedown = false;
        }, false);

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "KeyQ":
                    that.Q = true;
                    break;
                case "KeyW":
                    that.W = true;
                    break;
                case "KeyE":
                    that.E = true;
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "KeyQ":
                    that.Q = false;
                    break;
                case "KeyW":
                    that.W = false;
                    break;
                case "KeyE":
                    that.E = false;
                    break;
            }
        }, false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
        this.camera.draw(this.ctx);
    };

    update() {
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        this.camera.update();

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();

        this.click = null;
    };
};