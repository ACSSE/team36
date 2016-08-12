<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/02
 * Time: 12:21 PM
 */
$PAGE_TITLE = "Contact Page";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/open-html.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/top-bar.php";
?>
    <div class="content-view" style="overflow-y: hidden">
        <div class="background-image-contact" style="padding: 10px">
            <div class="full-height full-width" style="overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85);text-align: center">
            <h1>Contact Details:</h1>
            <h5>Brandon Faul:</h5><p>215040496@student.uj.ac.za</p><br>
            <h5>Nick Rader:</h5><p>201325732@student.uj.ac.za</p><br>
        </div>
        </div>
    </div>


<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/bottom-bar.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/close-html.php";
?>