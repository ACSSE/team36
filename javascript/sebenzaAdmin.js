/**
 * Created by Brandon on 2016/09/17.
 */

var adminRequestArray;
function handleFetchJobRequests(response){
    adminRequestArray = JSON.parse(response);
    console.log(adminRequestArray);
    if(typeof adminRequestArray == 'object'){
        adminSearchSpecializationArray();
        adminGenericDisplayTable();
        adminDisplayBlockUser();
        adminDisplayCountryReport();
        //adminDisplayProvincialReport("GP");
        adminDisplayProfileDetails();
        SetUpTableSortBySelect('specialization-table-headers','admin-specialization-sortBy');
        //SetUpTableSortBySelect('generic-table-headers','admin-view-table-sortBy');
        SetUpTableSortBySelect('block-table-headers','admin-manage-block-user-sortBy');
    }
}

function adminEditSelectedSpecialization(){
    console.log("Should be editing an existing specialization");
}

function handleAdminAddNewSpecialization(response){
    var result = JSON.parse(response);
    console.log("Should updating specialization table");
    console.log(result);
}

function adminAddNewSpecialization(){
    console.log("Should be adding a new specialization to tables");
    var html = "<div><form id='admin-add-specialization-form' name='admin-add-specialization-form'>" +
        "<h3>Add Specialization:</h3>" +
        "<label>Work Type:</label><input type='text' id='admin-specialization-add-type' name='admin-specialization-add-type' placeholder='Builder' class='REQ_VAL'>" +
        '<div class="additional-info top-padding" id="admin-specialization-add-type-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please make sure to set some name for the specialization you are trying to add. E.g.' +
        'Tiler</p>' +
        '</div>' +
        "<label>Work Type Description:</label><input type='text' id='admin-specialization-add-description' name='admin-specialization-add-description' placeholder='The laying of ceramic tiles' class='REQ_VAL'>" +
        '<div class="additional-info top-padding" id="admin-specialization-add-description-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please enter a description for the specialization you are trying to add. E.g.' +
        'tiling all day long</p>' +
        '</div>' +
        "</form></div>" +
    '<div class="row">' +
    '<div class="large-3 columns">' +
    '<button type="top-bar-button button" class="button success" style="margin-top: 0.2em" onclick="sendAJAXRequest(\'admin-add-new-specialization\',handleAdminAddNewSpecialization,\'admin-add-specialization-form\')">' +
    'Add Specialization' +
    '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
    '</button>' +
    '</div>' +
    '</div>';
    document.getElementById('admin-manage-specialization-modal-additionalInfo').innerHTML = html;
    new Foundation.Toggler($('#admin-specialization-add-description-info'), 'data-animate="hinge-in-from-right spin-out"');
    new Foundation.Toggler($('#admin-specialization-add-type-info'), 'data-animate="hinge-in-from-right spin-out"');
    $('#admin-manage-specialization-modal').foundation('toggle');
}

function adminDisplayProfileDetails(){
    //console.log("Should be doing profile details 3");

    //console.log("Should be doing profile details 1");
    if(adminRequestArray.hasOwnProperty('RegisteredUsers')){
        //console.log("Should be doing profile details");
        var table = "RegisteredUsers";
        var search = "TypeOfUser=3";
        var profileDetails = adminGenericDisplayTableSetUp(table,search);
        adminDisplayGenericTable(profileDetails,'admin-manage-profile-areainformation','profile-table');
    }

}

function adminDisplayCountryReport(){
    createCanvas('canvas','admin-manage-country-reports-areainformation',100);
    createCanvas('canvas1','admin-manage-country-reports-areainformation',100);
    createCanvas('canvas2','admin-manage-country-reports-areainformation',100);
    //graphTestRun();
    var tableName = "Tradeworkers";
    var tradeworkers = adminGenericDisplayTableSetUp(tableName,"");
    var search = "Availability=1";
    var availableTradeworkers = admin3DimensionalSearchArray(tableName,search);
    var totalRequests = adminGenericDisplayTableSetUp("Quote","");
    console.log("The following are tradeworkers within the bounds of South Africa:" + tradeworkers.length);
    console.log("Of these tradeworkers :" + availableTradeworkers.length + " are available for requests: ");
    console.log("The following is the number of total requests: " + totalRequests.length);
    var requestsMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
    var confirmedRequests = [0,0,0,0,0,0,0,0,0,0,0,0];
    var terminatedRequests = [0,0,0,0,0,0,0,0,0,0,0,0];
    var request = adminGenericDisplayTableSetUp("QuoteRequest","");

    for(var v = 0;v < request.length;v++){
        console.log(request[v]['JobCommencementDate']);
        var date = new Date(request[v]['JobCommencementDate']);
        //console.log(date);
        var month = date.getMonth();
        //console.log("this is the month: " + month);
        console.log(request[v]['RequestID']);
        var relatedRequests = admin2DimensionalSearchArray(totalRequests,"RequestID=" + request[v]['RequestID']);
        if(relatedRequests != null){
            console.log(".....1.....");
            var acceptedRequests = admin2DimensionalAndSearchArray(relatedRequests,"HomeuserResponse=3","Status=3");
            var rejectedRequests = admin2DimensionalOrSearchArray(relatedRequests,"HomeuserResponse=2","Status=2");
            console.log(".....1.....");
            if(acceptedRequests != null){
                console.log("Accepted Requests logged:");
                confirmedRequests[month] += acceptedRequests.length;
            }
            if(rejectedRequests != null){
                terminatedRequests[month] += rejectedRequests.length;
            }

            console.log("Adding to array");
            requestsMonth[month] += relatedRequests.length;
        }
    }
    console.log(confirmedRequests);
    console.log(requestsMonth);
    console.log("With 9 provinces");
    var gautengInfo = adminDisplayProvincialReport("GP");
    console.log(gautengInfo);
    var westernCapeInfo = adminDisplayProvincialReport("WC");
    console.log(westernCapeInfo);
    var nCapeInfo = adminDisplayProvincialReport("NC");
    console.log(nCapeInfo);
    var eCapeInfo = adminDisplayProvincialReport("EC");
    console.log(eCapeInfo);
    var kznInfo = adminDisplayProvincialReport("KZN");
    console.log(kznInfo);
    var fsInfo = adminDisplayProvincialReport("FS");
    console.log(fsInfo);
    //console.log("The following is gauteng information size: " + gautengInfo.length);
    var labels = ["Gauteng", "Western Cape", "Northern Cape", "Eastern Cape", "KwaZulu-Natal", "FreeState"];
    var data = [];
    data[0] = [gautengInfo['TotalTradeWorkersInArea'], westernCapeInfo['TotalTradeWorkersInArea'], nCapeInfo['TotalTradeWorkersInArea'], eCapeInfo['TotalTradeWorkersInArea'], kznInfo['TotalTradeWorkersInArea'], fsInfo['TotalTradeWorkersInArea']];
    data[1] = [gautengInfo['TotalTradeWorkersAvailableInArea'], westernCapeInfo['TotalTradeWorkersAvailableInArea'], nCapeInfo['TotalTradeWorkersAvailableInArea'], eCapeInfo['TotalTradeWorkersAvailableInArea'], kznInfo['TotalTradeWorkersAvailableInArea'], fsInfo['TotalTradeWorkersAvailableInArea']];
    var dataHeadings = ["Total Tradeworkers","Available Tradeworkers"];
    var colours = [randomColor(),randomColor()];
    var barChartData = createBarGraphConfig("Provincial Tradeworker Indicator",labels,data,dataHeadings,colours);
    var ctx = document.getElementById("canvas").getContext("2d");
    var ctx1 = document.getElementById("canvas1").getContext("2d");
    var ctx2 = document.getElementById("canvas2").getContext("2d");
    //var ctx1 = document.getElementById("canvas1").getContext("2d");
    var test = new Chart(ctx1, barChartData);

    //graphTestRun();
    var labels = ["Available Tradeworkers","Unavailable Tradeworkers"];
    var colors = [];
    colors[0] = [randomColor(),randomColor()];

    data = [];
    data[0] = [availableTradeworkers.length,tradeworkers.length - availableTradeworkers.length];

    var pieChartData = createPieGraphConfig(labels,colors,data,1,"Total Tradeworkers");


    data = [requestsMonth,confirmedRequests,terminatedRequests];
    labels = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
    var dataLabel = ['Total Number Requests Sent Out','Total Confirmed Requests','Total Rejected Requests'];
    var lineChartData = createLineGraphConfig(labels,data,dataLabel,"Overall Requests Report");
    //createCanvas('canvas2','admin-manage-country-reports-areainformation',100);

    window.myLine = new Chart(ctx2, lineChartData);
    window.myBar = test;
    window.myPie = new Chart(ctx, pieChartData);

}

function adminDisplayProvincialReport(provinceName){
    var returnValue = [];
    var documentDisplayID = "admin-manage-country-reports-areainformation";
    //document.getElementById('admin-manage-country-reports-search').value.trim()
    var searchValue = provinceName;
    var tableName = "Locations";
    var areaLocations = admin3DimensionalSearchArray(tableName,searchValue);
    tableName = "Tradeworkers";
    var tradeworkers = adminGenericDisplayTableSetUp(tableName,"");
    var availableTradeworkers = admin3DimensionalSearchArray(tableName,"Availability=1");
    var totalTradeworkersArea = [];

    var counter = 0;
    //console.log("........................................");
    //console.log("The following is part of reports\n The number of areas within " + provinceName + " " + areaLocations.length);
    returnValue['NumberLocationsIn'] = areaLocations.length;
    var locationsPerArea = [];
    //returnValue['Areas' + provinceName] = areaLocations;
    for(var i = 0;i < areaLocations.length;i++){
        tableName = "LocationsPerUser";
        searchValue = "locationID=" + areaLocations[i]['locationID'];
        locationsPerArea[i] = admin3DimensionalSearchArray(tableName,searchValue);

        //console.log(locationsPerArea[i]);
        for(var t = 0;t < tradeworkers.length;t++){
            var exists = false;
            var isAvailable = false;
            var tradeworkerID = tradeworkers[t]['UserID'];
            if(locationsPerArea[i] != null)
                for(var p = 0; p < locationsPerArea[i].length && !exists;p++){
                    var tradeworkerCompareID = locationsPerArea[i][p]['UserID'];
                    var totalTradeworkerExists = false;
                    var available = false;
                    for(var z = 0;z < totalTradeworkersArea.length;z++){
                        if(totalTradeworkersArea[z]['UserID'] == tradeworkerCompareID){
                            totalTradeworkerExists = true;
                        }
                    }
                    for(var b = 0;b < availableTradeworkers.length;b++){
                        var toCompare = availableTradeworkers[b]['UserID'];
                        if(tradeworkerCompareID == toCompare){
                            available = true;
                        }
                    }
                    if(tradeworkerID == tradeworkerCompareID && !totalTradeworkerExists){
                        exists = true;
                        //totalTradeworkersArea[counter] = available;
                        totalTradeworkersArea[counter++] = tradeworkers[t];
                    }

                }
        }
        //console.log(areaLocations[i]['locationName'] + ": has the following amount of tradeworkers available: " + locationsPerArea[i].length);
    }

    //console.log("The following is tradeworkers available in gauteng " + totalTradeworkersArea.length + " compared to tradeworkers in the provinces combined: " + tradeworkers.length);
    var availableTradeworkersArea = admin2DimensionalSearchArray(totalTradeworkersArea,"Availability=1");
    returnValue['TotalTradeWorkersInArea'] = totalTradeworkersArea.length;
    var requestsPerArea = [];
    tableName = "Quote";
    var quotes = adminGenericDisplayTableSetUp(tableName,"");
    for(var x = 0;x < totalTradeworkersArea.length;x++){
        tradeworkerID = totalTradeworkersArea[x]['UserID'];
        var quoteToAdd = admin2DimensionalSearchArray(quotes,"RequestedUser="+tradeworkerID);
        //console.log(quoteToAdd);
        if(quoteToAdd != null){
            requestsPerArea.push(quoteToAdd);
        }
    }

    if(requestsPerArea.length > 0){
        returnValue['RequestsInAreaArray'] = requestsPerArea;
        returnValue['TotalRequest'] = requestsPerArea.length;
    }

    returnValue['TotalTradeWorkersInAreaArray'] = totalTradeworkersArea;
    returnValue['TotalTradeWorkersAvailableInArea'] = availableTradeworkersArea.length;
    returnValue['TotalTradeWorkersAvailableInAreaArray'] = availableTradeworkersArea;
    //console.log(areaLocations);
    //console.log(tradeworkers);
    //console.log(totalTradeworkersArea);
    //console.log("........................................");
    return returnValue;
}

function adminDisplayBlockUser(){
    var tableName = 'RegisteredUsers';
    var searchValue = document.getElementById('admin-manage-block-user-search').value;
    if(adminRequestArray.hasOwnProperty(tableName) && adminRequestArray[tableName].length > 0){
        var tablesToPrint = adminGenericDisplayTableSetUp(tableName,searchValue);
        adminDisplayGenericTable(tablesToPrint,'admin-manage-block-user-areainformation','block-table');
    }
    else{
        document.getElementById('admin-manage-block-user-areainformation').innerHTML = "<h5>The table selected [" + tableName + "] does not exist on the database</h5>";
    }
}

function adminGenericDisplayTable(){
    var tableName = document.getElementById('admin-manage-tables-select').value;
    var searchValue = document.getElementById('admin-manage-tables-search').value;
    if(adminRequestArray.hasOwnProperty(tableName) && adminRequestArray[tableName].length > 0){
        var tablesToPrint = adminGenericDisplayTableSetUp(tableName,searchValue);
        adminDisplayGenericTable(tablesToPrint,'admin-manage-tables-areainformation','generic-table');
        SetUpTableSortBySelect('generic-table-headers','admin-view-table-sortBy')
    }
    else{
        document.getElementById('admin-manage-tables-areainformation').innerHTML = "<h5>The table selected does not have any entries currently</h5>";
    }

}

function adminSearchSpecializationArray(){
    var searchValue = document.getElementById('admin-manage-specialization-search').value;
    var tableName = "Specializations";
    //console.log("The following is the search box value: " + searchValue);

    if(adminRequestArray.hasOwnProperty(tableName) && adminRequestArray[tableName].length > 0) {
        var specializationsArray = adminGenericDisplayTableSetUp(tableName,searchValue);
        adminDisplayGenericTable(specializationsArray,'admin-manage-specialization-areainformation','specialization-table');
    }
}

function admin3DimensionalSearchArray(tableName,searchValue){
    var table = tableName;
    var searchTerm = "";
    var columnName = "";
    if(searchValue.indexOf("=") > 0){
        var spl = searchValue.split("=");
        columnName = spl[0];
        searchTerm = spl[1];
    }
    else{
        searchTerm = searchValue;
    }


    var relevantIndexArray = [];
    var found = false;
    var counter = 0;
    var tableToView = [];
    var fullTable = "";
    //console.log("Choosing generic Table for " + table + " with the following search term: " +searchTerm);
    for(var item in adminRequestArray){
        if(adminRequestArray.hasOwnProperty(item)){
            if(item == table){
                fullTable = item;
                for(var index in adminRequestArray[item]){
                    if(adminRequestArray[item].hasOwnProperty(index)){
                        found = false;
                        for(var name in adminRequestArray[item][index]){
                            if(columnName == ""){
                                if(!found)
                                    if(adminRequestArray[item][index].hasOwnProperty(name)){
                                        if(searchTerm != ""){
                                            var target = adminRequestArray[item][index][name];
                                            var contains = -1;
                                            if (typeof target == "string") {
                                                contains = target.toLowerCase().indexOf(searchTerm.toLowerCase());
                                                if (contains >= 0) {
                                                    //console.log("Found match at " + counter);
                                                    relevantIndexArray.push(counter);
                                                    found = true;
                                                }
                                            }
                                            else {
                                                if (target == searchTerm) {
                                                    relevantIndexArray.push(counter);
                                                    found = true;
                                                }
                                            }
                                        }
                                    }
                            }
                            else{
                                if(name == columnName)
                                    if(!found)
                                        if(adminRequestArray[item][index].hasOwnProperty(name)){
                                            if(searchTerm != ""){
                                                var target = adminRequestArray[item][index][name];
                                                var contains = -1;
                                                if (typeof target == "string") {
                                                    contains = target.toLowerCase().indexOf(searchTerm.toLowerCase());
                                                    if (contains >= 0) {
                                                        //console.log("Found match at " + counter);
                                                        relevantIndexArray.push(counter);
                                                        found = true;
                                                    }
                                                }
                                                else {
                                                    if (target == searchTerm) {
                                                        relevantIndexArray.push(counter);
                                                        found = true;
                                                    }
                                                }
                                            }
                                        }
                            }

                        }
                        counter++;

                    }
                }
            }
        }
    }
    while(relevantIndexArray.length > 0){
        tableToView.push(adminRequestArray[fullTable][relevantIndexArray.pop()]);
    }

    if(tableToView.length > 0){
        return tableToView;
    }
    else{
        tableToView = null;
        return tableToView;
    }
}

function admin2DimensionalSearchArray(array,searchValue){
    //var table = tableName;

    var searchTerm = "";
    var columnName = "";
    if(searchValue.indexOf("=") > 0){
        var spl = searchValue.split("=");
        columnName = spl[0];
        searchTerm = spl[1];
    }
    else{
        searchTerm = searchValue;
    }


    var relevantIndexArray = [];
    var found = false;
    var counter = 0;
    var tableToView = [];
    var fullTable = "";
    //console.log("Choosing generic Table for " + table + " with the following search term: " +searchTerm);
    for(var index in array){
        if(array.hasOwnProperty(index)){
            found = false;
            for(var name in array[index]){
                if(columnName == ""){
                    if(!found)
                        if(array[index].hasOwnProperty(name)){
                            if(searchTerm != ""){
                                var target = array[index][name];
                                var contains = -1;
                                if (typeof target == "string") {
                                    contains = target.toLowerCase().indexOf(searchTerm.toLowerCase());
                                    if (contains >= 0) {
                                        //console.log("Found match at " + counter);
                                        relevantIndexArray.push(counter);
                                        found = true;
                                    }
                                }
                                else {
                                    if (target == searchTerm) {
                                        relevantIndexArray.push(counter);
                                        found = true;
                                    }
                                }
                            }
                        }
                }
                else{
                    if(name == columnName)
                        if(!found)
                            if(array[index].hasOwnProperty(name)){
                                if(searchTerm != ""){
                                    var target = array[index][name];
                                    var contains = -1;
                                    if (typeof target == "string") {
                                        contains = target.toLowerCase().indexOf(searchTerm.toLowerCase());
                                        if (contains >= 0) {
                                            //console.log("Found match at " + counter);
                                            relevantIndexArray.push(counter);
                                            found = true;
                                        }
                                    }
                                    else {
                                        if (target == searchTerm) {
                                            relevantIndexArray.push(counter);
                                            found = true;
                                        }
                                    }
                                }
                            }
                }

            }
            counter++;

        }
    }

    while(relevantIndexArray.length > 0){
        tableToView.push(array[relevantIndexArray.pop()]);
    }

    if(tableToView.length > 0){
        return tableToView;
    }
    else{
        tableToView = null;
        return tableToView;
    }
}

function admin2DimensionalAndSearchArray(array,searchValue,searchValue1){
    //var table = tableName;
    //console.log("The following values are coming in: " + searchValue1 + " " + searchValue);
    var searchTerm = "";
    var columnName = "";
    if(searchValue.indexOf("=") > 0){
        var spl = searchValue.split("=");
        columnName = spl[0];
        searchTerm = spl[1];
    }
    else{
        searchTerm = searchValue;
    }

    var searchTerm1 = "";
    var columnName1 = "";
    if(searchValue1.indexOf("=") > 0){
        var spl1 = searchValue1.split("=");
        columnName1 = spl1[0];
        searchTerm1 = spl1[1];
    }
    else{
        searchTerm1 = searchValue1;
    }
    var target = null;
    var contains = -1;
    var contains1 = -1;
    var foundA = false;
    var foundB = false;
    var relevantIndexArray = [];
    var found = false;
    var counter = 0;
    var tableToView = [];
    var fullTable = "";

    //console.log("Choosing generic Table for " + table + " with the following search term: " +searchTerm);
    for(var index in array){
        if(array.hasOwnProperty(index)){
            //console.log("Searching through: " + index + " looking for " + columnName + "=" + searchTerm + " and " + columnName1  + "=" + searchTerm1);
            found = false;
            foundA = false;
            foundB = false;
            for(var name in array[index]){
                if(columnName == "" && columnName1 == ""){
                    if(!foundA || !foundB)
                        if(array[index].hasOwnProperty(name)){
                            if(searchTerm != ""){
                                target = array[index][name];
                                contains = -1;
                                contains1 = -1;
                                if (typeof target == "string") {
                                    contains = target.toLowerCase().indexOf(searchTerm.toLowerCase());
                                    contains1 = target.toLowerCase().indexOf(searchTerm1.toLowerCase());
                                    if (contains >= 0 || contains>=0) {
                                        console.log("Found match at " + counter);
                                        if(contains > 0){
                                            foundA = true;
                                        }
                                        if(contains1 > 0){
                                            foundB = true;
                                        }

                                    }
                                }
                                else {
                                    if (target == searchTerm) {
                                        console.log("Found match at " + counter);
                                        foundA = true;
                                    }
                                    else if(target == searchTerm1){
                                        console.log("Found match at " + counter);
                                        foundB = true;
                                    }
                                }
                            }
                        }
                }
                else{
                    if(name == columnName){
                        if(!foundA || !foundB){
                            if(array[index].hasOwnProperty(name)){
                                if(searchTerm != ""){
                                    target = array[index][name];
                                    contains = -1;
                                    if (typeof target == "string") {
                                        contains = target.toLowerCase().indexOf(searchTerm.toLowerCase());

                                        if (contains >= 0) {
                                            console.log("Found match at " + counter);
                                            if(contains > 0){
                                                foundA = true;
                                            }
                                        }
                                    }
                                    else {
                                        if (target == searchTerm) {
                                            console.log("4Found match at " + counter + " target: " + target + " searchTerm: " + searchTerm);
                                            foundA = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if(name == columnName1){
                        if(!foundA || !foundB){
                            if(array[index].hasOwnProperty(name)){
                                if(searchTerm != ""){
                                    target = array[index][name];
                                    contains = -1;
                                    if (typeof target == "string") {
                                        contains = target.toLowerCase().indexOf(searchTerm1.toLowerCase());

                                        if (contains >= 0) {
                                            console.log("Found match at " + counter);
                                            if(contains > 0){
                                                foundB = true;
                                            }
                                        }
                                    }
                                    else {
                                        if(target == searchTerm1){
                                            console.log("5Found match at " + counter);
                                            foundB = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
            if(foundA && foundB){
                relevantIndexArray.push(counter);
            }
            counter++;

        }

    }

    while(relevantIndexArray.length > 0){
        tableToView.push(array[relevantIndexArray.pop()]);
    }

    if(tableToView.length > 0){
        return tableToView;
    }
    else{
        tableToView = null;
        return tableToView;
    }
}

function admin2DimensionalOrSearchArray(array,searchValue,searchValue1){
    //var table = tableName;
    console.log("The following values are coming in: " + searchValue1 + " " + searchValue);
    var searchTerm = "";
    var columnName = "";
    if(searchValue.indexOf("=") > 0){
        var spl = searchValue.split("=");
        columnName = spl[0];
        searchTerm = spl[1];
    }
    else{
        searchTerm = searchValue;
    }

    var searchTerm1 = "";
    var columnName1 = "";
    if(searchValue1.indexOf("=") > 0){
        var spl1 = searchValue1.split("=");
        columnName1 = spl1[0];
        searchTerm1 = spl1[1];
    }
    else{
        searchTerm1 = searchValue1;
    }
    var target = null;
    var contains = -1;
    var contains1 = -1;
    var foundA = false;
    var foundB = false;
    var relevantIndexArray = [];
    var found = false;
    var counter = 0;
    var tableToView = [];
    var fullTable = "";

    //console.log("Choosing generic Table for " + table + " with the following search term: " +searchTerm);
    for(var index in array){
        if(array.hasOwnProperty(index)){
            //console.log("Searching through: " + index + " looking for " + columnName + "=" + searchTerm + " and " + columnName1  + "=" + searchTerm1);
            found = false;
            foundA = false;
            foundB = false;
            for(var name in array[index]){
                if(columnName == "" && columnName1 == ""){
                    if(!foundA && !foundB)
                        if(array[index].hasOwnProperty(name)){
                            if(searchTerm != ""){
                                target = array[index][name];
                                contains = -1;
                                contains1 = -1;
                                if (typeof target == "string") {
                                    contains = target.toLowerCase().indexOf(searchTerm.toLowerCase());
                                    contains1 = target.toLowerCase().indexOf(searchTerm1.toLowerCase());
                                    if (contains >= 0 || contains>=0) {
                                        //console.log("1Found match at " + counter);
                                        if(contains > 0){
                                            foundA = true;
                                        }
                                        if(contains1 > 0){
                                            foundB = true;
                                        }

                                    }
                                }
                                else {
                                    if (target == searchTerm) {
                                        //console.log("2Found match at " + counter);
                                        foundA = true;
                                    }
                                    else if(target == searchTerm1){
                                        //console.log("3Found match at " + counter);
                                        foundB = true;
                                    }
                                }
                            }
                        }
                }
                else{
                    if(name == columnName){
                        if(!foundA && !foundB){
                            if(array[index].hasOwnProperty(name)){
                                if(searchTerm != ""){
                                    target = array[index][name];
                                    contains = -1;
                                    if (typeof target == "string") {
                                        contains = target.toLowerCase().indexOf(searchTerm.toLowerCase());

                                        if (contains >= 0) {
                                            //console.log("Found match at " + counter);
                                            if(contains > 0){
                                                foundA = true;
                                            }
                                        }
                                    }
                                    else {
                                        if (target == searchTerm) {
                                            //console.log("4Found match at " + counter + " target: " + target + " searchTerm: " + searchTerm);
                                            foundA = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if(name == columnName1){
                        if(!foundA && !foundB){
                            if(array[index].hasOwnProperty(name)){
                                if(searchTerm != ""){
                                    target = array[index][name];
                                    contains = -1;
                                    if (typeof target == "string") {
                                        contains = target.toLowerCase().indexOf(searchTerm1.toLowerCase());

                                        if (contains >= 0) {
                                            console.log("Found match at " + counter);
                                            if(contains > 0){
                                                foundB = true;
                                            }
                                        }
                                    }
                                    else {
                                        if(target == searchTerm1){
                                            console.log("5Found match at " + counter);
                                            foundB = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
            if(foundA || foundB){
                relevantIndexArray.push(counter);
            }
            counter++;

        }

    }

    while(relevantIndexArray.length > 0){
        tableToView.push(array[relevantIndexArray.pop()]);
    }

    if(tableToView.length > 0){
        return tableToView;
    }
    else{
        tableToView = null;
        return tableToView;
    }
}

function adminGenericDisplayTableSetUp(tableName,searchValue){
    var table = tableName;
    var searchTerm = "";
    var columnName = "";
    if(searchValue.indexOf("=") > 0){
        var spl = searchValue.split("=");
        columnName = spl[0];
        searchTerm = spl[1];
    }
    else{
        searchTerm = searchValue;
    }


    var relevantIndexArray = [];
    var found = false;
    var counter = 0;
    var tableToView = [];
    var fullTable = "";
    //console.log("Choosing generic Table for " + table + " with the following search term: " +searchTerm);
    for(var item in adminRequestArray){
        if(adminRequestArray.hasOwnProperty(item)){
            if(item == table){
                fullTable = item;
                for(var index in adminRequestArray[item]){
                    if(adminRequestArray[item].hasOwnProperty(index)){
                        found = false;
                        for(var name in adminRequestArray[item][index]){
                            if(columnName == ""){
                                if(!found)
                                    if(adminRequestArray[item][index].hasOwnProperty(name)){
                                        if(searchTerm != ""){
                                            var target = adminRequestArray[item][index][name];
                                            var contains = -1;
                                            if (typeof target == "string") {
                                                contains = target.toLowerCase().indexOf(searchTerm.toLowerCase());
                                                if (contains >= 0) {
                                                    //console.log("Found match at " + counter);
                                                    relevantIndexArray.push(counter);
                                                    found = true;
                                                }
                                            }
                                            else {
                                                if (target == searchTerm) {
                                                    relevantIndexArray.push(counter);
                                                    found = true;
                                                }
                                            }
                                        }
                                    }
                            }
                            else{
                                if(name == columnName)
                                    if(!found)
                                        if(adminRequestArray[item][index].hasOwnProperty(name)){
                                            if(searchTerm != ""){
                                                var target = adminRequestArray[item][index][name];
                                                var contains = -1;
                                                if (typeof target == "string") {
                                                    contains = target.toLowerCase().indexOf(searchTerm.toLowerCase());
                                                    if (contains >= 0) {
                                                        //console.log("Found match at " + counter);
                                                        relevantIndexArray.push(counter);
                                                        found = true;
                                                    }
                                                }
                                                else {
                                                    if (target == searchTerm) {
                                                        relevantIndexArray.push(counter);
                                                        found = true;
                                                    }
                                                }
                                            }
                                        }
                            }

                        }
                        counter++;

                    }
                }
            }
        }
    }
    while(relevantIndexArray.length > 0){
        tableToView.push(adminRequestArray[fullTable][relevantIndexArray.pop()]);
    }

    if(tableToView.length > 0){
        return tableToView;
    }
    else{
        tableToView = adminRequestArray[fullTable];
        return tableToView;
    }
}

function adminUserGenericSortSelectFill(selectID,array){
    var select = document.getElementById(selectID);
    select.innerHTML = "";
    for(var i = 0;i < array.length;i++){
        select.innerHTML += '<option value="' + ((i) * 2) + '">' + array[i] + '(asc)</option>';
        select.innerHTML += '<option value="' + (((i) * 2) + 1) + '">' + array[i] + '(dsc)</option>';
    }
}

function SetUpTableSortBySelect(tableName,selectID){
    var table = document.getElementById(tableName);
    var tr = table.getElementsByTagName("tr");
    var headers = [];
    for(var i = 0;i < tr.length;i++){
        var th = tr[i].getElementsByTagName("th");

        for(var j = 0;j<th.length;j++){
            //console.log("The following is the table headers!!!!!!! " + th[j].innerHTML);
            headers.push(th[j].innerHTML);
        }

    }
    adminUserGenericSortSelectFill(selectID,headers);
}

function adminDisplayGenericTable(tableToDisplay,displayElementID,tableName){
    var onceOff = false;
    var tableStart = "<table>";
    var tableHead = "<thead id='" + tableName + "-headers'>";
    var endTableHead = "</thead><tbody id='" + tableName + "'>";
    var tableEnd = "</tbody></table>";
    var tableBody = "";
    var tableConstructed = "";
    //console.log("Attempting to display table:" + tableToDisplay);
    if(tableToDisplay.length > 0) {
        for (var item in tableToDisplay) {
            if (tableToDisplay.hasOwnProperty(item)) {
                tableBody += '<tr>';
                for (var index in tableToDisplay[item]) {
                    if (tableToDisplay[item].hasOwnProperty(index)) {
                        if (!onceOff) {
                            tableHead += '<th>' + index + '</th>';
                        }

                        tableBody += '<td>' + tableToDisplay[item][index] + '</td>';
                    }
                }
                tableBody += '</tr>';
                onceOff = true;
            }
        }

        if(onceOff){
            document.getElementById(displayElementID).innerHTML = tableStart + tableHead + endTableHead + tableBody + tableEnd;
        }
    }
    else{
        console.log("Something went wrong in displaying of tables");
    }
}

function adminDisplaySpecializations(specializationsArray){
    console.log("Displaying specializations: ");
    var html = '<table>' +
        '<thead>' +
        '<th colspan="1">ID</th>' +
        '<th colspan="2">WorkType</th>' +
        '<th colspan="2">Description</th>' +
        '<th colspan="1">Selected</th>' +
        '</thead><tbody>';
    for(var j = 0;j < specializationsArray.length;j++){
        html += '<tr>' +
            '<td colspan="1"> ' + specializationsArray[j]['workTypeID'] + '</td>' +
            '<td colspan="2"> ' + specializationsArray[j]['WorkType'] + '</td>' +
            '<td colspan="3"> ' + specializationsArray[j]['Description'] + '</td>' +
            '</tr>';

    }
    html += '</tbody></table>';
    document.getElementById('admin-manage-specialization-areainformation').innerHTML = html;
}