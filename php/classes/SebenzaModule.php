<?php
/**
 * Created by PhpStorm
 * Date: 2016/02/15
 * Time: 1:16 AM
 */
include_once $_SERVER['DOCUMENT_ROOT']."/php/classes/SessionModule.php";
include_once $_SERVER['DOCUMENT_ROOT']."/php/classes/DatabaseModule.php";
class SebenzaServer {
    public static function start() {
        //Used in open-html.php and AJAX handling below
        //Start output buffering - server only sends the output once per page vs for every "echo" or "print" command
        ob_start();
        //Set the server's default timezone - time is important for many of php's functions
        if (date_default_timezone_get()!=="Africa/Johannesburg") {
            date_default_timezone_set("Africa/Johannesburg");
        }
    }

    public static function stop() {
        //Used in close-html.php and AJAX handling below
        //Flush the output buffer - send all the output generated by the server to the client now
        ob_end_flush();
    }

    public static function login($username, $password):bool {
        //Assume failure
        $successfulLogin = false;
        //Validate the function's arguments
        if (is_string($username) && is_string($password)) {
            //Get an instance of the database and session handlers
            $dbHandler = self::fetchDatabaseHandler();
            $sessionHandler = self::fetchSessionHandler();
            //Fetch the relevant user's data
            $dbHandler->runCommand("SELECT `Password`,`Username`,`TypeOfUser` FROM REGISTERED_USER WHERE `Username` = ?", $username);
            $result = $dbHandler->getResults();
            //If a single result was returned and the password matches the hashed password stored in the database
            if (count($result) == 1 && password_verify($password, $result[0]['Password'])) {
                //Mark success
                $successfulLogin = true;
                //Set any variables you want access to in the session
                $sessionHandler->setSessionVariable("Username", $result[0]['Username']);
                $sessionHandler->setSessionVariable("UserType", $result[0]['TypeOfUser']);
            }
        }
        return $successfulLogin;
    }

    //Due to this function relying on redirect, it must happen in the beginning of the open-html.php file too.
    public static function logout() {
        //Clear and end the current session
        self::fetchSessionHandler()->endSession();
        //Redirect to index
        self::redirect("index.php");
    }

    //This must be called before any output is sent to the client, so in the beginning of the open-html.php file.
    public static function redirect($url) {
        if (is_string($url)) {
            //Redirect the server
            header("Location: " . $url);
            //End script execution of current page
            exit(0);
        }
    }

    public static function fetchDatabaseHandler():DatabaseHandler {
        $session = self::fetchSessionHandler();
        if ($session->exists("dbHandler")) {
            $dbHandler = $session->getSessionVariable("dbHandler");
        } else {
            $dbHandler = new DatabaseHandler("localhost","root","","SebenzaSA_Database");
            $session->setSessionVariable("dbHandler", $dbHandler);
        }
        return $dbHandler;
    }

    public static function createAndResetDatabase():bool {
        $dbHandler = new DatabaseHandler("localhost","root","","");
        $success = $dbHandler->executeSQLScriptFile("database/SebenzaSA_Database.sql");
        self::fetchSessionHandler()->setSessionVariable("dbHandler", $dbHandler);
        return $success;
    }

    public static function fetchSessionHandler():Session {
        $session = new Session();
        if ($session->exists('sessionHandler')) {
            $session = $session->getSessionVariable('sessionHandler');
        } else {
            $session->setSessionVariable('sessionHandler', $session);
        }
        return $session;
    }

    public static function hashPassword($password):string {
        return password_hash($password,PASSWORD_DEFAULT);
    }
}

//The following code handles ajax requests sent to SessionModule.php as in sebenza.js for the login functionality
if (!empty($_POST)) {
    //Synchronise the time and start output buffering (an AJAX request can happen separate from an official page load)
    SebenzaServer::start();
    //AJAX requests are served some sort of textual response (usually JSON for easier handling by JavaScript)
    $response = "";
    if (isset($_POST['action'])) {
        $action = $_POST['action'];
        switch ($action) {
            case 'login':
                if (isset($_POST['username']) && isset($_POST['password'])) {
                    $response = json_encode(SebenzaServer::login($_POST['username'], $_POST['password']));
                } else {
                    $response = json_encode(false);
                }
                break;
            default:
                //If the action was not one of the handled cases, respond appropriately
                $response = json_encode("Request not recognised.");
                break;
        }
    }
    echo $response;
    //Flush the output buffer
    SebenzaServer::stop();
}