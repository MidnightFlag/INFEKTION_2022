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
        <meta charset="utf-8">
        <link rel="stylesheet" href="style.css" media="screen" type="text/css" />
    </head>
    <body style='background:#fff;'>
        <div id="content">
            <?php
                session_start();
                if($_SESSION['username'] !== ""){
                    $user = $_SESSION['username'];
                    $getRank = "SELECT rank from user where username = '".$user."' ";
                    $exec_getRank = mysqli_query($db,$getRank);
                    $response = mysqli_fetch_array($exec_getRank);
                    $rank = $response['rank'];
                    if($rank == 1)
                    {
                        echo "Congratulations $user ! MCTF{iNJ3c7ioN_1s_s0_eZ}";
                    }
                    else
                    {
                        echo "Congratulations $user but... You are not an administrator ?";
                    }
                }
            ?>
            
        </div>
    </body>
</html>