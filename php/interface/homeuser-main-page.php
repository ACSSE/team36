<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/01
 * Time: 7:09 PM
 */
    SebenzaServer::addNotification(9,"This is a new notification(duplication)");
?>

<div class="row collapse background-image" xmlns="http://www.w3.org/1999/html">
    <div class="small-3 columns full-height" style="background-color: rgba(20, 20, 20, 0.9)">
        <ul class="vertical menu" data-accordion-menu>
            <li><a href="#">Job Requests</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel1v')">Request Tradeworker</a></li>

                    <li><a onclick="toggleUserPageArea('panel2v')">Request Contractor</a></li>
                    <li><a onclick="toggleUserPageArea('panel3v')">Manage Job Requests</a></li>
                </ul>
            </li>
            <li><a href="#">Job Management</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel4v')">Jobs To initiate</a></li>
                    <li><a onclick="toggleUserPageArea('panel5v')">Ongoing Jobs</a></li>
                    <li><a onclick="toggleUserPageArea('panel5v')">Finished Jobs</a></li>

                </ul>
            </li>
            <li><a href="#">Profile Management</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel6v')">General Details</a></li>
                    <li><a onclick="toggleUserPageArea('panel7v')">Locations</a></li>

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
            <div class="tabs-panel full-height test" id="panel5v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-manage-ongoing-jobs.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel6v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-EditInfo.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel7v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <div class="full-height full-width">
                    <h1>Location:</h1>
                    <div class="row">
                        <div class="column medium-11 large-11">
                            <label>Area:</label><input type="text" name="areaname-homeuser-edit" id="areaname-homeuser-edit">
                        </div>
                        <div class="column medium-11 large-11">
                            <label>City:</label><input type="text" name="cityname-homeuser-edit" id="cityname-homeuser-edit">
                        </div>
                        <div class="column medium-11 large-11">
                            <label>Province:</label><input type="text" name="provincename-homeuser-edit" id="provincename-homeuser-edit">
                        </div>
                    </div>
                </div>
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
    //This brings up the confirmation between homeuser and tradeworker
    //    homeuserRequestsNotifier();
</script>