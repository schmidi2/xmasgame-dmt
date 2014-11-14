<?

$USER="<ENTER DATABASE USER>";
$PASSWD="<ENTER DATABASE PASSWORD>";
$DB="<ENTER DATABASE NAME>";
$HOST="<ENTER DATABASE HOSTNAME>";

mysql_connect($HOST,$USER,$PASSWD);
@mysql_select_db($DB) or die( "Unable to select database");


header( 'Content-type: text/html; charset=utf-8' );
?>
<html>
<head>
<meta http-equiv="refresh" content="5; URL=00rangliste.php">
</head>
<body>
<?

	$result = mysql_query("SELECT end, MAX(score) AS score,name,ip FROM scores WHERE score IS NOT NULL GROUP BY sid ORDER BY MAX(score) DESC LIMIT 0,1000");
	$i=1;
	while ($r = mysql_fetch_assoc($result)) {
		$s = ".&nbsp;&nbsp;&nbsp;";
		if($r["score"] < 1000) $s .= "&nbsp;";
		if($r["score"] < 100) $s .= "&nbsp;";
		if($r["score"] < 10) $s .= "&nbsp;";
		
		echo $r["end"] ."&nbsp;&nbsp;&nbsp;&nbsp;". $i .$s. $r["score"] ."&nbsp;COINS&nbsp;&nbsp;&nbsp;". $r["name"] ."&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(". $r["ip"] .")\n\n<br/>";
		
		$i++;
	}

?>

<br><br><br><br>

<?

	$result = mysql_query("SELECT COUNT(*) bla FROM scores");
	$r = mysql_fetch_assoc($result);
	echo "Anzahl Spiele gespielt: ". $r["bla"];

?>


<br><br><br><br>

<?

	$result = mysql_query("SELECT DISTINCT sid FROM scores");
	$r = mysql_num_rows($result);
	echo "Anzahl Spieler: ". $r;

?>

</body>
</html>