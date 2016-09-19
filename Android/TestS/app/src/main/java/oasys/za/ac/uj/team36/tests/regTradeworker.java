package oasys.za.ac.uj.team36.tests;

import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
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

public class regTradeworker extends AppCompatActivity implements View.OnClickListener {

    Button bRegisterTrade;

    EditText etUsername ,etPassword, etEmail, etPhone, etName, etSurname,etID ;
    EditText strnumber, strname, subarea, area,province ;
    EditText skilset ;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reg_tradeworker);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // User details
        etName = (EditText) findViewById(R.id.etName) ;
        etSurname = (EditText) findViewById(R.id.etSurname) ;
        etUsername = (EditText) findViewById(R.id.etUsername) ;
        etID = (EditText) findViewById(R.id.etID) ;
        etEmail = (EditText) findViewById(R.id.etEmail) ;
        etPhone = (EditText) findViewById(R.id.etPhone) ;
        etPassword = (EditText) findViewById(R.id.etUsername) ;

        // location details
        strnumber = (EditText) findViewById(R.id.etsNumHU) ;
        strname = (EditText) findViewById(R.id.etsNameHU) ;
        subarea = (EditText) findViewById(R.id.etSubLocalHU) ;
        area = (EditText) findViewById(R.id.etLocalHU) ;
        province = (EditText) findViewById(R.id.etAdminAreaHU) ;

        // Skill set
        skilset = (EditText) findViewById(R.id.etSkill) ;

        bRegisterTrade = (Button) findViewById(R.id.bRegisterTradeWorker) ;
        bRegisterTrade.setOnClickListener(this);
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
                                startActivity(new Intent(regTradeworker.this, TradeWorker.class));
                            }else{
                                AlertDialog.Builder d = new AlertDialog.Builder(regTradeworker.this);
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
                RequestQueue q = Volley.newRequestQueue(regTradeworker.this) ;
                //  q.add(r) ;
        }
    }
}
