<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/03/31
 * Time: 12:52 AM
 */
$PAGE_TITLE = "TradeWorker Main Page";
include $_SERVER['DOCUMENT_ROOT']."/php/interface/open-html.php";
include $_SERVER['DOCUMENT_ROOT']."/php/interface/top-bar.php";
?>
    <div class="content-view">
        <div class="row collapse tab-styler">
            <div class="large-3 columns">
                <ul class="tabs vertical" id="example-vert-tabs" data-tabs>
                    <li class="tabs-title is-active"><a class="tab-button" href="#panel1v">Manage Job Opportunities</a></li>
                    <li class="tabs-title"><a class="tab-button" href="#panel2v">Manage profile</a></li>
                </ul>
            </div>
            <div class="large-9 columns">
                <div class="tabs-content vertical" data-tabs-content="example-vert-tabs">
                    <div class="tabs-panel is-active" id="panel1v">
                        <p>No jobs are currently available. Please check again later</p>
                    </div>
                    <div class="tabs-panel" id="panel2v">



                        <div class="tabs-panel is-active" id="panel1v">
                            <h1>Manage profile</h1>
                            <div class="row">
                                <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of User." style="width: 100px;height: 100px;">
                            </div>
                            <form>
                                <div class="row">
                                    <div class="large-5 columns">
                                        <label>First name</label>
                                        <input type="text" placeholder="Jabulani" />
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="large-5 columns">
                                        <label>Last name</label>
                                        <input type="text" placeholder="Zuma" />
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="large-5 columns">
                                        <label>Phone number</label>
                                        <div class="input-group">
                                            <span class="input-group-label">+27</span>
                                            <input type="text" placeholder="12 345 6789" class="input-group-field"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="large-5 columns">
                                        <label>email address</label>
                                        <div class="input-group">
                                            <input type="text" placeholder="jzuma@gmail" class="input-group-field"/>
                                            <span class="input-group-label">.com</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="large-5 columns">
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
                                    <div class="large-5 columns">
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
                                            </div>                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="large-12 columns">
                                        <a href="#" class="float-right medium secondary button radius">Update Profile</a>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
<?php
include $_SERVER['DOCUMENT_ROOT']."/php/interface/bottom-bar.php";
include $_SERVER['DOCUMENT_ROOT']."/php/interface/close-html.php";
?>