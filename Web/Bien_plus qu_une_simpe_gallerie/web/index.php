<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>The cold war library</title>
    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="css/styles.css" rel="stylesheet" />
    <link href="css/mdb.dark.min.css" rel="stylesheet" />
    <script type="javascript" src="js/mdb.min.js"></script>
    <script src="https://kit.fontawesome.com/f805f8084c.js" crossorigin="anonymous"></script>
</head>

<body>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
        <div class="container px-4 px-lg-5">
            <a class="navbar-brand" href="../index.php">Cold war gallery</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active"><a class="nav-link" href="?page=gallery.php">Gallery</a></li>
                    <li class="nav-item"><a class="nav-link" href="?page=about.php">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="?page=contact.php">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

</body>

<?php

ini_set('display_errors', 'Off');
ini_set('html_errors', 0);

function lfi_filter($value)
{
    $omit_words = array('..', '../', '/');
    rsort($omit_words);
    $new_string = str_replace($omit_words, '', $value);
    return $new_string;
}

if (isset($_GET["page"])) {
    $page = lfi_filter($_GET["page"]);
    include urldecode($page);
} else {
    include 'home.php';
}

?>
<!-- Bootstrap core JS-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- Core theme JS-->
<script src="js/scripts.js"></script>
</body>

</html>