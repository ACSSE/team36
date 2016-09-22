<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Manage Job Request</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="homeuser-manage-requests-completed" name="homeuser-manage-requests-completed">
        <div class="row large-uncollapse">
            <div class="column small-11">
                <div class="row collapse" >
                    <div class="column large-2" style="padding-left: 0.9375rem">
                        <label>Column:</label>
                        <select id="homeuser-manageRTradeworker-completed-search-column" name="ignore-homeuser-manageRTradeworker-completed-search-column" onchange="userGenericSearchTable('homeuser-manageRTradeworker-completed-search','completed-requests')">
                        </select>
                    </div>
                    <div class="column large-10" style="padding-right: 0.9375rem">
                        <label>Search:</label><input type="text" name="ignore-homeuser-manageRTradeworker-completed-search" id="homeuser-manageRTradeworker-completed-search" oninput="userGenericSearchTable('homeuser-manageRTradeworker-completed-search','completed-requests')"/>

                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="column large-11">

            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="homeuser-manageRTradeworker-completed-sortBy" name="ignore-homeuser-manageRTradeworker-completed-sortBy" onchange="userGenericSortTable('completed-requests','homeuser-manageRTradeworker-completed-sortBy')">
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