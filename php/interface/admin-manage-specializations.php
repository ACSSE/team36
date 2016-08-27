<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Manage Specializations</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
        <form id="admin-manage-specialization-search-form" name="admin-manage-specialization-search-form">
        <div class="row">
            <div class="column large-11">
                <label>Search:</label>
                <input type="text" name="ignore-admin-manage-specialization-search" id="admin-manage-specialization-search" onkeyup="adminSearchSpecializationArray()">
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <div class=" full-width" id="admin-manage-specialization-areainformation" style="overflow-y: auto; height: 400px">

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