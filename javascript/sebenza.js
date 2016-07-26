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
            var currentInputSuccess = true;
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
                            currentInputSuccess = false;
                            if(!focus){
                                console.log("Focusing on " + selectTag.name);
                                document.getElementById(selectTag.name).focus();
                                focus = true;
                            }
                        }
                        //Toggle display of messages
                        if (currentInputSuccess && selectDisplayProperty != '' && selectDisplayProperty != 'none') {
                            $(selectFoundationID).foundation('toggle');
                        } else if (!currentInputSuccess && (selectDisplayProperty == '' || selectDisplayProperty == 'none')) {
                            $(selectFoundationID).foundation('toggle');

                        }
                    }
                }
            }
            else {
                console.log("The form " + formID + " had no select elements to validate.");
            }
            currentInputSuccess = true;
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
                            currentInputSuccess = false;
                            if(!focus){
                                console.log("Focusing on " + textareaTag.name);
                                document.getElementById(textareaTag.name).focus();
                                focus = true;
                            }
                        }
                        //Toggle display of messages
                        if (currentInputSuccess && textareaDisplayProperty != '' && textareaDisplayProperty != 'none') {
                            $(textareaFoundationID).foundation('toggle');
                        } else if (!currentInputSuccess && (textareaDisplayProperty == '' || textareaDisplayProperty == 'none')) {
                            $(textareaFoundationID).foundation('toggle');

                        }
                    }
                }
            }
            else {
                console.log("The form " + formID + " had no textarea elements to validate.");
            }
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
                                console.log("Focusing on " + inputToggleID);
                                document.getElementById(inputTag.name).focus();
                                focus = true;
                            }
                        }
                        //Required field validation
                        if (inputClassName.indexOf("REQ_VAL") > -1 && inputTag.value.length == 0) {
                            currentInputSuccess = false;
                            if(!focus){
                                console.log("Focusing on " + inputToggleID.substring(0,inputToggleID.length-5) + " " + inputTag.name);
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

function requestWorkTypes(){
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
var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    sublocality_level_1: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

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