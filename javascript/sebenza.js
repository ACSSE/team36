/*
* AJAX login
* http://stackoverflow.com/questions/16323360/submitting-html-form-using-jquery-ajax
* http://www.ondeweb.in/ajax-login-form-with-jquery-and-php/
* http://stackoverflow.com/questions/4038567/prevent-redirect-after-form-is-submitted
 */
$(document).ready(function () {
    $('#login-button').click(attemptLogin);
    $('#logout-button').click(attemptLogout);
});

var passDialogVisible = false;

function attemptLogin() {
    if (validateForm('login-form')) {
        console.log("The following is username " + $('#uname').val() + " the following is password: " + $('#pword').val())
        $.ajax({
            type: 'POST',
            url: 'php/classes/SebenzaModule.php',
            data: {action: 'login', username: $('#uname').val(), password: $('#pword').val()},
            success: handleLoginResponse
        });
    }
    //This line prevents the submission from redirecting (refreshing) the page - the default action of submit input tags
    return false;
}
function handleLoginResponse(response) {
    console.log("The following is the response:" + response);

    var success = JSON.parse(response);
    console.log("The following is the response:" + response);
    if (success) {
        window.location = 'userPage.php';
    } else {
        if (!passDialogVisible) {
            passDialogVisible = true;
            $('#wrong-password-text').foundation('toggle');
        }
    }
}

function attemptLogout() {
    console.log("The following is username " + $('#uname').val() + " the following is password: " + $('#pword').val())
    $.ajax({
        type: 'POST',
        url: 'php/classes/SebenzaModule.php',
        data: { action:'logout' },
        success: handleLogoutResponse
    });
    //This line prevents the submission from redirecting (refreshing) the page - the default action of submit input tags
    return false;
}

function handleLogoutResponse(response) {
    console.log("The following is the response:" + response);
    var success = JSON.parse(response);
    console.log("The following is the response:" + response);
    if (success) {
        window.location = 'index.php';
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
        var inputTags = form.getElementsByTagName('input');
        var inputTag;
        var i;
        for (i = 0; i < inputTags.length; i++) {
            inputTag = inputTags[i];
            var toggleID = inputTag.name + '-info';
            var foundationID = '#'+toggleID;
            var className = inputTag.className;
            var displayProperty = document.getElementById(toggleID).style.display.toLowerCase();
            var localSuccess = true;
            //Alpha-numeric validation
            if (className.indexOf("AN_VAL") > -1 && !inputTag.value.match(alphaNumericRE)) {
                localSuccess = false;
            }
            //Required field validation
            if (className.indexOf("REQ_VAL") > -1 && inputTag.value.length == 0) {
                localSuccess = false;
            }
            //Toggle display of messages
            if (localSuccess && displayProperty != '' && displayProperty != 'none') {
                $(foundationID).foundation('toggle');
            } else if (!localSuccess && (displayProperty == '' || displayProperty == 'none')) {
                $(foundationID).foundation('toggle');
            }
            //Set success to false if applicable
            success &= localSuccess;
        }
    } else {
        success = false;
    }
    return success;
}