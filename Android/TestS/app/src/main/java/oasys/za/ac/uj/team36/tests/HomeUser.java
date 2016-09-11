package oasys.za.ac.uj.team36.tests;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Bundle;
import android.os.SystemClock;
import android.provider.Settings;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.FragmentManager;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

public class HomeUser extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener{
    private LinearLayout mContainerView;

    private Notification.Builder notification;
    private static final int uniqueID = 45782 ; // Id for each notification

    private FragmentManager fm ;

    View v ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_user);
        //initiate the Home user with the home users main fragment
       // fm = getSupportFragmentManager();
       // fm.beginTransaction().replace(R.id.content_frame, new MainHomeUser()).commit();

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

/*        v = findViewById(R.id.content_frame);
        mContainerView = (LinearLayout) findViewById(R.id.content_frame);*/

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
            // TODO call logout function
            // TODO redirect to main page
             startActivity(new Intent(this, Main.class));
            return true;
        }
        if (id == R.id.action_notification) {
            setNotification();
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();
        // mContainerView.removeView((View) v.getParent());

        fm = getSupportFragmentManager();
        if (id == R.id.nav_requestTradeworker) {
            Intent i = new Intent(HomeUser.this, requestTradeworker.class);
            this.finish();  //Kill the activity from which you will go to next activity
            startActivity(i);
        } else if (id == R.id.nav_ManageJobs) {
            // TODO Handle the action
        } else if (id == R.id.nav_InitiateJob) {
            // TODO Handle the action
        } else if (id == R.id.nav_OngoingJobs) {
            // TODO Handle the action
        } else if (id == R.id.nav_FinishedJobs) {
            // TODO Handle the action
        } else if (id == R.id.nav_editDetails) {
                fm.beginTransaction().replace(R.id.content_frame, new EditDetailsHomeUser()).commit();
        } else if (id == R.id.nav_editLocation) {
            // TODO Handle the action
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    public void setNotification(){

        notification.setSmallIcon(R.drawable.favicon);
        notification.setTicker("This is the ticker") ;
        notification.setWhen(System.currentTimeMillis());
        notification.setContentTitle("Test Notification");
        notification.setContentText("Body text of the notification");
        //handle click of notification on screen
        Intent intent = new Intent(this, HomeUser.class);
        PendingIntent pend = PendingIntent.getActivity(this,0,intent, PendingIntent.FLAG_UPDATE_CURRENT);
        notification.setContentIntent(pend) ;
        // Building the actual notification on home screen scroll down
        NotificationManager nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        nm.notify(uniqueID, notification.build());

    }

}
