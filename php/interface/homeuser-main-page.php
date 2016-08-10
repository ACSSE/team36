<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/01
 * Time: 7:09 PM
 */
    SebenzaServer::addNotification(9,"This is a new notification(duplication)");
?>
<script>
    //The following is used to request all data necessary for the homeuser to be displayed
    //used by - homeuser-manage-requests.php,homeuser-manage-initiate-jobs
    sendAJAXRequest('fetch-job-requests', handleHomeuserFetchJobRequests);
    //This brings up the confirmation between homeuser and tradeworker
    homeuserRequestsNotifier();
</script>
<div class="row collapse background-image" xmlns="http://www.w3.org/1999/html">
    <div class="small-3 columns full-height" style="background-color: rgba(20, 20, 20, 0.9)">
<!--        <ul class="tabs vertical full-height" id="example-vert-tabs" data-tabs>-->
<!--            <li class="tabs-title is-active"><a href="#panel1v">Request trade worker(s)</a></li>-->
<!--            <li class="tabs-title"><a href="#panel2v">Request contractor(s)</a></li>-->
<!--            <li class="tabs-title"><a href="#panel3v">Job management</a></li>-->
<!--            <li class="tabs-title"><a href="#panel4v">Quote management</a></li>-->
<!--            <li class="tabs-title"><a href="#panel5v">Job History</a></li>-->
<!--            <li class="tabs-title"><a href="#panel6v">Profile Management</a></li>-->
<!--            <li class="tabs-title"><a href="#panel7v">Bookmarked tradeworkers/contractors</a></li>-->
<!--        </ul>-->
<!--        <ul class="tabs large vertical menu" data-accordion-menu style="border: 0px" id="example-vert-tabs" data-tabs>-->
<!--            <li class="tabs-title">-->
<!--                <a href="#">Job Requests</a>-->
<!--                <ul class="menu vertical nested">-->
<!--                    <li class="tabs-title is-active" aria-selected="true"><a href="#panel1v">Request Tradeworker<span class="badge" style="margin-left: 30px">1</span></a></li>-->
<!--                    <li class="tabs-title"><a href="#panel2v">Request Contractor</a></li>-->
<!--                </ul>-->
<!--            </li>-->
<!--            <li class="tabs-title"><a href="#">Job Management</a>-->
<!--                <ul class="menu vertical nested">-->
<!--                        <li><a href="#panel1v">Jobs</a>-->
<!--                            <ul class="menu vertical nested">-->
<!--                                <li class="tabs-title accordion-navigation"><a href="#panel3v">On going jobs</a></li>-->
<!--                                <li class="tabs-title accordion-navigation"><a href="#panel4v">Job requests</a></li>-->
<!--                            </ul>-->
<!--                        </li>-->
<!--                    <li class="tabs-title"><a href="#panel5v">Job history</a></li>-->
<!--                </ul>-->
<!--            </li>-->
<!--            <li class="tabs-title">-->
<!--                <a href="#">Profile management</a>-->
<!--                <ul class="menu vertical nested">-->
<!--                    <li class="tabs-title"><a href="#panel6v">Edit Details</a></li>-->
<!--                    <li class="tabs-title"><a href="#panel7v">Manage Bookmarked users</a></li>-->
<!--                </ul>-->
<!--            </li>-->
<!--        </ul>-->
        <ul class="vertical menu" data-accordion-menu>
            <li>
                <a href="#">Job Requests</a>
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

                    <li><a onclick="toggleUserPageArea('panel6v')">Finished Jobs</a></li>

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
            <div class="tabs-panel full-height test" id="panel6v" style="display: none">
                <form>
                    <h1>Registration form: Trade Worker</h1>
                    <div class="row">
                        <div class="column medium-6 large-6">
                            <label >name</label><input type="text" name="name" placeholder="John" required>
                        </div>
                        <div class="column medium-6 large-6">
                            <label >surname</label><input type="text" name="surname" placeholder="Doe" required>
                        </div>
                        <div class="column medium-12 large-12">
                            <label >username</label><input type="text" name="username1" placeholder="BobTheBuilder" required>
                        </div>
                        <div class="column medium-6 large-6">
                            <label >Password</label><input type="password" name="password" placeholder="password" required>
                        </div>
                        <div class="column medium-6 large-6">
                            <label >Confirm Password</label><input type="password" name="confirmPassword" placeholder="password" required>
                        </div>
                        <div class="column medium-6 large-6">
                            <label >email</label><input type="email" name="email" placeholder="email" required>
                        </div>
                        <div class="column medium-6 large-6">
                            <label >Confirm email</label><input type="email" name="confirmEmail" placeholder="email" required>
                        </div>
                        <div class="column medium-6 large-6">
                            <label >Cellphone Number</label>
                            <div class="input-group">
                                <span class="input-group-label">+27</span>
                                <input type="number" placeholder="12 345 6789" class="input-group-field" required/>
                            </div>
                        </div>
                        <div class="column medium-6 large-6">
                            <label >Home Contact Number</label>
                            <div class="input-group">
                                <span class="input-group-label">+27</span>
                                <input type="number" placeholder="12 345 6789" class="input-group-field" required/>
                            </div>
                        </div>
                    </div>
                </form>
                <hr>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">Update Details</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel full-height test" id="panel7v" style="display: none">
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="contractor1" id="contractor1"><label for="contractor1">Paint Co</label><label for="contractor1">Used: 1 time</label><hr>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="contractor3" id="contractor3"><label for="contractor3">Paver Co</label><label for="contractor3">Used: 1 time</label><hr>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of User." style="width: 100px;height: 100px;">
                        <input type="radio" name="worker" value="worker2" id="worker2"><label for="worker2">Dill Harper</label><label for="worker2">Used: 2 times</label>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">Manage Bookmarked User</a>
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