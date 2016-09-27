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

import oasys.za.ac.uj.team36.Model.MySingleton;
import oasys.za.ac.uj.team36.Model.RegisteredUser;
import oasys.za.ac.uj.team36.Model.UserLocalDatabase;
import oasys.za.ac.uj.team36.Requests.MyRequestJArray;

public class TradeworkerCancelledJobs extends AppCompatActivity {


    private static final String SERVER_ADDRESS_URL = "http://10.0.0.4:31335/php/classes/SebenzaServer.php" ;
    private UserLocalDatabase DB ;
    private int utype, uID;
    // size of list containing the requests (from the servers response)
    private int numItemsInList = 0 ;
    // create list of items for list view of requests
    private String [] cancelledJobList = null;

    // JSON array to hold the servers response
    private JSONArray allRequests;
    private JSONObject[] finalRequests ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tradeworker_cancelled_jobs);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

      DB = new UserLocalDatabase(this) ;
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
                    handleJobsCancelledRequests();

                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                String st = error.toString() ;
                AlertDialog.Builder d = new AlertDialog.Builder(TradeworkerCancelledJobs.this);
                d.setMessage("Response : " + st.toString());
                d.setTitle("Your Error") ;
                d.setNegativeButton("Retry", null) ;
                d.create().show();
            }
        }) ;

        MySingleton.getInsance(TradeworkerCancelledJobs.this).addToRequestQueue(req);

    }
    public void handleJobsCancelledRequests(){
        numItemsInList = allRequests.length() ;
        cancelledJobList = new String[numItemsInList] ;
        int nActualRequests =0;
        try {
            for (int i = 0; i < numItemsInList; i++) {
                int statusResponse = allRequests.getJSONObject(i).getInt("Status");
                int homeuserResponse = allRequests.getJSONObject(i).getInt("HomeuserResponse");

                if (allRequests.getJSONObject(i).has("JobID") && allRequests.getJSONObject(i).has("JobStatus")
                        && homeuserResponse != 2 && statusResponse != 2) {

                    if(statusResponse ==3 && homeuserResponse ==3){
                        int jobStatus = allRequests.getJSONObject(i).getInt("JobStatus");
                        if(jobStatus == 2){
                            int price = allRequests.getJSONObject(i).getInt("AgreedPrice");
                            String date, wtype, EstimatedCDate;
                            date = allRequests.getJSONObject(i).getString("JobCommencementDate");
                            wtype = allRequests.getJSONObject(i).getString("WorkType");
                            EstimatedCDate = allRequests.getJSONObject(i).getString("EstimatedCompletionDate");
                            String detailsS = "Job: "+ i + "\nJob Start Date: " + date + "\nAgreed Price: "+ price
                                    + "\nJob Completion Date: "+EstimatedCDate + "\nWork Type: " + wtype + "\nStatus: Complete" ;
                            cancelledJobList[i] = detailsS;
                            nActualRequests++;
                        }else{
                            cancelledJobList[i] = "no 2" ;
                        }

                    }else{
                        cancelledJobList[i] = "" ;
                    }
                }else{
                    cancelledJobList[i] = "" ;
                }
            }
        }catch (JSONException e){
            e.printStackTrace();
        }
        populateListView(cancelledJobList, nActualRequests);
    }

    // display Initiated jobs in a list for user to read
    public void populateListView(String[] req, int length){
        finalRequests = new JSONObject[length];
        if(req.length > 0){
            final String[] a = new String[length]; // create an empty array;
            int count = 0;  // counter for indexing into new array from old (removing empty indexes)

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
            ListView listView = (ListView) findViewById(R.id.lvFinisehdTW);
            ArrayAdapter adapter = new ArrayAdapter<String>(this, R.layout.list_requests_item, a);
            listView.setAdapter(adapter);

            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    Toast.makeText(getApplicationContext(),
                            ((TextView) view).getText(), Toast.LENGTH_SHORT).show();

                    // Based on tradeworkers response do something


                }
            });
        }else{
            Toast.makeText(getApplicationContext(),"No Jobs Cancelled", Toast.LENGTH_SHORT).show();
        }

    }

}
