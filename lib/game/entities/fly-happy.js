ig.module(
    'game.entities.fly-happy'
).requires(
    'game.entities.fly'
).defines(function(){

        EntityFlyHappy = EntityFly.extend({
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
        }
    });

});