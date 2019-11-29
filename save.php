<?php

$code = $_COOKIE['html_code'];
$userid = $_COOKIE['userid'];
$pass = trim(file("/home/odemers/userfiles/$userid")[0]);

$userfile = fopen("/home/odemers/userfiles/$userid", "w");

fwrite($userfile, $pass . "\n");
fwrite($userfile, $code);
fclose($userfile);

header("Location: index.php");
