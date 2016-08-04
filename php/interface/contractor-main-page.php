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
            <li>
                <a href="#">Management</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel1v')">Manage Teams</a></li>
                    <li><a onclick="toggleUserPageArea('panel2v')">Manage Account</a></li>
                    <li><a onclick="toggleUserPageArea('panel3v')">Manage Profile</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Job Management</a>
                <ul class="menu vertical nested">
                    <li><a onclick="toggleUserPageArea('panel5v')">Create New Job</a></li>
                    <li><a onclick="toggleUserPageArea('panel6v')">Job Requests</a></li>
                    <li><a onclick="toggleUserPageArea('panel7v')">Ongoing Jobs</a></li>
                    <li><a onclick="toggleUserPageArea('panel8v')">Finished Jobs</a></li>
                    <li><a onclick="toggleUserPageArea('panel9v')">Quotes</a></li>
                </ul>
            </li>
        </ul>

    </div>
    <div class="small-9 columns full-height">
        <div class="full-height" style="max-height: 100%">
            <div class="tabs-panel full-height test" id="panel1v" style="display: block;overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85)">
                <h3> Manage Teams </h3>
                <hr>

                <div class="row">
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Team." style="width: 150px;height: 150px;">
                        <input type="radio" name="Team" value="Team1" id="Team1"><label for="Team1">Team 1 <br></label>
                    </div>
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Team." style="width: 150px;height: 150px;">
                        <input type="radio" name="Team" value="Team2" id="Team2"><label for="Team2">Team 2<br></label>
                    </div>
                </div>
                <div class="row">
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Team." style="width: 150px;height: 150px;">
                        <input type="radio" name="Team" value="Team3" id="Team3"><label for="Team3">Team3</label>
                    </div>
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Team." style="width: 150px;height: 150px;">
                        <input type="radio" name="Team" value="Team4" id="Team4"><label for="Team4">Team 4 </label>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">Manage Team</a>
                    </div>
                </div>

            </div>
            <div class="tabs-panel full-height test" id="panel2v" style="display: none;overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85)">
                <h3>Manage Account</h3>
            </div>
            <div class="tabs-panel full-height test" id="panel3v" style="display: none;overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85)">
                <?php
                $dbHandler = SebenzaServer::fetchDatabaseHandler();
                $userID = SebenzaServer::fetchSessionHandler()->getSessionVariable("UserID");
                $dbHandler->runCommand('SELECT * FROM REGISTERED_USER WHERE UserID=?',$userID);
                $userResults = $dbHandler->getResults();
                $dbHandler->runCommand('SELECT * FROM CONTRACTOR WHERE Username=?',SebenzaServer::fetchSessionHandler()->getSessionVariable("Username"));
                $contractorResults = $dbHandler->getResults();
                // echo 'This is a test userID: '.$userID."This is the first value: ".$userResults[0]["UserID"]."<br>";
                //var_dump($userResults);
                //echo '<br>';
                //var_dump($contractorResults);
                echo '
                                <div class="column small-8 large-8">
                                    <label >name</label><input type="text" name="name" value="'.$userResults[0]["Name"].'" required>
                                </div>
                                <div class="column small-8 large-8">
                                    <label >surname</label><input type="text" name="surname" value="'.$userResults[0]["Surname"].'" required>
                                </div>
                                <div class="column small-8 large-8">
                                    <label >username</label><input type="text" name="username" value="'.$userResults[0]["Username"].'" required>
                                </div>
                                <div class="column small-8 large-8">
                                    <label >email</label><input type="email" name="email" value="'.$userResults[0]["Email"].'" required>
                                </div>
                                <div class=" small-8 large-8">
                                    <label >Cellphone Number</label>
                                    <div class="input-group" style="">
                                        <span class="input-group-label">+27</span>
                                        <input type="text" value="'.substr($userResults[0]["ContactNumber"],1).'" class="input-group-field" required/>
                                    </div>
                                </div>
                                 <div class="column small-8 large-8">
                                    <label >Business Name</label><input type="text" name="businessName" value="'.$contractorResults[0]["BusinessName"].'" required>
                                </div>
                                 <div class="column small-8 large-8">
                                    <label >Business Description</label><input type="text" name="businessDescription" value="'.$contractorResults[0]["BusinessDescription"].'" required>
                                </div>
                                 <div class="column small-8 large-8">
                                    <label >Business Hours</label><input type="text" name="businessHours" value="'.$contractorResults[0]["BusinessHours"].'" required>
                                </div>
                        ';
                ?>
            </div>
            <div class="tabs-panel full-height test" id="panel5v" style="display: none">
                <h3>Create New Job(s)!</h3>
            </div>
            <div class="tabs-panel full-height test" id="panel6v" style="max-height: 800px;overflow-y: scroll;display: none">
                <div class="row">
                    <div class="large-6 small-12 columns">
                        <label>Sort By:</label>
                        <select>
                            <option value="Completion date">Date</option>
                            <option value="price">Price</option>
                            <option value="duration">Duration</option>
                        </select>
                    </div>
                    <div class="large-6 small-12 columns">
                        <label>Search:</label>
                        <input type="text" placeholder="Live Search"/>
                    </div>
                    <div class="large-12 small-12 columns"><p>Select from the following list to further interact:<p></div>
                </div>
                <hr>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">View Job details</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel full-height test" id="panel7v" style="display: none">
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <div class="row">
                            <div class="large-6 small-12 columns">
                                <label>Sort By:</label>
                                <select>
                                    <option value="Completion date">Date</option>
                                    <option value="price">Price</option>
                                    <option value="duration">Duration</option>
                                </select>
                            </div>
                            <div class="large-6 small-12 columns">
                                <label>Search:</label>
                                <input type="text" placeholder="Live Search"/>
                            </div>
                            <div class="large-12 small-12 columns"><p>Select from the following list to further interact:<p></div>
                        </div>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="contractor1" id="contractor1"><label for="contractor1">Job 1</label><label for="contractor1">Paint Co</label><label for="contractor1">R4500</label><label for="contractor1">Completion date: 01/01/16</label><label for="contractor1">Job rating: like</label><label for="contractor1">Contractor rating: like</label><hr>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="worker2" id="worker2"><label for="worker2">Job 1</label><label for="worker2">Joe Mason</label><label for="worker2">R1000</label><label for="worker2">Completion date: 15/01/16</label><label for="worker2">Job rating: no rating provided</label><label for="worker2">Worker rating: no rating provided</label><hr>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="contractor3" id="contractor3"><label for="contractor3">Job 1</label><label for="contractor3">Paver Co</label><label for="contractor3">R4500</label><label for="contractor3">Completion date: 20/02/16</label><label for="contractor3">Job rating: like</label><label for="contractor3">Contractor rating: no rating provided</label><hr>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="worker4" id="worker4"><label for="worker4">Job 1</label><label for="worker4">Dill Harper</label><label for="worker4">R2500</label><label for="worker4">Completion date: 15/03/16</label><label for="worker4">Job rating: like</label><label for="worker4">Worker rating: like</label>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="worker5" id="worker5"><label for="worker5">Job 2</label><label for="worker5">Dill Harper</label><label for="worker5">R1500</label><label for="worker5">Completion date: 25/03/16</label><label for="worker4">Job rating: like</label><label for="worker5">Worker rating: like</label>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">View Job details</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel full-height test" id="panel8v" style="display: none">
                <h3>Finished</h3>
            </div>

            <div class="tabs-panel full-height test" id="panel9v" style="display: none;overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85)">
                <h3>Quotes</h3>

                <div class="row">
                    <div class="large-6 small-12 columns">
                        <label>Sort By:</label>
                        <select>
                            <option value="date">Date</option>
                            <option value="price">Price</option>
                            <option value="duration">Duration</option>
                        </select>
                    </div>
                    <div class="large-6 small-12 columns">
                        <label>Search:</label>
                        <input type="text" placeholder="Live Search"/>
                    </div>
                    <div class="large-12 small-12 columns"><p>Select from the following list to further interact:<p></div>
                </div>

                <div class="row" data-toggle="userPageModal-medium-large" onclick='homeUserJobRequestModalFill("Painting","Soweto")'>
                    <div class="large-6 small-12 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Job." style="width: 150px;height: 150px;">
                        <input type="radio" name="Job" value="Job1" id="Job1"><label for="Job1">Painting Job <br> Location: Soweto</label>
                    </div>
                </div>
                <div class="row" data-toggle="userPageModal-medium-large" onclick='homeUserJobRequestModalFill("Building","Kruger Park")'>
                    <div class="large-6 small-12 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Job." style="width: 150px;height: 150px;">
                        <input type="radio" name="Job" value="Job2" id="Job2"><label for="Job2">Building Job <br> Location: Kruger Park</label>
                    </div>
                </div>
                <div class="row" data-toggle="userPageModal-medium-large" onclick='homeUserJobRequestModalFill("Tiling","Soweto")'>
                    <div class="large-6 small-12 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Job." style="width: 150px;height: 150px;">
                        <input type="radio" name="Job" value="Job3" id="Job3"><label for="Job3">Tiling Job <br> Location: Soweto</label>
                    </div>
                </div>
                <div class="row" data-toggle="userPageModal-medium-large" onclick='homeUserJobRequestModalFill("Painting","Heidelburg")'>
                    <div class="large-6 small-12 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Job." style="width: 150px;height: 150px;">
                        <input type="radio" name="Job" value="Job4" id="Job4"><label for="Job4">Painting Job <br> Location: Heidelburg</label>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
