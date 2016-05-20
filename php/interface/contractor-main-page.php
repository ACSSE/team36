<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/01
 * Time: 7:26 PM
 */?>

<div class="row collapse background-image">
    <div class="large-3 columns full-height">
        <ul class="tabs vertical full-height" style="overflow: hidden" id="example-vert-tabs" data-tabs>
            <li class="tabs-title is-active"><a href="#panel1v">Manage Jobs</a></li>
            <li class="tabs-title"><a href="#panel3v">Manage Teams</a></li>
            <li class="tabs-title"><a href="#panel4v">Manage Account</a></li>
            <li class="tabs-title"><a href="#panel5v">Manage Profile</a></li>
            <li class="tabs-title"><a href="#panel7v">Create New Job</a></li>
        </ul>
    </div>
    <div class="small-9 columns full-height">
        <div class="tabs-content vertical full-height" data-tabs-content="example-vert-tabs">
            <div class="tabs-panel full-height is-active large-12" style="padding: 0;overflow: auto" id="panel1v">
                <ul class="tabs" data-tabs id="example-tabs">
                    <li class="tabs-title is-active"><a href="#panel1" aria-selected="true">Job Request</a></li>
                    <li class="tabs-title"><a href="#panel2">Ongoing Jobs</a></li>
                    <li class="tabs-title"><a href="#panel3">Finished Jobs</a></li>
                    <li class="tabs-title"><a href="#panel4">Unfinished Jobs</a></li>
                    <li class="tabs-title"><a href="#panel5">Quotes</a></li>
                </ul>
                <div class="tabs-content" data-tabs-content="example-tabs">
                    <div class="tabs-panel is-active small-12 large-12 " id="panel1">
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
                    <div class="tabs-panel full-height small-12 large-12" id="panel2">
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
                        <div class="row" data-toggle="userPageModal-medium-large" onclick='homeUserOngoingJobModalFill("Painting","Soweto")'>
                            <div class="large-6 small-12 columns">
                                <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Job." style="width: 150px;height: 150px;">
                                <input type="radio" name="Job" value="Job1" id="Job1"><label for="Job1">Painting Job <br> Location: Soweto</label>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="tabs-panel full-height small-12 large-12" id="panel3">
                        <p>Suspendisse dictum feugiat nisl ut dapibus.  Vivamus hendrerit arcu sed erat molestie vehicula. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.  Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
                    </div>
                    <div class="tabs-panel full-height small-12 large-12" id="panel4">
                        <p>Suspendisse dictum feugiat nisl ut dapibus.  Vivamus hendrerit arcu sed erat molestie vehicula. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.  Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
                    </div>
                    <div class="tabs-panel full-height small-12 large-12" id="panel5">
                        <p>Suspendisse dictum feugiat nisl ut dapibus.  Vivamus hendrerit arcu sed erat molestie vehicula. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.  Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
                    </div>

                </div>
            <div class="tabs-panel full-height" style="padding: 0;overflow: auto" id="panel2v">
                <h3>Manage Quotes</h3>
                <hr>
                <div class="row">
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Quote." style="width: 150px;height: 150px;">
                        <input type="radio" name="Quote" value="Quote1" id="Quote1"><label for="Quote1">Painting Quote 1</label>
                    </div>
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Quote." style="width: 150px;height: 150px;">
                        <input type="radio" name="Quote" value="Quote2" id="Quote2"><label for="Quote2">Building Quote</label>
                    </div>
                </div>
                <div class="row">
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Quote." style="width: 150px;height: 150px;">
                        <input type="radio" name="Quote" value="Quote3" id="Quote3"><label for="Quote3">Tiling Quote 1</label>
                    </div>
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Quote." style="width: 150px;height: 150px;">
                        <input type="radio" name="Quote" value="Quote4" id="Quote4"><label for="Quote4">Painting Quote 2</label>
                    </div>
                </div>
                <div class="row">
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Quote." style="width: 150px;height: 150px;">
                        <input type="radio" name="Quote" value="Quote5" id="Quote5"><label for="Quote5">Tiling Quote 2 </label>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="sebenza-select-button medium secondary button radius">Manage Quotes</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel full-height" style="padding: 0;overflow: auto" id="panel3v">
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
            <div class="tabs-panel full-height" style="padding: 0;overflow: auto" id="panel4v">
                <h3>Manage Account</h3>

            </div>
            <div class="tabs-panel full-height" style="padding: 0;overflow-y: auto;overflow-x: hidden" id="panel5v">
                <div class="row align-center">
                    <div class="column small-12 large-8">
                        <h3>User Details</h3>
                    </div>
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
                    <div class="row align-center">
                        <div class="column small-8 large-8">
                            <button type="button" class="success button" id=terminate-job-button">Update</button>
                        </div>
                    </div>

            </div>
            <div class="tabs-panel full-height" id="panel6v">
                <h3>View Job History</h3>
            </div>
            <div class="tabs-panel full-height" id="panel7v">
                <h3>Create New Job</h3>
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