<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Manage Ongoing Jobs</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="homeuser-manage-ongoingJobs" name="homeuser-manage-ongoingJobs">
        <div class="column small-11">
            <div class="row collapse" >
                <div class="column large-2">
                    <label>Column:</label>
                    <select id="homeuser-ongoingJobs-search-column" name="ignore-homeuser-ongoingJobs-search-column" onchange="userGenericSearchTable('homeuser-ongoingJobs-search','ongoing-jobs')">
                    </select>
                </div>
                <div class="column large-10">
                    <label>Search:</label><input type="text" name="ignore-homeuser-ongoingJobs-search" id="homeuser-ongoingJobs-search" oninput="userGenericSearchTable('homeuser-ongoingJobs-search','ongoing-jobs')"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="homeuser-ongoingJobsInitiate-sortBy" name="homeuser-ongoingJobsInitiate-sortBy" onchange="userGenericSortTable('ongoing-jobs','homeuser-ongoingJobsInitiate-sortBy')">
                </select>
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <div class=" full-width" id="homeuser-ongoingJobs-areainformation" style="overflow-y: auto; height: 400px">

                </div>
            </div>
        </div>
    </form>
    <form id="homeuser-ongoingJobs-selected-request" name="homeuser-ongoingJobs-selected-request">
        <input type="hidden" value="-50" id="homeuser-ongoingJobs-selected-request-id" name="ignore-homeuser-ongoingJobs-selected-request-id">
    </form>

    <div class="row">
        <div class="large-4 medium-4 columns">
            <button type="button" class="button success" style="margin-top: 0.5em" onclick="homeuserCompleteJobInitiate()">
            Complete
            <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </button>
        </div>
        <div class="large-4 medium-4 columns">
            <button type="button" class="button warning" style="margin-top: 0.5em" onclick="homeuserExtendJobInitiate()">
                Extend
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </button>
        </div>
        <div class="large-4 medium-4 columns">
            <button type="button" class="button alert" style="margin-top: 0.5em" onclick="homeuserTerminateJobInitiate()">
                Terminate
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>
            </button>
        </div>
    </div>
</div>


<div class="small reveal" id="homeuser-ongoingJobs-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-ongoingJobs-modal-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="reveal" id="homeuser-ongoingJobs-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-ongoingJobs-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>