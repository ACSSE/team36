/*
* AJAX login
* http://stackoverflow.com/questions/16323360/submitting-html-form-using-jquery-ajax
* http://www.ondeweb.in/ajax-login-form-with-jquery-and-php/
* http://stackoverflow.com/questions/4038567/prevent-redirect-after-form-is-submitted
 */
$(document).ready(function () {
    $('#login-button').click(attemptLogin);
});

var passDialogVisible = false;

function attemptLogin() {
    console.log("The following is username " + $('#uname').val() + " the following is password: " + $('#pword').val())
    $.ajax({
        type: 'POST',
        url: 'php/classes/SebenzaModule.php',
        data: { action:'login', username: $('#uname').val(), password: $('#pword').val() },
        success: handleLoginResponse
    });
    //This line prevents the submission from redirecting (refreshing) the page - the default action of submit input tags
    return false;
}
function handleLoginResponse(response) {
    console.log("The following is the response:" + response);

    var success = JSON.parse(response);
    console.log("The following is the response:" + response);
    if (success) {
        window.location = 'user_page_template.php';
    } else {
        if (!passDialogVisible) {
            passDialogVisible = true;
            $('#wrong-password-text').foundation('toggle');
        }
    }
}
