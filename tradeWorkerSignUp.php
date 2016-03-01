<?php
/**
 * Created by PhpStorm.
 * User: Brandon
 * Date: 2016/03/01
 * Time: 9:35 PM
 */?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>sebenzaSA.co.za</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="foundation-6/css/foundation.css" />
    <link rel="stylesheet" href="foundation-6/css/app.css" />
    <link rel="stylesheet" href="css/customElementStyle.css" />
</head>
<body>
<div class="centerPage" style="background-color: grey;">
    <div class="row" style="min-height:75px">
        <div class="large-8 large-offset-2 columns align-middle" style="text-align: center"><h3>Trade Worker Sign Up Form</h3></div>
    </div>
    <div class="row">
        <ul class="menu vertical">
            <li>
                <div class="row">
                    <div class="large-4 columns large-offset-1" style="text-align: right;height:1.75em;padding-right: 0"><label>Username:</label></div>
                    <div class="large-4 columns end" style="padding-left: 0.35em"><input type="text" name="userName" placeholder="Username or email" style="height:1.75em"></div>
                </div>
            </li>
            <li>
                <div class="row">
                    <div class="large-4 columns large-offset-1" style="text-align: right;height:1.75em;padding-right: 0"><label>Password:</label></div>
                    <div class="large-4 columns end " style="padding-left: 0.35em"><input type="text" name="password" placeholder="Password" style="height:1.75em"></div>
                </div>
            </li>
            <li>
            <div class="row">
                <div class="large-4 columns large-offset-1" style="text-align: right;height:1.75em;padding-right: 0"><label>Confirm Password:</label></div>
                <div class="large-4 columns end" style="padding-left: 0.35em"><input type="text" name="confirmPassword" placeholder="Confirm Password" style="height:1.75em"></div>
            </div>
            </li>
            <li>
                <div class="row">
                    <div class="large-4 columns large-offset-1" style="text-align: right;height:1.75em;padding-right: 0"><label>Full name:</label></div>
                    <div class="large-4 columns end" style="padding-left: 0.35em"><input type="text" name="name" placeholder="John" style="height:1.75em"></div>
                </div>
            </li>
            <li>
                <div class="row">
                    <div class="large-4 columns large-offset-1" style="text-align: right;height:1.75em;padding-right: 0"><label>Surname:</label></div>
                    <div class="large-4 columns end" style="padding-left: 0.35em"><input type="text" name="surname" placeholder="Smith" style="height:1.75em"></div>
                </div>
            </li>

            <li>
            <div class="row">
                <div class="large-4 columns large-offset-1" style="text-align: right;height:1.75em;padding-right: 0"><label>Email Address</label></div>
                <div class="large-4 columns end" style="padding-left: 0.35em"><input type="text" name="emailAddress" placeholder="username@emailhost.com" style="height:1.75em"></div>
            </div>
            </li>
            <li>
                <div class="row">
                    <div class="large-4 columns large-offset-1" style="text-align: right;height:1.75em;padding-right: 0"><label>Cellphone Number</label></div>
                    <div class="large-4 columns end" style="padding-left: 0.35em"><input type="text" name="cellNumber" placeholder="0123456789" style="height:1.75em"></div>
                </div>
            </li>
            <li>
                <div class="row">
                    <div class="large-4 columns large-offset-1" style="text-align: right;height:1.75em;padding-right: 0"><label>Home Contact Number</label></div>
                    <div class="large-4 columns end" style="padding-left: 0.35em"><input type="text" name="homeNumber" placeholder="0123456789" style="height:1.75em"></div>
                </div>
            </li>
            <li>
                <div class="row">
                    <div class="large-8 columns large-offset-2" style="text-align: center;height:1.75em;padding-right: 0"><label>Select The categories you would like to work in:</label></div>
                </div>
            </li>
            <li>
                <div class="row">
                    <div class="large-8 columns float-left" style="text-align: center;height:1.75em;padding-right: 0"><input id="checkbox1" type="checkbox" checked><label for="checkbox1">Building</label></div>
                </div>
            </li>
            <li>
                <div class="row">
                    <div class="large-8 columns float-left" style="text-align: center;height:1.75em;padding-right: 0"><input id="checkbox2" type="checkbox" checked><label for="checkbox2">Painting</label></div>
                </div>
            </li>
            <li>
                <div class="row">
                    <div class="large-8 columns float-left" style="text-align: center;height:1.75em"><input id="checkbox3" type="checkbox"><label for="checkbox3">Tiling</label></div>
                </div>
            </li>
            <li>
                <div class="row">
                    <div class="large-8 columns large-offset-2" style="text-align: center;height:1.75em;padding-right: 0"><label>Of these, which category would you like to get started in?</label></div>
                </div>
            </li>
            <li>
                <div class="row" style="min-height: 3em">
                    <div class="large-8 columns large-offset-2" style="text-align: center;height:1.75em;padding-right: 0">
                        <label>Select Box</label>
                        <select title="selectWorkCategory">
                            <option value="default">Default</option>
                            <option value="building">Building</option>
                            <option value="painting">Painting</option>
                        </select>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="row">
        <div class="large-8 columns large-offset-2" style="text-align: right;height:1.75em;padding-right: 0"><br><a href="#" class="medium success button">Success Button</a></div>
    </div>
</div>
</body>
</html>
