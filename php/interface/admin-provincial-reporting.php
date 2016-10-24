<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Provincial Reports</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="admin-manage-specialization-search-form" name="admin-manage-specialization-search-form">
        <div class="row">
            <div class="columns small-11">
                <select id="provincial-country-select" name="provincial-country-select" onchange="adminChangeProvinceToReportOn()">
                    <option value="1" selected>Gauteng</option>
                    <option value="2">Western Cape</option>
                    <option value="3">Northern Cape</option>
                    <option value="4">Eastern Cape</option>
                    <option value="5">Kwazulu-Natal</option>
                    <option value="6">Free State</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="column large-11">
                <div class=" full-width" id="admin-manage-provincial-reporting-areainformation" style="overflow-y: auto; height: 550px">

                </div>
            </div>
        </div>
    </form>


</div>

<div class="small reveal" id="admin-manage-specialization-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="admin-manage-specialization-modal-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="reveal" id="admin-manage-specialization-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="admin-manage-specialization-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>