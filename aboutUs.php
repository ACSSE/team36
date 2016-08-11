<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/02
 * Time: 12:52 PM
 */
$PAGE_TITLE = "AboutUs Page";
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/open-html.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/top-bar.php";
?><div class="content-view" style="overflow-y: hidden">
    <div class="background-image-contact" style="padding: 10px">
        <div class="full-height full-width" style="overflow-y: scroll;background-color: rgba(247, 196, 85, 0.85)">
                <div class="row">
                    <div class="large-6 columns">
                            <h1>About Us:</h1>

                            <div class="primary callout">
                                <p>
                                    We are all about making the process of finding jobs and creating job opportunities for those who are currenty unemployed or seekinng
                                    work, a whole lot simpler! Our work is dedicated to Trade Workers, Home Users and Contractors. All of which can use our system and interact with any other user
                                    to get work or to get work done. We strive to provide a fair environment in which Trade Workers, Contractors and Homeusers can interact with one
                                    another to set up contracts, to complete these contracts and be reviewed by the users who create the contracts.
                                </p>
                            </div>
                            <div class="callout">
                                <p>This in turn builds up reliable recommendations through the people who use either a contractor or a tradeworker. Not only will our system be of use to the Tradeworkers in benefiting them in acquiring jobs,
                                    but it will accumulate job recordings and essentially build up a "CV" for the user.
                                    Tradeworkers will also have the ability to improve their CV's through recommendations and job history.</p>
                            </div>

                        </div>
                        <div class="large-6 columns" style="margin-top:5em ">
                            <div class="callout">
                                Sebenza is an easy-to-use site designed to place those looking for work in contact with those needing work done.
                                <h6>Trade Workers</h6>
                                Sebenza offers a competitive edge for Trade Workers by compiling a running list of Jobs that have been completed by individual Trade Workers.  A job list can be generated at any time - it records the experience and recommendations received by employers, making it an excellent addition to a CV.
                                <h6>Home Users</h6>
                                From the odd household job, like painting the roof, to the contract of 3 months, Sebenza provides a way to contact the much need human capital to the job done! Home Users have the option of individual Trade Workers or Contractors depending on their preference.
                                <h6>Contractors</h6>
                                Contractors are able to source employees easily - they are all listed in the same place!  In addition, Contractors are able to build their business reput
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
<?php
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/bottom-bar.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/close-html.php";
?>