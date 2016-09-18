package oasys.za.ac.uj.team36.Model;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Nick on 2016-09-12.
 */
public class fetchJobRequests extends StringRequest {

    public static final String SERVER_ADDRESS_URL = "http://10.254.164.98:31335/php/classes/SebenzaServer.php" ;
    private Map<String,String> params ;

    public fetchJobRequests(Response.Listener<String> listener){
        super(Method.POST, SERVER_ADDRESS_URL, listener, null) ;
        params = new HashMap<>() ;
        params.put("action", "fetch-job-requests");
    }
    public Map<String, String> getParams(){
        return params ;
    }

 /*   @Override
    public Map<String, String> getHeaders() throws AuthFailureError {
        Map<String, String> headers = super.getHeaders();
        if (headers == null || headers.equals(Collections.emptyMap())) {
            headers = new HashMap<>();
        }
        // add the session cookie
        // try to get the cookie from the shared prefs
        String sessionId = ""; //Hawk.get("connect.sid", "");
        if (sessionId.length() > 0) {
            StringBuilder builder = new StringBuilder();
            builder.append("connect.sid");
            builder.append("=");
            builder.append(sessionId);
            if (headers.containsKey("Set-Cookie")) {
                builder.append("; ");
                builder.append(headers.get("Set-Cookie"));
            }
            headers.put("Set-Cookie", builder.toString());
        }

        return headers;
    }

    @Override
    protected Response<String> parseNetworkResponse(NetworkResponse response) {
        // since we don't know which of the two underlying network vehicles
        // will Volley use, we have to handle and store session cookies manually
        Map<String, String> headers = null ;
        try {
           headers = getHeaders();
        }catch (Exception e){
            e.printStackTrace();
        }
        if (headers.containsKey("Set-Cookie") && headers.get("Set-Cookie").startsWith("connect.sid")) {
            String cookie = headers.get("Set-Cookie");
            if (cookie.length() > 0) {
                String[] splitCookie = cookie.split(";");
                String[] splitSessionId = splitCookie[0].split("=");
                cookie = splitSessionId[1];

                // Store is somewhare, shared prefs is ok
               // Hawk.put("connect.sid", cookie);
            }
        }

        return super.parseNetworkResponse(response);
    }*/
}
