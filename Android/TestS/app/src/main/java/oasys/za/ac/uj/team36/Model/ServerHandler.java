package oasys.za.ac.uj.team36.Model;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;

import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.security.BasicPermission;
import java.util.ArrayList;
import java.util.* ;
import java.util.jar.Attributes;
import oasys.za.ac.uj.team36.tests.Main;

/**
 * Created by Nicholas Rader on 2016-07-27.
 * Student Number: 201325732
 */
public class ServerHandler {

    public boolean success = false;
    public String response = "" ;
    ProgressDialog progressDialog ;
    public static final int TIMEOUT = 1000 * 15 ;
    public static final String SERVER_ADDRESS = "http://10.0.0.9:31335/php/classes/SebenzaServer.php" ;

    public String data="" ;
    public BufferedWriter wr ;
    public URL url;
    public String line ;
    public HttpURLConnection con = null;
    public OutputStream os = null ;
    public BufferedReader reader ;
    public StringBuilder sb ;
    public Context c;

    public ServerHandler(Context context){
        c= context ;
        progressDialog = new ProgressDialog(context) ;
        progressDialog.setCancelable(false);
        progressDialog.setTitle("Loading");
        progressDialog.setMessage("Please wait...");
    }

    public String setURL(String address){
        String s = "" ;
        s = "Connecting =" ;
        try {
            url = new URL(address);
            s += "set" ;
        }catch (MalformedURLException e){
            e.printStackTrace();
            s += e +"\n";
        }
        return s;
    }

    public String openUrl(){

        String s = "";
        if(url!= null){
            s += "NN + " ;
            try {
                con = (HttpURLConnection) url.openConnection() ;
                s += "Connection open" ;
                con.setReadTimeout(10000);
                con.setConnectTimeout(15000);
                con.setRequestMethod("POST");
                con.setDoInput(true);
                con.setDoOutput(true);
            }catch(Exception e){
                e.printStackTrace();
                s += e ;
            }

        }else
        {
            s += "url is not set" ;
        }

        return s ;
    }
    public String writeData(String data){
        String s = "" ;
        if(url != null & con != null){
                s += "fine not null" ;
            try{
                s += "ABOUT TO SEND" ;
                os = con.getOutputStream();
                wr = new BufferedWriter(new OutputStreamWriter(os,"UTF-8"));
                s += "Sending data connection open = \n" ;
                wr.write(data);
                s += "Sending data writen = \n" ;
                wr.flush();
                wr.close() ;
                con.connect();
            }catch (Exception e){
                e.printStackTrace();
            }
        }else{
            s += "No connection for writing" ;
        }
        return s;
    }
    public StringBuilder readResponse(){
        String line ;
        StringBuilder build = null;
       try{
           reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
           response += "Recieving data = \n";
           response += "content: " + con.getContent() ;
           build = new StringBuilder();

           // Read Server Response
           while ((line = reader.readLine()) != null) {
               response += "Still = \n";
               build.append(line);
               break;
           }
           response += "Recieved result = \n";
           response += build.toString();
           response += "Null coming through";
           if (build.length() > 0) {
               this.success = true;
           } else {
               this.success = false;
           }
       }catch (Exception e){
           e.printStackTrace();
       }

        return build;

    }
    public int resposeCode(){
        int i = 0;
        if(con != null){
           try{
              i = con.getResponseCode();
           }catch (Exception e){
               e.printStackTrace();
           }
        }else
        {
            i= 0;
            response += "Url is not set" ;
        }
        return i ;
    }
    public String closeStreams(){
        String s = "" ;
        if( con!= null & os != null){
            try{
                s += "Stream closed" ;
                os.close();
                con.disconnect();
            }catch (Exception e){
                e.printStackTrace();
            }
        }else{
            s += "streams have not been set" ;
        }
        return s ;
    }

    public void storeUserInfo(RegisteredUser user, GetUserCallback callback) {
        progressDialog.show();
        new storeDataAsync(user,callback).execute() ;
    }

    public void fetchUserInfo(RegisteredUser user, GetUserCallback callback){
        progressDialog.show();
        new fetchUserDataAsync(user,callback).execute() ;
    }

    public String login(RegisteredUser user){
       // progressDialog.show();
        response += "Starting = \n" ;
      new Connect().execute(user.getUsername(),user.getPassword()) ;
        //new testLogin().execute(user.getUsername(), user.getPassword()) ;
        response += "all done = \n" ;
        return response ;
    }

    public class storeDataAsync extends AsyncTask<Void,Void,Void>{

        RegisteredUser user;
        GetUserCallback callback ;

        public storeDataAsync(RegisteredUser user,GetUserCallback callback){
            this.user  = user ;
            this.callback = callback ;
        }

        @Override
        protected Void doInBackground(Void... params) {

            ArrayList<NameValuePair> sendData = new ArrayList<>() ;
            sendData.add(new BasicNameValuePair("name",user.getName()));
            sendData.add(new BasicNameValuePair("surname",user.getSurname()));
            sendData.add(new BasicNameValuePair("email",user.getEmail()));
            sendData.add(new BasicNameValuePair("username",user.getUsername()));
            //sendData.add(new BasicNameValuePair("phone",user.getPhoneN()));
            //sendData.add(new BasicNameValuePair("ID",user.getIDnum()));
            sendData.add(new BasicNameValuePair("password",user.getPassword()));

            HttpParams httpRequestParameters = new BasicHttpParams();
            HttpConnectionParams.setConnectionTimeout(httpRequestParameters,TIMEOUT);
            HttpConnectionParams.setSoTimeout(httpRequestParameters,TIMEOUT);

            HttpClient client = new DefaultHttpClient(httpRequestParameters) ;
            HttpPost post = new HttpPost(SERVER_ADDRESS);

            try {
                post.setEntity(new UrlEncodedFormEntity(sendData));
                client.execute(post) ;
            }
            catch(Exception ex){
                ex.printStackTrace();
            }
            return null;
        }

        protected void onPostExecute(Void aVoid){
            progressDialog.dismiss();
            callback.finished(null);
            super.onPostExecute(aVoid);
        }

    }

    private class Connect extends AsyncTask<String,String,String>{


        public Connect(){}

        public String setData(String u, String p) {
            String s = "" ;
            try{
                s = URLEncoder.encode("action", "UTF-8")
                        + "=" + URLEncoder.encode("login", "UTF-8");
                s += "&" + URLEncoder.encode("username", "UTF-8")
                        + "=" + URLEncoder.encode(u, "UTF-8");
                s += "&" + URLEncoder.encode("password", "UTF-8")
                        + "=" + URLEncoder.encode(p, "UTF-8");
            }catch (Exception e){
                e.printStackTrace();
            }

                return s;
        }

        @Override
        protected String doInBackground(String... params) {

            // ArrayList<NameValuePair> params = new ArrayList<>() ;

            // params.add(new BasicNameValuePair("Username", user.getUsername()));
            // params.add(new BasicNameValuePair("Password", user.getPassword()));

            String username = (String) params[0];
            String password = (String) params[1];


            response += "Strating. . . \n";
            String a = "" ;
            a += setURL(SERVER_ADDRESS.toString()) + "\n";
            String d  = setData(username, password);
            a += openUrl() + "\n";

            response += writeData(d) + "\n";
            int code = resposeCode();
            response += "Response code: " + code + "\n";
            //sb = readResponse();
            //response += "Response: " + sb.toString() +"\n";
            response += closeStreams() + "\n";

            return response;

        }

    }

    public class fetchUserDataAsync extends AsyncTask<Void,Void,RegisteredUser> {

        RegisteredUser user;
        GetUserCallback callback;

        public fetchUserDataAsync(RegisteredUser user, GetUserCallback callback) {
            this.user = user;
            this.callback = callback;
        }

        @Override
        protected RegisteredUser doInBackground(Void... params) {

            ArrayList<NameValuePair> sendData = new ArrayList<>() ;
            sendData.add(new BasicNameValuePair("username",user.getUsername()));
            sendData.add(new BasicNameValuePair("password",user.getPassword()));

            HttpParams httpRequestParameters = new BasicHttpParams();
            HttpConnectionParams.setConnectionTimeout(httpRequestParameters,TIMEOUT);
            HttpConnectionParams.setSoTimeout(httpRequestParameters,TIMEOUT);

            HttpClient client = new DefaultHttpClient(httpRequestParameters) ;
            HttpPost post = new HttpPost(SERVER_ADDRESS);

            RegisteredUser user = null;
            try {
                post.setEntity(new UrlEncodedFormEntity(sendData));
                HttpResponse response = client.execute(post) ;

                HttpEntity entity = response.getEntity() ;
                String result = EntityUtils.toString(entity) ;

                JSONObject JSON = new JSONObject(result) ;

                if(JSON.length() == 0 )
                {
                    user=null;
                }else
                {
                    String name = JSON.getString("name") ;
                    String surname = JSON.getString("surname") ;
                    String email = JSON.getString("email") ;


                    user = new RegisteredUser() ;
                }

            }
            catch(Exception ex){
                ex.printStackTrace();
            }

            return null;
        }


        protected void onPostExecute(RegisteredUser user){
            progressDialog.dismiss();
            callback.finished(user);
            super.onPostExecute(user);
        }
    }

    public class loginRequest extends StringRequest{
        public static final String SERVER_ADDRESS_URL = "http://10.0.0.9:31335/php/classes/SebenzaServer.php" ;
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
}
