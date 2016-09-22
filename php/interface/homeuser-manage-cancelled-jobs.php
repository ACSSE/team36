<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Manage Cancelled Jobs</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="homeuser-manage-cancelled" name="homeuser-manage-cancelled">
        <div class="column small-11">
            <div class="row collapse" >
                <div class="column large-2">
                    <label>Column:</label>
                    <select id="homeuser-cancelled-search-column" name="ignore-homeuser-cancelled-search-column" onchange="userGenericSearchTable('homeuser-cancelled-search','cancelled-jobs')">
                    </select>
                </div>
                <div class="column large-10">
                    <label>Search:</label><input type="text" name="ignore-homeuser-cancelled-search" id="homeuser-cancelled-search" oninput="userGenericSearchTable('homeuser-cancelled-search','cancelled-jobs')"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="homeuser-cancelled-sortBy" name="homeuser-cancelled-sortBy" onchange="userGenericSortTable('cancelled-jobs','homeuser-cancelled-sortBy')">
                </select>
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <div class=" full-width" id="homeuser-cancelled-areainformation" style="overflow-y: auto; height: 400px">

                </div>
            </div>
        </div>
    </form>
 

  
</div>
<form id="homeuser-manage-cancelled-tradeworker-remove-form" name="homeuser-manage-cancelled-tradeworker-remove-form">
    <input type="hidden" id="homeuser-cancelled-tradeworkerID-toRemove" name="ignore-homeuser-cancelled-tradeworkerID-toRemove" value="-50">
</form>

<div class="small reveal" id="homeuser-cancelled-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-cancelled-modal-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="reveal" id="homeuser-cancelled-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-cancelled-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>