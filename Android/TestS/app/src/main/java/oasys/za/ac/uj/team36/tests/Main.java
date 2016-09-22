package oasys.za.ac.uj.team36.tests;


import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.HttpClientStack;
import com.android.volley.toolbox.HttpStack;

import org.apache.http.client.CookieStore;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONException;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.HashMap;
import java.util.Map;

import oasys.za.ac.uj.team36.Model.*;
import oasys.za.ac.uj.team36.Requests.MyRequest;
import oasys.za.ac.uj.team36.Requests.loginRequest;


public class Main extends AppCompatActivity implements View.OnClickListener{

    private static final String SERVER_ADDRESS_URL = "http://10.0.0.7:31335/php/classes/SebenzaServer.php" ;
    private Button bLogin ;
    private TextView tvRegisterLink, tvmain;
    private EditText etUsername ,etPassword ;
    private UserLocalDatabase DB ;
    private RegisteredUser user ;
    private String Name, Surname, Username, Email, Password;
    private int IDnum, PhoneN,confirm, userType, UserID;
    SharedPreferences pref ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        etUsername = (EditText) findViewById(R.id.etUsername) ;
        etPassword = (EditText) findViewById(R.id.etPassword);
        bLogin = (Button) findViewById(R.id.bLogin) ;
        tvRegisterLink = (TextView) findViewById(R.id.tvRegisterLink) ;
        tvmain = (TextView) findViewById(R.id.tvMain) ;

        bLogin.setOnClickListener(this);
        tvRegisterLink.setOnClickListener(this);
        tvmain.setOnClickListener(this);
        DB = new UserLocalDatabase(this) ;
        setFalseData();
    }

    @Override
    public void onClick(View v) {

        switch (v.getId())
        {
            case R.id.bLogin:
                loginR();
                setlogIn();
                break ;

            case R.id.tvRegisterLink:
                regLink();

                break ;
            case R.id.tvMain:
                String u = etUsername.getText().toString() ;
                if (u.startsWith("H")|| u.startsWith("h")){
                    startActivity(new Intent(Main.this, HomeUser.class));
                }else if(u.startsWith("T")|| u.startsWith("t")){
                    startActivity(new Intent(Main.this, TradeWorker.class));
                }else{
                    startActivity(new Intent(Main.this, TradeWorker.class));
                }

                break;
        }

    }

    private void setlogIn(){
        DB.setUserLoggedIn(true);
    }


    private void regLink(){
        AlertDialog.Builder dialog = new AlertDialog.Builder(Main.this) ;
        dialog.setTitle("Welcome") ;
        dialog.setMessage("What type of user would you Like to register as?") ;
        dialog.setPositiveButton("Home user",new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                startActivity(new Intent(Main.this, regHomeuser.class));

            }

        });
        dialog.setNeutralButton("TradeWorker", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                startActivity(new Intent(Main.this, regTradeworker.class));
            }

        });
        dialog.show();
        //startActivity(new Intent(Main.this, registerHomeUser.class));
    }

    private void loginR(){
        final String uName = etUsername.getText().toString() ;
        final String pass = etPassword.getText().toString() ;
        Response.Listener<String> responseL = new Response.Listener<String>(){
            @Override
            public void onResponse(String response) {
                //response is from the php file
                try {
                    String s = response;

                    if(s.equalsIgnoreCase("true")){
                        // fetch users details
                        int type = fetchDetails(uName);
                        //store user details
                        setSharePreference();
                        setSharePreference();
                        if (type == 2){
                            startActivity(new Intent(Main.this, HomeUser.class));
                        }
                        if(type == 0){
                            startActivity(new Intent(Main.this, TradeWorker.class));
                        }
                   /*     AlertDialog.Builder d = new AlertDialog.Builder(Main.this);
                        d.setMessage("User type: " + type);
                        d.setTitle("Type") ;
                        d.setNegativeButton("Retry", null) ;
                        d.create().show();*/
                    }else{
                        AlertDialog.Builder d = new AlertDialog.Builder(Main.this);
                        d.setMessage("Unsuccessful Login, Please try again : " + s);
                        d.setTitle("Error") ;
                        d.setNegativeButton("Retry", null) ;
                        d.create().show();
                    }
                }catch (Exception ex){
                    ex.printStackTrace();
                }
            }
        };
        loginRequest r = new loginRequest(uName, pass,responseL) ;
        MySingleton.getInsance(Main.this).addToRequestQueue(r);
    }

    // the following function will fetch all the users details from the DB
    // as wel as Store it in the shared preference file in UserLocalDatabase
    // It will also set the session variables
    // will return the users ID aswell for login purposes
    private int fetchDetails(String uName){

        Map<String,String> params = new HashMap<>();
        params.put("action","android-fetchUserDetails") ;
        params.put("android-username",uName);
        MyRequest req = new MyRequest(SERVER_ADDRESS_URL, params, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                try {
                    String s = response.toString();

                    Name =  response.getJSONObject(0).getString("Name");
                    confirm = response.getJSONObject(0).getInt("Confirmation");
                    PhoneN = response.getJSONObject(0).getInt("ContactNumber");
                    //(4) = user recomendation rating
                    Email = response.getJSONObject(0).getString("Email");
                    Password = response.getJSONObject(0).getString("Password");
                    IDnum = response.getJSONObject(0).getInt("PersonalID") ;
                    Username = response.getJSONObject(0).getString("Username");
                    userType = response.getJSONObject(0).getInt("TypeOfUser");
                    UserID = response.getJSONObject(0).getInt("UserID");
                    Surname = response.getJSONObject(0).getString("Surname");

                    //test to see if array is parsed correctly (__Working__)
                   /* String so = Name + " :\n " + confirm+ " :\n " + PhoneN + " :\n " + Email + " :\n "
                            + Password + " :\n " + IDnum + " :\n "  + Username +  " :\n" + userType +  " :\n"
                            + UserID+  " :\n"+ Surname;*/

                    //Set session variables here
                    //TODO: Set session variables local to the phone for use in the server

                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                String st = error.toString() ;
                AlertDialog.Builder d = new AlertDialog.Builder(Main.this);
                d.setMessage("Response : " + st.toString());
                d.setTitle("Your Error") ;
                d.setNegativeButton("Retry", null) ;
                d.create().show();
            }
        }) ;

        MySingleton.getInsance(Main.this).addToRequestQueue(req);
        return userType;
    }


    public void setSharePreference(){

        user = new RegisteredUser(UserID,Name,Surname,IDnum,Username,Email,PhoneN,Password,userType,confirm);
        DB.storeUserData(user);
/*        pref = getSharedPreferences("user-details", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = pref.edit();

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
        editor.commit();*/

        // test to see if works
      /*  RegisteredUser u = DB.getLoggedInUser() ;
        AlertDialog.Builder d = new AlertDialog.Builder(Main.this);
        d.setMessage("Response : " + u.getUsername() + "\n" + u.getUserID()+ "\n" + u.getSurname());
        d.setTitle("Your OK") ;
        d.setNegativeButton("Retry", null) ;
        d.create().show();*/
    }

    public void clearSharedPref(){
       DB.clearLocalDBdata();
    }

    public void setFalseData(){
        RegisteredUser u = new RegisteredUser(1,"n","s",-10,"as1","as1@mail.co.za",6,"dbyusgcwuy",-1,-1);
        DB.storeUserData(u);
    }

}
