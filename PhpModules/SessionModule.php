<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/02/14
 * Time: 8:40 PM
 * Author: 215022652
 */
class SebenzaSessionHandler {
    function __construct(...$keyValuePairs) {
        //If the session is not already active, start it
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        if(isset($keyValuePairs)) {
            $this->setSessionVariables(...$keyValuePairs);
        }

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

    public function setSessionVariables(...$keyValuePairs):bool {
        $setVariables = true;
        if (isset($keyValuePairs) && !empty($keyValuePairs)) {
            foreach ($keyValuePairs as $pair) {
                if (is_array($pair) && count($pair) == 2) {
                    $setVariables = $setVariables && $this->setSessionVariable($pair[0],$pair[1]);
                }
            }
        }
        return $setVariables;
    }

    public function setSessionVariable($key, $value): bool {
        $setVariable = false;
        if (is_string($key) && isset($value)) {
            $_SESSION[$key] = $value;
            $setVariable = true;
        }
        return $setVariable;
    }

    public function getSessionVariable($key) {
        $variable = null;
        if ($this->exists($key)) {
            $variable = $_SESSION[$key];
        }
        return $variable;
    }

    public function exists($key):bool {
        return is_string($key) && isset($_SESSION[$key]);
    }
}