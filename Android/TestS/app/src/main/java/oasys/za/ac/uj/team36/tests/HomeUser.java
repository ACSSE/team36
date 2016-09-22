package oasys.za.ac.uj.team36.tests;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
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
import android.widget.Gallery;
import android.widget.ImageView;
import android.widget.LinearLayout;

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
import oasys.za.ac.uj.team36.Requests.MyRequest;

public class HomeUser extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener{

    public static final String SERVER_ADDRESS_URL = "http://10.0.0.7:31335/php/classes/SebenzaServer.php" ;
    private Notification.Builder notification;
    private static final int uniqueID = 45782 ; // Id for each notification
    private UserLocalDatabase DB ;
    private RegisteredUser user ;

    //the images to display
    private Integer[] imageIDs = {
            R.drawable.labour8,
            R.drawable.scaff,
            R.drawable.construc,
            R.drawable.paint,
            R.drawable.brick,
    };
    ImageView selectedImage;


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

     /*   Gallery gallery = (Gallery) findViewById(R.id.gallery);
        gallery.setAdapter(new ImageAdapter(this));
        selectedImage =(ImageView)findViewById(R.id.imageView1);
        gallery.setSpacing(1);
        gallery.setAdapter(new ImageAdapter(this));
        // clicklistener for Gallery
        gallery.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View v, int position, long id) {
                Toast.makeText(HomeUser.this, "Your selected position = " + position, Toast.LENGTH_SHORT).show();
                // show the selected Image
                selectedImage.setImageResource(imageIDs[position]);
            }
        });*/

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

        //get the users details stored in the shared preference
        //result is stored in global variable user (Registered user)
        fetchUserDetails();
        //TODO: set user profile up here (names, email etc. )
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
            fetchUserDetails();
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

    public void fetchUserDetails(){
       user =  DB.getLoggedInUser();
    }

    public class ImageAdapter extends BaseAdapter {
        private Context context;
        //the images to display
        private Integer[] imageIDs = {
                R.drawable.labour8,
                R.drawable.scaff,
                R.drawable.construc,
                R.drawable.paint,
                R.drawable.brick,
        };
        private int itemBackground;
        public ImageAdapter(Context c)
        {
            context = c;
            // sets a grey background; wraps around the images
            TypedArray a =obtainStyledAttributes(R.styleable.MyGallery);
            itemBackground = a.getResourceId(R.styleable.MyGallery_android_galleryItemBackground, 0);
            a.recycle();
        }
        // returns the number of images
        public int getCount() {
            return imageIDs.length;
        }
        // returns the ID of an item
        public Object getItem(int position) {
            return position;
        }
        // returns the ID of an item
        public long getItemId(int position) {
            return position;
        }
        // returns an ImageView view
        public View getView(int position, View convertView, ViewGroup parent) {
            ImageView imageView = new ImageView(context);
            imageView.setImageResource(imageIDs[position]);
            imageView.setLayoutParams(new Gallery.LayoutParams(100, 100));
            imageView.setBackgroundResource(itemBackground);
            imageView.setScaleType(ImageView.ScaleType.FIT_XY);
            return imageView;
        }
    }

}
