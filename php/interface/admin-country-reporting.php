<script src="/chart.js/dist/Chart.bundle.js"></script>
<style>
    canvas {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
</style>

<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Country Reports</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="admin-manage-country-reports-search-form" name="admin-manage-country-reports-search-form">
        <div class="row">
            <div class="column large-11">
                <label>Search:</label>
                <input type="text" name="ignore-admin-manage-country-reports-search" id="admin-manage-country-reports-search">
            </div>
            <div class="column large-1">

            </div>
        </div>
        <div class="row">
            <div class="column large-11">
                <div class="full-width" id="admin-manage-country-reports-areainformation" style="overflow-y: auto; height: 400px">
<!--                    <div id="container" style="width: 75%;">-->
<!--                        <canvas id="canvas"></canvas>-->
<!--                    </div>-->
<!--                    <div id="container1" style="width: 75%;">-->
<!--                        <canvas id="canvas1"></canvas>-->
<!--                    </div>-->
<!--                    <button id="randomizeData">Randomize Data</button>-->
<!--                    <button id="addDataset">Add Dataset</button>-->
<!--                    <button id="removeDataset">Remove Dataset</button>-->
<!--                    <button id="addData">Add Data</button>-->
<!--                    <button id="removeData">Remove Data</button>-->
                </div>
            </div>
        </div>
    </form>


    <div class="row">
        <div class="large-4 large-offset-4 medium-offset-4 medium-4 columns">
            <button type="button" class="button warning" style="margin-top: 0.5em" onclick="">
                Edit Selected
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>
            </button>
        </div>
        <div class="large-4 medium-4 columns">
            <button type="button" class="button alert" style="margin-top: 0.5em" onclick="">
                Add new
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </button>
        </div>
    </div>
</div>

<div class="small reveal" id="admin-manage-country-reports-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="admin-manage-country-reports-modal-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="reveal" id="admin-manage-country-reports-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="admin-manage-country-reports-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<script>
    $('#randomizeData').click(function() {
        var zero = Math.random() < 0.2 ? true : false;
        $.each(barChartData.datasets, function(i, dataset) {
            dataset.backgroundColor = randomColor();
            dataset.data = dataset.data.map(function() {
                return zero ? 0.0 : randomScalingFactor();
            });

        });
        window.myBar.update();
    });

    $('#addDataset').click(function() {
        var newDataset = {
            label: 'Dataset ' + barChartData.datasets.length,
            backgroundColor: randomColor(),
            data: []
        };

        for (var index = 0; index < barChartData.labels.length; ++index) {
            newDataset.data.push(randomScalingFactor());
        }

        barChartData.datasets.push(newDataset);
        window.myBar.update();
    });

    $('#addData').click(function() {
        if (barChartData.datasets.length > 0) {
            var month = MONTHS[barChartData.labels.length % MONTHS.length];
            barChartData.labels.push(month);

            for (var index = 0; index < barChartData.datasets.length; ++index) {
                //window.myBar.addData(randomScalingFactor(), index);
                barChartData.datasets[index].data.push(randomScalingFactor());
            }

            window.myBar.update();
        }
    });

    $('#removeDataset').click(function() {
        barChartData.datasets.splice(0, 1);
        window.myBar.update();
    });

    $('#removeData').click(function() {
        barChartData.labels.splice(-1, 1); // remove the label first

        barChartData.datasets.forEach(function(dataset, datasetIndex) {
            dataset.data.pop();
        });

        window.myBar.update();
    });
</script>