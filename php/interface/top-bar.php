<?php
/**
 * Created by PhpStorm.
 * Date: 2016/03/20
 * Time: 10:06 AM
 */
?>
<header class="sebenza-top-bar">
    <div class="row collapse logo-height full-width">
        <div class="shrink columns logo-width full-height background-colour" onclick="redirectToHome()">
            <img class="logo-height background-colour" type="image/svg+xml" src="Images/logo.svg" alt="logo"/>
        </div>
        <div class="small-expand columns full-height background-colour">
            <div class="row expanded column navBarBackgroundHeight">
                <div class="full-height full-height center-contents">
                    <div class="callout no-margins center-contents" id="notification-panel" data-toggler data-animate="slide-in-down fade-out">
                        <p><span><img class="notify-icon" type="image/svg+xml" src="Images/notify-icon.svg" alt="icon"/></span>
                            <span id="notification-content">Welcome!</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="row expanded column navigation-bar-colour navBarHeight">
                <div class="navigation-bar">
                    <!--http://foundation.zurb.com/sites/docs/button-group.html-->
                    <!--http://foundation.zurb.com/sites/docs/button.html-->
                    <ul class="menu align-right hide-for-small-only">
                        <li>
                            <button type="button" class="warning button top-bar-button" data-toggle="areainformation-medium-large">
                                Area Information
                                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/info-icon.svg" alt="logo"/>
                            </button>
                        </li>
                        <li>
                            <?php
                            if(!SebenzaServer::fetchSessionHandler()->exists('UserType')){
                                echo '<button type="button" class="top-bar-button button" data-toggle="login-medium-large" >
                                            Log In
                                            <img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>
                                        </button>';
                            }
                            else{
                                echo '<!--<button type="button" class="success top-bar-button button" onclick="redirectToHome()">
                                        Main
                                        <img class="top-bar-button-icon" type="image/svg+xml" src="Images/menu-icon.svg" alt="logo"/>
                                      </button>
                                      </li>-->
                                      <li><button type="button" class="top-bar-button button" id="logout-button" onclick="sendAJAXRequest(\'logout\',handleLogoutResponse);">
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
</header>
<!--Login modal for medium and large screens-->
<!--http://foundation.zurb.com/sites/docs/toggler.html-->
<div class="background-colour hide-for-small-only" id="login-medium-large" data-toggler data-animate="hinge-in-from-top hinge-out-from-top">
    <!--http://foundation.zurb.com/sites/docs/forms.html-->
    <form id="login-form">
        <div class="row">
            <div class="columns">
                <label><b>Username</b>
                    <input type="text" class="smaller-input-box AN_VAL REQ_VAL" name="username" id="username"
                           placeholder="Username"/>
                </label>
                <div class="additional-info top-padding" id="username-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">Username must be filled in and be alpha-numeric characters. E.g. bOb_93</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="columns">
                <label><b>Password</b>
                    <input type="password" class="smaller-input-box REQ_VAL" name="password" id="password" placeholder="Password"/>
                </label>
                <div class="additional-info top-padding" id="password-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">Password must be filled in.</p>
                </div>
            </div>
        </div>
        <div class="row top-padding">
            <div class="columns">
                <button type="submit" class="success button full-width login-button" id="login-button" onclick="sendAJAXRequest('login',handleLoginResponse,'login-form');">
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
            <div class="credentials-info top-padding" id="invalid-credentials-message" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Invalid username or password. You can try retrieve forgotten passwords <span><a class="blue-link" href="#">here</a>.</span></p>
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
                <button type="button" class="success button full-width login-button" id="area-button" onclick="switchToPage('areainformation-page.php')">
                    Search
                </button>
            </div>
        </div>
    </form>
</div>
