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
    public static final String SHAREDPREF_NAME = "user-details" ;
    SharedPreferences localDB ; // requires instantiation via a context from the activity its used in

    public UserLocalDatabase(Context context){
        localDB = context.getSharedPreferences(SHAREDPREF_NAME, Context.MODE_PRIVATE) ;
    }

    /*
     * Storing a user's data once logged in.
     */
    public void storeUserData(RegisteredUser user) {

        SharedPreferences.Editor editor = localDB.edit();
        editor.putInt("UserID",user.getUserID()) ;
        editor.putString("name", user.getName());
        editor.putString("surname", user.getSurname());
        editor.putString("surname", user.getUsername());
        editor.putString("email", user.getEmail());
        editor.putString("password", user.getPassword());
        editor.putInt("PersonalID",user.getIDnum());
        editor.putInt("contactNumber",user.getPhoneN());
        editor.putInt("userType",user.getUserType());
        editor.putInt("Confirmation",user.getConfirm());

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
        int userID = localDB.getInt("UserID", -1);
        int ID = localDB.getInt("PersonalID", -1);
        int phone = localDB.getInt("contactNumber", -1);
        int userType = localDB.getInt("userType",-1) ;
        int confirm = localDB.getInt("",-1) ;
        RegisteredUser storedUSer = new RegisteredUser(userID,name,surname,ID,username,email,phone,password,userType,confirm);

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

    public void setSessionVariables(int Userid, String Username, int UserType, int Confirmation){
        SharedPreferences.Editor editor = localDB.edit();
        editor.putInt("UserID", Userid);
        editor.putString("Username", Username);
        editor.putInt("UserType", UserType);
        editor.putInt("UserConfirmation", Confirmation);

    }

    public int getSessionUserID(){
        return localDB.getInt("UserID",-1);
    }
    public String getSessionUserUsername(){
        return localDB.getString("Username","");
    }
    public int getSessionUserType(){
        return localDB.getInt("UserType",-1);
    }
    public int getSessionUserConfirmation(){
        return localDB.getInt("UserConfirmation",-1);
    }

    public void clearSessionVariables(){

    }



}
