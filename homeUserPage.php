<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/03/31
 * Time: 12:47 AM
 */
$PAGE_TITLE = "Home User Main Page";
include $_SERVER['DOCUMENT_ROOT']."/php/interface/open-html.php";
include $_SERVER['DOCUMENT_ROOT']."/php/interface/top-bar.php";
?>
    <div class="content-view">
        <div class="row collapse tab-styler">

            <div class="large-3 columns">
                <ul class="tabs vertical" id="example-vert-tabs" data-tabs>
                    <li class="tabs-title is-active"><a class="tab-button" href="#panel1v">Request trade worker(s)</a></li>
                    <li class="tabs-title"><a class="tab-button" href="#panel2v">Request contractor(s)</a></li>
                    <li class="tabs-title"><a class="tab-button" href="#panel3v">Job management</a></li>
                </ul>
            </div>
            <div class="large-9 columns">
                <div class="tabs-content vertical" data-tabs-content="example-vert-tabs">
                    <div class="tabs-panel is-active" id="panel1v">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div class="tabs-panel" id="panel2v">
                        <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
                    </div>
                    <div class="tabs-panel" id="panel3v">
                        <img class="thumbnail" src="assets/img/generic/rectangle-3.jpg">
                    </div>
                </div>
            </div>
        </div>

    </div>
<?php
include $_SERVER['DOCUMENT_ROOT']."/php/interface/bottom-bar.php";
include $_SERVER['DOCUMENT_ROOT']."/php/interface/close-html.php";
?>