<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Manage completed Jobs</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="homeuser-manage-completed" name="homeuser-manage-completed">

        <div class="column small-11">
            <div class="row collapse" >
                <div class="column large-2">
                    <label>Column:</label>
                    <select id="homeuser-completed-search-column" name="ignore-homeuser-completed-search-column" onchange="userGenericSearchTable('homeuser-completed-search','completed-jobs')">
                    </select>
                </div>
                <div class="column large-10">
                    <label>Search:</label><input type="text" name="ignore-homeuser-completed-search" id="homeuser-completed-search" oninput="userGenericSearchTable('homeuser-completed-search','completed-jobs')"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="homeuser-completed-sortBy-0" name="homeuser-completed-sortBy-0">
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
                <div class=" full-width" id="homeuser-completed-areainformation" style="overflow-y: auto; height: 400px">

                </div>
            </div>
        </div>
    </form>



</div>
<form id="homeuser-manage-completed-tradeworker-remove-form" name="homeuser-manage-completed-tradeworker-remove-form">
    <input type="hidden" id="homeuser-completed-tradeworkerID-toRemove" name="ignore-homeuser-completed-tradeworkerID-toRemove" value="-50">
</form>

<div class="small reveal" id="homeuser-completed-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-completed-modal-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="reveal" id="homeuser-completed-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-completed-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>