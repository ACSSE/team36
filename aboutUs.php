<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/02
 * Time: 12:52 PM
 */
$PAGE_TITLE = "AboutUs Page";
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/open-html.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/top-bar.php";
?>
    <div class="content-view">
        <div class="background-image-contact">
            <div class="background-colour centered-div">
                <h1>About Us:</h1>
                We strive to provide a fair environment in which tradeworkers, contractors and homeusers can interact with one
                another to set up contracts, to complete these contracts and be reviewed by the users. This in turn builds
                up reliable recommendations through the people who use either contractor or tradeworker. Tradeworkers Will have
                the ability to improve their CV's through recommendations and job history.
            </div>
        </div>
    </div>
<?php
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/bottom-bar.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/close-html.php";
?>