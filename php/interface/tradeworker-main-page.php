<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/01
 * Time: 7:18 PM
 */?>

<div class="row collapse background-image">
    <div class="large-3 columns full-height">
        <ul class="tabs vertical full-height" id="example-vert-tabs" data-tabs>
            <li class="tabs-title is-active"><a class="tab-button" href="#panel1v">Manage profile</a></li>
            <li class="tabs-title"><a class="tab-button" href="#panel2v">Manage Job Requests</a></li>
            <li class="tabs-title"><a class="tab-button" href="#panel3v">View Job History</a></li>
            <li class="tabs-title"><a class="tab-button" href="#panel4v">Quote management</a></li>
            <li class="tabs-title"><a class="tab-button" href="#panel5v">Job History</a></li>
        </ul>
    </div>
    <div class="large-9 columns  full-height">
        <div class="tabs-content vertical full-height" data-tabs-content="example-vert-tabs">
            <div class="tabs-panel is-active" id="panel1v">
                <h1>Manage profile</h1>
                <div class="row">
                    <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of User." style="width: 100px;height: 100px;">
                </div>
                <div class="row">
                    <div class="large-4 columns">
                        <label>First name</label>
                        <input type="text" placeholder="Jabulani" />
                    </div>
                    <div class="large-4 columns">
                        <label>Last name</label>
                        <input type="text" placeholder="Zuma" />
                    </div>
                    <div class="large-4 columns">
                        <label>Phone number</label>
                        <div class="input-group">
                            <span class="input-group-label">+27</span>
                            <input type="text" placeholder="12 345 6789" class="input-group-field"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 columns">
                        <label>email address</label>
                        <div class="input-group">
                            <input type="text" placeholder="jzuma@gmail" class="input-group-field"/>
                            <span class="input-group-label">.com</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 columns full-height">
                        <label>speciality</label>
                        <select>
                            <option value="Painter">Painter</option>
                            <option value="Tiler">Tiler</option>
                            <option value="Paver">Paver</option>
                            <option value="Brick layer">Brick layer</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <label>Health status </label>
                        <input id="checkbox1" type="checkbox"><label for="checkbox1">Sick</label>
                        <input id="checkbox2" type="checkbox"><label for="checkbox2">Healthy</label>
                    </div>
                </div>
                <div class="row">
                    <div class="large-4 medium-4 columns">
                        <label>Residential address</label>
                        <input type="text" placeholder="5333 Nqube street" />
                    </div>
                    <div class="large-4 medium-4 columns">
                        <label>Town</label>
                        <input type="text" placeholder="Soweto" />
                    </div>
                    <div class="large-4 medium-4 columns">
                        <label>City</label>
                        <input type="text" placeholder="Johannesburg" />
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">Update Profile</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel full-height" id="panel2v">
                <h1>Manage Job Requests</h1>
               The following still needs to be added
            </div>
            <div class="tabs-panel full-height" id="panel3v">
                <h1>View Job History</h1>
                The following still needs to be added
            </div>
            <div class="tabs-panel full-height" id="panel4v">
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
            <div class="tabs-panel full-height" id="panel5v" style="max-height: 600px;overflow-y: scroll">
                <div class="row">
                    <div class="large-12 medium-12 columns full-height">
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="contractor1" id="contractor1"><label for="contractor1">Job 1</label><label for="contractor1">Paint Co</label><label for="contractor1">R4500</label><label for="contractor1">Completion date: 01/01/16</label><label for="contractor1">Job rating: like</label><label for="contractor1">Contractor rating: like</label><hr>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="worker2" id="worker2"><label for="worker2">Job 1</label><label for="worker2">Joe Mason</label><label for="worker2">R1000</label><label for="worker2">Completion date: 15/01/16</label><label for="worker2">Job rating: no rating provided</label><label for="worker2">Worker rating: no rating provided</label><hr>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="contractor3" id="contractor3"><label for="contractor3">Job 1</label><label for="contractor3">Paver Co</label><label for="contractor3">R4500</label><label for="contractor3">Completion date: 20/02/16</label><label for="contractor3">Job rating: like</label><label for="contractor3">Contractor rating: no rating provided</label><hr>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="worker4" id="worker4"><label for="worker4">Job 1</label><label for="worker4">Dill Harper</label><label for="worker4">R2500</label><label for="worker4">Completion date: 15/03/16</label><label for="worker4">Job rating: like</label><label for="worker4">Worker rating: like</label>
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

        </div>
    </div>
</div>



