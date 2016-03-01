<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/03/01
 * Time: 11:47 PM
 */ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create Job Request Example</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="foundation-6/css/foundation.css" />
    <link rel="stylesheet" href="foundation-6/css/app.css" />
    <link rel="stylesheet" href="css/customElementStyle.css" />
</head>
<body>
<div class="centerPage" style="background-color: grey;">
    <div class="row">
        <div class="large-8 large-offset-2 columns" style="text-align: center">Unsubcribed User Create Job Request View (Non Recurring Jobs)</div>
    </div>
    <div class="row" style="padding-top: 3em">
        <div class="large-8 large-offset-2 columns">
            <ul class="menu vertical">
                <li><div class="row">
                        <div class="large-5 columns text-right" style="padding-right:0"><label>Job Location:</label></div>
                        <div class="large-7 columns" style="padding-left:0.35em"><input type="text" name="jobLocation" placeholder="Enter valid address" style="height:1.75em"></div>
                    </div></li>
                <li><div class="row">
                        <div class="large-5 columns text-right" style="padding-right:0"><label>Job Commencement Date:</label></div>
                        <div class="large-7 columns" style="padding-left:0.35em"><input type="date" name="commDate"></div>
                    </div></li>
                <li class="text-center" style="padding-top: 1em; padding-bottom: 1em;"><label>Select trade worker quantities under each category:</label></li>
                <li><div class="row">
                        <div class="large-5 columns text-right" style="padding-right:0"><label>Domestic Cleaning:</label></div>
                        <div class="large-2 columns end" style="padding-left:0.35em"><input type="number" name="dcQuantity"></div>
                    </div></li>
                <li><div class="row">
                        <div class="large-5 columns text-right" style="padding-right:0"><label>Gardening:</label></div>
                        <div class="large-2 columns end" style="padding-left:0.35em"><input type="number" name="gQuantity"></div>
                    </div></li>
                <li><div class="row">
                        <div class="large-5 columns text-right" style="padding-right:0"><label>Building:</label></div>
                        <div class="large-2 columns end" style="padding-left:0.35em"><input type="number" name="bQuantity"></div>
                    </div></li>
                <li><div class="row">
                        <div class="large-5 columns text-right" style="padding-right:0"><label>Tiling:</label></div>
                        <div class="large-2 columns end" style="padding-left:0.35em"><input type="number" name="tQuantity"></div>
                    </div></li>
                <li><div class="row">
                        <div class="large-5 columns text-right" style="padding-right:0"><label>Paving:</label></div>
                        <div class="large-2 columns end" style="padding-left:0.35em"><input type="number" name="pvQuantity"></div>
                    </div></li>
                <li><div class="row">
                        <div class="large-5 columns text-right" style="padding-right:0"><label>Painting:</label></div>
                        <div class="large-2 columns end" style="padding-left:0.35em"><input type="number" name="ptQuantity"></div>
                    </div></li>
                <li style="padding-top: 1em"><a href="#"  class="success button"><i class="fi-list"></i> <span>Submit Job Request</span></a></li>
                <li><a href="#"  class="alert button"><i class="fi-list"></i> <span>Cancel Job Request</span></a></li>
            </ul>
        </div>
    </div>
</div>
</body>
</html>