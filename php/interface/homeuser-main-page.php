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
    <div class="small-3 columns full-height">
        <ul class="tabs vertical full-height" id="example-vert-tabs" data-tabs>
            <li class="tabs-title is-active"><a href="#panel1v">Request trade worker(s)</a></li>
            <li class="tabs-title"><a href="#panel2v">Request contractor(s)</a></li>
            <li class="tabs-title"><a href="#panel3v">Job management</a></li>
            <li class="tabs-title"><a href="#panel4v">Quote management</a></li>
            <li class="tabs-title"><a href="#panel5v">Job History</a></li>
            <li class="tabs-title"><a href="#panel6v">Profile Management</a></li>
            <li class="tabs-title"><a href="#panel7v">Bookmarked tradeworkers/contractors</a></li>
        </ul>
    </div>
    <div class="small-9 columns full-height">
        <div class="tabs-content vertical full-height" data-tabs-content="example-vert-tabs" style="max-height: 100%">
            <div class="tabs-panel full-height is-active" id="panel1v">
                <h1>Request Trade Workers</h1>
                <div class="row">
                    <div class="large-6 small-12 columns">
                        <label>Sort By:</label>
                        <select>
                            <option value="option1">Painter</option>
                            <option value="option2">Tiler</option>
                            <option value="option3">Paver</option>
                            <option value="option4">Tree-Feller</option>

                        </select>
                    </div>

                </div>
                <div class="row">

                    <div class="large-12 medium-12 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of User." style="width: 100px;height: 100px;">
                        <input type="radio" name="worker" value="worker1" id="worker1"><label for="worker1">Joe Mason</label>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of User." style="width: 100px;height: 100px;">
                        <input type="radio" name="worker" value="worker2" id="worker2"><label for="worker2">Dill Harper</label>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of User." style="width: 100px;height: 100px;">
                        <input type="radio" name="worker" value="worker3" id="worker3"><label for="worker3">Fred Kruger</label>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of User." style="width: 100px;height: 100px;">
                        <input type="radio" name="worker" value="worker4" id="worker4"><label for="worker4">Tom B</label>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">Request TradeWorker</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel full-height" id="panel2v">
                <h1>Request Trade Workers</h1>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <input id="checkbox1" type="checkbox"><label for="checkbox1">Painter</label>
                        <input id="checkbox2" type="checkbox"><label for="checkbox2">Tiler</label>
                        <input id="checkbox3" type="checkbox"><label for="checkbox3">Paver</label>
                        <input id="checkbox4" type="checkbox"><label for="checkbox4">Tree-Feller</label>
                    </div>
                    <div class="large-12 medium-12 columns">
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="contractor" value="contractor1" id="contractor1"><label for="contractor1">Paint Co</label>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="contractor" value="contractor2" id="contractor2"><label for="contractor2">Tiler Co</label>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="contractor" value="contractor3" id="contractor3"><label for="contractor3">Paver Co</label>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="contractor" value="contractor4" id="contractor4"><label for="contractor4">Tree-Feller Co</label>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">Request Contractor</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel full-height" id="panel3v">
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="contractor1" id="contractor1"><label for="contractor1">Paint Co</label>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="worker2" id="worker2"><label for="worker2">Joe Mason</label>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="contractor3" id="contractor3"><label for="contractor3">Paver Co</label>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="worker4" id="worker4"><label for="contractor4">Dill Harper</label>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">Manage Job</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel full-height" id="panel4v">
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
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="contractor" value="contractor1" id="contractor1"><label for="contractor1">Paint Co</label><label for="contractor1">R4500</label><label for="contractor1">Commencement date: 25/04/16</label><hr>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="contractor" value="contractor2" id="contractor2"><label for="contractor2">Paint Co1</label><label for="contractor2">R4200</label><label for="contractor2"></label><label for="contractor1">Commencement date: 01/05/16</label>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">View Quote</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel full-height" id="panel5v" style="max-height: 800px;overflow-y: scroll">
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
            <div class="tabs-panel full-height" id="panel6v">
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
            <div class="tabs-panel full-height" id="panel7v">
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
