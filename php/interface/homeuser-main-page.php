<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/01
 * Time: 7:09 PM
 */
    //SebenzaServer::addNotification(9,"This is a new notification(duplication)");
?>

<div class="row collapse background-image" xmlns="http://www.w3.org/1999/html">
    <div class="small-3 columns full-height" style="background-color: rgba(20, 20, 20, 0.9)">
        <ul class="vertical menu" data-accordion-menu>
            <li><a href="#">Job Requests</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel1v')">Request Tradeworker</a></li>
                    <li><a onclick="toggleUserPageArea('panel2v')">Request Contractor</a></li>
                    <li><a onclick="toggleUserPageArea('panel3v')">Manage Job Requests</a>
                        <ul class="menu vertical nested">
                            <li><a onclick="toggleUserPageArea('panel3v')">Ongoing Requests</a></li>
                            <li><a onclick="toggleUserPageArea('panel7v')">Completed Requests</a></li>
                            <li><a onclick="toggleUserPageArea('panel8v')">Canceled Requests</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li><a href="#">Job Management</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel4v')">Jobs To initiate</a></li>
                    <li><a onclick="toggleUserPageArea('panel5v')">Ongoing Jobs</a></li>
                    <li><a onclick="toggleUserPageArea('panel11v')">Finished Jobs</a></li>
                    <li><a onclick="toggleUserPageArea('panel9v')">Cancelled Jobs</a></li>
                </ul>
            </li>
            <li><a href="#">Profile Management</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel6v')">General Details</a></li>
                    <li><a onclick="toggleUserPageArea('panel10v')">Locations</a></li>

                </ul>
            </li>
        </ul>

    </div>
    <div class="small-9 columns full-height">
        <div class="full-height" style="max-height: 100%">
            <div class="tabs-panel full-height user-panels" id="panel1v" style="display: block;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-request-tradeworker.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel2v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-request-contractor.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel3v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-manage-requests.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel4v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-manage-initiate-jobs.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel11v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-manage-completed-jobs.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel5v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-manage-ongoing-jobs.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel6v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                //include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-EditInfo.php";
                ?>
            </div>

            <div class="tabs-panel full-height user-panels" id="panel10v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
               // include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-EditLocation.php";
                ?>
            </div>

            <div class="tabs-panel full-height user-panels" id="panel7v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-manage-requests-completed.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel8v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-manage-requests-cancelled.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel9v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-manage-cancelled-jobs.php";
                ?>
            </div>
        </div>
    </div>
</div>

<div class="reveal" id="homeuser-homepage-notification-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-homepage-notification-modal-additionalInfo">

    </div>
</div>

<div class="reveal" id="homeuser-homepage-notification-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-homepage-notification-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<script>
    //The following is used to request all data necessary for the homeuser to be displayed
    //used by - homeuser-manage-requests.php,homeuser-manage-initiate-jobs
    sendAJAXRequest('fetch-job-requests', handleHomeuserFetchJobRequests);
    sendAJAXRequest('fetch-homeuser-profile-details', handleHomeuserFetchProfileDetails);
    sendAJAXRequest('fetch-homeuser-location-details', handleHomeuserFetchLocationDetails);
    //This brings up the confirmation between homeuser and tradeworker
    //    homeuserRequestsNotifier();
</script>