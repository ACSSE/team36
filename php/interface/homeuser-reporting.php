<script src="/chart.js/dist/Chart.bundle.js"></script>
<style>
    canvas {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
</style>

<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Manage reporting Jobs</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="homeuser-manage-reporting" name="homeuser-manage-reporting">

        <div class="row">
            <div class="column large-11">
                <div class="areainformation-panel-container full-width" id="homeuser-reporting-areainformation">

                </div>
            </div>
        </div>
    </form>



</div>
<div class="small reveal" id="homeuser-reporting-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-reporting-modal-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="reveal" id="homeuser-reporting-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-reporting-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>