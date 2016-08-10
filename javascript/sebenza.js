/*
* AJAX login
* http://stackoverflow.com/questions/16323360/submitting-html-form-using-jquery-ajax
* http://www.ondeweb.in/ajax-login-form-with-jquery-and-php/
* http://stackoverflow.com/questions/4038567/prevent-redirect-after-form-is-submitted
 */
$(document).ready(function () {
    //Prevents form submission from activating a page refresh
    $('form').submit(function () {return false;});
});

var NOTIFICATION_DISPLAY_TIMEOUT = 5000;  //How long a notification shows
var NEXT_NOTIFICATION_DELAY = 1000;  //How long between notifications - has to be longer than notification animation
var NOTIFICATION_PULL_INTERVAL = 15000; //How often notifications are pulled from the server
var notificationArray = []; //Stores the notifications fetched from the server
var skillCounter = 0;
var contractorLocation = 0;
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
                    //console.log(selectTag.name + " " + selectTag.value);
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
                    //console.log(textareaTag.name + " " + textareaTag.value);
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
                    //console.log(inputTag.name + " " + inputTag.value);
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

var tradeworkerJobRequestArray;
function handleTradeworkerFetchJobRequests(response){
    tradeworkerJobRequestArray = JSON.parse(response);
    //console.log("It got here:" + response);
    var value;
    if(typeof tradeworkerJobRequestArray == 'object'){
        //prints out the object use it to see what values need to be added to the html
        //genericPrintObject(tradeworkerJobRequestArray);
        var html = "<table>";
        for(var j = 0 ; j < tradeworkerJobRequestArray.length ; j++){
            var commencementDate = tradeworkerJobRequestArray[j]['JobCommencementDate'];
            var description = tradeworkerJobRequestArray[j]['JobDescription'];
            var quoteID = tradeworkerJobRequestArray[j]['QuoteID'];
            var status = tradeworkerJobRequestArray[j]['Status'];
            if(status == 0){
                status = "Pending acceptance";
            }
            else if(status == 1){
                status = "Job accepted";
            }
            else if(status == 2){
                status = "rejected";
            }
            var workType = tradeworkerJobRequestArray[j]['WorkType'];
            var workTypeID = tradeworkerJobRequestArray[j]['WorkTypeID'];
            var areaName = tradeworkerJobRequestArray[j]['AreaName'];
            var province = tradeworkerJobRequestArray[j]['Province'];
            var locationName = tradeworkerJobRequestArray[j]['locationName'];
            html += '<tr> <td class="label">Job Details:</td> <td colspan="2"> <input type="text" name="tradeworker-requests-WorkType-' + j +'" id="tradeworker-requests-WorkType-' + j +'" value="' + workType + '" readonly> </td> <td class="label" colspan="2">Required Commencement Date:</td> <td colspan="2"> <input type="text" name="tradeworker-requests-commenceDate-' + j +'" id="tradeworker-requests-commenceDate-' + j +'" value="' + commencementDate + '" readonly></td> </tr> <tr> <td colspan="6"> <input type="text" name="tradeworker-requests-jobDescription-' + j +'" id="tradeworker-requests-jobDescription-' + j +'" value="' + description + '" readonly> </td> </tr> <tr> <td class="label">Address</td> <td colspan="2"> <input type="text" name="tradeworker-requests-sublocality_level_1-' + j +'" id="tradeworker-requests-sublocality_level_1-' + j +'" value="' + areaName + '" readonly> </td> <td colspan="2"> <input type="text" name="tradeworker-requests-locality-' + j +'" id="tradeworker-requests-locality-' + j +'" value="' + locationName + '" readonly> </td> <td colspan="1"> <input type="text" name="tradeworker-requests-country-' + j +'" id="tradeworker-requests-country-' + j +'" value="' + province + '" readonly> </td> </tr> <tr> <td class="label">Status</td> <td colspan="4"> <input type="text" name="tradeworker-requests-status-' + j +'" id="tradeworker-requests-status-' + j +'" value="' + status + '" readonly></td> <td> <div class="full-width" style="padding-left: 50%"><input type="radio" name="job-requests" id="tradeworker-requests-quoteID-' + j +'" value="' + quoteID + '" readonly></div></td> </tr> <tr style="height: 0.5em;background-color: #0a0a0a"> <td colspan="6"></td> </tr>'
        }
        html += '</table>';
        document.getElementById("tradeworker-manageRequest-areainformation").innerHTML = html;
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

var homeuserRequestsToAcceptArray;
var homeuserRequestCursor = 0;

function homeuserDisplayRequestAcceptedNotification(){
    if(homeuserRequestCursor < homeuserRequestsToAcceptArray.length) {
        var AreaName = homeuserRequestsToAcceptArray[homeuserRequestCursor]['AreaName'];
        var City = homeuserRequestsToAcceptArray[homeuserRequestCursor]['City'];
        var ContactNumber = homeuserRequestsToAcceptArray[homeuserRequestCursor]['ContactNumber'];
        var DateInitialised = homeuserRequestsToAcceptArray[homeuserRequestCursor]['DateInitialised'];
        var JobCommencementDate = homeuserRequestsToAcceptArray[homeuserRequestCursor]['JobCommencementDate'];
        var JobDescription = homeuserRequestsToAcceptArray[homeuserRequestCursor]['JobDescription'];
        var Name = homeuserRequestsToAcceptArray[homeuserRequestCursor]['Name'];
        var QuoteID = homeuserRequestsToAcceptArray[homeuserRequestCursor]['QuoteID'];
        var Road = homeuserRequestsToAcceptArray[homeuserRequestCursor]['Road'];
        var StreetNumber = homeuserRequestsToAcceptArray[homeuserRequestCursor]['StreetNumber'];
        var Surname = homeuserRequestsToAcceptArray[homeuserRequestCursor]['Surname'];
        var WorkType = homeuserRequestsToAcceptArray[homeuserRequestCursor]['WorkType'];
        var locationName = homeuserRequestsToAcceptArray[homeuserRequestCursor]['locationName'];
        homeuserRequestCursor++;
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
            if(homeuserRequestCursor < homeuserRequestsToAcceptArray.length){
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
            if(homeuserRequestCursor < homeuserRequestsToAcceptArray.length){
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

var homeuserJobRequestArray;
function handleHomeuserFetchJobRequests(response){
    homeuserJobRequestArray = JSON.parse(response);
    //console.log("It got here:" + response);
    if(typeof homeuserJobRequestArray == 'object'){
        console.log(homeuserJobRequestArray);
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
        html += "<table>";
        console.log("FIlling job requests table " + homeuserJobRequestArray.length);
        for(var j = 0;j < homeuserJobRequestArray.length; j++){
            console.log("FIlling job requests table");
         street = homeuserJobRequestArray[j]["Road"];
         streetNumber = homeuserJobRequestArray[j]["StreetNumber"];
         subLocality = homeuserJobRequestArray[j]["AreaName"];
         locality = homeuserJobRequestArray[j]["City"];
         province = homeuserJobRequestArray[j]["Province"];
         tableIndex = homeuserJobRequestArray[j]["RequestID"];
         jobDescription = homeuserJobRequestArray[j]["JobDescription"];
         dateInitialised = homeuserJobRequestArray[j]["DateInitialised"];
         commencementDate = homeuserJobRequestArray[j]["JobCommencementDate"];
         status = homeuserJobRequestArray[j]["Accepted"];
         jobType = homeuserJobRequestArray[j]["WorkType"];

            html += '<tr> <td class="label">Address</td> <td><input type="text" name="homeuser-manageRTradeworker-street_number-' + j + '" id="homeuser-manageRTradeworker-street_number-' + j + '" value="' + street + '"  readonly> </td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-route-' + j + '" id="homeuser-manageRTradeworker-route-' + j + '" value="' + streetNumber + '"  readonly> </td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-sublocality_level_1-' + j + '" id="homeuser-manageRTradeworker-sublocality_level_1-' + j + '" value="' + subLocality + '"  readonly> </td> </tr> <tr> <td></td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-locality-' + j + '" id="homeuser-manageRTradeworker-locality-' + j + '" value="' + locality + '"  readonly> </td> <td colspan="3"> <input type="text" name="homeuser-manageRTradeworker-country-' + j + '" id="homeuser-manageRTradeworker-country-' + j + '" value="' + province + '"  readonly> </td> </tr> <tr> <td class="label">Date initialised:</td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-locality-' + j + '" id="homeuser-manageRTradeworker-initialisedDate-' + j + '" value="' + dateInitialised + '"  readonly> </td> <td class="label" colspan="1">Required Commencement Date:</td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-locality-' + j + '" id="homeuser-manageRTradeworker-commenceDate-' + j + '" value="' + commencementDate + '"  readonly> </td> </tr> <tr> <td class="label">Job Description:</td> <td colspan="2"> <input type="text" name="homeuser-manageRTradeworker-WorkType-' + j + '" id="homeuser-manageRTradeworker-WorkType-' + j + '" value="' + jobType + '"  readonly> </td> <td colspan="3"> <input type="text" name="homeuser-manageRTradeworker-locality-' + j + '" id="homeuser-manageRTradeworker-jobDescription-' + j + '" value="' + jobDescription + '"  readonly> </td> </tr> <tr> <td class="label">Status</td> <td colspan="4"> <input type="text" name="homeuser-manageRTradeworker-locality-' + j + '" id="homeuser-manageRTradeworker-locality-' + j + '" value="' + status + '"  readonly> </td> <td> <div class="full-width" style="padding-left: 50%"><input type="radio" name="job-requests" id="homeuser-manageRTradeworker-requestID-' + j + '" value="' + tableIndex + '" readonly></div> </td> </tr> <tr style="height: 0.5em;background-color: #0a0a0a"> <td colspan="6"></td> </tr>';

        }
        html += "</table>";
        document.getElementById("homeuser-manageRTradeworker-areainformation").innerHTML = html;

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

function requestWorkTypes(){
    sendAJAXRequest('fetch_work_types', handleWorkRequestResponse);
}

function handlerTradeworkerResponse(response){
    var workTypeArray = JSON.parse(response);
    if(typeof workTypeArray == 'boolean') {
        if (workTypeArray) {
            console.log("The work request was successful: " + response + workTypeArray);
            //TODO:Display success to user
        }
        else {
            console.log("The work request was unsuccessful: " + response);
        }
    }
    else if(typeof workTypeArray == 'number'){
        //TODO:Error reporting
        console.log(workTypeArray + " " + response + typeof workTypeArray);
    }
    else{
        console.log("The variable is of type: " + typeof workTypeArray + " value: " + workTypeArray);
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
                document.getElementById("contractor-work-type-" + j).innerHTML = htmlText;
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
function addContractorLocations(current){

    var location = [];
    var k = 0;
    for(var t = 0; t < locationAmount + 1;t++){
        //console.log("The following is location stored info at location["+ t +"]: " + "provincename-contractor-" + t + ": " + document.getElementById("provincename-contractor-" + t).value + "areaname-contractor-" + t + ": " + document.getElementById("areaname-contractor-" + t).value + "cityname-contractor-" + t + ": " + document.getElementById("cityname-contractor-" + t).value);
        var province = document.getElementById("provincename-contractor-" + t).value;
        var area = document.getElementById("areaname-contractor-" + t).value;
        var city = document.getElementById("cityname-contractor-" + t).value;
        location[k++] = province;
        location[k++] = area;
        location[k++] = city;


        //console.log('he following is stored in the array: ' + location[k-3] + location[k-2]+ location[k-1]);
    }

    if(document.getElementById("toggle-area-" + current).innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo">' && current == contractorLocation){
        //The following statement adds a toggle-able area to the html page which is toggled later and not removed to 'save' time.
        contractorLocation++;
        newCurrent = current *= 3;
        var placeHolder = 1;
        clocations++;
        var html = '<div class="row" data-animate="hinge-in-from-right spin-out" id="additional-area-' + newCurrent + '" style="display: none"><div class="column large-11 medium 11"><label>Area Name</label><input readonly type="text" name="areaname-contractor-' + contractorLocation + '" id="areaname-contractor-' + contractorLocation + '" placeholder="Edenvale" class="REQ_VAL"><div class="additional-info top-padding" id="areaname-contractor-' + contractorLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">An area found within the city E.g. Edenvale</p></div></div></div><div class="row" data-toggle  data-animate="hinge-in-from-right spin-out" id="additional-area-' + parseFloat(newCurrent + 1) + '" style="display: none"><div class="column large-11 medium 11"><label>City Name</label><input readonly type="text" name="cityname-contractor-' + contractorLocation + '" id="cityname-contractor-' + contractorLocation + '" placeholder="Johannesburg" class="REQ_VAL"><div class="additional-info top-padding" id="cityname-contractor-' + contractorLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">A city found within a province. E.g. Johannesburg</p></div></div></div><div class="row" data-toggle  data-animate="hinge-in-from-right spin-out" id="additional-area-' + parseFloat(newCurrent + 2) + '" style="display: none"><div class="column large-11 medium 11"><label>Province Name</label><input readonly type="text" name="provincename-contractor-' + contractorLocation + '" id="provincename-contractor-' + contractorLocation + '" placeholder="Gauteng" class="REQ_VAL"><div class="additional-info top-padding" id="provincename-contractor-' + contractorLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">A province within South Africa E.g. Gauteng</p></div></div><div class="column medium-1 large-1" style="margin-top: 24.44px">' + '<a data-toggle="additional-area-'+ parseFloat(contractorLocation * 3) +' additional-area-'+ parseFloat((contractorLocation * 3) + 1)  +' additional-area-'+ parseFloat((contractorLocation * 3) + 2) +'" name="toggle-area-'+ contractorLocation +'" id="toggle-area-'+ contractorLocation +'" onclick="addContractorLocations('+ contractorLocation +')"><img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/></a></div>';
        document.getElementById("extraLocations").innerHTML += html;
        //console.log("The following area should be toggled: " + "toggle-area-" + parseFloat(contractorLocation - 1))
        document.getElementById("toggle-area-" + parseFloat(contractorLocation - 1)).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>';
        //Have tried to implement the following to-do but it doesn't seem to persist over the function calls.
        //TODO: Add a global variable that handles the areas so that the classes need not be created each time.

        for(var i = 0 ; i <= parseFloat(((contractorLocation - 1) * 3) + 2) ; i++){
            var temp = "";
            if(i % 3 == 0){
                temp = "provincename-contractor-" + placeHolder + "-info";
            }
            else if(i % 3 == 1){
                temp = "cityname-contractor-" + placeHolder + "-info";
            }
            else {
                temp = "areaname-contractor-" + placeHolder + "-info";
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
            document.getElementById("provincename-contractor-" + iconChange).setAttribute("name","provincename-contractor-" + iconChange);
            document.getElementById("areaname-contractor-" + iconChange).setAttribute("name","areaname-contractor-" + iconChange);
            document.getElementById("cityname-contractor-" + iconChange).setAttribute("name","cityname-contractor-" + iconChange);
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
            if(newCurrent < contractorLocation){
                for(var j = ((newCurrent) * 3);j < (((placeHolder) * 3)); j ++){
                    locationsElements[j].toggle();
                    if(j % 3 == 0){
                        document.getElementById("provincename-contractor-" + iconChange).setAttribute("name","ignore-provincename-contractor-" + iconChange);
                        document.getElementById("areaname-contractor-" + iconChange).setAttribute("name","ignore-areaname-contractor-" + iconChange);
                        document.getElementById("cityname-contractor-" + iconChange).setAttribute("name","ignore-cityname-contractor-" + iconChange);
                        document.getElementById("provincename-contractor-" + iconChange).value = "";
                        document.getElementById("areaname-contractor-" + iconChange).value = "";
                        document.getElementById("cityname-contractor-" + iconChange).value = "";
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
        document.getElementById("provincename-contractor-" + c).value = location[k++];
        document.getElementById("areaname-contractor-" + c).value = location[k++];
        document.getElementById("cityname-contractor-" + c).value = location[k++];

    }
    console.log("The following is the location amount : " + locationAmount);
    document.getElementById("locationsAdded-contractor").value = parseFloat(locationAmount + 1);

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

//Used in contractor registration to add more skills up to three maximum
function toggleSwitch(id,validationID){
    //console.log("Switching " + document.getElementById(id).innerHTML.trim());
    var skillsAvailable = document.getElementById("skillsAdded-contractor").value;
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
            document.getElementById('contractor-work-type-1').setAttribute("name","ignore-" + "contractor-work-type-1");
            document.getElementById('contractor-work-type-2').setAttribute("name","ignore-" + "contractor-work-type-2");
            $("#additional-contractor-skill-2").foundation('toggle');
            skillsAvailable -= 2;
        }
        else if(document.getElementById("toggle-switch-1").innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo">' && id == "toggle-switch-0"){
            //The following if statement toggles off the 2nd last toggle-able elements
            document.getElementById('contractor-work-type-1').setAttribute("name","ignore-" + "contractor-work-type-1");
            skillsAvailable -= 1;
        }
        else if(id == "toggle-switch-1"){
            //The following if statement toggles off the last toggle-able elements
            document.getElementById('contractor-work-type-2').setAttribute("name","ignore-" + "contractor-work-type-2");
            skillsAvailable -= 1;
        }

        document.getElementById(id).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>';
    }
    document.getElementById("skillsAdded-contractor").value = skillsAvailable;

    //The following does the actual toggling
    if(id == "toggle-switch-0"){
        $("#additional-contractor-skill-0").foundation('toggle');
        $("#additional-contractor-skill-1").foundation('toggle');
    }
    else
        $("#additional-contractor-skill-2").foundation('toggle');
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
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
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
                    document.getElementById("areaname-contractor-" + clocations).value = val;
                    console.log("it got here!" + val);
                }
                else if (addressType == 'administrative_area_level_1') {
                    document.getElementById("cityname-contractor-" + clocations).value = val;
                    console.log("it got here!" + val);
                }
                else if (addressType == 'country') {
                    document.getElementById("provincename-contractor-" + clocations).value = val;
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