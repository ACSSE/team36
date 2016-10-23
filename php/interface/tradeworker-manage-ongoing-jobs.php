<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Initiated Jobs</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="tradeworker-manage-ongoingJobs" name="tradeworker-manage-ongoingJobs">

        <div class="column small-11">
            <div class="row collapse" >
                <div class="column large-2">
                    <label>Column:</label>
                    <select id="tradeworker-ongoingJobs-search-column" name="ignore-tradeworker-ongoingJobs-search-column" onchange="userGenericSearchTable('tradeworker-ongoingJobs-search','ongoing-jobs')">
                    </select>
                </div>
                <div class="column large-10">
                    <label>Search:</label><input type="text" name="ignore-tradeworker-ongoingJobs-search" id="tradeworker-ongoingJobs-search" oninput="userGenericSearchTable('tradeworker-ongoingJobs-search','ongoing-jobs')"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="tradeworker-ongoingJobs-sortBy" name="tradeworker-ongoingJobs-sortBy" onchange="userGenericSortTable('ongoing-jobs','tradeworker-ongoingJobs-sortBy')">
                </select>
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <div class="areainformation-panel-container full-width" id="tradeworker-ongoingJobs-areainformation">

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
            <button type="button" class="button additionalbuttoncolors-primary" style="margin-top: 0.5em" onclick="tradeworkerExtendJobInitiate()">
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