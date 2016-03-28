<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/03/28
 * Time: 3:23 PM
 */
include $_SERVER['DOCUMENT_ROOT']."/php/classes/SebenzaModule.php";
$SERVER = new SebenzaServer();
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
    <link rel="icon" type="image/png" href="images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin">
</head>
<body>
    <div class="page-container">
    <!--DOCUMENT START-->