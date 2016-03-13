<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/02/15
 * Time: 1:16 AM
 */
    include __DIR__."/PhpModules/DatabaseModule.php";
    include __DIR__."/PhpModules/SessionModule.php";
?>

<!DOCTYPE html>
<html>
<head>
    <title>Test Cases</title>
</head>
<body>
<?php
    //Output
    echo "<pre>";
    $startTime = microtime(true);
    //$session = new SebenzaSessionHandler(["dbHandler", new DatabaseHandler("localhost","root","Sebenza")]);
    $session = new SebenzaSessionHandler();
    if($dbHandler = $session->getSessionVariable("dbHandler")) {
        //$dbHandler->executeSQLScriptFile('./database/SebenzaSA_Database.sql');
        print_r($dbHandler->getCommandsReport());
    } else {
        echo "No such session variable!\n";
    }
    echo (microtime(true) - $startTime)." seconds runtime.";
    echo "</pre>";
?>

</body>
</html>