<?php
/**
 * Created by PhpStorm.
 * User: Brandon
 * Date: 2016/06/30
 * Time: 3:20 PM
 */?>
<form id="register-tradeworker-form">
    <h1>Registration form: Tradeworker</h1>
    <div class="row">
        <div class="column medium-6 large-6">
            <label >names</label><input type="text" name="name" id="name" placeholder="John Smith" class="REQ_VAL">
            <div class="additional-info top-padding" id="name-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Name must be filled in and be alphabetic characters. E.g. John Smith</p>
            </div>
        </div>
        <div class="column medium-6 large-6">
            <label >surname</label><input type="text" name="surname" id="surname" placeholder="Doe" class="REQ_VAL">
            <div class="additional-info top-padding" id="surname-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Surname must be filled in and be alphabetic characters. E.g. Doe</p>
            </div>
        </div>
        <div class="column medium-12 large-12">
            <label >username</label><input type="text" name="username" id="username" placeholder="BobTheBuilder" class="REQ_VAL">
            <div class="additional-info top-padding" id="username-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Username must be filled in and be alpha-numeric characters. E.g. bOb_93</p>
            </div>
        </div>
        <div class="column medium-6 large-6">
            <label >Password</label><input type="password" name="password" id="password" placeholder="password" class="REQ_VAL">
            <div class="additional-info top-padding" id="password-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Password must be filled in and be of a length greater than 5. E.g. ******</p>
            </div>
        </div>
        <div class="column medium-6 large-6">
            <label >Confirm Password</label><input type="password" name="confirmPassword" id="confirmPassword" placeholder="password" class="REQ_VAL">
            <div class="additional-info top-padding" id="confirmPassword-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Confirm Password must be filled in and be of a length greater than 5. E.g. ******</p>
            </div>
        </div>
        <div class="column medium-6 large-6">
            <label >email</label><input type="email" name="email" id="email" placeholder="email" class="REQ_VAL">
            <div class="additional-info top-padding" id="email-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Email must be filled in and be alpha-numeric characters as well as contain the @ symbol. E.g. bOb93@userEmail.com</p>
            </div>
        </div>
        <div class="column medium-6 large-6">
            <label >Confirm email</label><input type="email" name="confirmEmail" id="confirmEmail" placeholder="email" class="REQ_VAL">
            <div class="additional-info top-padding" id="confirmEmail-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Confirm Email must be filled in and be alpha-numeric characters as well as contain the @ symbol. E.g. bOb93@userEmail.com</p>
            </div>
        </div>
        <div class="column medium-6 large-6">
            <label >Cellphone Number</label><input type="text" placeholder="012 345 6789" class="REQ_VAL" name="cellnumber" id="cellnumber">
            <div class="additional-info top-padding" id="cellnumber-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Cellphone number must be filled in and be numeric characters. E.g. 0846879456</p>
            </div>
        </div>
        <div class="column medium-6 large-6">
            <label >Home Contact Number</label><input type="text" placeholder="012 345 6789" class="REQ_VAL" name="homeNumber" id="homeNumber">
            <div class="additional-info top-padding" id="homeNumber-info" data-toggler data-animate="fade-in fade-out">
                <p class="help-text no-margins">Home contact number must be numeric characters. E.g. 0114578993</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="large-12 medium-12 columns">
            <button type="submit" class="secondary button radius" id="register-button" onclick="sendAJAXRequest('register-tradeworker',handleRegisterResponse,'register-tradeworker-form');">
                Register
            </button>
            <p><button data-open="exampleModal1" id="register-modal-button" hidden>Click me for a modal</button></p>
        </div>
    </div>


    <div class="reveal" id="exampleModal1" data-reveal>
        <h1>You are now Registered!</h1>
        <p class="lead">Please access your email address</p>
        <p>Click on the link provided within email to complete registration and gain access to the site!</p>
        <p>This will only be available for a month</p>
        <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</form>
