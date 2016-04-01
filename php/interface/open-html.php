<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/03/28
 * Time: 3:23 PM
 */
include_once $_SERVER['DOCUMENT_ROOT']."/php/classes/SebenzaModule.php";
//Any redirect related code should happen here (e.g. logout)
if (!empty($_POST) && isset($_POST['action'])) {
    $action = $_POST['action'];
    switch ($action) {
        case 'logout':
            SebenzaServer::logout();
            break;
    }
}
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
    <link rel="stylesheet" href="foundation-6/css/foundation.css" />
    <link rel="stylesheet" href="foundation-6/css/foundation-flex.css"/>
    <link rel="stylesheet" href="foundation-6/css/foundation-rtl.css"/>
    <link rel="stylesheet" href="foundation-6/css/app.css" />
    <link rel="stylesheet" href="css/customElementStyle.css" />
    <link rel="icon" type="image/png" href="Images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin">
    <script src="foundation-6/js/jquery.js"></script>
    <script src="http://maps.googleapis.com/maps/api/js"></script>
    <script src="javascript/sebenza.js"></script>

    <script>
        function initialize() {
            var mapProp = {
                center:new google.maps.LatLng(-26.1657905,28.163748),
                zoom:8,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
        }
        google.maps.event.addDomListener(window, 'load', initialize);
        //need to have the map resize without affecting the other elements.
        //google.maps.event.addDomListener(window, 'resize', initialize);
    </script>
</head>
<body>
    <div class="page-container">
    <!--DOCUMENT START-->