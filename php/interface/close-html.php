<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/03/28
 * Time: 3:24 PM
 */?>
    <!--DOCUMENT END-->
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
