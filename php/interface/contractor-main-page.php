<div class="row collapse background-image" xmlns="http://www.w3.org/1999/html">
    <div class="small-3 columns full-height" style="background-color: rgba(20, 20, 20, 0.9)">
        <ul class="vertical menu" data-accordion-menu>
            <li>
                <a href="#">Manage Jobs</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel1v')">Job Requests</a></li>
                    <li><a onclick="toggleUserPageArea('panel2v')">Initiated Jobs</a></li>
                    <li><a onclick="toggleUserPageArea('panel3v')">Completed Jobs</a></li>
                    <li><a onclick="toggleUserPageArea('panel4v')">Unfinished Jobs</a></li>
                </ul>
            </li>
            <li><a href="#">Team Management</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel5v')">Request Trade Worker</a></li>
                    <li><a onclick="toggleUserPageArea('panel5v')">Teams</a></li>
                </ul>
            </li>
            <li><a href="#">Manage Accounts</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel5v')">Unsettled Accounts</a></li>
                    <li><a onclick="toggleUserPageArea('panel5v')">Settled Accounts</a></li>
                </ul>
            </li>
            <li><a href="#">Manage Profile</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel5v')">General Details</a></li>
                    <li><a onclick="toggleUserPageArea('panel5v')">Business Details</a></li>
                    <li><a onclick="toggleUserPageArea('panel6v')">Locations</a></li>
                    <li><a onclick="toggleUserPageArea('panel7v')">Skills</a></li>
                </ul>
            </li>
            <li>
                <a onclick="toggleUserPageArea('panel7v')">Create New Job</a>
            </li>
        </ul>

        <div class="row">
            <div class="column medium-8 large-8 large-offset-4 medium-offset-4">
                <label>Availability:</label>
                <div class="switch large">
                    <input class="switch-input" id="availability-contractor-mainpage" type="checkbox" name="ignore-availability-contractor-mainpage" checked>
                    <label class="switch-paddle" for="availability-contractor-mainpage">
                        <span class="show-for-sr">Availability</span>
                        <span class="switch-active" aria-hidden="true">Yes</span>
                        <span class="switch-inactive" aria-hidden="true">no</span>
                    </label>
                </div>
            </div>
        </div>
        
        </div>


    <div class="small-9 columns full-height">
        <div class="full-height" style="max-height: 100%">
            <div class="tabs-panel full-height user-panels" id="panel1v" style="display: block;overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85)">
                <?php
//                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/contractor-manage-requests.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel2v" style="display: none;overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                //include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-request-contractor.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel3v" style="display: none;overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                //include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-manage-requests.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel4v" style="display: none;overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                //include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-manage-requests.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel5v" style="display: none;overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/contractor-request-tradeworker.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel6v" style="display: none;overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                //include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-manage-requests.php";
                ?>
            </div>
            <div class="tabs-panel full-height user-panels" id="panel7v" style="display: none;overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                //include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuser-manage-requests.php";
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

