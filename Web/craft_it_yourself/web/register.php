<?php
    $host = "localhost";
    $user_mysql = "root";    
    $password_mysql = "";   
    $database = "craft_it_yourself";

    $db = mysqli_connect($host, $user_mysql, $password_mysql, $database);

    if(!$db)
    {
        echo "Could not connect to database\n";
        exit();
    }

    mysqli_set_charset($db, "utf8");
?>

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
                <?php
                if(!empty($_GET['user']))
                {
                    $user = mysqli_real_escape_string($db, $_GET['user']);
                    $query = "SELECT id, username, password, rank FROM user WHERE id = ".$user;
                    $rs_users = mysqli_query($db, $query);

                    echo "<u>\n";

                    if(mysqli_num_rows($rs_users) > 0)
                    {
                        while($r = mysqli_fetch_assoc($rs_users))
                        {
                            echo "<li><a href=\"#\">".htmlspecialchars($r['username'])." - ".$r['password']." - ".$r['rank']."</a></li>\n";
                        }
                    }

                    echo "</u>\n";
                }
                ?>
                
                <form action="register.php" method="Get">
                <h1>Register</h1>
                
                <label><b>Username</b></label>
                <input type="text" placeholder="Enter username" name="username" required>

                <label><b>password</b></label>
                <input type="password" placeholder="Enter passwowrd" name="password" required>

                <input type="submit" id='submit' value='REGISTER' >
                <?php
                if(!empty($_GET['username']) && !empty($_GET['password']))
                {
                    $username = $_GET['username'];
                    $password = $_GET['password'];

                    $query = "SELECT username FROM user WHERE username = '".$username."'";
                    $rs = mysqli_query($db, $query);

                    if(mysqli_num_rows($rs) >= 1)
                    {
                        echo "<p style='color:red'>Username is already used.</p>";
                    }
                    else
                    {
                        mysqli_query($db, "INSERT INTO user (username, password, rank) VALUES ('".$username."', '".$password."', 2)");
                    }

                    mysqli_free_result($rs);
                    mysqli_close($db);
                }?>
            </form>
        </div>
    </body>
</html>