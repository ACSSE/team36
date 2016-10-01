/**
 * Created by Brandon on 2016/09/17.
 */
var homeuserJobRequestArray;
function handleFetchJobRequests(response){
    homeuserJobRequestArray = JSON.parse(response);
    //
    if(typeof homeuserJobRequestArray == 'object'){
        //One needs to display all relevant information that one can off of a single request
        console.log(homeuserJobRequestArray);
        homeuserRequestCursor = 0;
        homeuserBuildUpInterfaceArrays();
        homeuserDisplayJobsToInitiate();
        homeuserDisplayRequestsCompleted();
        homeuserDisplayRequestsCancelled();
        homeuserDisplayRequests();
        homeuserDisplayOngoingJobs();
        homeuserDisplayRequestAcceptedNotification();
        homeuserDisplayCancelledJobs();
        homeuserDisplayCompletedJobs();

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

function homeuserDisplayCompletedJobs(){
    var html = genericTableGenerate(homeuserCompletedJobsArray,'completed-jobs');
    if(homeuserCompletedJobsArray.length < 1){
        document.getElementById('homeuser-completed-areainformation').innerHTML = "<h3>There are no completed jobs to display</h3>";
    }
    else{
        document.getElementById('homeuser-completed-areainformation').innerHTML = html;
    }
}

function homeuserDisplayCancelledJobs(){
    var html = genericTableGenerate(homeuserCancelledJobsArray,'cancelled-jobs');
    if(homeuserCancelledJobsArray.length < 1){
        document.getElementById('homeuser-cancelled-areainformation').innerHTML = "<h3>There are no ongoing jobs to display</h3>";
    }
    else{
        document.getElementById('homeuser-cancelled-areainformation').innerHTML = html;
    }
}

function homeuserDisplayRequestsCancelled(){
    var html = genericTableGenerate(homeuserCancelledRequestArray,'cancelled-requests');
    if(homeuserCancelledRequestArray.length < 1){
        document.getElementById('homeuser-manageRTradeworker-cancelled-areainformation').innerHTML = "<h3>There are currently no job requests to display</h3>";
    }
    else
        document.getElementById("homeuser-manageRTradeworker-cancelled-areainformation").innerHTML = html;
}

function homeuserDisplayRequestsCompleted(){
    var html = genericTableGenerate(homeuserCompletedRequestArray,'completed-requests');
    if(homeuserCompletedRequestArray.length < 1){
        document.getElementById('homeuser-manageRTradeworker-completed-areainformation').innerHTML = "<h3>There are currently no job requests to display</h3>";
    }
    else
        document.getElementById("homeuser-manageRTradeworker-completed-areainformation").innerHTML = html;
}

function homeuserDisplayOngoingJobs(){
    var html = genericTableGenerate(homeuserOngoingJobsArray,'ongoing-jobs');
    if(homeuserOngoingJobsArray.length < 1){

        document.getElementById('homeuser-ongoingJobs-areainformation').innerHTML = "<h3>There are no ongoing jobs to display</h3>";
    }
    else{
        document.getElementById('homeuser-ongoingJobs-areainformation').innerHTML = html;
    }
}

var picOrbiter = null;

function homeuserDisplayJobFurtherDetails(tableIndex,jobID){
    var street = homeuserJobRequestArray[tableIndex]["Road"];
    var streetNumber = homeuserJobRequestArray[tableIndex]["StreetNumber"];
    var subLocality = homeuserJobRequestArray[tableIndex]["AreaName"];
    var locality = homeuserJobRequestArray[tableIndex]["locationName"];
    var province = homeuserJobRequestArray[tableIndex]["Province"];
    var jobDescription = homeuserJobRequestArray[tableIndex]["JobDescription"];
    var dateInitialised = homeuserJobRequestArray[tableIndex]["DateInitialised"];
    var commencementDate = homeuserJobRequestArray[tableIndex]["JobCommencementDate"];
    var estimatedPrice = homeuserJobRequestArray[tableIndex]["AgreedPrice-" + jobID];
    //var status = homeuserJobRequestArray[tableIndex]["Accepted"];
    var jobType = homeuserJobRequestArray[tableIndex]["WorkType"];
    var numWorkers = homeuserJobRequestArray[tableIndex]["NumberOfWorkersRequested"];
    var numWorkersAccepted = homeuserJobRequestArray[tableIndex]["NumberOfWorkersAccepted"];
    var html = '<h3>Request information</h3>' +
        '<div class="row">' +
        '<div class="column large-11 medium-11">' +
        '<table>';

    html += '<tr> ' +
        '<td class="label">Address</td> ' +
        '<td><input type="text" name="homeuser-ongoingJobs-Details-street_number-' + tableIndex + '" id="homeuser-ongoingJobs-Details-street_number-' + tableIndex + '" value="' + streetNumber + '"  readonly> </td>' +
        '<td colspan="2"> <input type="text" name="homeuser-ongoingJobs-Details-route-' + tableIndex + '" id="homeuser-ongoingJobs-Details-route-' + tableIndex + '" value="' + street + '"  readonly> </td>' +
        '<td colspan="2"> <input type="text" name="homeuser-ongoingJobs-Details-sublocality_level_1-' + tableIndex + '" id="homeuser-ongoingJobs-Details-sublocality_level_1-' + tableIndex + '" value="' + subLocality + '"  readonly> </td>' +
        '</tr> ' +
        '<tr> ' +
        '<td></td> ' +
        '<td colspan="2"> <input type="text" name="homeuser-ongoingJobs-Details-locality-' + tableIndex + '" id="homeuser-ongoingJobs-Details-locality-' + tableIndex + '" value="' + locality + '"  readonly> </td> ' +
        '<td colspan="3"> <input type="text" name="homeuser-ongoingJobs-Details-country-' + tableIndex + '" id="homeuser-ongoingJobs-Details-country-' + tableIndex + '" value="' + province + '"  readonly> </td> ' +
        '</tr> ' +
        '<tr> ' +
        '<td class="label">Request Date initialised:</td> <td colspan="4"> <input type="text" name="homeuser-ongoingJobs-Details-dateInitialised-' + tableIndex + '" id="homeuser-ongoingJobs-Details-initialisedDate-' + tableIndex + '" value="' + dateInitialised + '"  readonly> </td> ' +
        '</tr> ' +
        '<tr> ' +
        '<td class="label">Job Description:</td> <td colspan="2"> <input type="text" name="homeuser-ongoingJobs-Details-WorkType-' + tableIndex + '" id="homeuser-ongoingJobs-Details-WorkType-' + tableIndex + '" value="' + jobType + '"  readonly> </td> ' +
        '<td colspan="3"> <input type="text" name="homeuser-ongoingJobs-Details-locality-' + tableIndex + '" id="homeuser-ongoingJobs-Details-jobDescription-' + tableIndex + '" value="' + jobDescription + '"  readonly> </td> ' +
        '</tr> ' +
        '<tr> ' +
        '<td class="label">Workers Requested</td> <td colspan="1"> <input type="text" name="homeuser-ongoingJobs-Details-requestedWorkers-' + tableIndex + '" id="homeuser-ongoingJobs-Details-requestedWorkers-' + tableIndex + '" value="' + numWorkers + '"  readonly> </td>' +
        '<td class="label">Workers Accepted</td> <td colspan="2"> <input type="text" name="homeuser-ongoingJobs-Details-acceptedWorkers-' + tableIndex + '" id="homeuser-ongoingJobs-Details-acceptedWorkers-' + tableIndex + '" value="' + numWorkersAccepted + '"  readonly> </td>' +
        '</tr> </table>' +
            '</div>' +
        '</div>';
    if(homeuserJobRequestArray[tableIndex]['JobStatus-' + jobID] == 0){
        html += '<form id="homeuser-manage-ongoingJobs-editableInformation-form" name="homeuser-manage-ongoingJobs-editableInformation-form">' +
            '<div class="row">' +
                //TODO: make elements toggleable so that additional information can be displayed upon submission of form
                //new Foundation.Toggler($("#homeuser-initiateJob-commenceDate-info"),'data-animate="fade-in fade-out"');
                //new Foundation.Toggler($("#homeuser-initiateJob-numberDays-info"),'data-animate="fade-in fade-out"');
                //    Remember to do this after it has been done to the html page else it will not work
            '<h3>Editable information:</h3>' +
            '<input type="hidden" value="' + jobID + '" id="homeuser-ongoingJobs-Details-jobID-' + tableIndex + '" name="ignore-homeuser-ongoingJobs-Details-jobID-' + tableIndex + '">' +
            '<div class="column large-10 medium 10">' +
            '<label>Agreed price:</label><input type="number" step="0.01" min="20" name="homeuser-ongoingJobs-Details-agreedPrice-edit-' + tableIndex + '" id="homeuser-ongoingJobs-Details-agreedPrice-edit-' + tableIndex + '" class="REQ_VAL" value="' + estimatedPrice + '">' +
            '<div class="additional-info top-padding" id="homeuser-ongoingJobs-Details-agreedPrice-edit-' + tableIndex + '-info" data-toggler data-animate="fade-in fade-out">' +
            '<p class="help-text no-margins">Please select a date from the drop down</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="column large-offset-8 medium-offset-8 large-3 medium-3">' +
            '<a type="top-bar-button button" class="button success" style="margin-top: 0.2em" onclick="sendAJAXRequest(\'homeuser-update-agreed-price\',handleHomeuserUpdateAgreedPriceResponse,\'homeuser-manage-ongoingJobs-editableInformation-form\');">Edit<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"></a>' +
            '</div>' +
            '</form>';
    }
    if(homeuserJobRequestArray[tableIndex]['JobStatus-' + jobID] == 1){
        html += '<h3>Pictures: Total(' + homeuserJobRequestArray[tableIndex]['JobID-' + jobID + '-' + 'PictureCount'] + ')</h3>' +
            '<div class="row" >' +
            '<div class="column large-11" >' +
            '<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit>' +
            '<ul class="orbit-container" id="homeuser-completed-jobs-pic-orbiter" style="height: 600px;width: 800px">' +
            '<button class="orbit-previous"><span class="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>' +
            '<button class="orbit-next"><span class="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>';
        var toDisplay = false;
        for(var d = 0;d < homeuserJobRequestArray[tableIndex]['JobID-' + jobID + '-' + 'PictureCount'];d++){
            var picFile = homeuserJobRequestArray[tableIndex]['JobID-' + jobID + '-' + 'PictureID-'+ d];



            var picName = picFile.split("_");
            if(!toDisplay){
                html += '<li class="is-active orbit-slide">';
                toDisplay = true;
            }
            else{
                html += '<li class="orbit-slide">';
            }
            html += '<img class="orbit-image" src="UploadedPictures/' + picFile + '" alt="Space">' +
                    '<figcaption class="orbit-caption">' + picName[picName.length - 1] + '</figcaption>' +
                    '</li>';
        }

        html += '</ul>';
        //    '<nav class="orbit-bullets" id="nav-button-test">';
        //for(var w = 0;w < homeuserJobRequestArray[tableIndex]['JobID-' + jobID + '-' + 'PictureCount'];w++) {
        //    if(w == 0){
        //        html += '<button class="is-active" data-slide="' + w + '"><span class="show-for-sr">' + w + ' slide details.</span><span class="show-for-sr">Current Slide</span></button>';
        //    }
        //    else{
        //        html += '<button data-slide="' + w + '"><span class="show-for-sr">' + w + ' slide details.</span>';
        //    }
        //
        //}
        //html +='</nav>' +
        html +='</div>' +
            '</div>' +
            '</div>';
    }

    var modalID = '#homeuser-completed-modal';
    $(modalID).foundation('toggle');
    document.getElementById("homeuser-completed-modal-additionalInfo").innerHTML = html;
    picOrbiter = $('#homeuser-completed-jobs-pic-orbiter');
    //console.log(picOrbiter);
    var elem = null;
    elem = new Foundation.Orbit(picOrbiter);
    //new Foundation.Orbit($('#nav-button-test'),'data-nav-buttons');
    //picOrbiter.foundation('reflow');
    //$(document).foundation('reflow');
    //$(document).foundation();

    //picOrbiter.foundation('destroy');
    //console.log($(picOrbiter));
    //$(picOrbiter).foundation();
    //console.log($(picOrbiter));
}

function homeuserCompletedJobCloseButtonPress(){
    console.log("Close pressed");
    //document.getElementById("homeuser-completed-modal-additionalInfo").innerHTML = "";
    //$(document).foundation();
    $('#homeuser-completed-jobs-pic-orbiter').foundation('destroy');

}

function handleHomeuserUpdateAgreedPriceResponse(response){
    var success = JSON.parse(response);
    console.log("The following is value returned from server: " + success + " the following is the type thereof: " + typeof success);
}


var homeuserOngoingRequestArray = [];
var homeuserCancelledRequestArray = [];
var homeuserCompletedRequestArray = [];
var homeuserJobsToInitiateArray = [];
var homeuserOngoingJobsArray = [];
var homeuserCompletedJobsArray = [];
var homeuserCancelledJobsArray = [];
function homeuserBuildUpInterfaceArrays(){
    var html = "";
    var homeuserOngoingRequestArrayCounter = 0;
    var homeuserCompletedRequestArrayCounter = 0;
    var homeuserCancelledRequestArrayCounter = 0;
    var homeuserJobsToInitiateArrayCounter = 0;
    var homeuserOngoingJobsArrayCounter = 0;
    var homeuserCancelledJobsArrayCounter = 0;
    var homeuserCompletedJobsArrayCounter = 0;
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
    var quoteRequest;
    var requestStatus;
    var success = false;
    var once = false;
    var name;
    var surname;
    var quoteID;
    var contactNumber;
    var workType;
    var quoteDate;
    var table = [];
    var jobProceedDate;
    var agreedPrice;
    var estimatedCompletionDate;
    var jobID;
    for(var j = 0;j < homeuserJobRequestArray.length; j++){
        requestStatus = homeuserJobRequestArray[j]["RequestStatus"];

        quoteRequest = homeuserJobRequestArray[j]["RequestID"];
        tableIndex = j;
        jobDescription = homeuserJobRequestArray[j]["JobDescription"];
        commencementDate = homeuserJobRequestArray[j]["JobCommencementDate"];
        jobType = homeuserJobRequestArray[j]["WorkType"];
        numWorkers = homeuserJobRequestArray[j]["NumberOfWorkersRequested"];
        numWorkersAccepted = homeuserJobRequestArray[j]["NumberOfWorkersAccepted"];
        //Setting up the request arrays, this is done according to the Request Status of the job
        if(requestStatus == 0) {
            homeuserOngoingRequestArray[homeuserOngoingRequestArrayCounter++] = {'Quote Date' : commencementDate,'Work Type' : jobType, 'Number Requested' : numWorkers, 'Number Accepted' : numWorkersAccepted,'Description' : jobDescription, 'Selected' : '<div class="full-width" style="padding-left: 50%"><input type="radio" name="ignore-job-requests-ongoing" id="homeuser-manageRTradeworker-requestID-' + j + '" value="' + tableIndex + "_" + quoteRequest + '" readonly></div>'};
            userGenericFillColumnSelectTags('homeuser-manageRTradeworker-search-column',['Quote Date','Work Type','Number Requested','Number Accepted','Description']);
            userGenericSortSelectFill('homeuser-manageRTradeworker-sortBy',['Quote Date','Work Type','Number Requested','Number Accepted','Description']);
        }
        else if(requestStatus == 1){
            homeuserCompletedRequestArray[homeuserCompletedRequestArrayCounter++] = {'Quote Date' : commencementDate,'Work Type' : jobType, 'Number Requested' : numWorkers, 'Number Accepted' : numWorkersAccepted,'Description' : jobDescription, 'Selected' : '<div class="full-width" style="padding-left: 50%"><input type="radio" name="ignore-job-requests-completed" id="homeuser-manageRTradeworker-requestID-' + j + '" value="' + tableIndex + "_" + quoteRequest + '" readonly></div>'};
            userGenericFillColumnSelectTags('homeuser-manageRTradeworker-completed-search-column',['Quote Date','Work Type','Number Requested','Number Accepted','Description']);
            userGenericSortSelectFill('homeuser-manageRTradeworker-completed-sortBy',['Quote Date','Work Type','Number Requested','Number Accepted','Description']);
        }
        else{
            homeuserCancelledRequestArray[homeuserCancelledRequestArrayCounter++] = {'Quote Date' : commencementDate,'Work Type' : jobType, 'Number Requested' : numWorkers, 'Number Accepted' : numWorkersAccepted,'Description' : jobDescription, 'Selected' : '<div class="full-width" style="padding-left: 50%"><input type="radio" name="ignore-job-requests-cancelled" id="homeuser-manageRTradeworker-requestID-' + j + '" value="' + tableIndex + "_" + quoteRequest + '" readonly></div>'};
            userGenericFillColumnSelectTags('homeuser-manageRTradeworker-cancelled-search-column',['Quote Date','Work Type','Number Requested','Number Accepted','Description']);
            userGenericSortSelectFill('homeuser-manageRTradeworker-cancelled-sortBy',['Quote Date','Work Type','Number Requested','Number Accepted','Description']);
        }
        //The following will set up an individual list of all the requests that occur during
        for (var i = 0; i < homeuserJobRequestArray[j]['NumberOfWorkersRequested']; i++) {
            if(homeuserJobRequestArray[j].hasOwnProperty('QuoteID-' + i)){
                if(homeuserJobRequestArray[j]['Status-' + i] == 3 && homeuserJobRequestArray[j]['HomeuserResponse-' + i] == 1 && !homeuserJobRequestArray[j].hasOwnProperty('JobID-' + i)) {
                    success = true;
                    name = homeuserJobRequestArray[j]['Name-' + i];
                    surname = homeuserJobRequestArray[j]['Surname-' + i];
                    quoteID = homeuserJobRequestArray[j]['QuoteID-' + i];
                    contactNumber = homeuserJobRequestArray[j]['ContactNumber-' + i];
                    workType = homeuserJobRequestArray[j]['WorkType'];
                    quoteDate = homeuserJobRequestArray[j]['JobCommencementDate'];
                    tableIndex = j;
                    homeuserJobsToInitiateArray[homeuserJobsToInitiateArrayCounter++] = {'Name' : name,'Surname' : surname, 'Contact Details' : contactNumber, 'Work Type' : workType,'Quote Date' : quoteDate, 'Selected' : '<div class="full-height full-width" style="text-align: center;padding-top: 1em"><input type="radio" name="job-initiate-selected" id="requested-user-id" value="' + tableIndex + "_" + quoteID + '"></div>'};
                    userGenericFillColumnSelectTags('homeuser-manageJobInitiate-search-column',['Name','Surname','Contact Details','Work Type','Quote Date']);
                    userGenericSortSelectFill('homeuser-manageJobInitiate-sortBy',['Name','Surname','Contact Details','Work Type','Quote Date']);
                }
            }

            if(homeuserJobRequestArray[j].hasOwnProperty('QuoteID-' + i) && homeuserJobRequestArray[j].hasOwnProperty('JobID-' + i)){
                jobProceedDate = homeuserJobRequestArray[j]['JobProceedDate-' + i];
                agreedPrice = homeuserJobRequestArray[j]['AgreedPrice-' + i];
                estimatedCompletionDate = homeuserJobRequestArray[j]['EstimatedCompletionDate-' + i];
                status = homeuserJobRequestArray[j]['JobStatus-' + i];
                jobID = homeuserJobRequestArray[j]['JobID-' + i];
                workType = homeuserJobRequestArray[j]['WorkType'];
                tableIndex = j;
                if(homeuserJobRequestArray[j]['Status-' + i] == 3 && homeuserJobRequestArray[j]['HomeuserResponse-' + i] == 3 && homeuserJobRequestArray[j]['JobStatus-' + i] == 0){
                    homeuserOngoingJobsArray[homeuserOngoingJobsArrayCounter++] = {'Job Start Date' : jobProceedDate,'Agreed Price' : agreedPrice, 'Estimated Complete Date' : estimatedCompletionDate, 'Work Type' : workType,'Status' : status,'Job Details': '<button type="button" class="button warning" style="margin: 0.5em" onclick="homeuserDisplayJobFurtherDetails(' + tableIndex + ',' + i + ')">Details<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/></button>', 'Selected' : '<div class="full-height full-width" style="text-align: center;padding-top: 1em"><input type="radio" name="ignore-requested-user-onGoingJobs-selected" id="requested-user-onGoingJobs-id" value="' + tableIndex + "_" + jobID + '"></div>'};
                    userGenericFillColumnSelectTags('homeuser-ongoingJobs-search-column',['Job Start Date','Agreed Price','Estimated Complete Date','Work Type','Status']);
                    userGenericSortSelectFill('homeuser-ongoingJobsInitiate-sortBy',['Job Start Date','Agreed Price','Estimated Complete Date','Work Type','Status']);
                }
                if(homeuserJobRequestArray[j]['Status-' + i] == 3 && homeuserJobRequestArray[j]['HomeuserResponse-' + i] == 3 && homeuserJobRequestArray[j]['JobStatus-' + i] == 2){
                    homeuserCancelledJobsArray[homeuserCancelledJobsArrayCounter++] = {'Job Start Date' : jobProceedDate,'Agreed Price' : agreedPrice, 'Estimated Complete Date' : estimatedCompletionDate, 'Work Type' : workType,'Status' : status,'Job Details': '<button type="button" class="button warning" style="margin: 0.5em" onclick="homeuserDisplayJobFurtherDetails(' + tableIndex + ',' + i + ')">Details<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/></button>', 'Selected' : '<div class="full-height full-width" style="text-align: center;padding-top: 1em"><input type="radio" name="ignore-requested-user-onGoingJobs-selected" id="requested-user-onGoingJobs-id" value="' + tableIndex + "_" + jobID + '"></div>'};
                    userGenericFillColumnSelectTags('homeuser-cancelled-search-column',['Job Start Date','Agreed Price','Estimated Complete Date','Work Type','Status']);
                    userGenericSortSelectFill('homeuser-cancelled-sortBy',['Job Start Date','Agreed Price','Estimated Complete Date','Work Type','Status']);
                }
                if(homeuserJobRequestArray[j]['Status-' + i] == 3 && homeuserJobRequestArray[j]['HomeuserResponse-' + i] == 3 && homeuserJobRequestArray[j]['JobStatus-' + i] == 1){
                    homeuserCompletedJobsArray[homeuserCompletedJobsArrayCounter++] = {'Job Start Date' : jobProceedDate,'Agreed Price' : agreedPrice, 'Estimated Complete Date' : estimatedCompletionDate, 'Work Type' : workType,'Status' : status,'Job Details': '<button type="button" class="button warning" style="margin: 0.5em" onclick="homeuserDisplayJobFurtherDetails(' + tableIndex + ',' + i + ')">Details<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/></button>', 'Selected' : '<div class="full-height full-width" style="text-align: center;padding-top: 1em"><input type="radio" name="ignore-requested-user-onGoingJobs-selected" id="requested-user-onGoingJobs-id" value="' + tableIndex + "_" + jobID + '"></div>'};
                    userGenericFillColumnSelectTags('homeuser-completed-search-column',['Job Start Date','Agreed Price','Estimated Complete Date','Work Type','Status']);
                    userGenericSortSelectFill('homeuser-completed-sortBy',['Job Start Date','Agreed Price','Estimated Complete Date','Work Type','Status']);
                }
            }
        }
    }
}

function homeuserDisplayRequests(){
    var html = genericTableGenerate(homeuserOngoingRequestArray,'ongoing-requests');
    if(homeuserOngoingRequestArray.length < 1){
        document.getElementById('homeuser-manageRTradeworker-areainformation').innerHTML = "<h3>There are currently no job requests to display</h3>";
    }
    else
        document.getElementById("homeuser-manageRTradeworker-areainformation").innerHTML = html;
}

function homeuserDisplayJobsToInitiate(){
    console.log("Should be displaying jobs to initiate table: ");
    document.getElementById('homeuser-manageJobInitiate-areainformation').innerHTML = "<h3>There are currently no jobs to initiate</h3>";
    var html = genericTableGenerate(homeuserJobsToInitiateArray,'jobs-toInitiate');
    if(homeuserJobsToInitiateArray.length < 1){
        document.getElementById('homeuser-manageJobInitiate-areainformation').innerHTML = "<h3>There are currently no jobs to initiate</h3>";
    }
    else{
        document.getElementById('homeuser-manageJobInitiate-areainformation').innerHTML = html;
    }
}

function removeWorkerFromJobRequest() {
    console.log("Should be removing selected tradeworker from request");
    var input = $("form input[name=job-initiate-selected]:radio");

    if(input.length > 0)
        for(var i = 0 ; i < input.length ; i++){
            //
            if(input[i].checked){
                //console.log('The following request was selected: ' + i);
                //console.log(input[i]);
                var spl = input[i].value.split("_");
                document.getElementById("homeuser-selected-initiate-job-id").value = spl[1];
                //homeuserManageRequestModal(input[i].value);


                sendAJAXRequest('homeuser-remove-tradeworker-from-request',handleHomeuserRemoveTradeworkerFromRequestShortcutResponse,'homeuser-selected-initiate-job');

            }
        }
}

function handleHomeuserRemoveTradeworkerFromRequestShortcutResponse(response){
    var success = JSON.parse(response);

    if(typeof success == 'boolean'){
        var html = '';
        if(success){
            html += "The tradeworker was removed from the request";
            document.getElementById('homeuser-initiateJob-modal-additionalInfo').innerHTML = html;
            $('#homeuser-initiateJob-modal').foundation('toggle');
            sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);
        }
        else{
            html += "The tradeworker could not be removed from the request";
            document.getElementById('homeuser-initiateJob-modal-additionalInfo').innerHTML = html;
            $('#homeuser-initiateJob-modal').foundation('toggle');
        }
    }
}

function initiateJobForSelectedWOrker(){

    var input = $("form input[name=job-initiate-selected]:radio");
    //console.log("test" + input.length);
    if(input.length > 0)
        for(var i = 0 ; i < input.length ; i++){
            if(input[i].checked){
                var spl = input[i].value.split("_");
                document.getElementById("homeuser-selected-initiate-job-id").value = spl[1];
                homeuserInitiateJobShortcut(spl[1]);
                //sendAJAXRequest('tradeworker-accept-request',handleTradeworkerAcceptRequestFromInitiateJobs,'homeuser-selected-initiate-job');
            }
        }
}


function displayHomeuserJobInitiateEntry(){
    var input = $("form input[name=job-initiate-selected]:radio");

    if(input.length > 0)
        for(var i = 0 ; i < input.length ; i++){
            //console.log("should be printing :" + input[i].checked);
            if(input[i].checked){
                //console.log('The following request was selected: ' + i);
                //console.log(input[i]);
                document.getElementById("homeuser-selected-initiate-job-id").value = input[i].value;
                //homeuserManageRequestModal(input[i].value);
                var spl = input[i].value.split("_");
                homeuserManageRequestModal(spl[0]);

                //sendAJAXRequest('tradeworker-accept-request',handleTradeworkerAcceptRequest,'tradeworker-selected-request');
            }
        }
    //console.log(input);
}


//var homeuserRequestsToAcceptArray;
var homeuserRequestCursor = 0;

function homeuserDisplayRequestAcceptedNotification(){
    if(homeuserJobRequestArray.length > 0){
        for(var x = 0;x < homeuserJobRequestArray.length;x++) {

            for(var y = 0;y < homeuserJobRequestArray[x]['NumberOfWorkersRequested'];y++){
                if (homeuserJobRequestArray[x].hasOwnProperty("Status-" + y) && homeuserJobRequestArray[x].hasOwnProperty("HomeuserResponse-" + y)) {
                    if (homeuserJobRequestArray[x]['Status-' + y] == 1 && homeuserJobRequestArray[x]['HomeuserResponse-' + y] == 0) {
                        var AreaName = homeuserJobRequestArray[x]['AreaName'];
                        var City = homeuserJobRequestArray[x]['Province'];
                        var ContactNumber = homeuserJobRequestArray[x]['ContactNumber-' + y];
                        var DateInitialised = homeuserJobRequestArray[x]['DateInitialised'];
                        var JobCommencementDate = homeuserJobRequestArray[x]['JobCommencementDate'];
                        var JobDescription = homeuserJobRequestArray[x]['JobDescription'];
                        var Name = homeuserJobRequestArray[x]['Name-' + y];
                        var QuoteID = homeuserJobRequestArray[x]['QuoteID-' + y];
                        var Road = homeuserJobRequestArray[x]['Road'];
                        var StreetNumber = homeuserJobRequestArray[x]['StreetNumber'];
                        var Surname = homeuserJobRequestArray[x]['Surname-' + y];
                        var WorkType = homeuserJobRequestArray[x]['WorkType'];
                        var locationName = homeuserJobRequestArray[x]['locationName'];
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
            }
        }

    }
    else{
        console.log("No more notifications to display");
    }
}

function handleHomeuserRejectRequestResponse(response){
    var result = JSON.parse(response);

    if(typeof result == 'boolean'){
        if(result){
            var html = "<h3>Request(s) Rejected</h3>";
            $('#homeuser-homepage-notification-modal-response').foundation('toggle');
            document.getElementById("homeuser-homepage-notification-modal-response-additionalInfo").innerHTML = html;
            sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);

        }
        else{
            //Failed to accept request on server
        }
    }
}

function handleHomeuserAcceptRequestResponse(response){
    var result = JSON.parse(response);

    if(typeof result == 'boolean'){
        if(result){
            var html = "<h3>Request Accepted</h3>";
            $('#homeuser-homepage-notification-modal-response').foundation('toggle');
            document.getElementById("homeuser-homepage-notification-modal-response-additionalInfo").innerHTML = html;
            sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);

        }
        else{
            //Failed to accept request on server
        }
    }
}

function removeHomeuserJobRequestEntry(){

    var input = $("form input[name=ignore-job-requests-ongoing]:radio");

    if(input.length > 0)
        for(var i = 0 ; i < input.length ; i++){
            //console.log("should be printing :" + input[i].checked);
            if(input[i].checked){
                var spl = input[i].value.split("_");
                document.getElementById("homeuser-selected-request-id").value = spl[1];
                //homeuserManageRequestModal(input[i].value);


                sendAJAXRequest('homeuser-remove-request',handleHomeuserRemoveRequestResponse,'homeuser-selected-request');
                //sendAJAXRequest('tradeworker-accept-request',handleTradeworkerAcceptRequest,'tradeworker-selected-request');
            }
        }
}

function handleHomeuserRemoveRequestResponse(response){
    var success = JSON.parse(response);

    if(typeof success == 'boolean'){
        if(success){
            //The request has been canceled and removed
            var html = "<h3>The request has been cancelled</h3>Thank you for using SebenzaSA";
            $('#homeuser-manageRequest-modal').foundation('toggle');
            document.getElementById("homeuser-manageRequest-modal-additionalInfo").innerHTML = html;
            sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);
        }
        else{
            //The request was not cancel
            var html = "<h3>The request cancellation failed</h3>Please contact administration if problem persists";
            $('#homeuser-manageRequest-modal').foundation('toggle');
        }
    }
}

function editHomeuserJobRequestEntry(){
    var input = $("form input[name=ignore-job-requests-ongoing]:radio");

    if(input.length > 0)
        for(var i = 0 ; i < input.length ; i++){
            if(input[i].checked){
                var spl = input[i].value.split("_");
                document.getElementById("homeuser-selected-request-id").value = spl[0];
                homeuserManageRequestModal(spl[0]);
            }
        }
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
    var onceOff = false;
    var acceptedUser = false;


    for(var k = 0; k < numWorkers;k++){
        if(homeuserJobRequestArray[tableIndex].hasOwnProperty("ContactNumber-" + k) && homeuserJobRequestArray[tableIndex].hasOwnProperty("HomeuserResponse-" + k) && homeuserJobRequestArray[tableIndex].hasOwnProperty("Name-" + k) && homeuserJobRequestArray[tableIndex].hasOwnProperty("Surname-" + k) && homeuserJobRequestArray[tableIndex].hasOwnProperty("Status-" + k)){

            if(!acceptedUser){
                html +=  '<form id="homeuser-initiateJob-selection" name="homeuser-initiateJob-selection" ><table><thead>' +
                    '<tr>' +
                    '<th>Name</th>' +
                    '<th>Surname</th>' +
                    '<th>Contact Details</th>' +
                    '<th>Tradeworker Status</th>' +
                    '<th>Status</th>' +
                    '<th>Selected</th>' +
                    '</tr></thead><tbody>';
                acceptedUser = true;
                onceOff = true;
            }
            var name = homeuserJobRequestArray[tableIndex]['Name-' + k];
            var surname = homeuserJobRequestArray[tableIndex]['Surname-' + k];
            var contactNumber = homeuserJobRequestArray[tableIndex]['ContactNumber-' + k];
            var tradeworkerStatus = homeuserJobRequestArray[tableIndex]['Status-' + k];
            var selected = homeuserJobRequestArray[tableIndex]['QuoteID-' + k];
            if(tradeworkerStatus == 1){
                tradeworkerStatus = "Tradeworker accepted";
            }
            else if(tradeworkerStatus == 2){
                tradeworkerStatus = "Tradeworker Cancelled";
            }
            else if(tradeworkerStatus == 3){
                tradeworkerStatus = "Tradeworker confirmed";
            }
            var homeuserStatus = homeuserJobRequestArray[tableIndex]['HomeuserResponse-' + k];
            if(homeuserStatus == 1){
                homeuserStatus = "You accepted";
            }
            else if(homeuserStatus == 2){
                homeuserStatus = "You rejected";
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
                '<td>' +
                '<div class="full-height full-width" style="text-align: center;padding-top: 1em">' +
                '<input type="radio" name="user-initiateJob-selected" id="requested-user-id" value="' + selected + '">' +
                '</div>' +
                '</td>' +
                '</tr>' +
                '';


        }

    }
    if(onceOff) {
        html += '</tbody></table></form>' +
            '<form id="homeuser-manage-specificRequest-ID-form" name="homeuser-manage-specificRequest-ID-form">' +
            '<input type="hidden" id="homeuser-manage-specificRequest-ID" name="ignore-homeuser-manage-specificRequest-ID" value="-50">' +
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
    if(!acceptedUser){
        html += '<h5>No tradeworkers have accepted the request yet</h5>';
    }

    $('#homeuser-manageRequest-modal').foundation('toggle');
    document.getElementById("homeuser-manageRequest-modal-additionalInfo").innerHTML = html;
}

function editHomeuserJobRequestEntryRemoveWorker(){


    var input = $("form input[name=user-initiateJob-selected]:radio");

    if(input.length > 0)
        for(var i = 0 ; i < input.length ; i++){
            //console.log("should be printing :" + input[i].checked);
            if(input[i].checked){
                //console.log('The following request was selected: ' + i);
                //console.log(input[i]);
                var spl = input[i].value.split("_");
                document.getElementById("homeuser-ongoingJobs-tradeworkerID-toRemove").value = spl[1];

                //homeuserManageRequestModal(input[i].value);
                //console.log("The following request is being deleted: " + input[i].value);
                sendAJAXRequest('homeuser-remove-tradeworker-from-request',handleHomeuserRemoveTradeworkerFromRequestResponse,'homeuser-manage-specificRequest-ID-form');
                //sendAJAXRequest('tradeworker-accept-request',handleTradeworkerAcceptRequest,'tradeworker-selected-request');
            }
        }
}

function handleHomeuserRemoveTradeworkerFromRequestResponse(response){
    var success = JSON.parse(response);

    var html = "";
    if(typeof success == "boolean"){
        if(success){
            html = "<h3>Tradeworker Successfully removed from request</h3>";
            $('#homeuser-manageRequest-modal-response').foundation('toggle');
            document.getElementById("homeuser-manageRequest-modal-response-additionalInfo").innerHTML = html;
            sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);
        }
        else{
            html = "<h3>Could not remove Tradeworker Successfully</h3>If matter persists please contact admin for further assistance";
            $('#homeuser-manageRequest-modal-response').foundation('toggle');
            document.getElementById("homeuser-manageRequest-modal-response-additionalInfo").innerHTML = html;
        }
    }
}

function homeuserTerminateJobInitiate(){

    var input = $("form input[name=ignore-requested-user-onGoingJobs-selected]:radio");


    if(input.length > 0){
        for(var i = 0 ; i < input.length ; i++) {
            //console.log("should be printing :" + input[i].checked);
            if (input[i].checked) {
                var spl = input[i].value.split("_");


                var html = '<h3>Terminating job</h3><p style="color: #ff1f19">*Note that this reason will be displayed to requested user</p>' +
                    '<form id="homeuser-terminate-job-form" name="homeuser-terminate-job-form">' +
                    '<input type="hidden" id="homeuser-ongoingJobs-jobID-toRemove" name="ignore-homeuser-ongoingJobs-jobID-toRemove" value="' + spl[1] + '">' +
                    '<div class="row">' +
                    '<div class="column large-11 medium-11">' +
                    '<label>Please enter reason for early termination</label><input type="text" name="homeuser-terminateJob-reason" id="homeuser-terminateJob-reason" class="REQ_VAL">' +
                    '<div class="additional-info top-padding" id="homeuser-terminateJob-reason-info" data-toggler data-animate="fade-in fade-out" aria-expanded="false">' +
                    '<p class="help-text no-margins">Please fill in the reason you terminated the job. e.g. Tradeworker never pitched</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</form>' +
                    '<div class="large-3 large-offset-8 medium-offset-8 medium-3 columns">' +
                    '<button type="top-bar-button button" class="button alert" style="margin-top: 0.2em" onclick="sendAJAXRequest(\'homeuser-ongoingJob-remove-tradeworker\',handleHomeuserTerminateJobRequestRespones,\'homeuser-terminate-job-form\')">' +
                    'Terminate Job' +
                    '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>' +
                    '</button>' +
                    '</div>';

                $('#homeuser-ongoingJobs-modal').foundation('toggle');
                document.getElementById("homeuser-ongoingJobs-modal-additionalInfo").innerHTML = html;
                var terminateJobReasonInfo = $("#homeuser-terminateJob-reason-info");
                new Foundation.Toggler(terminateJobReasonInfo,'data-animate="fade-in fade-out"');

            }
        }
    }


}

function handleHomeuserTerminateJobRequestRespones(response){
    var success = JSON.parse(response);
    var html = "";

    if(typeof success == "boolean"){
        if(success){
            html = "<h3>Job has been terminated</h3>";
            $('#homeuser-ongoingJobs-modal-response').foundation('toggle');
            document.getElementById("homeuser-ongoingJobs-modal-response-additionalInfo").innerHTML = html;
            sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);

        }
        else{
            html = "<h3>Job could not be terminated</h3>Contact admin if problem persists";
            $('#homeuser-ongoingJobs-modal-response').foundation('toggle');
            document.getElementById("homeuser-ongoingJobs-modal-response-additionalInfo").innerHTML = html;
        }
    }
}

function homeuserExtendJobInitiate(){

    var input = $("form input[name=ignore-requested-user-onGoingJobs-selected]:radio");

    if(input.length > 0){
        for(var i = 0 ; i < input.length ; i++) {
            //console.log("should be printing :" + input[i].checked);
            if (input[i].checked) {
                var spl = input[i].value.split("_");
                console.log("Entending the following job id: " + spl[1]);
            }
        }
    }

    var html = '<h3>Initiating Extension process</h3>' +
        '<form id="homeuser-initiateJobExtension-form" name="homeuser-initiateJobExtension-form">' +
        '<input type="hidden" id="homeuser-initiateJobExtension-jobID" name="ignore-homeuser-initiateJobExtension-jobID" value=' + spl[1] + '>' +
        '<div class="row">' +
        '<div class="column medium-11 large-11">' +
        '<label>Would you like to request more workers:</label>' +
        '<div class="switch large">' +
        '<input class="switch-input" id="homeuser-initiateJobExtension-addTradeworker-switch" type="checkbox" name="ignore-homeuser-initiateJobExtension-addTradeworker-switch" onclick="toggleHomeuserJobAddTradeworker()">' +
        '<label class="switch-paddle" for="homeuser-initiateJobExtension-addTradeworker-switch">' +
        '<span class="show-for-sr">Add worker</span>' +
        '<span class="switch-active" aria-hidden="true">Yes</span>' +
        '<span class="switch-inactive" aria-hidden="true">no</span>' +
        '</label>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="column large-11 medium 11">' +
        '<div id="homeuser-initiateJobExtension-addTradeworker-information" data-toggler data-animate="fade-in fade-out" style="display:none">' +
        '<label>Please enter how many workers you would like to add to the job:</label><input type="number" name="ignore-homeuser-initiateJobExtension-addTradeworker" id="homeuser-initiateJobExtension-addTradeworker" placeholder="1" step="1" min="1" class="REQ_VAL">' +
        '<div class="additional-info top-padding" id="homeuser-initiateJobExtension-addTradeworker-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please enter a reason why the job was not to your satisfaction</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="column medium-11 large-11">' +
        '<label>Please enter days to extend job by:</label><input type="number" step="1" min="1" name="homeuser-initiateJobExtension-daysExtend" id="homeuser-initiateJobExtension-daysExtend" placeholder="1" class="REQ_VAL">' +
        '<div class="additional-info top-padding" id="homeuser-initiateJobExtension-daysExtend-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please select number of days to extend job by. E.g. 1</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</form>';
    html += '<div class="row">' +
        '<div class="large-3 large-offset-8 medium-offset-8 medium-3 columns">' +
        '<button type="top-bar-button button" class="button success" style="margin-top: 0.2em" onclick="sendAJAXRequest(\'homeuser-initiateJobExtension-request\',handleHomeuserInitiateJobExtensionResponse,\'homeuser-initiateJobExtension-form\')">' +
        'Extend Job' +
        '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>' +
        '</button>' +
        '</div>' +
        '</div>';

    $('#homeuser-ongoingJobs-modal').foundation('toggle');
    document.getElementById("homeuser-ongoingJobs-modal-additionalInfo").innerHTML = html;
    var hideAddTradeworkerInfo = $("#homeuser-initiateJobExtension-addTradeworker-information");
    new Foundation.Toggler(hideAddTradeworkerInfo,'data-animate="fade-in fade-out"');
    new Foundation.Toggler($("#homeuser-initiateJobExtension-addTradeworker-info"),'data-animate="fade-in fade-out"');
    new Foundation.Toggler($("#homeuser-initiateJobExtension-daysExtend-info"),'data-animate="fade-in fade-out"');
    hideAddTradeworkerInfo.on("on.zf.toggler", function(e) {
            document.getElementById('homeuser-initiateJobExtension-addTradeworker').name = "homeuser-initiateJobExtension-addTradeworker";
        })
        .on("off.zf.toggler", function(e) {
            document.getElementById('homeuser-initiateJobExtension-addTradeworker').name = "ignore-homeuser-initiateJobExtension-addTradeworker";
        });

}

function handleHomeuserInitiateJobExtensionResponse(response){
    var success = JSON.parse(response);
    console.log("Extending job: server response:" + success + " the response type: " + typeof success)
}

function toggleHomeuserJobAddTradeworker(){
    //console.log("The following is the display value:" + document.getElementById('homeuser-initiateJobCompletion-jobComment-information').style.display);
    $('#homeuser-initiateJobExtension-addTradeworker-information').foundation('toggle');
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
}

function toggleGenericDiv(divID){
    $('#'+ divID).foundation('toggle');
}

function homeuserCompleteJobInitiate(){

    var input = $("form input[name=ignore-requested-user-onGoingJobs-selected]:radio");

    if(input.length > 0){
        for(var i = 0 ; i < input.length ; i++) {
            //console.log("should be printing :" + input[i].checked);
            if (input[i].checked) {
                var spl = input[i].value.split("_");
                console.log("Completing the following job id: " + spl[1]);
            }
        }
    }

    var html = '<h3>Initiating completion process</h3>' +
        '<form id="homeuser-initiateJobCompletion-form" name="homeuser-initiateJobCompletion-form"  method="post" enctype="multipart/form-data">' +
        '<input type="hidden" id="homeuser-initiateJobCompletion-jobID" name="ignore-homeuser-initiateJobCompletion-jobID" value=' + spl[1] + '>' +
        '<div class="row">' +
        '<div class="column medium-11 large-11">' +
        '<label>Was the job completed to your satisfaction:</label>' +
        '<div class="switch large">' +
        '<input class="switch-input" id="homeuser-initiateJobCompletion-jobSatisfaction-switch" type="checkbox" name="ignore-homeuser-initiateJobCompletion-jobSatisfaction-switch" onclick="toggleHomeuserJobComment()" checked>' +
        '<label class="switch-paddle" for="homeuser-initiateJobCompletion-jobSatisfaction-switch">' +
        '<span class="show-for-sr">Satisfied</span>' +
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
        '<div class="row">' +
        '<div class="column medium-11 large-11">' +
        '<label>Would you like to add a picture now of a job:</label>' +
        '<div class="switch large">' +
        '<input class="switch-input" id="homeuser-initiateJobCompletion-pictureAddition-switch" type="checkbox" name="ignore-homeuser-initiateJobCompletion-pictureAddition-switch" onclick="toggleGenericDiv(\'homeuser-initiateJobCompletion-Picture-information\')">' +
        '<label class="switch-paddle" for="homeuser-initiateJobCompletion-pictureAddition-switch">' +
        '<span class="show-for-sr">Pictures</span>' +
        '<span class="switch-active" aria-hidden="true">Yes</span>' +
        '<span class="switch-inactive" aria-hidden="true">no</span>' +
        '</label>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="column large-11 medium 11">' +
        '<div id="homeuser-initiateJobCompletion-Picture-information" data-toggler data-animate="fade-in fade-out" style="display:none">' +
        '<label>Please select a picture to be added:</label><input type="file" name="ignore-homeuser-initiateJobCompletion-Picture-0[]" id="homeuser-initiateJobCompletion-Picture-0" class="REQ_VAL" multiple>' +
        '<div class="additional-info top-padding" id="homeuser-initiateJobCompletion-Picture-0[]-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please ensure a jpg or png was selected</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</form>';
    html += '<div class="row">' +
        '<div class="large-3 large-offset-8 medium-offset-8 medium-3 columns">' +
        '<button type="top-bar-button button submit" class="button success" style="margin-top: 0.2em" onclick="sendAJAXPictures(\'homeuser-initiateJobCompletion-request\',handleHomeuserInitiateJobCompletionResponse,\'homeuser-initiateJobCompletion-form\')">' +
        'Complete Job' +
        '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
        '</button>' +
        '</div>' +
        '</div>';

    $('#homeuser-ongoingJobs-modal').foundation('toggle');
    document.getElementById("homeuser-ongoingJobs-modal-additionalInfo").innerHTML = html;
    var jobComment = $("#homeuser-initiateJobCompletion-jobComment-information");
    var userComment = $("#homeuser-initiateJobCompletion-userComment-information");
    var pictureAddition = $("#homeuser-initiateJobCompletion-Picture-information");
    new Foundation.Toggler(jobComment,'data-animate="fade-in fade-out"');
    new Foundation.Toggler(userComment,'data-animate="fade-in fade-out"');
    new Foundation.Toggler(pictureAddition,'data-animate="fade-in fade-out"');

    pictureAddition.on("on.zf.toggler", function(e) {
            document.getElementById('homeuser-initiateJobCompletion-Picture-0').name = "homeuser-initiateJobCompletion-Picture-0[]";
        })
        .on("off.zf.toggler", function(e) {
            document.getElementById('homeuser-initiateJobCompletion-Picture-0').name = "ignore-homeuser-initiateJobCompletion-Picture-0[]";
        });

    jobComment.on("on.zf.toggler", function(e) {
            document.getElementById('homeuser-initiateJobCompletion-jobComment').name = "homeuser-initiateJobCompletion-jobComment";
        })
        .on("off.zf.toggler", function(e) {
            document.getElementById('homeuser-initiateJobCompletion-jobComment').name = "ignore-homeuser-initiateJobCompletion-jobComment";
        });

    userComment.on("on.zf.toggler", function(e) {
            document.getElementById('homeuser-initiateJobCompletion-userComment').name = "homeuser-initiateJobCompletion-userComment";
        })
        .on("off.zf.toggler", function(e) {
            document.getElementById('homeuser-initiateJobCompletion-userComment').name = "ignore-homeuser-initiateJobCompletion-userComment";
        });
    new Foundation.Toggler($("#homeuser-initiateJobCompletion-jobComment-info"),'data-animate="fade-in fade-out"');
    new Foundation.Toggler($("#homeuser-initiateJobCompletion-userComment-info"),'data-animate="fade-in fade-out"');
    new Foundation.Toggler($("#homeuser-initiateJobCompletion-Picture-0-info"),'data-animate="fade-in fade-out"');
}

function handleHomeuserInitiateJobCompletionResponse(response){

    var result = JSON.parse(response);

    if(typeof result == 'boolean'){
        if(result){

            $('#homeuser-completed-modal').foundation('toggle');
            document.getElementById("homeuser-completed-modal-additionalInfo").innerHTML = "<h3>The job has been completed</h3>";
            sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);
        }
        else{

            $('#homeuser-completed-modal').foundation('toggle');
            document.getElementById("homeuser-completed-modal-additionalInfo").innerHTML = "<h3>Something went wrong please contact admin</h3>";
        }
    }
    else
        console.log("The following is the type: " + typeof result + " the following is the value" + result);
}

function editHomeuserJobRequestEntryInitiateJobWorker(){

    var input = $("form input[name=user-initiateJob-selected]:radio");

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

function homeuserInitiateJobShortcut(quoteID){
    //console.log("The following is requestID :" + requestID + " the requested user id is: " + requestedUserID);
    var html = "<h3>Initiate job extra details:</h3><h5>Please ensure the following details have been discussed with the requested user before filling in:</h5>";
    html += '<form id="homeuser-initiateJob-shortcut-form" name="homeuser-initiateJob-shortcut-form">' +
        '<div class="row">' +
        '<div class="column large-11 medium 11">' +
        '<label>Date to start job:</label><input type="date" name="homeuser-initiateJob-shortcut-commenceDate" id="homeuser-initiateJob-shortcut-commenceDate" class="REQ_VAL">' +
        '<div class="additional-info top-padding" id="homeuser-initiateJob-shortcut-commenceDate-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please select a date from the drop down</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="column large-11 medium 11">' +
        '<label>Estimated days before completion:</label><input type="number" step="1" name="homeuser-initiateJob-shortcut-numberDays" id="homeuser-initiateJob-shortcut-numberDays" class="REQ_VAL">' +
        '<div class="additional-info top-padding" id="homeuser-initiateJob-shortcut-numberDays-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please enter a positive number 7</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="column large-11 medium 11">' +
        '<label>Agreed upon price:</label><input type="number" step="0.01" min="0" name="homeuser-initiateJob-shortcut-expectedPayment" id="homeuser-initiateJob-shortcut-expectedPayment" class="REQ_VAL">' +
        '<div class="additional-info top-padding" id="homeuser-initiateJob-shortcut-expectedPayment-info" data-toggler data-animate="fade-in fade-out">' +
        '<p class="help-text no-margins">Please enter a valid positive number 450.00</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<input type="hidden" value="' + quoteID + '" id="homeuser-initiateJob-shortcut-quoteID" name="ignore-homeuser-initiateJob-shortcut-quoteID">' +
        '</form>';

    html += '<div class="row">' +
        '<div class="large-3 large-offset-8 medium-offset-8 medium-3 columns">' +
        '<button type="top-bar-button button" class="button warning" style="margin-top: 0.2em" onclick="sendAJAXRequest(\'homeuser-initiateJob-request\',handleHomeuserInitiateJobResponseShortcut,\'homeuser-initiateJob-shortcut-form\')">' +
        'Initiate Job' +
        '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
        '</button>' +
        '</div>' +
        '</div>';
    //TODO: make elements toggleable so that additional information can be displayed
    $('#homeuser-initiateJob-modal').foundation('toggle');
    document.getElementById("homeuser-initiateJob-modal-additionalInfo").innerHTML = html;
    new Foundation.Toggler($("#homeuser-initiateJob-shortcut-commenceDate-info"),'data-animate="fade-in fade-out"');
    new Foundation.Toggler($("#homeuser-initiateJob-shortcut-numberDays-info"),'data-animate="fade-in fade-out"');
    new Foundation.Toggler($("#homeuser-initiateJob-shortcut-expectedPayment-info"),'data-animate="fade-in fade-out"');
}

function handleHomeuserInitiateJobResponseShortcut(response){
    var result = JSON.parse(response);

    if(typeof result == 'boolean'){
        var html;
        if(result){
            html = "<h3>The job has been initiated</h3>";
            console.log("Fetching job requests: ");

            //sendAJAXRequest('fetch-job-requests', handleFetchJobRequests)
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

    if(typeof result == 'boolean'){
        var html;
        if(result){
            html = "<h3>The job has been initiated</h3>";
            sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);
        }
        else{
            html = "<h3>The job wasn't initiated</h3>";
        }
        $('#homeuser-manageRequest-modal').foundation('toggle');
        document.getElementById("homeuser-manageRequest-modal-additionalInfo").innerHTML = html;
    }
    else{
        console.log("Result was not of type boolean " + result);
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

function handlerTradeworkerResponse(response){
    var workTypeArray = JSON.parse(response);
    console.log(".......");
    console.log(workTypeArray);
    console.log(".......");
    if(typeof workTypeArray == 'boolean') {
        if (workTypeArray) {
            console.log("The work request was successful: " + response + workTypeArray);
            //TODO:Display success to user
            var html = "<h3>Tradeworker Request successful</h3>";
            $('#homeuser-rTradeworker-notification-modal-response').foundation('toggle');
            document.getElementById("homeuser-rTradeworker-notification-modal-response-additionalInfo").innerHTML = html;
            sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);
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
