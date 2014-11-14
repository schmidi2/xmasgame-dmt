﻿game.HUD=game.HUD||{},game.HUD.Container=me.ObjectContainer.extend({init:function(){this.parent(),this.isPersistent=!0,this.collidable=!1,this.z=1/0,this.name="HUD",this.addChild(new game.HUD.LogoItem(16,20)),this.addChild(new game.HUD.ScoreItem(me.game.viewport.width/2,28)),this.addChild(new game.HUD.TimeItem(1039,28)),this.alwaysUpdate=!0}}),game.HUD.JacksItem=me.Renderable.extend({init:function(a,b){this.parent(new me.Vector2d(a,b),10,10),this.font=new me.BitmapFont("font",{x:32,y:32}),this.font.alignText="bottom",this.font.set("left",1),this.jacks=0,this.floating=!0},update:function(){return this.jacks!==game.data.jacks?(this.jacks=game.data.jacks,!0):!1},draw:function(a){this.font.draw(a,"x"+game.data.jacks,this.pos.x,this.pos.y)}}),game.HUD.ScoreItem=me.Renderable.extend({init:function(a,b){this.parent(new me.Vector2d(a,b),10,10),this.font=new me.BitmapFont("font",{x:32,y:32}),this.font.alignText="bottom",this.font.set("center",1),this.score=0,this.floating=!0},update:function(){return this.score!==game.data.score?(this.score=game.data.score,!0):!1},draw:function(a){me.state.current()instanceof game.PlayScreen&&(0==game.data.bestscore?this.font.draw(a,game.data.score,this.pos.x,this.pos.y):this.font.draw(a,game.data.score+"/"+game.data.bestscore,this.pos.x,this.pos.y))}}),game.HUD.LivesItem=me.Renderable.extend({init:function(a,b){this.parent(new me.Vector2d(a,b),10,10),this.font=new me.BitmapFont("font",{x:32,y:32}),this.font.alignText="bottom",this.font.set("left",1),this.lives=0,this.floating=!0},update:function(){return this.lives!==game.data.lives?(this.score=game.data.lives,!0):!1},draw:function(a){this.font.draw(a,"x"+game.data.lives,this.pos.x,this.pos.y)}}),game.HUD.TimeItem=me.Renderable.extend({init:function(a,b){this.parent(new me.Vector2d(a,b),10,10),this.font=new me.BitmapFont("font",{x:32,y:32}),this.font.alignText="bottom",this.font.set("right"),this.font.resize(2),this.lives=0,this.floating=!0},update:function(){return this.lives!==game.data.lives?(this.score=game.data.lives,!0):!1},draw:function(a){me.state.current()instanceof game.PlayScreen&&this.font.draw(a,game.data.seconds,this.pos.x,this.pos.y)}}),game.HUD.LogoItem=me.Renderable.extend({init:function(a,b){this.parent(new me.Vector2d(a,b),10,10),this.ts1=new me.SpriteObject(a,b,me.loader.getImage("tuplogo")),this.floating=!0},update:function(){return!1},draw:function(a){this.ts1.draw(a)}});