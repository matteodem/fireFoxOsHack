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

HappyFlyFanEdition = ig.Game.extend({
    
    // Load a font
    font: new ig.Font( 'media/04b03.font.png' ),
    
    
    init: function() {
        // Initialize your game here; bind keys etc.
    },
    
    update: function() {
        // Update all entities and backgroundMaps
        this.parent();
        
        // Add your own, additional update code here
    },
    
    draw: function() {
        // Draw all entities and backgroundMaps
        this.parent();
        
        // Add your own drawing code here
        var x = ig.system.width/2,
            y = ig.system.height/2;
        
        this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
    }
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', HappyFlyFanEdition, 60, 200, 140, 2 );

});