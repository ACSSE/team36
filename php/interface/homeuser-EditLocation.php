<div class="full-height full-width">
    <form id="homeuser-editLocation-form" name="homeuser-editLocation-form">
    <h1>Location:</h1>
    <div class="row">
        <div class="column large-11 medium 11">
            <div id="homeuser-location-locationField">
                <label>Update Address:</label> <input name="ignore-homeuser-rTradeworker-autocomplete" id="homeuser-loc-autocomplete" placeholder="Please enter in your address here to change table"
                                                     onfocus="geolocate()" onclick="genericInitAutocomplete('homeuser-loc-autocomplete')" type="text" autocomplete="off"/>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11 medium 11">
           <table id="homeuser-location-address">
                <tr>
                    <td class="label">Street address</td>
                    <td>
                        <input type="text" name="homeuser-loc-street_number" id="homeuser-loc-street_number" placeholder="50" class="REQ_VAL" readonly>
                    </td>
                    <td colspan="2">
                        <input type="text" name="homeuser-loc-route" id="homeuser-loc-route" placeholder="15th Avenue" class="REQ_VAL" readonly>
                    </td>
                </tr>
                <tr>
                    <td class="label">Area</td>
                    <td colspan="3">
                        <input type="text" name="homeuser-loc-sublocality_level_1" id="homeuser-loc-sublocality_level_1" placeholder="Edenvale" class="REQ_VAL" readonly>
                    </td>
                </tr>
                <tr>
                    <td class="label">City</td>
                    <td colspan="3">
                        <input type="text" name="homeuser-loc-locality" id="homeuser-loc-locality" placeholder="Edenvale" class="REQ_VAL" readonly>
                    </td>
                </tr>
                <tr>
                    <td class="label">State</td>
                    <td colspan="3">
                        <input type="text" name="homeuser-loc-administrative_area_level_1" id="homeuser-loc-administrative_area_level_1" placeholder="Gauteng Province" class="REQ_VAL" readonly>
                    </td>
                </tr>
            </table>
            </div>
        </div>
            <div class="row">
                <div class="large-2 medium-2 large-offset-9 medium-offset-9 columns">
                    <button type="submit" class="additionalbuttoncolors-primary button radius" id="updateInfo-button"
                            onclick="sendAJAXRequest('update-tradeworker-location-details',handleTradeworkerUpdateLocationDeitails);">
                        Update Location Information
                    </button>

                </div>
            </div>
        </form>
        </div>