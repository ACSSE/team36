package oasys.za.ac.uj.team36.Model;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Entity;
import android.os.AsyncTask;

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
import org.apache.*;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.security.BasicPermission;
import java.util.ArrayList;
import java.util.* ;
import java.util.jar.Attributes;

/**
 * Created by Nicholas Rader on 2016-07-27.
 * Student Number: 201325732
 */
public class ServerHandler {

    public boolean success = false;
    public String response = "" ;
    ProgressDialog progressDialog ;
    public static final int TIMEOUT = 1000 * 15 ;
    public static final String SERVER_ADDRESS = "http://10.0.0.6:31335/SebenzaServer.php" ;

    public ServerHandler(Context context){
        progressDialog = new ProgressDialog(context) ;
        progressDialog.setCancelable(false);
        progressDialog.setTitle("Loading");
        progressDialog.setMessage("Please wait...");
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
        response += "Starting = \n" ;
        //new Connect().execute(user.getUsername(),user.getPassword()) ;
        new testLogin().execute(user.getUsername(), user.getPassword()) ;
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


        @Override
        protected String doInBackground(String... params) {

            // ArrayList<NameValuePair> params = new ArrayList<>() ;

            // params.add(new BasicNameValuePair("Username", user.getUsername()));
            // params.add(new BasicNameValuePair("Password", user.getPassword()));

            String username = (String)params[0];
            String password = (String)params[1];

            try {
                String line = null;
                response += "Connecting = \n" ;
                URL url = new URL(SERVER_ADDRESS);
                String data = URLEncoder.encode("username", "UTF-8")
                        + "=" + URLEncoder.encode(username, "UTF-8");
                data += "&" + URLEncoder.encode("password", "UTF-8")
                        + "=" + URLEncoder.encode(password, "UTF-8");
                data += "&" + URLEncoder.encode("action", "UTF-8")
                        + "=" + URLEncoder.encode("login", "UTF-8");
                URLConnection conn = url.openConnection();
                conn.setDoOutput(true);
				conn.setRequestMethod("POST") ;
                    response += "Sending data = \n" ;
                OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
                    response += "Sending data connection open = \n" ;
                wr.write( data );
                    response += "Sending data writen = \n" ;
                wr.flush();
				wr.close() ;

                    response += "flushed data = \n" ;
                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                    response += "Recieving data = \n" ;
                StringBuilder sb = new StringBuilder();

                // Read Server Response
                while((line = reader.readLine()) != null)
                {
                    response += "Still = \n" ;
                    sb.append(line);
                    break;
                }
                response += "Recieved result = \n" ;
                response = sb.toString() ;
                response += "Null coming through" ;
                if(line.equalsIgnoreCase("true")){
                    success = true ;
                }else{
                    success = false;
                }
                response += "Finished = \n" ;
            }catch (Exception ex){
                ex.printStackTrace();
                response += ex ;
            }
            return response;

            //JSONObject js = JP.httprequest(DB_URL,"POST",params) ;
            /*try{
                String success = js.toString() ;
                if (success.equals("true"))
                {
                    this.success = true;
                }else{

                    this.success = false ;
                }
            }catch(Exception e){
                e.printStackTrace();
            }*/
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


    public class testLogin extends AsyncTask<String, String,String>{
        @Override
        protected String doInBackground(String... params) {

            String username = (String)params[0];
            String password = (String)params[1];
            response += "params set  \n" ;

            try {
                // Create a new HttpClient and Post Header
                response += "Starting client = \n" ;
                HttpParams p = new BasicHttpParams();
                HttpClient httpclient = new DefaultHttpClient(p);
                HttpPost httppost = new HttpPost(SERVER_ADDRESS);
                httppost.setHeader("Accept", "application/json");

                response += "post set  \n";

                // Add your data
                List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>(3);
                nameValuePairs.add(new BasicNameValuePair("action", "login"));
                nameValuePairs.add(new BasicNameValuePair("username", username));
                nameValuePairs.add(new BasicNameValuePair("password", password));

                UrlEncodedFormEntity ent = new UrlEncodedFormEntity(nameValuePairs, "utf-8") ;

                httppost.setEntity(ent);
                response += "set data\n" ;
                // Execute HTTP Post Request
                HttpResponse Response = httpclient.execute(httppost);
               // int status = Response.getStatusLine().getStatusCode();
                HttpEntity e = Response.getEntity() ;
                response += "data posted, status = \n";
                String res = e.getContent().toString() ;

            } catch (ClientProtocolException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return response;
        }
    }
}
