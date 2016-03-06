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
    echo "<pre>";

    //TEST CASES FOR DatabaseModule.php
    $dbHandler = new ServerSessionDatabaseHandler("localhost","root","Sebenza","SebenzaSA_Database");
    if ($dbHandler->runCommand("SELECT * FROM `REGISTERED_USER`")) {
        echo $dbHandler->getResultsInJSON()."\n";
    }

    //Just for the sake of initiating the variable
    $insertID = 10;

    if ($dbHandler->runCommand("INSERT INTO `REGISTERED_USER` (`Username`, `Email`, `ContactNumber`, `TypeOfUser`, `Password`) VALUES (?,?,?,?,?)",'phpInsertedUser', 'userphp@email.co.za', '0829494321', 3, 'unhashedPassword3')) {
        $insertID = $dbHandler->getInsertID();
        echo "Insert ID: ".$insertID."\n";
        echo "Number of rows affected: ".$dbHandler->getAffectedRowCount()."\n";
    }

    if ($dbHandler->runCommand("SELECT * FROM `REGISTERED_USER`")) {
        print_r($dbHandler->getResults());
    }

    if($dbHandler->runCommand("UPDATE `REGISTERED_USER` SET `Username` = ? WHERE `UserID` = ?",'Alice in Wonderland',$insertID)) {
        echo "Number of rows affected: ".$dbHandler->getAffectedRowCount()."\n";
    }

    if ($dbHandler->runCommand("SELECT * FROM `REGISTERED_USER`")) {
        echo $dbHandler->getResults()[2]["Username"]."\n";
    }

    $dbHandler->runCommand("DELETE FROM `REGISTERED_USER` WHERE `UserID` = ?", $insertID);

    if ($dbHandler->runCommand("SELECT * FROM `REGISTERED_USER`")) {
        print_r($dbHandler->getResults());
    }

    echo "</pre>";
?>

</body>
</html>