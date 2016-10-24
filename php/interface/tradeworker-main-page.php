<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/01
 * Time: 7:18 PM
 */?>

<div class="row collapse background-image" xmlns="http://www.w3.org/1999/html">
    <div class="small-3 columns full-height" style="background-color: rgba(20, 20, 20, 0.9)">
        <ul class="vertical menu" data-accordion-menu>
            <li>
                <a href="#">Manage Requests</a>
                <ul class="menu vertical nested">
                    <li><a aria-describedby="messageCount" onclick="toggleUserPageArea('panel1v')">Job Requests<div style="margin-left: 2em" id="tradeworker-ongoing-request-toAccept-badge"></div></a></li>

                    <li><a onclick="toggleUserPageArea('panel2v')">Cancelled Requests</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Manage Jobs</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel3v')">Initiated Jobs<div style="margin-left: 2em" id="tradeworker-ongoing-jobs-badge"></div></a></li>
                    <li><a onclick="toggleUserPageArea('panel8v')">Completed Jobs</a></li>
                    <li><a onclick="toggleUserPageArea('panel4v')">Unfinished Jobs</a></li>
                </ul>
            </li>
            <li><a onclick="toggleUserPageArea('panel9v')">Manage Profile</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel9v')">Reporting</a></li>
                    <li><a onclick="toggleUserPageArea('panel5v')">General Details</a></li>
                    <li><a onclick="toggleUserPageArea('panel6v')">Locations</a></li>
                    <li><a onclick="toggleUserPageArea('panel7v')">Skills</a></li>

                </ul>
            </li>
        </ul>
        <form id="tradeworker-quickbar-settings" name="tradeworker-quickbar-settings">
        <div class="row">
            <div class="column medium-8 large-8 large-offset-4 medium-offset-4">
                <label style="color: #ffae00">Availability:</label>
                <div class="switch large">
                    <?php
                        $dbhandler = SebenzaServer::fetchDatabaseHandler();
                        $command = "SELECT `Availability` FROM `TRADE_WORKER` WHERE `UserID` = ?";
                        $session = SebenzaServer::fetchSessionHandler();
                        $id = $session->getSessionVariable("UserID");

                        $dbhandler->runCommand($command,$id);
                        $result = $dbhandler->getResults();
                        if(count($result) > 0){
                            if($result[0]['Availability'] == true){
                                echo '<input class="switch-input" id="availability-tradeworker-mainpage-switch" type="checkbox" name="ignore-availability-tradeworker-mainpage-switch" onclick="sendAJAXRequest(\'set-availability\',handleSetTradeworkerAvailability,\'tradeworker-quickbar-settings\')" checked>';
                            }
                            else{
                                echo '<input class="switch-input" id="availability-tradeworker-mainpage-switch" type="checkbox" name="ignore-availability-tradeworker-mainpage-switch" onclick="sendAJAXRequest(\'set-availability\',handleSetTradeworkerAvailability,\'tradeworker-quickbar-settings\')">';
                            }
                        }
                    ?>
                    <label class="switch-paddle" for="availability-tradeworker-mainpage-switch">
                        <span class="show-for-sr">Availability</span>
                        <span class="switch-active" aria-hidden="true">Yes</span>
                        <span class="switch-inactive" aria-hidden="true">no</span>
                    </label>
                </div>
            </div>
        </div>
        </form>
    </div>
    <div class="small-9 columns full-height">
        <div class="full-height" style="max-height: 100%">
            <div class="tabs-panel full-height user-panels panel-container" id="panel1v">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworker-manage-requests.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels panel-container" id="panel2v">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworker-manage-requests-cancelled.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels panel-container" id="panel3v">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworker-manage-ongoing-jobs.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels panel-container" id="panel4v">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworker-manage-cancelled-jobs.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels panel-container" id="panel5v" >
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworker-EditInfo.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels panel-container" id="panel6v">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworker-EditLocation.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels panel-container" id="panel7v">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworker-manage-requests.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels panel-container" id="panel8v">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworker-manage-completed-jobs.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels panel-container" id="panel9v">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworker-reporting.php";
                ?>
            </div>
        </div>
    </div>
</div>

<div class="background-colour hide-for-small-only" id="userPageModal-medium-large" data-toggler data-closable data-animate="hinge-in-from-top hinge-out-from-bottom">
    <!--http://foundation.zurb.com/sites/docs/forms.html-->
    <button class="close-button" data-close>&times;</button>
    <div id="jobDescript">
    </div>
</div>
<div class="reveal" id="tradeworker-homepage-notification-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="tradeworker-homepage-notification-modal-additionalInfo">

    </div>
</div>

<div class="reveal" id="tradeworker-homepage-notification-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="tradeworker-homepage-notification-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<script>
    //tradeworkerRequestsNotifier();
    sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);
    sendAJAXRequest('fetch-tradeworker-profile-details',handleTradeworkerFetchProfileDetails);
    sendAJAXRequest('fetch-tradeworker-location-details', handleTradeworkerFetchLocationDetails);
</script>