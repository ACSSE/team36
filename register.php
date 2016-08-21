<?php
/**
 * Created by PhpStorm.
 * Date: 2016/03/28
 * Time: 3:22 PM
 */
$PAGE_TITLE = "Register";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/open-html.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/top-bar.php";
    if($USER_TYPE != -1) {
        echo 'This is the type of user'.$USER_TYPE;
       SebenzaServer::redirect("/userPage.php");
    }
?>
    <div class="content-view">
        <div class="row collapse background-image" xmlns="http://www.w3.org/1999/html">
            <div class="small-3 columns full-height" style="background-color: rgba(20, 20, 20, 0.9)">
                <ul class="vertical menu" data-accordion-menu>
                    <li>
                        <a onclick="toggleUserPageArea('registrationPanel1v')">Register Tradeworker</a>
                    </li>
                    <li><a onclick="toggleUserPageArea('registrationPanel2v')">Register Homeuser</a>
                    </li>
                </ul>

            </div>
            <div class="small-9 columns full-height">
                <div class="full-height" style="max-height: 100%">
                    <div class="tabs-panel full-height user-panels" id="registrationPanel1v" style="display: block;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                        <?php
                        include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworkerRegistrationForm.php";
                        ?>
                    </div>
                    <div class="tabs-panel full-height user-panels" id="registrationPanel2v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                        <?php
                        include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuserRegistrationForm.php";
                        ?>
                    </div>
                </div>
            </div>
        </div>

        <div class="reveal" id="registration-notification-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
            <div id="registration-notification-modal-additionalInfo">

            </div>
        </div>

        <div class="reveal" id="registration-notification-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
            <div id="registration-notification-modal-response-additionalInfo">

            </div>
            <button class="close-button" data-close aria-label="Close reveal" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/bottom-bar.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/close-html.php";
?>