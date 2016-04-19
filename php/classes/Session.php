<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/02/14
 * Time: 8:40 PM
 * Author: 215022652
 */
class Session {
    private $idUseCount = 0;
    const REGEN_THRESHOLD = 15;

    /**
     * Session constructor. If a session is still active when the constructor is called, the old id is preserved. Only
     * endSession() and a timeout can clear and destroy a session.
     * @param array ...$keyValuePairs The key value pairs that should be associated with this session.
     */
    function __construct(...$keyValuePairs) {
        //Start the session
        $this->startSession();

        //Set initial key value pairs if applicable
        if(isset($keyValuePairs)) {
            $this->setSessionVariables(...$keyValuePairs);
        }
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

    public function setSessionVariable($key, $value):bool {
        $setVariable = false;
        if (is_string($key) && isset($value) && $this->isActive()) {
            $_SESSION[$key] = $value;
            $setVariable = true;
            $this->updateSessionID();
        }
        return $setVariable;
    }

    public function getSessionVariable($key) {
        $variable = null;
        if ($this->exists($key)) {
            $variable = $_SESSION[$key];
        }
        $this->updateSessionID();
        return $variable;
    }

    public function exists($key):bool {
        return is_string($key) && isset($_SESSION[$key]);
    }

    /**
     * @return int The number of variables stored in the current session.
     */
    public function variableCount():int {
        return count($_SESSION);
    }

    public function isEmpty():bool {
        return $this->variableCount() === 0;
    }

    /**
     * Regenerate the ID associated with this session.
     * @return bool
     */
    private function regenerateSessionID():bool {
        $this->idUseCount = 0;
        return session_regenerate_id();
    }

    /**
     * Used to regenerate the session id after REGEN_THRESHOLD calls have been made to getSessionVariable and
     * setSessionVariable. This is mostly for security
     */
    private function updateSessionID() {
        $this->idUseCount++;
        if ($this->idUseCount == self::REGEN_THRESHOLD) {
            $this->regenerateSessionID();
        }
    }

    /**
     * @return string The ID of the current session.
     */
    public function getSessionID():string {
        return session_id();
    }

    /**
     * Clears all the variables associated with the current session.
     */
    public function clearVariables() {
        session_unset();
    }

    /**
     * End the current session by clearing all the variables associated with it and removing its data.
     *
     * @return bool True if the session data was removed.
     */
    public function endSession():bool {
        $this->clearVariables();
        return session_destroy();
    }

    public function isActive():bool {
        return session_status() === PHP_SESSION_ACTIVE;
    }

    public function startSession() {
        //If the session is not already active, start it
        if (!$this->isActive()) {
            session_start();
            //Give the session a new ID
            $this->regenerateSessionID();
        }
    }
}