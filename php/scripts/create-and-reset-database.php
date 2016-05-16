<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 3/31/16
 * Time: 10:51 PM
 */
include_once $_SERVER['DOCUMENT_ROOT'] . "/php/classes/SebenzaServer.php";
SebenzaServer::start();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Create and Reset Database</title>
</head>
<body>
<?php
echo "<pre>";
    if (SebenzaServer::createAndResetDatabase()) {
        echo 'Database created and reset.';
    } else {
        echo 'Could not successfully create and reset the database.';
        var_dump(SebenzaServer::fetchDatabaseHandler()->getCommandsReport());
    }
echo "</pre>";
?>
</body>
</html>
<?php SebenzaServer::stop();?>
