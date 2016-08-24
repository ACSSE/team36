package oasys.za.ac.uj.team36.Model;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Entity;
import android.content.SharedPreferences;
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
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
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
    public static final String SERVER_ADDRESS = "http://10.0.0.6:31335/php/classes/SebenzaServer.php" ;

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

    public void setURL(String address){
        response += "Connecting =" ;
        try {
            url = new URL(address);
            response += "set" ;
        }catch (Exception e){
            e.printStackTrace();
            response += e +"\n";
        }
        response += "out = \n";
    }

    public void openUrl(){
        if(url!= null){
            response += "NN + " ;
            try {
                con = (HttpURLConnection) url.openConnection() ;
                response += "Connection open" ;
                con.setReadTimeout(10000);
                con.setConnectTimeout(15000);
                con.setRequestMethod("POST");
                con.setDoInput(true);
                con.setDoOutput(true);
            }catch(Exception e){
                e.printStackTrace();
                response += e ;
            }

        }else
        {
            response += "url is not set" ;
        }
    }
    public void writeData(String data){
        if(url != null & con != null){
                response += "fine not null" ;
            try{
                response += "ABOUT TO SEND" ;
                os = con.getOutputStream();
                wr = new BufferedWriter(new OutputStreamWriter(os,"UTF-8"));
                response += "Sending data connection open = \n" ;
                wr.write(data);
                response += "Sending data writen = \n" ;
                wr.flush();
                wr.close() ;
            }catch (Exception e){
                e.printStackTrace();
            }
        }else{
            response += "No connection for writing" ;
        }
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
    public void closeStreams(){
        if( con!= null & os != null){
            try{
                os.close();
                con.disconnect();
            }catch (Exception e){
                e.printStackTrace();
            }
        }else{
            response += "streams have not been set" ;
        }
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


            response += "Strating. . . ";

            setURL(SERVER_ADDRESS.toString());
            setData(username, password);
            openUrl();

            writeData(setData(username, password));
            int code = resposeCode();
            sb = readResponse();
            closeStreams();

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
