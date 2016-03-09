<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/02/15
 * Time: 1:16 AM
 */
    include __DIR__."/PhpModules/DatabaseModule.php";
    session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Test Cases</title>
</head>
<body>
<?php
    //Improves performance of text output functions
    ob_start();
    //Output
    echo "<pre>";
    $startTime = microtime(true);
    $dbHandler = new ServerSessionDatabaseHandler("localhost","root","Sebenza");
    if($dbHandler->executeSQLScriptFile('./database/SebenzaSA_Database.sql')) {
        print_r($dbHandler->getCommandsReport());
    } else {
        print_r($dbHandler->getErrors());
    }
    echo (microtime(true) - $startTime)." seconds runtime.";
    echo "</pre>";
?>

</body>
</html>