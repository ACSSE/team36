<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>View Tables</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="admin-manage-tables-search-form" name="admin-manage-tables-search-form">
        <div class="row">
            <div class="column large-11">
                <label>Search:</label>
                <input type="text" name="ignore-admin-manage-tables-search" id="admin-manage-tables-search" onkeyup="adminGenericDisplayTable()">
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <label>Selected Table:</label>
                <select id="admin-manage-tables-select" name="ignore-admin-manage-tables-select" onchange="adminGenericDisplayTable()">
                    <option value="RegisteredUsers" selected>Registered Users Table</option>
                    <option value="HomeuserLocations">Home user locations Table</option>
                    <option value="Confirmations">Confirmations Table</option>
                    <option value="Specializations">Specialization Table</option>
                    <option value="AreaPerLocations">Area Per Location Table</option>
                    <option value="QuoteRequest">Quote Request Table</option>
                    <option value="Quote">Quote Table</option>
                    <option value="JobPerUser">Job Per User Table</option>
                    <option value="ReasonForJobTermination">Job Termination Reason Table</option>
                    <option value="Tradeworkers">Tradeworker Table</option>
                    <option value="Homeuser">Homeuser Table</option>
                    <option value="Locations">Locations Table</option>
                    <option value="LocationsPerUser">Locations Per User Table</option>
                </select>
            </div>
            <div class="column large-1">

            </div>
        </div>

        <div class="row">
            <div class="column large-11">
                <label>Sort By:</label>
                <select id="admin-view-table-sortBy" name="admin-view-table-sortBy"  onchange="userGenericSortTable('generic-table','admin-view-table-sortBy')">
                </select>
            </div>
            <div class="column large-1">

            </div>
        </div>

        <div class="row">
            <div class="column large-11">
                <div class=" full-width" id="admin-manage-tables-areainformation" style="overflow-y: auto; height: 400px">

                </div>
            </div>
        </div>
    </form>


    <div class="row">
        <div class="large-4 large-offset-4 medium-offset-4 medium-4 columns">
            <button type="button" class="button warning" style="margin-top: 0.5em" onclick="">
                Edit Selected
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>
            </button>
        </div>
        <div class="large-4 medium-4 columns">
            <button type="button" class="button alert" style="margin-top: 0.5em" onclick="">
                Add new
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </button>
        </div>
    </div>
</div>

<div class="small reveal" id="admin-manage-tables-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="admin-manage-tables-modal-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="reveal" id="admin-manage-tables-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="admin-manage-tables-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>