<?php
/**
 * Created by PhpStorm
 * Date: 2016/02/15
 * Time: 1:16 AM
 */
include "SessionModule.php";
include "DatabaseModule.php";
class SebenzaServer {
    private $clientDBHandler = null;
    private $clientSession = null;

    function __construct() {
        $this->clientDBHandler = new DatabaseHandler("localhost","root","Sebenza","SebenzaSA_Database");
        $this->clientSession = new Session();
        //Turn on output buffering, so that print type commands are buffered before sent
        ob_start();
        //For time synchronization purposes
        if (date_default_timezone_get()!=="Africa/Johannesburg") {
            date_default_timezone_set("Africa/Johannesburg");
        }
    }

    function __destruct() {
        //Flush the output buffer and turn output buffering off
        ob_end_flush();
    }

    public function login($username, $password):bool {
        $successfulLogin = false;
        if (is_string($username) && is_string($password)) {
            $this->clientDBHandler->runCommand("SELECT `Password`,`Username` FROM REGISTERED_USER WHERE `Username` = ?", $username);
            $result = $this->clientDBHandler->getResults();
            //Uncomment when database entries have hashed passwords
            if (count($result) == 1 && password_verify($password, $result[0]['Password'])) {
                $successfulLogin = true;
                $this->clientSession->setSessionVariable("Username", $result[0]['Username']);
            }
        }
        return $successfulLogin;
    }

    public function fetchDatabaseHandler():DatabaseHandler {
        return $this->clientDBHandler;
    }

    public function resetDatabase():bool {
        return $this->clientDBHandler->executeSQLScriptFile("/database/SebenzaSA_Database.sql");
    }

    public function fetchSessionHandler():Session {
        return $this->clientSession;
    }

    public static function hashPassword($password):string {
        return password_hash($password,PASSWORD_DEFAULT);
    }

    public static function comparePasswords($password,$inputPassword):bool {
        if($password == $inputPassword){
            return true;
        }
        else{
            return false;
        }
    }
}