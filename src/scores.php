<?
ini_set('session.cookie_lifetime', 60 * 60 * 24 * 30 * 6); // 6 Monate
session_name("xmasgame");
session_start();

foreach ($_REQUEST as $key => $value) {
	$_REQUEST[$key] = mysql_escape_string($value);
}

$USER="<ENTER DATABASE USER>";
$PASSWD="<ENTER DATABASE PASSWORD>";
$DB="<ENTER DATABASE NAME>";
$HOST="<ENTER DATABASE HOSTNAME>";

mysql_connect($HOST,$USER,$PASSWD);
@mysql_select_db($DB) or die( "Unable to select database");


function CHEATER() {
	// in Session speichern!!
	$_SESSION["CHEATER"] = "CHEATER";
	die();
}


function getRank() {
	$result = mysql_query("SELECT MAX(score),sid FROM scores GROUP BY sid ORDER BY MAX(score) DESC");
	$i=1;
	while ($r = mysql_fetch_assoc($result)) {
		if( $r["sid"] == session_id() )  {
			return $i;  // RANK OF PLAYER
			exit;
		}
		$i++;
	}
	return "0";
}


if( @$_REQUEST["q"] == "rank" ) {
	// ECHO 
	echo getRank();
}




if( @$_REQUEST["q"] == "ranking" ) {
	// ECHO 
header( 'Content-type: text/html; charset=utf-8' );

	$rank = getRank();

	$result = mysql_query("SELECT MAX(score) AS score,name FROM scores GROUP BY sid ORDER BY MAX(score) DESC LIMIT 0,10");
	$i=1;
	while ($r = mysql_fetch_assoc($result)) {
//		echo $i .". ". $r["score"] ." Toins (by ". $r["name"] .")\n<br/>";
//		echo $i .". ". $r["name"] ." hat ". $r["score"] ." Toins erreicht\n<br/>";
//		echo $i .". ". $r["name"] ." - ". $r["score"] ."\n<br/>";

		$s = ".   ";
		if($r["score"] < 1000) $s .= " ";
		if($r["score"] < 100) $s .= " ";
		if($r["score"] < 10) $s .= " ";
		
		if($i>9) $s = substr_replace($s, "", -1);

		if($rank == $i) {
			echo "> ". $i .$s. $r["score"] ." COINS   ". $r["name"] ."\n\n"; // PLAYERS POSITION
		} else {
			echo "&&". $i .$s. $r["score"] ." COINS   ". $r["name"] ."\n\n";
		}
		
//		flush();
//		ob_flush();
//		usleep(500000);
		$i++;
	}
}


if( @$_REQUEST["q"] == "bestscore" ) {
	// ECHO 
	if(isset($_SESSION["CHEATER"])) exit($_SESSION["CHEATER"]);
	
//header( 'Content-type: text/html; charset=utf-8' );
	$result = mysql_query("SELECT score FROM scores WHERE sid='". session_id() ."' ORDER BY score DESC LIMIT 0,1");
	$r = mysql_fetch_assoc($result);
	echo $r["score"];
}




if( @$_REQUEST["q"] == "player" ) {
	// ECHO 
	if(isset($_SESSION["CHEATER"])) exit($_SESSION["CHEATER"]);

//header( 'Content-type: text/html; charset=utf-8' );
	$result = mysql_query("SELECT name FROM scores WHERE sid='". session_id() ."' ORDER BY name DESC LIMIT 0,1");
	$r = mysql_fetch_assoc($result);
	echo $r["name"];
}



/////
// WRITE INTO DB
//

if(isset($_REQUEST["name"])) mysql_query("UPDATE scores SET name='". $_REQUEST["name"] ."' WHERE sid='". session_id() ."'");

if( !empty($_REQUEST["id"]) ) {
	
	mysql_query( "INSERT INTO scores SET id=". $_REQUEST["id"] .",   sid='". session_id() ."', ip='". $_SERVER['REMOTE_ADDR'] ."'" ); 

	
	if(isset($_REQUEST["name"])) {
		mysql_query( "UPDATE scores SET name='". $_REQUEST["name"] ."' WHERE sid='". session_id() ."'" );
	}
	
	if(isset($_REQUEST["start"])) {
		mysql_query( "UPDATE scores SET start=NOW() WHERE start IS NULL  AND id=". $_REQUEST["id"] );
	}
	
	if(isset($_REQUEST["end"])) {
		mysql_query( "UPDATE scores SET end=NOW(), time=TIME_TO_SEC(TIMEDIFF(end, start)) WHERE end IS NULL  AND id=". $_REQUEST["id"] );
		
		$result = mysql_query("SELECT time FROM scores WHERE id=". $_REQUEST["id"]);
		$r = mysql_fetch_assoc($result);
		$time = $r["time"];
		if($time < 58 || $time > 68) CHEATER();
			
	}
	
	if(isset($_REQUEST["score"])) {
		// DECRYPT ...
		// Zeichen 4 bis 7 ist der Score, zB 1290 oder 0910 oder 0000 für 0
		// Zeichen 12 muss immer k sein!
		$str = $_REQUEST["score"];
		$score = "";
		$strlen = strlen( $str ) -1;

		if(substr( $str, 11, 1 ) != "k") CHEATER();

		for( $i = 3; $i < 7; $i++ ) {
			$char = substr( $str, $i, 1 );
			if(ord($char) < 107 || ord($char) > 116) CHEATER();
			$int = ord($char) - 59;
			$score .= chr($int);
			// $char contains the current character, so do your processing here
		}
		
		$score -= 2999; // FAKE PUNKTE abziehen
		
		if($score > 2090) CHEATER();  // Maximale Punktzahl ist 2090


		//echo ">".$score."<";
		if(!isset($_SESSION["CHEATER"]))  mysql_query( "UPDATE scores SET score=". $score ." WHERE score IS NULL  AND id=". $_REQUEST["id"] );
	}

	if(isset($_REQUEST["history"]))	{
		mysql_query( "UPDATE scores SET history=CONCAT(history,'". $_REQUEST["history"] .",') WHERE id=". $_REQUEST["id"] );
	}
	
	
}


mysql_close();

?>