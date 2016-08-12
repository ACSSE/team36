<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Initiated Jobs</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="tradeworker-manage-ongoingJobs" name="tradeworker-manage-ongoingJobs">
        <div class="row">
            <div class="column large-11">
                <label>Search:</label>
                <input type="text" name="tradeworker-ongoingJobs-search-0" id="tradeworker-ongoingJobs-search-0"/>
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="tradeworker-ongoingJobs-sortBy-0" name="tradeworker-ongoingJobs-sortBy-0">
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
                <div class=" full-width" id="tradeworker-ongoingJobs-areainformation" style="overflow-y: auto; height: 400px">

                </div>
            </div>
        </div>
    </form>
    <form id="tradeworker-ongoingJobs-selected-request" name="tradeworker-ongoingJobs-selected-request">
        <input type="hidden" value="-50" id="tradeworker-ongoingJobs-selected-request-id" name="ignore-tradeworker-ongoingJobs-selected-request-id">
    </form>

    <div class="row">
        <div class="large-4 medium-4 columns">
            <button type="button" class="button success" style="margin-top: 0.5em" onclick="tradeworkerCompleteJobInitiate()">
                Request Completion
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>
            </button>
        </div>
        <div class="large-4 medium-4 columns">
            <button type="button" class="button warning" style="margin-top: 0.5em" onclick="tradeworkerExtendJobInitiate()">
                Request Extension
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </button>
        </div>
        <div class="large-4 medium-4 columns">
            <button type="button" class="button alert" style="margin-top: 0.5em" onclick="tradeworkerTerminateJobInitiate()">
                Terminate
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>
            </button>
        </div>
    </div>
</div>

<div class="small reveal" id="tradeworker-ongoingJobs-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="tradeworker-ongoingJobs-modal-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="reveal" id="tradeworker-ongoingJobs-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="tradeworker-ongoingJobs-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>