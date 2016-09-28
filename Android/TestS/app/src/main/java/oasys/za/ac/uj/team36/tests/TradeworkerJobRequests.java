package oasys.za.ac.uj.team36.tests;

import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Response;
import com.android.volley.VolleyError;

import oasys.za.ac.uj.team36.Requests.MyRequestString;
import org.json.JSONArray;

import java.util.HashMap;
import java.util.Map;

import oasys.za.ac.uj.team36.Model.MySingleton;
import oasys.za.ac.uj.team36.Model.RegisteredUser;
import oasys.za.ac.uj.team36.Model.UserLocalDatabase;
import oasys.za.ac.uj.team36.Requests.MyRequestJArray;
import org.json.JSONException;
import org.json.JSONObject;

public class TradeworkerJobRequests extends AppCompatActivity {

    private static final String SERVER_ADDRESS_URL = "http://10.0.0.4:31335/php/classes/SebenzaServer.php" ;
     private UserLocalDatabase DB ;
    SharedPreferences pref ;
    private int utype, uID;
    private JSONArray allRequests;
    private JSONObject[] finalRequests ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tradeworker_job_requests);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DB = new UserLocalDatabase(this);
        fetchUser();
        fetchJobRequests();
       // displayRequestAcceptedNotification();
    }
    // fetch requests related to specific user
    public void fetchJobRequests(){


        Map<String,String> params = new HashMap<>();
        params.put("action","android-fetch-job-requests") ;
        params.put("android-UserID",uID + "");
        params.put("android-usertype",utype+ "");

        MyRequestJArray req = new MyRequestJArray(SERVER_ADDRESS_URL, params, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                try {
                    allRequests = response;
                    handleJobRequestConfirmationNotification();
                    displayJobRequests();
                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                String st = error.toString() ;
                AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerJobRequests.this);
                d.setMessage("Response : " + st.toString());
                d.setTitle("Your Error") ;
                d.setNegativeButton("Re try", null) ;
                d.create().show();
            }
        }) ;

        MySingleton.getInsance(TradeworkerJobRequests.this).addToRequestQueue(req);

    }

    // job requests in list for tradeworker
    public void displayJobRequests(){
        // size of list containing the requests (from the servers response)
         int numItemsInList = allRequests.length() ;
        // create list of items for list view of requests
        String[] requestsList = new String[numItemsInList] ;

        int nActualRequests =0;

            try {
                for (int i = 0; i < numItemsInList; i++) {
                int statusResponse = allRequests.getJSONObject(i).getInt("Status");
                String statusString="";
                String homeuserResponseString = "";
                int homeuserResponse = allRequests.getJSONObject(i).getInt("HomeuserResponse");

                if (homeuserResponse != 2 && statusResponse != 2) {
                    if(!allRequests.getJSONObject(i).has("JobID")){
                        if(statusResponse == 0 ||statusResponse == 1 ||statusResponse == 3) {

                            String commencementDate = allRequests.getJSONObject(i).getString("JobCommencementDate");
                            String description = allRequests.getJSONObject(i).getString("JobDescription");
                            int requestID = allRequests.getJSONObject(i).getInt("QuoteID");

                            if (homeuserResponse == 0 && statusResponse == 0) {
                                homeuserResponseString = "Awaiting your acceptance";
                            }
                            if (statusResponse == 0) {
                                statusString = "Pending acceptance";
                            } else if (statusResponse == 1) {
                                statusString = "Job accepted";
                            } else if (statusResponse == 2) {
                                statusString = "You rejected this request";
                            } else if (statusResponse == 3) {
                                statusString = "Waiting for homeuser to initiate job";
                            }


                            String workType = allRequests.getJSONObject(i).getString("WorkType");
                            int workTypeID = allRequests.getJSONObject(i).getInt("WorkTypeID");
                            String areaName = allRequests.getJSONObject(i).getString("AreaName");
                            String province = allRequests.getJSONObject(i).getString("Province");
                            String locationName = allRequests.getJSONObject(i).getString("locationName");

                            String r = "Date: " + commencementDate + "\n" + "Job Type: " + workType + "\n" + "Area: "
                                    + locationName + "\n" + "Description: " + description + "\n" + "Your Job Details: "
                                    + statusString;

                            requestsList[i] = r;
                            nActualRequests ++;

                        }else{
                            requestsList[i] = "";
                        }
                    }else
                    {
                        requestsList[i] = "";
                    }
                }else{
                    requestsList[i] = "";
                }

            }
        }catch (JSONException e){
            e.printStackTrace();
        }
        populateListView(requestsList,nActualRequests);
    }

    // fetching user from shared preference
    public void fetchUser(){
        //pref = getSharedPreferences("user-details", Context.MODE_PRIVATE);
        RegisteredUser u = DB.getLoggedInUser() ;
        uID = u.getUserID();
        String name =u.getName();
        utype = u.getUserType();
    }

    // display jobs in a list for user to read
    public void populateListView(String[] req, int length){
        finalRequests = new JSONObject[length];
        final String[] a = new String[length]; // create an empty array;
        int count = 0;

        for(int i = 0 ; i < req.length ; i++) {
            if (req[i].toString() == "") {
                //dont add to view list
            }else {
                try{
                    finalRequests[count] = allRequests.getJSONObject(i);
                    a[count]= req[i];
                    count++;
                }catch (JSONException e){
                    e.printStackTrace();
                }

            }

        }
        ListView listView = (ListView) findViewById(R.id.lvjobrequestsTW);
        ArrayAdapter adapter = new ArrayAdapter<String>(this, R.layout.list_requests_item, a);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // Based on tradeworkers response accept or reject response, will then be handled
                respondToRequest(position);

            }
        });
    }

    public void respondToRequest(int position){
        int jStatus ;
        try {
            jStatus= finalRequests[position].getInt("Status");
            if(jStatus == 0){
                String description, commencementDate, locationName, workt;
                final int rID ;
                    description = finalRequests[position].getString("JobDescription");
                    commencementDate = finalRequests[position].getString("JobCommencementDate");
                    locationName = finalRequests[position].getString("locationName");
                    rID  = finalRequests[position].getInt("QuoteID");
                    workt = finalRequests[position].getString("WorkType");

                    AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerJobRequests.this);
                    d.setMessage("Work Type: "+ workt +"\nDate: " +commencementDate +"\nDescription:"
                            + description+ "\nArea: " + locationName);
                    d.setTitle("Job Resonse") ;
                    d.setNeutralButton("Accept", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            // send server request acceptance
                            acceptJobRequest(rID) ;
                        }
                    });
                    d.setPositiveButton("Reject", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            // send server request reject
                            rejectJobRequest(rID);
                        }
                    }) ;
                    d.create().show();

            }else
            {
                // toast notifying job has been accepted already
                Toast.makeText(getApplicationContext(),"Work request already accepted",Toast.LENGTH_SHORT).show();
            }
        }catch (JSONException E){
            E.printStackTrace();
        }

    }

    // accepts a job request based on users input
    public void acceptJobRequest(final int rID){
        Map<String,String> params = new HashMap<>();
        params.put("action","android-tradeworker-accept-request") ;
        params.put("android-tradeworker-selected-request-id",rID +"") ;
        params.put("android-UserID",uID + "");
        params.put("android-usertype",utype+ "");


        MyRequestString req = new MyRequestString(SERVER_ADDRESS_URL, params, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {

                    if(response.equalsIgnoreCase("true")){
                        Toast.makeText(getApplicationContext(),"Job Confirmed",Toast.LENGTH_SHORT).show();
                        refreshActivty();
                    }else{
                        Toast.makeText(getApplicationContext(),"Could Not Confirm Job",Toast.LENGTH_SHORT).show();
                    }

                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                String st = error.toString() ;
                AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerJobRequests.this);
                d.setMessage("Response : " + st.toString());
                d.setTitle("Your Error") ;
                d.setNegativeButton("Re try", null) ;
                d.create().show();
            }
        }) ;

        MySingleton.getInsance(TradeworkerJobRequests.this).addToRequestQueue(req);

    }

    // rejects a job request based on users input
    public void rejectJobRequest(final int rID){

    }

    public void refreshActivty(){
        // end the current activity thats running
        finish();
        // start activity again by getting the intent that started this activity
        startActivity(getIntent());
    }

    public void handleJobRequestConfirmationNotification(){
        int numItemsInList = allRequests.length() ;
        String[] confirmationList = new String[numItemsInList] ;
        int nActualRequests =0;
        try {
            for (int i = 0; i < numItemsInList; i++) {
                int status = allRequests.getJSONObject(i).getInt("Status");
                int homeuserResponse = allRequests.getJSONObject(i).getInt("HomeuserResponse");
                if(homeuserResponse != 2 && status != 2){
                    if(status == 1 && homeuserResponse == 1){
                        String commencementDate = allRequests.getJSONObject(i).getString("JobCommencementDate");
                        String description = allRequests.getJSONObject(i).getString("JobDescription");
                        String worktype = allRequests.getJSONObject(i).getString("WorkType");
                        int streetNum = allRequests.getJSONObject(i).getInt("StreetNumber");
                        String road = allRequests.getJSONObject(i).getString("Road");
                        String location = allRequests.getJSONObject(i).getString("locationName");
                        String area = allRequests.getJSONObject(i).getString("AreaName");
                        String province = allRequests.getJSONObject(i).getString("Province");
                        String huName = allRequests.getJSONObject(i).getString("HomeuserName");
                        String huSurname = allRequests.getJSONObject(i).getString("HomeuserSurname");
                        int huContact = allRequests.getJSONObject(i).getInt("HomeuserContact");

                        String details ="Work Details\n\n" + "Date: "+ commencementDate
                                + "\nWork Type: " + worktype + "\nDescription" +description + "\n\nAddress Details\n\n"
                                +  "Number: " + streetNum + "\nRoad: " + road + "\nSub Area: " + location + "\nArea: "
                                + area + "\nProvince: " + province + "\n\nHomeuser Details\n\n" + "Name: " + huName+
                                "\nSurname: " + huSurname + "\nContact Number: " + huContact ;
                        confirmationList[i] = details;
                    }else{
                        confirmationList[i] = "";
                    }
                }else{
                    confirmationList[i] = "";
                }
            }
        }catch (JSONException e){
            e.printStackTrace();
        }
        displayJobRequestConfirmationNotification(confirmationList, nActualRequests);
    }

    public void displayJobRequestConfirmationNotification(String[] confirms, int length){
        Toast.makeText(getApplicationContext(),"DETAILS SET",Toast.LENGTH_LONG) ;
        for(int i = 0 ; i < confirms.length ; i++) {
            if (confirms[i].toString() == "") {
                //dont show user job details
            }else {
                try{
                    final int Qid =  allRequests.getJSONObject(i).getInt("QuoteID");
                    AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerJobRequests.this);
                    d.setMessage(confirms[i].toString()+ "\n\n* NOTE: By clicking confirm you agree to do the job" );
                    d.setTitle("Work Request Confirmation") ;
                    final int finalI = i;
                    d.setNeutralButton("Confirm", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            confirmJobRequestNotifiaction(Qid);
                        }
                    }) ;
                    d.create().show();
                }catch (JSONException e){
                    e.printStackTrace();
                }

            }

        }
    }

    public void confirmJobRequestNotifiaction(int QuoteID){
        Map<String,String> params = new HashMap<>();
        params.put("action","tradeworker-accept-confirmation") ;
        params.put("ignore-tradeworker-request-notification-quoteID",QuoteID + "");

        MyRequestString req = new MyRequestString(SERVER_ADDRESS_URL, params, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {
                    String s = response ;
                    if(s.equalsIgnoreCase("true")){
                        AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerJobRequests.this);
                        d.setMessage("Request Confirmed");
                        d.setTitle("Work Request Confirmation") ;
                        d.setNeutralButton("OK", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                return;
                            }
                        }) ;
                        d.create().show();
                    }else
                    {
                        AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerJobRequests.this);
                        d.setMessage("Request Could Not Confirm");
                        d.setTitle("Work Request Confirmation") ;
                        d.setNeutralButton("OK", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                return;
                            }
                        }) ;
                        d.create().show();
                    }
                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), "An error has Occured" ,Toast.LENGTH_LONG);
            }
        }) ;

        MySingleton.getInsance(TradeworkerJobRequests.this).addToRequestQueue(req);
    }
}
