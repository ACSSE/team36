<?php
/**
 * Created by PhpStorm.
 * Date: 2016/03/28
 * Time: 3:22 PM
 */
$PAGE_TITLE = "Register";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/open-html.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/top-bar.php";
    if(isset($USER_TYPE)) {
        SebenzaServer::redirect("/userPage.php");
    }
?>

    <div class="content-view">
        <div class="row collapse background-image">
            <div class="large-3 columns">
                <ul class="tabs vertical" id="example-vert-tabs" data-tabs>
                    <li class="tabs-title is-active"><a class="tab-button" href="#panel1v">Register as Tradeworker</a></li>
                    <li class="tabs-title"><a class="tab-button" href="#panel2v">Register as Homeuser</a></li>
                    <li class="tabs-title"><a class="tab-button" href="#panel3v">Register as Contracotor</a></li>
                </ul>
            </div>
            <div class="large-9 columns">
                <div class="tabs-content vertical" data-tabs-content="example-vert-tabs">
                    <div class="tabs-panel is-active" id="panel1v">
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
                                    <label >username</label><input type="text" name="username" placeholder="BobTheBuilder" required>
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
                            <div class="row">
                                <div class="large-12 medium-12 columns">
                                    <a href="#" class="float-left medium secondary button radius">Register</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="tabs-panel" id="panel2v">
                        <h1>Registration form: Homeuser</h1>
                        <div class="row">
                            <div class="column medium-6 large-6">
                                <label >name</label><input type="text" name="name" placeholder="John" required>
                            </div>
                            <div class="column medium-6 large-6">
                                <label >surname</label><input type="text" name="surname" placeholder="Doe" required>
                            </div>
                            <div class="column medium-12 large-12">
                                <label >username</label><input type="text" name="username" placeholder="BobTheBuilder" required>
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
                                    <input type="text" placeholder="12 345 6789" class="input-group-field" required/>
                                </div>
                            </div>
                            <div class="column medium-6 large-6">
                                <label >Home Contact Number</label>
                                <div class="input-group">
                                    <span class="input-group-label">+27</span>
                                    <input type="text" placeholder="12 345 6789" class="input-group-field" required/>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="large-12 medium-12 columns">
                                <a href="#" class="float-left medium secondary button radius">Register</a>
                            </div>
                        </div>
                    </div>
                    <div class="tabs-panel" id="panel3v">
                        <h1>Registration form: Contractor</h1>
                        <div class="row">
                            <div class="column medium-6 large-6">
                                <label >name</label><input type="text" name="name" placeholder="John" required>
                            </div>
                            <div class="column medium-6 large-6">
                                <label >surname</label><input type="text" name="surname" placeholder="Doe" required>
                            </div>
                            <div class="column medium-12 large-12">
                                <label >username</label><input type="text" name="username" placeholder="BobTheBuilder" required>
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
                                    <input type="text" placeholder="12 345 6789" class="input-group-field" required/>
                                </div>
                            </div>
                            <div class="column medium-6 large-6">
                                <label >Home Contact Number</label>
                                <div class="input-group">
                                    <span class="input-group-label">+27</span>
                                    <input type="text" placeholder="12 345 6789" class="input-group-field" required/>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="large-12 medium-12 columns">
                                <a href="#" class="float-left medium secondary button radius">Register</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/bottom-bar.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/close-html.php";
?>