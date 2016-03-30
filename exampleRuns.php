<?php
/**
 * Created by PhpStorm.
 * User: Brandon Faul
 * Date: 2016/03/30
 * Time: 11:48 AM
 */
//do not ever run this file.
$server->fetchDatabaseHandler()->runCommand("UPDATE REGISTERED_USER SET Password=? WHERE UserID=?;",SebenzaServer::hashPassword("unhashedPassword1"),1);