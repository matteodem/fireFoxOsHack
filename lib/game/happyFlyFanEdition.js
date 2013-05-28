ig.module(
    'game.happyFlyFanEdition'
)
.requires(
    'impact.game',
	'impact.entity',
	'impact.background-map',
	'impact.font'
)
.defines(function () {
    var gameOver = false,
        score = 0;
    
    BackgroundImage = ig.Image.extend({
        resize: function(){},
        draw: function(){
            if( !this.loaded ) {
                return;
            }
            ig.system.context.drawImage(this.data, 0, 0);
        }
    });

    HappyFly = ig.Entity.extend({
        size : { x : 40, y : 39 },
        animSheet: new ig.AnimationSheet( 'media/flies_anim.png', 40, 39 ),

        init: function( x, y, settings ) {
            this.addAnim( 'idle', 0.1, [0, 1] );
            this.parent( x, y, settings );
        },
        update: function () {
            if(ig.input.state("CanvasTouch")
                && ig.input.pressed("CanvasTouch")
                && !gameOver
                && this.touchedFly(ig.input.mouse, this.pos)) {
                this.kill();
                window.navigator.vibrate(50);
                score += 1;
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

    HappyFlyFanEdition = ig.Game.extend({
        // Initialize
        font: new ig.Font( 'media/04b03.font.png' ),
        clearColor: null,
        spawnRange: 0.998,
        backgroundImg: new BackgroundImage( 'media/bg_small.png' ),

        // Game Properties

        init: function() {
            ig.input.bind('-1',"CanvasTouch");
            this.startedGame = new Date();
        },
        update: function() {
            var shouldSpawnAHappyFly = Math.random() > this.spawnRange;

            if (shouldSpawnAHappyFly && !gameOver) {
                var y = (Math.random() - 0.1) * ig.system.width + 25,
                    x = (Math.random() - 0.1) * ig.system.height + 25;

                this.spawnEntity( HappyFly, x, y );
            }

            // Add your own, additional update code here
            this.parent();
            this.spawnRange -= 0.00003;
        },
        draw: function() {
            var counter = 30 - (((new Date()).getTime() - this.startedGame.getTime()) / 1000);
            this.backgroundImg.draw();
            
            // Game has finished yet
            if (0 < counter) {
                // Draw all entities and backgroundMaps
                this.parent();

                // Add your own drawing code here
                var x = ig.system.width/2,
                    y = ig.system.height/2;

                // Draw score
                this.font.draw( score.toString() + ' Flies killed', ig.system.width -2, 2, ig.Font.ALIGN.RIGHT );
                // Draw countdown
                this.font.draw( Math.ceil(counter).toString() + ' seconds left', ig.system.width -2, 10, ig.Font.ALIGN.RIGHT );
            } else {
                gameOver = true;
                this.font.draw('Congratulations! You killed ' + score.toString() + " flies!", ig.system.width / 2, ig.system.height / 2 - 20, ig.Font.ALIGN.CENTER );
            }
        }
    });


    // Start the Game with 60fps, a resolution of 200x140, scaled
    // up by a factor of 2
    ig.main( '#canvas', HappyFlyFanEdition, 60, 200, 140, 2 );
});
