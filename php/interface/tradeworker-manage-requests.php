<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <script>
        sendAJAXRequest('fetch-job-requests', handleTradeworkerFetchJobRequests);
    </script>
    <h1>Manage Job Request</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <div class="row">
        <div class="column large-11">
            <label>Search:</label>
            <input type="text" name="tradeworker-manageRequest-search-0" id="tradeworker-manageRequest-search-0"/>
        </div>
        <div class="column large-1">

        </div>
    </div>
    <div class="row">
        <div class="column large-11">
            <label>Sort By:</label>
            <select id="tradeworker-manageRequest-sortBy-0" name="tradeworker-manageRequest-sortBy-0">
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
            <div class=" full-width" id="tradeworker-manageRequest-areainformation" style="overflow-y: scroll; height: 400px">

            </div>
        </div>
    </div>


    <div class="row">
        <div class="large-4 large-offset-4 medium-offset-4 medium-4 columns">
            <button type="button" class="button" style="background-color: #3aff29">
                Edit
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </button>
        </div>
        <div class="large-4 medium-4 columns">
            <button type="button" class="button" style="background-color: #ff3914">
                Delete
            </button>
        </div>
    </div>
</div>
