<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/01
 * Time: 7:09 PM
 */?>
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
                <h1>Request Trade Workers</h1>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <input id="checkbox1" type="checkbox"><label for="checkbox1">Painter</label>
                        <input id="checkbox2" type="checkbox"><label for="checkbox2">Tiler</label>
                        <input id="checkbox3" type="checkbox"><label for="checkbox3">Paver</label>
                        <input id="checkbox4" type="checkbox"><label for="checkbox4">Tree-Feller</label>
                    </div>
                    <div class="large-12 medium-12 columns">
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of User." style="width: 100px;height: 100px;">
                        <input type="radio" name="worker" value="worker1" id="worker1"><label for="worker1">Joe Mason</label>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of User." style="width: 100px;height: 100px;">
                        <input type="radio" name="worker" value="worker2" id="worker2"><label for="worker2">Dill Harper</label>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of User." style="width: 100px;height: 100px;">
                        <input type="radio" name="worker" value="worker3" id="worker3"><label for="worker3">Fred Kruger</label>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of User." style="width: 100px;height: 100px;">
                        <input type="radio" name="worker" value="worker4" id="worker4"><label for="worker4">Tom B</label>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">Notify TradeWorker</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel" id="panel2v">
                <h1>Request Trade Workers</h1>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <input id="checkbox1" type="checkbox"><label for="checkbox1">Painter</label>
                        <input id="checkbox2" type="checkbox"><label for="checkbox2">Tiler</label>
                        <input id="checkbox3" type="checkbox"><label for="checkbox3">Paver</label>
                        <input id="checkbox4" type="checkbox"><label for="checkbox4">Tree-Feller</label>
                    </div>
                    <div class="large-12 medium-12 columns">
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="contractor" value="contractor1" id="contractor1"><label for="contractor1">Paint Co</label>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="contractor" value="contractor2" id="contractor2"><label for="contractor2">Tiler Co</label>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="contractor" value="contractor3" id="contractor3"><label for="contractor3">Paver Co</label>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="contractor" value="contractor4" id="contractor4"><label for="contractor4">Tree-Feller Co</label>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">Notify Contractor</a>
                    </div>
                </div>
            </div>
            <div class="tabs-panel" id="panel3v">
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="contractor1" id="contractor1"><label for="contractor1">Paint Co</label>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="worker2" id="worker2"><label for="worker2">Joe Mason</label>
                        <img class="thumbnail" src="Images/tempContractorImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="contractor3" id="contractor3"><label for="contractor3">Paver Co</label>
                        <img class="thumbnail" src="Images/tempUserImage.png" alt="Photo of Contractor." style="width: 100px;height: 100px;">
                        <input type="radio" name="manageJob" value="worker4" id="worker4"><label for="contractor4">Dill Harper</label>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 medium-12 columns">
                        <a href="#" class="float-left medium secondary button radius">Manage Job</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
