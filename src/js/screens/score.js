/// <reference path="../../lib/melonJS-0.9.10.js" />
/*----------------------
 
    A score screen
 
    ----------------------*/

game.ScoreScreen = me.ScreenObject.extend({
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
        me.input.bindKey(me.input.KEY.SPACE, "start", true);
		me.input.bindTouch(me.input.KEY.SPACE, true); // Touch

//        this.startText = new game.ScoreScreen.StartText(me.game.viewport.width/2, 500);
        this.titleText = new game.ScoreScreen.TitleText(me.game.viewport.width/2, 28);
        this.rankingText = new game.ScoreScreen.RankingText(230, 150);

        //195, 255
        //200, 280
        //600, 380

		
		$.get("scores.php?q=ranking",function(data){    game.data.ranking = data;     },'text');
		
		//$.get("scores.php?q=rank",function(data){    game.data.rank = data;     },'text');
	},

    // update function
    update: function () {
        if (me.input.isKeyPressed('start')) {
            me.state.change(me.state.MENU);
           // me.game.viewport.fadeOut(this.fade, this.duration);
        }

//        this.startText.update();
        this.rankingText.update();
        this.titleText.update();
        return true;

    },

    // draw function
    draw: function (context) {
        context.drawImage(this.bg, 0, 0);

//        this.startText.draw(context);
        this.rankingText.draw(context);
        this.titleText.draw(context);
    },

    // destroy function
    onDestroyEvent: function () {
    }

});

game.ScoreScreen.StartText = me.Renderable.extend({
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
        this.font.draw(context, "SCORES", this.pos.x, this.pos.y);

    }
});

game.ScoreScreen.RankingText = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font.alignText = "top";
        this.font.set("left", 1);

        this.textScale = 0.5;

        this.floating = true;
    },

    update: function () {
        this.font.resize(this.textScale);

        return true;
    },

    draw: function (context) {
        this.font.draw(context, game.data.ranking, this.pos.x, this.pos.y);

    }
});





game.ScoreScreen.TitleText = me.Renderable.extend({
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
        this.font.draw(context, "RANGLISTE", this.pos.x, this.pos.y);
    }
});
