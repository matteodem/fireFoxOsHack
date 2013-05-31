ig.module(
    'game.happyFlyFanEdition'
)
.requires(
    'impact.game',
	'impact.background-map',
	'impact.font',

    'game.entities.happy-fly'
)
.defines(function () {

    BackgroundImage = ig.Image.extend({
        resize: function(){},
        draw: function(){
            if( !this.loaded ) {
                return;
            }
            ig.system.context.drawImage(this.data, 0, 0);
        }
    });

    HappyFlyFanEdition = ig.Game.extend({
        // Initialize
        status: 'inGame',
        score: 0,
        font: new ig.Font( 'media/04b03.font.png' ),
        clearColor: null,
        startSpawnRange: 0.9975,
        counter: 30,
        backgroundImg: new BackgroundImage( 'media/bg_small.png' ),

        // Game Properties

        init: function() {
            ig.input.bind('-1',"CanvasTouch");
            this.startedGame = new Date();
            this.spawnRange = this.startSpawnRange;
        },
        update: function() {
            var shouldSpawnAHappyFly = Math.random() > this.spawnRange;

            if (shouldSpawnAHappyFly && this.status != 'gameOver') {
                var y = (Math.random() - 0.1) * ig.system.width + 25,
                    x = (Math.random() - 0.1) * ig.system.height + 25;

                this.spawnEntity( HappyFlyEntity, x, y );
            }

            // Restart game
            if (this.status == 'gameOver' && ig.input.pressed("CanvasTouch")) {
                this.counter = 30;
                this.startedGame = new Date();
                this.spawnRange = this.startSpawnRange;

                this.status = "inGame";
                this.score = 0;
            }

            // Add your own, additional update code here
            this.parent();
            this.spawnRange -= 0.000026;
        },
        draw: function() {
            this.counter = 30 - (((new Date()).getTime() - this.startedGame.getTime()) / 1000);
            this.backgroundImg.draw(0,0);

            switch (this.status) {
                case 'gameOver' :
                    this.font.draw('Congratulations! You killed ' + this.score.toString() + " flies!", ig.system.width / 2, ig.system.height / 2 - 20, ig.Font.ALIGN.CENTER );
                    this.font.draw('> (Touch screen to restart) <', ig.system.width / 2, ig.system.height / 2 - 10, ig.Font.ALIGN.CENTER );
                    break;
                case 'inGame' :
                    // Draw all entities and backgroundMaps
                    this.parent();

                    // Add your own drawing code here
                    var x = ig.system.width/2,
                        y = ig.system.height/2;

                    // Draw score
                    this.font.draw( this.score.toString() + ' Flies killed', ig.system.width -2, 2, ig.Font.ALIGN.RIGHT );
                    // Draw countdown
                    this.font.draw( Math.ceil(this.counter).toString() + ' seconds left', ig.system.width -2, 10, ig.Font.ALIGN.RIGHT );

                    if (0 >= this.counter) {
                        this.status = 'gameOver';
                    }
                    break;
                case 'menu' :
                default :
                    break;
            }
        }
    });




    // Start the Game with 60fps, a resolution of 200x140, scaled
    // up by a factor of 2
    ig.main( '#canvas', HappyFlyFanEdition, 60, 200, 140, 2 );
});
