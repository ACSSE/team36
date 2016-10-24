<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/03/28
 * Time: 3:24 PM
 */?>
    <!--DOCUMENT END-->



        </div>
<div id="make-visible-onprint" style="display: none">
    <div class="section-to-print" style="visibility: hidden;width: 100%;height:100%" id="section-to-print">

    </div>
</div>

        <!-- Foundation required code-->

        <script>
            $(document).foundation();
            <?php
                if ($USER_TYPE != -1) {
                    echo "startNotificationPulls();\n";
                }
            ?>
        </script>
        <!--End Foundation requirements-->
    </body>
</html>
<?php SebenzaServer::stop();?>

