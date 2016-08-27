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
            <li><a href="#">Manage Data</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel1v')">Manage Specializations</a></li>
                    <li><a onclick="toggleUserPageArea('panel2v')">View Tables</a></li>
                    <li><a onclick="toggleUserPageArea('panel3v')">Block User</a></li>
                </ul>
            </li>
            <li><a href="#">Reporting</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel4v')">Country Reports</a></li>
                    <li><a onclick="toggleUserPageArea('panel5v')">Provincial Reports</a></li>
                    <li><a onclick="toggleUserPageArea('panel6v')">Local Reports</a></li>
                </ul>
            </li>
            <li><a href="#">Profile Management</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel7v')">General Details</a></li>

                </ul>
            </li>
        </ul>

    </div>
    <div class="small-9 columns full-height">
        <div class="full-height" style="max-height: 100%">
            <div class="tabs-panel full-height user-panels" id="panel1v" style="display: block;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/admin-manage-specializations.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel2v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/admin-view-tables.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel3v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/admin-block-user.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel4v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/admin-country-reporting.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel5v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/admin-provincial-reporting.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel6v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/admin-local-reporting.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel7v" style="display: none;overflow-y: auto;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/admin-profile-management.php";
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
    sendAJAXRequest('fetch-job-requests', handleAdminFetchJobRequests);
//    sendAJAXRequest('fetch-admin-profile-details', handleHomeuserFetchProfileDetails);
    //This brings up the confirmation between homeuser and tradeworker
    //    homeuserRequestsNotifier();
</script>