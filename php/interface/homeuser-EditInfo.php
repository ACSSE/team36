<div class="full-height full-width">
    <form id="homeuser-editInfo-form" name="homeuser-editInfo-form">
    <h1>Details:</h1>
    <div class="row">
        <div class="column medium-11 large-11">
            <label>First Name(S):</label><input type="text" name="name-homeuser-edit" id="name-homeuser-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Surname:</label><input type="text" name="surname-homeuser-edit" id="surname-homeuser-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Username:</label><input type="text" name="username-homeuser-edit" id="username-homeuser-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Email Address:</label><input type="email" name="email-homeuser-edit" id="email-homeuser-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Cell Number</label><input type="text" name="cellnumber-homeuser-edit" id="cellnumber-homeuser-edit">
        </div>
        <div class="column medium-11 large-11">
            <label>Home Contact number: </label><input type="text" name="homenumber-homeuser-edit" id="homenumber-homeuser-edit">
        </div>
    </div>

    <div class="row">
        <div class="large-2 medium-2 large-offset-9 medium-offset-9 columns">
            <button type="submit" class="additionalbuttoncolors-primary button radius" id="updateInfo-button"
                    onclick="sendAJAXRequest('homeuser-update-information',handleHomeUserUpdateProfileDeitails,'homeuser-editInfo-form');">
                Update Profile Information
            </button>

        </div>
    </div>
</form>
</div>