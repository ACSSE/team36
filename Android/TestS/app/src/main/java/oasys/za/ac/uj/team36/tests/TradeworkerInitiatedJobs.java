package oasys.za.ac.uj.team36.tests;

import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.*;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import oasys.za.ac.uj.team36.Model.CustomAdapter;
import oasys.za.ac.uj.team36.Model.MySingleton;
import oasys.za.ac.uj.team36.Model.RegisteredUser;
import oasys.za.ac.uj.team36.Model.UserLocalDatabase;
import oasys.za.ac.uj.team36.Requests.MyRequestJArray;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class TradeworkerInitiatedJobs extends AppCompatActivity {

    private static final String SERVER_ADDRESS_URL = "http://10.0.0.9:31335/php/classes/SebenzaServer.php" ;
    private UserLocalDatabase DB ;
    private int utype, uID;
    // size of list containing the requests (from the servers response)
    private int numItemsInList = 0 ;
    // create list of items for list view of requests
    private String [] initiatedJobList = null;

    // JSON array to hold the servers response
    private JSONArray allRequests;
    private JSONObject[] finalInitiatersJobs ;
    private int imageResource = R.drawable.job1 ;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tradeworker_initiated_jobs);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DB = new UserLocalDatabase(this);


        fetchUser();
        fetchJobsInitiated();
    }

    // fetching user from shared preference
    public void fetchUser(){
        //pref = getSharedPreferences("user-details", Context.MODE_PRIVATE);
        RegisteredUser u = DB.getLoggedInUser() ;
        uID = u.getUserID();
        String name =u.getName();
        utype = u.getUserType();
    }

    // fetch requests related to specific user
    public void fetchJobsInitiated(){


        Map<String,String> params = new HashMap<>();
        params.put("action","android-fetch-job-requests") ;
        params.put("android-UserID",uID + "");
        params.put("android-usertype",utype+ "");

        MyRequestJArray req = new MyRequestJArray(SERVER_ADDRESS_URL, params, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                try {
                    allRequests = response;
                    handleJobInitatedRequests();

                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                String st = error.toString() ;
                AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerInitiatedJobs.this);
                d.setMessage("Response : " + st.toString());
                d.setTitle("Your Error") ;
                d.setNegativeButton("Re try", null) ;
                d.create().show();
            }
        }) ;

        MySingleton.getInsance(TradeworkerInitiatedJobs.this).addToRequestQueue(req);

    }

    public void handleJobInitatedRequests(){

        numItemsInList = allRequests.length() ;
        initiatedJobList = new String[numItemsInList] ;
        int nActualRequests =0;
        try {
            for (int i = 0; i < numItemsInList; i++) {
                int statusResponse = allRequests.getJSONObject(i).getInt("Status");
                int homeuserResponse = allRequests.getJSONObject(i).getInt("HomeuserResponse");

                if (allRequests.getJSONObject(i).has("JobID") && allRequests.getJSONObject(i).has("JobStatus")
                        && homeuserResponse != 2 && statusResponse != 2) {

                    if(statusResponse ==3 && homeuserResponse ==3){
                        int jobStatus = allRequests.getJSONObject(i).getInt("JobStatus");
                        if(jobStatus == 0){
                            int price = allRequests.getJSONObject(i).getInt("AgreedPrice");
                            String date, wtype, EstimatedCDate;
                            date = allRequests.getJSONObject(i).getString("JobCommencementDate");
                            wtype = allRequests.getJSONObject(i).getString("WorkType");
                            EstimatedCDate = allRequests.getJSONObject(i).getString("EstimatedCompletionDate");
                            String detailsS = "Job Start Date: " + date + "\nAgreed Price: "+ price
                                    + "\nJob Completion Date: "+EstimatedCDate + "\nWork Type: " + wtype;
                            initiatedJobList [i] = detailsS;
                            nActualRequests++;
                        }else{
                            initiatedJobList [i] = "" ;
                        }

                    }else{
                        initiatedJobList [i] = "" ;
                    }
                }else{
                    initiatedJobList [i] = "" ;
                }
            }
        }catch (JSONException e){
            e.printStackTrace();
        }
        populateListView(initiatedJobList, nActualRequests);
    }

    // display Initiated jobs in a list for user to read
    public void populateListView(String[] req, int length){
        finalInitiatersJobs = new JSONObject[length] ;
        if(req.length > 0){
            final String[] a = new String[length]; // create an empty array;
            final Integer[] imgid = new Integer[length];
            int count = 0;  // counter for indexing into new array from old (removing empty indexes)

            for(int i = 0 ; i < req.length ; i++) {
                if (req[i].toString() == "") {
                    //dont add to view list
                }else {
                    try{
                        a[count]= req[i];
                        finalInitiatersJobs[count] = allRequests.getJSONObject(i);
                        imgid[count] = imageResource ;
                        count++;
                    }catch ( JSONException e){
                        e.printStackTrace();
                    }

                }

            }
            ListView listView = (ListView) findViewById(R.id.lvInitiatedTW);
            //ArrayAdapter adapter = new ArrayAdapter<String>(this, R.layout.list_requests_item, a);
            CustomAdapter adapter1 = new CustomAdapter(this,a,imgid) ;
            listView.setAdapter(adapter1);

            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    // Based on tradeworkers response to initiated Job
                    responseToInitiatedJob(position);

                }
            });
        }else{
            Toast.makeText(getApplicationContext(),"No Jobs initiated", Toast.LENGTH_SHORT).show();
        }

    }

    // the user can either request an extension, request completion or terminate the job
    public void responseToInitiatedJob(int position){
        int Jstatus ;
        try {
            Jstatus= finalInitiatersJobs[position].getInt("JobStatus");
            if(Jstatus == 0){
                String description, commencementDate, locationName ;
                final int QouteID ;
                int price = finalInitiatersJobs[position].getInt("AgreedPrice");
                String date = finalInitiatersJobs[position].getString("JobCommencementDate");
                String  wtype = finalInitiatersJobs[position].getString("WorkType");
                String EstimatedCDate = finalInitiatersJobs[position].getString("EstimatedCompletionDate");
                QouteID  = finalInitiatersJobs[position].getInt("QuoteID");

                AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerInitiatedJobs.this);
                d.setMessage("Job Start Date: " + date  + "\nAgreed Price: "
                        + price+ "\nCompletion Date:" + EstimatedCDate + "\nWork Type: " + wtype);
                d.setTitle("Initiated Job Requests") ;
                d.setPositiveButton("Completion", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        // send server request acceptance
                        Toast.makeText(getApplicationContext(),"Complete",Toast.LENGTH_SHORT).show();
                    }
                });
                d.setNeutralButton("Extension", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        // send server request reject
                        Toast.makeText(getApplicationContext(),"Extend",Toast.LENGTH_SHORT).show();
                    }
                }) ;
                d.setNegativeButton("Termination", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        // send server request reject
                        Toast.makeText(getApplicationContext(),"Terminate",Toast.LENGTH_SHORT).show();
                    }
                });
                d.create().show();

            }else
            {
                // toast notifying job has been accepted already
                Toast.makeText(getApplicationContext(),"Cant do so",Toast.LENGTH_SHORT).show();
            }
        }catch (JSONException E){
            E.printStackTrace();
        }

    }
}
