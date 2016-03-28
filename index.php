<?php
/**
 * Created by PhpStorm.
 * Date: 2016/03/28
 * Time: 3:22 PM
 */
$PAGE_TITLE = "Homepage";
include $_SERVER['DOCUMENT_ROOT']."/php/interface/open-html.php";
include $_SERVER['DOCUMENT_ROOT']."/php/interface/top-bar.php";

?>
    <div class="content-view">
        <div class="orbit" role="region" aria-label="Favorite Home Pictures" data-orbit data-use-m-u-i="false" style="width:100%;height:100%">
            <ul class="orbit-container">
                <button class="orbit-previous"><span class="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>
                <button class="orbit-next"><span class="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>
                <li class="is-active orbit-slide">
                        <div id="googleMap" class="test"></div>
                </li>
                <li class="orbit-slide">
                    <img class="orbit-image" src="Images/construction-hard-hat.jpg" alt="Space">
                    <figcaption class="orbit-caption">Lets Rocket!</figcaption>
                </li>
                <li class="orbit-slide">
                    <img class="orbit-image" src="Images/construction-hard-hat.jpg" alt="Space">
                    <figcaption class="orbit-caption">Encapsulating</figcaption>
                </li>
                <li class="orbit-slide">
                    <img class="orbit-image" src="Images/construction-hard-hat.jpg" alt="Space">
                    <figcaption class="orbit-caption">Outta This World</figcaption>
                </li>
            </ul>
            <nav class="orbit-bullets">
                <button class="is-active" data-slide="0" onclick="initialize()"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>
                <button data-slide="1"><span class="show-for-sr">Second slide details.</span></button>
                <button data-slide="2"><span class="show-for-sr">Third slide details.</span></button>
                <button data-slide="3"><span class="show-for-sr">Fourth slide details.</span></button>
            </nav>
        </div>
    </div>
<?php
include $_SERVER['DOCUMENT_ROOT']."/php/interface/bottom-bar.php";
include $_SERVER['DOCUMENT_ROOT']."/php/interface/close-html.php";
?>