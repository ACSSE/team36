<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/04/01
 * Time: 11:30 AM
 */

$PAGE_TITLE = "userPage";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/open-html.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/top-bar.php";
?>
<div class="content-view">
    <?php
    $test = SebenzaServer::fetchSessionHandler();
    var_dump($test->variableCount());
    var_dump($test->getSessionVariable('Username'));
    var_dump($test->getSessionVariable('UserType'));

    if(!$test->isEmpty()) {
        if ($test->getSessionVariable('UserType') == 0) {
            echo '<div class="row collapse tab-styler">
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
                    ';
        }
        else{
            echo'<div class="row collapse tab-styler">
                    <div class="large-3 columns">
                        <ul class="tabs vertical" id="example-vert-tabs" data-tabs>
                            <li class="tabs-title is-active"><a class="tab-button" href="#panel1v">Tab 1</a></li>
                            <li class="tabs-title"><a class="tab-button" href="#panel2v">Tab 2</a></li>
                            <li class="tabs-title"><a class="tab-button" href="#panel3v">Tab 3</a></li>
                            <li class="tabs-title"><a class="tab-button" href="#panel4v">Tab 4</a></li>
                            <li class="tabs-title"><a class="tab-button" href="#panel3v">Tab 5</a></li>
                            <li class="tabs-title"><a class="tab-button" href="#panel4v">Tab 6</a></li>
                        </ul>
                    </div>
                    <div class="large-9 columns">
                        <div class="tabs-content vertical" data-tabs-content="example-vert-tabs">
                            <div class="tabs-panel is-active" id="panel1v">
                                <form>
                                    <div class="row">
                                        <div class="large-12 columns">
                                            <label>Input Label</label>
                                            <input type="text" placeholder="large-12.columns" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="large-12 columns">
                                            <label>Input Label</label>
                                            <div class="input-group">
                                                <span class="input-group-label">+27</span>
                                                <input type="text" placeholder="12 345 6789" class="input-group-field"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="large-4 medium-4 columns">
                                            <label>Input Label</label>
                                            <input type="text" placeholder="large-4.columns" />
                                        </div>
                                        <div class="large-4 medium-4 columns">
                                            <label>Input Label</label>
                                            <input type="text" placeholder="large-4.columns" />
                                        </div>
                                        <div class="large-4 medium-4 columns">
                                            <label>Input Label</label>
                                            <div class="input-group">
                                                <input type="text" placeholder="small-9.columns" class="input-group-field" />
                                                <span class="input-group-label">.com</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="large-12 columns">
                                            <label>Select Box</label>
                                            <select>
                                                <option value="husker">Husker</option>
                                                <option value="starbuck">Starbuck</option>
                                                <option value="hotdog">Hot Dog</option>
                                                <option value="apollo">Apollo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="large-12 medium-12 columns">
                                            <label>Choose Your Favorite</label>
                                            <input type="radio" name="pokemon" value="Red" id="pokemonRed"><label for="pokemonRed">Radio 1</label>
                                            <input type="radio" name="pokemon" value="Blue" id="pokemonBlue"><label for="pokemonBlue">Radio 2</label>
                                            <input type="radio" name="pokemon" value="Yellow" id="pokemonYellow"><label for="pokemonYellow">Radio 3</label>
                                            <input type="radio" name="pokemon" value="Green" id="pokemonGreen"><label for="pokemonGreen">Radio 4</label>
                                            <input type="radio" name="pokemon" value="Silver" id="pokemonSilver"><label for="pokemonSilver">Radio 4</label>
                                            <input type="radio" name="pokemon" value="Gold" id="pokemonGold"><label for="pokemonGold">Radio 4</label>
                                        </div>
                                        <div class="large-12 medium-12 columns">
                                            <label>Check these out</label>
                                            <input id="checkbox1" type="checkbox"><label for="checkbox1">Checkbox 1</label>
                                            <input id="checkbox2" type="checkbox"><label for="checkbox2">Checkbox 2</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="large-12 columns">
                                            <label>Textarea Label</label>
                                            <textarea placeholder="small-12.columns"></textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="large-12 columns">
                                            <a href="#" class="float-right medium secondary button radius">Warning Button</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="tabs-panel" id="panel2v">
                                <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
                            </div>
                            <div class="tabs-panel" id="panel3v">
                                <img class="thumbnail" src="assets/img/generic/rectangle-3.jpg">
                            </div>
                            <div class="tabs-panel" id="panel4v">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                            <div class="tabs-panel" id="panel5v">
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                            <div class="tabs-panel" id="panel6v">
                                <img class="thumbnail" src="assets/img/generic/rectangle-5.jpg">
                            </div>
                        </div>
                    </div>
                </div>
                ';
        }
    }
    ?>
</div>
<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/bottom-bar.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/close-html.php";
?>



