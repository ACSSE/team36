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

public class TradeworkerJobRequests extends AppCompatActivity {

    private static final String SERVER_ADDRESS_URL = "http://10.0.0.4:31335/php/classes/SebenzaServer.php" ;
     private UserLocalDatabase DB ;
    SharedPreferences pref ;
    private int utype, uID;
    private JSONArray allRequests;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tradeworker_job_requests);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DB = new UserLocalDatabase(this);
        fetchUser();
        fetchJobRequests();
        displayRequestAcceptedNotification();
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
                        if((statusResponse == 0 ||statusResponse == 1 )&& homeuserResponse == 0) {

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

        final String[] a = new String[length]; // create an empty array;
        int count = 0;

        for(int i = 0 ; i < req.length ; i++) {
            if (req[i].toString() == "") {
                //dont add to view list
            }else {
                a[count]= req[i];
                count++;
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
        int statusResponse ;
        try {
             statusResponse= allRequests.getJSONObject(position).getInt("Status");
            if(statusResponse == 0){
                String description, commencementDate, locationName ;
                final int rID ;
                    description = allRequests.getJSONObject(position).getString("JobDescription");
                    commencementDate = allRequests.getJSONObject(position).getString("JobCommencementDate");
                    locationName = allRequests.getJSONObject(position).getString("locationName");
                    rID  = allRequests.getJSONObject(position).getInt("QuoteID");

                    AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerJobRequests.this);
                    d.setMessage("---JOB " + position +" CONFIRMATION---" + "\nDate: " +commencementDate +"\nDescription:"
                            + description+ "\nArea: " + locationName);
                    d.setTitle("Job Confirmation") ;
                    d.setPositiveButton("Accept", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            // send server request acceptance
                            acceptJobRequest(rID) ;
                        }
                    });
                    d.setNeutralButton("Reject", new DialogInterface.OnClickListener() {
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
                        Toast.makeText(getApplicationContext(),"JOB " + rID + " ACCEPTED",Toast.LENGTH_SHORT).show();
                        refreshActivty();
                    }else{
                        Toast.makeText(getApplicationContext(),"Could not accept job",Toast.LENGTH_SHORT).show();
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


    public void displayRequestAcceptedNotification(){
        try {
            for (int i = 0; i < allRequests.length(); i++) {
                if ((allRequests.getJSONObject(i).getInt("HomeuserResponse") == 1) &&
                        (allRequests.getJSONObject(i).getInt("Status") == 1)) {
                    String AreaName,City, JobCommencementDate,JobDescription,Name,Surname,Road,WorkType,locationName;
                    final int ContactNumber,StreetNumber, qID;
                    JobDescription = allRequests.getJSONObject(i).getString("JobDescription");
                    JobCommencementDate = allRequests.getJSONObject(i).getString("JobCommencementDate");
                    AreaName = allRequests.getJSONObject(i).getString("AreaName");
                    City = allRequests.getJSONObject(i).getString("City");
                    Name = allRequests.getJSONObject(i).getString("HomeuserName");
                    Surname = allRequests.getJSONObject(i).getString("HomeuserSurname");
                    Road = allRequests.getJSONObject(i).getString("Road");
                    WorkType = allRequests.getJSONObject(i).getString("WorkType");
                    StreetNumber = allRequests.getJSONObject(i).getInt("StreetNumber");
                    ContactNumber = allRequests.getJSONObject(i).getInt("HomeuserContact");
                    locationName = allRequests.getJSONObject(i).getString("locationName");
                    qID = allRequests.getJSONObject(i).getInt("QuoteID");
                    AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerJobRequests.this);
                    d.setMessage("JOB " + 1 +" NOTIFICATION\n" + "Work Details\n" + "Date of Job: " + JobCommencementDate + "\nJob Type:" + WorkType+ "\nDescription: "
                            + JobDescription+ " \nAddress Details \n" + "Street Number: "+ StreetNumber+ "\nRoad: " + Road + "Sub Area: "
                            + locationName + "Area: " + AreaName + "Province" + City + " \nHomeuser Details \n" + "Name:" + Name
                            + "\nSurname" + Surname+ "\nContact Details:" +ContactNumber);
                    d.setTitle("Job Notifiaction") ;
                    d.setPositiveButton("Confirm", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            Toast.makeText(getApplicationContext(),"JOB" +qID + "CONFIRMED",Toast.LENGTH_SHORT).show();
                        }
                    });
                    d.create().show();

                }
            }
        }catch (JSONException e){
            e.printStackTrace();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public void refreshActivty(){
        // end the current activity thats running
        finish();
        // start activity again by getting the intent that started this activity
        startActivity(getIntent());
    }

    public void testList(){
        final String[] FRUITS = new String[] { "Apple", "Avocado", "Banana",
                "Blueberry", "Coconut", "Durian", "Guava", "Kiwifruit",
                "Jackfruit", "Mango", "Olive", "Pear", "Sugar-apple" };
        ListView listView = (ListView) findViewById(R.id.lvjobrequestsTW);
        ArrayAdapter adapter = new ArrayAdapter<String>(this, R.layout.list_requests_item,FRUITS );
        listView.setAdapter(adapter);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Toast.makeText(getApplicationContext(),
                        ((TextView) view).getText(), Toast.LENGTH_SHORT).show();
            }
        });
        Toast t = Toast.makeText(this,"No Requests to display",Toast.LENGTH_LONG) ;
        t.show();

    }

    public void printJobsTest(){
           /*  AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerJobRequests.this);
                    d.setMessage("Response : " +"\n + " + requests[1].toString()+
                            "\n + " + requests[2].toString() +"\n + " + requests[3].toString()+ "\n + " + requests[4].toString());
                    d.setTitle("Your OK") ;
                    d.setNegativeButton("Retry", null) ;
                    d.create().show();*/
    }
}
