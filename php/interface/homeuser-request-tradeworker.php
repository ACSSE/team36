<div class="full-height full-width">
    <form id="homeuser-rTradeworker-form" name="homeuser-rTradeworker-form">
        <h1>Request Tradeworker</h1>

        <div class="row">
            <div class="column medium-11 large-11">
            <h4>Date Available to meet with tradeworker:</h4>
                </div>
        </div>
        <div class="row">
            <div class="column medium-11 large-11">
            <h5>*Please give at least 5 days for request to be accepted</h5>
                </div>
        </div>
        <div class="row">
            <div class="column medium-11 large-11">
                <label>Commencement Date:</label><input type="date" name="commencement-homeuser-rTradeworker" id="commencement-homeuser-rTradeworker" class="REQ_VAL">
                <div class="additional-info top-padding" id="commencement-homeuser-rTradeworker-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">Please fill in a date you would like to start the job by</p>
                </div>
            </div>
        </div>
        <!-- TODO: consider For pre-scribed users add an nb field that will send out a request to all available tradeworkers for a job-->
        <div class="row">
            <div class="column medium-11 large-11">
            <h4>Job Type(s):</h4>
                </div>
        </div>
        <div class="row">
            <div class="column medium-11 large-11">
                <!--Can use the onChange event to set up what-ever is necessary according to the type selected-->
                <label>Select Work Type:</label> <select id="homeuser-rTradeworker-work-type-0" name="homeuser-rTradeworker-work-type-0" form="homeuser-rTradeworker-form" class="REQ_VAL">
                    <script>
                        requestGenericWorkTypes('homeuser-rTradeworker-work-type-0');
                    </script>
                </select>
                <div class="additional-info top-padding" id="homeuser-rTradeworker-work-type-0-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">Please select one of the supplied options from the drop down box</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column medium-11 large-11">
                <label>Job Description: </label><textarea  name="job-description-homeuser-rTradeworker-0" id="job-description-homeuser-rTradeworker-0" placeholder="I would like to have a 4 X 4 square meter area tiled"
                                                         class="REQ_VAL"></textarea>
                <div class="additional-info top-padding" id="job-description-homeuser-rTradeworker-0-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">Please enter in a short description of what you would like done for the job type selected</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column medium-11 large-11">
                <label>Number of tradeworkers you require: </label><input type="number" name="nTradeworkers-homeuser-rTradeworker-0" id="nTradeworkers-homeuser-rTradeworker-0" placeholder="3" class="REQ_VAL">
                <div class="additional-info top-padding" id="nTradeworkers-homeuser-rTradeworker-0-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">Please fill in amount of tradeworkers that you would like of the speciality specified. E.g. 3</p>
                </div>
            </div>
            <div class="column medium-1 large-1" style="margin-top:1.75rem">
                <a data-toggle="additional-homeuser-rTradeworker-skill-1" name="homeuser-rTradeworker-toggle-switch-0" id="homeuser-rTradeworker-toggle-switch-0" onclick="homeuserReqTradeworkerAdditionalLocationsToggler(1)">
                    <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
                </a>
            </div>
        </div>

        <input type="hidden" value="1" id="actual-nTradeworkers-homeuser-rTradeworker" name="ignore-actual-nTradeworkers-homeuser-rTradeworker" />


        <div id="additional-area-homeuser-rTradeworker">

        </div>

        <!--The following deals with the location that is used by the homeuser for where the job will be done-->
        <div class="row">
            <div class="column medium-11 large-11">
            <h4>Job Location:</h4>
                </div>
        </div>
        <div class="row">
            <div class="column medium-11 large-11">
            <h5>*Enter into the box that follows and select option that is displayed by clicking on it</h5>
                </div>
        </div>
        <div class="row">
            <div class="column large-11 medium 11">
                <div id="homeuser-rTradeworker-locationField">
                    <label>Search Address:</label> <input name="ignore-homeuser-rTradeworker-autocomplete" id="homeuser-rTradeworker-autocomplete" placeholder="Enter in location of job"
                            onclick="genericInitAutocomplete('homeuser-rTradeworker-autocomplete')" type="text" autocomplete="off"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column large-11 medium 11">
<!-- TODO: customize tables to be themed according to the site using sass - watch: http://foundation.zurb.com/learn/install-foundation-6-sass-on-windows.html-->
                <table id="homeuser-rTradeworker-address">
                    <tr>
                        <td class="label">Street address</td>
                        <td>
                            <input type="text" name="homeuser-rTradeworker-street_number" id="homeuser-rTradeworker-street_number" placeholder="50" class="REQ_VAL" readonly>
                        </td>
                        <td colspan="2">
                            <input type="text" name="homeuser-rTradeworker-route" id="homeuser-rTradeworker-route" placeholder="15th Avenue" class="REQ_VAL" readonly>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">Area</td>
                        <td colspan="3">
                            <input type="text" name="homeuser-rTradeworker-sublocality_level_1" id="homeuser-rTradeworker-sublocality_level_1" placeholder="Edenvale" class="REQ_VAL" readonly>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">City</td>
                        <td colspan="3">
                            <input type="text" name="homeuser-rTradeworker-locality" id="homeuser-rTradeworker-locality" placeholder="Edenvale" class="REQ_VAL" readonly>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">State</td>
                        <td>
                            <input type="text" name="homeuser-rTradeworker-administrative_area_level_1" id="homeuser-rTradeworker-administrative_area_level_1" placeholder="Gauteng Province" class="REQ_VAL" readonly>
                        </td>
                        <td class="label">Zip Code</td>
                        <td>
                            <input type="text" name="homeuser-rTradeworker-postal_code" id="homeuser-rTradeworker-postal_code" placeholder="1201" class="REQ_VAL" readonly>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">Country</td>
                        <td colspan="3">
                            <input type="text" name="homeuser-rTradeworker-country" id="homeuser-rTradeworker-country" placeholder="South Africa" class="REQ_VAL" readonly>
                        </td>
                    </tr>
                </table>
                <div class="additional-info top-padding" id="homeuser-rTradeworker-street_number-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">The street number of the house you want work done at E.g. 50</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rTradeworker-street_number-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">The street number of the house you want work done at E.g. 50</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rTradeworker-route-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">The road on which the location is that the work needs to be done E.g. 15th Avenue</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rTradeworker-sublocality_level_1-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">The sub area to an area E.g. Edenvale</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rTradeworker-locality-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">An area found within the province E.g. Edenvale</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rTradeworker-administrative_area_level_1-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">This is the province E.g. Gauteng Province</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rTradeworker-country-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">This is the country the work is done in E.g. South Africa</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rTradeworker-postal_code-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">This is the postal code of the area E.g. 1201</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="large-2 medium-2 large-offset-9 medium-offset-9 columns">
                <button type="submit" class="warning button radius" id="register-button"
                        onclick="sendAJAXRequest('homeuser-rTradeworker',handlerTradeworkerResponse,'homeuser-rTradeworker-form');">
                    Request Tradeworker(s)
                    <img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>
                </button>
                <p>
                    <button data-open="exampleModal3" id="register-modal-button" hidden>Click me for a modal</button>
                </p>
            </div>
        </div>
    </form>
</div>

<div class="reveal" id="homeuser-rTradeworker-notification-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-rTradeworker-notification-modal-additionalInfo">

    </div>
</div>

<div class="reveal" id="homeuser-rTradeworker-notification-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-rTradeworker-notification-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
