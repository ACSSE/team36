package oasys.za.ac.uj.team36.Model;

import android.app.DownloadManager;
import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;

/**
 * Created by Nick on 2016-09-18.
 */
public class MySingleton {

    private static MySingleton mInstance ;
    private Context mContext;
    private RequestQueue requestQueue;


    public MySingleton(Context context) {
        mContext = context;
        requestQueue = getRequestQueue() ;
    }

    public static MySingleton getmInstance() {
        return mInstance;
    }

    public RequestQueue getRequestQueue() {
        if (requestQueue == null) {
            requestQueue =  Volley.newRequestQueue(mContext.getApplicationContext());
        }
        return requestQueue;
    }

    public static synchronized MySingleton getInsance(Context context){
        if(mInstance==null){
            mInstance = new MySingleton(context) ;
        }
        return mInstance ;
    }

    public<T> void addToRequestQueue(Request<T> request){

        requestQueue.add(request);
    }
}
