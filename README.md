Xmas Browser Game
============

This Xmas Game I made in 2013 for our music club [Dorfmusik Thörishaus](http://www.dm-thoerishaus.ch). It is a HTML5 browser game, based on the JavaScript framework [melonJS](http://melonjs.org). It should work on all modern browsers.
As a template to start from I used Tilly's Horrible Halloween by Gareth Williams, see [GarethIW/MelonTest](https://github.com/GarethIW/MelonTest).

Be aware of:
* The game is in german only.
* It was developed quicky and a little bit dirty, because I didn't have much time.
* Some cheating prevention is implemented. It should be good enougth to prevent hobby hackers from cheating.
* Sadly it runs too slow on mobile phones or tablets. Maybe with a newer version of melonJS or newer devices it will work smoothly.
* No sound implemented.


Gameplay
-
Control the Santa Claus throug the map with your arrow keys. You can jump with the space or up arrow key. 
Collect as many bouncing coins as possible. But avoid the eval monsters. If they touch your Santa Claus, he dies. He can die as many times you like. But after 60 seconds, the game is over. Enter your name and you will see the highscore list - maybe you get on the list. If not, take another chance.


Modifications (Mods)
-
Customizing the game is really simple. Just edit the images in the directory src/data/. This way you can replace the logo (on the top-left side), the background image, the coins and much more.
You can also simply make your own map. To do this, open the file data/map/1.xml with the [Tiled Map Editor](http://www.mapeditor.org/) and make your modifications.


Screenshots
-
Start Page
![Start Page](/doc/img/Screenshot01.png?raw=true "Start Page")
Playing
![Playing](/doc/img/Screenshot02.png?raw=true "Playing")
Playing - 41 seconds left
![Playing - 41 seconds left](/doc/img/Screenshot03.png?raw=true "Playing - 41 seconds left")
Game Over - Enter your Name
![Game Over - Enter your Name](/doc/img/Screenshot04.png?raw=true "Game Over - Enter your Name")
Highscore
![Highscore](/doc/img/Screenshot05.png?raw=true "Highscore")


Installation
-
This game was installed on a server with GNU/Debian with Apache 2.2, PHP 5.3 and MySQL 5.5. It will likely work on never versions and similar environments.
Copy the directory src/ into your website and rename the folder. Import the SQL script you find in the subdirectory db/. Enter the database connection parameters in the file scores.php. If you like to monitor the highscore, enter parameters in the file 00rangliste.php too.
The folder build/ contains some javascript files in compressed version. This speedup loading time and is a little cheating barrier. Maybe you want to use the compressed files; if so, just copy the js/ directory from build/ to your webserver and replace the existing folder.

Now open the URL with your favourit browser. Every modern browser (even IE) will work.


License
-
Xmas Browser Game
Copyright (C) 2013  Benjamin Schmidt <schmidi2@directbox.com>

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
