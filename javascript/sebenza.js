/*
* AJAX login
* http://stackoverflow.com/questions/16323360/submitting-html-form-using-jquery-ajax
* http://www.ondeweb.in/ajax-login-form-with-jquery-and-php/
* http://stackoverflow.com/questions/4038567/prevent-redirect-after-form-is-submitted
 */

$(document).ready(function () {
    //Prevents form submission from activating a page refresh
    $('form').submit(function () {return false;});
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    if(sPage == "areainformation-page.php"){
        sendAJAXRequest('fetch-worker-locations',handleFetchWorkerLocations);
    }else if(sPage == "userPage.php"){

    }

    setPanelSizeAccordingToScreen();
    //graphTestRun();
    $("#areainformation-medium-large")
        .on("on.zf.toggler", function(e) {
            if(document.getElementById('login-medium-large').style.display == 'block'){
                $('#login-medium-large').foundation('toggle');
            }
        })
        .on("off.zf.toggler", function(e) {
        });

    $("#login-medium-large")
        .on("on.zf.toggler", function(e) {
            if(document.getElementById('areainformation-medium-large').style.display == 'block'){
                $('#areainformation-medium-large').foundation('toggle');
            }
        })
        .on("off.zf.toggler", function(e) {
        });
});

var NOTIFICATION_DISPLAY_TIMEOUT = 5000;  //How long a notification shows
var NEXT_NOTIFICATION_DELAY = 1000;  //How long between notifications - has to be longer than notification animation
var NOTIFICATION_PULL_INTERVAL = 15000; //How often notifications are pulled from the server
var notificationArray = []; //Stores the notifications fetched from the server
var skillCounter = 0;
var tradeWorkerLocation = 0;
var locationAmount = 0;
var locationsElements = [];

function startNotificationPulls() {
    sendAJAXRequest('fetch_notifications', handleNotifications);
    setInterval(sendAJAXRequest, NOTIFICATION_PULL_INTERVAL, 'fetch_notifications', handleNotifications);
    setInterval(sendAJAXRequest,60000,'fetch-job-requests',handleFetchJobRequests);

}



function handleNotifications(response) {
    var notifications = JSON.parse(response);
    var originalNotificationCount = notificationArray.length;
    if (Array.isArray(notifications) && notifications.length >= 1) {
        for (var i = 0; i < notifications.length; i++) {
            if (typeof notifications[i] == 'string') {
                notificationArray.push(notifications[i]);
                console.log("Added notification: " + notifications[i]);
            }
        }
        if (originalNotificationCount == 0) {
            showNotification();
        }
    }
}

function showNotification() {
    if (notificationArray.length > 0 && typeof notificationArray[0] == 'string') {
        document.getElementById('notification-content').innerHTML = notificationArray[0];
        toggleNotification();
        setTimeout(closeNotification, NOTIFICATION_DISPLAY_TIMEOUT);
    }
}

function closeNotification() {
    toggleNotification();
    notificationArray.shift();
    if (notificationArray.length > 0) {
        setTimeout(showNotification, NEXT_NOTIFICATION_DELAY);
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


function toggleNotification() {
    $('#notification-panel').foundation('toggle');
}

function modalToggler(){
    redirectToHome();
}

function sendAJAXPictures (action,responseFunction,formID) {
    if (typeof action == 'string' && typeof responseFunction == 'function' && (typeof formID == 'string' || formID == null)) {
        //Validate the form
        if (formID != null) {
            if (validateForm(formID)) {
                //Upon successful validation, build the ajax data object
                //Generate the input from the input tags of the form
                var form = document.getElementById(formID);
                //console.log(formData);
                if (form != null) {
                    var forms = document.forms.namedItem(formID);
                    var oData = new FormData(forms);
                    oData.append("action",action);
                    var inputTags = form.getElementsByTagName('input');
                    if (inputTags.length > 0) {
                        var inputTag;
                        var i;
                        for (i = 0; i < inputTags.length; i++) {
                            inputTag = inputTags[i];
                            //document.querySelector(inputTag);
                            if(inputTag.name.substr(inputTag.name.length - 6) == "switch"){
                                oData.append(inputTag.name.substr(7),document.getElementById(inputTag.name.substr(7)).checked);
                            }
                        }
                    }
                    console.log("..3..");
                    //of shows as an error but it does work the current javascript library that exists within phpStorm for checking I think it may be deprecated
                    for(var pair of oData.entries()) {
                        console.log(pair[0]+ ', '+ pair[1]);
                    }
                    console.log("..3..");
                }
                //All ajax requests are handled by php/classes/SebenzaServer.php
                $.ajax({
                    type: 'POST',
                    url: 'https://sebenzasa.azurewebsites.net/php/classes/SebenzaServer.php',
                    data: oData,
                    cache       : false,
                    contentType : false,
                    processData : false,
                    success: responseFunction
                });
            }
        } else {
            $.ajax({
                type: 'POST',
                url: 'https://sebenzasa.azurewebsites.net/php/classes/SebenzaServer.php.php',
                data: {action: action},
                success: responseFunction
            });
        }
    }

}

function sendAJAXRequest (action, responseFunction, formID) {
    //Check the types of the parameters
    if (typeof action == 'string' && typeof responseFunction == 'function' && (typeof formID == 'string' || formID == null)) {
        //Validate the form
        if (formID != null) {
            if (validateForm(formID)) {
                //Upon successful validation, build the ajax data object
                var objectJSON = '{"action":"' + action + '"';
                //Generate the input from the input tags of the form
                var form = document.getElementById(formID);
                //console.log(formData);
                if (form != null) {
                    var forms = document.forms.namedItem(formID);
                    var oData = new FormData(forms);
                    oData.append("action",action);
                    console.log(oData);
                    var inputTags = form.getElementsByTagName('input');
                    var selectTags = form.getElementsByTagName('select');
                    var textareaTags = form.getElementsByTagName('textarea');
                    if (inputTags.length > 0) {
                        var inputTag;
                        var i;
                        for (i = 0; i < inputTags.length; i++) {
                            inputTag = inputTags[i];
                            //document.querySelector(inputTag);
                            objectJSON += ', "' + inputTag.name + '":"' + inputTag.value + '"';
                            if(inputTag.name.substr(inputTag.name.length - 6) == "switch"){
                                objectJSON += ', "' + inputTag.name.substr(7) + '":"' + document.getElementById(inputTag.name.substr(7)).checked + '"';
                            }
                        }
                    }
                    if (selectTags.length > 0) {
                        var selectTag;
                        var j;
                        for (j = 0; j < selectTags.length; j++) {
                            selectTag = selectTags[j];
                            objectJSON += ', "' + selectTag.name + '":"' + selectTag.value + '"';
                        }
                    }
                    if (textareaTags.length > 0) {
                        var textareaTag;
                        var k;
                        for (k = 0; k < textareaTags.length; k++) {
                            textareaTag = textareaTags[k];
                            objectJSON += ', "' + textareaTag.name + '":"' + textareaTag.value + '"';
                        }
                    }
                }
                objectJSON += '}';
                console.log(objectJSON);
                var dataObject = JSON.parse(objectJSON);
                //All ajax requests are handled by php/classes/SebenzaServer.php
                $.ajax({
                    type: 'POST',
                    url: 'https://sebenzasa.azurewebsites.net/php/classes/SebenzaServer.php',
                    data: dataObject,
                    success: responseFunction
                });
            }
        } else {
            $.ajax({
                type: 'POST',
                url: 'https://sebenzasa.azurewebsites.net/php/classes/SebenzaServer.php',
                data: {action: action},
                success: responseFunction
            });
        }
    }
}

function handleLoginResponse(response) {
    var success = JSON.parse(response);
    console.log(success);
    if (success) {
        window.location = 'userPage.php';
    } else {
        var displayProperty = document.getElementById('invalid-credentials-message').style.display.toLowerCase();
        if (displayProperty == '' || displayProperty == 'none') {
            $('#invalid-credentials-message').foundation('toggle');
        }
    }
}

function switchToPage(page){
    console.log("Switching pages");
    window.location = page;

}

function fillInAdditionalAreaSearch(inputID){
    if(typeof inputID == 'string') {
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById(inputID)),
            {types: ['geocode']});
        fillInAddressID = inputID.substring(0,inputID.length - 12);
        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', genericChangeMapsLocation);
    }
    else{
        console.log("inputID is wrong type should be String is: " + typeof inputID)
    }
}

function genericChangeMapsLocation(){
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
        search();
    } else {
        document.getElementById('autocomplete').placeholder = 'Enter a city';
    }
}

function handleTradeworkerRegisterResponse(response){
    console.log("Handling register response: " + response);
    var success = JSON.parse(response) ;
    console.log("Registering: response " + success);
    if(typeof success == 'number'){
        var html = '';
        if(success == 1){
             html = '<h1>You are now Registered!</h1>' +
                    '<p class="lead">Please access your email address</p>' +
                    '<p>Click on the link provided within email to complete registration and gain access to the site!</p>' +
                    '<p>This will only be available for a month</p>';
            document.getElementById('tradeWorker-register-modal-information').innerHTML = html;
            $('#tradeWorker-register-modal').foundation('toggle');
        }
        else{
            html = '<h1>REGISTRATION FAILED</h1>';
            var focus = false;
            if(success %2 == 0){
                var displayProperty = document.getElementById('unique-email-tradeWorker-info').style.display.toLowerCase();
                if (displayProperty == '' || displayProperty == 'none') {
                    $('#unique-email-tradeWorker-info').foundation('toggle');
                    if(!focus){
                        $('#email-tradeWorker').focus();
                        focus = true;
                    }
                }
                success /= 2;
            }
            else{
                var displayProperty = document.getElementById('unique-email-tradeWorker-info').style.display.toLowerCase();
                if (displayProperty == 'block') {
                    $('#unique-email-tradeWorker-info').foundation('toggle');
                }
            }
            if(success %3 == 0){
                var displayProperty = document.getElementById('unique-username-tradeWorker-info').style.display.toLowerCase();
                if (displayProperty == '' || displayProperty == 'none') {
                    $('#unique-username-tradeWorker-info').foundation('toggle');
                    if(!focus){
                        $('#username-tradeWorker').focus();
                        focus = true;
                    }
                }
                success /= 3;
            }
            else{
                var displayProperty = document.getElementById('unique-username-tradeWorker-info').style.display.toLowerCase();
                if (displayProperty == 'block') {
                    $('#unique-username-tradeWorker-info').foundation('toggle');
                }
            }
            if(success %5 == 0){
                var displayProperty = document.getElementById('unique-identity-tradeWorker-info').style.display.toLowerCase();
                if (displayProperty == '' || displayProperty == 'none') {
                    $('#unique-identity-tradeWorker-info').foundation('toggle');
                    if(!focus){
                        $('#identity-tradeWorker').focus();
                        focus = true;
                    }
                }
                success /= 5;
            }
            else{
                var displayProperty = document.getElementById('unique-identity-tradeWorker-info').style.display.toLowerCase();
                if (displayProperty == 'block') {
                    $('#unique-identity-tradeWorker-info').foundation('toggle');
                }
            }
            if(success %101 == 0 && success > 100){
                var displayProperty = document.getElementById('unreachable-email-tradeWorker-info').style.display.toLowerCase();
                if (displayProperty == '' || displayProperty == 'none') {
                    $('#unreachable-email-tradeWorker-info').foundation('toggle');
                    if(!focus){
                        $('#email-tradeWorker').focus();
                        focus = true;
                    }
                }
                success /= 101;
            }
            else{
                var displayProperty = document.getElementById('unreachable-email-tradeWorker-info').style.display.toLowerCase();
                if (displayProperty == 'block') {
                    $('#unreachable-email-tradeWorker-info').foundation('toggle');
                }
            }
            if(success %7 == 0){
                html += '<p class="lead">Please contact admin for further assistance provide error code in email</p>' +
                    '<p>error-code: ' + success + '</p>';

                document.getElementById('tradeWorker-register-modal-information').innerHTML = html;
                $('#tradeWorker-register-modal').foundation('toggle');
            }
        }
    }
    else
    {
        console.log("Return type is not a boolean it is: " + typeof success);
    }
}

function handleHomeUserRegisterResponse(response){
    console.log("Handling register response: " + response);
    var success = JSON.parse(response) ;
    console.log("Registering: response " + success);
    if(typeof success == 'number'){
        var html = '';
        if(success == 1){
            html = '<h1>You are now Registered!</h1>' +
                '<p class="lead">Please access your email address</p>' +
                '<p>Click on the link provided within email to complete registration and gain access to the site!</p>' +
                '<p>This will only be available for a month</p>';
            document.getElementById('homeuser-register-modal-information').innerHTML = html;
            $('#homeuser-register-modal').foundation('toggle');
        }
        else{
            html = '<h1>REGISTRATION FAILED</h1>';
            var focus = false;
            if(success %2 == 0){
                var displayProperty = document.getElementById('unique-email-homeuser-info').style.display.toLowerCase();
                if (displayProperty == '' || displayProperty == 'none') {
                    $('#unique-email-homeuser-info').foundation('toggle');
                    if(!focus){
                        $('#email-homeuser').focus();
                        focus = true;
                    }
                }
                success /= 2;
            }
            else{
                var displayProperty = document.getElementById('unique-email-homeuser-info').style.display.toLowerCase();
                if (displayProperty == 'block') {
                    $('#unique-email-homeuser-info').foundation('toggle');
                }
            }
            if(success %3 == 0){
                var displayProperty = document.getElementById('unique-username-homeuser-info').style.display.toLowerCase();
                if (displayProperty == '' || displayProperty == 'none') {
                    $('#unique-username-homeuser-info').foundation('toggle');
                    if(!focus){
                        $('#username-homeuser').focus();
                        focus = true;
                    }
                }
                success /= 3;
            }
            else{
                var displayProperty = document.getElementById('unique-username-homeuser-info').style.display.toLowerCase();
                if (displayProperty == 'block') {
                    $('#unique-username-homeuser-info').foundation('toggle');
                }
            }
            if(success %5 == 0){
                var displayProperty = document.getElementById('unique-identity-homeuser-info').style.display.toLowerCase();
                if (displayProperty == '' || displayProperty == 'none') {
                    $('#unique-identity-homeuser-info').foundation('toggle');
                    if(!focus){
                        $('#identity-homeuser').focus();
                        focus = true;
                    }
                }
                success /= 5;
            }
            else{
                var displayProperty = document.getElementById('unique-identity-homeuser-info').style.display.toLowerCase();
                if (displayProperty == 'block') {
                    $('#unique-identity-homeuser-info').foundation('toggle');
                }
            }
            if(success %101 == 0 && success > 100){
                var displayProperty = document.getElementById('unreachable-email-homeuser-info').style.display.toLowerCase();
                if (displayProperty == '' || displayProperty == 'none') {
                    $('#unreachable-email-homeuser-info').foundation('toggle');
                    if(!focus){
                        $('#email-homeuser').focus();
                        focus = true;
                    }
                }
                success /= 101;
            }
            else{
                var displayProperty = document.getElementById('unreachable-email-homeuser-info').style.display.toLowerCase();
                if (displayProperty == 'block') {
                    $('#unreachable-email-homeuser-info').foundation('toggle');
                }
            }
            if(success %7 == 0){
                html += '<p class="lead">Please contact admin for further assistance provide error code in email</p>' +
                    '<p>error-code: ' + success + '</p>';

                document.getElementById('homeuser-register-modal-information').innerHTML = html;
                $('#homeuser-register-modal').foundation('toggle');
            }
        }
    }
    else
    {
        console.log("Return type is not a boolean it is: " + typeof success);
    }
}

function handleRegisterResponse(response) {
    console.log("Handling register response: " + response);
    var success = JSON.parse(response);
    console.log("Registering: response " + success);
    if(typeof success == 'boolean'){
    if (success) {
        document.getElementById("register-modal-button").click();
    }
    else{
        console.log("Registration failed");
    }
    }
    else{
        console.log("Return type is not a boolean it is: " + typeof success);
        if(typeof success == 'number'){
            var errorCode = parseFloat(success);
            while(errorCode != 1){
                if(errorCode % 2 == 0){
                    var displayProperty = document.getElementById('unique-username-contractor-info').style.display.toLowerCase();
                    if (displayProperty == '' || displayProperty == 'none') {
                        $('#unique-username-contractor-info').foundation('toggle');
                    }
                    errorCode /= 2;
                }
                else {
                    var displayProperty = document.getElementById('unique-username-contractor-info').style.display.toLowerCase();
                    if (displayProperty != 'block') {
                        $('#unique-username-contractor-info').foundation('toggle');
                    }
                }
                if(errorCode % 3 == 0){
                    var displayProperty = document.getElementById('unique-email-contractor-info').style.display.toLowerCase();
                    if (displayProperty == '' || displayProperty == 'none') {
                        $('#unique-email-contractor-info').foundation('toggle');
                    }
                    errorCode /= 3;
                }
                    else{
                    var displayProperty = document.getElementById('unique-email-contractor-info').style.display.toLowerCase();
                    if (displayProperty == 'block') {
                        $('#unique-email-contractor-info').foundation('toggle');
                    }
                }
                if(errorCode % 5 == 0){
                    var displayProperty = document.getElementById('unique-vat-contractor-info').style.display.toLowerCase();
                    if (displayProperty == '' || displayProperty == 'none') {
                        $('#unique-vat-contractor-info').foundation('toggle');
                    }
                    errorCode /= 5;
                }
                    else{
                    var displayProperty = document.getElementById('unique-vat-contractor-info').style.display.toLowerCase();
                    if (displayProperty == 'block') {
                        $('#unique-vat-contractor-info').foundation('toggle');
                    }
                }
                if(errorCode % 7 == 0){
                    var displayProperty = document.getElementById('unique-reg-contractor-info').style.display.toLowerCase();
                    if (displayProperty == '' || displayProperty == 'none') {
                        $('#unique-reg-contractor-info').foundation('toggle');
                    }
                    errorCode /= 7;
                }
                    else{
                    var displayProperty = document.getElementById('unique-reg-contractor-info').style.display.toLowerCase();
                    if (displayProperty == 'block') {
                        $('#unique-reg-contractor-info').foundation('toggle');
                    }
                }
                if(errorCode % 11 == 0){
                    var displayProperty = document.getElementById('unique-busName-info').style.display.toLowerCase();
                    if (displayProperty == '' || displayProperty == 'none') {
                        $('#unique-busName-info').foundation('toggle');
                    }
                    errorCode /= 11;
                }
                    else{
                    var displayProperty = document.getElementById('unique-busName-info').style.display.toLowerCase();
                    if (displayProperty == 'block') {
                        $('#unique-busName-info').foundation('toggle');
                    }
                }
                if(errorCode % 13 == 0){
                    var displayProperty = document.getElementById('unreachable-email-contractor-info').style.display.toLowerCase();
                    if (displayProperty == '' || displayProperty == 'none') {
                        $('#unreachable-email-contractor-info').foundation('toggle');
                    }
                    errorCode /= 13;
                }
                else{
                    var displayProperty = document.getElementById('unreachable-email-contractor-info').style.display.toLowerCase();
                    if (displayProperty == 'block') {
                        $('#unreachable-email-contractor-info').foundation('toggle');
                    }
                }
            }
        }
    }

}

function handleLogoutResponse(response) {
    var success = JSON.parse(response);
    if (success) {
        window.location = '/';
    } else {
        console.log("Logout Failed");
    }
}

var alphaNumericRE = /^\w*$/; //a-zA-Z0-9_

function validateForm(formID) {
    var success = true;
    var focus = false;
    if (typeof formID == 'string') {
        //Collect input tags belonging to the form
        var form = document.getElementById(formID);
        if (form != null) {
            var inputTags = form.getElementsByTagName('input');
            var selectTags = form.getElementsByTagName('select');
            var textareaTags = form.getElementsByTagName('textarea');
            var currentSelectSuccess = true;
            if(selectTags.length > 0){
                var selectTag;
                for(var j = 0; j < selectTags.length; j++){
                    selectTag = selectTags[j];
                    console.log(selectTag.name + " " + selectTag.value);
                    if (selectTag.name.substring(0,6) != "ignore") {

                        var selectToggleID = selectTag.name + '-info';
                        //remove the line underneath once all forms have been completed
                        //console.log("These are the input tag names: " + inputTag.name);
                        var selectFoundationID = '#' + selectToggleID;
                        var selectClassName = selectTag.className;
                        var selectDisplayProperty = document.getElementById(selectToggleID).style.display.toLowerCase();
                        //console.log("These are the select tag names: " + selectTag.name + "the following is the length of the select tag: " + selectTag.value.length);
                        //Required field validation
                        if (selectClassName.indexOf("REQ_VAL") > -1 && selectTag.value.length == 0) {
                            currentSelectSuccess = false;
                            if(!focus){
                                //console.log("Focusing on " + selectTag.name);
                                document.getElementById(selectTag.name).focus();
                                focus = true;
                            }
                        }
                        //Toggle display of messages
                        if (currentSelectSuccess && selectDisplayProperty != '' && selectDisplayProperty != 'none') {
                            $(selectFoundationID).foundation('toggle');
                        } else if (!currentSelectSuccess && (selectDisplayProperty == '' || selectDisplayProperty == 'none')) {
                            $(selectFoundationID).foundation('toggle');

                        }
                        success &= currentSelectSuccess;
                    }
                }
            }
            else {
                console.log("The form " + formID + " had no select elements to validate.");
            }
            var currentTextareaSuccess = true;
            if(textareaTags.length > 0){
                var textareaTag;
                for(var l = 0; l < textareaTags.length; l++){
                    textareaTag = textareaTags[l];
                    //console.log(" The follwoing is the text area:" + textareaTag);
                    console.log(textareaTag.name + " " + textareaTag.value);
                    if (textareaTag.name.substring(0,6) != "ignore") {
                        var textareaToggleID = textareaTag.name + '-info';
                        var textareaFoundationID = '#' + textareaToggleID;
                        var textareaClassName = textareaTag.className;
                        var textareaDisplayProperty = document.getElementById(textareaToggleID).style.display.toLowerCase();
                        //console.log("These are the select tag names: " + textareaTag.name);
                        //Required field validation
                        if (textareaClassName.indexOf("REQ_VAL") > -1 && textareaTag.value.length == 0) {
                            currentTextareaSuccess = false;
                            if(!focus){
                                //console.log("Focusing on " + textareaTag.name);
                                document.getElementById(textareaTag.name).focus();
                                focus = true;
                            }
                        }
                        //Toggle display of messages
                        if (currentTextareaSuccess && textareaDisplayProperty != '' && textareaDisplayProperty != 'none') {
                            $(textareaFoundationID).foundation('toggle');
                        } else if (!currentTextareaSuccess && (textareaDisplayProperty == '' || textareaDisplayProperty == 'none')) {
                            $(textareaFoundationID).foundation('toggle');

                        }

                        success &= currentTextareaSuccess;
                    }
                }
            }
            else {
                console.log("The form " + formID + " had no textarea elements to validate.");
            }
            //todo: use individual checks and && the booleans at the end to see if the form is successful or not
            currentInputSuccess = true;
            if (inputTags.length > 0) {
                var inputTag;
                var i;
                for (i = 0; i < inputTags.length; i++) {
                    inputTag = inputTags[i];
                    console.log(inputTag.name + " " + inputTag.value);
                    if (inputTag.name.substring(0,6) != "ignore") {

                        var inputToggleID = inputTag.name + '-info';
                        //remove the line underneath once all forms have been completed
                        //console.log("These are the input tag names: " + inputTag.name);
                        var inputFoundationID = '#' + inputToggleID;
                        var inputClassName = inputTag.className;
                        var inputDisplayProperty = document.getElementById(inputToggleID).style.display.toLowerCase();

                        //Alpha-numeric validation
                        if (inputClassName.indexOf("AN_VAL") > -1 && !inputTag.value.match(alphaNumericRE)) {
                            currentInputSuccess = false;
                            if(!focus){
                                //console.log("Focusing on " + inputToggleID);
                                document.getElementById(inputTag.name).focus();
                                focus = true;
                            }
                        }
                        //Required field validation
                        if (inputClassName.indexOf("REQ_VAL") > -1 && inputTag.value.length == 0) {
                            currentInputSuccess = false;
                            if(!focus){
                                //console.log("Focusing on " + inputToggleID.substring(0,inputToggleID.length-5) + " " + inputTag.name);
                                document.getElementById(inputTag.name).focus();
                                focus = true;
                            }
                        }
                        //Toggle display of messages
                        if (currentInputSuccess && inputDisplayProperty != '' && inputDisplayProperty != 'none') {
                            $(inputFoundationID).foundation('toggle');
                        } else if (!currentInputSuccess && (inputDisplayProperty == '' || inputDisplayProperty == 'none')) {
                            $(inputFoundationID).foundation('toggle');
                        }
                        //Set success to false if applicable
                        success &= currentInputSuccess;
                    }
                }
            } else {
                console.log("The form " + formID + " had no input elements to validate.");
            }
        } else {
            console.log("Could not validate. No form with the id: " + formID);
        }
    } else {
        success = false;
    }
    //console.log(success);
    return success;
}

/*Discuss the following functions with the group*/
function redirectToHome(){
    if (window.location.href != "http://localhost:31335/areainformation-page.php") {
    window.location = '/areainformation-page.php';
    }
    else
    window.location = '/userPage.php';
}

function handleSetTradeworkerAvailability(response){
    //console.log("This is the switch value: " + document.getElementById("availability-tradeworker-mainpage-switch").checked);
    var availability = JSON.parse(response);
    console.log("The following is the value returned from server: " + availability);
    if(availability){
        console.log("availability was set:");
    }
    else{
        console.log("availability was not set:");
    }
}
//Nice way to test what values the object array contains
function genericPrintObject(array){
    for(var key in (array)){
        if(array.hasOwnProperty(key)) {
            value = array[key];

            console.log(value);
        }
        else{
            console.log("Key doesn't exist: " + key);
        }
    }
}

//Chart.js related functions
//var randomScalingFactor = function() {
//    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
//};
var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};
var randomColorFactor = function() {
    return Math.round(Math.random() * 255);
};
var randomColor = function() {
    return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',0.7)';
};

function graphTestRun(){
    //var labels = ["January", "February", "March", "April", "May"];
    //var data = [];
    //data[0] = [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()];
    //data[1] = [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()];
    //data[2] = [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()];
    //var dataHeadings = ["red","green","blue"];
    //var colours = [];
    //colours = [randomColor(),randomColor(),randomColor(),randomColor(),randomColor()];
    //colours[1] = [randomColor(),randomColor(),randomColor(),randomColor(),randomColor()];
    //colours[2] = [randomColor(),randomColor(),randomColor(),randomColor(),randomColor()];
    //var barChartData = createPolarAreaGraphConfig(dataHeadings,data,colours,"MyChart");
    //var config = createPieGraphConfig(dataHeadings,colours,data,3);
    //var config = createLineGraphConfig(labels,data,dataHeadings);
    //var ctx = document.getElementById("canvas").getContext("2d");
    //var ctx1 = document.getElementById("canvas1").getContext("2d");
    //window.myLine = new Chart(ctx1, config);
    //window.myPie = new Chart(ctx1, config);
    //var test = new Chart(ctx1, barChartData);
    //window.myPolarArea = Chart.PolarArea(ctx1, barChartData);
    //window.myBar = test;
}

function createCanvas(canvasName,divToDisplayID,width){
    var html ='<div name="' + divToDisplayID + '" style="width:' + width + '%;">' +
            '<canvas id="' + canvasName + '"></canvas>' +
            '</div>';
    document.getElementById(divToDisplayID).innerHTML += html;
}
function createLineGraphConfig(labels,data,dataLabel,heading){
    var dataCreate = '{"labels":[';
    for(var k=0;k<labels.length;k++){
        dataCreate += '"' + labels[k] + '"';
        if(k<labels.length - 1){
            dataCreate += ',';
        }
        else{
            dataCreate += '],';
        }
    }
        dataCreate += '"datasets":[';

    for(var j = 0;j<data.length;j++){
        dataCreate += '{"label":"' + dataLabel[j] + '",'+
                        '"data":[' + data[j] +']';
        if(j<data.length - 1){
            dataCreate += '},';
        }
        else{
            dataCreate += '}]';
        }
    }
    dataCreate += '}';

    //console.log(dataCreate);
    var toParse = JSON.parse(dataCreate);
    //console.log(toParse);

    var config = {
        type: 'line',
        data:toParse,

        options: {
            responsive: true,
            title:{
                display:true,
                text:heading
            },
            tooltips: {
                mode: 'label',
                callbacks: {
                    // beforeTitle: function() {
                    //     return '...beforeTitle';
                    // },
                    // afterTitle: function() {
                    //     return '...afterTitle';
                    // },
                    // beforeBody: function() {
                    //     return '...beforeBody';
                    // },
                    // afterBody: function() {
                    //     return '...afterBody';
                    // },
                    // beforeFooter: function() {
                    //     return '...beforeFooter';
                    // },
                    // footer: function() {
                    //     return 'Footer';
                    // },
                    // afterFooter: function() {
                    //     return '...afterFooter';
                    // },
                }
            },
            hover: {
                mode: 'dataset'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    },
                    ticks: {
                        suggestedMin: -10,
                        suggestedMax: 250,
                    }
                }]
            }
        }
    };

    $.each(config.data.datasets, function(i, dataset) {
        dataset.borderColor = randomColor(0.4);
        dataset.backgroundColor = randomColor(0.5);
        dataset.pointBorderColor = randomColor(0.7);
        dataset.pointBackgroundColor = randomColor(0.5);
        dataset.pointBorderWidth = 1;
    });

    //console.log(config);

    return config;
}

//This will display multilevel pie graph, where the labels is a single dimension array, and the colors and data are multidimesions arrays where numDatasets represents the
//1st dimension and will result in the multi-level pie chart to be drawn when greater then 1, if it is 1 it will draw a single level pie chart
//data[][],labels[],colors[][],numDatasets
function createPieGraphConfig(labels,colors,data,numDatasets,heading){
    var dataCreate = '{"type":"pie","data": {"datasets":[';

    for(var c = 0;c < numDatasets;c++){
        dataCreate += '{"data":[';

        for(var r = 0;r < data[c].length;r++){
            dataCreate +=  data[c][r];
            if(r < data[c].length - 1){
                dataCreate += ',';
            }
            else{
                dataCreate += "],";
            }
        }
        dataCreate += '"backgroundColor":[';
        for(var j = 0;j < colors[c].length;j++){
            dataCreate += '"' + colors[c][j] + '"';
            if(j != colors[c].length - 1){
                dataCreate += ',';
            }
            else{
                dataCreate += "]";
            }
        }
        if(c < numDatasets - 1){
            dataCreate += "},"
        }
        else{
            dataCreate += "}]"
        }


    }
    dataCreate += ',"labels":[';
    for(var q = 0;q < labels.length;q++){
        dataCreate += '"' + labels[q] + '"';
        if(q != labels.length - 1){
            dataCreate += ',';
        }
        else{
            dataCreate += "]";
        }
    }



    dataCreate += '},';
    dataCreate += '"options": {"title":{"display": "true","text": "' + heading + '"},' +
        '"responsive": "true"}}';

    //console.log(dataCreate);
    var toParse = JSON.parse(dataCreate);
    return toParse;
}
//Single array of values representing the labels, data and colors where the it will be displayed then in a radial graph
//label is single value string
//labels[],data[][],colors[],label
function createPolarAreaGraphConfig(labels,data,colors,label){
    var dataCreate = '{"data": {"datasets":[{"data":[';

    for(var r = 0;r < data.length;r++){
        dataCreate +=  data[r];
        if(r < data.length - 1){
            dataCreate += ',';
        }
        else{
            dataCreate += "],";
        }
    }
    dataCreate += '"backgroundColor":[';
    for(var j = 0;j < colors.length;j++){
        dataCreate += '"' + colors[j] + '"';
        if(j != colors.length - 1){
            dataCreate += ',';
        }
        else{
            dataCreate += "],";
        }
    }
    dataCreate += '"label":"' + label + '"}]';
    dataCreate += ',"labels":[';
    for(var q = 0;q < labels.length;q++){
        dataCreate += '"' + labels[q] + '"';
        if(q != labels.length - 1){
            dataCreate += ',';
        }
        else{
            dataCreate += "]";
        }
    }
    dataCreate += '},';
    dataCreate += '"options": {' +
    '"responsive": "true",' +
        '"legend": {' +
        '"position": "top"' +
    '},' +
    '"title": {' +
    '"display": "true",' +
    '"text": ' + heading + '' +
    '},' +
    '"scale": {' +
    '"ticks": {' +
    '"beginAtZero": "true"' +
    '},' +
    '"reverse": "false"' +
    '},' +
    '"animation": {' +
        '"animateRotate": "false",' +
            '"animateScale": "true"' +
    '}' +
    '}}';

    //console.log(dataCreate);
    //console.log(JSON.stringify(config));
    //console.log("......");

    //console.log(config);
    //console.log("......");
    //console.log(dataCreate);
    //console.log(JSON.stringify(barChartData));
    //console.log(barChartData);
    var toParse = JSON.parse(dataCreate);
    //console.log(toParse);



    return toParse;
}

//chartHeader = string, chartLabels[],data[][],datalabels[],backgroundColour[]
function createBarGraphConfig(chartHeader,chartLabels,data,datalabels,backgroundColour){
    //var dataCreate = '{"Labels":["test","test2","test3"],"datasets":[{"data":["test","test2","test3"]},{"color":["test1","test4","test7"]}]}' ;
    var dataCreate = '{"labels":[';
    for(var t = 0;t<chartLabels.length;t++){
        dataCreate += '"' + chartLabels[t] + '"';


        if(t < chartLabels.length - 1)
            dataCreate += ",";
    }
    dataCreate += "]";
    dataCreate += ',"datasets": [' ;
    var label = '{"label":[';
    var color = '{"backgroundColor":[';
    var da = '{"data":[';
    for(var j = 0;j<data.length;j++){

        dataCreate += '{"label":"' + datalabels[j] + '",'; //single values
        dataCreate += '"backgroundColor":"' + backgroundColour[j] +  '",'; //single rgba values
        dataCreate += '"data":['; //array of values [5,4,2] e.g data[j][0] = 5
            for(var p = 0;p<data[j].length;p++){
                dataCreate += '"' + data[j][p] + '"';
                if(p != data[j].length - 1){
                    dataCreate += ",";
                }
                else if(p == data[j].length - 1 && j != data.length - 1){
                    dataCreate += "]},";
                }
            }
    }
    dataCreate += ']}]}';
    //console.log("......");
    //console.log(dataCreate);
    //console.log("......");
    //console.log(dataCreate);
    //console.log(JSON.stringify(barChartData));
    //console.log(barChartData);
    var toParse = JSON.parse(dataCreate);
    var values = {
    type: 'bar',
    data:toParse,
    options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each bar to be 2px wide and green
        elements: {
            rectangle: {
                borderWidth: 2,
                borderColor: 'rgb(0, 0, 0)',
                borderSkipped: 'bottom'
            }
        },
        responsive: true,
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: chartHeader
        }}};

    return values;
}
//End Chart.js related functions

function genericTableGenerate(table,tableName){
    var tableBeginning = "<table><thead><tr>";
    var tableHeaders = '<th>#</th>';
    var tableHeaderEnd = "</tr></thead><tbody id='" + tableName + "'>";
    var tableBody = '';
    var j = 0;
    if(table.length)
    for(j = 0;j <table.length;j++){
        tableBody += '<tr><td>' + (j+1) +'</td>';
        //console.log(j);

        //temp = table[j].length;
        for(var item in table[j]){

            if(table[j].hasOwnProperty(item)){
                if(j == 0){
                    tableHeaders += '<th>' + item + '</th>';
                }
                //console.log("It got here genericTableGenerate items: " + item);
                tableBody += '<td>' + table[j][item] + '</td>';
            }
        }
        tableBody +=    '</tr>';
    }
    var tableEnd = '</tbody></table>';
    var html = tableBeginning + tableHeaders + tableHeaderEnd + tableBody + tableEnd;
    //console.log("It got here genericTableGenerate items: " + html);
    return html;
}

function userGenericFillColumnSelectTags(selectTagID,headers){
    var select = document.getElementById(selectTagID);
    select.innerHTML = '<option value="-1">All</option>';
    select.innerHTML += '<option value="0">#</option>';
    for(var i = 0;i < headers.length;i++){
        select.innerHTML += '<option value="' + (i + 1) + '">' + headers[i] + '</option>';
    }
}

function userGenericSearchTable(inputID,tableID){
    var searchWord = document.getElementById(inputID).value;
    var column = document.getElementById(inputID + "-column").value;
    console.log("This is the column value: " + column);
    generic2DimensionalSearchArray(tableID,searchWord.toUpperCase(),column);
}

//One flaw if the string starts with "<" then the search will fail
function generic2DimensionalSearchArray(tableID,searchWord,columnID){
    var td,i;
    var table = document.getElementById(tableID);
    var tr = table.getElementsByTagName("tr");
    var found = false;
    var counter = [];
    //Comparing all the columns for a match
    if(columnID == -1){
        //console.log("Searching in all columns");
        for(i = 0;i < tr.length;i++){
            found = false;
            td = tr[i].getElementsByTagName("td");
            for(var j = 0;j < td.length && found != true;j++){
                //console.log(td[j]);
                if(td[j].innerHTML.length > 3)
                //console.log(td[j].innerHTML.toUpperCase().substring(0,1));
                if(td[j].innerHTML.toUpperCase().indexOf("<") == -1 ){
                    if(td[j].innerHTML.toUpperCase().indexOf(searchWord) > -1 ){
                        found = true;
                        tr[i].style.display = "";
                        counter.push(j);
                    }
                    else{
                        tr[i].style.display = "none";
                    }
                }
                else{
                    tr[i].style.display = "none";
                }
            }
        }
    }
    else{
        //console.log("Searching in specified columns");
        //Comparing a certain column for a match
        for(i = 0;i < tr.length;i++){
            td = tr[i].getElementsByTagName("td")[columnID];
            //console.log(td.innerHTML);
            if(td.innerHTML.toUpperCase().indexOf(searchWord) > -1){
                tr[i].style.display = "";
            }
            else{
                tr[i].style.display = "none";
            }
        }
    }
    //console.log(true);
    //console.log(counter);
}

/*The following function fills up the userPageModal-medium-large with information related to it*/
function homeUserJobRequestModalFill(type, location) {
    document.getElementById("jobDescript").innerHTML = "<h4>Job Description</h4><hr>" + "The type of job:" + type + "<br> The location of the job:" + location;
    var button = ' <div class="sebenza-select-button"><div class="row align-center"><div class="columns"><button type="button" class="alert button login-button" id=reject-job-button">Reject</button></div><div class="columns"><button type="button" class="success button login-button" id=complete-button">Accept</button></div></div></div>';
    document.getElementById("jobDescript").innerHTML += button;
}

function homeUserOngoingJobModalFill(type, location){
    document.getElementById("jobDescript").innerHTML = "<h4>Job Description</h4><hr>" + "The type of job:" + type + "<br> The location of the job:" + location;
    var button = ' <div class="sebenza-select-button"><div class="row"><div class="columns"><button type="button" class="alert button login-button" id=terminate-job-button">Terminate</button></div><div class="columns align-center"><button type="button" class="warning button login-button" id=extend-button">Extend</button></div><div class="columns"><button type="button" class="success button login-button" id=complete-button">Complete</button></div></div></div>';
    document.getElementById("jobDescript").innerHTML += button;

}

function userGenericSortSelectFill(selectID,array){
    var select = document.getElementById(selectID);
    select.innerHTML = '<option value="0">#(asc)</option>';
    select.innerHTML += '<option value="1">#(dsc)</option>';
    for(var i = 0;i < array.length;i++){
        select.innerHTML += '<option value="' + ((i + 1) * 2) + '">' + array[i] + '(asc)</option>';
        select.innerHTML += '<option value="' + (((i + 1) * 2) + 1) + '">' + array[i] + '(dsc)</option>';
    }
}

function userGenericSortTable(table,select){
    var column = document.getElementById(select).value;
    var tb = document.getElementById(table);
    var tr= tb.getElementsByTagName("tr");
    var sortedRows = tb.getElementsByTagName("tr");
    var td,td2;
    var testCase = -1;
    var datePatt = /\d{4}-\d{2}-\d{2}/;
    var numPatt = /\d+/;
    var fltNum = /\d+\.\d{2}/;
    var ascending;
    if(column % 2 == 0){
        ascending = true;
    }
    else{
        ascending = false;
    }
    column = parseInt(column /= 2);
    td = tr[0].getElementsByTagName("td")[column].innerHTML;
        //td = tr[0].getElementsByTagName("td")[column].innerHTML;
    if(datePatt.test(td)){
       // console.log("Dealing with dates");
        testCase = 0;
    }
    else if(numPatt.test(td)){
      //  console.log("Dealing with integers");
        testCase = 1;
    }
    else if(fltNum.test(td)){
       // console.log("Dealing with floats");
        testCase = 2;
    }
    else{
        //console.log("Dealing with alphabet");
        testCase = 3;
    }
    //for(var)
    var j = 0;
    var td2Row = [];
    for(var i = 1;i < tr.length;i++){
        for(var x = 0;x < sortedRows[i].getElementsByTagName("td").length;x++){
            td2Row[x] = sortedRows[i].getElementsByTagName("td")[x].innerHTML;
        }

        td2  = sortedRows[i].getElementsByTagName("td")[column].innerHTML;
        j = i;

        switch (testCase){
            case 0:
                if(ascending){
                    while(j > 0 && Date.parse(sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML) > Date.parse(td2)){
                        //console.log("comparing: " + sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML + ": " + td2);
                        for(x = 0;x < sortedRows[j].getElementsByTagName("td").length;x++){
                            sortedRows[j].getElementsByTagName("td")[x].innerHTML = sortedRows[j - 1].getElementsByTagName("td")[x].innerHTML;
                        }
                        j--;
                    }
                }
                else{
                    while(j > 0 && Date.parse(sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML) < Date.parse(td2)){
                        //console.log("comparing: " + sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML + ": " + td2);
                        for(x = 0;x < sortedRows[j].getElementsByTagName("td").length;x++){
                            sortedRows[j].getElementsByTagName("td")[x].innerHTML = sortedRows[j - 1].getElementsByTagName("td")[x].innerHTML;
                        }
                        j--;
                    }
                }
                for(x = 0;x < sortedRows[j].getElementsByTagName("td").length;x++){
                    sortedRows[j].getElementsByTagName("td")[x].innerHTML = td2Row[x];
                }
                break;
            case 1:
                if(ascending){
                    while(j > 0 && parseInt(sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML) > parseInt(td2)){
                        //console.log("comparing: " + sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML + ": " + td2);
                        for(x = 0;x < sortedRows[j].getElementsByTagName("td").length;x++){
                            sortedRows[j].getElementsByTagName("td")[x].innerHTML = sortedRows[j - 1].getElementsByTagName("td")[x].innerHTML;
                        }
                        j--;
                    }
                }
                else{
                    while(j > 0 && parseInt(sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML) < parseInt(td2)){
                        //console.log("comparing: " + sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML + ": " + td2);
                        for(x = 0;x < sortedRows[j].getElementsByTagName("td").length;x++){
                            sortedRows[j].getElementsByTagName("td")[x].innerHTML = sortedRows[j - 1].getElementsByTagName("td")[x].innerHTML;
                        }
                        j--;
                    }
                }
                for(x = 0;x < sortedRows[j].getElementsByTagName("td").length;x++){
                    sortedRows[j].getElementsByTagName("td")[x].innerHTML = td2Row[x];
                }
                break;
            case 2:
                if(ascending){
                    while(j > 0 && parseFloat(sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML) > parseFloat(td2)){
                        //console.log("comparing: " + sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML + ": " + td2);
                        for(x = 0;x < sortedRows[j].getElementsByTagName("td").length;x++){
                            sortedRows[j].getElementsByTagName("td")[x].innerHTML = sortedRows[j - 1].getElementsByTagName("td")[x].innerHTML;
                        }
                        j--;
                    }
                }
                else{
                    while(j > 0 && parseFloat(sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML) < parseFloat(td2)){
                        //console.log("comparing: " + sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML + ": " + td2);
                        for(x = 0;x < sortedRows[j].getElementsByTagName("td").length;x++){
                            sortedRows[j].getElementsByTagName("td")[x].innerHTML = sortedRows[j - 1].getElementsByTagName("td")[x].innerHTML;
                        }
                        j--;
                    }
                }
                for(x = 0;x < sortedRows[j].getElementsByTagName("td").length;x++){
                    sortedRows[j].getElementsByTagName("td")[x].innerHTML = td2Row[x];
                }
                break;
            case 3:
                if(ascending){
                    while(j > 0 && sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML > td2){
                        //console.log("comparing: " + sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML + ": " + td2);
                        for(x = 0;x < sortedRows[j].getElementsByTagName("td").length;x++){
                            sortedRows[j].getElementsByTagName("td")[x].innerHTML = sortedRows[j - 1].getElementsByTagName("td")[x].innerHTML;
                        }
                        j--;
                    }
                }
                else{
                    while(j > 0 && sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML < td2){
                        //console.log("comparing: " + sortedRows[j - 1].getElementsByTagName("td")[column].innerHTML + ": " + td2);
                        for(x = 0;x < sortedRows[j].getElementsByTagName("td").length;x++){
                            sortedRows[j].getElementsByTagName("td")[x].innerHTML = sortedRows[j - 1].getElementsByTagName("td")[x].innerHTML;
                        }
                        j--;
                    }
                }
                for(x = 0;x < sortedRows[j].getElementsByTagName("td").length;x++){
                    sortedRows[j].getElementsByTagName("td")[x].innerHTML = td2Row[x];
                }
                break;
            default:
                console.log("Could not sort");
                break;
        }
    }
    //console.log(sortedRows);
}

var workTypeSelectTagID;
function requestGenericWorkTypes(inputID){
    workTypeSelectTagID = inputID;
    sendAJAXRequest('fetch_work_types', handleGenericWorkRequestResponse);
}
var homeuserWorkTypeArray;
function handleGenericWorkRequestResponse(response){
    homeuserWorkTypeArray = JSON.parse(response);
    if (homeuserWorkTypeArray) {
        //console.log("Work Type Retrieval successful: " + homeuserWorkTypeArray.length + "The following is contained in array: " + homeuserWorkTypeArray.toString());
        if(homeuserWorkTypeArray.length > 0){

            //document.getElementById("contractor-work-type").innerHTML = "This is a test".htmlText;
            var htmlText = '<option value="" selected></option>';
            for(var i = 0;i<homeuserWorkTypeArray.length;i++){
                htmlText += '<option value="' + homeuserWorkTypeArray[i]["workTypeID"] + '">' + homeuserWorkTypeArray[i]["WorkType"] + '</option>';
            }


            document.getElementById(workTypeSelectTagID).innerHTML = htmlText;

        }
        else{
            console.log("There are no specialities that were retrieved" + homeuserWorkTypeArray)
        }

    }
    else{
        console.log("Worktype Retrievals Failed");
    }
}
//If homeuserWorkTypeArray has been previously set this can be used to fill a dynamically generated select tag field
function genericFillSkillsSelectTag(workTypeSelectTagID){
    if (homeuserWorkTypeArray) {
        //console.log("Work Type Retrieval successful: " + homeuserWorkTypeArray.length + "The following is contained in array: " + homeuserWorkTypeArray.toString());
        if(homeuserWorkTypeArray.length > 0){

            //document.getElementById("contractor-work-type").innerHTML = "This is a test".htmlText;
            var htmlText = '<option value="" selected></option>';
            for(var i = 0;i<homeuserWorkTypeArray.length;i++){
                htmlText += '<option value="' + homeuserWorkTypeArray[i]["workTypeID"] + '">' + homeuserWorkTypeArray[i]["WorkType"] + '</option>';
            }


            document.getElementById(workTypeSelectTagID).innerHTML = htmlText;

        }
        else{
            console.log("There are no specialities that were retrieved" + homeuserWorkTypeArray)
        }

    }
    else{
        console.log("Worktype Retrievals Failed");
    }
}
var registrationWorkTypeSelectID;
function requestWorkTypes(selectTagID){
    registrationWorkTypeSelectID = selectTagID.substr(0,selectTagID.length - 1);
    sendAJAXRequest('fetch_work_types', handleWorkRequestResponse);
}

function handleWorkRequestResponse(response){
    var workTypeArray = JSON.parse(response);
    if (workTypeArray) {
        //console.log("Work Type Retrieval successful: " + workTypeArray.length + "The following is contained in array: " + workTypeArray.toString());
        if(workTypeArray.length > 0){

            //document.getElementById("contractor-work-type").innerHTML = "This is a test".htmlText;
            var htmlText = '<option value="" selected></option>';
            for(var i = 0;i<workTypeArray.length;i++){
                htmlText += '<option value="' + workTypeArray[i]["workTypeID"] + '">' + workTypeArray[i]["WorkType"] + '</option>';
            }

            for(var j = 0;j<3;j++){
                document.getElementById(registrationWorkTypeSelectID + j).innerHTML = htmlText;
            }
        }
        else{
            console.log("There are no specialities that were retrieved" + workTypeArray)
        }

    }
    else{
        console.log("Worktype Retrievals Failed");
    }
}
var clocations = 0;
//Used in contractor registration to add more locations no limit to amount of locations that a user can add, however they are required and need to be filled in.
//I need to decide whether: if user clicks remove locations at a certain tab, if all the locations after are to be removed or only the one directly below the remove button pressed, currently the former is in place.
function addTradeworkerLocations(current){

    var location = [];
    var k = 0;
    for(var t = 0; t < locationAmount + 1;t++){
        //console.log("The following is location stored info at location["+ t +"]: " + "provincename-contractor-" + t + ": " + document.getElementById("provincename-contractor-" + t).value + "areaname-contractor-" + t + ": " + document.getElementById("areaname-contractor-" + t).value + "cityname-contractor-" + t + ": " + document.getElementById("cityname-contractor-" + t).value);
        var province = document.getElementById("provincename-tradeWorker-" + t).value;
        var area = document.getElementById("areaname-tradeWorker-" + t).value;
        var city = document.getElementById("cityname-tradeWorker-" + t).value;
        location[k++] = province;
        location[k++] = area;
        location[k++] = city;


        //console.log('he following is stored in the array: ' + location[k-3] + location[k-2]+ location[k-1]);
    }

    if(document.getElementById("toggle-area-" + current).innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo">' && current == tradeWorkerLocation){
        //The following statement adds a toggle-able area to the html page which is toggled later and not removed to 'save' time.
        tradeWorkerLocation++;
        newCurrent = current *= 3;
        var placeHolder = 1;
        clocations++;
        var html = '<div class="row" data-animate="hinge-in-from-right spin-out" id="additional-area-' + newCurrent + '" style="display: none"><div class="column large-11 medium 11"><label>Area Name</label><input readonly type="text" name="areaname-tradeWorker-' + tradeWorkerLocation + '" id="areaname-tradeWorker-' + tradeWorkerLocation + '" placeholder="Edenvale" class="REQ_VAL"><div class="additional-info top-padding" id="areaname-tradeWorker-' + tradeWorkerLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">An area found within the city E.g. Edenvale</p></div></div></div><div class="row" data-toggle  data-animate="hinge-in-from-right spin-out" id="additional-area-' + parseFloat(newCurrent + 1) + '" style="display: none"><div class="column large-11 medium 11"><label>City Name</label><input readonly type="text" name="cityname-tradeWorker-' + tradeWorkerLocation + '" id="cityname-tradeWorker-' + tradeWorkerLocation + '" placeholder="Johannesburg" class="REQ_VAL"><div class="additional-info top-padding" id="cityname-tradeWorker-' + tradeWorkerLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">A city found within a province. E.g. Johannesburg</p></div></div></div><div class="row" data-toggle  data-animate="hinge-in-from-right spin-out" id="additional-area-' + parseFloat(newCurrent + 2) + '" style="display: none"><div class="column large-11 medium 11"><label>Province Name</label><input readonly type="text" name="provincename-tradeWorker-' + tradeWorkerLocation + '" id="provincename-tradeWorker-' + tradeWorkerLocation + '" placeholder="Gauteng" class="REQ_VAL"><div class="additional-info top-padding" id="provincename-tradeWorker-' + tradeWorkerLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">A province within South Africa E.g. Gauteng</p></div></div><div class="column medium-1 large-1" style="margin-top: 24.44px">' + '<a data-toggle="additional-area-'+ parseFloat(tradeWorkerLocation * 3) +' additional-area-'+ parseFloat((tradeWorkerLocation * 3) + 1)  +' additional-area-'+ parseFloat((tradeWorkerLocation * 3) + 2) +'" name="toggle-area-'+ tradeWorkerLocation +'" id="toggle-area-'+ tradeWorkerLocation +'" onclick="addTradeworkerLocations('+ tradeWorkerLocation +')"><img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/></a></div>';
        document.getElementById("extraLocations").innerHTML += html;
        //console.log("The following area should be toggled: " + "toggle-area-" + parseFloat(tradeWorkerLocation - 1))
        document.getElementById("toggle-area-" + parseFloat(tradeWorkerLocation - 1)).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>';
        //Have tried to implement the following to-do but it doesn't seem to persist over the function calls.
        //TODO: Add a global variable that handles the areas so that the classes need not be created each time.

        for(var i = 0 ; i <= parseFloat(((tradeWorkerLocation - 1) * 3) + 2) ; i++){
            var temp = "";
            if(i % 3 == 0){
                temp = "provincename-tradeWorker-" + placeHolder + "-info";
            }
            else if(i % 3 == 1){
                temp = "cityname-tradeWorker-" + placeHolder + "-info";
            }
            else {
                temp = "areaname-tradeWorker-" + placeHolder + "-info";
                placeHolder++;
            }



            locationsElements[i] = new Foundation.Toggler($("#additional-area-" + i) , 'data-animate="hinge-in-from-right spin-out"');

            //console.log(temp);
            new Foundation.Toggler($("#" + temp),'data-animate="fade-in fade-out"');
        }
        if(document.getElementById("additional-area-" + newCurrent).style.display == "none"){
            locationsElements[newCurrent].toggle();
            locationsElements[newCurrent + 1].toggle();
            locationsElements[newCurrent + 2].toggle();
        }
        locationAmount++;
    }
    else{
        var iconChange = current + 1;

        if(document.getElementById("toggle-area-" + parseFloat(current)).innerHTML == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo">') {
            //The following if statement goes about toggling-on previously added elements
            var newCurrent = current * 3;
            clocations++;
            document.getElementById("provincename-tradeWorker-" + iconChange).setAttribute("name","provincename-tradeWorker-" + iconChange);
            document.getElementById("areaname-tradeWorker-" + iconChange).setAttribute("name","areaname-tradeWorker-" + iconChange);
            document.getElementById("cityname-tradeWorker-" + iconChange).setAttribute("name","cityname-tradeWorker-" + iconChange);
            locationsElements[newCurrent].toggle();
            locationsElements[newCurrent + 1].toggle();
            locationsElements[newCurrent + 2].toggle();
            document.getElementById("toggle-area-" + parseFloat(current)).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>';
            locationAmount++;
        }
        else {
            //The following if statement goes about toggling-off previously added elements
            document.getElementById("toggle-area-" + parseFloat(current)).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>';

            var newCurrent = current;
            var placeHolder = locationAmount;
            if(newCurrent < tradeWorkerLocation){
                for(var j = ((newCurrent) * 3);j < (((placeHolder) * 3)); j ++){
                    locationsElements[j].toggle();
                    if(j % 3 == 0){
                        document.getElementById("provincename-tradeWorker-" + iconChange).setAttribute("name","ignore-provincename-tradeWorker-" + iconChange);
                        document.getElementById("areaname-tradeWorker-" + iconChange).setAttribute("name","ignore-areaname-tradeWorker-" + iconChange);
                        document.getElementById("cityname-tradeWorker-" + iconChange).setAttribute("name","ignore-cityname-tradeWorker-" + iconChange);
                        document.getElementById("provincename-tradeWorker-" + iconChange).value = "";
                        document.getElementById("areaname-tradeWorker-" + iconChange).value = "";
                        document.getElementById("cityname-tradeWorker-" + iconChange).value = "";
                        document.getElementById("toggle-area-" + iconChange).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>';
                        clocations--;
                        iconChange++;
                        locationAmount--;
                    }
                }
            }
        }
    }
    k = 3;
    for(var c = 1; c < locationAmount;c++){
        //console.log("he following is stored in the array: " + location[c]["provincename-contractor"] + location[c]["areaname-contractor"] + location[c]["cityname-contractor"]);
        //console.log("Inserting back removed values");

        //console.log('he following is stored in the array: ' + location[k-3] + location[k-2]+ location[k-1]);
        document.getElementById("provincename-tradeWorker-" + c).value = location[k++];
        document.getElementById("areaname-tradeWorker-" + c).value = location[k++];
        document.getElementById("cityname-tradeWorker-" + c).value = location[k++];

    }
    console.log("The following is the location amount : " + locationAmount);
    document.getElementById("locationsAdded-tradeWorker").value = parseFloat(locationAmount + 1);

}

function toggleUserPageArea(toToggle){
    var containers = document.getElementsByClassName("user-panels");
    if(containers.length > 0) {
        //console.log("The following is how many test class containers exist " + containers.length + " " + containers[0].id);
        var i;
        for (i=0; i < containers.length;i++) {
            var toggleID = containers[i].id;
            //console.log("The following is the toggle id:" + toggleID);
            document.getElementById(toggleID).style.display = 'none';
        }
        document.getElementById(toToggle).style.display = 'block';
    }
    else{
        console.log("There are no such elements with the class test on this page:");
    }
}

function handleTradeworkerFetchProfileDetails(response) {
    var result = JSON.parse(response);
    console.log("The following is handleTradeworkerFetchProfileDetails :" + response);
    //genericPrintObject(result);
    console.log(result) ;
    if(result.length > 0)
    {
        console.log("accessing the array :" + result[0]['Username'] + " " + result[0]['Email'] + " " + result[0]['Name'] + " " + result[0]['Subscribed']);
        document.getElementById("name-tradeworker-edit").value = result[0]["Name"] ;
        document.getElementById("surname-tradeworker-edit").value = result[0]["Surname"] ;
        document.getElementById("username-tradeworker-edit").value = result[0]["Username"] ;
        document.getElementById("email-tradeworker-edit").value = result[0]["Email"] ;
        document.getElementById("cellnumber-tradeworker-edit").value = result[0]["ContactNumber"] ;
    }else
    {
        console.log("Cannot fill in user details")
    }
}
function handleHomeuserFetchProfileDetails(response){
    var result = JSON.parse(response);
    console.log("The following is handleHomeuserFetchProfileDetails :" + response);
    //genericPrintObject(result);
    console.log(result) ;
    if(result.length > 0)
    {
        console.log("accessing the array :" + result[0]['Username'] + " " + result[0]['Email'] + " " + result[0]['Name'] + " " + result[0]['Subscribed']);
        document.getElementById("name-homeuser-edit").value = result[0]["Name"] ;
        document.getElementById("surname-homeuser-edit").value = result[0]["Surname"] ;
        document.getElementById("username-homeuser-edit").value = result[0]["Username"] ;
        document.getElementById("email-homeuser-edit").value = result[0]["Email"] ;
        document.getElementById("cellnumber-homeuser-edit").value = result[0]["ContactNumber"] ;
    }else
    {
        console.log("Cannot fill in user details")
    }
}
function handleHomeuserFetchLocationDetails(response){
    console.log("The following is handleHomeuserLocationDetails :" + response);
    var result = JSON.parse(response);

    //genericPrintObject(result);
    console.log(result) ;
    if(result.length > 0)
    { //`StreetNumber`,`Route`,`Sublocality`,`Locality`,`AdministrativeArea`
        console.log("accessing the array :" + result[0]['StreetNumber'] + " " + result[0]['Route'] + " " + result[0]['Sublocality'] + " " + result[0]['Locality'] + " " + result[0]['AdministrativeArea']);
        document.getElementById("homeuser-loc-street_number").value = result[0]["StreetNumber"] ;
        document.getElementById("homeuser-loc-route").value = result[0]["Route"] ;
        document.getElementById("homeuser-loc-sublocality_level_1").value = result[0]["Sublocality"] ;
        document.getElementById("homeuser-loc-locality").value = result[0]["Locality"] ;
        document.getElementById("homeuser-loc-administrative_area_level_1").value = result[0]["AdministrativeArea"] ;
    }else
    {
        console.log("Cannot fill in user details")
    }
}
function handleTradeworkerFetchLocationDetails(response){
    var result = JSON.parse(response);
    console.log("The following is handleTradeworkerLocationDetails :" + response);
    //genericPrintObject(result);
    console.log(result) ;
    if(result.length > 0)
    { //`StreetNumber`,`Route`,`Sublocality`,`Locality`,`AdministrativeArea`
        console.log("accessing the array :" + result[0]['StreetNumber'] + " " + result[0]['Route'] + " " + result[0]['Sublocality'] + " " + result[0]['Locality'] + " " + result[0]['AdministrativeArea']);
        document.getElementById("StreetNumber-tradeworker-edit").value = result[0]["StreetNumber"] ;
        document.getElementById("Route-tradeworker-edit").value = result[0]["Route"] ;
        document.getElementById("Sublocality-tradeworker-edit").value = result[0]["Sublocality"] ;
        document.getElementById("Locality-tradeworker-edit").value = result[0]["Locality"] ;
        document.getElementById("AdministrativeArea-tradeworker-edit").value = result[0]["AdministrativeArea"] ;
    }else
    {
        console.log("Cannot fill in user details")
    }
}

function handleHomeUserUpdateLocationDeitails(response){
    var result = JSON.parse(response);
    console.log("Details: " + " " + response);

}
function handleTradeworkerUpdateLocationDeitails(response){
    var result = JSON.parse(response);
    console.log("Details: " + " " + response);

}

function handleTradeWorkerUpdateProfileDeitails(response){
    var result = JSON.parse(response);
    console.log("Details: " + " " + response);

}
function handleHomeUserUpdateProfileDeitails(response){
    var result = JSON.parse(response);
    console.log("Details: " + " " + response);

}

window.onresize = function(event){
  setPanelSizeAccordingToScreen();
};

function setPanelSizeAccordingToScreen(){
    console.log("The following is the screen inner height: " + window.innerHeight);
    console.log("The following is the screen inner width: " + window.innerWidth);
    var height = window.innerHeight;
    height *= 0.5;
    console.log(height);
    var test = document.getElementsByClassName("areainformation-panel-container");
    console.log(test.length);
    $('.areainformation-panel-container').css('height', height + 'px');
}

//Used in contractor registration to add more skills up to three maximum
function toggleSwitch(id,validationID){
    //console.log("Switching " + document.getElementById(id).innerHTML.trim());
    var skillsAvailable = document.getElementById("skillsAdded-tradeWorker").value;
        //console.log("This is the value of the other blah - " + document.getElementById('image-toggle-0').src);
    if(document.getElementById(id).innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo">') {
        //The following if statement toggles on the three toggle-able elements
        document.getElementById(id).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>';
        document.getElementById(validationID).setAttribute("name",validationID);
        skillsAvailable++;
    }
    else {
        if (document.getElementById("toggle-switch-1").innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo">' && id == "toggle-switch-0") {
            //The following if statement toggles off the two last toggle-able elements
            document.getElementById("toggle-switch-1").innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>';
            document.getElementById('tradeWorker-work-type-1').setAttribute("name","ignore-" + "tradeWorker-work-type-1");
            document.getElementById('tradeWorker-work-type-2').setAttribute("name","ignore-" + "tradeWorker-work-type-2");
            $("#additional-tradeWorker-skill-2").foundation('toggle');
            skillsAvailable -= 2;
        }
        else if(document.getElementById("toggle-switch-1").innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo">' && id == "toggle-switch-0"){
            //The following if statement toggles off the 2nd last toggle-able elements
            document.getElementById('tradeWorker-work-type-1').setAttribute("name","ignore-" + "tradeWorker-work-type-1");
            skillsAvailable -= 1;
        }
        else if(id == "toggle-switch-1"){
            //The following if statement toggles off the last toggle-able elements
            document.getElementById('tradeWorker-work-type-2').setAttribute("name","ignore-" + "tradeWorker-work-type-2");
            skillsAvailable -= 1;
        }

        document.getElementById(id).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>';
    }
    document.getElementById("skillsAdded-tradeWorker").value = skillsAvailable;

    //The following does the actual toggling
    if(id == "toggle-switch-0"){
        $("#additional-tradeWorker-skill-0").foundation('toggle');
        $("#additional-tradeWorker-skill-1").foundation('toggle');
    }
    else
        $("#additional-tradeWorker-skill-2").foundation('toggle');
}

function handleFetchWorkerLocations(response){
    initMap();
    var result = JSON.parse(response);
    console.log(result);
    if(typeof result == 'object'){

        for(var i = 0; i < result.length;i++){
            var html = "<div> <h3>" + result[i]['locality'] + "</h3>" +
                "<h5>The following skills are covered in the area</h5><select>";
            for(var k = 0;k < result[i]['DifferentWorksCovered'].length;k++){
                html+= "<option>" + result[i]['DifferentWorksCovered'][k] + "</option>";
            }
            html += "</select>";
                html += "<h5>Tradeworker Information</h5><p>The total number of workers in location: " + result[i]['numWorkers'] + "</p>" +
                "<p>The number of workers available in location: " + result[i]['AvailableWorkers'] + "</p>";

                    html += "</div>";

            geocodeAddress(geocoder, map,result[i]['locality'] + " " + result[i]['province'],html);

        }

    }
    else{
        console.log("No areas were returned")
    }


}

//Google related Javascript - https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
var placeSearch, autocomplete, fillInAddressID;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    sublocality_level_1: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

//This will only work for one field at a time, however as long as the user clicks on the tag as currently set up that is when it initialises so it should handle multiple instances on a page
function genericInitAutocomplete(inputID){
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    if(typeof inputID == 'string') {
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById(inputID)),
            {types: ['geocode']});
        fillInAddressID = inputID.substring(0,inputID.length - 12);
        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', genericFillInAddress);
    }
    else{
        console.log("inputID is wrong type should be String is: " + typeof inputID)
    }
}

function genericFillInAddress(){
    //console.log("The following is the value coming in to the genericFillInAddress: " + fillInAddressID);
    var place = autocomplete.getPlace();

    //for (var component in componentForm) {
    //document.getElementById(component).value = '';
    //document.getElementById(component).disabled = false;
    //}

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    // the following address_components.types refer to the following there are some that appear that are not defined in the componentForm and so the if statement will never occur
    // administrative_area_level_1 - Province(Gauteng Province)
    // country - Country(South Africe)
    // streest_number - House number(house number 14)
    // route - Road(Avenues/Streets/etc)
    // sublocality_level_1 - Subarea(Eastleigh is to Edenvale)
    // locality - Area(Edenvale)
    // postal_code = postal code(1201)

    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        //console.log("The following is value's val" + addressType);
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            //console.log("The following is value's val" + addressType + "The value of addressType:" + val);
            if(document.getElementById(fillInAddressID + addressType) != null){
                document.getElementById(fillInAddressID + addressType).value = val;
            }
            else{
                console.log("ID does not exist: " + fillInAddressID + addressType);
            }


        }
    }
}

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('tradeworker-autocomplete')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    console.log("The following is cLocation: " + clocations);
    if(clocations <= locationAmount) {
        var place = autocomplete.getPlace();

        //for (var component in componentForm) {
        //document.getElementById(component).value = '';
        //document.getElementById(component).disabled = false;
        //}

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            console.log("The following is value's val" + addressType);
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                //document.getElementById(addressType).value = val;
                console.log("The following is the address type: " + addressType);
                if (addressType == 'locality') {
                    document.getElementById("areaname-tradeWorker-" + clocations).value = val;
                    console.log("it got here!" + val);
                }
                else if (addressType == 'administrative_area_level_1') {
                    document.getElementById("cityname-tradeWorker-" + clocations).value = val;
                    console.log("it got here!" + val);
                }
                else if (addressType == 'country') {
                    document.getElementById("provincename-tradeWorker-" + clocations).value = val;
                    console.log("it got here!" + val);
                }
            }
        }
        if(clocations<locationAmount)
        clocations++;
    }
    else{
        console.log("Toggle another area on first");
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
var map;
var geocoder;
function initMap() {
    map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 8,
        center: {lat: -34.397, lng: 150.644}
    });
    geocoder = new google.maps.Geocoder();

}
var infowindow = new google.maps.InfoWindow({
    content: ""
});
var markers = [];
function geocodeAddress(geocoder, resultsMap,address,html) {
    //console.log(html);
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            console.log("Should be placing marker");
            resultsMap.setCenter(results[0].geometry.location);

            //console.log(typeof (infowindow.content));
            //console.log(infowindow.content);
            //infowindow.content.style.backgroundColor = "red";
            //var googleDiv = infowindow.getDiv();
            //googleDiv.addClass('google-panel-design');
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                title: address,
                content: html
            });
            marker.addListener('click', function() {
                console.log(html);
                infowindow.setContent(html);
                infowindow.open(map, marker);
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}



function googleDesignChanger(){
    var test = $('.google-panel-design');
    console.log(test.length);
    for(var k =0;k<test.length;k++){

        test.parent().css("background-color","red");
        console.log((test.parent().name))
    }
}
//End Google related Javascript

//Code used from stack overflow - http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function dynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}
/**
 *
 * var People = [{Name: "Name", Surname: "Surname"},{Name:"AAA", Surname:"ZZZ"},{Name: "Name", Surname: "AAA"}];
 * People.sort(dynamicSort("Name"));
 * People.sort(dynamicSort("Surname"));
 * People.sort(dynamicSort("-Surname"));
 * People.sort(dynamicSortMultiple("Name", "-Surname"));
 */

// End of stack overflow added code