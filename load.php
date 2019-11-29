<?php

$userid = $_COOKIE['userid'];
$userfile = file("/home/odemers/userfiles/$userid");
$code = "";

for ($i = 0; $i < count($userfile); $i++) {
    if ($i != 0) {
        $code .= $userfile[$i];
    }
}

?>

<script>
    document.cookie = "html_code=" + encodeURIComponent(`<?php echo $code; ?>`) + ";";
    location.replace("index.php")
</script>