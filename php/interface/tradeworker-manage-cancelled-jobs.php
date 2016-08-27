<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Manage Cancelled Jobs</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="tradeworker-manage-cancelled" name="tradeworker-manage-cancelled">
        <div class="row">
            <div class="column large-11">
                <label>Search:</label>
                <input type="text" name="tradeworker-cancelled-search-0" id="tradeworker-cancelled-search-0"/>
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="tradeworker-cancelled-sortBy-0" name="tradeworker-cancelled-sortBy-0">
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
                <div class=" full-width" id="tradeworker-cancelled-areainformation" style="overflow-y: auto; height: 400px">

                </div>
            </div>
        </div>
    </form>



</div>
<form id="tradeworker-manage-cancelled-tradeworker-remove-form" name="tradeworker-manage-cancelled-tradeworker-remove-form">
    <input type="hidden" id="tradeworker-cancelled-tradeworkerID-toRemove" name="ignore-tradeworker-cancelled-tradeworkerID-toRemove" value="-50">
</form>

<div class="small reveal" id="tradeworker-cancelled-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="tradeworker-cancelled-modal-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="reveal" id="tradeworker-cancelled-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="tradeworker-cancelled-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>