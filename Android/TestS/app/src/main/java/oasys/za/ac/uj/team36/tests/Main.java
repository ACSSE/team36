package oasys.za.ac.uj.team36.tests;


import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import oasys.za.ac.uj.team36.Model.*;


public class Main extends AppCompatActivity implements View.OnClickListener{

    private static final String DB_URL = "http://10.0.0.6:31335/php/classes/SebenzaServer.php" ;

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

                Response.Listener<String> responseL = new Response.Listener<String>(){
                    @Override
                    public void onResponse(String response) {
                        //response is from the php file
                        try {
                           // JSONObject jsonResponse = new JSONObject(response);
                            String s = response;
                           // boolean success = jsonResponse.getBoolean("successfulLogin") ;
                            if(s.equalsIgnoreCase("true")){
                                startActivity(new Intent(Main.this, HomeUser.class));
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
                RequestQueue q = Volley.newRequestQueue(Main.this) ;
                q.add(r) ;

                break ;

            case R.id.tvRegisterLink:
                AlertDialog.Builder dialog = new AlertDialog.Builder(Main.this) ;
                dialog.setTitle("Welcome") ;
                dialog.setMessage("What type of user would you Like to register as?") ;
                dialog.setPositiveButton("Home user",new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                       startActivity(new Intent(Main.this, registerHomeUser.class));

                    }

                });
                dialog.setNeutralButton("TradeWorker", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    startActivity(new Intent(Main.this, registerTradeWorker.class));
                }

            });
                dialog.show();
                //startActivity(new Intent(Main.this, registerHomeUser.class));

                break ;
        }

    }



    private void logIn(RegisteredUser user){
        localDB.setUserLoggedIn(true);
        localDB.storeUserData(user);
    }




}
