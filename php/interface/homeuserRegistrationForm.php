<?php
/**
 * Created by PhpStorm.
 * User: Brandon
 * Date: 2016/06/30
 * Time: 3:21 PM
 */?>
<form id="register-homeuser-form">
    <h1>Registration form: Homeuser</h1>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>First Name(s):</label><input type="text" name="name-tradeWorker" id="name-tradeWorker" placeholder="Storme" class="REQ_VAL">
            <div class="additional-info top-padding" id="name-tradeWorker-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Name must be filled in and be alphabetic characters. E.g. Name</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Surname:</label><input type="text" name="surname-tradeWorker" id="surname-tradeWorker" placeholder="Craddock" class="REQ_VAL">
            <div class="additional-info top-padding" id="surname-tradeWorker-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Surname must be filled in and be alphabetic characters. E.g. Surname</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Username:</label><input type="text" name="username-tradeWorker" id="username-tradeWorker" placeholder="IworkAtHomeStorme"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="username-tradeWorker-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Username must be filled in and be alpha-numeric characters. E.g.
                    username_93</p>
            </div>
            <div class="additional-info top-padding" id="unique-username-tradeWorker-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">The following username is already in use</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Password:</label><input type="password" name="password-tradeWorker" id="password-tradeWorker" placeholder="Password"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="password-tradeWorker-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Password must be filled in and be of a length greater than 11. E.g.
                    ******</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Confirm Password:</label><input type="password" name="confirmPassword-tradeWorker" id="confirmPassword-tradeWorker"
                                                  placeholder="Password" class="REQ_VAL">
            <div class="additional-info top-padding" id="confirmPassword-tradeWorker-info" data-toggler
                 data-animate="fade-in fade-out">
                <p class="help-text no-margins">Confirm Password must be filled in and be of a length greater than 11.
                    E.g. ******</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Email Address:</label><input type="email" name="email-tradeWorker" id="email-tradeWorker" placeholder="Email" class="REQ_VAL">
            <div class="additional-info top-padding" id="email-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Email must be filled in and be alpha-numeric characters as well as
                    contain the @ symbol. E.g. StormCdock123@userEmail.co.za</p>
            </div>
            <div class="additional-info top-padding" id="unique-email-tradeWorker-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">The following email address is already in use</p>
            </div>
            <div class="additional-info top-padding" id="unreachable-email-tradeWorker-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">The email address provided could not be reached, please ensure you have typed it in correctly</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Confirm Email Address: </label><input type="email" name="confirmEmail-tradeWorker" id="confirmEmail-tradeWorker" placeholder="Email"
                                               class="REQ_VAL">
            <div class="additional-info top-padding" id="confirmEmail-tradeWorker-info" data-toggler
                 data-animate="fade-in fade-out">
                <p class="help-text no-margins">Confirm Email must be filled in and be alpha-numeric characters as well
                    as contain the @ symbol. E.g. StormCdock123@userEmail.co.za</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Cellphone Number: </label><input type="text" placeholder="0834996655" class="REQ_VAL"
                                                  name="cellnumber-tradeWorker" id="cellnumber-tradeWorker">
            <div class="additional-info top-padding" id="cellnumber-tradeWorker-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Cellphone number must be filled in and be numeric characters. E.g.
                    0846879456</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Home Contact Number: </label><input type="text" placeholder="012 345 6789" class="REQ_VAL"
                                                     name="homeNumber-tradeWorker" id="homeNumber-tradeWorker">
            <div class="additional-info top-padding" id="homeNumber-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Home contact number must be numeric characters. E.g. 0114578993</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Are you currently available to be requested by users to do the specified work you have selected:</label>
            <div class="switch large">
                <input class="switch-input" id="availability-contractor" type="checkbox" name="ignore-availability-contractor" checked>
                <label class="switch-paddle" for="availability-contractor">
                    <span class="show-for-sr">Availability</span>
                    <span class="switch-active" aria-hidden="true">Yes</span>
                    <span class="switch-inactive" aria-hidden="true">no</span>
                </label>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="column medium-11 large-11">
        <h4>Location(s):</h4>
            </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
        <h5>Enter into the box that follows and select option that is displayed by clicking on it, click the addition button to add areas</h5>
            </div>
        </div>
    <div class="row">
        <div class="column large-11 medium 11">
            <div id="locationField">
                <input name="ignore" id="autocomplete" placeholder="Enter your address"
                       onFocus="geolocate()" onclick="initAutocomplete()" type="text" autocomplete="off"/>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="column large-11 medium 11">
            <label>Area Name</label><input type="text" name="areaname-tradeWorker-0" id="areaname-tradeWorker-0" placeholder="Soweto" class="REQ_VAL" readonly>
            <div class="additional-info top-padding" id="areaname-tradeWorker-0-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">An area found within the city E.g. Soweto</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
            <label>City Name</label><input type="text" name="cityname-tradeWorker-0" id="cityname-tradeWorker-0" placeholder="Johannesburg" class="REQ_VAL" readonly>
            <div class="additional-info top-padding" id="cityname-tradeWorker-0-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">A city found within a province. E.g. Johannesburg</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
            <label>Province Name</label><input type="text" name="provincename-tradeWorker-0" id="provincename-tradeWorker-0" placeholder="Gauteng" class="REQ_VAL" readonly>
            <div class="additional-info top-padding" id="provincename-tradeWorker-0-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">A province within South Africa E.g. Gauteng</p>
            </div>
        </div>
        <div class="column medium-1 large-1" style="margin-top: 24.44px">
            <!--            <label></label><button class="button success" data-toggle="additional-area-0" type="button" onclick="addContractorLocation()">-->
            <!--                +-->
            <!--            </button>-->
            <a data-toggle="additional-area-0 additional-area-1 additional-area-2" name="toggle-area-0" id="toggle-area-0" onclick="addContractorLocations(0)">
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </a>
        </div>

    </div>
    <div id="extraLocations" style="width:100%;">

    </div>

    <div class="row">
        <div class="large-12 medium-12 columns">
            <button type="submit" class="secondary button radius" id="register-button"
                    onclick="sendAJAXRequest('register-tradeWorker',handleRegisterResponse,'register-tradeWorker-form');">
                Register
            </button>
            <p>
                <button data-open="exampleModal3" id="register-modal-button" hidden>Click me for a modal</button>
            </p>
        </div>
    </div>
    <input type="hidden" value="1" id="locationsAdded-tradeWorker" name="ignore-locationsAdded-tradeWorker">
    <input type="hidden" value="1" id="skillsAdded-contractor" name="ignore-sillsAdded-tradeWorker">

    <div class="reveal" id="exampleModal3" data-reveal>
        <h1>You are now Registered!</h1>
        <p class="lead">Please access your email address</p>
        <p>Click on the link provided within email to complete registration and gain access to the site!</p>
        <p>This will only be available for a month</p>
        <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</form>
