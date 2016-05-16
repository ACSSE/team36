<?php
/**
 * Created by PhpStorm.
 * Date: 2016/03/28
 * Time: 3:22 PM
 */
$PAGE_TITLE = "Homepage";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/open-html.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/top-bar.php";

?>
    <script>
        function initialize() {
            var mapProp = {
                center:new google.maps.LatLng(-26.1657905,28.163748),
                zoom:8,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
        }
        google.maps.event.addDomListener(window, 'load', initialize);
        //need to have the map resize without affecting the other elements.
        //google.maps.event.addDomListener(window, 'resize', initialize);

    </script>
    <div class="content-view">
        <div>
            <div class="orbit" aria-label="Favorite Home Pictures" data-orbit data-use-m-u-i="false">
                <ul class="orbit-container">
                    <button class="orbit-previous"><span class="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>
                    <button class="orbit-next"><span class="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>
                    <li class="orbit-slide is-active">
                        <div id="googleMap" class="map-sizer"></div>
                    </li>
                    <li class="orbit-slide">
                        <img class="orbit-image" src="Images/construction-hard-hat.jpg" alt="Space">
                    </li>
                    <li class="orbit-slide">
                        <img class="orbit-image" src="Images/construction-hard-hat.jpg" alt="Space">
                    </li>
                    <li class="orbit-slide">
                        <img class="orbit-image" src="Images/construction-hard-hat.jpg" alt="Space">
                    </li>
                </ul>
            </div>
        </div>
    </div>
<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/bottom-bar.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/close-html.php";
?>