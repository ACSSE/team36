<div class="full-height full-width">
    <form id="tradeworker-editLocation-form" name="tradeworker-editLocation-form">
    <h1>Location:</h1>
    <div class="row">
        <div class="column large-11 medium 11">
            <div id="tradeworker-location-locationField">
                <label>Search Address:</label> <input name="ignore-tradeworker-autocomplete" id="tradeworker-loc-autocomplete" placeholder="Enter in location of job"
                                                      onclick="genericInitAutocomplete('tradeworker-loc-autocomplete')" type="text" autocomplete="off"/>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
           <table id="tradeworker-location-address">
                <tr>
                    <td class="label">Street address</td>
                    <td>
                        <input type="text" name="StreetNumber-tradeworker-edit" id="StreetNumber-tradeworker-edit" placeholder="50" class="REQ_VAL" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" name="Route-tradeworker-edit" id="Route-tradeworker-edit" placeholder="15th Avenue" class="REQ_VAL" readonly>
                    </td>
                </tr>
                <tr>
                    <td class="label">Area</td>
                    <td colspan="3">
                        <input type="text" name="Sublocality-tradeworker-edit" id="Sublocality-tradeworker-edit" placeholder="Edenvale" class="REQ_VAL" readonly>
                    </td>
                </tr>
                <tr>
                    <td class="label">City</td>
                    <td colspan="3">
                        <input type="text" name="Locality-tradeworker-edit" id="Locality-tradeworker-edit" placeholder="Edenvale" class="REQ_VAL" readonly>
                    </td>
                </tr>
                <tr>
                    <td class="label">State</td>
                    <td>
                        <input type="text" name="AdministrativeArea-tradeworker-edit" id="AdministrativeArea-tradeworker-edit" placeholder="Gauteng Province" class="REQ_VAL" readonly>
                    </td>
                    <td class="label">Zip Code</td>
                    <td>
                        <input type="text" name="Zipcode-tradeworker-edit" id="Zipcode-tradeworker-edit" placeholder="1201" class="REQ_VAL" readonly>
                    </td>
                </tr>
                <tr>
                    <td class="label">Country</td>
                    <td colspan="3">
                        <input type="text" name="Country-tradeworker-edit" id="Country-tradeworker-edit" placeholder="South Africa" class="REQ_VAL" readonly>
                    </td>
                </tr>
            </table>
            </div>
        </div>
    <div class="row">
        <div class="large-2 medium-2 large-offset-9 medium-offset-9 columns">
            <button type="submit" class="warning button radius" id="updateInfo-button"
                    onclick="sendAJAXRequest('update-tradeworker-location-details',handleTradeworkerUpdateLocationDeitails);">
                Update Location Information
            </button>

        </div>
    </div>
    </form>
</div>