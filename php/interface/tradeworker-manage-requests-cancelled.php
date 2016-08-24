<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <script>

    </script>
    <h1>Manage Job Request</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="tradeworker-manage-requests-cancelled" name="tradeworker-manage-requests-cancelled">
        <div class="row">
            <div class="column large-11">
                <label>Search:</label>
                <input type="text" name="tradeworker-manageRequest-cancelled-search-0" id="tradeworker-manageRequest-cancelled-search-0"/>
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="tradeworker-manageRequest-cancelled-sortBy-0" name="tradeworker-manageRequest-cancelled-sortBy-0">
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
                <div class=" full-width" id="tradeworker-manageRequest-cancelled-areainformation" style="overflow-y: auto; height: 400px">

                </div>
            </div>
        </div>

    </form>
</div>

<div class="reveal" id="tradeworker-requests-cancelled-notification-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">

    <div id="tradeworker-requests-notification-cancelled-modal-additionalInfo">

    </div>

    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>