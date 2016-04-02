<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/01
 * Time: 7:26 PM
 */?>

<div class="row collapse tab-styler">
    <div class="large-3 columns">
        <ul class="tabs vertical" id="example-vert-tabs" data-tabs>
            <li class="tabs-title is-active"><a class="tab-button" href="#panel1v">Manage Jobs</a></li>
            <li class="tabs-title"><a class="tab-button" href="#panel2v">Manage Quotes</a></li>
            <li class="tabs-title"><a class="tab-button" href="#panel3v">Manage Teams</a></li>
            <li class="tabs-title"><a class="tab-button" href="#panel4v">Manage Account</a></li>
            <li class="tabs-title"><a class="tab-button" href="#panel5v">Manage Profile</a></li>
            <li class="tabs-title"><a class="tab-button" href="#panel6v">View Job History</a></li>
            <li class="tabs-title"><a class="tab-button" href="#panel7v">Create New Job</a></li>
        </ul>
    </div>
    <div class="large-9 columns">
        <div class="tabs-content vertical" data-tabs-content="example-vert-tabs">
            <div class="tabs-panel is-active" id="panel1v">
                <h3>Job Management</h3>
                <hr>
                <div class="row">
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Job." style="width: 150px;height: 150px;">
                        <input type="radio" name="Job" value="Job1" id="Job1"><label for="Job1">Painting Job <br> Location: Soweto</label>
                    </div>
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Job." style="width: 150px;height: 150px;">
                        <input type="radio" name="Job" value="Job2" id="Job2"><label for="Job2">Building Job <br> Location: Kruger Park</label>
                    </div>
                </div>
                <div class="row">
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Job." style="width: 150px;height: 150px;">
                        <input type="radio" name="Job" value="Job3" id="Job3"><label for="Job3">Tiling Job <br> Location: Soweto</label>
                    </div>
                    <div class="large-6 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Job." style="width: 150px;height: 150px;">
                        <input type="radio" name="Job" value="Job4" id="Job4"><label for="Job4">Painting Job <br> Location: Heidelburg</label>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">Job Management</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel" id="panel2v">
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
                        <a href="#" class="float-left medium secondary button radius">Manage Quotes</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel" id="panel3v">
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
            <div class="tabs-panel" id="panel4v">
                <h3>Manage Account</h3>
            </div>
            <div class="tabs-panel" id="panel5v">
                <h3>Manage Profile</h3>
            </div>
            <div class="tabs-panel" id="panel6v">
                <h3>View Job History</h3>
            </div>
            <div class="tabs-panel" id="panel7v">
                <h3>Create New Job</h3>
            </div>
        </div>
    </div>
</div>
