<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/02/14
 * Time: 8:31 PM
 * Author: 215022652
 * References: php.net/manual
 */

/**
 * Class ServerSessionDatabaseHandler
 *
 * This class handles the connection to a database and running any command on the database server. The database language
 * is MySQL, the implementation is MariaDB's and the engine selected by default is InnoDB.
 */
class ServerSessionDatabaseHandler {
    private $dbHost = null;             //URL of database server
    private $dbUser = null;             //Database user
    private $dbUserPassword = null;     //User's password
    private $dbName = null;             //Database name
    private $commandResults = null;
    private $errors = null;
    private $insertID = null;
    private $numRowsAffected = null;

    /**
     * ServerSessionDatabaseHandler constructor.
     *
     * This constructor sets the settings needed to connect to the MariaDB database.
     *
     * Example: $dbHandler = new ServerSessionDatabaseHandler("localhost","root","Sebenza","SebenzaSA_Database");
     *
     * @param $dbHost string The address where the database server can be found.
     * @param $dbUser string The name of the user with access rights to the database.
     * @param $dbUserPassword string The password of the aforementioned user.
     * @param $dbName string The name of the database on the server.
     */
    function __construct($dbHost, $dbUser, $dbUserPassword, $dbName) {
        $this->setConnectionSettings($dbHost, $dbUser, $dbUserPassword, $dbName);
    }

    /**
     * Sets the relevant settings for creating a new connection. By default this is a helper function for the
     * constructor, but can be used to change the connection settings during a session.
     *
     * Example: $dbHandler->setConnectionSettings("localhost","root","Sebenza","SebenzaSA_Database");
     *
     * @param $dbHost string The address where the database server can be found.
     * @param $dbUser string The name of the user with access rights to the database.
     * @param $dbUserPassword string The password of the aforementioned user.
     * @param $dbName string The name of the database on the server.
     */
    function setConnectionSettings($dbHost, $dbUser, $dbUserPassword, $dbName) {
        //Check that all the arguments are of the right type
        if (is_string($dbHost) && is_string($dbUser) && is_string($dbUserPassword) && is_string($dbName)) {
            //Set the instance properties
            $this->dbHost = $dbHost;
            $this->dbUser = $dbUser;
            $this->dbUserPassword = $dbUserPassword;
            $this->dbName = $dbName;
            //Reset the relevant fields
            $this->resetErrors();
            $this->resetResults();
            $this->setInsertID(0);
            $this->setNumRowsAffected(0);
        } else {
            $this->addError("The arguments passed to setConnectionSettings must be of type string.");
        }
    }

    /**
     * Sets the value of this instance's insertID.
     *
     * @param $id int The ID to set insertID to. Must be an integer.
     */
    private function setInsertID($id) {
        if (is_integer($id)) {
            $this->insertID = $id;
        }
    }

    /**
     * @return int The ID of the last insert, 0 if not applicable.
     */
    function getInsertID(): int {
        return $this->insertID;
    }

    /**
     * Sets the numRowsAffected. Must be an integer.
     *
     * @param $numRows int The number of rows affected by the last command.
     */
    private function setNumRowsAffected($numRows) {
        if (is_integer($numRows)) {
            $this->numRowsAffected = $numRows;
        }
    }

    /**
     * @return int The insertID relating to the last insert, 0 if not applicable.
     */
    function getAffectedRowCount(): int {
        return $this->numRowsAffected;
    }

    /**
     * Resets the error array.
     */
    private function resetErrors() {
        $this->errors = array();
    }

    /**
     * Adds an error message to the errors array associated with this instance.
     *
     * Example: $dbHandler->addError("Could not connect to database");
     *
     * @param $errorMessage string The error message to be added to the errors array.
     */
    private function addError($errorMessage) {
        //Check the error message is of type string
        if (is_string($errorMessage)) {
            $this->errors[] = $errorMessage;
        }
    }

    /**
     * @return array The array of errors associated with this connection to the database.
     */
    function getErrors(): array {
        return $this->errors;
    }

    /**
     * Resets the results array.
     */
    private function resetResults() {
        $this->commandResults = array();
    }

    /**
     * Adds a result to the results array.
     *
     * @param $result array The result to add to the results array.
     */
    private function addResult($result) {
        //Adds a result to the results array
        $this->commandResults[] = $result;
    }

    /**
     * Fetches the array of results relating to the last command executed by this database connection.
     *
     * @return array The array of results relating to the last command that was run by this instance.
     */
    function getResults(): array {
        return $this->commandResults;
    }

    /**
     * Returns a JSON string representation of the results relating to the last command.
     *
     * @return string The json string of the results from the last command.
     */
    function getResultsInJSON(): string {
        return json_encode($this->getResults());
    }

    /**
     * Connects to the database and runs the specified command. Only a single command can be run per call. Commands
     * should not be terminated with ';'. When a command needs variables inserted into the string, '?' should be used
     * as a placeholder for the relevant variable, and the variable(s) should be passed as additional parameters to the
     * function - this is to avoid SQL injections. If this function returns false, the reason can be obtained by using
     * the getErrors() function, and finding the reason corresponding to the command in the array of errors.
     *
     * Example of use: $result = $dbHandlerVariable->runCommand("INSERT INTO `STUDENT` VALUES (?,?)",'123456789','Bob');
     *
     * @param $command string The command that should be executed by the database server.
     * @param array ...$parameters The extra variables that need to be inserted into the command.
     * @return bool True if the command executed. False if failure to execute, or if no results were returned by SELECT.
     */
    function runCommand($command, ...$parameters): bool {
        $this->resetResults();
        $this->setInsertID(0);
        $this->setNumRowsAffected(0);

        //Assume failure, result = false
        $returnValue = false;
        if (is_string($command)) {
            //Connect to the MySQL database
            $connection = new mysqli($this->dbHost, $this->dbUser, $this->dbUserPassword, $this->dbName);

            //If the connection fails
            if ($connection->connect_error) {
                //Add the connect error to the errors array
                $this->addError($this->dbName.":".$command."->".$connection->connect_error);
            } else {
                //Remove leading and trailing whitespaces from the command
                trim($command);

                //Check if the command is supported by this module
                /* NOTE on php regular expression used below
                 * ` is used in this case as a delimiter to indicate a regular expression
                 * \b is used to indicate word boundary characters
                 * i is used to allow case-insensitive matching
                 * ^ indicates the start of the string
                 */
                if (preg_match("`^(create)\b|^(delete)\b|^(drop)\b|^(insert)\b|^(select)\b|^(update)\b`i", $command)) {
                    //Prepare the command for execution
                    if ($preparedCommand = $connection->prepare($command)) {
                        //Create a parameter string if parameters were passed
                        if (count($parameters)) {
                            $parameterString = self::generateParameterString(...$parameters);
                            if (!empty($parameterString)) {
                                //Bind the parameter string to the prepared command, add error if appropriate
                                if (!$preparedCommand->bind_param($parameterString, ...$parameters)) {
                                    $this->addError($this->dbName.":".$command."->".$preparedCommand->error);
                                }
                            } else {
                                $this->addError($this->dbName.":".$command."->"."Could not generate the appropriate parameter string.");
                            }
                        }

                        //Execute the prepared command, add error if failure to execute
                        if ($preparedCommand->execute()) {
                            $returnValue = true;
                            //The result part of the array differs according to the type of command
                            $commandType = explode(" ",$command);
                            switch (strtolower($commandType[0])) {
                                case "create":
                                    break;
                                case "delete":
                                    //Add the number of rows deleted
                                    $this->setNumRowsAffected($preparedCommand->affected_rows);
                                    break;
                                case "drop":
                                    break;
                                case "insert":
                                    //For inserts into an entity using an autoincrement field, add the insert id
                                    $this->setInsertID($preparedCommand->insert_id);
                                    $this->setNumRowsAffected($preparedCommand->affected_rows);
                                    break;
                                case "update":
                                    //Add the number of rows updated
                                    $this->setNumRowsAffected($preparedCommand->affected_rows);
                                    break;
                                case "select":
                                    //If no results are returned from the select command, commandResult = false
                                    if ($response = $preparedCommand->get_result()) {
                                        //Add all the returned entity instances
                                        while ($returnedInstance = $response->fetch_array(MYSQLI_ASSOC)) {
                                            $this->addResult($returnedInstance);
                                        }
                                    } else {
                                        $returnValue = false;
                                        $this->addError($this->dbName.":".$command."->"."No results matched the select statement.");
                                    }
                                    break;
                                default:
                                    $this->addError($this->dbName.":".$command."->"."Results for this type of command not catered for.");
                                    break;
                            }
                        } else {
                            $this->addError($this->dbName.":".$command."->".$preparedCommand->error);
                        }

                        //Close the connection and release the command object
                        $preparedCommand->close();
                        $connection->close();
                    } else {
                        $this->addError($this->dbName.":".$command."->".$connection->error);
                    }
                } else {
                    $this->addError($this->dbName.":".$command."->"."This type of command is not supported.");
                }
            }
        } else {
            $this->addError($this->dbName.":".$command."->"."The command was not passed as a string.");
        }
        return $returnValue;
    }

    /**
     * Generates the string used in SQL commands to determine the type of '?' placeholders. Dates are strings in php.
     * If an element in the set of parameters is not supported or recognised, the function will return the empty string.
     *
     * @param array ...$parameterSet The set of parameters to convert into the parameter string.
     * @return string The parameter string for use with the bind_param() function.
     */
    private static function generateParameterString(...$parameterSet): string {
        //Start with the empty string, assume generating will not fail
        $parameterString = "";
        $failed = false;
        //Assure that $parameterSet is not null and not empty
        if (isset($parameterSet) && !empty($parameterSet)) {
            //Build the command string
            foreach ($parameterSet as $parameter) {
                //Depending on the type in the set, add 'd','i' or 's' respectively
                switch (gettype($parameter)) {
                    case "double":
                        $parameterString .= "d";
                        break;
                    case "integer":
                        $parameterString .= "i";
                        break;
                    case "string":
                        //Dates default to strings in this implementation and according to php's requirements
                        $parameterString .= "s";
                        break;
                    default:
                        $failed = true;
                        break;
                }
            }
            if ($failed) {
                //Reset the string to empty, for use with the runCommand function
                $parameterString = "";
            }
        }
        return $parameterString;
    }
}