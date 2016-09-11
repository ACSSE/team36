<div class="full-height full-width">
    <form id="homeuser-editLocation-form" name="homeuser-editLocation-form">
    <h1>Location:</h1>
    <div class="row">
        <div class="column large-11 medium 11">
            <div id="homeuser-location-locationField">
                <label>Search Address:</label> <input name="ignore-homeuser-rTradeworker-autocomplete" id="homeuser-loc-autocomplete" placeholder="Enter in location of job"
                                                      onclick="genericInitAutocomplete('homeuser-loc-autocomplete')" type="text" autocomplete="off"/>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
           <table id="homeuser-location-address">
                <tr>
                    <td class="label">Street address</td>
                    <td>
                        <input type="text" name="StreetNumber-homeuser-edit" id="StreetNumber-homeuser-edit" placeholder="50" class="REQ_VAL" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" name="Route-homeuser-edit" id="Route-homeuser-edit" placeholder="15th Avenue" class="REQ_VAL" readonly>
                    </td>
                </tr>
                <tr>
                    <td class="label">Area</td>
                    <td colspan="3">
                        <input type="text" name="Sublocality-homeuser-edit" id="Sublocality-homeuser-edit" placeholder="Edenvale" class="REQ_VAL" readonly>
                    </td>
                </tr>
                <tr>
                    <td class="label">City</td>
                    <td colspan="3">
                        <input type="text" name="Locality-homeuser-edit" id="Locality-homeuser-edit" placeholder="Edenvale" class="REQ_VAL" readonly>
                    </td>
                </tr>
                <tr>
                    <td class="label">State</td>
                    <td>
                        <input type="text" name="AdministrativeArea-homeuser-edit" id="AdministrativeArea-homeuser-edit" placeholder="Gauteng Province" class="REQ_VAL" readonly>
                    </td>
                    <td class="label">Zip Code</td>
                    <td>
                        <input type="text" name="Zipcode-homeuser-edit" id="Zipcode-homeuser-edit" placeholder="1201" class="REQ_VAL" readonly>
                    </td>
                </tr>
                <tr>
                    <td class="label">Country</td>
                    <td colspan="3">
                        <input type="text" name="Country-homeuser-edit" id="Country-homeuser-edit" placeholder="South Africa" class="REQ_VAL" readonly>
                    </td>
                </tr>
            </table>

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