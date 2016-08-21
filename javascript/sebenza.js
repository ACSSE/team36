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
    }

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

function toggleNotification() {
    $('#notification-panel').foundation('toggle');
}

function modalToggler(){
    redirectToHome();
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
                if (form != null) {
                    var inputTags = form.getElementsByTagName('input');
                    var selectTags = form.getElementsByTagName('select');
                    var textareaTags = form.getElementsByTagName('textarea');
                    if (inputTags.length > 0) {
                        var inputTag;
                        var i;
                        for (i = 0; i < inputTags.length; i++) {
                            inputTag = inputTags[i];
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
                    url: 'php/classes/SebenzaServer.php',
                    data: dataObject,
                    success: responseFunction
                });
            }
        } else {
            $.ajax({
                type: 'POST',
                url: 'php/classes/SebenzaServer.php',
                data: {action: action},
                success: responseFunction
            });
        }
    }
}

function handleLoginResponse(response) {
    var success = JSON.parse(response);
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
    if(typeof success == 'boolean') {
        if (success) {
            document.getElementById("register-modal-button".click());
        } else {
            console.log("Registration failed")
        }
    }else
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
    if (window.location.href != "http://localhost:31335/") {
    window.location = '/';
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

function handleTradeworkerAcceptRequest(response){
    var acceptance = JSON.parse(response);
    console.log(response);
    if(acceptance){
        console.log("The work request was accepted: ");
        //tradeworker-requests-notification-modal-additionalInfo
        $('#tradeworker-requests-notification-modal').foundation('toggle');
        document.getElementById("tradeworker-requests-notification-modal-additionalInfo").innerHTML = "<p>The work request has been accepted, notification to homeuser has been sent please await his response: </p>";
    }
    else{
        console.log("something went wrong");
        $('#tradeworker-requests-notification-modal').foundation('toggle');
        document.getElementById("tradeworker-requests-notification-modal-additionalInfo").innerHTML = "<p>The request was not accepted something occured, please contact adiministration for assistance</p>";
    }


}

function tradeworkerAcceptJobRequest(){
    var input = $("form input[name=job-requests]:radio");
    //console.log("test");
    if(input.length > 0)
    for(var i = 0 ; i < input.length ; i++){
        //console.log("should be printing :" + input[i].checked);
     if(input[i].checked){
         //console.log('The following request was selected: ' + i);
         //console.log(input[i]);
         document.getElementById("tradeworker-selected-request-id").value = input[i].value;
         sendAJAXRequest('tradeworker-accept-request',handleTradeworkerAcceptRequest,'tradeworker-selected-request');
     }
    }
    //console.log(input);
}

function tradeworkerDisplayRequest(){
    if(tradeworkerJobRequestArray.length > 0) {
        var html = "<table>";
        for (var j = 0; j < tradeworkerJobRequestArray.length; j++) {
            var commencementDate = tradeworkerJobRequestArray[j]['JobCommencementDate'];
            var description = tradeworkerJobRequestArray[j]['JobDescription'];
            var quoteID = tradeworkerJobRequestArray[j]['QuoteID'];
            var status = tradeworkerJobRequestArray[j]['Status'];
            if (status == 0) {
                status = "Pending acceptance";
            }
            else if (status == 1) {
                status = "Job accepted";
            }
            else if (status == 2) {
                status = "You rejected this request";
            }
            else if (status == 3) {
                status = "Waiting for homeuser to initiate job";
            }
            var workType = tradeworkerJobRequestArray[j]['WorkType'];
            var workTypeID = tradeworkerJobRequestArray[j]['WorkTypeID'];
            var areaName = tradeworkerJobRequestArray[j]['AreaName'];
            var province = tradeworkerJobRequestArray[j]['Province'];
            var locationName = tradeworkerJobRequestArray[j]['locationName'];

            html += '<tr> <td class="label">Job Details:</td> <td colspan="2"> <input type="text" name="tradeworker-requests-WorkType-' + j + '" id="tradeworker-requests-WorkType-' + j + '" value="' + workType + '" readonly> </td> <td class="label" colspan="2">Required Commencement Date:</td> <td colspan="2"> <input type="text" name="tradeworker-requests-commenceDate-' + j + '" id="tradeworker-requests-commenceDate-' + j + '" value="' + commencementDate + '" readonly></td> </tr> <tr> <td colspan="6"> <input type="text" name="tradeworker-requests-jobDescription-' + j + '" id="tradeworker-requests-jobDescription-' + j + '" value="' + description + '" readonly> </td> </tr> <tr> <td class="label">Address</td> <td colspan="2"> <input type="text" name="tradeworker-requests-sublocality_level_1-' + j + '" id="tradeworker-requests-sublocality_level_1-' + j + '" value="' + areaName + '" readonly> </td> <td colspan="2"> <input type="text" name="tradeworker-requests-locality-' + j + '" id="tradeworker-requests-locality-' + j + '" value="' + locationName + '" readonly> </td> <td colspan="1"> <input type="text" name="tradeworker-requests-country-' + j + '" id="tradeworker-requests-country-' + j + '" value="' + province + '" readonly> </td> </tr> <tr> <td class="label">Status</td> <td colspan="4"> <input type="text" name="tradeworker-requests-status-' + j + '" id="tradeworker-requests-status-' + j + '" value="' + status + '" readonly></td> <td> <div class="full-width" style="padding-left: 50%"><input type="radio" name="job-requests" id="tradeworker-requests-quoteID-' + j + '" value="' + quoteID + '" readonly></div></td> </tr> <tr style="height: 0.5em;background-color: #0a0a0a"> <td colspan="6"></td> </tr>'
        }
        html += '</table>';
        document.getElementById("tradeworker-manageRequest-areainformation").innerHTML = html;
    }
    else{
        var html = "<h3>There are no requests to display</h3>";
        document.getElementById("tradeworker-manageRequest-areainformation").innerHTML = html;
    }
}

function tradeworkerDisplayOngoingJobs(){
    var result = false;
    if(tradeworkerJobRequestArray.length > 0){
        var html = '';

        for(var j = 0;j < tradeworkerJobRequestArray.length;j++) {
                if(tradeworkerJobRequestArray[j].hasOwnProperty('QuoteID') && tradeworkerJobRequestArray[j].hasOwnProperty('JobID')){
                    result = true;
                    if(tradeworkerJobRequestArray[j]['Status'] == 3 && tradeworkerJobRequestArray[j]['HomeuserResponse'] == 3 && tradeworkerJobRequestArray[j]['JobStatus'] == 0){
                        var jobProceedDate = tradeworkerJobRequestArray[j]['JobProceedDate'];
                        var agreedPrice = tradeworkerJobRequestArray[j]['AgreedPrice'];
                        var estimatedCompletionDate = tradeworkerJobRequestArray[j]['EstimatedCompletionDate'];
                        var status = tradeworkerJobRequestArray[j]['JobStatus'];
                        var workType = tradeworkerJobRequestArray[j]['WorkType'];
                        var tableIndex = j;
                        //This will be a button that toggles the request information so that the user can see details
                        //var requestDetails;
                        if(j == 0){
                            html +=  '<table><thead>' +
                                '<tr>' +
                                '<th>Job Start Date</th>' +
                                '<th>Agreed Price</th>' +
                                '<th>Estimated Complete Date</th>' +
                                '<th>Work Type</th>' +
                                '<th>Status</th>' +
                                '<th>Selected</th>' +
                                '</tr></thead><tbody>';
                        }

                        html += '' +
                            '<tr style="height: 3em">' +
                            '<td>' + jobProceedDate + '</td>' +
                            '<td>' + agreedPrice + '</td>' +
                            '<td>' + estimatedCompletionDate + '</td>' +
                            '<td>' + workType + '</td>' +
                            '<td>' + status + '</td>' +
                            '<td><div class="full-height full-width" style="text-align: center;padding-top: 1em"><input type="radio" name="job-initiate-selected" id="requested-user-id" value="' + tableIndex + '"></div></td>' +
                            '</tr>' +
                            '';

                        if(j == tradeworkerJobRequestArray.length - 1){
                            html +='</tbody></table>';

                        }
                    }
                }

        }
        document.getElementById('tradeworker-ongoingJobs-areainformation').innerHTML = html;
    }
    if(!result){

        document.getElementById('tradeworker-ongoingJobs-areainformation').innerHTML = "<h3>There are no ongoing jobs to display</h3>";
    }
}

var tradeworkerJobRequestArray;
function handleTradeworkerFetchJobRequests(response){
    tradeworkerJobRequestArray = JSON.parse(response);
    //console.log("It got here:" + response);
    var value;
    console.log(tradeworkerJobRequestArray);
    if(typeof tradeworkerJobRequestArray == 'object'){
        //prints out the object use it to see what values need to be added to the html
        //genericPrintObject(tradeworkerJobRequestArray);
        tradeworkerDisplayRequest();
        tradeworkerDisplayOngoingJobs();
        //console.log("The following is a test: " + tradeworkerJobRequestArray[0]['JobDescription']);
    }
    else if(typeof tradeworkerJobRequestArray == 'boolean'){
        if(tradeworkerJobRequestArray == false)
            console.log("Job request failed: " + tradeworkerJobRequestArray);
        else if(tradeworkerJobRequestArray == true){
            console.log("Job array filled");
        }
    }
    else{
        console.log("Response not recognized" + typeof tradeworkerJobRequestArray + " value: " + tradeworkerJobRequestArray);
    }
}
var tradeworkerRequestsToAcceptArray;
var tradeworkerRequestCursor = 0;

function tradeworkerDisplayRequestAcceptedNotification(){
    if(tradeworkerRequestCursor < tradeworkerRequestsToAcceptArray.length) {
        var AreaName = tradeworkerRequestsToAcceptArray[tradeworkerRequestCursor]['AreaName'];
        var City = tradeworkerRequestsToAcceptArray[tradeworkerRequestCursor]['City'];
        var ContactNumber = tradeworkerRequestsToAcceptArray[tradeworkerRequestCursor]['ContactNumber'];
        var JobCommencementDate = tradeworkerRequestsToAcceptArray[tradeworkerRequestCursor]['JobCommencementDate'];
        var JobDescription = tradeworkerRequestsToAcceptArray[tradeworkerRequestCursor]['JobDescription'];
        var Name = tradeworkerRequestsToAcceptArray[tradeworkerRequestCursor]['Name'];
        var QuoteID = tradeworkerRequestsToAcceptArray[tradeworkerRequestCursor]['QuoteID'];
        var Road = tradeworkerRequestsToAcceptArray[tradeworkerRequestCursor]['Road'];
        var StreetNumber = tradeworkerRequestsToAcceptArray[tradeworkerRequestCursor]['StreetNumber'];
        var Surname = tradeworkerRequestsToAcceptArray[tradeworkerRequestCursor]['Surname'];
        var WorkType = tradeworkerRequestsToAcceptArray[tradeworkerRequestCursor]['workType'];
        var locationName = tradeworkerRequestsToAcceptArray[tradeworkerRequestCursor]['locationName'];
        tradeworkerRequestCursor++;
        var html = "<h1>Work Request Confirmation:</h1> " +
            "<h3>Request Details</h3>" +
                "<row>" +
                    "<h5>Work Details</h5> " +
                    "<form id='tradeworker-notification-request-form' name='tradeworker-notification-request-form'>" +
                    "<column class='large-4 medium-4 small-12'><input type=\"hidden\" name=\"ignore-tradeworker-request-notification-quoteID\" id=\"tradeworker-request-notification-quoteID\" value=" + QuoteID + "></column>" +
                    "</form>" +
                    "<column class='large-4 medium-4 small-12'><label>Date tradeworker is to come: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-commencementDate\" id=\"tradeworker-request-notification-commencementDate\" value=" + JobCommencementDate + " readonly></column>" +
                    "<column class='large-4 medium-4 small-12'><label>Job Type: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-jobType\" id=\"tradeworker-request-notification-jobType\" value=" + WorkType + " readonly></column> " +
                    "<column class='large-12 medium-12 small-12'><label>Job Description: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-JobDescription\" id=\"tradeworker-request-notification-JobDescription\" value=" + JobDescription + " readonly></column> " +
                    "<h5>Address Details</h5> " +
                    "<column class='large-4 medium-4 small-12'><label>Number: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-number\" id=\"tradeworker-request-notification-number\" value=" + StreetNumber + " readonly></column>" +
                    "<column class='large-4 medium-4 small-12'><label>Road: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-road\" id=\"tradeworker-request-notification-road\" value=" + Road + " readonly></column>" +
                    "<column class='large-4 medium-4 small-12'><label>SubArea: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-subarea\" id=\"tradeworker-request-notification-subarea\" value=" + locationName + " readonly></column> " +
                    "<column class='large-6 medium-6 small-12'><label>Area: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-area\" id=\"tradeworker-request-notification-area\" value=" + AreaName + " readonly></column>" +
                    "<column class='large-6 medium-6 small-12'><label>Province: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-province\" id=\"tradeworker-request-notification-province\" value=" + City + " readonly></column>" +
                    "<h5>Tradeworker Details</h5> " +
                    "<column class='large-4 medium-4 small-12'><label>Tradeworker name: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-name\" id=\"tradeworker-request-notification-name\" value=" + Name + " readonly></column>" +
                    "<column class='large-4 medium-4 small-12'><label>Tradeworker surname: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-surname\" id=\"tradeworker-request-notification-surname\" value=" + Surname + " readonly></column>" +
                    "<column class='large-4 medium-4 small-12'><label>Tradeworker contact details: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-contactNumber\" id=\"tradeworker-request-notification-contactNumber\" value=" + ContactNumber + " readonly></column> " +
                    "<column class='large-4 medium-4 small-12'><button type=\"submit\" class=\"success button radius\" id=\"tradeworker-request-notification-button\" onclick=\"sendAJAXRequest('tradeworker-accept-confirmation',handletradeworkerAcceptConfirmationResponse,'tradeworker-notification-request-form');\"> Confirm </button></column> " +
                    "<column class='large-4 medium-4 small-12'><p>*note: Please look under jobs initiated tab for further details or to cancel job</p></column> " +
                    "</row>";

        $('#tradeworker-homepage-notification-modal').foundation('toggle');
        document.getElementById("tradeworker-homepage-notification-modal-additionalInfo").innerHTML = html;
    }
    else{
        console.log("No more notifications to display");
    }
}

function handletradeworkerAcceptConfirmationResponse(response){
    var result = JSON.parse(response);
    console.log("This is the type: " + typeof result + " and the value of the response: " + result);
    if(typeof result == 'boolean'){
        if(result){
            var html = "<h3>Request Acknowledged</h3>";
            if(tradeworkerRequestCursor < tradeworkerRequestsToAcceptArray.length){
                $('#tradeworker-homepage-notification-modal').foundation('toggle');
                tradeworkerDisplayRequestAcceptedNotification();
            }
            else{
                $('#tradeworker-homepage-notification-modal-response').foundation('toggle');
                document.getElementById("tradeworker-homepage-notification-modal-response-additionalInfo").innerHTML = html;
            }

        }
        else{
            //Failed to accept request on server
        }
    }
}

function tradeworkerTerminateJobInitiate(){
    console.log("Should be terminating");
}

function tradeworkerExtendJobInitiate(){
    console.log("Should be extending");
}

function tradeworkerCompleteJobInitiate(){
    console.log("Should be completing");
}

function tradeworkerRequestsNotifier(){
    //$('#tradeworker-homepage-notification-modal').foundation('toggle');
    //document.getElementById("tradeworker-homepage-notification-modal-additionalInfo").innerHTML = "he;;;;;oooooo";
    sendAJAXRequest('tradeworker-requests-accepted-notifications',handletradeworkerRequestsAcceptedNotificationArrayFill);

}

function handletradeworkerRequestsAcceptedNotificationArrayFill(response){
    tradeworkerRequestsToAcceptArray = JSON.parse(response);
    console.log("Notification is being added: " + response);
    if(typeof tradeworkerRequestsToAcceptArray == 'object'){
        genericPrintObject(tradeworkerRequestsToAcceptArray);

        if(tradeworkerRequestsToAcceptArray.length > 0){
            tradeworkerDisplayRequestAcceptedNotification();
        }
    }
    else if(typeof tradeworkerRequestsToAcceptArray == 'boolean'){
        console.log("There are no notifications to display: " + tradeworkerRequestsToAcceptArray);
    }
}

//var homeuserRequestsToAcceptArray;
var homeuserRequestCursor = 0;

function homeuserDisplayRequestAcceptedNotification(){
    if(homeuserJobRequestArray.length > 0)
    if(homeuserRequestCursor < homeuserJobRequestArray.length) {
        while(homeuserRequestCursor < homeuserJobRequestArray.length) {
            if (homeuserJobRequestArray[homeuserRequestCursor].hasOwnProperty("Status-0") && homeuserJobRequestArray[homeuserRequestCursor].hasOwnProperty("HomeuserResponse-0")) {
                if (homeuserJobRequestArray[homeuserRequestCursor]['Status-0'] == 1 && homeuserJobRequestArray[homeuserRequestCursor]['HomeuserResponse-0'] == 0) {
                    var AreaName = homeuserJobRequestArray[homeuserRequestCursor]['AreaName'];
                    var City = homeuserJobRequestArray[homeuserRequestCursor]['Province'];
                    var ContactNumber = homeuserJobRequestArray[homeuserRequestCursor]['ContactNumber-0'];
                    var DateInitialised = homeuserJobRequestArray[homeuserRequestCursor]['DateInitialised'];
                    var JobCommencementDate = homeuserJobRequestArray[homeuserRequestCursor]['JobCommencementDate'];
                    var JobDescription = homeuserJobRequestArray[homeuserRequestCursor]['JobDescription'];
                    var Name = homeuserJobRequestArray[homeuserRequestCursor]['Name-0'];
                    var QuoteID = homeuserJobRequestArray[homeuserRequestCursor]['QuoteID-0'];
                    var Road = homeuserJobRequestArray[homeuserRequestCursor]['Road'];
                    var StreetNumber = homeuserJobRequestArray[homeuserRequestCursor]['StreetNumber'];
                    var Surname = homeuserJobRequestArray[homeuserRequestCursor]['Surname-0'];
                    var WorkType = homeuserJobRequestArray[homeuserRequestCursor]['WorkType'];
                    var locationName = homeuserJobRequestArray[homeuserRequestCursor]['locationName'];
                    var html = "<h1>Work Request Confirmation:</h1> " +
                        "<h3>Request Details</h3>" +
                        "<row>" +
                        "<h5>Work Details</h5> " +
                        "<form id='homeuser-notification-request-form' name='homeuser-notification-request-form'>" +
                        "<column class='large-4 medium-4 small-12'><input type=\"hidden\" name=\"ignore-homeuser-request-notification-quoteID\" id=\"homeuser-request-notification-quoteID\" value=" + QuoteID + "></column>" +
                        "</form>" +
                        "<column class='large-4 medium-4 small-12'><label>Date Quote Created: </label><input type=\"text\" name=\"ignore-homeuser-request-notification-DateInitialised\" id=\"homeuser-request-notification-DateInitialised\" value=" + DateInitialised + " readonly></column>" +
                        "<column class='large-4 medium-4 small-12'><label>Date tradeworker is to come: </label><input type=\"text\" name=\"ignore-homeuser-request-notification-commencementDate\" id=\"homeuser-request-notification-commencementDate\" value=" + JobCommencementDate + " readonly></column>" +
                        "<column class='large-4 medium-4 small-12'><label>Job Type: </label><input type=\"text\" name=\"ignore-homeuser-request-notification-jobType\" id=\"homeuser-request-notification-jobType\" value=" + WorkType + " readonly></column> " +
                        "<column class='large-12 medium-12 small-12'><label>Job Description: </label><input type=\"text\" name=\"ignore-homeuser-request-notification-JobDescription\" id=\"homeuser-request-notification-JobDescription\" value=" + JobDescription + " readonly></column> " +
                        "<h5>Address Details</h5> " +
                        "<column class='large-4 medium-4 small-12'><label>Number: </label><input type=\"text\" name=\"ignore-homeuser-request-notification-number\" id=\"homeuser-request-notification-number\" value=" + StreetNumber + " readonly></column>" +
                        "<column class='large-4 medium-4 small-12'><label>Road: </label><input type=\"text\" name=\"ignore-homeuser-request-notification-road\" id=\"homeuser-request-notification-road\" value=" + Road + " readonly></column>" +
                        "<column class='large-4 medium-4 small-12'><label>SubArea: </label><input type=\"text\" name=\"ignore-homeuser-request-notification-subarea\" id=\"homeuser-request-notification-subarea\" value=" + locationName + " readonly></column> " +
                        "<column class='large-6 medium-6 small-12'><label>Area: </label><input type=\"text\" name=\"ignore-homeuser-request-notification-area\" id=\"homeuser-request-notification-area\" value=" + AreaName + " readonly></column>" +
                        "<column class='large-6 medium-6 small-12'><label>Province: </label><input type=\"text\" name=\"ignore-homeuser-request-notification-province\" id=\"homeuser-request-notification-province\" value=" + City + " readonly></column>" +
                        "<h5>Tradeworker Details</h5> " +
                        "<column class='large-4 medium-4 small-12'><label>Tradeworker name: </label><input type=\"text\" name=\"ignore-homeuser-request-notification-name\" id=\"homeuser-request-notification-name\" value=" + Name + " readonly></column>" +
                        "<column class='large-4 medium-4 small-12'><label>Tradeworker surname: </label><input type=\"text\" name=\"ignore-homeuser-request-notification-surname\" id=\"homeuser-request-notification-surname\" value=" + Surname + " readonly></column>" +
                        "<column class='large-4 medium-4 small-12'><label>Tradeworker contact details: </label><input type=\"text\" name=\"ignore-homeuser-request-notification-contactNumber\" id=\"homeuser-request-notification-contactNumber\" value=" + ContactNumber + " readonly></column> " +
                        "<column class='large-4 medium-4 small-12'><button type=\"submit\" class=\"success button radius\" id=\"register-button\" onclick=\"sendAJAXRequest('homeuser-accept-request',handleHomeuserAcceptRequestResponse,'homeuser-notification-request-form');\"> Confirm </button></column> " +
                        "<column class='large-4 medium-4 small-12'><button type=\"submit\" class=\"alert button radius\" id=\"register-button\" onclick=\"sendAJAXRequest('homeuser-deny-request',handleHomeuserRejectRequestResponse,'homeuser-notification-request-form');\"> Deny </button></column> " +
                        "<column class='large-4 medium-4 small-12'><p>*note: that by confirming this you will be sending the address details you selected and your contact details(provided) to the tradeworker</p></column> " +
                        "</row>";

                    $('#homeuser-homepage-notification-modal').foundation('toggle');
                    document.getElementById("homeuser-homepage-notification-modal-additionalInfo").innerHTML = html;
                }

            }
            homeuserRequestCursor++;
        }
    }
    else{
        console.log("No more notifications to display");
    }
}

function handleHomeuserRejectRequestResponse(response){
    var result = JSON.parse(response);
    console.log("This is the type: " + typeof result + " and the value of the response: " + result);
    if(typeof result == 'boolean'){
        if(result){
            var html = "<h3>Request(s) Rejected</h3>";
            if(homeuserRequestCursor < homeuserJobRequestArray.length){
                $('#homeuser-homepage-notification-modal').foundation('toggle');
                homeuserDisplayRequestAcceptedNotification();
            }
            else{
                $('#homeuser-homepage-notification-modal-response').foundation('toggle');
                document.getElementById("homeuser-homepage-notification-modal-response-additionalInfo").innerHTML = html;
            }

        }
        else{
            //Failed to accept request on server
        }
    }
}

function handleHomeuserAcceptRequestResponse(response){
    var result = JSON.parse(response);
    console.log("This is the type: " + typeof result + " and the value of the response: " + result);
    if(typeof result == 'boolean'){
        if(result){
            var html = "<h3>Request Accepted</h3>";
            if(homeuserRequestCursor < homeuserJobRequestArray.length){
                $('#homeuser-homepage-notification-modal').foundation('toggle');
                homeuserDisplayRequestAcceptedNotification();
            }
            else{
                $('#homeuser-homepage-notification-modal-response').foundation('toggle');
                document.getElementById("homeuser-homepage-notification-modal-response-additionalInfo").innerHTML = html;
            }

        }
        else{
            //Failed to accept request on server
        }
    }
}

function homeuserRequestsNotifier(){
    //$('#homeuser-homepage-notification-modal').foundation('toggle');
    //document.getElementById("homeuser-homepage-notification-modal-additionalInfo").innerHTML = "he;;;;;oooooo";
    sendAJAXRequest('homeuser-requests-accepted-notifications',handleHomeuserRequestsAcceptedNotificationArrayFill);

}

function handleHomeuserRequestsAcceptedNotificationArrayFill(response){
    homeuserRequestsToAcceptArray = JSON.parse(response);
    console.log("Notification is being added: " + response);
    if(typeof homeuserRequestsToAcceptArray == 'object'){
        genericPrintObject(homeuserRequestsToAcceptArray);

        if(homeuserRequestsToAcceptArray.length > 0){
            homeuserDisplayRequestAcceptedNotification();
        }
    }
    else if(typeof homeuserRequestsToAcceptArray == 'boolean'){
        console.log("There are no notifications to display: " + homeuserRequestsToAcceptArray);
    }
}

function removeHomeuserJobRequestEntry(){
    console.log("Should be removing the job request entry selected: ");
}

function editHomeuserJobRequestEntry(){
    var input = $("form input[name=job-requests]:radio");
    console.log("test" + input.length);
    if(input.length > 0)
        for(var i = 0 ; i < input.length ; i++){
            //console.log("should be printing :" + input[i].checked);
            if(input[i].checked){
                //console.log('The following request was selected: ' + i);
                //console.log(input[i]);
                document.getElementById("homeuser-selected-request-id").value = input[i].value;
                homeuserManageRequestModal(input[i].value);
                //sendAJAXRequest('tradeworker-accept-request',handleTradeworkerAcceptRequest,'tradeworker-selected-request');
            }
        }
    //console.log(input);
}

function homeuserManageRequestModal(tableIndex){
    var street = homeuserJobRequestArray[tableIndex]["Road"];
    var streetNumber = homeuserJobRequestArray[tableIndex]["StreetNumber"];
    var subLocality = homeuserJobRequestArray[tableIndex]["AreaName"];
    var locality = homeuserJobRequestArray[tableIndex]["locationName"];
    var province = homeuserJobRequestArray[tableIndex]["Province"];
    var tableIndex = tableIndex;
    var jobDescription = homeuserJobRequestArray[tableIndex]["JobDescription"];
    var dateInitialised = homeuserJobRequestArray[tableIndex]["DateInitialised"];
    var commencementDate = homeuserJobRequestArray[tableIndex]["JobCommencementDate"];
    //var status = homeuserJobRequestArray[tableIndex]["Accepted"];
    var jobType = homeuserJobRequestArray[tableIndex]["WorkType"];
    var numWorkers = homeuserJobRequestArray[tableIndex]["NumberOfWorkersRequested"];
    var numWorkersAccepted = homeuserJobRequestArray[tableIndex]["NumberOfWorkersAccepted"];
    var html = '<h3>Request information</h3><table>';
    html += '<tr> ' +
            '<td class="label">Address</td> ' +
            '<td><input type="text" name="homeuser-manageRTradeworker-street_number-' + tableIndex + '" id="homeuser-manageRTradeworker-street_number-' + tableIndex + '" value="' + streetNumber + '"  readonly> </td>' +
            '<td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-route-' + tableIndex + '" id="homeuser-manageRTradeworker-route-' + tableIndex + '" value="' + street + '"  readonly> </td>' +
            '<td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-sublocality_level_1-' + tableIndex + '" id="homeuser-manageRTradeworker-sublocality_level_1-' + tableIndex + '" value="' + subLocality + '"  readonly> </td>' +
        '</tr> ' +
        '<tr> ' +
            '<td></td> ' +
            '<td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-locality-' + tableIndex + '" id="homeuser-manageRTradeworker-locality-' + tableIndex + '" value="' + locality + '"  readonly> </td> ' +
            '<td colspan="3"> <input type="text" name="homeuser-manageRTradeworker-country-' + tableIndex + '" id="homeuser-manageRTradeworker-country-' + tableIndex + '" value="' + province + '"  readonly> </td> ' +
        '</tr> ' +
        '<tr> ' +
            '<td class="label">Date initialised:</td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-dateInitialised-' + tableIndex + '" id="homeuser-manageRTradeworker-initialisedDate-' + tableIndex + '" value="' + dateInitialised + '"  readonly> </td> ' +
            '<td class="label" colspan="1">Required Commencement Date:</td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-locality-' + tableIndex + '" id="homeuser-manageRTradeworker-commenceDate-' + tableIndex + '" value="' + commencementDate + '"  readonly> </td> ' +
        '</tr> ' +
        '<tr> ' +
            '<td class="label">Job Description:</td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-WorkType-' + tableIndex + '" id="homeuser-manageRTradeworker-WorkType-' + tableIndex + '" value="' + jobType + '"  readonly> </td> ' +
            '<td colspan="3"> <input type="text" name="homeuser-manageRTradeworker-locality-' + tableIndex + '" id="homeuser-manageRTradeworker-jobDescription-' + tableIndex + '" value="' + jobDescription + '"  readonly> </td> ' +
        '</tr> ' +
        '<tr> ' +
            '<td class="label">Workers Requested</td> <td colspan="1"> <input type="text" name="homeuser-manageRTradeworker-requestedWorkers-' + tableIndex + '" id="homeuser-manageRTradeworker-requestedWorkers-' + tableIndex + '" value="' + numWorkers + '"  readonly> </td>' +
            '<td class="label">Workers Accepted</td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-acceptedWorkers-' + tableIndex + '" id="homeuser-manageRTradeworker-acceptedWorkers-' + tableIndex + '" value="' + numWorkersAccepted + '"  readonly> </td>' +
        '</tr> </table>' +
        '<form id="homeuser-manage-specificRequest-editableInformation-form" name="homeuser-manage-specificRequest-editableInformation-form">' +
        '<div class="row">' +
            //TODO: make elements toggleable so that additional information can be displayed upon submission of form
            //new Foundation.Toggler($("#homeuser-initiateJob-commenceDate-info"),'data-animate="fade-in fade-out"');
        //new Foundation.Toggler($("#homeuser-initiateJob-numberDays-info"),'data-animate="fade-in fade-out"');
        //    Remember to do this after it has been done to the html page else it will not work
        '<h3>Editable information</h3>' +
        '<div class="column large-11 medium 11">' +
        '<label>Required Commencement Date:</label><input type="date" name="homeuser-manageRTradeworker-commenceDate-edit-' + tableIndex + '" id="homeuser-manageRTradeworker-commenceDate-edit-' + tableIndex + '" class="REQ_VAL" value="' + commencementDate + '">' +
        '<div class="additional-info top-padding" id="homeuser-manageRTradeworker-commenceDate-edit-' + tableIndex + '-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please select a date from the drop down</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="column large-11 medium 11">' +
        '<label>Job Description:</label><input type="text" name="homeuser-manageRTradeworker-jobDescription-edit-' + tableIndex + '" id="homeuser-manageRTradeworker-jobDescription-edit-' + tableIndex + '" value="' + jobDescription + '" class="REQ_VAL">' +
        '<div class="additional-info top-padding" id="homeuser-manageRTradeworker-jobDescription-edit-' + tableIndex + '-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please fill in a short description of the job</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</form>';
        //html += "The following should be true:" + homeuserJobRequestArray[0].hasOwnProperty("ContactNumber-0");
        html += '<h3>Tradeworker information</h3><h5>Select Tradeworker to remove, or initiate job with</h5>';
        var onceOff = true;
        var acceptedUser = false;

    for(var k = 0; k < numWorkers;k++){
        if(homeuserJobRequestArray[tableIndex].hasOwnProperty("ContactNumber-" + k) && homeuserJobRequestArray[tableIndex].hasOwnProperty("HomeuserResponse-" + k) && homeuserJobRequestArray[tableIndex].hasOwnProperty("Name-" + k) && homeuserJobRequestArray[tableIndex].hasOwnProperty("Surname-" + k) && homeuserJobRequestArray[tableIndex].hasOwnProperty("Status-" + k)){
            acceptedUser = true;
            if(k == 0){
                html +=  '<form id="homeuser-initiateJob-selection" name="homeuser-initiateJob-selection" ><table><thead>' +
                    '<tr>' +
                    '<th>Name</th>' +
                    '<th>Surname</th>' +
                    '<th>Contact Details</th>' +
                    '<th>Tradeworker Status</th>' +
                    '<th>Status</th>' +
                    '<th>Selected</th>' +
                    '</tr></thead><tbody>';
            }
            var name = homeuserJobRequestArray[tableIndex]['Name-' + k];
            var surname = homeuserJobRequestArray[tableIndex]['Surname-' + k];
            var contactNumber = homeuserJobRequestArray[tableIndex]['ContactNumber-' + k];
            var tradeworkerStatus = homeuserJobRequestArray[tableIndex]['Status-' + k];
            var selected = homeuserJobRequestArray[tableIndex]['QuoteID-' + k];
            if(tradeworkerStatus == 1){
                tradeworkerStatus = "Tradeworker accepted";
            }
            else if(tradeworkerStatus == 3){
                tradeworkerStatus = "Tradeworker confirmed";
            }
            var homeuserStatus = homeuserJobRequestArray[tableIndex]['HomeuserResponse-' + k];
            if(homeuserStatus == 1){
                homeuserStatus = "You accepted";
            }
            else if(homeuserStatus == 3){
                homeuserStatus = "Job Initiated";
            }
            html += '' +
                '<tr style="height: 3em">' +
                '<td>' + name + '</td>' +
                '<td>' + surname + '</td>' +
                '<td>' + contactNumber + '</td>' +
                '<td>' + tradeworkerStatus + '</td>' +
                '<td>' + homeuserStatus + '</td>' +
                '<td><div class="full-height full-width" style="text-align: center;padding-top: 1em"><input type="radio" name="user-initiateJob-selected" id="requested-user-id" value="' + selected + '"></div></td>' +
                '</tr>' +
                '';

            if(k == numWorkers - 1) {
                html += '</tbody></table></form>' +
                    '<form id="homeuser-manage-specificRequest-ID-form" name="homeuser-manage-specificRequest-ID-form">' +
                    '<input type="hidden" id="homeuser-manage-specificRequest-ID" name="homeuser-manage-specificRequest-ID" value="-50">' +
                    '</form>';
                html += '<div class="row">' +
                    '<div class="large-3 large-offset-3 medium-offset-3 medium-3 columns">' +
                    '<button type="top-bar-button button" class="button warning" style="margin-top: 0.2em" onclick="editHomeuserJobRequestEntryInitiateJobWorker()">' +
                    'Initiate Job' +
                    '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
                    '</button>' +
                    '</div>' +
                    '<div class="large-3 large-offset-3 medium-offset-3 medium-3 columns">' +
                    '<button type="top-bar-button button" class="button alert" style="margin-top: 0.2em" onclick="editHomeuserJobRequestEntryRemoveWorker()">' +
                    'Remove' +
                    '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>' +
                    '</button>' +
                    '</div>' +
                    '</div>';
            }
        }
    }

    if(!acceptedUser){
        html += '<h5>No tradeworkers have accepted the request yet</h5>';
    }

    $('#homeuser-manageRequest-modal').foundation('toggle');
    document.getElementById("homeuser-manageRequest-modal-additionalInfo").innerHTML = html;
}

function editHomeuserJobRequestEntryRemoveWorker(){
    console.log("Should be removing the tradeworker from the job request");
}

function homeuserTerminateJobInitiate(){
    console.log("Should be terminating");
}

function homeuserExtendJobInitiate(){
    console.log("Should be extending");
}

function toggleHomeuserJobComment(){
    //console.log("The following is the display value:" + document.getElementById('homeuser-initiateJobCompletion-jobComment-information').style.display);

    $('#homeuser-initiateJobCompletion-jobComment-information').foundation('toggle');
if(document.getElementById('homeuser-initiateJobCompletion-jobComment-information').style.display == "none"){
        //document.getElementById('homeuser-initiateJobCompletion-jobComment').className = "";
        document.getElementById('homeuser-initiateJobCompletion-jobComment').name = "ignore-homeuser-initiateJobCompletion-jobComment";
    }
    else if(document.getElementById('homeuser-initiateJobCompletion-jobComment-information').style.display == "block" || document.getElementById('homeuser-initiateJobCompletion-jobComment-information').style.display == ""){
        //document.getElementById('homeuser-initiateJobCompletion-jobComment').name = document.getElementById('homeuser-initiateJobCompletion-jobComment').name.substr(7);
        //console.log("The following is the substring of the name " + document.getElementById('homeuser-initiateJobCompletion-jobComment').name.substr(7))
        //document.getElementById('homeuser-initiateJobCompletion-jobComment').className = "REQ_VAL";
        document.getElementById('homeuser-initiateJobCompletion-jobComment').name = "homeuser-initiateJobCompletion-jobComment";
    }

}

function toggleHomeuserUserComment(){
    $('#homeuser-initiateJobCompletion-userComment-information').foundation('toggle');
    if(document.getElementById('homeuser-initiateJobCompletion-userComment-information').style.display == "none"){
        //document.getElementById('homeuser-initiateJobCompletion-userComment').className = "";
        document.getElementById('homeuser-initiateJobCompletion-userComment').name = 'ignore-homeuser-initiateJobCompletion-userComment';
    }
    else if(document.getElementById('homeuser-initiateJobCompletion-userComment-information').style.display == "block" || document.getElementById('homeuser-initiateJobCompletion-userComment-information').style.display == "" ){
        //document.getElementById('homeuser-initiateJobCompletion-userComment').className = "REQ_VAL";
        document.getElementById('homeuser-initiateJobCompletion-userComment').name = 'homeuser-initiateJobCompletion-userComment';
    }
}

function homeuserCompleteJobInitiate(){
    console.log("Should be completing");
    var html = '<h3>Initiating completion process</h3>' +
        '<form id="homeuser-initiateJobCompletion-form" name="homeuser-initiateJobCompletion-form">' +
        '<div class="row">' +
        '<div class="column medium-11 large-11">' +
        '<label>Was the job completed to your satisfaction:</label>' +
        '<div class="switch large">' +
        '<input class="switch-input" id="homeuser-initiateJobCompletion-jobSatisfaction-switch" type="checkbox" name="ignore-homeuser-initiateJobCompletion-jobSatisfaction-switch" onclick="toggleHomeuserJobComment()" checked>' +
        '<label class="switch-paddle" for="homeuser-initiateJobCompletion-jobSatisfaction-switch">' +
        '<span class="show-for-sr">Availability</span>' +
        '<span class="switch-active" aria-hidden="true">Yes</span>' +
        '<span class="switch-inactive" aria-hidden="true">no</span>' +
        '</label>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="column large-11 medium 11">' +
        '<div id="homeuser-initiateJobCompletion-jobComment-information" data-toggler data-animate="fade-in fade-out" style="display:none">' +
        '<label>Please enter reason job was not satisfactory:</label><input type="text" name="ignore-homeuser-initiateJobCompletion-jobComment" id="homeuser-initiateJobCompletion-jobComment" placeholder="Sloppy job" class="REQ_VAL">' +
        '<div class="additional-info top-padding" id="homeuser-initiateJobCompletion-jobComment-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please enter a reason why the job was not to your satisfaction</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="column medium-11 large-11">' +
        '<label>Would you recommend this tradeworker to other users:</label>' +
        '<div class="switch large">' +
        '<input class="switch-input" id="homeuser-initiateJobCompletion-userRecommendation-switch" type="checkbox" name="ignore-homeuser-initiateJobCompletion-userRecommendation-switch" onclick="toggleHomeuserUserComment()" checked>' +
        '<label class="switch-paddle" for="homeuser-initiateJobCompletion-userRecommendation-switch">' +
        '<span class="show-for-sr">Availability</span>' +
        '<span class="switch-active" aria-hidden="true">Yes</span>' +
        '<span class="switch-inactive" aria-hidden="true">no</span>' +
        '</label>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="column large-11 medium 11">' +
        '<div id="homeuser-initiateJobCompletion-userComment-information" data-toggler data-animate="fade-in fade-out" style="display:none">' +
        '<label>Please enter reason user work was not satisfactory:</label><input type="text" placeholder="Continuously late" name="ignore-homeuser-initiateJobCompletion-userComment" id="homeuser-initiateJobCompletion-userComment" class="REQ_VAL">' +
        '<div class="additional-info top-padding" id="homeuser-initiateJobCompletion-userComment-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please enter a reason why the user did not work up to your standard</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        //'<div class="row">' +
        //'<div class="column large-11 medium 11">' +
        //'<label>Date to start job:</label><input type="date" name="homeuser-initiateJob-commenceDate" id="homeuser-initiateJob-commenceDate" class="REQ_VAL">' +
        //'<div class="additional-info top-padding" id="homeuser-initiateJob-commenceDate-info" data-toggler data-animate="fade-in fade-out">' +
        //'<p class="help-text no-margins">Please select a date from the drop down</p>' +
        //'</div>' +
        //'</div>' +
        //'</div>' +
        //'<div class="row">' +
        //'<div class="column large-11 medium 11">' +
        //'<label>Estimated days before completion:</label><input type="number" step="1" name="homeuser-initiateJob-numberDays" id="homeuser-initiateJob-numberDays" class="REQ_VAL">' +
        //'<div class="additional-info top-padding" id="homeuser-initiateJob-numberDays-info" data-toggler data-animate="fade-in fade-out">' +
        //'<p class="help-text no-margins">Please enter a positive number 7</p>' +
        //'</div>' +
        //'</div>' +
        //'</div>' +
        //'<div class="row">' +
        //'<div class="column large-11 medium 11">' +
        //'<label>Agreed upon price:</label><input type="number" step="0.01" min="0" name="homeuser-initiateJob-expectedPayment" id="homeuser-initiateJob-expectedPayment" class="REQ_VAL">' +
        //'<div class="additional-info top-padding" id="homeuser-initiateJob-expectedPayment-info" data-toggler data-animate="fade-in fade-out">' +
        //'<p class="help-text no-margins">Please enter a valid positive number 450.00</p>' +
        //'</div>' +
        //'</div>' +
        //'</div>' +
        //'<input type="hidden" value="' + quoteID + '" id="homeuser-initiateJobCompletion-quoteID" name="ignore-homeuser-initiateJob-quoteID">' +
        '</form>';
    html += '<div class="row">' +
        '<div class="large-3 large-offset-8 medium-offset-8 medium-3 columns">' +
        '<button type="top-bar-button button" class="button success" style="margin-top: 0.2em" onclick="sendAJAXRequest(\'homeuser-initiateJobCompletion-request\',handleHomeuserInitiateJobCompletionResponse,\'homeuser-initiateJobCompletion-form\')">' +
        'Complete Job' +
        '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
        '</button>' +
        '</div>' +
        '</div>';

    $('#homeuser-ongoingJobs-modal').foundation('toggle');
    document.getElementById("homeuser-ongoingJobs-modal-additionalInfo").innerHTML = html;
    new Foundation.Toggler($("#homeuser-initiateJobCompletion-jobComment-information"),'data-animate="fade-in fade-out"');
    new Foundation.Toggler($("#homeuser-initiateJobCompletion-userComment-information"),'data-animate="fade-in fade-out"');
    new Foundation.Toggler($("#homeuser-initiateJobCompletion-jobComment-info"),'data-animate="fade-in fade-out"');
    new Foundation.Toggler($("#homeuser-initiateJobCompletion-userComment-info"),'data-animate="fade-in fade-out"');
}

function handleHomeuserInitiateJobCompletionResponse(response){
    console.log("Should be completing the job process after the user recommendation and job recommendation has been done");
    var result = JSON.parse(response);
    console.log(result);
    if(typeof result == 'boolean'){
        if(result){
            console.log("Should be displaying that job has been marked as complete");
        }
        else{
            console.log("Should be displaying that something went wrong while job has been marked as complete");
        }
    }
    else
        console.log("The following is the type: " + typeof result + " the following is the value" + result);
}

function editHomeuserJobRequestEntryInitiateJobWorker(){
    console.log("Should be initiating job with the tradeworker selected:");
    var input = $("form input[name=user-initiateJob-selected]:radio");
    console.log("test" + input.length);
    if(input.length > 0)
        for(var i = 0 ; i < input.length ; i++){
            //console.log("should be printing :" + input[i].checked);
            if(input[i].checked){
                //console.log('The following request was selected: ' + i);
                //console.log(input[i]);
                document.getElementById("homeuser-manage-specificRequest-ID").value = input[i].value;
                var value = input[i].value;

                homeuserInitiateJob(value);
                //homeuserManageRequestModal(input[i].value);
                //sendAJAXRequest('tradeworker-accept-request',handleTradeworkerAcceptRequest,'tradeworker-selected-request');
            }
        }
}

function homeuserInitiateJob(quoteID){
    //console.log("The following is requestID :" + requestID + " the requested user id is: " + requestedUserID);
    var html = "<h3>Initiate job extra details:</h3><h5>Please ensure the following details have been discussed with the requested user before filling in:</h5>";
    html += '<form id="homeuser-initiateJob-form" name="homeuser-initiateJob-form">' +
        '<div class="row">' +
        '<div class="column large-11 medium 11">' +
        '<label>Date to start job:</label><input type="date" name="homeuser-initiateJob-commenceDate" id="homeuser-initiateJob-commenceDate" class="REQ_VAL">' +
        '<div class="additional-info top-padding" id="homeuser-initiateJob-commenceDate-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please select a date from the drop down</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="column large-11 medium 11">' +
        '<label>Estimated days before completion:</label><input type="number" step="1" name="homeuser-initiateJob-numberDays" id="homeuser-initiateJob-numberDays" class="REQ_VAL">' +
        '<div class="additional-info top-padding" id="homeuser-initiateJob-numberDays-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please enter a positive number 7</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="column large-11 medium 11">' +
        '<label>Agreed upon price:</label><input type="number" step="0.01" min="0" name="homeuser-initiateJob-expectedPayment" id="homeuser-initiateJob-expectedPayment" class="REQ_VAL">' +
        '<div class="additional-info top-padding" id="homeuser-initiateJob-expectedPayment-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please enter a valid positive number 450.00</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<input type="hidden" value="' + quoteID + '" id="homeuser-initiateJob-quoteID" name="ignore-homeuser-initiateJob-quoteID">' +
        '</form>';

    html += '<div class="row">' +
        '<div class="large-3 large-offset-8 medium-offset-8 medium-3 columns">' +
        '<button type="top-bar-button button" class="button warning" style="margin-top: 0.2em" onclick="sendAJAXRequest(\'homeuser-initiateJob-request\',handleHomeuserInitiateJobResponse,\'homeuser-initiateJob-form\')">' +
        'Initiate Job' +
        '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
        '</button>' +
        '</div>' +
        '</div>';
    //TODO: make elements toggleable so that additional information can be displayed
    $('#homeuser-manageRequest-modal-response').foundation('toggle');
    document.getElementById("homeuser-manageRequest-modal-response-additionalInfo").innerHTML = html;
    new Foundation.Toggler($("#homeuser-initiateJob-commenceDate-info"),'data-animate="fade-in fade-out"');
    new Foundation.Toggler($("#homeuser-initiateJob-numberDays-info"),'data-animate="fade-in fade-out"');
    new Foundation.Toggler($("#homeuser-initiateJob-expectedPayment-info"),'data-animate="fade-in fade-out"');
}

function handleHomeuserInitiateJobResponse(response){
    var result = JSON.parse(response);
    console.log(result);
    if(typeof result == 'boolean'){
        var html;
        if(result){
            html = "<h3>The job has been initiated</h3>";
        }
        else{
            html = "<h3>The job wasn't initiated</h3>";
        }
        $('#homeuser-manageRequest-modal-response').foundation('toggle');
        document.getElementById("homeuser-manageRequest-modal-response-additionalInfo").innerHTML = html;
    }
    else{
        console.log("Result was not of type boolean " + result);
    }
}

var homeuserJobRequestArray;
function handleHomeuserFetchJobRequests(response){
    homeuserJobRequestArray = JSON.parse(response);
    //console.log("It got here:" + response);
    if(typeof homeuserJobRequestArray == 'object'){
        //One needs to display all relevant information that one can off of a single request
        console.log(homeuserJobRequestArray);
        homeuserRequestCursor = 0;
        homeuserDisplayJobsToInitiate();
        homeuserDisplayRequests();
        homeuserDisplayOngoingJobs();
        homeuserDisplayRequestAcceptedNotification();

    }
    else if(typeof homeuserJobRequestArray == 'boolean'){
        if(homeuserJobRequestArray == false)
        console.log("Job request failed: " + homeuserJobRequestArray);
        else if(homeuserJobRequestArray == true){
            console.log("Job array filled");
        }
    }
    else{
        console.log("Response not recognized" + typeof homeuserJobRequestArray + " value: " + homeuserJobRequestArray);
    }
}

function homeuserDisplayOngoingJobs(){
    var result = false;
    if(homeuserJobRequestArray.length > 0){
        var html = '';

        for(var j = 0;j < homeuserJobRequestArray.length;j++) {
            for (var i = 0; i < homeuserJobRequestArray[0]['NumberOfWorkersRequested']; i++) {
                if(homeuserJobRequestArray[j].hasOwnProperty('QuoteID-' + i) && homeuserJobRequestArray[j].hasOwnProperty('JobID-' + i)){
                    result = true;
                    if(homeuserJobRequestArray[j]['Status-' + i] == 3 && homeuserJobRequestArray[j]['HomeuserResponse-' + i] == 3 && homeuserJobRequestArray[j]['JobStatus-' + i] == 0){
                        var jobProceedDate = homeuserJobRequestArray[j]['JobProceedDate-' + i];
                        var agreedPrice = homeuserJobRequestArray[j]['AgreedPrice-' + i];
                        var estimatedCompletionDate = homeuserJobRequestArray[j]['EstimatedCompletionDate-' + i];
                        var status = homeuserJobRequestArray[j]['JobStatus-' + i];
                        var workType = homeuserJobRequestArray[j]['WorkType'];
                        var tableIndex = j;
                        //This will be a button that toggles the request information so that the user can see details
                        //var requestDetails;
                        if(j == 0){
                            html +=  '<table><thead>' +
                                '<tr>' +
                                '<th>Job Start Date</th>' +
                                '<th>Agreed Price</th>' +
                                '<th>Estimated Complete Date</th>' +
                                '<th>Work Type</th>' +
                                '<th>Status</th>' +
                                '<th>Selected</th>' +
                                '</tr></thead><tbody>';
                        }

                        html += '' +
                            '<tr style="height: 3em">' +
                            '<td>' + jobProceedDate + '</td>' +
                            '<td>' + agreedPrice + '</td>' +
                            '<td>' + estimatedCompletionDate + '</td>' +
                            '<td>' + workType + '</td>' +
                            '<td>' + status + '</td>' +
                            '<td><div class="full-height full-width" style="text-align: center;padding-top: 1em"><input type="radio" name="job-initiate-selected" id="requested-user-id" value="' + tableIndex + '"></div></td>' +
                            '</tr>' +
                            '';

                        if(j == homeuserJobRequestArray.length - 1){
                            html +='</tbody></table>';

                        }
                    }
                }
            }
        }
        document.getElementById('homeuser-ongoingJobs-areainformation').innerHTML = html;
    }
    if(!result){

        document.getElementById('homeuser-ongoingJobs-areainformation').innerHTML = "<h3>There are no ongoing jobs to display</h3>";
    }
}

function homeuserDisplayRequests(){
    var html = "";
    var street;
    var streetNumber;
    var subLocality;
    var locality;
    var province;
    var tableIndex;
    var jobDescription;
    var jobType;
    var dateInitialised;
    var commencementDate;
    var status;
    var numWorkers;
    var numWorkersAccepted;
    var success = false;
    html += "<table>";
    console.log("FIlling job requests table " + homeuserJobRequestArray.length);
    for(var j = 0;j < homeuserJobRequestArray.length; j++){
        success = true;
        console.log("FIlling job requests table");
        street = homeuserJobRequestArray[j]["Road"];
        streetNumber = homeuserJobRequestArray[j]["StreetNumber"];
        subLocality = homeuserJobRequestArray[j]["AreaName"];
        locality = homeuserJobRequestArray[j]["locationName"];
        province = homeuserJobRequestArray[j]["Province"];
        tableIndex = j;
        jobDescription = homeuserJobRequestArray[j]["JobDescription"];
        dateInitialised = homeuserJobRequestArray[j]["DateInitialised"];
        commencementDate = homeuserJobRequestArray[j]["JobCommencementDate"];
        status = homeuserJobRequestArray[j]["Accepted"];
        jobType = homeuserJobRequestArray[j]["WorkType"];
        numWorkers = homeuserJobRequestArray[j]["NumberOfWorkersRequested"];
        numWorkersAccepted = homeuserJobRequestArray[j]["NumberOfWorkersAccepted"];

        html += '<tr> <td class="label">Address</td> <td><input type="text" name="homeuser-manageRTradeworker-street_number-' + j + '" id="homeuser-manageRTradeworker-street_number-' + j + '" value="' + streetNumber + '"  readonly> </td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-route-' + j + '" id="homeuser-manageRTradeworker-route-' + j + '" value="' + street + '"  readonly> </td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-sublocality_level_1-' + j + '" id="homeuser-manageRTradeworker-sublocality_level_1-' + j + '" value="' + subLocality + '"  readonly> </td> </tr> <tr> <td></td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-locality-' + j + '" id="homeuser-manageRTradeworker-locality-' + j + '" value="' + locality + '"  readonly> </td> <td colspan="3"> <input type="text" name="homeuser-manageRTradeworker-country-' + j + '" id="homeuser-manageRTradeworker-country-' + j + '" value="' + province + '"  readonly> </td> </tr> <tr> <td class="label">Date initialised:</td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-locality-' + j + '" id="homeuser-manageRTradeworker-initialisedDate-' + j + '" value="' + dateInitialised + '"  readonly> </td> <td class="label" colspan="1">Required Commencement Date:</td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-locality-' + j + '" id="homeuser-manageRTradeworker-commenceDate-' + j + '" value="' + commencementDate + '"  readonly> </td> </tr> <tr> <td class="label">Job Description:</td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-WorkType-' + j + '" id="homeuser-manageRTradeworker-WorkType-' + j + '" value="' + jobType + '"  readonly> </td> <td colspan="3"> <input type="text" name="homeuser-manageRTradeworker-locality-' + j + '" id="homeuser-manageRTradeworker-jobDescription-' + j + '" value="' + jobDescription + '"  readonly> </td> </tr> <tr> <td class="label">Workers Requested</td> <td colspan="1"> <input type="text" name="homeuser-manageRTradeworker-requestedWorkers-' + j + '" id="homeuser-manageRTradeworker-requestedWorkers-' + j + '" value="' + numWorkers + '"  readonly> </td><td class="label">Workers Accepted</td> <td colspan="1"> <input type="text" name="homeuser-manageRTradeworker-acceptedWorkers-' + j + '" id="homeuser-manageRTradeworker-acceptedWorkers-' + j + '" value="' + numWorkersAccepted + '"  readonly> </td> <td> <div class="full-width" style="padding-left: 50%"><input type="radio" name="job-requests" id="homeuser-manageRTradeworker-requestID-' + j + '" value="' + tableIndex + '" readonly></div> </td> </tr> <tr style="height: 0.5em;background-color: #0a0a0a"> <td colspan="6"></td> </tr>';

    }
    html += "</table>";

    if(!success){
        document.getElementById('homeuser-manageRTradeworker-areainformation').innerHTML = "<h3>There are currently no job requests to display</h3>";
    }
    else
        document.getElementById("homeuser-manageRTradeworker-areainformation").innerHTML = html;
}

function homeuserDisplayJobsToInitiate(){
    var success = false;
    if(homeuserJobRequestArray.length > 0){
        var html = '';
        for(var j = 0;j < homeuserJobRequestArray.length;j++) {
            if(j == 0){
                html +=  '<table><thead>' +
                    '<tr>' +
                    '<th>Name</th>' +
                    '<th>Surname</th>' +
                    '<th>Contact Details</th>' +
                    '<th>Work Type</th>' +
                    '<th>Quote Date</th>' +
                    '<th>Selected</th>' +
                    '</tr></thead><tbody>';
            }

            for (var i = 0; i < homeuserJobRequestArray[0]['NumberOfWorkersRequested']; i++) {
                if(homeuserJobRequestArray[j].hasOwnProperty('QuoteID-' + i)){
                    if(homeuserJobRequestArray[j]['Status-' + i] == 3 && homeuserJobRequestArray[j]['HomeuserResponse-' + i] == 1){
                        success = true;
                        var name = homeuserJobRequestArray[j]['Name-' + i];
                        var surname = homeuserJobRequestArray[j]['Surname-' + i];
                        var contactNumber = homeuserJobRequestArray[j]['ContactNumber-' + i];
                        var workType = homeuserJobRequestArray[j]['WorkType'];
                        var quoteDate = homeuserJobRequestArray[j]['JobCommencementDate'];
                        var tableIndex = j;
                        //This will be a button that toggles the request information so that the user can see details
                        //var requestDetails;

                        html += '' +
                            '<tr style="height: 3em">' +
                            '<td>' + name + '</td>' +
                            '<td>' + surname + '</td>' +
                            '<td>' + contactNumber + '</td>' +
                            '<td>' + workType + '</td>' +
                            '<td>' + quoteDate + '</td>' +
                            '<td><div class="full-height full-width" style="text-align: center;padding-top: 1em"><input type="radio" name="job-initiate-selected" id="requested-user-id" value="' + tableIndex + '"></div></td>' +
                            '</tr>' +
                            '';


                    }
                }
            }

        }
        if(j == homeuserJobRequestArray.length){
            html +='</tbody></table>';

        }
        document.getElementById('homeuser-manageJobInitiate-areainformation').innerHTML = html;
    }
    if(!success){
        document.getElementById('homeuser-manageJobInitiate-areainformation').innerHTML = "<h3>There are currently no jobs to initiate</h3>";
    }
}

function removeWorkerFromJobRequest() {
    console.log("Should be removing selected tradeworker from request");
}

function initiateJobForSelectedWOrker(){
    console.log("Should be initiating job for selected tradeworker");
}

function displayHomeuserJobInitiateEntry(){
    var input = $("form input[name=job-initiate-selected]:radio");
    console.log("test" + input.length);
    if(input.length > 0)
        for(var i = 0 ; i < input.length ; i++){
            //console.log("should be printing :" + input[i].checked);
            if(input[i].checked){
                //console.log('The following request was selected: ' + i);
                //console.log(input[i]);
                document.getElementById("homeuser-selected-initiate-job-id").value = input[i].value;
                homeuserManageRequestModal(input[i].value);
                sendAJAXRequest('tradeworker-accept-request',handleTradeworkerAcceptRequest,'tradeworker-selected-request');
            }
        }
    //console.log(input);
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

function handlerTradeworkerResponse(response){
    var workTypeArray = JSON.parse(response);
    if(typeof workTypeArray == 'boolean') {
        if (workTypeArray) {
            console.log("The work request was successful: " + response + workTypeArray);
            //TODO:Display success to user
            var html = "<h3>Tradeworker Request successful</h3>";
            $('#homeuser-rTradeworker-notification-modal-response').foundation('toggle');
            document.getElementById("homeuser-rTradeworker-notification-modal-response-additionalInfo").innerHTML = html;
        }
        else {
            console.log("The work request was unsuccessful: " + response);
            var html = "<h3>Tradeworker Request unsuccessful</h3>";
            $('#homeuser-rTradeworker-notification-modal-response').foundation('toggle');
            document.getElementById("homeuser-rTradeworker-notification-modal-response-additionalInfo").innerHTML = html;
        }
    }
    else if(typeof workTypeArray == 'number'){
        //TODO:Error reporting
        console.log(workTypeArray + " " + response + typeof workTypeArray);
        var html = "<h3>Tradeworker Request unsuccessful</h3>";
        $('#homeuser-rTradeworker-notification-modal-response').foundation('toggle');
        document.getElementById("homeuser-rTradeworker-notification-modal-response-additionalInfo").innerHTML = html;
    }
    else{
        console.log("The variable is of type: " + typeof workTypeArray + " value: " + workTypeArray);
        var html = "<h3>Tradeworker Request unsuccessful</h3>";
        $('#homeuser-rTradeworker-notification-modal-response').foundation('toggle');
        document.getElementById("homeuser-rTradeworker-notification-modal-response-additionalInfo").innerHTML = html;
    }
}

var homeuserReqTradeWorkerToggleAmount = 0;
var homeuserReqTradeWorkerToggleAmountVisible = 0;
function homeuserReqTradeworkerAdditionalLocationsToggler(nextElement){
    var condition = true;
    //console.log("The following is the amount of toggleAble area's added: " + homeuserReqTradeWorkerToggleAmount);
    //console.log("Value 1 = " + document.getElementById("homeuser-rTradeworker-work-type-" + parseInt(nextElement - 1)).value + " Value 2 = " + document.getElementById("nTradeworkers-homeuser-rTradeworker-" + parseInt(nextElement - 1)).value);

    var valueArray = [homeuserReqTradeWorkerToggleAmount * 3];
    var f = 1;
    for(var t = 1;t <= homeuserReqTradeWorkerToggleAmount * 2;t+=3){
        valueArray[t] = document.getElementById("homeuser-rTradeworker-work-type-" + f).value;

        valueArray[t + 1] = document.getElementById("nTradeworkers-homeuser-rTradeworker-" + f).value;
        valueArray[t + 2] = document.getElementById("job-description-homeuser-rTradeworker-" + f).value;
        f++;
    }

    if(document.getElementById("homeuser-rTradeworker-work-type-" + parseInt(nextElement - 1)).value == "" || document.getElementById("nTradeworkers-homeuser-rTradeworker-" + parseInt(nextElement - 1)).value == ""){
        condition = false;
        if(document.getElementById("homeuser-rTradeworker-work-type-" + parseInt(nextElement - 1)).value == "" && (document.getElementById("homeuser-rTradeworker-work-type-" + parseInt(nextElement - 1) + "-info").style.display == 'none' ||document.getElementById("homeuser-rTradeworker-work-type-" + parseInt(nextElement - 1) + "-info").style.display == ''))
            $("#homeuser-rTradeworker-work-type-" + parseInt(nextElement - 1) + "-info").foundation("toggle");

        if(document.getElementById("nTradeworkers-homeuser-rTradeworker-" + parseInt(nextElement - 1)).value == "" && (document.getElementById("nTradeworkers-homeuser-rTradeworker-" + parseInt(nextElement - 1) + "-info").style.display == 'none'|| document.getElementById("nTradeworkers-homeuser-rTradeworker-" + parseInt(nextElement - 1) + "-info").style.display == ''))
            $("#nTradeworkers-homeuser-rTradeworker-" + parseInt(nextElement - 1) + "-info").foundation("toggle");

        if(document.getElementById("job-description-homeuser-rTradeworker-" + parseInt(nextElement - 1)).value == "" && (document.getElementById("job-description-homeuser-rTradeworker-" + parseInt(nextElement - 1) + "-info").style.display == 'none'|| document.getElementById("job-description-homeuser-rTradeworker-" + parseInt(nextElement - 1) + "-info").style.display == ''))
            $("#job-description-homeuser-rTradeworker-" + parseInt(nextElement - 1) + "-info").foundation("toggle");

    }
    if(document.getElementById("homeuser-rTradeworker-work-type-" + parseInt(nextElement - 1)).value != "" && document.getElementById("homeuser-rTradeworker-work-type-" + parseInt(nextElement - 1) + "-info").style.display == "block"){
        $("#homeuser-rTradeworker-work-type-" + parseInt(nextElement - 1) + "-info").foundation("toggle");
    }
    if(document.getElementById("nTradeworkers-homeuser-rTradeworker-" + parseInt(nextElement - 1)).value != "" && document.getElementById("nTradeworkers-homeuser-rTradeworker-" + parseInt(nextElement - 1) + "-info").style.display == 'block'){
        $("#nTradeworkers-homeuser-rTradeworker-" + parseInt(nextElement - 1) + "-info").foundation("toggle");
    }
    if(document.getElementById("job-description-homeuser-rTradeworker-" + parseInt(nextElement - 1)).value != "" && document.getElementById("job-description-homeuser-rTradeworker-" + parseInt(nextElement - 1) + "-info").style.display == 'block'){
        $("#job-description-homeuser-rTradeworker-" + parseInt(nextElement - 1) + "-info").foundation("toggle");
    }


    if(condition){
        if(document.getElementById("homeuser-rTradeworker-toggle-switch-" + parseFloat(nextElement - 1)).innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo">' && nextElement > homeuserReqTradeWorkerToggleAmount){
            //console.log("Inserting new elements");
            //Injecting html into the document and making sure all toggleable elements are created
            var html = '<div class="full-width full-height" data-toggler data-animate="hinge-in-from-right spin-out" id="additional-homeuser-rTradeworker-skill-' + nextElement + '" style="display: none"><div class="row"><div class="column medium-11 large-11"><label>Select Work Type</label> <select id="homeuser-rTradeworker-work-type-' + nextElement + '" name="homeuser-rTradeworker-work-type-' + nextElement + '" form="register-homeuser-rTradeworker-form" class="REQ_VAL" onfocus="genericFillSkillsSelectTag(\'homeuser-rTradeworker-work-type-' + nextElement + '\')"> </select> <div class="additional-info top-padding" id="homeuser-rTradeworker-work-type-' + nextElement + '-info" data-toggler data-animate="fade-in fade-out"> <p class="help-text no-margins">Please select one of the supplied options from the drop down box</p> </div> </div> </div><div class="row"></div> <div class="row"> <div class="column medium-11 large-11"> <label>Job Description</label><textarea  name="job-description-homeuser-rTradeworker-' + nextElement + '" id="job-description-homeuser-rTradeworker-' + nextElement + '" placeholder="I would like to have a 4 X 4 square meter area tiled" class="REQ_VAL"></textarea> <div class="additional-info top-padding" id="job-description-homeuser-rTradeworker-' + nextElement + '-info" data-toggler data-animate="fade-in fade-out"> <p class="help-text no-margins">Please enter in a short description of what you would like done for the job type selected</p> </div> </div> </div> <div class="row"> <div class="column medium-11 large-11"> <label>Number of tradeworkers to request</label><input type="number" name="nTradeworkers-homeuser-rTradeworker-' + nextElement + '" id="nTradeworkers-homeuser-rTradeworker-' + nextElement + '" placeholder="3" class="REQ_VAL"> <div class="additional-info top-padding" id="nTradeworkers-homeuser-rTradeworker-' + nextElement + '-info" data-toggler data-animate="fade-in fade-out"> <p class="help-text no-margins">Please fill in amount of tradeworkers that you would like of the speciality specified. E.g. 3</p> </div> </div> <div class="column medium-1 large-1" style="margin-top:1.75rem"> <a name="homeuser-rTradeworker-toggle-switch-' + nextElement + '" id="homeuser-rTradeworker-toggle-switch-' + nextElement + '" onclick="homeuserReqTradeworkerAdditionalLocationsToggler(' + parseInt(nextElement + 1) + ')"> <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/> </a> </div> </div> </div>';
            document.getElementById("additional-area-homeuser-rTradeworker").innerHTML += html;

            for(var j = 1;j <= nextElement;j++) {
                var areaToggleID = "#additional-homeuser-rTradeworker-skill-" + j;
                var areaToggleID1 = "#homeuser-rTradeworker-work-type-" + j + "-info";
                var areaToggleID2 = "#job-description-homeuser-rTradeworker-" + j + "-info";
                var areaToggleID3 = "#nTradeworkers-homeuser-rTradeworker-" + j + "-info";
                //console.log("These are the id's being set to be toggleable: " + areaToggleID + " : " + areaToggleID1 + " : " + areaToggleID3);
                new Foundation.Toggler($(areaToggleID), 'data-animate="hinge-in-from-right spin-out"');
                new Foundation.Toggler($(areaToggleID1), 'data-animate="hinge-in-from-right spin-out"');
                new Foundation.Toggler($(areaToggleID2), 'data-animate="hinge-in-from-right spin-out"');
                new Foundation.Toggler($(areaToggleID3), 'data-animate="hinge-in-from-right spin-out"');
            }
            $(areaToggleID).foundation("toggle");
            document.getElementById("homeuser-rTradeworker-toggle-switch-" + parseFloat(nextElement - 1)).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>';
            homeuserReqTradeWorkerToggleAmount++;
            homeuserReqTradeWorkerToggleAmountVisible++;
        }
        else if(document.getElementById("homeuser-rTradeworker-toggle-switch-" + parseFloat(nextElement - 1)).innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo">' && nextElement <= homeuserReqTradeWorkerToggleAmount){
            //Toggle on a previously toggled off element
            //console.log("Retoggling removed element");
            var areaToggleID = "#additional-homeuser-rTradeworker-skill-" + nextElement;
            document.getElementById("homeuser-rTradeworker-work-type-" + nextElement).setAttribute("name","homeuser-rTradeworker-work-type-" + nextElement);
            document.getElementById("nTradeworkers-homeuser-rTradeworker-" + nextElement).setAttribute("name","nTradeworkers-homeuser-rTradeworker-" + nextElement);
            document.getElementById("job-description-homeuser-rTradeworker-" + nextElement).setAttribute("name","job-description-homeuser-rTradeworker-" + nextElement);
            document.getElementById("homeuser-rTradeworker-toggle-switch-" + parseFloat(nextElement - 1)).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>';
            $(areaToggleID).foundation("toggle");
            homeuserReqTradeWorkerToggleAmountVisible++;
        }
        else if(document.getElementById("homeuser-rTradeworker-toggle-switch-" + parseFloat(nextElement - 1)).innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo">'){
            //Toggle off elements
            //console.log("Toggling off an element");
            for(var r = homeuserReqTradeWorkerToggleAmountVisible;r >= nextElement;r--){
                var areaToggleID = "#additional-homeuser-rTradeworker-skill-" + r;
                document.getElementById("homeuser-rTradeworker-work-type-" + r).setAttribute("name","ignore-homeuser-rTradeworker-work-type-" + r);
                document.getElementById("job-description-homeuser-rTradeworker-" + r).setAttribute("name","ignore-job-description-homeuser-rTradeworker-" + r);
                document.getElementById("nTradeworkers-homeuser-rTradeworker-" + r).setAttribute("name","ignore-nTradeworkers-homeuser-rTradeworker-" + r);
                document.getElementById("homeuser-rTradeworker-work-type-" + r).value = "";
                document.getElementById("job-description-homeuser-rTradeworker-" + r).value = "";
                document.getElementById("nTradeworkers-homeuser-rTradeworker-" + r).value = "";
                document.getElementById("homeuser-rTradeworker-toggle-switch-" + parseFloat(r - 1)).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>';
                $(areaToggleID).foundation("toggle");
                homeuserReqTradeWorkerToggleAmountVisible--;
            }

        }
    }
    else{
        console.log("Elements need to be filled in before more areas can be toggled");
    }

    document.getElementById("actual-nTradeworkers-homeuser-rTradeworker").value = parseInt(homeuserReqTradeWorkerToggleAmountVisible + 1);
    console.log("The following is the visible amount of tags: " + homeuserReqTradeWorkerToggleAmountVisible + " compared to tags currently created: " + homeuserReqTradeWorkerToggleAmount);
    var l = 1;
    for(var h = 1;h <= ((homeuserReqTradeWorkerToggleAmountVisible - 1));h++){
        document.getElementById("homeuser-rTradeworker-work-type-" + h).value = valueArray[l];
        document.getElementById("nTradeworkers-homeuser-rTradeworker-" + h).value = valueArray[l + 1];
        document.getElementById("job-description-homeuser-rTradeworker-" + h).value = valueArray[l + 2];
        l+=3;
    }

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

function handleTradeworkerFetchProfileDetails(response)
{
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
            geocodeAddress(geocoder, map, result[i]['locality'] + " " + result[i]['province'],"<h3>" + result[i]['locality'] + "</h3><p>The number of workers available in location: " + result[i]['numWorkers'] + "</p>");
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
            document.getElementById(fillInAddressID + addressType).value = val;
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

function geocodeAddress(geocoder, resultsMap,address,html) {
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            console.log("Should be placing marker");
            resultsMap.setCenter(results[0].geometry.location);
            var infowindow = new google.maps.InfoWindow({
                content: html
            });

            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                title: address
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
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