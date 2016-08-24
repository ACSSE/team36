<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Manage Job Request</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="homeuser-manage-requests-completed" name="homeuser-manage-requests-completed">
        <div class="row">
            <div class="column large-11">
                <label>Search:</label>
                <input type="text" name="ignore-homeuser-manageRTradeworker-completed-search-0" id="homeuser-manageRTradeworker-completed-search-0"/>
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="homeuser-manageRTradeworker-completed-sortBy-0" name="ignore-homeuser-manageRTradeworker-completed-sortBy-0">
                    <option value="WorkType">Work Type</option>
                    <option value="initialDate">Date Request is sent</option>
                    <option value="commencementDate">Commencement Date</option>
                    <option value="accepted">Status</option>
                    <option value="Sub_locality">Area</option>
                </select>
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <div class=" full-width" id="homeuser-manageRTradeworker-completed-areainformation" style="overflow-y: auto; height: 400px">

                </div>
            </div>
        </div>
    </form>
    <form id="homeuser-manageRTradeworker-completed-selected-request" name="homeuser-manageRTradeworker-completed-selected-request">
        <input type="hidden" value="-50" id="homeuser-manageRTradeworker-completed-selected-request-id" name="ignore-homeuser-manageRTradeworker-completed-selected-request-id">
    </form>

    <div class="row">
        <div class="large-4 large-offset-4 medium-offset-4 medium-4 columns">
            <button type="button" class="button warning" style="margin-top: 0.5em">
                View
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </button>
        </div>
    </div>
</div>

<div class="small reveal" id="homeuser-manageRequest-completed-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-manageRequest-completed-modal-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="reveal" id="homeuser-manageRequest-completed-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-manageRequest-completed-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>