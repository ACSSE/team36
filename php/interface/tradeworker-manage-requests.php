<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <script>

    </script>
    <h1>Manage Job Request</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="tradeworker-manage-requests" name="tradeworker-manage-requests">
    <div class="row">
        <div class="column large-11">
            <label>Search:</label>
            <input type="text" name="tradeworker-manageRequest-search-0" id="tradeworker-manageRequest-search-0"/>
        </div>
        <div class="column large-1">

        </div>
    </div>
    <div class="row">
        <div class="column large-11">
            <label>Sort By:</label>
            <select id="tradeworker-manageRequest-sortBy-0" name="tradeworker-manageRequest-sortBy-0">
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
            <div class=" full-width" id="tradeworker-manageRequest-areainformation" style="overflow-y: auto; height: 400px">

            </div>
        </div>
    </div>

    </form>
    <div class="row">
        <div class="large-4 large-offset-4 medium-offset-4 medium-4 columns">
            <button type="button" class="button" style="background-color: #3aff29"  onclick="tradeworkerAcceptJobRequest()">
                Accept
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </button>
        </div>
        <div class="large-4 medium-4 columns">
            <button type="button" class="button" style="background-color: #ff3914">
                Reject
            </button>
        </div>
    </div>
    <form id="tradeworker-selected-request" name="tradeworker-selected-request">
        <input type="hidden" value="-50" id="tradeworker-selected-request-id" name="ignore-tradeworker-selected-request-id">
    </form>
</div>

<div class="reveal" id="tradeworker-requests-notification-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">

    <div id="tradeworker-requests-notification-modal-additionalInfo">

    </div>

    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>