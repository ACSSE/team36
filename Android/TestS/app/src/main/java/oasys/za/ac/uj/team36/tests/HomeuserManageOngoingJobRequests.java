package oasys.za.ac.uj.team36.tests;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Response;
import com.android.volley.VolleyError;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import oasys.za.ac.uj.team36.Model.CustomAdapter;
import oasys.za.ac.uj.team36.Model.MySingleton;
import oasys.za.ac.uj.team36.Model.RegisteredUser;
import oasys.za.ac.uj.team36.Model.UserLocalDatabase;
import oasys.za.ac.uj.team36.Requests.MyRequestJArray;
import oasys.za.ac.uj.team36.Requests.MyRequestString;

public class HomeuserManageOngoingJobRequests extends AppCompatActivity {

    private static final String SERVER_ADDRESS_URL = "http://10.0.0.9:31335/php/classes/SebenzaServer.php" ;
    private UserLocalDatabase DB ;
    private int utype, uID;
    private JSONArray allRequests;
    private JSONObject[] finalRequests ;
    final Context context = this;
    private Button bSetDate ;
    private EditText newDescription;
    private int year, month, day;
    private String newDescriptionString ;

    private int imageResource = R.drawable.job2 ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_homeuser_manage_ongoing_job_requests);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        DB = new UserLocalDatabase(this) ;

        fetchUser();
        fetchRequests();

    }

    // fetching user from shared preference
    public void fetchUser(){
        //pref = getSharedPreferences("user-details", Context.MODE_PRIVATE);
        RegisteredUser u = DB.getLoggedInUser() ;
        uID = u.getUserID();
        utype = u.getUserType();
    }

    // fetches all requests and jobs for this specific user
    public void fetchRequests(){
        Map<String,String> params = new HashMap<>();
        params.put("action","android-fetch-job-requests") ;
        params.put("android-UserID",uID + "");
        params.put("android-usertype",utype+ "");
        MyRequestJArray request = new MyRequestJArray(SERVER_ADDRESS_URL, params, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                allRequests = response;
                if(allRequests.length()>0){
                handleRequests() ;
                } else{
                    Toast.makeText(HomeuserManageOngoingJobRequests.this,"No Requests To Display",Toast.LENGTH_LONG) ;
                }
                // displayAllRequests();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                String st = error.toString() ;
                AlertDialog.Builder d = new AlertDialog.Builder(HomeuserManageOngoingJobRequests.this);
                d.setMessage("Response : " + st.toString());
                d.setTitle("Network Error") ;
                d.setNegativeButton("Retry", null) ;
                d.create().show();
            }
        });

        MySingleton.getInsance(HomeuserManageOngoingJobRequests.this).addToRequestQueue(request);
    }

    // handles the request based on job request management
    public void handleRequests(){
        // size of list containing the requests (from the servers response)
        int numItemsInList = allRequests.length() ;
        // create list of items for list view of requests
        String[] requestsList = new String[numItemsInList] ;

        int nActualRequests = 0;
        if(numItemsInList > 0) {
            try {
                for (int i = 0; i < numItemsInList; i++) {
                    if (allRequests.getJSONObject(i).has("RequestStatus")) {
                        if (allRequests.getJSONObject(i).getInt("RequestStatus") == 0) {
                            if (!allRequests.getJSONObject(i).has("JobID")) {
                                String quoteD = allRequests.getJSONObject(i).getString("JobCommencementDate");
                                String WorkT = allRequests.getJSONObject(i).getString("WorkType");
                                int numRequested = allRequests.getJSONObject(i).getInt("NumberOfWorkersRequested");
                                int numAccepted = allRequests.getJSONObject(i).getInt("NumberOfWorkersAccepted");
                                String descrip = allRequests.getJSONObject(i).getString("JobDescription");

                                String s = "Quote Date: " + quoteD + "\nWork Type: " + WorkT + "\nNumber Requested: " + numRequested +
                                        "\nNumber Accepted: " + numAccepted + "\nDescription: " + descrip;
                                requestsList[i] = s;
                                nActualRequests++;

                            } else {
                                requestsList[i] = "";
                            }
                        } else {
                            requestsList[i] = "";
                        }
                    }else{
                        requestsList[i] = "";
                    }
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }
            populateListView(requestsList, nActualRequests);
        }else{
            Toast.makeText(HomeuserManageOngoingJobRequests.this,"No Requests To Display",Toast.LENGTH_LONG) ;
        }
    }

    // display jobs in a list for user to read
    public void populateListView(String[] req, int length){
        if(length > 0) {
        finalRequests = new JSONObject[length];
        final String[] a = new String[length]; // create an empty array;
        int count = 0;
        final Integer[] imgid = new Integer[length];

        for(int i = 0 ; i < req.length ; i++) {
            if (req[i].toString() == "" || req[i] == null) {
                //dont add to view list
            }else {
                try{
                    finalRequests[count] = allRequests.getJSONObject(i);
                    a[count]= req[i];
                    imgid[count] = imageResource ;
                    count++;
                }catch (JSONException e){
                    e.printStackTrace();
                }

            }

        }
        ListView listView = (ListView) findViewById(R.id.lvManageRequestHU);
        //ArrayAdapter adapter = new ArrayAdapter<String>(this, R.layout.list_requests_item, a);
        CustomAdapter adapter1 = new CustomAdapter(this,a,imgid) ;
        listView.setAdapter(adapter1);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // Based on tradeworkers response this will handle
                userClickRequestResponse(position);
            }
        });
        }else{
            AlertDialog.Builder d = new AlertDialog.Builder(HomeuserManageOngoingJobRequests.this);
            d.setMessage("No requests to Display");
            d.setTitle("Notice") ;
            d.setNeutralButton("OK", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.dismiss();
                }
            });
            d.create().show();
        }
    }

    // displaying details of the related request to the user once a item is clicked
    public void userClickRequestResponse(final int position){
        try{
            String quoteD = finalRequests[position].getString("JobCommencementDate");
            String WorkT = finalRequests[position].getString("WorkType");
            int numRequested = finalRequests[position].getInt("NumberOfWorkersRequested");
            int numAccepted = finalRequests[position].getInt("NumberOfWorkersAccepted");
            String descrip =  finalRequests[position].getString("JobDescription");

            AlertDialog.Builder d = new AlertDialog.Builder(HomeuserManageOngoingJobRequests.this);
            String s  = "Quote Date: "+quoteD + "\nWork Type: "+WorkT + "\nNumber Requested: "+numRequested +
                    "\nNumber Accepted: "+ numAccepted + "\nDescription: " + descrip;
            d.setMessage(s);
            d.setTitle("Manage Request") ;
            d.setNeutralButton("Edit", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    editRequest();
                }
            });
            d.setPositiveButton("Delete", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                   deleteRequest(position);
                }
            }) ;
            d.create().show();
        }catch (JSONException e){
            e.printStackTrace();
        }
    }

    // once an item is clicked the user can then edit the details
    public void editRequest(){
        // get prompts.xml view and put into the alert dialog
        LayoutInflater li = LayoutInflater.from(context);
        View promptsView = li.inflate(R.layout.prompt_edit_request, null);
        AlertDialog.Builder d = new AlertDialog.Builder(HomeuserManageOngoingJobRequests.this);
        d.setView(promptsView);
        d.setTitle("Edit Request") ;
        d.setNeutralButton("Send", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                newDescription = (EditText) findViewById(R.id.etDecripRequestEdit);
                newDescriptionString = newDescription.getText().toString() ;
                if(!newDescriptionString.isEmpty()){
                    //send request to edit details
                    sendEditRequestToServer();
                }else{
                    Toast.makeText(HomeuserManageOngoingJobRequests.this, "Could not perform edit",Toast.LENGTH_LONG) ;
                }
            }
        });
        d.setPositiveButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        }) ;

        d.create().show();
    }

    // once an item is clicked the user can delete the details
    public void deleteRequest(int position){
        int rid = -1;
        try {
            rid = finalRequests[position].getInt("RequestID");
        }catch (JSONException e){
            e.printStackTrace();
        }
        Map<String, String> params = new HashMap<>();
        params.put("action", "android-homeuser-remove-request");
        params.put("ignore-homeuser-selected-request-id", rid + "");
        MyRequestString deleteR = new MyRequestString(SERVER_ADDRESS_URL, params, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                if (response.equalsIgnoreCase("true")) {
                    AlertDialog.Builder d = new AlertDialog.Builder(HomeuserManageOngoingJobRequests.this);
                    d.setMessage("Request deleted");
                    d.setTitle("Manage Request") ;
                    d.setNeutralButton("OK", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.cancel();
                        }
                    });
                    d.setPositiveButton("Cancel", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.cancel();
                        }
                    }) ;
                    d.create().show();
                } else {
                    Toast.makeText(HomeuserManageOngoingJobRequests.this, "Job could not be deleted", Toast.LENGTH_LONG);
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });

        MySingleton.getInsance(HomeuserManageOngoingJobRequests.this).addToRequestQueue(deleteR);
    }

    // if the edit option was selected the user is promted and can submit changes
    public void sendEditRequestToServer(){

    }


}

