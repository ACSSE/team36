<div class="full-height full-width">
    <h1>Details:</h1>
    <div class="row">
        //`StreetNumber`,`Route`,`Sublocality`,`Locality`,`AdministrativeArea`
        <div class="column medium-11 large-11">
            <label>StreetNumber:</label><input type="text" name="StreetNumber-tradeworker-edit" id="StreetNumber-tradeworker-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Route:</label><input type="text" name="Route-tradeworker-edit" id="Route-tradeworker-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Sublocality:</label><input type="text" name="Sublocality-tradeworker-edit" id="Sublocality-tradeworker-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Locality:</label><input type="text" name="Locality-tradeworker-edit" id="Locality-tradeworker-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Administrative Area: </label><input type="text" name="AdministrativeArea-tradeworker-edit" id="AdministrativeArea-tradeworker-edit">
        </div>
    </div>

    <div class="row">
        <div class="large-2 medium-2 large-offset-9 medium-offset-9 columns">
            <button type="submit" class="warning button radius" id="updateInfo-button"
                    onclick="sendAJAXRequest('',handleTradeworkerUpdateLocationDeitails);">
                Update Location Information
            </button>

        </div>
    </div>

</div>