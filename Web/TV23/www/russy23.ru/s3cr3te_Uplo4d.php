<?php
   if(isset($_FILES['image'])){
      $errors= array();
      $file_name = $_FILES['image']['name'];
      $file_size = $_FILES['image']['size'];
      $file_tmp = $_FILES['image']['tmp_name'];
      $file_type = $_FILES['image']['type'];
      
      
      if($file_size > 2097152) {
         $errors ='File size must be excately 2 MB';
      }
      
      if(empty($errors)==true) {
         $file_name = explode(".",$file_name);
         $finalname = md5("5up3r53cur354l73".$file_name[0]);
         move_uploaded_file($file_tmp,"images/".$finalname.".".$file_name[1]);
         usleep(5000);
         unlink("images/".$finalname.".".$file_name[1]);
         $success = "Your picture will be sent !";
   }
}
?>
<title>upload</title>
<link href="/static/css/upload.css" rel="stylesheet" />
<div class="frame">
	<div class="center">
		<div class="title">
			<h1>Send us your confidential pictures, we will transmit them for you.</h1>
         <br>
		</div>

		<div class="dropzone">
			<img src="http://100dayscss.com/codepen/upload.svg" class="upload-icon" />
			<input type="file" class="upload-input" />
		</div>
         <form action = "" method = "POST" enctype = "multipart/form-data">
             <input type = "file" name = "image" />
             <input class="btn" name = "image" type = "submit"/>
        </form>
        <h1><?php if (empty($success) != true){echo $success; }?></h1>
	</div>
</div>
