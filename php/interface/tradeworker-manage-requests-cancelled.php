<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <script>

    </script>
    <h1>Manage Cancelled Request</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="tradeworker-manage-requests-cancelled" name="tradeworker-manage-requests-cancelled">
        <div class="column small-11">
            <div class="row collapse" >
                <div class="column large-2">
                    <label>Column:</label>
                    <select id="tradeworker-manageRequest-cancelled-search-column" name="ignore-tradeworker-manageRequest-cancelled-search-column" onchange="userGenericSearchTable('tradeworker-manageRequest-cancelled-search','cancelled-request')">
                    </select>
                </div>
                <div class="column large-10">
                    <label>Search:</label><input type="text" name="ignore-tradeworker-manageRequest-cancelled-search" id="tradeworker-manageRequest-cancelled-search" oninput="userGenericSearchTable('tradeworker-manageRequest-cancelled-search','cancelled-request')"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="tradeworker-manageRequest-cancelled-sortBy" name="tradeworker-manageRequest-cancelled-sortBy" onchange="userGenericSortTable('cancelled-request','tradeworker-manageRequest-cancelled-sortBy')">
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