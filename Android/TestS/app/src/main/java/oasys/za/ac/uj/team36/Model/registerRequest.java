package oasys.za.ac.uj.team36.Model;

import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Nicholas on 2016-08-28.
 */

public class registerRequest extends StringRequest {
    public static final String SERVER_ADDRESS_URL = "http://10.254.164.98:31335/php/classes/SebenzaServer.php" ;
    private Map<String,String> params ;

    public registerRequest(int type,String name, String surname, String username, int IDn, int phoneN, String email, String password,int strnum,String strname, String subA,String area, String adminA,String Skill, Response.Listener<String> listener){
        super(Method.POST, SERVER_ADDRESS_URL, listener, null) ;

        if(type ==1){ //type 1 being a homeuser
            params = new HashMap<>() ;
            params.put("action", "register-homeuser") ;
            params.put("name-homeuser",name);
            params.put("surname-homeuser",surname);
            params.put("username-homeuser",username);
            params.put("cellnumber-homeuser", phoneN + "") ;
            params.put("identity-homeuser",IDn + "");
            params.put("email-homeuser",email);
            params.put("password-homeuser",password);
            params.put("",strnum +"") ;
            params.put("",strname) ;
            params.put("",subA) ;
            params.put("", area) ;
            params.put("",adminA) ;
        }
        else if (type== 2){ // type 2 being a tradeworker
            params = new HashMap<>() ;
            params.put("action", "register-tradeWorker");
            params.put("name-tradeWorker",name);
            params.put("surname-tradeWorker",surname);
            params.put("username-tradeWorker",username);
            params.put("cellnumber-tradeWorker", phoneN + "") ;
            params.put("identity-tradeWorker",IDn + "");
            params.put("email-tradeWorker",email);
            params.put("password-tradeWorker",password);

            params.put("",strnum +"") ;
            params.put("",strname) ;
            params.put("",subA) ;
            params.put("", area) ;
            params.put("",adminA) ;

            params.put("",Skill) ;
        }
    }

    public Map<String, String> getParams(){
        return params ;
    }
}

