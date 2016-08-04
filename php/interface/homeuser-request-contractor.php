<div class="full-height full-width">
    <form id="homeuser-rContractor-form" name="homeuser-rContractor-form">
        <h1>Request Contractor</h1>

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
                <label>Commencement Date:</label><input type="date" name="commencement-homeuser-rContractor" id="commencement-homeuser-rContractor" class="REQ_VAL">
                <div class="additional-info top-padding" id="commencement-homeuser-rContractor-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">Please fill in a date you would like to start the job by</p>
                </div>
            </div>
        </div>
        <!-- TODO:Javascript generated fields adding more skill types to form, will be limited to having filled in a fields before being able to add a new type, think along arrays to do this also add a hidden input field keeping track of how many types of workers are being requested-->
        <div class="row">
            <div class="column medium-11 large-11">
            <h4>Job Type(s):</h4>
                </div>
        </div>
        <div class="row">
            <div class="column medium-11 large-11">
                <!--Can use the onChange event to set up what-ever is necessary according to the type selected-->
                <label>Select Work Type:</label> <select id="homeuser-rContractor-work-type-0" name="homeuser-rContractor-work-type-0" form="register-homeuser-rContractor-form" class="REQ_VAL" onclick="genericFillSkillsSelectTag('homeuser-rContractor-work-type-0')">
                    <script>

                    </script>
                </select>
                <div class="additional-info top-padding" id="homeuser-rContractor-work-type-0-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">Please select one of the supplied options from the drop down box</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column medium-11 large-11">
                <label>Job Description:</label><textarea  name="job-description-homeuser-rContractor-0" id="job-description-homeuser-rContractor-0" placeholder="I would like to have a 4 X 4 square meter area tiled"
                                                         class="REQ_VAL"></textarea>
                <div class="additional-info top-padding" id="job-description-homeuser-rContractor-0-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">Please enter in a short description of what you would like done for the job type selected</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column medium-11 large-11">
                <label>Number of tradeworkers you require:</label><input type="number" name="nTradeworkers-homeuser-rContractor-0" id="nTradeworkers-homeuser-rContractor-0" placeholder="3" class="REQ_VAL">
                <div class="additional-info top-padding" id="nTradeworkers-homeuser-rContractor-0-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">Please fill in amount of tradeworkers that you would like of the speciality specified. E.g. 3</p>
                </div>
            </div>
            <div class="column medium-1 large-1" style="margin-top:1.75rem">
                <a data-toggle="additional-homeuser-rContractor-skill-1" name="homeuser-rContractor-toggle-switch-0" id="homeuser-rContractor-toggle-switch-0" onclick="homeuserReqTradeworkerAdditionalLocationsToggler(1)">
                    <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
                </a>
            </div>
        </div>

        <input type="hidden" value="1" id="actual-nTradeworkers-homeuser-rContractor" name="ignore-actual-nTradeworkers-homeuser-rContractor" />


        <div id="additional-area-homeuser-rContractor">

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
                <div id="homeuser-rContractor-locationField">
                    <label>Search Address</label> <input name="ignore-homeuser-rContractor-autocomplete" id="homeuser-rContractor-autocomplete" placeholder="Enter in location of job"
                                                         onclick="genericInitAutocomplete('homeuser-rContractor-autocomplete')" type="text" autocomplete="off"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column large-11 medium 11">
                <!-- TODO: customize tables to be themed according to the site using sass - watch: http://foundation.zurb.com/learn/install-foundation-6-sass-on-windows.html-->
                <table id="homeuser-rContractor-address">
                    <tr>
                        <td class="label"><label>Street address</label></td>
                        <td>
                            <input type="text" name="homeuser-rContractor-street_number" id="homeuser-rContractor-street_number" placeholder="50" class="REQ_VAL" readonly>
                        </td>
                        <td colspan="2">
                            <input type="text" name="homeuser-rContractor-route" id="homeuser-rContractor-route" placeholder="15th Avenue" class="REQ_VAL" readonly>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">Area</td>
                        <td colspan="3">
                            <input type="text" name="homeuser-rContractor-sublocality_level_1" id="homeuser-rContractor-sublocality_level_1" placeholder="Edenvale" class="REQ_VAL" readonly>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">City</td>
                        <td colspan="3">
                            <input type="text" name="homeuser-rContractor-locality" id="homeuser-rContractor-locality" placeholder="Edenvale" class="REQ_VAL" readonly>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">State</td>
                        <td>
                            <input type="text" name="homeuser-rContractor-administrative_area_level_1" id="homeuser-rContractor-administrative_area_level_1" placeholder="Gauteng Province" class="REQ_VAL" readonly>
                        </td>
                        <td class="label">Zip Code</td>
                        <td>
                            <input type="text" name="homeuser-rContractor-postal_code" id="homeuser-rContractor-postal_code" placeholder="1201" class="REQ_VAL" readonly>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">Country</td>
                        <td colspan="3">
                            <input type="text" name="homeuser-rContractor-country" id="homeuser-rContractor-country" placeholder="South Africa" class="REQ_VAL" readonly>
                        </td>
                    </tr>
                </table>
                <div class="additional-info top-padding" id="homeuser-rContractor-street_number-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">The street number of the house you want work done at E.g. 50</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rContractor-street_number-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">The street number of the house you want work done at E.g. 50</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rContractor-route-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">The road on which the location is that the work needs to be done E.g. 15th Avenue</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rContractor-sublocality_level_1-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">The sub area to an area E.g. Edenvale</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rContractor-locality-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">An area found within the province E.g. Edenvale</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rContractor-administrative_area_level_1-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">This is the province E.g. Gauteng Province</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rContractor-country-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">This is the country the work is done in E.g. South Africa</p>
                </div>
                <div class="additional-info top-padding" id="homeuser-rContractor-postal_code-info" data-toggler data-animate="fade-in fade-out">
                    <p class="help-text no-margins">This is the postal code of the area E.g. 1201</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="large-12 medium-12 columns">
                <button type="submit" class="secondary button radius" id="register-button"
                        onclick="sendAJAXRequest('homeuser-rContractor',handlerContractorResponse,'homeuser-rContractor-form');">
                    Register
                </button>
                <p>
                    <button data-open="exampleModal3" id="register-modal-button" hidden>Click me for a modal</button>
                </p>
            </div>
        </div>
    </form>
</div>