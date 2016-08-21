<?php
/**
 * Created by PhpStorm.
 * Date: 2016/03/28
 * Time: 3:22 PM
 */
$PAGE_TITLE = "Area Information";
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/open-html.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/top-bar.php";
?>
    <div class="content-view" style="overflow: hidden">
        <div id="googleMap" class="map-sizer">

        </div>

        <div class="reveal" id="aboutUs" data-toggler data-animate="hinge-in-from-top spin-out" style="padding: 1em;background-color: rgba(247, 196, 85, 0.85);width: 30%;height: 50%;max-height: 80%;position: absolute;bottom: 2.5em;left: 2.5em;overflow-y: auto;text-align: center;display: block">
            <div id="index-additionArea-notification-modal-response-additionalInfo" >
                <h1>Welcome To SebenzaSA</h1>
                <h3>Get the job, or get it done</h3>
                Sebenza is an easy-to-use site designed to place those looking for work in contact with those needing work done.
                <h6>Trade Workers</h6>
                Sebenza offers a competitive edge for Trade Workers by compiling a running list of Jobs that have been completed by individual Trade Workers.  A job list can be generated at any time - it records the experience and recommendations received by employers, making it an excellent addition to a CV.
                <h6>Home Users</h6>
                From the odd household job, like painting the roof, to the contract of 3 months, Sebenza provides a way to contact the much need human capital to the job done! Home Users have the option of individual Trade Workers or Contractors depending on their preference.
            </div>
            <button class="close-button" onclick="indexAboutUsToggle()" aria-label="Close reveal" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

    </div>
    <div style="position: absolute;left: 0.5em;z-index: 10000;bottom: 0.25rem;">
        <div style="display: flex;justify-content: center;align-items: center">
            <div id="index-areaInformation-reveal" style="">
                <a onclick="indexAboutUsToggle()" class="login-button">
                    <img class="top-bar-button-icon" type="image/svg+xml" src="Images/orange-remove-icon.svg" alt="logo"/>
                </a>
            </div>
        </div>

    </div>
    <script>
//        $('#aboutUs').foundation('toggle');
        $("#aboutUs")
            .on("on.zf.toggler", function(e) {
                var html = '<a onclick="indexAboutUsToggle()" class="login-button" >' +
                            '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/orange-remove-icon.svg" alt="logo"/>' +
                            '</a>';
                document.getElementById('index-areaInformation-reveal').innerHTML = html;
            })
            .on("off.zf.toggler", function(e) {
                var html = '<a onclick="indexAboutUsToggle()" class="login-button" >' +
                    '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/orange-addition-icon.svg" alt="logo"/>' +
                    '</a>';
                document.getElementById('index-areaInformation-reveal').innerHTML = html;
            });

        function indexAboutUsToggle(){
            var displayProperty = document.getElementById('aboutUs').style.display;
//            console.log("The following is the display property" + displayProperty);
            $('#aboutUs').foundation('toggle');


        }
    </script>
<?php
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/bottom-bar.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/close-html.php";
?>