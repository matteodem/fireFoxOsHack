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
    var score = 0;
    
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
        animSheet: new ig.AnimationSheet( 'media/fly.png', 40, 39 ),

        init: function( x, y, settings ) {
            this.addAnim( 'idle', 0.1, [0] );
            this.parent( x, y, settings );
        },
        update: function () {

            if(ig.input.state("CanvasTouch")
                && this.touchedFly(ig.input.mouse, this.pos)) {
                this.kill();
                score += 1;
            }
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
        backgroundImg: new BackgroundImage( 'media/bg_small.png' ),

        // Game Properties
        score: 0,

        init: function() {
            // ig.input.bind(ig.KEY.MOUSE1, 'touch');
            ig.input.bind('-1',"CanvasTouch");
        },
        update: function() {
            var shouldSpawnAHappyFly = Math.random() > 0.99;

            // console.log(this.entities);
            if (shouldSpawnAHappyFly) {
                var y = (Math.random() - 0.1) * ig.system.width + 10,
                    x = (Math.random() - 0.1) * ig.system.height + 10;

                this.spawnEntity( HappyFly, x, y );
            }

            // Add your own, additional update code here
            this.parent();
        },
        draw: function() {
            this.backgroundImg.draw();

            // Draw all entities and backgroundMaps
            this.parent();

            // Add your own drawing code here
            var x = ig.system.width/2,
                y = ig.system.height/2;

            this.font.draw( score.toString() + ' Flies killed', ig.system.width -2, 2, ig.Font.ALIGN.RIGHT );
        }
    });


    // Start the Game with 60fps, a resolution of 320x240, scaled
    // up by a factor of 2
    ig.main( '#canvas', HappyFlyFanEdition, 60, 200, 140, 2 );

});
