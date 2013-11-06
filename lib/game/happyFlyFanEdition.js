ig.module(
    'game.happyFlyFanEdition'
)
.requires(
    'impact.game',
	'impact.background-map',
	'impact.font',
    'game.entities.fly',
    'game.entities.fly-happy'
)
.defines(function () {

    BackgroundImage = ig.Image.extend({
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
        font: new ig.Font( 'media/04b03-font.png' ),
        clearColor: null,
        startSpawnRange: 0.9975,
        counter: 30,
        backgroundImg: new BackgroundImage( 'media/bg_small.png' ),
        backgroundStats: new ig.Image('media/bg-blue.png'),
        statsFly: null,
        // Game Properties

        init: function() {
            ig.input.bind(ig.KEY.MOUSE1 ,"CanvasTouch");
            this.startedGame = new Date();
            this.spawnRange = this.startSpawnRange;
        },
        update: function() {
            var shouldSpawnAHappyFly = Math.random() > this.spawnRange;

            if (shouldSpawnAHappyFly && this.status != 'gameOver') {
                var x = (Math.random()) * ig.system.width,
                    y = (Math.random()) * ig.system.height;
                x = x > ig.system.width/2 ? x-20 : x+20;
                y = y > ig.system.height/2 ? x-20 : x+20;
                this.spawnEntity( EntityFlyHappy, x, y );
            }

            if(this.status == 'gameOver' && !this.statsFly ){
                this.statsFly = this.spawnEntity( EntityFly, ig.system.width/2-20, ig.system.height-40);
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
                    this.backgroundStats.draw(0,0);
                    this.font.draw('Congratulations! You killed ' + this.score.toString() + " flies!", ig.system.width / 2, ig.system.height / 2 - 20, ig.Font.ALIGN.CENTER );
                    this.font.draw('> (Touch fly to restart) <', ig.system.width / 2, ig.system.height / 2 - 10, ig.Font.ALIGN.CENTER );
                    this.statsFly.draw();
                    if( this.statsFly.touched){
                        ig.system.setGame(StartScreen);
                        this.statsFly.touched = false;
                    }
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

    StartScreen = ig.Game.extend({
        instructText: new ig.Font( 'media/04b03-font.png' ),
        background: new ig.Image('media/bg-blue.png'),
        title: new ig.Image( 'media/title.png' ),
        fly: null,
        init: function(){
            ig.input.bind( ig.input.bind( ig.KEY.MOUSE1, 'CanvasTouch' ) );
            this.fly = this.spawnEntity( EntityFly, ig.system.width/2-20, ig.system.height/2-20);
        },
        update: function(){

            if(this.fly.touched){
                ig.system.setGame(HappyFlyFanEdition);
                this.fly.touched = false;
            }

            this.parent();
        },
        draw: function(){
            this.parent();
            this.background.draw(0,0);
            this.title.draw(ig.system.width/2-this.title.width/2,10);
            this.fly.draw();
            var x = ig.system.width/2,
                y = ig.system.height -10;
            this.instructText.draw( 'Touch Fly to Start', x+40, y, ig.Font.ALIGN.CENTER );
        }
    });

    // Start the Game with 60fps, a resolution of 200x140, scaled
    // up by a factor of 2
    ig.main( '#canvas', StartScreen, 60, 200, 140, 2 );
	ig.system.resize(
        ig.global.innerWidth * 1 * ( 1 / 4 ),
        ig.global.innerHeight * 1 * ( 1 / 4 ),
        4
    );
});
