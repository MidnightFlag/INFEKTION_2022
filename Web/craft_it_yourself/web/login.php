<html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
       <meta charset="utf-8">
        <link rel="stylesheet" href="style.css" media="screen" type="text/css" />
    </head>
    <body>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul class="navbar-nav">
                <li class="nav-item active">
                <a class="nav-link" href="login.php">Sign in</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="register.php">Register</a>
                </li>
            </ul>
        </nav>
        <div id="container">
            
            <form action="verification.php" method="POST">
                <h1>Sign In</h1>
                
                <label><b>Username</b></label>
                <input type="text" placeholder="Enter username" name="username" required>

                <label><b>password</b></label>
                <input type="password" placeholder="Enter passwowrd" name="password" required>

                <input type="submit" id='submit' value='LOGIN' >
                <?php
                if(isset($_GET['error'])){
                    $err = $_GET['error'];
                    if($err==1 || $err==2)
                        echo "<p style='color:red'>Incorrect username or password !</p>";
                }
                ?>
            </form>
        </div>
    </body>
</html>