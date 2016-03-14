<?php
/**
 * Created by PhpStorm.
 * User: Brandon
 * Date: 2016/03/01
 * Time: 5:20 PM
 */?>
<html lang="en">
<head>
    <!-- This is a test -->
    <meta charset="UTF-8">
    <!--Testing commit and push -->
    <title>sebenzaSA.co.za</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="foundation-6/css/foundation.css" />
    <link rel="stylesheet" href="foundation-6/css/app.css" />
    <link rel="stylesheet" href="css/customElementStyle.css" />
</head>
<body>
<div class="centerPage" style=". . .">
    <div class="top-bar">
        <div class="top-bar-left">
            <ul class="menu">
                <li class="menu-text"> LOGO HERE </li>
                <li class="has-form">
                    <div class="row collapse">
                        <div class="large-8 small-8 large offset-2 columns ">
                            <input type="text" placeholder="Looking for?">
                        </div>
                        <div class="large-4 small-3 columns">
                            <a href="#" class="alert button">Search</a>
                        </div>
                    </div>
                </li>

            </ul>
        </div>

        <div class="top-bar-right">
            <ul class="menu" >
                <li><a href="#Login.php" class="button">LOGIN</a></li>
                <li><a hreg="#SignUp.php"class="button">SIGN UP</a></li>
            </ul>
        </div>
    </div>
    <hr>

    <div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit>
        <ul class="orbit-container">
            <button class="orbit-previous"><span class="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>
            <button class="orbit-next"><span class="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>
            <li class="is-active orbit-slide">
                <img class="orbit-image" src="img1.jpg" alt="test1">
                <figcaption class="orbit-caption">Test1</figcaption>
            </li>
            <li class="orbit-slide">
                <img class="orbit-image" src="img2.jpg" alt="test2">
                <figcaption class="orbit-caption">Test2</figcaption>
            </li>
            <li class="orbit-slide">
                <img class="orbit-image" src="img3.jpg" alt="test3">
                <figcaption class="orbit-caption">Test3</figcaption>
            </li>
            <li class="orbit-slide">
                <img class="orbit-image" src="img4.jpg" alt="test4">
                <figcaption class="orbit-caption">Test4</figcaption>
            </li>
        </ul>
        <nav class="orbit-bullets">
            <button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>
            <button data-slide="1"><span class="show-for-sr">Second slide details.</span></button>
            <button data-slide="2"><span class="show-for-sr">Third slide details.</span></button>
            <button data-slide="3"><span class="show-for-sr">Fourth slide details.</span></button>
        </nav>
    </div>

    <hr />

    <footer class="footer">
        <div class="row">
            <div class="small-12 columns">
                <p class="slogan">Get The Job or Get the job done!</p>
                <p class="links">
                    <a href="#">Home</a>
                    <a href="#">About Us</a>
                    <a href="#">FAQ's</a>
                    <a href="#">Contact Us</a>
                </p>

            </div>
        </div>
    </footer>
</div>
</body>
</html>