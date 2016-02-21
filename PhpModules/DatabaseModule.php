<?php
/**
 * Created by PhpStorm.
 * User: richard
 * Date: 2016/02/14
 * Time: 8:31 PM
 * Author: 215022652
 * References: php.net/manual
 */
/* TODO
    Commenting (rework format for automatic documentation generation)
    Implement log
*/
class ServerSessionDatabaseHandler {
    private $dbHost = null;             //URL of database server
    private $dbUser = null;             //Database user
    private $dbUserPassword = null;     //User's password
    private $dbName = null;             //Database name
    private $errors = null;             //Collection of errors relating to the instance

    /*
     * Create a new instance of a database handler.
     *
     * Example: $varName = new ServerSessionDatabaseHandler("localhost","username","password","SebenzaSA_Database");
     *
     * Author: 215022652
     */
    function __construct($dbHost, $dbUser, $dbUserPassword, $dbName) {
        //TODO log constructing instance
        $this->setConnectionSettings($dbHost, $dbUser, $dbUserPassword, $dbName);
    }

    /*
     * Set the relevant settings for creating a connection. By default this is only used by the constructor, but can
     * be used to change the connection settings during a session.
     *
     * Example: $dbHandlerVar->setConnectionSettings("localhost","username","password","SebenzaSA_Database");
     *
     * Author: 215022652
     */
    function setConnectionSettings($dbHost, $dbUser, $dbUserPassword, $dbName) {
        //TODO log setting settings
        if (is_string($dbHost) && is_string($dbUser) && is_string($dbUserPassword) && is_string($dbName)) {
            //Set the instance properties
            $this->dbHost = $dbHost;
            $this->dbUser = $dbUser;
            $this->dbUserPassword = $dbUserPassword;
            $this->dbName = $dbName;
            //Create an empty error array
            $this->errors = array();
            //TODO Database parameters set message
        } else {
            //TODO Arguments of invalid type message
        }
    }

    /*
     * Connect to the database and run the relevant command. This function will return data where relevant,
     * number of affected rows and the id last inserted on insert commands passed to a auto-incrementing entity. False
     * indicates failure, or lack of results on select statements.
     *
     * Example: $dbHandlerVar->runCommand("INSERT INTO `STUDENT` VALUES (?,?)",'123456789','Bob');
     * NOTE: DO NOT USE ; TO TERMINATE THE SQL COMMAND
     *
     * Author: 215022652
     */
    function runCommand($command, ...$parameters) {
        //TODO log running command: "command" with parameters "parameters"
        //Assume failure
        $returnValue = false;
        if (is_string($command)) {
            //Connect to the MySQL database
            $connection = new mysqli($this->dbHost, $this->dbUser, $this->dbUserPassword, $this->dbName);

            //If the connection fails, report in browser and end execution
            //TODO consider handling an exception instead, when time allows
            if ($connection->connect_error) {
                die("Could not connect to the database '".$this->dbName."'': " . $connection->connect_error);
            } else {
                //TODO log connection success
            }

            //Remove leading and trailing whitespaces
            trim($command);

            // If the command is of the type we expect and support (safety) - amend to add support where needed
            // ` is used in this case as a delimiter to indicate a regular expression
            // \b is used to indicate word boundary characters and i is used to allow case-insensitive matching
            // ^ indicates the start of the string to match
            if (preg_match("`^(create)\b|^(delete)\b|^(drop)\b|^(insert)\b|^(select)\b|^(update)\b`i", $command)) {
                //Prepare the command for execution
                if ($preparedCommand = $connection->prepare($command)) {
                    //Create a parameter string if parameters were passed
                    if (count($parameters)) {
                        if ($parameterString = self::generateParameterString(...$parameters)) {
                            //TODO log success + $parameterString + $parameters
                            //Bind the parameter string to the prepared command
                            if ($preparedCommand->bind_param($parameterString, ...$parameters)) {
                                //TODO log success
                            } else {
                                $this->errors[] = $preparedCommand->error;
                                //TODO log failure
                            }
                        } else {
                            $this->errors[] = "Could not generate the appropriate parameter string.";
                            //TODO log failure
                        }
                    }

                    //Execute the prepared command
                    if ($preparedCommand->execute()) {
                        //TODO convert stub below to switch on first word in command
                        //The return type changes depending on the command
                        $commandType = explode(" ",$command);
                        switch (strtolower($commandType[0])) {
                            //TODO create and delete should maybe rather return text indicating success
                            case "create":
                            case "delete":
                            case "drop":
                            case "insert":
                            case "update":
                                //In the case of the above commands, the number of affected rows will be returned
                                //Insert commands will result in the insert_id indicating which autoincrement id value
                                //was used last
                                $returnValue = array($preparedCommand->affected_rows, $preparedCommand->insert_id);
                                break;
                            case "select":
                                //Collect the results from executing a select statement, the return value will be false
                                //if no results were returned
                                if ($response = $preparedCommand->get_result()) {
                                    //TODO log select statement + successful
                                    //Collect all the returned instances in an array
                                    $returnValue = array();
                                    while ($returnedInstance = $response->fetch_array(MYSQLI_ASSOC)) {
                                        $returnValue[] = $returnedInstance;
                                    }
                                } else {
                                    //TODO log no results
                                }
                                break;
                            default:
                                //TODO log command not supported + command
                                break;
                        }
                    } else {
                        $this->errors[] = $preparedCommand->error;
                        //TODO log failure
                    }

                    //Close the connection and release the command object
                    $preparedCommand->close();
                    $connection->close();
                } else {
                    $this->errors[] = $connection->error;
                    //TODO log command could not be prepared + command
                }
            } else {
                //TODO log command not supported + command
            }
        } else {
            //TODO log command not of type string
        }
        return $returnValue;
    }

    /*
     * Returns any errors that occurred due to the sql connection or sql commands in the order that they occurred,
     * stored in an array.
     *
     * Example: $dbHandlerVar->getErrors();
     *
     * Author: 215022652
     */
    function getErrors() {
        return $this->errors;
    }

    /*
     * Generates the string used in SQL commands to determine the type of a '?' placeholder. Dates are considered strings.
     * If an element in the set of parameters is not supported or recognised, the function will return false.
     *
     * Author: 215022652
     */
    private static function generateParameterString(...$parameterSet) {
        //TODO log
        //Assume no string could be constructed
        $parameterString = false;
        //Assure that $parameterSet is not null and not empty
        if (isset($parameterSet) && !empty($parameterSet)) {
            $parameterString = "";
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
                        //TODO log failure to generate, log string representation of parameter set
                        $parameterString = false;
                        break;
                }
            }
        } else {
            //TODO log that the parameter set was either null or empty
        }
        //TODO log successful completion + parameter string
        return $parameterString;
    }
}
?>