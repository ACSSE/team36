package oasys.za.ac.uj.team36.tests;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;

public class JobRequestsTradeWorker extends AppCompatActivity implements View.OnClickListener{
    private Button bResponse ;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_job_requests_trade_worker);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        bResponse = (Button) findViewById(R.id.bAcceptJobRequestTW);
        bResponse.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        switch (v.getId())
        {
            case R.id.bAcceptJobRequestTW:
                AlertDialog.Builder dialog = new AlertDialog.Builder(JobRequestsTradeWorker.this) ;
                dialog.setTitle("Job request response") ;
                dialog.setMessage("Would you like get the Job done?") ;
                dialog.setPositiveButton("YES",new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                       // startActivity(new Intent(JobRequestsTradeWorker.this, TradeWorker.class));

                    }

                });
                dialog.setNeutralButton("NO", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        //startActivity(new Intent(JobRequestsTradeWorker.this, TradeWorker.class));
                    }

                });
                dialog.show();
                break;
        }
    }
}
