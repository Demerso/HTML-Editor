<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/main.js"></script>
    <link rel="shortcut icon" href="icon.ico" type="image/x-icon">
    <meta name="author" content="Olivier Demers" />
    <meta name="description" content="Online WebEditor with live preview."/>
    <meta name="keywords" content="HTML, Editor, Online, Preview" />
    <title>HTML Editor</title>
</head>
<body>
    <div id="menu">
        <div id="files-menu">
            <a onClick="jump('code')">See Code</a>
            <a onClick="jump('result')">See Result</a>
        </div>
        <div id="user-menu">
            <?php if (array_key_exists('userid', $_COOKIE) && array_key_exists('username', $_COOKIE)) {?>
            <a onClick="showPopup('options')">Options</a>
            <?php } else {?>
            <a onClick="showPopup('login')">Login</a>
            <?php }?>
        </div>
    </div>
    <div id="options">
        <h1>Welcome<br><?php echo $_COOKIE['username'] ?></h1>
        <a onClick="loadCode()">Load HTML</a>
        <a onClick="saveCode()">Save HTML</a>
        <a onClick="exportCode()">Export HTML</a>
        <a onClick="testCode()">HTML Validator</a>
        <a onClick="deleteCookie('html_code')">Reset</a>
        <a onClick="deleteCookie('username'); deleteCookie('userid');">Disconnect</a>
    </div>
    <div class="form" id="login">
        <form name="loginForm" action="login.php" method="post">
            <input name="type" value="login" hidden>
            <label>Username</label><br>
            <input type="text" name="username" minlength=5 maxlength=30 required><br>
            <label>Password
                <span class="pass-icon" onClick="togglePassword('loginForm')">
                    <input type="checkbox" name="showPass" tabindex="-1">
                </span>
            </label><br>
            <input type="password" name="pass" minlength=5 maxlength=30 required><br>
            <input type="hidden" name="remember" value="0" />
            <div class="checkbox">
                <input type="checkbox" id="rememberPassLogin" name="remember" value="1">
                <label for="rememberPassLogin"> Remember me</label>
            </div>
            <input type="submit" name="submit">
        </form>
    </div>
    <div id="page">
        <div id="code" onInput="updatePage()">
            <pre>
            </pre>
        </div>
        <hr>
        <iframe id="result"></iframe>
    </div>
</body>
</html>