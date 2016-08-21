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


    <div class="content-view">
<!--        <div>-->
<!--            <div class="orbit" aria-label="Favorite Home Pictures" data-orbit data-use-m-u-i="false">-->
<!--                <ul class="orbit-container">-->
<!--                    <button class="orbit-previous"><span class="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>-->
<!--                    <button class="orbit-next"><span class="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>-->
<!--                    <li class="orbit-slide is-active">-->
<!--                        <img class="orbit-image" src="Images/construction-hard-hat.jpg" alt="Space">-->
<!--                    </li>-->
<!--                    <li class="orbit-slide">-->
<!--                        <img class="orbit-image" src="Images/construction-hard-hat.jpg" alt="Space">-->
<!--                    </li>-->
<!--                    <li class="orbit-slide">-->
<!--                        <img class="orbit-image" src="Images/construction-hard-hat.jpg" alt="Space">-->
<!--                    </li>-->
<!--                    <li class="orbit-slide">-->
<!--                        <img class="orbit-image" src="Images/construction-hard-hat.jpg" alt="Space">-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </div>-->
<!--        </div>-->
        <script>
            switchToPage('areainformation-page.php');
        </script>

    </div>
<?php
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/bottom-bar.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/interface/close-html.php";
?>