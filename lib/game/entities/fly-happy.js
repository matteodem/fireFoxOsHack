ig.module(
    'game.entities.happy-fly'
).requires(
    'impact.entity'
).defines(function(){

        EntityHappyFly = ig.Entity.extend({
        size: { x: 40, y: 39 },
        animSheet: new ig.AnimationSheet('media/flies_anim.png', 40, 39),

        init: function (x, y, settings) {
            this.addAnim('idle', 0.1, [0, 1]);
            this.parent(x, y, settings);
        },
        update: function () {
            if (ig.input.state("CanvasTouch")
                && ig.input.pressed("CanvasTouch")
                && this.touchedFly(ig.input.mouse, this.pos)) {

                this.kill();

                if ("function" === typeof window.navigator.vibrate) {
                    window.navigator.vibrate(50);
                }

                ig.game.score += 1;
            }

            if (ig.game.status == "gameOver") {
                this.kill();
            }

            this.parent();
        },
        between: function (x, min, max) {
            return x >= min && x <= max;
        },
        touchedFly: function (mouse, fly) {
            return this.between(mouse.x, fly.x, fly.x + this.size.x)
                && this.between(mouse.y, fly.y, fly.y + this.size.y);
        }
    });

});