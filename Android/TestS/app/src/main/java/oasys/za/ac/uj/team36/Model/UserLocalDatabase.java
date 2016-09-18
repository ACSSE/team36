package oasys.za.ac.uj.team36.Model;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * Created by Nick on 2016-07-27.
 * Student Number: 201325732
 */

/*
 * This class will allow for thw storing of a user locally on the phone. This is accomplished by
 * the use of a shared preference.
 */
public class UserLocalDatabase {
    public static final String SP_NAME = "user_details" ;
    SharedPreferences localDB ; // requires instantiation via a contrext from the activvity its used in

    public UserLocalDatabase(Context context){
        localDB = context.getSharedPreferences(SP_NAME, context.MODE_PRIVATE) ;
    }

    /*
     * Storing a user's data once logged in.
     */
    public void storeUserData(RegisteredUser user) {
        SharedPreferences.Editor editor = localDB.edit();
        editor.putString("name", user.getName());
        editor.putString("surname", user.getSurname());
        editor.putString("email", user.getEmail());
        editor.putString("password", user.getPassword());
        editor.putInt("ID",user.getIDnum());
        editor.putInt("phoneNumber",user.getPhoneN());
        editor.putInt("userType",user.getUserType());

        editor.commit();
    }

    /*
     * Gets the user who is currently logged in on the local Database which is stored on the phone.
     */
    public RegisteredUser getLoggedInUser(){
        String name = localDB.getString("name", "");
        String surname = localDB.getString("surname", "");
        String username = localDB.getString("username", "");
        String email = localDB.getString("email", "");
        String password =  localDB.getString("password", "");

        int ID = localDB.getInt("ID", -1);
        int phone = localDB.getInt("phone", -1);
        int userType = localDB.getInt("userTpe",0) ;
        boolean isAvailable = localDB.getBoolean("isAvailable", true);
        RegisteredUser storedUSer = new RegisteredUser(name,surname,ID,username,email,phone,password,userType);

        return storedUSer;
    }

    /*
     * Setting a user's login status, true if logged and false if logged out.
     */
    public void setUserLoggedIn(boolean isLoggedIn){
        SharedPreferences.Editor editor = localDB.edit();
        editor.putBoolean("isLoggedIn", isLoggedIn);
        editor.commit();

    }
    /*
     * The result will return if the user is logged in or not.
     */
    public boolean getUserLoggedIn() {
        boolean isOk = localDB.getBoolean("isLoggedIn", false) ;
        if(isOk){
            return true;
        }else
        {
            return false ;
        }

    }

    /*
     * Clearing a user's data once logout stage is reached.
     */
    public void clearLocalDBdata() {
        SharedPreferences.Editor editor = localDB.edit();
        editor.clear();
        editor.commit();
    }

}
