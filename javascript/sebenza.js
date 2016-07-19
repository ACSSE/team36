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
    var success = JSON.parse(response);
    console.log("Registering: response " + success);
    if (success) {
        document.getElementById("register-modal-button").click();
    }
    else{
        console.log("Registration failed");
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
    if (typeof formID == 'string') {
        //Collect input tags belonging to the form
        var form = document.getElementById(formID);
        if (form != null) {
            var inputTags = form.getElementsByTagName('input');
            var selectTags = form.getElementsByTagName('select');
            var currentInputSuccess = true;
            if(selectTags.length > 0){
                var selectTag;
                for(var j = 0; j < selectTags.length; j++){
                    selectTag = selectTags[j];
                    console.log(selectTag.name);
                    if (selectTag.name.substring(0,6) != "ignore") {

                        var selectToggleID = selectTag.name + '-info';
                        //remove the line underneath once all forms have been completed
                        //console.log("These are the input tag names: " + inputTag.name);
                        var selectFoundationID = '#' + selectToggleID;
                        var selectClassName = selectTag.className;
                        var selectDisplayProperty = document.getElementById(selectToggleID).style.display.toLowerCase();
                        //console.log("These are the select tag names: " + selectTag.name);
                        //Required field validation
                        if (selectClassName.indexOf("REQ_VAL") > -1 && selectTag.value.length == 0) {
                            currentInputSuccess = false;
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

            if (inputTags.length > 0) {
                var inputTag;
                var i;
                for (i = 0; i < inputTags.length; i++) {
                    inputTag = inputTags[i];
                    console.log(inputTag.name);
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
                        }
                        //Required field validation
                        if (inputClassName.indexOf("REQ_VAL") > -1 && inputTag.value.length == 0) {
                            currentInputSuccess = false;
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
        console.log("Work Type Retrieval successful: " + workTypeArray.length);
        if(workTypeArray.length > 0){

            //document.getElementById("contractor-work-type").innerHTML = "This is a test".htmlText;
            var htmlText = '<option value="test" selected>Test</option>';
            for(var i = 0;i<workTypeArray.length;i++){
                htmlText += '<option value="' + workTypeArray[i]["workTypeID"] + '">' + workTypeArray[i]["WorkType"] + '</option>';
            }

            for(var j = 0;j<3;j++){
                document.getElementById("contractor-work-type-" + j).innerHTML = htmlText;
            }
        }

    }
    else{
        console.log("Worktype Retrievals Failed");
    }
}

//Used in contractor registration to add more locations no limit to amount of locations that a user can add, however they are required and need to be filled in.
//I need to decide whether: if user clicks remove locations at a certain tab, if all the locations after are to be removed or only the one directly below the remove button pressed, currently the former is in place.
function addContractorLocations(current){
    if(document.getElementById("toggle-area-" + current).innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo">' && current == contractorLocation){
        //The following statement adds a toggle-able area to the html page which is toggled later and not removed to 'save' time.
        contractorLocation++;
        newCurrent = current *= 3;
        var placeHolder = 1;
        var html = '<div class="row" data-animate="hinge-in-from-right spin-out" id="additional-area-' + newCurrent + '" style="display: none"><div class="column large-11 medium 11"><label>Area Name</label><input type="text" name="areaname-contractor-' + contractorLocation + '" id="areaname-contractor-' + contractorLocation + '" placeholder="Edenvale" class="REQ_VAL"><div class="additional-info top-padding" id="areaname-contractor-' + contractorLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">An area found within the city E.g. Edenvale</p></div></div></div><div class="row" data-toggle  data-animate="hinge-in-from-right spin-out" id="additional-area-' + parseFloat(newCurrent + 1) + '" style="display: none"><div class="column large-11 medium 11"><label>City Name</label><input type="text" name="cityname-contractor-' + contractorLocation + '" id="cityname-contractor-' + contractorLocation + '" placeholder="Johannesburg" class="REQ_VAL"><div class="additional-info top-padding" id="cityname-contractor-' + contractorLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">A city found within a province. E.g. Johannesburg</p></div></div></div><div class="row" data-toggle  data-animate="hinge-in-from-right spin-out" id="additional-area-' + parseFloat(newCurrent + 2) + '" style="display: none"><div class="column large-11 medium 11"><label>Province Name</label><input type="text" name="provincename-contractor-' + contractorLocation + '" id="provincename-contractor-' + contractorLocation + '" placeholder="Gauteng" class="REQ_VAL"><div class="additional-info top-padding" id="provincename-contractor-' + contractorLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">A province within South Africa E.g. Gauteng</p></div></div><div class="column medium-1 large-1" style="margin-top: 24.44px">' + '<a data-toggle="additional-area-'+ parseFloat(contractorLocation * 3) +' additional-area-'+ parseFloat((contractorLocation * 3) + 1)  +' additional-area-'+ parseFloat((contractorLocation * 3) + 2) +'" name="toggle-area-'+ contractorLocation +'" id="toggle-area-'+ contractorLocation +'" onclick="addContractorLocations('+ contractorLocation +')"><img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/></a></div>';
        document.getElementById("extraLocations").innerHTML += html;
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
                        document.getElementById("toggle-area-" + iconChange).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>';
                        iconChange++;
                        locationAmount--;
                    }
                }
            }
        }
    }
    //console.log("The following is the location amount : " + locationAmount);
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