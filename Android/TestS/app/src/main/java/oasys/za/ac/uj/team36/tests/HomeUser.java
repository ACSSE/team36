package oasys.za.ac.uj.team36.tests;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.TypedArray;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;

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

public class HomeUser extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener{

    public static final String SERVER_ADDRESS_URL = "http://10.0.0.7:31335/php/classes/SebenzaServer.php" ;
    private Notification.Builder notification;
    private static final int uniqueID = 45782 ; // Id for each notification
    private UserLocalDatabase DB ;
    SharedPreferences pref ;
    private int utype, uID;
    private JSONArray allRequests;


    private String Name, Surname, Username, Email, Password;
    private int IDnum, PhoneN,confirm, userType, UserID;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_user);
        //initiate the Home user with the home users main fragment
       // fm = getSupportFragmentManager();
       // fm.beginTransaction().replace(R.id.content_frame, new MainHomeUser()).commit();
        DB = new UserLocalDatabase(this) ;
        notification = new Notification.Builder(this);
        notification.setAutoCancel(true); // maiking notification disappear once this screen has loaded

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Notification Bar", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);


    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.home_user, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }
        if (id == R.id.action_logoutHU) {
            this.finish();
            removelogIn();
            DB.clearLocalDBdata();
            startActivity(new Intent(this, Main.class));
            return true;
        }
        if (id == R.id.action_notification) {
            setNotification();
        }
        if (id == R.id.action_testServer) {

        }
        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();
        // mContainerView.removeView((View) v.getParent());

        if (id == R.id.nav_requestTradeworker) {
            Intent i = new Intent(HomeUser.this, requestTradeworker.class);
           // this.finish();  //Kill the activity from which you will go to next activity
            startActivity(i);
        } else if (id == R.id.nav_ManageJobs) {
            Intent i = new Intent(HomeUser.this, HomeuserManageJobs.class);
            startActivity(i);
        } else if (id == R.id.nav_InitiateJob) {
            Intent i = new Intent(HomeUser.this, HomeuserInitiatedJobs.class);
            startActivity(i);
        } else if (id == R.id.nav_OngoingJobs) {
            Intent i = new Intent(HomeUser.this, HomeuserOngoingJobs.class);
            startActivity(i);
        } else if (id == R.id.nav_FinishedJobs) {
            Intent i = new Intent(HomeUser.this, HomeuserFinishedJobs.class);
            startActivity(i);
        } else if (id == R.id.nav_editDetails) {

        } else if (id == R.id.nav_editLocation) {
            // TODO Handle the action
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    public void setNotification(){

        notification.setSmallIcon(R.drawable.favicon);
        notification.setTicker("Sebenza SA notification") ;
        notification.setWhen(System.currentTimeMillis());
        notification.setContentTitle("Notification recieved");
        notification.setContentText("You have been sent a in app notification");
        //handle click of notification on screen
        Intent intent = new Intent(this, HomeUser.class);
        PendingIntent pend = PendingIntent.getActivity(this,0,intent, PendingIntent.FLAG_UPDATE_CURRENT);
        notification.setContentIntent(pend) ;
        // Building the actual notification on home screen scroll down
        NotificationManager nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        nm.notify(uniqueID, notification.build());

    }

    private void removelogIn(){
        DB.setUserLoggedIn(false);
    }

    // fetching user from shared preference
    public void fetchUser(){
        //pref = getSharedPreferences("user-details", Context.MODE_PRIVATE);
        RegisteredUser u = DB.getLoggedInUser() ;
        uID = u.getUserID();
        utype = u.getUserType();
    }

    public void fetchJobRequestConfirmationNotification(){

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

                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                String st = error.toString() ;
                AlertDialog.Builder d = new AlertDialog.Builder(HomeUser.this);
                d.setMessage("Response : " + st.toString());
                d.setTitle("Your Error") ;
                d.setNegativeButton("Retry", null) ;
                d.create().show();
                //TODO: use a toast instead
            }
        }) ;

        MySingleton.getInsance(HomeUser.this).addToRequestQueue(req);
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
                        String worktype = allRequests.getJSONObject(i).getString("JobDescription");
                        int streetNum = allRequests.getJSONObject(i).getInt("StreetNumber");
                        String road = allRequests.getJSONObject(i).getString("JobDescription");
                        String location = allRequests.getJSONObject(i).getString("JobDescription");
                        String area = allRequests.getJSONObject(i).getString("JobDescription");
                        String province = allRequests.getJSONObject(i).getString("Province");
                        String huName = allRequests.getJSONObject(i).getString("HomeuserName");
                        String huSurname = allRequests.getJSONObject(i).getString("HomeuserSurname");
                        int huContact = allRequests.getJSONObject(i).getInt("HomeuserContact");

                        String details = "Work Request Confirmation\n"+ "\nWork Details\n" + ""+ commencementDate
                                + "\nWork Type: " + worktype + "\nDescription" +description + "\n\nAddress Details\n\n"
                                +  "Number: " + streetNum + "\nRoad: " + road + "\nSub Area: " + location + "\nArea: "
                                + area + "\nProvince: " + province + "\n\nHomeuser Details\n\n" + "Name: " + huName+
                                "\nSurname: " + huSurname + "Contact Number: " + huContact ;
                        confirmationList[i] = details;
                        nActualRequests ++;

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
        JSONObject[] finalRequests = new JSONObject[length];
        String[] a = new String[length]; // create an empty array;
        int count = 0;
        for(int i = 0 ; i < confirms.length ; i++) {
            if (confirms[i].toString() == "") {
                //dont show user job details
            }else {
                try{
                    finalRequests[count] = allRequests.getJSONObject(i);
                    a[count]= confirms[i];
                    final int Qid =  allRequests.getJSONObject(i).getInt("QuoteID");
                    AlertDialog.Builder d = new AlertDialog.Builder(HomeUser.this);
                    d.setMessage(a[i].toString());
                    d.setTitle("Job Confirmation") ;
                    final int finalI = i;
                    d.setNeutralButton("Confirm", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            //confirmJobRequest(Qid);
                        }
                    }) ;
                    d.create().show();
                    count++;
                }catch (JSONException e){
                    e.printStackTrace();
                }

            }

        }
    }

}
