package oasys.za.ac.uj.team36.tests;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;

import oasys.za.ac.uj.team36.Model.Home_User;

public class Register_HomeUser extends AppCompatActivity implements View.OnClickListener{

    Button bRegisterHomeUser;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register__home_user);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        bRegisterHomeUser = (Button) findViewById(R.id.bRegisterHomeUser) ;
        bRegisterHomeUser.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        switch (v.getId())
        {
            case R.id.bRegisterHomeUser:
                startActivity(new Intent(this, Home_User.class));
        }
    }


}
