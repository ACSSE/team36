<?php
/**
 * Created by PhpStorm.
 * User: Brandon
 * Date: 2016/06/30
 * Time: 3:21 PM
 */?>
<form id="register-homeuser-form">
    <h1>Registration form: Homeuser</h1>
    <h4>User Details:</h4>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>First Name(s):</label><input type="text" name="name-homeuser" id="name-homeuser" placeholder="Storme" class="REQ_VAL">
            <div class="additional-info top-padding" id="name-homeuser-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Name must be filled in and be alphabetic characters. E.g. Name</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Surname:</label><input type="text" name="surname-homeuser" id="surname-homeuser" placeholder="Craddock" class="REQ_VAL">
            <div class="additional-info top-padding" id="surname-homeuser-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Surname must be filled in and be alphabetic characters. E.g. Surname</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Username:</label><input type="text" name="username-homeuser" id="username-homeuser" placeholder="IworkAtHomeStorme"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="username-homeuser-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Username must be filled in and be alpha-numeric characters. E.g.
                    username_93</p>
            </div>
            <div class="additional-info top-padding" id="unique-username-homeuser-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">The following username is already in use</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>ID number:</label><input type="text" name="identity-homeuser" id="identity-homeuser" placeholder="IworkAtHomeStorme"
                                           class="REQ_VAL">
            <div class="additional-info top-padding" id="identity-homeuser-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Identity number must be filled in and be numeric characters 13 long. E.g.
                    9508879521365</p>
            </div>
            <div class="additional-info top-padding" id="unique-identity-homeuser-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">The following username is already in use</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Password:</label><input type="password" name="password-homeuser" id="password-homeuser" placeholder="Password"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="password-homeuser-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Password must be filled in and be of a length greater than 11. E.g.
                    ******</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Confirm Password:</label><input type="password" name="confirmPassword-homeuser" id="confirmPassword-homeuser"
                                                  placeholder="Password" class="REQ_VAL">
            <div class="additional-info top-padding" id="confirmPassword-homeuser-info" data-toggler
                 data-animate="fade-in fade-out">
                <p class="help-text no-margins">Confirm Password must be filled in and be of a length greater than 11.
                    E.g. ******</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Email Address:</label><input type="email" name="email-homeuser" id="email-homeuser" placeholder="Email" class="REQ_VAL">
            <div class="additional-info top-padding" id="email-homeuser-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Email must be filled in and be alpha-numeric characters as well as
                    contain the @ symbol. E.g. StormCdock123@userEmail.co.za</p>
            </div>
            <div class="additional-info top-padding" id="unique-email-homeuser-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">The following email address is already in use</p>
            </div>
            <div class="additional-info top-padding" id="unreachable-email-homeuser-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">The email address provided could not be reached, please ensure you have typed it in correctly</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Confirm Email Address: </label><input type="email" name="confirmEmail-homeuser" id="confirmEmail-homeuser" placeholder="Email"
                                               class="REQ_VAL">
            <div class="additional-info top-padding" id="confirmEmail-homeuser-info" data-toggler
                 data-animate="fade-in fade-out">
                <p class="help-text no-margins">Confirm Email must be filled in and be alpha-numeric characters as well
                    as contain the @ symbol. E.g. StormCdock123@userEmail.co.za</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Cellphone Number: </label><input type="text" placeholder="0834996655" class="REQ_VAL"
                                                  name="cellnumber-homeuser" id="cellnumber-homeuser">
            <div class="additional-info top-padding" id="cellnumber-homeuser-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Cellphone number must be filled in and be numeric characters. E.g.
                    0846879456</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Home Contact Number: </label><input type="text" placeholder="012 345 6789" class="REQ_VAL"
                                                     name="homeNumber-homeuser" id="homeNumber-homeuser">
            <div class="additional-info top-padding" id="homeNumber-homeuser-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Home contact number must be numeric characters. E.g. 0114578993</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Would you like to include yourself under subscription for R100 a year, free for the 1st 6 months:</label>
            <div class="switch large">
                <input class="switch-input" id="subscription-homeuser-switch" type="checkbox" name="ignore-subscription-homeuser-switch" checked>
                <label class="switch-paddle" for="subscription-homeuser-switch">
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
                <input name="ignore-homeuser-register-autocomplete" id="homeuser-register-autocomplete" placeholder="Enter your address"
                       onclick="genericInitAutocomplete('homeuser-register-autocomplete')" type="text" autocomplete="off"/>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="column large-11 medium 11">
            <label>House Number</label><input type="text" name="homeuser-register-street_number" id="homeuser-register-street_number" placeholder="35" class="REQ_VAL" readonly>
            <div class="additional-info top-padding" id="homeuser-register-street_number-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">An street found within a subarea E.g. 45</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
            <label>Street Information</label><input type="text" name="homeuser-register-route" id="homeuser-register-route" placeholder="5th Street" class="REQ_VAL" readonly>
            <div class="additional-info top-padding" id="homeuser-register-route-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">An street found within a subarea E.g. 2nd Street</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
            <label>Sub-Area name</label><input type="text" name="homeuser-register-sublocality_level_1" id="homeuser-register-sublocality_level_1" placeholder="Bedfordview" class="REQ_VAL" readonly>
            <div class="additional-info top-padding" id="homeuser-register-sublocality_level_1-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">An sub-area found within the area E.g. bedfordview</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
            <label>Area Name</label><input type="text" name="homeuser-register-locality" id="homeuser-register-locality" placeholder="Germiston" class="REQ_VAL" readonly>
            <div class="additional-info top-padding" id="homeuser-register-locality-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">An area found within the city E.g. Germiston</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
            <label>Province Name</label><input type="text" name="homeuser-register-administrative_area_level_1" id="homeuser-register-administrative_area_level_1" placeholder="Gauteng" class="REQ_VAL" readonly>
            <div class="additional-info top-padding" id="homeuser-register-administrative_area_level_1-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">A province within South Africa E.g. Gauteng</p>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="large-12 medium-12 columns">
            <button type="submit" class="secondary button radius" id="register-button"
                    onclick="sendAJAXRequest('register-homeuser',handleHomeUserRegisterResponse,'register-homeuser-form');">
                Register
            </button>
            <p>
                <button data-open="exampleModal3" id="register-modal-button" hidden>Click me for a modal</button>
            </p>
        </div>
    </div>
    <div class="reveal" id="homeuser-register-modal" data-reveal>
        <div id="homeuser-register-modal-information">

        </div>
        <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</form>
