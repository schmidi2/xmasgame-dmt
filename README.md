Xmas Browser Game
============

This Xmas Game I made in 2013 for our music club [Dorfmusik Thörishaus](http://www.dm-thoerishaus.ch). It is a HTML5 browser game, based on the JavaScript framework [melonJS](http://melonjs.org).
As a template I used Tilly's Horrible Halloween by Gareth Williams, see [GarethIW/MelonTest](https://github.com/GarethIW/MelonTest).

* The game is in german only. Translate yourself if you like to.
* It was developed quicky and a little bit dirty, because I didn't have much time.
* Some cheating prevention is implemented, but you have to check that yourself.
* Sadly it runs too slow on mobile phones or tablets. Maybe with a newer version of melonJS or newer devices it will work smoothly.
* No sound used. You have to implement that by yourself.

Gameplay
-
Control the Santa Claus throug the map. Collect as many notes as possible. But avoid the eval monsters. If they touch your Santa Claus, he dies. He can die as many times you like. But after 60 seconds, the game is over and you see the highscore list - maybe you get on the list. If not, you can try again. Don't forget to enter your name in highscore.


Installation
-
This game was used on GNU/Debian with Apache 2.2, PHP 5.3 and MySQL 5.5. It will likely work on never versions and similar environments.
Copy the directory src/ into your website and rename the folder. Import the SQL script you find in the subdirectory db/. Enter the database connection parameters in the file scores.php. If you like to monitor the highscore, enter parameters in the file 00rangliste.php too.


