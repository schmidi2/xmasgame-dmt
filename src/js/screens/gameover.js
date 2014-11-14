/// <reference path="../../lib/melonJS-0.9.10.js" />
/*----------------------
 
    A GAMEOVER screen
 
    ----------------------*/

game.GameoverScreen = me.ScreenObject.extend({
    // constructor
    init: function () {
        this.parent(true);

        this.bg = null;
		
		//game.data.ranking = "1.   1170 \n2.   1020 \n3.    900 \n4.    812 \n5.    700";
		
    },

    // reset function
    onResetEvent: function () {
        this.bg = me.loader.getImage("ts_bg");

        me.input.bindKey(me.input.KEY.ENTER, "start", true);
		me.input.bindTouch(me.input.KEY.ENTER, true); // Touch
//        me.input.bindKey(me.input.KEY.SPACE, "start", true);

//        this.startText = new game.GameoverScreen.StartText(me.game.viewport.width/2, 500);
        this.rankingText = new game.GameoverScreen.RankingText(me.game.viewport.width/2, 28);
        this.rankText = new game.GameoverScreen.RankText(me.game.viewport.width/2, 450);
		zz = me.game.viewport.width/2; // CURSOR POSITION
        this.cursorText = new game.GameoverScreen.CursorText(zz, 258);

        //195, 255
        //200, 280
        //600, 380

		// Neuer Persönlicher Rekord?
		if(game.data.bestscore < game.data.score) {
			game.data.bestscore = game.data.score;
			this.textin();
		}
		
		$.get("scores.php?q=rank",function(data){    game.data.rank = data;     },'text');
		
		$.get("scores.php?q=player",function(data) {    
			if(data != "") { 
				game.data.player = data;
			}
			zz += (game.data.player.length*16) + 15
			},'text'
		);
//		document.getElementById('TextInput').value = game.data.player;
//		document.getElementById('TextInput').focus();

		// EMULATE textfield
		// dont use select document, it would overwrite the BACKSPACE patch
		$( "body" ).keypress(function( event ) {
			var c = String.fromCharCode(event.charCode).toUpperCase();
			switch(c) {
				case 'Ä':
							c = 'AE';
							break
				case 'Ö':
							c = 'OE';
							break
				case 'Ü':
							c = 'UE';
							break
			}
			zz += 16;
			game.data.player += c;
		});
		$( "body" ).keydown(function( event ) {
			switch(event.which) {
				case 8: // BACKSPACE
					if(game.data.player.length == 0) break;
					game.data.player = game.data.player.substring(0, game.data.player.length - 1);
					zz -= 16;
//					me.game.GameoverScreen.visible = false;
					break;
				case 32: // SPACE
					game.data.player += " ";
					zz += 16
			}
		});
	},

    textin: function(){
        var tween = new me.Tween(this.rankText).to({ textScale: 0.8 }, 1000).onComplete(this.textout.bind(this));
        tween.easing(me.Tween.Easing.Quadratic.InOut);
        tween.start();
    },
    textout: function(){
        var tween = new me.Tween(this.rankText).to({ textScale: 0.9 }, 1000).onComplete(this.textin.bind(this));
        tween.easing(me.Tween.Easing.Quadratic.InOut);
        tween.start();
    },


    // update function
    update: function () {
        if (me.input.isKeyPressed('start')) {
			// Save players name
			$.ajax({
			  type: "POST",
			  url: "scores.php?q=player",
			  data: { name: game.data.player }
			});

            me.state.change(me.state.SCORE);
           // me.game.viewport.fadeOut(this.fade, this.duration);
        }

//        this.startText.update();
        this.rankingText.update();
        this.rankText.update();
		this.cursorText.update();
        return true;

    },

    // draw function
    draw: function (context) {
        context.drawImage(this.bg, 0, 0);

//        this.startText.draw(context);
        this.rankingText.draw(context);
        this.rankText.draw(context);
        this.cursorText.draw(context);
    },

    // destroy function
    onDestroyEvent: function () {
        $( "body" ).unbind("keypress");
        $( "body" ).unbind("keydown");
    }

});

game.GameoverScreen.StartText = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font.alignText = "bottom";
        this.font.set("center", 1);

        this.textScale = 1;

        this.floating = true;
    },

    update: function () {
        this.font.resize(this.textScale);

        return true;
    },

    draw: function (context) {
        this.font.draw(context, "GAMEOVER", this.pos.x, this.pos.y);

    }
});

game.GameoverScreen.RankingText = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font.alignText = "top";
        this.font.set("center", 1);

        this.textScale = 1;

        this.floating = true;
    },

    update: function () {
        this.font.resize(this.textScale);

        return true;
    },

    draw: function (context) {
        this.font.draw(context, "GAME OVER\n\n\n\n\nNAME:\n\n"+game.data.player, this.pos.x, this.pos.y);

    }
});





game.GameoverScreen.RankText = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font.alignText = "bottom";
        this.font.set("center", 1);

        this.textScale = 1;

        this.floating = true;
    },

    update: function () {
        this.font.resize(this.textScale);

        return true;
    },

    draw: function (context) {
		if(game.data.score == game.data.bestscore) { // NEUER persönlicher Rekord
			this.font.draw(context, game.data.score +" COINS GESAMMELT!\n\nPLATZ "+ game.data.rank, this.pos.x, this.pos.y);
		} else {
			this.textScale = 0.8;
			this.font.draw(context, "NUR "+ game.data.score +" COINS GESAMMELT\n\nDER EIGENE REKORD LIEGT BEI "+ game.data.bestscore +" COINS", this.pos.x, this.pos.y);
		}
    }
});


game.GameoverScreen.CursorText = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font.alignText = "bottom";
        this.font.set("center", 1);

        this.textScale = 1;

        this.floating = true;
		this.textin();
    },

    update: function () {
        this.font.resize(this.textScale);

        return true;
    },

    draw: function (context) {
        this.font.draw(context, "_", zz, this.pos.y);

    },
	
	textin: function(){
        var tween = new me.Tween(this).to({ textScale: 0.8 }, 500).onComplete(this.textout.bind(this));
        tween.easing(me.Tween.Easing.Quadratic.InOut);
        tween.start();
    },
    textout: function(){
        var tween = new me.Tween(this).to({ textScale: 1 }, 500).onComplete(this.textin.bind(this));
        tween.easing(me.Tween.Easing.Quadratic.InOut);
        tween.start();
    },
});