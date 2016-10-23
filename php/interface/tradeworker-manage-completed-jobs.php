<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Manage completed Jobs</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="tradeworker-manage-completed" name="tradeworker-manage-completed">
        <div class="column small-11">
            <div class="row collapse" >
                <div class="column large-2">
                    <label>Column:</label>
                    <select id="tradeworker-completed-search-column" name="ignore-tradeworker-completed-search-column" onchange="userGenericSearchTable('tradeworker-completed-search','ongoing-jobs')">
                    </select>
                </div>
                <div class="column large-10">
                    <label>Search:</label><input type="text" name="ignore-tradeworker-completed-search" id="tradeworker-completed-search" oninput="userGenericSearchTable('tradeworker-completed-search','completed-jobs')"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="tradeworker-completed-jobs-sortBy" name="tradeworker-completed-jobs-sortBy" onchange="userGenericSortTable('completed-jobs','tradeworker-completed-jobs-sortBy')">

                </select>
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <div class="areainformation-panel-container full-width" id="tradeworker-completed-areainformation">

                </div>
            </div>
        </div>
        <div class="row">
            <div class="large-4 large-offset-4 medium-offset-4 medium-4 columns">
                <button type="button" class="button additionalbuttoncolors-secondary" style="margin-top: 0.5em"  onclick="tradeworkerPrintCompletedJobs()">
                    Print
                    <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
                </button>
            </div>
        </div>
    </form>


</div>
<form id="tradeworker-manage-completed-tradeworker-remove-form" name="tradeworker-manage-completed-tradeworker-remove-form">
    <input type="hidden" id="tradeworker-completed-tradeworkerID-toRemove" name="ignore-tradeworker-completed-tradeworkerID-toRemove" value="-50">
</form>

<div class="small reveal" id="tradeworker-completed-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="tradeworker-completed-modal-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="reveal" id="tradeworker-completed-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="tradeworker-completed-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>