package oasys.za.ac.uj.team36.tests;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;

import java.util.HashMap;
import java.util.Map;

import oasys.za.ac.uj.team36.Model.MySingleton;
import oasys.za.ac.uj.team36.Model.RegisteredUser;
import oasys.za.ac.uj.team36.Model.UserLocalDatabase;
import oasys.za.ac.uj.team36.Requests.MyRequest;

public class TradeworkerJobRequests extends AppCompatActivity {


    private static final String SERVER_ADDRESS_URL = "http://10.0.0.7:31335/php/classes/SebenzaServer.php" ;
     private UserLocalDatabase DB ;
    SharedPreferences pref ;
    private int utype, uID;

    // create list of items for list view of requests
    private String [] requests = null;
    // size of list containing the requests (from the servers response)
    private int numItemsInList = 0 ;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tradeworker_job_requests);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DB = new UserLocalDatabase(this);
        fetchUser();
        fetchJobRequests();

    }
    // fetch requests related to specific user
    public void fetchJobRequests(){


        Map<String,String> params = new HashMap<>();
        params.put("action","android-fetch-job-requests") ;
        params.put("android-UserID",uID + "");
        params.put("android-usertype",utype+ "");

        MyRequest req = new MyRequest(SERVER_ADDRESS_URL, params, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                try {
                    System.out.print(response);
                    numItemsInList = response.length() ;
                    requests = new String[numItemsInList] ;
                    for(int i = 0; i < response.length();i++) {
                        int status = response.getJSONObject(i).getInt("Status");
                        String statusString ;
                        String homeuserResponseString = "";
                        int homeuserResponse =response.getJSONObject(i).getInt("HomeuserResponse") ;
                        if (!response.getJSONObject(i).has("JobID") &&  homeuserResponse != 2 && status != 2) {
                            String commencementDate = response.getJSONObject(i).getString("JobCommencementDate");
                            String description = response.getJSONObject(i).getString("JobDescription");
                            int quoteID = response.getJSONObject(i).getInt("QuoteID");

                            if(homeuserResponse == 0 && status == 0){
                                homeuserResponseString = "Awaiting your acceptance";
                            }
                            else if(homeuserResponse == 0 && status == 1){
                                homeuserResponseString = "Awaiting homeuser confirmation";
                            }
                            else if(homeuserResponse == 1){
                                homeuserResponseString = "Waiting for homeuser to initiate job";
                            }

                            if (status == 0) {
                                statusString = "Pending acceptance";
                            }
                            else if (status == 1) {
                                statusString = "Job accepted";
                            }
                            else if (status == 2) {
                                statusString = "You rejected this request";
                            }
                            else if (status == 3) {
                                statusString = "Waiting for homeuser to initiate job";
                            }

                            String workType = response.getJSONObject(i).getString("WorkType");
                            int workTypeID = response.getJSONObject(i).getInt("WorkTypeID");
                            String areaName = response.getJSONObject(i).getString("AreaName") ;
                            String province = response.getJSONObject(i).getString("Province");
                            String locationName = response.getJSONObject(i).getString("locationName");
                            if(homeuserResponse == 1) {
                                String HomeUserName = response.getJSONObject(i).getString("HomeuserName");
                                String HomeUserSurname = response.getJSONObject(i).getString("HomeuserSurname");
                                int HomeUserContact = response.getJSONObject(i).getInt("HomeuserContact");
                            }
                            String r = "Date: " + commencementDate + "\n" + "Description: " + description
                                    + "\n" + "Homeuser response: " + homeuserResponseString + "\n" + "Location: " + locationName ;
                            requests[i] = r;
                        }

                    }
                    populateListView(requests);

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

    // fetching user from shared preference
    public void fetchUser(){
        //pref = getSharedPreferences("user-details", Context.MODE_PRIVATE);
        RegisteredUser u = DB.getLoggedInUser() ;
        uID = u.getUserID();
        String name =u.getName();
        utype = u.getUserType();
    }

    // display jobs in a list for user to read
    public void populateListView(String[] req){
                ListView listView = (ListView) findViewById(R.id.lvjobrequestsTW);
                ArrayAdapter adapter = new ArrayAdapter<String>(this, R.layout.list_requests_item, req);
                listView.setAdapter(adapter);

                listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                        Toast.makeText(getApplicationContext(),
                                ((TextView) view).getText(), Toast.LENGTH_SHORT).show();
                    }
                });

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
