package oasys.za.ac.uj.team36.tests;

import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.toolbox.HttpClientStack;
import com.android.volley.toolbox.HttpStack;
import com.android.volley.toolbox.Volley;

import org.apache.http.client.CookieStore;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONObject;


import oasys.za.ac.uj.team36.Requests.fetchJobRequests;

public class JobRequestsTradeWorker extends AppCompatActivity implements View.OnClickListener{
    private HttpStack httpStack = null;
    private CookieStore cookieStore = null;
    private DefaultHttpClient httpclient = null;
    private Button bResponse ;
    private LinearLayout L;
    private TextView date,descrip, wtype, location,area,prov;
    private boolean isRequests = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_job_requests_trade_worker);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        httpclient = new DefaultHttpClient();
        cookieStore = new BasicCookieStore();
        httpclient.setCookieStore( cookieStore );
        httpStack = new HttpClientStack( httpclient );

        L = (LinearLayout) findViewById(R.id.Deets)  ;
        Boolean isR = fetchRequests();
        if(isR){
            bResponse = (Button) findViewById(R.id.bAcceptJobRequestTW);
            bResponse.setOnClickListener(this);
        }else
        {            // set layout deets to not display as there is no requests to display
            //L.setVisibility(View.GONE);
        }
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

    public boolean fetchRequests(){

        Response.Listener<String> responseL = new Response.Listener<String>(){
            @Override
            public void onResponse(String response) {
                //response is from the php file
                isRequests = true ;
                try {
                    JSONObject j = new JSONObject(response) ;
                    if(j.length() > 0){
                        isRequests = true ;
                        JSONArray jArray = j.getJSONArray("Array");


                        for(int i = 0; i < jArray.length(); i++){

                            JSONObject jOb = jArray.getJSONObject(i);
                            int s = jOb.getInt("Status");
                            String Date = jOb.getString("JobCommencementDate") ;
                            date = (TextView) findViewById(R.id.tvDate) ;
                            date.setText(Date.toString());
                            String description = jOb.getString("JobDescription") ;
                            descrip = (TextView) findViewById(R.id.tvDecription) ;
                            descrip.setText(description.toString());
                            String wType = jOb.getString("WorkType");
                            wtype = (TextView) findViewById(R.id.tvType) ;
                            wtype.setText(wType.toString());
                            String Area = jOb.getString("StatusAreaName");
                            area = (TextView) findViewById(R.id.tvArea) ;
                            area.setText(Area.toString());
                            String province = jOb.getString("Province");
                            prov = (TextView) findViewById(R.id.tvProv) ;
                            prov.setText(province.toString());
                            String locationName = jOb.getString("locationName");
                            location = (TextView) findViewById(R.id.tvLocation) ;
                            location.setText(locationName.toString());

                        }
                    }else{
                        isRequests = false;
                    }

                }catch (Exception ex){
                    ex.printStackTrace();
                    isRequests = false;
                }
            }

        };

        fetchJobRequests r = new fetchJobRequests(responseL) ;
        RequestQueue q = Volley.newRequestQueue(this,httpStack ) ;
        q.add(r) ;
        return isRequests;
    }



}
