<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/03/28
 * Time: 3:23 PM
 */
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/classes/SebenzaServer.php";
include_once $_SERVER['DOCUMENT_ROOT'] ."/php/externalClasses/PHPMailer-master/PHPMailer-master/PHPMailerAutoload.php";
if (SebenzaServer::fetchSessionHandler()->exists('UserType') && SebenzaServer::fetchSessionHandler()->exists('UserConfirmation')) {
    $USER_TYPE = SebenzaServer::fetchSessionHandler()->getSessionVariable("UserType");
    $USER_CONFIRMATION = SebenzaServer::fetchSessionHandler()->getSessionVariable("UserConfirmation");
} else {
    $USER_TYPE = -1;
}
//Any php redirect related code should happen here, before text is sent to the client
SebenzaServer::start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <?php if (empty($PAGE_TITLE)) {
        echo "<title>No Title Set</title>\n";
    } else {
        echo "<title>".$PAGE_TITLE."</title>";
    }?>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="foundation-6/css/app.css" />
    <link rel="stylesheet" href="css/customElementStyle.css" />
    <link rel="icon" type="image/png" href="Images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin">
    <script src="foundation-6/js/jquery.js"></script>
    <script src="foundation-6/js/what-input.js"></script>
    <script src="foundation-6/js/foundation.js"></script>
    <script src="foundation-6/js/app.js"></script>
    <!-- If you want to enable geocoding for
    <script
    async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCOhOzd9iCUl2GHC1o-ztn95gN3-XKxMmU&callback=initMap">
    </script>-->
<!--    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrJJPwQCz_wuuuYyfD1q4e6mFO7OBHk8Y&libraries=places"-->
<!--            ></script>-->
<!--    <script src="http://maps.googleapis.com/maps/api/js"></script>-->
    <script src="javascript/sebenza.js"></script>
</head>
<body>
    <div class="page-container">
    <!--DOCUMENT START-->