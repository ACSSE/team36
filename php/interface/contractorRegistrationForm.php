<?php
/**
 * Created by PhpStorm.
 * User: Brandon
 * Date: 2016/06/30
 * Time: 3:21 PM
 */ ?>
<form id="register-contractor-form">
    <h1>Registration form: Contractor</h1>
    <h4>User Details:</h4>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>names</label><input type="text" name="name" id="name" placeholder="John Smith" class="REQ_VAL">
            <div class="additional-info top-padding" id="name-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Name must be filled in and be alphabetic characters. E.g. John Smith</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>surname</label><input type="text" name="surname" id="surname" placeholder="Doe" class="REQ_VAL">
            <div class="additional-info top-padding" id="surname-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Surname must be filled in and be alphabetic characters. E.g. Doe</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>username</label><input type="text" name="username" id="username" placeholder="BobTheBuilder"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="username-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Username must be filled in and be alpha-numeric characters. E.g.
                    bOb_93</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Password</label><input type="password" name="password" id="password" placeholder="password"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="password-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Password must be filled in and be of a length greater than 11. E.g.
                    ******</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Confirm Password</label><input type="password" name="confirmPassword" id="confirmPassword"
                                                  placeholder="password" class="REQ_VAL">
            <div class="additional-info top-padding" id="confirmPassword-info" data-toggler
                 data-animate="fade-in fade-out">
                <p class="help-text no-margins">Confirm Password must be filled in and be of a length greater than 11.
                    E.g. ******</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>email</label><input type="email" name="email" id="email" placeholder="email" class="REQ_VAL">
            <div class="additional-info top-padding" id="email-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Email must be filled in and be alpha-numeric characters as well as
                    contain the @ symbol. E.g. bOb93@userEmail.com</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Confirm email</label><input type="email" name="confirmEmail" id="confirmEmail" placeholder="email"
                                               class="REQ_VAL">
            <div class="additional-info top-padding" id="confirmEmail-info" data-toggler
                 data-animate="fade-in fade-out">
                <p class="help-text no-margins">Confirm Email must be filled in and be alpha-numeric characters as well
                    as contain the @ symbol. E.g. bOb93@userEmail.com</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Cellphone Number</label><input type="text" placeholder="011 345 1789" class="REQ_VAL"
                                                  name="cellnumber" id="cellnumber">
            <div class="additional-info top-padding" id="cellnumber-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Cellphone number must be filled in and be numeric characters. E.g.
                    0846879456</p>
            </div>
        </div>
        <div class="column medium-11 large-11">
            <label>Home Contact Number</label><input type="text" placeholder="012 345 6789" class="REQ_VAL"
                                                     name="homeNumber" id="homeNumber">
            <div class="additional-info top-padding" id="homeNumber-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Home contact number must be numeric characters. E.g. 0114578993</p>
            </div>
        </div>
    </div>
    <div class="row">
        <h4>Business Details:</h4>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Is your business a VAT registered entity?</label>
            <div class="switch small">
                <input class="switch-input" id="smallSwitch" type="checkbox" name="ignore-exampleSwitch" data-toggle="panel panel1" checked>
                <label class="switch-paddle" for="smallSwitch">
                    <span class="show-for-sr">VAT Registered Entity</span>
                    <span class="switch-active" aria-hidden="true">Yes</span>
                    <span class="switch-inactive" aria-hidden="true">No</span>
                </label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Business Name</label><input type="text" name="busName" id="busName" placeholder="BobTheBuilderCO"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="busName-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Please enter in the name of your business!</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>Business Address</label><input type="text" name="address" id="address" placeholder="BobTheBuilder Avenue"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="address-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Please enter in the address of where your business is located, if company is home run it will be your home address</p>
            </div>
        </div>
    </div>
    <div class="row" id="panel" data-toggler data-animate="hinge-in-from-right spin-out">
        <div class="column medium-11 large-11">
            <label>Company Registration number</label><input type="text" name="reg" id="reg" placeholder="#32145678213"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="reg-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Company registration number must be filled in so automatic invoicing can occur</p>
            </div>
        </div>
    </div>
    <div class="row" id="panel1" data-toggler data-animate="hinge-in-from-right spin-out">
        <div class="column medium-11 large-11">
            <label>Vat Number</label><input type="text" name="vat" id="vat" placeholder="#1234567890"
                                          class="REQ_VAL">
            <div class="additional-info top-padding" id="vat-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Vat number must be filled in so that automatic invoicing can occur</p>
            </div>
        </div>
    </div>

    <div class="row">
        <h4>Skill set:(e.g paving)</h4>
    </div>
    <div class="row">
        <h5>Choose at least one, it can't be the blank option. Click the + button if you would like to add more skills
            limit is 3</h5>
    </div>
    <div class="row">
        <div class="column medium-11 large-11">
            <select id="contractor-work-type-0" name="contractor-work-type" required>
                <script>
                    requestWorkTypes();
                </script>
            </select>
        </div>
        <div class="column medium-1 large-1">
            <a data-toggle="additional-contractor-skill-1 additional-contractor-skill-0" name="toggle-switch-0" id="toggle-switch-0" onclick="toggleSwitch('toggle-switch-0')">
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </a>
        </div>
    </div>
    <div class="row">
        <div class="columns medium-11 large-11 hide-initially"  data-toggler data-animate="hinge-in-from-right spin-out" id="additional-contractor-skill-0">
            <select id="contractor-work-type-1" name="contractor-work-type-1" required>

            </select>
        </div>
        <div class="columns medium-1 large-1 hide-initially"  data-toggler data-animate="hinge-in-from-right spin-out" id="additional-contractor-skill-1">
            <a data-toggle="additional-contractor-skill-2" name="toggle-switch-1" id="toggle-switch-1" onclick="toggleSwitch('toggle-switch-1')">
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </a>
        </div>
    </div>
    <div class="row">
        <div class="column medium-11 large-11 hide-initially" id="additional-contractor-skill-2" data-toggler data-animate="hinge-in-from-right spin-out" >
            <select id="contractor-work-type-2" name="contractor-work-type-2" required>

            </select>
        </div>
    </div>
    <div class="row">
        <h4>Location(s):</h4>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
            <label>Area Name</label><input type="text" name="areaname0" id="areaname0" placeholder="Edenvale" class="REQ_VAL">
            <div class="additional-info top-padding" id="areaname0-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">An area found within the city E.g. Edenvale</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
            <label>City Name</label><input type="text" name="cityname0" id="cityname0" placeholder="Johannesburg" class="REQ_VAL">
            <div class="additional-info top-padding" id="cityname0-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">A city found within a province. E.g. Johannesburg</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
            <label>Province Name</label><input type="text" name="provincename0" id="provincename0" placeholder="Gauteng" class="REQ_VAL">
            <div class="additional-info top-padding" id="provincename0-info" data-toggler data-animate="fade-in fade-out">
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
    <hr>
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
