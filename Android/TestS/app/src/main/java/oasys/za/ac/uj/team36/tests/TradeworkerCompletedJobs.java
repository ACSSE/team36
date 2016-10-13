package oasys.za.ac.uj.team36.tests;

import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import oasys.za.ac.uj.team36.Model.CustomAdapter;
import oasys.za.ac.uj.team36.Model.MySingleton;
import oasys.za.ac.uj.team36.Model.RegisteredUser;
import oasys.za.ac.uj.team36.Model.UserLocalDatabase;
import oasys.za.ac.uj.team36.Requests.MyRequestJArray;

public class TradeworkerCompletedJobs extends AppCompatActivity {

    private static final String SERVER_ADDRESS_URL = "http://10.0.0.9:31335/php/classes/SebenzaServer.php" ;
    private UserLocalDatabase DB ;
    private int utype, uID;

    // JSON array to hold the servers response
    private JSONArray allRequests;
    private JSONObject[] finalRequests ;
    private int imageResource = R.drawable.job1 ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tradeworker_finished_jobs);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DB = new UserLocalDatabase(this);
        fetchUser();
        fetchJobsCompleted();

    }
    // fetch requests related to specific user
    public void fetchJobsCompleted(){


        Map<String,String> params = new HashMap<>();
        params.put("action","android-fetch-job-requests") ;
        params.put("android-UserID",uID + "");
        params.put("android-usertype",utype+ "");

        MyRequestJArray req = new MyRequestJArray(SERVER_ADDRESS_URL, params, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                try {
                    allRequests = response;
                    handleJobCompletedRequests();

                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                String st = error.toString() ;
                AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerCompletedJobs.this);
                d.setMessage("Response : " + st);
                d.setTitle("Your Error") ;
                d.setNegativeButton("Retry", null) ;
                d.create().show();
            }
        }) ;

        MySingleton.getInsance(TradeworkerCompletedJobs.this).addToRequestQueue(req);

    }

    // fetching user from shared preference
    public void fetchUser(){
        //pref = getSharedPreferences("user-details", Context.MODE_PRIVATE);
        RegisteredUser u = DB.getLoggedInUser() ;
        uID = u.getUserID();
        utype = u.getUserType();
    }

    public void handleJobCompletedRequests(){
        // size of list containing the requests (from the servers response)
        int numItemsInList = allRequests.length() ;
        // create list of items for list view of requests
        String [] completedJobList = new String[numItemsInList] ;
        int nActualRequests =0;
        try {
            for (int i = 0; i < numItemsInList; i++) {
                int statusResponse = allRequests.getJSONObject(i).getInt("Status");
                int homeuserResponse = allRequests.getJSONObject(i).getInt("HomeuserResponse");

                if (allRequests.getJSONObject(i).has("JobID") && allRequests.getJSONObject(i).has("JobStatus")
                        && homeuserResponse != 2 && statusResponse != 2) {

                    if(statusResponse ==3 && homeuserResponse ==3){
                        int jobStatus = allRequests.getJSONObject(i).getInt("JobStatus");
                        if(jobStatus == 1){
                            int price = allRequests.getJSONObject(i).getInt("AgreedPrice");
                            String date, wtype, EstimatedCDate;
                            date = allRequests.getJSONObject(i).getString("JobCommencementDate");
                            wtype = allRequests.getJSONObject(i).getString("WorkType");
                            EstimatedCDate = allRequests.getJSONObject(i).getString("EstimatedCompletionDate");
                            String detailsS = "Job Start Date: " + date + "\nAgreed Price: "+ price
                                    + "\nJob Completion Date: "+EstimatedCDate + "\nWork Type: " + wtype + "\nStatus: Complete" ;
                            completedJobList[i] = detailsS;
                            nActualRequests++;
                        }else{
                            completedJobList[i] = "" ;
                        }

                    }else{
                        completedJobList[i] = "" ;
                    }
                }else{
                    completedJobList[i] = "" ;
                }
            }
        }catch (JSONException e){
            e.printStackTrace();
        }
        populateListView(completedJobList, nActualRequests);
    }

    // display Initiated jobs in a list for user to read
    public void populateListView(String[] req, int length){
        finalRequests = new JSONObject[length];
        if(req.length > 0){
            final String[] a = new String[length]; // create an empty array;
            final Integer[] imgid = new Integer[length];
            int count = 0;  // counter for indexing into new array from old (removing empty indexes)

            for(int i = 0 ; i < req.length ; i++) {
                if (req[i].toString() == "") {
                    //dont add to view list
                }else {
                    try {
                        finalRequests[count] = allRequests.getJSONObject(i);
                        a[count] = req[i];
                        imgid[count] = imageResource ;
                        count++;
                    }catch (JSONException e){
                        e.printStackTrace();
                    }
                }

            }
            ListView listView = (ListView) findViewById(R.id.lvFinisehdTW);
            //ArrayAdapter adapter = new ArrayAdapter<String>(this, R.layout.list_requests_item, a);
            CustomAdapter adapter1 = new CustomAdapter(this,a,imgid) ;
            listView.setAdapter(adapter1);
            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    // Based on tradeworkers response do something


                }
            });
        }else{
            Toast.makeText(getApplicationContext(),"No Jobs Completed", Toast.LENGTH_SHORT).show();
        }

    }

}
