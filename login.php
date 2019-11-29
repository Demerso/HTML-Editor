<?php error_reporting(E_ERROR | E_PARSE);

$cipher = 'aes128';
$key = file_get_contents("/home/odemers/encryptkey");
$unlimited = time() + (10 * 365 * 24 * 60 * 60);

$username = htmlspecialchars($_POST["username"]);
$pass = openssl_encrypt($_POST["pass"], $cipher, $key);
$remember = array_key_exists("remember", $_POST);
$userid = openssl_encrypt($username, $cipher, $key);

$code = $_COOKIE['html_code'];

// Check if account already exists.
if (file_exists("/home/odemers/userfiles/$userid")) {
    // Check password
    if ($pass != trim(file("/home/odemers/userfiles/$userid")[0])) {
        header("Location: invalid.html");
        exit();
    }
    if ($remember) {
        setcookie("userid", $userid, $unlimited);
        setcookie("username", $username, $unlimited);
    } else {
        setcookie("userid", $userid);
        setcookie("username", $username);
    }
} else {
    // Create account
    $userFile = fopen("/home/odemers/userfiles/$userid", 'w') or die("Unable to create account.");
    fwrite($userFile, $pass . "\n");
    fwrite($userfile, $code);
    fclose($userFile);
    if ($remember) {
        setcookie("userid", $userid, $unlimited);
        setcookie("username", $username, $unlimited);
    } else {
        setcookie("userid", $userid);
        setcookie("username", $username);
    }
}

header("Location: index.php");
