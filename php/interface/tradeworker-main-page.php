<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/01
 * Time: 7:18 PM
 */?>

<div class="row collapse background-image">
    <div class="large-3 columns">
        <ul class="tabs vertical" id="example-vert-tabs" data-tabs>
            <li class="tabs-title is-active"><a class="tab-button" href="#panel1v">Manage profile</a></li>
            <li class="tabs-title"><a class="tab-button" href="#panel2v">Manage Job Requests</a></li>
            <li class="tabs-title"><a class="tab-button" href="#panel3v">View Job History</a></li>
        </ul>
    </div>
    <div class="large-9 columns">
        <div class="tabs-content vertical" data-tabs-content="example-vert-tabs">
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
                    <div class="large-12 columns">
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
            <div class="tabs-panel" id="panel2v">
                <h1>Manage Job Requests</h1>
               The following still needs to be added
            </div>
            <div class="tabs-panel" id="panel3v">
                <h1>View Job History</h1>
                The following still needs to be added
            </div>
        </div>
    </div>
</div>



