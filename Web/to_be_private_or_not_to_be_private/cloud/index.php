<!DOCTYPE html>
<html>
    <head>
        <title>Cloud</title>
        <style>
            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
            }
            .topnav {
              overflow: hidden;
              background-color: #333;
            }
            .topnav a {
              float: left;
              color: #f2f2f2;
              text-align: center;
              padding: 14px 16px;
              text-decoration: none;
              font-size: 17px;
            }
            .topnav a:hover {
              background-color: #ddd;
              color: black;
            }
            .topnav a.active {
              background-color: #620000;
              color: white;
            }
            .center {
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
        </style>
    </head>
    <body> 
        <div class="topnav">
          <!-- what a great navbar ! -->
            <a class="active" href="index.php">Cloud</a>
            <a href="?categorie=photo.php">photo</a>
            <a href="?categorie=music.php">Music</a>
          </div>
    </body>
    <?php
    function lfi_filter($value)
    {
        $omit_words = array('..', '../', '/');
        rsort($omit_words);
        $new_string = str_replace($omit_words, '', $value);
        return $new_string;
    }
    
    if (isset($_GET["categorie"])) {
      $categorie = lfi_filter($_GET["categorie"]);
      include urldecode($categorie);
    }else {
      include 'home.php';
    }
    ?>
</html>