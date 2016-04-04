<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/02/15
 * Time: 1:16 AM
 */
    include_once $_SERVER['DOCUMENT_ROOT'] . "/php/classes/SebenzaServer.php";
    SebenzaServer::start();
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
    SebenzaServer::createAndResetDatabase();
    //var_dump(SebenzaServer::fetchDatabaseHandler()->getCommandsReport());
    $dbHandler = SebenzaServer::fetchDatabaseHandler();
    $sessionHandler = SebenzaServer::fetchSessionHandler();
    if ($sessionHandler->exists("testVariable")) {
        echo "The test variable stored in the session is: ".$sessionHandler->getSessionVariable('testVariable')."."."\n";
    } else {
        echo "The test variable does not exist in the session."."\n";
    }
    $dbHandler->runCommand('SELECT * FROM REGISTERED_USER');
    echo $dbHandler->getLastCommand()."\n";
    var_dump($dbHandler->getResults());
    var_dump(SebenzaServer::fetchDatabaseHandler()->getResults());
    $sessionHandler->setSessionVariable('testVariable', $dbHandler->getResultsInJSON());
    if ($sessionHandler->exists("testVariable")) {
        echo "The test variable stored in the session is: ".$sessionHandler->getSessionVariable('testVariable')."."."\n";
    } else {
        echo "The test variable does not exist in the session."."\n";
    }
    $sessionHandler->unsetSessionVariable("testVariable");
    if ($sessionHandler->exists("testVariable")) {
        echo "The test variable stored in the session is: ".$sessionHandler->getSessionVariable('testVariable')."."."\n";
    } else {
        echo "The test variable does not exist in the session."."\n";
    }
    $numPasswordsToUpdate = count($dbHandler->getResults());
    for ($i = 1; $i <= $numPasswordsToUpdate; $i++) {
        $dbHandler->runCommand("UPDATE REGISTERED_USER SET Password=? WHERE UserID=?;", SebenzaServer::hashPassword("password"), $i);
        echo "Num rows affected: ".$dbHandler->getRowsAffected()."\n";
    }

    if (SebenzaServer::login('thirdUser', 'password')) {
        echo "Update worked!\n";
    } else {
        echo "Update did not work, or thirdUser no longer exists.\n";
    }
    $dbHandler->runCommand('SELECT * FROM REGISTERED_USER');
    var_dump($dbHandler->getResults());
    $sessionHandler->endSession();
    echo (microtime(true) - $startTime)." seconds runtime.";
    echo "</pre>";
?>

</body>
</html>
<?php SebenzaServer::stop();?>