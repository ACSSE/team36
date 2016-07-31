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
    <!--Notification pull starts here-->
    <?php
    if(isset($USER_CONFIRMATION)){
        if($USER_CONFIRMATION){
            if(isset($USER_TYPE)) {
                switch ($USER_TYPE) {
                    case 0:
                        include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworker-main-page.php";
                        break;
                    case 1:
                        include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/contractor-main-page.php";
                        break;
                    case 2:
                        //echo 'UserID: '.SebenzaServer::fetchSessionHandler()->getSessionVariable("UserID");
                        include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-main-page.php";
                        break;
                    default:
                        SebenzaServer::redirect("/");
                        break;
                }
            } else {
                SebenzaServer::redirect("/");
            }
        } else{
            SebenzaServer::logout();
        }
    } else {
        SebenzaServer::redirect("/");
    }
    ?>
</div>
<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/bottom-bar.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/close-html.php";
?>