package oasys.za.ac.uj.team36.tests;


import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;

import oasys.za.ac.uj.team36.Model.*;


public class Main extends AppCompatActivity implements View.OnClickListener{


    JsonParser JP = new JsonParser() ;
    private static final String DB_URL = "http://10.0.0.6:31335/php/classes/SebenzaServer.php" ;
    private static final String Tag_Sucess = "SUCESS" ;

    public static final int TIMEOUT = 1000 * 15 ;
    Button bLogin ;
    TextView tvRegisterLink ;
    EditText etUsername ,etPassword ;
    UserLocalDatabase localDB ;
    RegisteredUser user ;

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

        bLogin.setOnClickListener(this);
        tvRegisterLink.setOnClickListener(this);

        localDB = new UserLocalDatabase(this) ;
    }

    @Override
    public void onClick(View v) {

        switch (v.getId())
        {
            case R.id.bLogin:

                String uName = etUsername.getText().toString() ;
                String pass = etPassword.getText().toString() ;

                user = new RegisteredUser(uName, pass);

                // authentication to happen here
                //authenticate(user) ;
                ServerHandler s = new ServerHandler(this) ;
               String a = s.login(user);

                if(a.length()<0){

                    AlertDialog.Builder dialog = new AlertDialog.Builder(Main.this) ;
                    dialog.setTitle("Welcome") ;
                    dialog.setMessage("You are now Logged in") ;
                    dialog.setPositiveButton("OK",null);
                    dialog.show();
                    startActivity(new Intent(this, HomeUser.class));

                }else
                {
                    AlertDialog.Builder dialog = new AlertDialog.Builder(Main.this) ;
                    dialog.setTitle("Sorry") ;
                    dialog.setMessage(s.response) ;
                    dialog.setPositiveButton("OK",null);
                    dialog.show();
                }

                //startActivity(new Intent(this, HomeUser.class ));
                break ;

            case R.id.tvRegisterLink:
                startActivity(new Intent(this, HomeUser.class ));
                break ;
        }

    }

    private void authenticate(RegisteredUser user)
    {

 /*       ServerHandler serv = new ServerHandler(this);
        serv.fetchUserDataAsync(user,new GetUserCallback(){
            @Override
            public void finished(RegisteredUser user) {
                if(user == null)
                {
                    showErrorDialog("Invalid details") ;
                }
            }
        });*/
        showErrorDialog("Invalid details") ;
    }

    private void showErrorDialog(String message)
    {
        AlertDialog.Builder dialog = new AlertDialog.Builder(Main.this) ;
        dialog.setTitle("Whoops!") ;
        dialog.setMessage(message) ;
        dialog.setPositiveButton("OK",null);
        dialog.show();
    }

    private void logIn(RegisteredUser user){
        localDB.setUserLoggedIn(true);
        localDB.storeUserData(user);
    }




}
