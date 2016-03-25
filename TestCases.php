<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/02/15
 * Time: 1:16 AM
 */
    include __DIR__ . "/php/classes/SebenzaModule.php";
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
    $server = new SebenzaServer();
    $server->fetchDatabaseHandler()->runCommand("SELECT * FROM REGISTERED_USER");
    echo $server->fetchDatabaseHandler()->getResultsInJSON()."\n";
    echo "Login successful: ".$server->login("firstUser", "unhashedPassword1")."\n";
    echo $server->fetchSessionHandler()->getSessionVariable("Username")."\n";
    echo (microtime(true) - $startTime)." seconds runtime.";
    echo "</pre>";
?>

</body>
</html>