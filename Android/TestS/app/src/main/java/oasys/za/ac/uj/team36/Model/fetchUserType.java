package oasys.za.ac.uj.team36.Model;

import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Nick on 2016-09-12.
 */
public class fetchUserType extends StringRequest {
    public static final String SERVER_ADDRESS_URL = "http://10.0.0.11:31335/php/classes/SebenzaServer.php" ;
    private Map<String,String> params ;

    public fetchUserType( Response.Listener<String> listener){
        super(Method.POST, SERVER_ADDRESS_URL, listener, null) ;
        params = new HashMap<>() ;
        params.put("action", "fetch-user-type");
    }
    public Map<String, String> getParams(){
        return params ;
    }
}
