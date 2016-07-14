<?php
/**
 * Created by PhpStorm.
 * Date: 2016/03/28
 * Time: 3:22 PM
 */
$PAGE_TITLE = "Register";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/open-html.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/top-bar.php";
    if($USER_TYPE != -1) {
        echo 'This is the type of user'.$USER_TYPE;
       SebenzaServer::redirect("/userPage.php");
    }
?>

    <div class="content-view">
        <div class="row collapse background-image">
            <div class="large-3 columns full-height">
                <ul class="tabs vertical full-height" style="overflow: hidden" id="example-vert-tabs" data-tabs>
                    <li class="tabs-title is-active"><a href="#panel1v">Register as Tradeworker</a></li>
                    <li class="tabs-title"><a href="#panel2v">Register as Homeuser</a></li>
                    <li class="tabs-title"><a href="#panel3v">Register as Contracotor</a></li>
                </ul>
            </div>
            <div class="large-9 columns full-height">
                <div class="tabs-content vertical full-height" data-tabs-content="example-vert-tabs">
                    <div class="tabs-panel full-height is-active large-12" style="padding: 1em;overflow-y: auto; overflow-x: hidden" id="panel1v">
                        <?php
                        include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/tradeworkerRegistrationForm.php";
                        ?>
                    </div>
                    <div class="tabs-panel full-height" style="padding: 1em;overflow-y: auto; overflow-x: hidden" id="panel2v">
                        <?php
                        include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/homeuserRegistrationForm.php";
                        ?>
                    </div>
                    <div class="tabs-panel full-height" style="padding: 1em;overflow-y: auto; overflow-x: hidden" id="panel3v">
                        <?php
                            include_once $_SERVER['DOCUMENT_ROOT'] . "/php/interface/contractorRegistrationForm.php";
                        ?>
                    </div>
                </div>
            </div>
        </div>

    </div>
<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/bottom-bar.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/close-html.php";
?>