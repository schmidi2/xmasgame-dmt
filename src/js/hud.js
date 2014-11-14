
/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

    init: function () {
        // call the constructor
        this.parent();

        // persistent across level change
        this.isPersistent = true;

        // non collidable
        this.collidable = false;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at position
//        this.addChild(new game.HUD.JacksItem(60, 22));
		this.addChild(new game.HUD.LogoItem(16, 20));
        this.addChild(new game.HUD.ScoreItem(me.game.viewport.width / 2, 28));
		this.addChild(new game.HUD.TimeItem(1039, 28));
//        this.addChild(new game.HUD.LivesItem(me.game.viewport.width - 80, 22));
/*
        var spr = new me.SpriteObject(20, 20, me.loader.getImage("jack"), 30, 32);
        spr.floating = true;
        spr.z = 2;
        this.addChild(spr);

        spr = new me.SpriteObject(me.game.viewport.width - 120, 22, me.loader.getImage("tillyicon"), 32, 30);
        spr.floating = true;
        spr.z = 2;
        this.addChild(spr);
*/

        this.alwaysUpdate = true;
    },


});



game.HUD.JacksItem = me.Renderable.extend({ 
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", { x: 32, y:32 });
        this.font.alignText = "bottom";
        this.font.set("left", 1);

        this.jacks = 0;

        this.floating = true;
    },

    update: function () {

        if (this.jacks !== game.data.jacks) {
            this.jacks = game.data.jacks;
            return true;
        }
        return false;
    },

    draw: function (context) {
        this.font.draw(context, "x" + game.data.jacks, this.pos.x, this.pos.y);
        
    }
});

game.HUD.ScoreItem = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font.alignText = "bottom";
        this.font.set("center", 1);

        this.score = 0;

        this.floating = true;
    },

    update: function () {

        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    draw: function (context) {
		if(me.state.current() instanceof  game.PlayScreen) { // Nur im PLAY-Screen anzeigen
			if(game.data.bestscore == 0) {
				this.font.draw(context, game.data.score, this.pos.x, this.pos.y);
			} else {
				this.font.draw(context, game.data.score +"/"+ game.data.bestscore, this.pos.x, this.pos.y);
			}
		}
    }
});

game.HUD.LivesItem = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font.alignText = "bottom";
        this.font.set("left", 1);

        this.lives = 0;

        this.floating = true;
    },

    update: function () {

        if (this.lives !== game.data.lives) {
            this.score = game.data.lives;
            return true;
        }
        return false;
    },

    draw: function (context) {
        this.font.draw(context, "x" + game.data.lives, this.pos.x, this.pos.y);

    }
});





game.HUD.TimeItem = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.font = new me.BitmapFont("font", { x: 32, y: 32 });
        this.font.alignText = "bottom";
        this.font.set("right");
        this.font.resize(2);

        this.lives = 0;

        this.floating = true;
    },

    update: function () {

        if (this.lives !== game.data.lives) {
            this.score = game.data.lives;
            return true;
        }
        return false;
    },

    draw: function (context) {
		if(me.state.current() instanceof  game.PlayScreen) { // Nur im PLAY-Screen anzeigen
			this.font.draw(context, game.data.seconds, this.pos.x, this.pos.y);
		}
    }
});






game.HUD.LogoItem = me.Renderable.extend({
    init: function (x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);

        this.ts1 = new me.SpriteObject(x, y, me.loader.getImage("tuplogo"));
        this.floating = true;
    },

    update: function () {
        return false;
    },

    draw: function (context) {
        this.ts1.draw(context);
    }
});