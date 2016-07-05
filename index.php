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
        function initMap() {
            var marker;
            var mapProp;
            var myLatlng = {lat: -26.1657905, lng: 28.163748};
            var map = new google.maps.Map(document.getElementById('googleMap'), {
                zoom: 8,
                center: myLatlng
            });
//            var marker = new google.maps.Marker({
//                position: myLatlng,
//                map: map,
//                title: 'Click to zoom'
//            });
            //Add listener
//            google.maps.event.addListener(marker, "click", function (event) {
//                var latitude = event.latLng.lat();
//                var longitude = event.latLng.lng();
//                console.log( latitude + ', ' + longitude );
//            }); //end addListener

            var geocoder = new google.maps.Geocoder;
            var infowindow = new google.maps.InfoWindow;

            geocodeLatLng(geocoder, map, infowindow,myLatlng);
        }
//        google.maps.event.addDomListener(window, 'load', initialize);
        //need to have the map resize without affecting the other elements.
        //google.maps.event.addDomListener(window, 'resize', initialize);
        function geocodeLatLng(geocoder, map, infowindow,myLatLng) {
            //var input = document.getElementById('latlng').value;
            var latlng = myLatLng;
            //var latlngStr = input.split(',', 2);
            //var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
            geocoder.geocode({'location': latlng}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        map.setZoom(11);
                        var marker = new google.maps.Marker({
                            position: latlng,
                            map: map
                        });
                        infowindow.setContent(results[1].formatted_address);
                        infowindow.open(map, marker);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        }
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