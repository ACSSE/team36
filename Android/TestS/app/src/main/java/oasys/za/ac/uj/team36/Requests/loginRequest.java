package oasys.za.ac.uj.team36.Requests;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Nick on 2016-08-28.
 */
public class loginRequest extends StringRequest{
    public static final String SERVER_ADDRESS_URL = "http://10.0.0.7:31335/php/classes/SebenzaServer.php" ;
    private Map<String,String> params ;

    public loginRequest(String username, String password, Response.Listener<String> listener){
        super(Method.POST, SERVER_ADDRESS_URL, listener, null) ;
        params = new HashMap<>() ;
        params.put("action", "login");
        params.put("username",username);
        params.put("password",password);
    }
    public Map<String, String> getParams(){
        return params ;
    }

}
