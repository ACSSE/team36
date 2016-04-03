<?php
/**
 * Created by PhpStorm.
 * Date: 2016/03/20
 * Time: 10:06 AM
 */
$test = SebenzaServer::fetchSessionHandler();
$utype = $test->getSessionVariable('UserType');
?>
<header class="sebenza-top-bar">
    <div class="row collapse logo-height full-width">
        <div class="shrink columns logo-width full-height background-colour">
            <img class="logo-height background-colour" type="image/svg+xml" src="Images/logo.svg" alt="logo"/>
        </div>
        <div class="small-expand medium-expand large-expand columns full-height background-colour">
            <div class="row collapse navBarBackgroundHeight full-width">
                <!--Place holder row for background colour-->
            </div>
            <div class="row collapse navigation-bar-colour full-width navBarHeight">
                <div class="expanded columns full-height">
                    <div class="navigation-bar">
                        <!--http://foundation.zurb.com/sites/docs/button-group.html-->
                        <!--http://foundation.zurb.com/sites/docs/button.html-->
                        <ul class="menu align-right hide-for-small-only">
                            <li>
                                <button type="button" class="warning top-bar-button button" data-toggle="areainformation-medium-large">
                                    Area Information
                                    <img class="top-bar-button-icon" type="image/svg+xml" src="Images/info-icon.svg" alt="logo"/>
                                </button>
                            </li>
                            <li>
                                <?php
                                if(!SebenzaServer::fetchSessionHandler()->exists('UserType')){
                                    echo '<button type="button" class="top-bar-button button" data-toggle="login-medium-large">
                                                Log In
                                                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>
                                            </button>';
                                }
                                else{
                                    echo '<button type="button" class="top-bar-button button" id="logout-button">
                                                Log Out
                                                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>
                                            </button>';
                                }
                                ?>
                            </li>
                        </ul>
                        <ul class="menu align-right show-for-small-only">
                            <li>
                                <button type="button" class="button top-bar-button" >
                                    Menu
                                    <img class="top-bar-button-icon" type="image/svg+xml" src="Images/menu-icon.svg" alt="logo"/>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
<!--Login modal for medium and large screens-->
<!--http://foundation.zurb.com/sites/docs/toggler.html-->
<div class="background-colour hide-for-small-only" id="login-medium-large" data-toggler data-animate="hinge-in-from-top hinge-out-from-top">
    <!--http://foundation.zurb.com/sites/docs/forms.html-->
    <form id="login-form">
        <div class="row">
            <div class="columns">
                <label><b>Username</b>
                    <input type="text" class="smaller-input-box AN_VAL" name="uname" id="uname" placeholder="Username"/>
                </label>
                <div class="additional-info top-padding" id="uname-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">Username must be filled in and be alpha-numeric characters. E.g. bOb_93</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="columns">
                <label><b>Password</b>
                    <input type="password" class="smaller-input-box REQ_VAL" name="pword" id="pword" placeholder="Password"/>
                </label>
                <div class="additional-info top-padding" id="pword-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">Password must be filled in.</p>
                </div>
            </div>
        </div>
        <div class="row top-padding">
            <div class="columns">
                <button type="submit" class="success button full-width login-button" id="login-button">
                    Log In
                </button>
            </div>
        </div>
        <div class="row top-padding">
            <div class="columns">
                <a type="button" class="button full-width login-button" href="register.php">
                    Register
                </a>
            </div>
            <div class="credentials-info top-padding" id="wrong-password-text" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Invalid username or password. You can try retrieve forgotten passwords <span><a href="#">here</a>.</span></p>
            </div>
        </div>
    </form>
</div>
<div class="background-colour hide-for-small-only" id="areainformation-medium-large" data-toggler data-animate="hinge-in-from-top hinge-out-from-top">
    <!--http://foundation.zurb.com/sites/docs/forms.html-->
    <form>
        <div class="row">
            <div class="columns">
                <label><b>Area</b>
                    <input type="text" class="smaller-input-box" name="areaname" id="areaname" placeholder="Johannesburg" required/>
                </label>
            </div>
        </div>
        <div class="row top-padding">
            <div class="columns">
                <button type="button" class="success button full-width login-button" id="area-button">
                    Search
                </button>
            </div>
        </div>
    </form>
</div>
