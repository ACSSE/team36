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
                    if (inputTags.length > 0) {
                        var inputTag;
                        var i;
                        for (i = 0; i < inputTags.length; i++) {
                            inputTag = inputTags[i];
                            objectJSON += ', "' + inputTag.name + '":"' + inputTag.value + '"';
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
            if (inputTags.length > 0) {
                var inputTag;
                var i;
                for (i = 0; i < inputTags.length; i++) {
                    inputTag = inputTags[i];
                    console.log("The following is the input tag " + inputTag.name + " and its value: " +inputTag.value);
                    if (inputTag.name.substring(0,6) != "ignore") {

                        var toggleID = inputTag.name + '-info';
                        //remove the line underneath once all forms have been completed
                        console.log("These are the input tag names: " + inputTag.name);
                        var foundationID = '#' + toggleID;
                        var className = inputTag.className;
                        var displayProperty = document.getElementById(toggleID).style.display.toLowerCase();
                        var currentInputSuccess = true;
                        //Alpha-numeric validation
                        if (className.indexOf("AN_VAL") > -1 && !inputTag.value.match(alphaNumericRE)) {
                            currentInputSuccess = false;
                        }
                        //Required field validation
                        if (className.indexOf("REQ_VAL") > -1 && inputTag.value.length == 0) {
                            currentInputSuccess = false;
                        }
                        //Toggle display of messages
                        if (currentInputSuccess && displayProperty != '' && displayProperty != 'none') {
                            $(foundationID).foundation('toggle');
                        } else if (!currentInputSuccess && (displayProperty == '' || displayProperty == 'none')) {
                            $(foundationID).foundation('toggle');
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
    console.log(success)
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

function addSkillColumn(){

    //var html = '<div class="column medium-8 large-8" ><select id="contractor-work-type-' + skillCounter + '" name="contractor-work-type-' + skillCounter + '"><option value=""></option><script>requestWorkTypes();</script></select></div><div class="column large-offset-2 medium-2 large-2" > <button class="button success" onclick="addSkillColumn()">+</button></div>';
    //document.getElementById("additional-contractor-skills").innerHTML = html;
    //console.log("The following is the counter for the skills: " + skillCounter);
    //console.log("The following is the class: " + document.getElementById("additional-contractor-skill-0").className);
    if(skillCounter < 3) {
        document.getElementById("additional-contractor-skill-" + skillCounter).className = "column medium-8 large-8";
        skillCounter++;
        if (skillCounter == 1) {
            document.getElementById("additional-contractor-skill-" + skillCounter++).className = "column large-offset-2 medium-2 large-2";
        }
    }
    //console.log("This is the classes: " + document.getElementById("test").className);
    //document.getElementById("test").className = "column medium-8 large-8";
    //console.log("This is the classes: " + document.getElementById("test").className);
}

function requestWorkTypes(){
    sendAJAXRequest('fetch_work_types', handleWorkRequestResponse);
}

function handleWorkRequestResponse(response){
    var workTypeArray = JSON.parse(response);
    if (workTypeArray) {
        var test = workTypeArray[0];
        console.log("Work Type Retrieval successful: " + workTypeArray.length);
        if(workTypeArray.length > 0){

            //document.getElementById("contractor-work-type").innerHTML = "This is a test".htmlText;
            var htmlText = '<option value=""></option>';
            for(var i = 0;i<workTypeArray.length;i++){
                htmlText += '<option value="' + workTypeArray[i]["workTypeID"] + '">' + workTypeArray[i]["WorkType"] + '</option>';
            }

            for(var j = 0;j<3;j++){
                document.getElementById("contractor-work-type-" + j).innerHTML = htmlText;
            }
        }

    }
    else{
        console.log("Registration failed");
    }
}

function addContractorLocation(){
    contractorLocation++;
    var html = '<div class="row"><div class="column large-11 medium 11"><label>Area Name</label><input type="text" name="areaname' + contractorLocation + '" id="areaname' + contractorLocation + '" placeholder="Edenvale" class="REQ_VAL"><div class="additional-info top-padding" id="areaname' + contractorLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">An area found within the city E.g. Edenvale</p></div></div></div><div class="row"><div class="column large-11 medium 11"><label>City Name</label><input type="text" name="cityname' + contractorLocation + '" id="cityname' + contractorLocation + '" placeholder="Johannesburg" class="REQ_VAL"><div class="additional-info top-padding" id="cityname' + contractorLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">A city found within a province. E.g. Johannesburg</p></div></div></div><div class="row"><div class="column large-11 medium 11"><label>Province Name</label><input type="text" name="provincename' + contractorLocation + '" id="provincename' + contractorLocation + '" placeholder="Gauteng" class="REQ_VAL"><div class="additional-info top-padding" id="provincename' + contractorLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">A province within South Africa E.g. Gauteng</p></div></div><div class="column medium-1 large-1" style="margin-top: 24.44px"><label></label><button class="button success" onclick="addContractorLocation()">+</button></div>';
    document.getElementById("extraLocations").innerHTML += html;
}

function addContractorLocations(current){
    if(document.getElementById("toggle-area-" + contractorLocation).innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo">'){
    contractorLocation++;
    current *= 3;
    var html = '<div class="row" data-toggler data-animate="hinge-in-from-right spin-out" id="additional-area-' + current + '"><div class="column large-11 medium 11"><label>Area Name</label><input type="text" name="areaname' + contractorLocation + '" id="areaname' + contractorLocation + '" placeholder="Edenvale" class="REQ_VAL"><div class="additional-info top-padding" id="areaname' + contractorLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">An area found within the city E.g. Edenvale</p></div></div></div><div class="row" data-toggler data-animate="hinge-in-from-right spin-out" id="additional-area-' + current + 1 + '"><div class="column large-11 medium 11"><label>City Name</label><input type="text" name="cityname' + contractorLocation + '" id="cityname' + contractorLocation + '" placeholder="Johannesburg" class="REQ_VAL"><div class="additional-info top-padding" id="cityname' + contractorLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">A city found within a province. E.g. Johannesburg</p></div></div></div><div class="row" data-toggler data-animate="hinge-in-from-right spin-out" id="additional-area-' + current + 2 + '"><div class="column large-11 medium 11"><label>Province Name</label><input type="text" name="provincename' + contractorLocation + '" id="provincename' + contractorLocation + '" placeholder="Gauteng" class="REQ_VAL"><div class="additional-info top-padding" id="provincename' + contractorLocation + '-info" data-toggler data-animate="fade-in fade-out"><p class="help-text no-margins">A province within South Africa E.g. Gauteng</p></div></div><div class="column medium-1 large-1" style="margin-top: 24.44px">' + '<a data-toggle="additional-area-'+ (current + 1) * 2 +' additional-area-'+ (current + 1) * 2 + 1 +' additional-area-'+ (current + 1) * 2 + 2 +'" name="toggle-area-'+ current + 1 +'" id="toggle-area-'+ current + 1 +'" onclick="addContractorLocations('+ current + 1 +')"><img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/></a></div>';

    document.getElementById("extraLocations").innerHTML += html;
    document.getElementById("toggle-area-" + contractorLocation - 1).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>';
    }
    //$("#additional-area-0").foundation('toggle');
    //$("#additional-area-1").foundation('toggle');
    //$("#additional-area-2").foundation('toggle');
}

function toggleSwitch(id){
    console.log("Switching " + document.getElementById(id).innerHTML.trim());

        //console.log("This is the value of the other blah - " + document.getElementById('image-toggle-0').src);
    if(document.getElementById(id).innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo">')
        document.getElementById(id).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>';
    else {
        if (document.getElementById("toggle-switch-1").innerHTML.trim() == '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo">' && id == "toggle-switch-0") {
            document.getElementById("toggle-switch-1").innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>';
            $("#additional-contractor-skill-2").foundation('toggle');
        }
        document.getElementById(id).innerHTML = '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>';
    }
    console.log(" --End Switching-- ");

    if(id == "toggle-switch-0"){
        $("#additional-contractor-skill-0").foundation('toggle');
        $("#additional-contractor-skill-1").foundation('toggle');
    }
    else
        $("#additional-contractor-skill-2").foundation('toggle');
}