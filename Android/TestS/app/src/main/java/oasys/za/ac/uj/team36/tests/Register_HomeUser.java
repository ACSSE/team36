package oasys.za.ac.uj.team36.tests;

import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import oasys.za.ac.uj.team36.Model.Home_User;
import oasys.za.ac.uj.team36.Model.RegisteredUser;
import oasys.za.ac.uj.team36.Model.ServerHandler;
import oasys.za.ac.uj.team36.Model.registerRequest;

public class Register_HomeUser extends AppCompatActivity implements View.OnClickListener{

    private static final String DB_URL = "http://10.0.0.6:31335/php/classes/SebenzaServer.php" ;
    Button bRegisterHomeUser;

    EditText etUsername ,etPassword, etEmail, etPhone, etName, etSurname,etID ;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register__home_user);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        etName = (EditText) findViewById(R.id.etName) ;
        etSurname = (EditText) findViewById(R.id.etSurname) ;
        etUsername = (EditText) findViewById(R.id.etUsername) ;
        etID = (EditText) findViewById(R.id.etID) ;
        etEmail = (EditText) findViewById(R.id.etEmail) ;
        etPhone = (EditText) findViewById(R.id.etPhone) ;
        etPassword = (EditText) findViewById(R.id.etUsername) ;
        bRegisterHomeUser = (Button) findViewById(R.id.bRegisterHomeUser) ;
        bRegisterHomeUser.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        switch (v.getId())
        {
            case R.id.bRegisterHomeUser:
                Response.Listener<String> responseL = new Response.Listener<String>(){
                    @Override
                    public void onResponse(String response) {
                    //response is from the php file
                        try {
                            JSONObject jsonResponse = new JSONObject(response);

                            boolean success = jsonResponse.getBoolean("") ;
                            if(success){
                                startActivity(new Intent(Register_HomeUser.this, Home_User.class));
                            }else{
                                AlertDialog.Builder d = new AlertDialog.Builder(Register_HomeUser.this);
                                d.setMessage("Unsuccessful Registration, Please try again");
                                d.setTitle("Error") ;
                                d.setNegativeButton("Retry", null) ;
                                d.create().show();
                            }
                        }catch (JSONException ex){
                            ex.printStackTrace();
                        }
                    }
                };
            //registerRequest r = new registerRequest(name,surname, username, id,phone, email, password) ;
                RequestQueue q = Volley.newRequestQueue(Register_HomeUser.this) ;
              //  q.add(r) ;
        }
    }


}
