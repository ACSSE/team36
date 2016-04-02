<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/01
 * Time: 11:30 AM
 */

$PAGE_TITLE = "MainPage";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/open-html.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/top-bar.php";
?>
<div class="content-view">
    <?php
    echo "The following is username and usertype:".SebenzaServer::fetchSessionHandler()->getSessionVariable('Username').SebenzaServer::fetchSessionHandler()->getSessionVariable('UserType');
    if(isset($utype)) {
        switch ($utype) {
            case 0:
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworker-main-page.php";
                break;
            case 1:
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/contractor-main-page.php";
                break;
            case 2:
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-main-page.php";
                break;
            default:
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/temporary-main-page.php";
                break;
        }
    }
    else{
        include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/temporary-main-page.php";
    }
    ?>
</div>
<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/bottom-bar.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/close-html.php";
?>



