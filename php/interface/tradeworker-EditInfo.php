<div class="full-height full-width">
    <h1>Details:</h1>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>First Name(s):</label><input type="text" name="name-tradeworker-edit" id="name-tradeworker-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Surname:</label><input type="text" name="surname-tradeworker-edit" id="surname-tradeworker-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Username:</label><input type="text" name="username-tradeworker-edit" id="username-tradeworker-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Email Address:</label><input type="email" name="email-tradeworker-edit" id="email-tradeworker-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Cell Number</label><input type="text" name="cellnumber-tradeworker-edit" id="cellnumber-tradeworker-edit">
        </div>

    </div>

    <div class="row">
        <div class="large-2 medium-2 large-offset-9 medium-offset-9 columns">
            <button type="submit" class="warning button radius" id="updateInfo-button"
                    onclick="sendAJAXRequest('tradeworker-update-information',handleTradeWorkerUpdateProfileDeitails);">
                Update Profile Information
            </button>
        </div>
    </div>


</div>