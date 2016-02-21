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
    $dbHandler = new ServerSessionDatabaseHandler("localhost","root","Sebenza","test");
    print_r($dbHandler->runCommand("DROP TABLE IF EXISTS `TestEntity`"));
    print_r($dbHandler->runCommand("CREATE TABLE `test`.`TestEntity` ( `STUDENT_NUMBER` VARCHAR(9) NOT NULL , `STUDENT_NAME` VARCHAR(25) NOT NULL , PRIMARY KEY (`STUDENT_NUMBER`)) ENGINE = InnoDB"));
    print_r($dbHandler->runCommand("DELETE FROM `TestEntity` WHERE `STUDENT_NUMBR` = ?", '1'));
    print_r($dbHandler->runCommand("DELETE FROM `TestEntity` WHERE `STUDENT_Nme` = ?", 'b'));
    print_r($dbHandler->getErrors());
    print_r($dbHandler->runCommand("INSERT INTO `TestEntity` VALUES (?,?)",'123456789','Bob'));
    print_r($dbHandler->runCommand("INSERT INTO `TestEntity` VALUES (?,?)",'234567890','Alice'));
    print_r($dbHandler->runCommand("SELECT * FROM `TestEntity`"));
    print_r($dbHandler->runCommand("UPDATE `TestEntity` SET `STUDENT_NAME` = ? WHERE `STUDENT_NUMBER` = '234567890'",'Alice in Wonderland'));
    print_r($dbHandler->runCommand("DELETE FROM `TestEntity` WHERE `STUDENT_NUMBER` = ?", '123456789'));
    print_r($dbHandler->runCommand("SELECT * FROM `TestEntity`"));

    echo "</pre>";
?>

</body>
</html>