<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Manage completed Jobs</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="tradeworker-manage-completed" name="tradeworker-manage-completed">
        <div class="row">
            <div class="column large-11">
                <label>Search:</label>
                <input type="text" name="tradeworker-completed-search-0" id="tradeworker-completed-search-0"/>
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="tradeworker-completed-sortBy-0" name="tradeworker-completed-sortBy-0">
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
                <div class=" full-width" id="tradeworker-completed-areainformation" style="overflow-y: auto; height: 400px">

                </div>
            </div>
        </div>
        <div class="row">
            <div class="large-4 large-offset-4 medium-offset-4 medium-4 columns">
                <button type="button" class="button" style="background-color: #3aff29"  onclick="tradeworkerPrintCompletedJobs()">
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