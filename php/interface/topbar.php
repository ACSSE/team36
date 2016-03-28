<?php
/**
 * Created by PhpStorm.
 * Date: 2016/03/20
 * Time: 10:06 AM
 */?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SebenzaSA.co.za</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../../foundation-6/css/foundation.css" />
    <link rel="stylesheet" href="../../foundation-6/css/foundation-flex.css"/>
    <link rel="stylesheet" href="../../foundation-6/css/foundation-rtl.css"/>
    <link rel="stylesheet" href="../../foundation-6/css/app.css" />
    <link rel="stylesheet" href="../../css/customElementStyle.css" />
    <link rel="icon" type="image/png" href="../../images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin">
</head>
<body>
    <div class="page-container">
    <!--DOCUMENT START-->
    <header class="sebenza-top-bar">
        <div class="row collapse logo-height full-width">
            <div class="shrink columns logo-width full-height background-colour">
                <img class="logo-height background-colour" type="image/svg+xml" src="../../images/logo.svg" alt="logo"/>
            </div>
            <div class="small-expand medium-expand large-expand columns full-height background-colour">
                <div class="row collapse navBarBackgroundHeight full-width">
                    <!--Place holder row for background colour-->
                </div>
                <div class="row collapse navigation-bar-colour full-width navBarHeight">
                    <div class="expanded columns full-height">
                        <div class="navigation-bar">
                        <!--http://foundation.zurb.com/sites/docs/button-group.html-->
                        <!--http://foundation.zurb.com/sites/docs/button.html-->
                        <ul class="menu align-right hide-for-small-only">
                            <li>
                                <button type="button" class="warning top-bar-button button" >
                                    Area Information
                                    <img class="top-bar-button-icon" type="image/svg+xml" src="../../images/info-icon.svg" alt="logo"/>
                                </button>
                            </li>
                            <li>
                                <button type="button" class="top-bar-button button" data-toggle="login-medium-large">
                                    Log In
                                    <img class="top-bar-button-icon" type="image/svg+xml" src="../../images/user-icon.svg" alt="logo"/>
                                </button>
                            </li>
                        </ul>
                        <ul class="menu align-right show-for-small-only">
                            <li>
                                <button type="button" class="button top-bar-button">
                                    Menu
                                    <img class="top-bar-button-icon" type="image/svg+xml" src="../../images/menu-icon.svg" alt="logo"/>
                                </button>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
        <!--Login modal for medium and large screens-->
        <!--http://foundation.zurb.com/sites/docs/toggler.html-->
        <div class="background-colour hide-for-small-only" id="login-medium-large" data-toggler data-animate="hinge-in-from-top hinge-out-from-top">
            <!--http://foundation.zurb.com/sites/docs/forms.html-->
            <form>
                <div class="row">
                    <div class="columns">
                        <label><b>Username</b>
                            <input type="text" class="smaller-input-box" placeholder="Username">
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="columns">
                        <label><b>Password</b>
                            <input type="text" class="smaller-input-box" placeholder="Password">
                        </label>
                    </div>
                </div>
                <div class="row top-padding">
                    <div class="columns">
                        <button type="button" class="success button full-width login-button" >
                            Log In
                        </button>
                    </div>
                </div>
                <div class="row top-padding">
                    <div class="columns">
                        <button type="button" class="button full-width login-button" >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    <div class="content-view">

    </div>
    <footer class="sebenza-bottom-bar navigation-bar-colour">
        <div class="row site-links small-up-2 medium-up-4 large-up-4">
            <div class="columns center-contents">
                <a href="#" class="yellow-link">Contact Us</a>
            </div>
            <div class="columns center-contents">
                <a href="#" class="yellow-link">Privacy Policy</a>
            </div>
            <div class="columns center-contents">
                <a href="#" class="yellow-link">Terms and Conditions</a>
            </div>
            <div class="columns center-contents">
                <a href="#" class="blue-link">About Us</a>
            </div>
        </div>
    </footer>
    <!--DOCUMENT END-->
    </div>
    <!-- Foundation required code-->
    <script src="../../foundation-6/js/jquery.js"></script>
    <script src="../../foundation-6/js/what-input.js"></script>
    <script src="../../foundation-6/js/foundation.js"></script>
    <script src="../../foundation-6/js/app.js"></script>
    <!-- Other JS plugins can be included here -->
    <script>
        $(document).foundation();
    </script>
</body>
</html>
