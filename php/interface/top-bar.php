<?php
/**
 * Created by PhpStorm.
 * Date: 2016/03/20
 * Time: 10:06 AM
 */?>
<header class="sebenza-top-bar">
    <div class="row collapse logo-height full-width">
        <div class="shrink columns logo-width full-height background-colour">
            <img class="logo-height background-colour" type="image/svg+xml" src="images/logo.svg" alt="logo"/>
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
                            <button type="button" class="warning top-bar-button button" >
                                Area Information
                                <img class="top-bar-button-icon" type="image/svg+xml" src="images/info-icon.svg" alt="logo"/>
                            </button>
                        </li>
                        <li>
                            <button type="button" class="top-bar-button button" data-toggle="login-medium-large">
                                Log In
                                <img class="top-bar-button-icon" type="image/svg+xml" src="images/user-icon.svg" alt="logo"/>
                            </button>
                        </li>
                    </ul>
                    <ul class="menu align-right show-for-small-only">
                        <li>
                            <button type="button" class="button top-bar-button">
                                Menu
                                <img class="top-bar-button-icon" type="image/svg+xml" src="images/menu-icon.svg" alt="logo"/>
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
    <form method="post">
        <div class="row">
            <div class="columns">
                <label><b>Username</b>
                    <input type="text" class="smaller-input-box" placeholder="Username">
                </label>
            </div>
        </div>
        <div class="row">
            <div class="columns">
                <label><b>Password</b>
                    <input type="password" class="smaller-input-box" placeholder="Password">
                </label>
            </div>
        </div>
        <div class="row top-padding">
            <div class="columns">
                <button type="button" class="success button full-width login-button">
                    Log In
                </button>
            </div>
        </div>
        <div class="row top-padding">
            <div class="columns">
                <button type="button" class="button full-width login-button">
                    Register
                </button>
            </div>
        </div>
    </form>
</div>
