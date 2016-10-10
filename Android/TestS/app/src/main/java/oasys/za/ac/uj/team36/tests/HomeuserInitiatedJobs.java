package oasys.za.ac.uj.team36.tests;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
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

import java.util.HashMap;
import java.util.Map;

import oasys.za.ac.uj.team36.Model.MySingleton;
import oasys.za.ac.uj.team36.Model.RegisteredUser;
import oasys.za.ac.uj.team36.Model.UserLocalDatabase;
import oasys.za.ac.uj.team36.Requests.MyRequestJArray;
import oasys.za.ac.uj.team36.Requests.MyRequestString;

public class HomeuserInitiatedJobs extends AppCompatActivity {

    private static final String SERVER_ADDRESS_URL = "http://10.0.0.23:31335/php/classes/SebenzaServer.php" ;
    private UserLocalDatabase DB ;
    private int utype, uID;
    private JSONArray allRequests;
    private JSONObject[] finalRequests ;
    private int day,month,year ;
    private TextView dateView;

    private EditText daysBC, agreedPrice, date;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_homeuser_initiated_jobs);
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
                    Toast.makeText(HomeuserInitiatedJobs.this,"No Requests To Display",Toast.LENGTH_LONG) ;
                }
                // displayAllRequests();
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                String st = error.toString() ;
                AlertDialog.Builder d = new AlertDialog.Builder(HomeuserInitiatedJobs.this);
                d.setMessage("Response : " + st.toString());
                d.setTitle("Network Error") ;
                d.setNegativeButton("Retry", null) ;
                d.create().show();
            }
        });

        MySingleton.getInsance(HomeuserInitiatedJobs.this).addToRequestQueue(request);
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
                    int numworkers = allRequests.getJSONObject(i).getInt("NumberOfWorkersRequested") ;
                    if(numworkers == 1){
                        if (allRequests.getJSONObject(i).has("Status-0") && allRequests.getJSONObject(i).has("HomeuserResponse-0")) {
                            int status = allRequests.getJSONObject(i).getInt("Status-0") ;
                            int hresponse = allRequests.getJSONObject(i).getInt("HomeuserResponse-0");
                            if(status == 3 && hresponse ==1) {
                                String quoteD = allRequests.getJSONObject(i).getString("JobCommencementDate");
                                String name = allRequests.getJSONObject(i).getString("Name-0");
                                int contactd = allRequests.getJSONObject(i).getInt("ContactNumber-0");
                                String WorkT = allRequests.getJSONObject(i).getString("WorkType");
                                String surname = allRequests.getJSONObject(i).getString("Surname-0");
                                String s = "Name: " + name + "\nSurname: " + surname + "\nContact details: 0" + contactd
                                        +"\nWork Type: " + WorkT + "\nQuote Date: " + quoteD ;
                                requestsList[i] = s;
                                nActualRequests++;
                            }else{
                                requestsList[i] = "";
                            }
                        }else {
                            requestsList[i] = "";
                        }

                    }else{
                        String s = "" ;
                        for(int a = 0; i < numworkers; i++){
                            if (allRequests.getJSONObject(i).has("Status-" +a) && allRequests.getJSONObject(i).has("HomeuserResponse-"+ a)) {
                                int status = allRequests.getJSONObject(i).getInt("Status-" + a) ;
                                int hresponse = allRequests.getJSONObject(i).getInt("HomeuserResponse-" + a);
                                if (status == 3 && hresponse == 1) {
                                    String quoteD = allRequests.getJSONObject(i).getString("JobCommencementDate");
                                    String name = allRequests.getJSONObject(i).getString("Name-" + a);
                                    int contactd = allRequests.getJSONObject(i).getInt("ContactNumber-" + a);
                                    String WorkT = allRequests.getJSONObject(i).getString("WorkType");
                                    String surname = allRequests.getJSONObject(i).getString("Surname-" + a);
                                    s += "Worker "+ a + ": " +"\nName: " + name + "\nSurname: " + surname + "\nContact details" + contactd
                                            +"\nWork Type: " + WorkT + "\nQuote Date: " + quoteD ;

                                } else {
                                    requestsList[i] = "";
                                }
                            }else{
                                requestsList[i] = "";
                            }
                        }

                        requestsList[i] = s;
                        nActualRequests++;
                    }
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }
            populateListView(requestsList, nActualRequests);
        }else{
            Toast.makeText(HomeuserInitiatedJobs.this,"No Requests To Display",Toast.LENGTH_LONG) ;
        }
    }

    // display jobs in a list for user to read
    public void populateListView(String[] req, int length){
        if(length > 0 && req != null) {
            finalRequests = new JSONObject[length];
            final String[] a = new String[length]; // create an empty array;
            int count = 0;

            for (int i = 0; i < req.length; i++) {
                if (req[i].toString() == "" || req[i] == null) {
                    //dont add to view list
                } else {
                    try {
                        finalRequests[count] = allRequests.getJSONObject(i);
                        a[count] = req[i];
                        count++;
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }
            }
            if(a.length >0){
            ListView listView = (ListView) findViewById(R.id.lvInitiatedHU);
            ArrayAdapter adapter = new ArrayAdapter<String>(this, R.layout.list_requests_item, a);
            listView.setAdapter(adapter);
            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    // Based on tradeworkers response this will handle
                    userClickRequestResponse(position);
                }
            });
            }

        }else{
            AlertDialog.Builder d = new AlertDialog.Builder(HomeuserInitiatedJobs.this);
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

            AlertDialog.Builder d = new AlertDialog.Builder(HomeuserInitiatedJobs.this);
            String s  = "Quote Date: "+quoteD + "\nWork Type: "+WorkT + "\nNumber Requested: "+numRequested +
                    "\nNumber Accepted: "+ numAccepted + "\nDescription: " + descrip;
            d.setMessage(s);
            d.setTitle("Select Job Action") ;
            d.setNeutralButton("Initiate", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    userInitiateJob(position);
                }
            });
            d.setPositiveButton("Cancel", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.dismiss();
                }
            });
            d.setNegativeButton("Terminate", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    userTerminateJob(position);
                }
            });
            d.create().show();
        }catch (JSONException e){
            e.printStackTrace();
        }
    }

    private void userInitiateJob(final int position){
        //TODO: handle multiple quote ID's
        try{
            final int QID = finalRequests[position].getInt("QuoteID-0");
            // get prompts.xml view and put into the alert dialog
            LayoutInflater li = LayoutInflater.from(this);
            View promptsView = li.inflate(R.layout.prompt_inititiated_job_extra_details, null);
            AlertDialog.Builder d = new AlertDialog.Builder(HomeuserInitiatedJobs.this);
            date = (EditText) promptsView.findViewById(R.id.etStartInitiate);
            daysBC = (EditText) promptsView.findViewById(R.id.etDaysBc) ;
            agreedPrice = (EditText) promptsView.findViewById(R.id.etPriceAgreed) ;
            d.setView(promptsView);
            d.setTitle("Initiation Additional Details") ;
            d.setNeutralButton("Initiate Job", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    getEditResults(QID) ;
                }
            });

            d.setPositiveButton("Cancel", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.cancel();
                }
            }) ;

            d.create().show();
        }catch (JSONException e){
            e.printStackTrace();
        }

    }

    private void userTerminateJob(int position){

    }

    private void getEditResults(final int QID){
        final String d = date.getText().toString() ;
        final int day = Integer.parseInt(daysBC.getText().toString());
        final int price = Integer.parseInt(agreedPrice.getText().toString());

        if(!d.equalsIgnoreCase("") && day> 0 && price > 0){
            //send initiation
            AlertDialog.Builder da = new AlertDialog.Builder(HomeuserInitiatedJobs.this);
            da.setMessage("Details captured: " + "\nDate: " + d + "\nDays Before complete: " + day
            + "\nPrice: " + price);
            da.setTitle("Notice") ;
            da.setNeutralButton("OK", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                        userInitiatesJobRequest(d,day,price,QID);
                }
            });
            da.create().show();
        }else{
            //fill in information please
        }

    }

    private void userInitiatesJobRequest(String date, int nDays, int price, int qID){

        Map<String,String> params = new HashMap<>();
        params.put("action","homeuser-initiateJob-request") ;
        params.put("homeuser-initiateJob-commenceDate",date);
        params.put("homeuser-initiateJob-numberDays",nDays+ "");
        params.put("homeuser-initiateJob-expectedPayment",price+ "");
        params.put("ignore-homeuser-initiateJob-quoteID",qID+ "");

        MyRequestString m = new MyRequestString(SERVER_ADDRESS_URL, params, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                if(response.equalsIgnoreCase("true")){
                    AlertDialog.Builder d = new AlertDialog.Builder(HomeuserInitiatedJobs.this);
                    d.setMessage("Job Has been Initialiased");
                    d.setTitle("Notice") ;
                    d.setNeutralButton("OK", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                        }
                    });
                    d.create().show();
                }else{
                    AlertDialog.Builder d = new AlertDialog.Builder(HomeuserInitiatedJobs.this);
                    d.setMessage("Job Could not be initialised");
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
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });


        MySingleton.getInsance(HomeuserInitiatedJobs.this).addToRequestQueue(m);
    }


}
