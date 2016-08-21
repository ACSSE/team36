<?php
/**
 * Created by PhpStorm.
 * User: Brandon
 * Date: 2016/06/30
 * Time: 3:21 PM
 */ ?>
<!--TODO:Add identity number to registration, currently the switch is not properly registered in php refer to tradeworker-main-page for working example-->
<form id="register-contractor-form" name="register-contractor-form">
    <h1>Registration form: Contractor</h1>
    <h4>User Details:</h4>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>First Name(s):</label><input type="text" name="name-contractor" id="name-contractor" placeholder="John Smith" class="REQ_VAL">
            <div class="additional-info top-padding" id="name-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Name must be filled in and be alphabetic characters. E.g. John Smith</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Surname: </label><input type="text" name="surname-contractor" id="surname-contractor" placeholder="Doe" class="REQ_VAL">
            <div class="additional-info top-padding" id="surname-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Surname must be filled in and be alphabetic characters. E.g. Doe</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Username:</label><input type="text" name="username-contractor" id="username-contractor" placeholder="BobTheBuilder"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="username-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Username must be filled in and be alpha-numeric characters. E.g.
                    bOb_93</p>
            </div>
            <div class="additional-info top-padding" id="unique-username-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">The following username is already in use</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Password:</label><input type="password" name="password-contractor" id="password-contractor" placeholder="password"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="password-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Password must be filled in and be of a length greater than 11. E.g.
                    ******</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Confirm Password: </label><input type="password" name="confirmPassword-contractor" id="confirmPassword-contractor"
                                                  placeholder="password" class="REQ_VAL">
            <div class="additional-info top-padding" id="confirmPassword-contractor-info" data-toggler
                 data-animate="fade-in fade-out">
                <p class="help-text no-margins">Confirm Password must be filled in and be of a length greater than 11.
                    E.g. ******</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Email Address:</label><input type="email" name="email-contractor" id="email-contractor" placeholder="email" class="REQ_VAL">
            <div class="additional-info top-padding" id="email-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Email must be filled in and be alpha-numeric characters as well as
                    contain the @ symbol. E.g. bOb93@userEmail.com</p>
            </div>
            <div class="additional-info top-padding" id="unique-email-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">The following email address is already in use</p>
            </div>
            <div class="additional-info top-padding" id="unreachable-email-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">The email address provided could not be reached, please ensure you have typed it in correctly</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Confirm Email Address:</label><input type="email" name="confirmEmail-contractor" id="confirmEmail-contractor" placeholder="email"
                                               class="REQ_VAL">
            <div class="additional-info top-padding" id="confirmEmail-contractor-info" data-toggler
                 data-animate="fade-in fade-out">
                <p class="help-text no-margins">Confirm Email must be filled in and be alpha-numeric characters as well
                    as contain the @ symbol. E.g. bOb93@userEmail.com</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Cellphone Number:</label><input type="text" placeholder="011 345 1789" class="REQ_VAL"
                                                  name="cellnumber-contractor" id="cellnumber-contractor">
            <div class="additional-info top-padding" id="cellnumber-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Cellphone number must be filled in and be numeric characters. E.g.
                    0846879456</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Home Contact Number:</label><input type="text" placeholder="012 345 6789" class="REQ_VAL"
                                                     name="homeNumber-contractor" id="homeNumber-contractor">
            <div class="additional-info top-padding" id="homeNumber-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Home contact number must be numeric characters. E.g. 0114578993</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Are you currently available to be requested by users to do the specified work you have selected:</label>            
            <div class="switch large">
                <input class="switch-input" id="availability-contractor-registerpage" type="checkbox" name="ignore-availability-contractor-registerpage" checked>
                <label class="switch-paddle" for="availability-contractor-registerpage">
                    <span class="show-for-sr">Availability</span>
                    <span class="switch-active" aria-hidden="true">Yes</span>
                    <span class="switch-inactive" aria-hidden="true">no</span>
                </label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
        <h4>Business Details:</h4>
            </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Business Name:</label><input type="text" name="busName" id="busName" placeholder="BobTheBuilderCO"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="busName-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Please enter in the name of your business!</p>
            </div>
            <div class="additional-info top-padding" id="unique-busName-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">This business name is already in use</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Business Address:</label><input type="text" name="address-contractor" id="address-contractor" placeholder="BobTheBuilder Avenue"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="address-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Please enter in the address of where your business is located, if company is home run it will be your home address</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Business Description:</label><textarea  name="business-description-contractor" id="business-description-contractor" placeholder="This is a professional business that will deal with all the needs you require"
                                                  class="REQ_VAL"></textarea>
            <div class="additional-info top-padding" id="business-description-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Please enter in a short description of your business and what services you provide and at what quality</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Business Hours:</label>
            <label>From:</label><input type="time" name="business-hours-from-contractor" id="business-hours-from-contractor" class="REQ_VAL">
            <div class="additional-info top-padding" id="business-hours-from-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Please ensure to select a time from: e.g.08:00 AM</p>
            </div>
            <label>To:</label><input type="time" name="business-hours-to-contractor" id="business-hours-to-contractor" class="REQ_VAL">
            <div class="additional-info top-padding" id="business-hours-to-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Please ensure to select a time to: e.g.06:00 PM</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Is your business a VAT registered entity?</label>
            <div class="switch large">
                <input class="switch-input" id="smallSwitch" type="checkbox" name="ignore-exampleSwitch" data-toggle="panel panel1" checked>
                <label class="switch-paddle" for="smallSwitch">
                    <span class="show-for-sr">VAT Registered Entity</span>
                    <span class="switch-active" aria-hidden="true">Yes</span>
                    <span class="switch-inactive" aria-hidden="true">No</span>
                </label>
            </div>
        </div>
    </div>
    <div class="row" id="panel" data-toggler data-animate="hinge-in-from-right spin-out">
        <div class="column medium-11 large-11">
            <label>Company Registration number : </label><input type="text" name="reg-contractor" id="reg-contractor" placeholder="#32145678213"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="reg-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Company registration number must be filled in so automatic invoicing can occur</p>
            </div>
            <div class="additional-info top-padding" id="unique-reg-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Company registration number is already in use</p>
            </div>
        </div>
    </div>
    <div class="row" id="panel1" data-toggler data-animate="hinge-in-from-right spin-out">
        <div class="column medium-11 large-11">
            <label>Vat Number :</label><input type="text" name="vat-contractor" id="vat-contractor" placeholder="#1234567890"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="vat-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Vat number must be filled in so that automatic invoicing can occur</p>
            </div>
            <div class="additional-info top-padding" id="unique-vat-contractor-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">VAT number is already in use</p>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="column medium-11 large-11">
        <h4>Skill set:(e.g paving)</h4>
            </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
        <h5>Choose at least one, it can't be the blank option. Click the + button if you would like to add more skills
            limit is 3</h5>
            </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <select id="contractor-work-type-0" name="contractor-work-type-0" form="register-contractor-form" class="REQ_VAL">
                <script>
                    requestWorkTypes();
                </script>
            </select>
            <div class="additional-info top-padding" id="contractor-work-type-0-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Please select one of the supplied options from the drop down box</p>
            </div>
        </div>
        <div class="column medium-1 large-1">
            <a data-toggle="additional-contractor-skill-1 additional-contractor-skill-0" name="toggle-switch-0" id="toggle-switch-0" onclick="toggleSwitch('toggle-switch-0','contractor-work-type-1')">
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </a>
        </div>
    </div>
    <div class="row">
        <div class="columns medium-11 large-11 hide-initially"  data-toggler data-animate="hinge-in-from-right spin-out" id="additional-contractor-skill-0">
            <select class="REQ_VAL" id="contractor-work-type-1" name="ignore-contractor-work-type-1">

            </select>
            <div class="additional-info top-padding" id="contractor-work-type-1-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Please select one of the supplied options from the drop down box</p>
            </div>
        </div>
        <div class="columns medium-1 large-1 hide-initially"  data-toggler data-animate="hinge-in-from-right spin-out" id="additional-contractor-skill-1">
            <a data-toggle="additional-contractor-skill-2" name="toggle-switch-1" id="toggle-switch-1" onclick="toggleSwitch('toggle-switch-1','contractor-work-type-2')">
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </a>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11 hide-initially" id="additional-contractor-skill-2" data-toggler data-animate="hinge-in-from-right spin-out" >
            <select  class="REQ_VAL" id="contractor-work-type-2" name="ignore-contractor-work-type-2">

            </select>
            <div class="additional-info top-padding" id="contractor-work-type-2-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-smargins">Please select one of the supplied options from the drop down box</p>
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
            <label>Area Name</label><input type="text" name="areaname-contractor-0" id="areaname-contractor-0" placeholder="Edenvale" class="REQ_VAL" readonly>
            <div class="additional-info top-padding" id="areaname-contractor-0-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">An area found within the city E.g. Edenvale</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
            <label>City Name</label><input type="text" name="cityname-contractor-0" id="cityname-contractor-0" placeholder="Johannesburg" class="REQ_VAL" readonly>
            <div class="additional-info top-padding" id="cityname-contractor-0-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">A city found within a province. E.g. Johannesburg</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
            <label>Province Name</label><input type="text" name="provincename-contractor-0" id="provincename-contractor-0" placeholder="Gauteng" class="REQ_VAL" readonly>
            <div class="additional-info top-padding" id="provincename-contractor-0-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">A province within South Africa E.g. Gauteng</p>
            </div>
        </div>
        <div class="column medium-1 large-1" style="margin-top: 24.44px">
<!--            <label></label><button class="button success" data-toggle="additional-area-0" type="button" onclick="addContractorLocation()">-->
<!--                +-->
<!--            </button>-->
            <a data-toggle="additional-area-0 additional-area-1 additional-area-2" name="toggle-area-0" id="toggle-area-0" onclick="addTradeworkerLocations(0)">
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </a>
        </div>

    </div>
    <div id="extraLocations" style="width:100%;">
        
    </div>

    <div class="row">
        <div class="large-12 medium-12 columns">
            <button type="submit" class="secondary button radius" id="register-button"
                    onclick="sendAJAXRequest('register-contractor',handleRegisterResponse,'register-contractor-form');">
                Register
            </button>
            <p>
                <button data-open="exampleModal3" id="register-modal-button" hidden>Click me for a modal</button>
            </p>
        </div>
    </div>
    <input type="hidden" value="1" id="locationsAdded-contractor" name="ignore-locationsAdded-contractor">
    <input type="hidden" value="1" id="skillsAdded-contractor" name="ignore-sillsAdded-contractor">

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


