<?php
/**
 * Created by PhpStorm
 * Date: 2016/02/15
 * Time: 1:16 AM
 */
class SebenzaHelper {
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