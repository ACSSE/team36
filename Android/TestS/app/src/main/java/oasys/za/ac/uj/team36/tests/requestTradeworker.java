package oasys.za.ac.uj.team36.tests;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import oasys.za.ac.uj.team36.Model.RegisteredUser;
import oasys.za.ac.uj.team36.Model.UserLocalDatabase;
import oasys.za.ac.uj.team36.Requests.MyRequestString;

public class requestTradeworker extends AppCompatActivity implements View.OnClickListener{
    private DatePicker datePicker;
    private Calendar calendar;
    private TextView dateView;
    private int year, month, day;
    private Button setDate ;
    private String  workType,description ,Road, subLocation, location, adminArea, country;
    private int numWorkers,  Street , postalC;
    private String errors = "";
    private static final String SERVER_ADDRESS_URL = "http://10.0.0.4:31335/php/classes/SebenzaServer.php" ;
    private UserLocalDatabase DB ;
    private int utype, uID;
    // for job commencement date
    private Calendar comenceDate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_request_tradeworker);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setDate = (Button) findViewById(R.id.bsetDate) ;
        setDate.setOnClickListener(this);
        dateView = (TextView) findViewById(R.id.textView3);
        calendar = Calendar.getInstance();
        year = calendar.get(Calendar.YEAR);

        month = calendar.get(Calendar.MONTH);
        day = calendar.get(Calendar.DAY_OF_MONTH);
        showDate(year, month+1, day);
        DB = new UserLocalDatabase(this) ;

        fetchUser();
    }

    @SuppressWarnings("deprecation")
    public void setDate() {
        showDialog(999);
        Toast.makeText(getApplicationContext(), "ca", Toast.LENGTH_SHORT)
                .show();
    }

    @Override
    protected Dialog onCreateDialog(int id) {
        // TODO Auto-generated method stub
        if (id == 999) {
            return new DatePickerDialog(this, myDateListener, year, month, day);
        }
        return null;
    }

    private DatePickerDialog.OnDateSetListener myDateListener = new DatePickerDialog.OnDateSetListener() {
        @Override
        public void onDateSet(DatePicker arg0, int arg1, int arg2, int arg3) {
            // TODO Auto-generated method stub
            // arg1 = year
            // arg2 = month
            // arg3 = day
            showDate(arg1, arg2+1, arg3);
        }
    };

    private void showDate(int year, int month, int day) {
        //dateView.setText(new StringBuilder().append(day).append("/")
            //    .append(month).append("/").append(year));
       // comenceDate.set(year,month,day);
    }
    @Override
    public void onClick(View v) {

        switch (v.getId()){
            case R.id.bRequestWorker:
                RequestWorker() ;
                break ;
            case R.id.bsetDate:
                setDate();
                break;
        }
    }

    // fetching user from shared preference
    public void fetchUser(){
        //pref = getSharedPreferences("user-details", Context.MODE_PRIVATE);
        RegisteredUser u = DB.getLoggedInUser() ;
        uID = u.getUserID();
        utype = u.getUserType();
    }

    public void RequestWorker(){
        //get the users input for job details and validate its set correctly
        if(fetchUserJobDetails()) {

            Map<String, String> params = new HashMap<>();
            params.put("action", "android-homeuser-rTradeworker");
            params.put("android-UserID", uID + "");
            params.put("ignore-actual-nTradeworkers-homeuser-rTradeworker", numWorkers + "");

            for(int i = 0; i < numWorkers; i++) {
                params.put("homeuser-rTradeworker-work-type-"+ i, workType);
                params.put("nTradeworkers-homeuser-rTradeworker-"+ i, i + "");
                params.put("job-description-homeuser-rTradeworker-"+ i, description);
            }

            params.put("commencement-homeuser-rTradeworker", "");
            params.put("homeuser-rTradeworker-street_number", Street + "");
            params.put("homeuser-rTradeworker-route", Road);
            params.put("homeuser-rTradeworker-sublocality_level_1", subLocation);
            params.put("homeuser-rTradeworker-locality", location);
            params.put("homeuser-rTradeworker-administrative_area_level_1", adminArea);
            params.put("homeuser-rTradeworker-postal_code", postalC + "");
            params.put("homeuser-rTradeworker-country", country);


            MyRequestString request = new MyRequestString(SERVER_ADDRESS_URL, params, new Response.Listener<String>() {
                @Override
                public void onResponse(String response) {

                    if (response.equalsIgnoreCase("true")) {
                        AlertDialog.Builder d = new AlertDialog.Builder(requestTradeworker.this);
                        d.setMessage("Job request has been sent, please await a trade workers response" +
                                "\nOnce a worker has responded you will be notified");
                        d.setTitle("Job Request") ;
                        d.setNeutralButton("OK", null) ;
                        d.create().show();
                    } else {
                        AlertDialog.Builder d = new AlertDialog.Builder(requestTradeworker.this);
                        d.setMessage("Your Request could not be sent, please try again" +
                        "\n*If you continue to receive this error, try Signing out and signing back in again");
                        d.setTitle("Request Failed") ;
                        d.setNeutralButton("Retry", null) ;
                        d.create().show();
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    // notify user to try again
                }
            });
        }else{
            // not allowing to request fields are not filled correctly
            AlertDialog.Builder d = new AlertDialog.Builder(requestTradeworker.this);
            d.setMessage(errors);
            d.setTitle("Invalid Job Specifications") ;
            d.setNegativeButton("Retry", null) ;
            d.create().show();
        }

    }

    public Boolean fetchUserJobDetails(){
        EditText worktype, descrip, numWorkers, Street, Road, subLocation, location, adminArea, postalC, country;

        // obtain input from edit texts
        worktype = (EditText) findViewById(R.id.etType) ;
        descrip =  (EditText) findViewById(R.id.etDecription) ;
        numWorkers = (EditText) findViewById(R.id.etnWorkers) ;
        Street = (EditText) findViewById(R.id.etsNumHU) ;
        Road = (EditText) findViewById(R.id.etsNameHU) ;
        subLocation = (EditText) findViewById(R.id.etSubLocalHU) ;
        location = (EditText) findViewById(R.id.etLocalHU) ;
        adminArea = (EditText) findViewById(R.id.etAdminAreaHU) ;
        postalC = (EditText) findViewById(R.id.etPostalHU) ;
        country= (EditText) findViewById(R.id.etCountryHU) ;

        //perform validation on the users input
        this.workType = worktype.getText().toString() ;
        this.description = descrip.getText().toString() ;
        this.numWorkers = Integer.parseInt(numWorkers.getText().toString()) ;
        this.Street = Integer.parseInt(Street.getText().toString()) ;
        this.Road = Road.getText().toString() ;
        this.subLocation = subLocation.getText().toString() ;
        this.location = location.getText().toString() ;
        this.adminArea = adminArea.getText().toString() ;
        this.postalC = Integer.parseInt(postalC.getText().toString()) ;
        this.country = "South Africa" ;

            boolean condition = true ; // for error checking to perform a request

        // perform validation
        if(this.comenceDate != null){
            errors+= "\nPlease enter a date you would like the job to be done" ;
            condition = false ;
        }
        if (this.numWorkers <= 0){
            errors+= "\nNumber of workers can't be smaller than 0, or 0" ;
            condition = false ;
        } if(this.workType.isEmpty()){
            errors+= "\nPlease enter a Work type eg. Brick-Layer" ;
            condition = false ;
        } if(this.description.isEmpty()){
            errors+= "\nPlease enter a description of the job" ;
            condition = false ;
        } if(this.Street <= 0){
            errors+= "\nStreet number can't be smaller than 0, or 0" ;
            condition = false ;
        } if(this.Road.isEmpty()){
            errors+= "\nPlease enter a Street name e.g 15th Avenue" ;
            condition = false ;
        } if(this.subLocation.isEmpty()){
            errors+= "\nPlease enter a valid Sub-Area e.g Orlando" ;
            condition = false ;
        } if(this.location.isEmpty()){
            errors+= "\nPlease enter a valid Area e.g Soweto" ;
            condition = false ;
        } if(this.adminArea.isEmpty()){
            errors+= "\nPlease enter a valid Province e.g Gauteng" ;
            condition = false ;
        } if(this.postalC == 0 ){
            errors+= "\nPostal Code can't be 0, or less than 0 e.g 1702" ;
            condition = false ;
        }

        // whether or not a request can be done
        if(condition){
            return true ;
        }else{
            return false;

        }

    }

}
