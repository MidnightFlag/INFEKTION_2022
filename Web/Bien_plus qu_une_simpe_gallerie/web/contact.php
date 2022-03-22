        <!-- Page Content-->
        <section>
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5">
                    <div class="col-lg-6">
                        <h1 class="mt-5">Contact us</h1>
                        <p>Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
                            a matter of hours to help you.</p>
                    </div>
                </div>
            </div>
        </section>
        <div class="container">
            <!--Section: Contact v.2-->
            <section class="mb-4">
                <br /><br />
                <div class="row">

                    <!--Grid column-->
                    <div class="col-md-9 mb-md-0 mb-5">
                        <form id="contact-form" name="contact-form" action="" method="POST">

                            <!--Grid row-->
                            <div class="row">

                                <!--Grid column-->
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="name" name="name" class="form-control">
                                        <label for="name" class="">Your name</label>
                                    </div>
                                </div>
                                <!--Grid column-->

                                <!--Grid column-->
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input type="text" id="email" name="email" class="form-control">
                                        <label for="email" class="">Your email</label>
                                    </div>
                                </div>
                                <!--Grid column-->

                            </div>
                            <!--Grid row-->

                            <!--Grid row-->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="md-form mb-0">
                                        <input type="text" id="subject" name="subject" class="form-control">
                                        <label for="subject" class="">Subject</label>
                                    </div>
                                </div>
                            </div>
                            <!--Grid row-->

                            <!--Grid row-->
                            <div class="row">

                                <!--Grid column-->
                                <div class="col-md-12">

                                    <div class="md-form">
                                        <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                                        <label for="message">Your message</label>
                                    </div>

                                </div>
                            </div>
                            <!--Grid row-->

                        </form>

                        <div class="text-center text-md-left">
                            <a class="btn btn-primary" onclick="validateForm();">Send</a>
                        </div>
                        <div class="status"></div>
                    </div>
                    <!--Grid column-->

                    <!--Grid column-->
                    <div class="col-md-3 text-center">
                        <ul class="list-unstyled mb-0">
                            <li><i class="fas fa-map-marker-alt fa-2x"></i>
                                <p>INFEKTION Project, ESNA, FRANCE</p>
                            </li>

                            <li><i class="fas fa-phone mt-4 fa-2x"></i>
                                <p>+ 01 234 567 89</p>
                            </li>

                            <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                                <p>contact@infektion.ctf</p>
                            </li>
                        </ul>
                    </div>
                    <!--Grid column-->

                </div>

            </section>
            <!--Section: Contact v.2-->
            <script>
                function validateForm() {
                    var name = document.getElementById('name').value;
                    if (name == "") {
                        document.querySelector('.status').innerHTML = "Name cannot be empty";
                        return false;
                    }
                    var email = document.getElementById('email').value;
                    if (email == "") {
                        document.querySelector('.status').innerHTML = "Email cannot be empty";
                        return false;
                    } else {
                        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (!re.test(email)) {
                            document.querySelector('.status').innerHTML = "Email format invalid";
                            return false;
                        }
                    }
                    var subject = document.getElementById('subject').value;
                    if (subject == "") {
                        document.querySelector('.status').innerHTML = "Subject cannot be empty";
                        return false;
                    }
                    var message = document.getElementById('message').value;
                    if (message == "") {
                        document.querySelector('.status').innerHTML = "Message cannot be empty";
                        return false;
                    }
                    document.querySelector('.status').innerHTML = "Sending...";
                }
            </script>
            <?php
            if (isset($_POST['name']))
                $name = $_POST['name'];
            if (isset($_POST['email']))
                $email = $_POST['email'];
            if (isset($_POST['message']))
                $message = $_POST['message'];
            if (isset($_POST['subject']))
                $subject = $_POST['subject'];
            if ($name === '') {
                echo "Name cannot be empty.";
                die();
            }
            if ($email === '') {
                echo "Email cannot be empty.";
                die();
            } else {
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    // echo "Email format invalid.";
                    die();
                }
            }
            if ($subject === '') {
                // echo "Subject cannot be empty.";
                die();
            }
            if ($message === '') {
                // echo "Message cannot be empty.";
                die();
            }
            $content = "From: $name \nEmail: $email \nMessage: $message";
            $recipient = "contact@infektion.ctf ";
            $mailheader = "From: $email \r\n";
            mail($recipient, $subject, $content, $mailheader) or die("Error!");
            echo "Email sent!";
            ?>
        </div>